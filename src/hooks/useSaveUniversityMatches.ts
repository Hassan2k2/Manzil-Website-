import { useCallback, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useUserRole } from "./useUserRole";
import { ScoredUniversity } from "@/lib/universityMatcher";
import { UniversityPreferences } from "@/components/UniversityPreferencesForm";
import { fetchWithAuth } from "@/lib/api";

export function useSaveUniversityMatches() {
  const { user } = useAuth();
  const { schoolId } = useUserRole();
  const hasSavedRef = useRef<string | null>(null);

  const saveMatches = useCallback(
    async (matches: ScoredUniversity[], preferences: UniversityPreferences) => {
      if (!user) {
        console.log("useSaveUniversityMatches: No user logged in, skipping save");
        return;
      }

      // Create a unique key for this set of preferences to avoid duplicate saves
      const prefsKey = JSON.stringify({
        curriculum: preferences.curriculum,
        gradeLevel: preferences.gradeLevel,
        majors: preferences.preferredMajors.sort(),
        funding: preferences.fundingNeed,
      });

      if (hasSavedRef.current === prefsKey) {
        console.log("useSaveUniversityMatches: Already saved these matches, skipping");
        return;
      }

      // Take top 10 matches to save (most relevant)
      const topMatches = matches.slice(0, 10);

      if (topMatches.length === 0) {
        console.log("useSaveUniversityMatches: No matches to save");
        return;
      }

      try {
        const payload = {
          preferences: {
            curriculum: preferences.curriculum,
            gradeLevel: preferences.gradeLevel,
            preferredMajors: preferences.preferredMajors,
            fundingNeed: preferences.fundingNeed,
          },
          matches: topMatches.map((match) => ({
            university_name: match.university.name,
            university_country: match.university.country,
            tier: match.tier,
            score: Math.round(match.score),
          }))
        };

        const result = await fetchWithAuth("/university/save-matches", {
          method: "POST",
          body: JSON.stringify(payload)
        });

        console.log(`useSaveUniversityMatches: Saved ${payload.matches.length} matches`);
        hasSavedRef.current = prefsKey;
      } catch (err) {
        console.error("useSaveUniversityMatches: Exception:", err);
      }
    },
    [user, schoolId]
  );

  return { saveMatches };
}
