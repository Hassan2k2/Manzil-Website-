import { useState, useEffect, useCallback } from "react";
import { fetchWithAuth } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

interface Profile {
  id: string;
  email: string | null;
  full_name: string | null;
  school_id: string | null;
  created_at: string;
  updated_at: string;
}

interface UseProfileReturn {
  profile: Profile | null;
  isLoading: boolean;
  schoolName: string | null;
  joinSchool: (code: string) => Promise<{ success: boolean; error?: string; schoolName?: string }>;
  refreshProfile: () => Promise<void>;
}

export function useProfile(): UseProfileReturn {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [schoolName, setSchoolName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
    if (!user) {
      setProfile(null);
      setSchoolName(null);
      setIsLoading(false);
      return;
    }

    try {
      const data = await fetchWithAuth("/profile");
      setProfile(data);
      setSchoolName(data.school_name || null);
    } catch (err) {
      console.error("Profile error:", err);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const joinSchool = useCallback(
    async (code: string): Promise<{ success: boolean; error?: string; schoolName?: string }> => {
      if (!user) return { success: false, error: "Not authenticated" };

      const trimmed = code.trim();
      if (!trimmed) return { success: false, error: "Please enter a school code" };

      try {
        const result = await fetchWithAuth("/profile/join-school", {
          method: "POST",
          body: JSON.stringify({ school_code: trimmed })
        });

        if (result.success) {
          await fetchProfile();
          return { success: true, schoolName: result.school_name };
        } else {
          return { success: false, error: result.error || "Failed to join school" };
        }
      } catch (err: any) {
        return { success: false, error: err.message || "An unexpected error occurred" };
      }
    },
    [user, fetchProfile]
  );

  return {
    profile,
    isLoading,
    schoolName,
    joinSchool,
    refreshProfile: fetchProfile,
  };
}
