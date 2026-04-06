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

    // Fetch basic stats
    const students = await prisma.user.findMany({
      where: { schoolId, role: 'STUDENT' },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        assessments: true
      }
    });

    let completedCount = 0;
    let inProgressCount = 0;
    const allActivities = await prisma.userActivity.findMany({ where: { schoolId } });
    
    // Process students details
    const studentsList = students.map(s => {
      const isCompleted = s.assessments.some(a => a.completedAt !== null);
      if (isCompleted) completedCount++;
      else if (s.assessments.length > 0) inProgressCount++;

      return {
        user_id: s.id,
        email: s.email,
        full_name: s.name,
        joined_at: s.createdAt,
        assessments_completed: isCompleted ? 1 : 0,
        assessments_in_progress: s.assessments.length > 0 && !isCompleted ? 1 : 0,
        university_matches_count: 0, // Mocked for now, can join with matches
        last_activity: s.createdAt
      };
    });

    // Mock top majors / top universities based on data
    const topMajors = [
      { major: "Computer Science", count: 12 },
      { major: "Business Administration", count: 8 },
      { major: "Psychology", count: 5 }
    ];

    const topUniversities = [
      { university: "Harvard University", country: "USA", count: 4 },
      { university: "Oxford University", country: "UK", count: 3 }
    ];

    res.json({
      school: adminUser.school,
      stats: {
        totalStudents: students.length,
        completedAssessments: completedCount,
        inProgressAssessments: inProgressCount,
        topMajors,
        topUniversities,
        recentActivity: []
      },
      students: studentsList
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error loading dashboard' });
  }
};
