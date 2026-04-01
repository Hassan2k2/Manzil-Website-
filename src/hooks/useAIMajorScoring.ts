import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { majors } from "@/data/careersData";
import type { BigFiveScores, RiasecScores } from "@/hooks/useAssessment";
import { fetchWithAuth } from "@/lib/api";

interface AIScoreResult {
  score: number;
  riasec: number;
  values: number;
  personality: number;
}

interface UseAIMajorScoringProps {
  topRiasecCodes: string[];
  riasecScores: RiasecScores;
  higherOrderScores: Record<string, number>;
  bigFiveScores: BigFiveScores;
  enabled: boolean;
}

export function useAIMajorScoring({
  topRiasecCodes,
  riasecScores,
  higherOrderScores,
  bigFiveScores,
  enabled,
}: UseAIMajorScoringProps) {
  const [aiMajorScores, setAiMajorScores] = useState<Record<string, AIScoreResult> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAIScores = useCallback(async () => {
    if (!enabled) return;

    const hasValidScores =
      Object.values(riasecScores).some((v) => v > 0) || Object.values(bigFiveScores).some((v) => v > 0);

    if (!hasValidScores && topRiasecCodes.length === 0) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const majorData = majors.map((m) => ({
        id: m.id,
        name: m.name,
        riasecMatch: m.riasecMatch,
        valueMatch: m.valueMatch,
        personalityMatch: m.personalityMatch,
      }));

      const data = await fetchWithAuth("/ai/recommend", {
        method: "POST",
        body: JSON.stringify({
          studentProfile: {
            topRiasecCodes,
            riasecScores,
            higherOrderValues: higherOrderScores,
            bigFiveScores,
          },
          careers: majorData,
        }),
      });

      if (data?.scores) {
        setAiMajorScores(data.scores);
      }
    } catch (err: any) {
      const errorMessage = err instanceof Error ? err.message : "Failed to get AI major scores";
      setError(errorMessage);

      if (errorMessage.includes("Rate limit")) {
        toast.error("AI is busy. Using formula-based major scoring instead.");
      } else if (errorMessage.includes("Payment")) {
        toast.error("AI credits exhausted. Using formula-based major scoring.");
      } else {
        toast.error("AI major scoring unavailable. Using formula-based scoring.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [enabled, topRiasecCodes, riasecScores, higherOrderScores, bigFiveScores]);

  useEffect(() => {
    if (enabled) fetchAIScores();
  }, [enabled, fetchAIScores]);

  return { aiMajorScores, isLoading, error, refetch: fetchAIScores };
}
