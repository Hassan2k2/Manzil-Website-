import { useAuth } from "@/contexts/AuthContext";

type AppRole = "student" | "school_admin";

interface UserRole {
  role: AppRole | null;
  schoolId: string | null;
  isLoading: boolean;
  isSchoolAdmin: boolean;
}

export function useUserRole(): UserRole {
  const { user, loading } = useAuth();
  
  const role = user?.role?.toLowerCase() as AppRole || null;
  const schoolId = (user as any)?.schoolId || null;

  return {
    role,
    schoolId,
    isLoading: loading,
    isSchoolAdmin: role === "school_admin",
  };
}
