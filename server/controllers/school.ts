import { Request, Response } from 'express';
import prisma from '../lib/prisma.js';

export const getDashboardStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, role } = (req as any).user;

    // Check if user is school admin
    if (role !== 'SCHOOL_ADMIN' && role !== 'SUPER_ADMIN') {
      res.status(403).json({ message: 'Access denied' });
      return;
    }

    // Get school associated with the admin
    const adminUser = await prisma.user.findUnique({
      where: { id: userId },
      include: { school: true }
    });

    if (!adminUser || !adminUser.schoolId) {
      res.status(404).json({ message: 'No school associated with this admin' });
      return;
    }

    const schoolId = adminUser.schoolId;

    // Fetch students with all related data
    const students = await prisma.user.findMany({
      where: { schoolId, role: 'STUDENT' },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        assessments: true,
        universityMatches: true,
        activities: true,
      }
    });

    let completedCount = 0;
    let inProgressCount = 0;
    
    const majorCounts: Record<string, number> = {};
    const universityCounts: Record<string, { country: string, count: number }> = {};
    const recentActivity: any[] = [];

    const studentsList = students.map(s => {
      const isCompleted = s.assessments.some(a => a.completedAt !== null);
      if (isCompleted) completedCount++;
      else if (s.assessments.length > 0) inProgressCount++;

      // Aggregate Majors
      s.assessments.forEach(a => {
        if (a.majorResults && Array.isArray(a.majorResults)) {
          a.majorResults.forEach((m: any) => {
            const majorName = m.major || m.name;
            if (majorName) {
              majorCounts[majorName] = (majorCounts[majorName] || 0) + 1;
            }
          });
        }
        
        // Add to recent activity
        recentActivity.push({
          id: a.id,
          studentEmail: s.email || s.name || 'Unknown',
          action: isCompleted ? 'Completed an assessment' : 'Started an assessment',
          timestamp: a.updatedAt || a.createdAt
        });
      });

      // Aggregate Universities
      s.universityMatches.forEach(um => {
        const uniKey = um.universityName;
        if (!universityCounts[uniKey]) {
          universityCounts[uniKey] = { country: um.universityCountry, count: 0 };
        }
        universityCounts[uniKey].count++;
        
        recentActivity.push({
          id: um.id,
          studentEmail: s.email || s.name || 'Unknown',
          action: `Matched with ${um.universityName}`,
          timestamp: um.createdAt
        });
      });
      
      // Activities (Major Predictions)
      s.activities.forEach(act => {
        recentActivity.push({
          id: act.id,
          studentEmail: s.email || s.name || 'Unknown',
          action: 'Got a major prediction',
          timestamp: act.createdAt
        });
      });

      // Determine Last Activity
      let lastActivityDate = s.createdAt;
      const allTimestamps = [
        ...s.assessments.map(a => a.updatedAt || a.createdAt), 
        ...s.universityMatches.map(u => u.createdAt),
        ...s.activities.map(act => act.createdAt)
      ].sort((a, b) => b.getTime() - a.getTime());
      
      if (allTimestamps.length > 0) {
        lastActivityDate = allTimestamps[0];
      }

      return {
        user_id: s.id,
        email: s.email,
        full_name: s.name,
        joined_at: s.createdAt,
        assessments_completed: isCompleted ? 1 : 0,
        assessments_in_progress: s.assessments.length > 0 && !isCompleted ? 1 : 0,
        university_matches_count: s.universityMatches.length,
        last_activity: lastActivityDate
      };
    });

    const topMajors = Object.entries(majorCounts)
      .map(([major, count]) => ({ major, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const topUniversities = Object.entries(universityCounts)
      .map(([university, data]) => ({ university, country: data.country, count: data.count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
      
    // Sort recent activity by timestamp desc
    recentActivity.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    res.json({
      school: adminUser.school,
      stats: {
        totalStudents: students.length,
        completedAssessments: completedCount,
        inProgressAssessments: inProgressCount,
        topMajors,
        topUniversities,
        recentActivity: recentActivity.slice(0, 10)
      },
      students: studentsList
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error loading dashboard' });
  }
};

export const getStudentDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, role } = (req as any).user;
    const studentId = req.params.id as string;

    if (role !== 'SCHOOL_ADMIN' && role !== 'SUPER_ADMIN') {
      res.status(403).json({ message: 'Access denied' });
      return;
    }

    const adminUser = await prisma.user.findUnique({
       where: { id: userId }
    });

    if (!adminUser || !adminUser.schoolId) {
      res.status(404).json({ message: 'No school associated with this admin' });
      return;
    }

    const student = await prisma.user.findFirst({
      where: { 
        id: studentId,
        schoolId: adminUser.schoolId,
        role: 'STUDENT'
      },
      include: {
        assessments: {
            orderBy: { createdAt: 'desc' }
        },
        activities: {
            orderBy: { createdAt: 'desc' }
        },
        universityMatches: {
            orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!student) {
      res.status(404).json({ message: 'Student not found in your school' });
      return;
    }

    res.json({
      profile: {
        id: student.id,
        email: student.email,
        full_name: student.name,
        joined_at: student.createdAt,
      },
      sessions: student.assessments.map(a => ({
        id: a.id,
        current_step: a.currentStep,
        completed_at: a.completedAt,
        created_at: a.createdAt,
        major_results: a.majorResults,
        top_riasec_codes: a.topRiasecCodes
      })),
      activity: student.activities.map(act => ({
        id: act.id,
        prediction: act.prediction,
        created_at: act.createdAt
      })),
      university_matches: student.universityMatches.map(um => ({
         id: um.id,
         university_name: um.universityName,
         university_country: um.universityCountry,
         tier: um.tier,
         score: um.score,
         created_at: um.createdAt
      }))
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error loading student details' });
  }
};
