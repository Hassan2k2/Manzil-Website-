import { useRef, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { fetchWithAuth } from "@/lib/api";
import type { MajorResult } from "./useAssessment";

interface SaveUserActivityParams {
  riasecAnswers: Record<string, number>;
  valuesAnswers: Record<string, number>;
  bigFiveAnswers: Record<string, number>;
  majorResults: MajorResult[];
}

interface SaveResult {
  success: boolean;
  error: Error | null;
}

export function useSaveUserActivity() {
  const { user } = useAuth();
  const hasSavedRef = useRef(false);

  const saveUserActivity = useCallback(
    async (params: SaveUserActivityParams): Promise<SaveResult> => {
      if (hasSavedRef.current) {
        return { success: true, error: null };
      }

      if (!user) {
        return { success: false, error: null };
      }

      const hasRiasecAnswers = Object.keys(params.riasecAnswers).length > 0;
      const hasValuesAnswers = Object.keys(params.valuesAnswers).length > 0;
      const hasBigFiveAnswers = Object.keys(params.bigFiveAnswers).length > 0;
      
      if (!hasRiasecAnswers && !hasValuesAnswers && !hasBigFiveAnswers) {
        return { success: false, error: null };
      }

      try {
        // Send a final progress save
        await fetchWithAuth("/assessment/progress", {
          method: "POST",
          body: JSON.stringify({
            riasec_answers: params.riasecAnswers,
            values_answers: params.valuesAnswers,
            big_five_answers: params.bigFiveAnswers,
            major_results: params.majorResults,
            current_step: "results"
          })
        });

        hasSavedRef.current = true;
        toast.success("Your assessment results have been saved!");
        return { success: true, error: null };
      } catch (err) {
        const error = err as Error;
        console.error("Failed to save user activity:", error);
        toast.error("Failed to save your results. Please try again.");
        return { success: false, error };
      }
    },
    [user]
  );

  const resetSaveState = useCallback(() => {
    hasSavedRef.current = false;
  }, []);

  return { saveUserActivity, resetSaveState };
}
