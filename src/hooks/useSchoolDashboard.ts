import { useState, useEffect, useCallback } from "react";
import { fetchWithAuth } from "@/lib/api";
import { useUserRole } from "./useUserRole";

interface StudentRow {
  user_id: string;
  email: string | null;
  full_name: string | null;
  joined_at: string;
  assessments_completed: number;
  assessments_in_progress: number;
  university_matches_count: number;
  last_activity: string;
}

interface SchoolStats {
  totalStudents: number;
  completedAssessments: number;
  inProgressAssessments: number;
  topMajors: { major: string; count: number }[];
  topUniversities: { university: string; country: string; count: number }[];
  recentActivity: {
    id: string;
    studentEmail: string;
    action: string;
    timestamp: string;
  }[];
}

interface SchoolInfo {
  id: string;
  name: string;
  code: string;
}

export function useSchoolDashboard() {
  const { schoolId, isSchoolAdmin, isLoading: roleLoading } = useUserRole();
  const [school, setSchool] = useState<SchoolInfo | null>(null);
  const [stats, setStats] = useState<SchoolStats | null>(null);
  const [students, setStudents] = useState<StudentRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = useCallback(async () => {
    if (roleLoading) return;
    
    if (!isSchoolAdmin) {
      setIsLoading(false);
      setError("Access denied. You must be a school administrator.");
      return;
    }

    try {
      const data = await fetchWithAuth("/schools/dashboard");
      setSchool(data.school);
      setStats(data.stats);
      setStudents(data.students);
      setIsLoading(false);
    } catch (err: any) {
      console.error("Dashboard error:", err);
      setError("Failed to load dashboard data.");
      setIsLoading(false);
    }
  }, [isSchoolAdmin, roleLoading]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const getStudentDetails = useCallback(async (studentId: string) => {
    try {
      const data = await fetchWithAuth(`/schools/students/${studentId}`);
      return data;
    } catch (err) {
      console.error("Error fetching student details:", err);
      return null;
    }
  }, []);

  return {
    school,
    stats,
    students,
    isLoading: isLoading || roleLoading,
    error,
    isSchoolAdmin,
    getStudentDetails,
    refreshData: fetchDashboardData,
  };
}
