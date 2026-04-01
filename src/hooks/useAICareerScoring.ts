import { useState, useEffect, useCallback } from "react";
import { careers } from "@/data/careersData";
import { fetchWithAuth } from "@/lib/api";
import type { RiasecScores, BigFiveScores, CareerResult } from "./useAssessment";
import { toast } from "sonner";

interface AIScoreResult {
  score: number;
  riasec: number;
  values: number;
  personality: number;
}

interface UseAICareerScoringProps {
  topRiasecCodes: string[];
  riasecScores: RiasecScores;
  higherOrderScores: Record<string, number>;
  bigFiveScores: BigFiveScores;
  enabled: boolean;
}

export function useAICareerScoring({
  topRiasecCodes,
  riasecScores,
  higherOrderScores,
  bigFiveScores,
  enabled,
}: UseAICareerScoringProps) {
  const [aiCareerResults, setAiCareerResults] = useState<CareerResult[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAIScores = useCallback(async () => {
    if (!enabled) return;
    
    const hasValidScores = Object.values(riasecScores).some(v => v > 0) || 
                           Object.values(bigFiveScores).some(v => v > 0);
    
    if (!hasValidScores && topRiasecCodes.length === 0) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Create request payload
      const payload = {
        studentProfile: {
          topRiasecCodes,
          riasecScores,
          higherOrderValues: higherOrderScores,
          bigFiveScores,
        },
        // We only send basic career meta to Node backend to save bandwidth
        careers: careers.map(c => ({ id: c.id, name: c.name }))
      };

      // Hit our new Node Express LLM API
      // In a real scenario, the backend would use OpenAI to score each career and return a map
      const mergedScores = await fetchWithAuth("/ai/recommend", {
        method: "POST",
        body: JSON.stringify(payload)
      });
      
      // Node backend might return a general recommendation string and generic mock scores right now
      // This maps whatever the Node backend sends back into the required frontend format
      const scoresMap = (mergedScores.scores || {}) as Record<string, AIScoreResult>;
      
      const scoredCareers: CareerResult[] = careers
        .map((career) => {
          const aiScore = scoresMap[career.id] || {
            score: 50, // default if LLM doesn't return
            riasec: 50,
            values: 50,
            personality: 50,
          };

          return {
            id: career.id,
            name: career.name,
            description: career.description,
            score: Math.round(aiScore.score),
            breakdown: {
              riasec: Math.round(aiScore.riasec),
              values: Math.round(aiScore.values),
              personality: Math.round(aiScore.personality),
            },
          };
        })
        .sort((a, b) => b.score - a.score);

      setAiCareerResults(scoredCareers);
    } catch (err) {
      console.error("AI scoring error:", err);
      const errorMessage = err instanceof Error ? err.message : "Failed to get AI career scores";
      setError(errorMessage);
      toast.error("AI is busy/unavailable. Using formula-based scoring instead.");
    } finally {
      setIsLoading(false);
    }
  }, [topRiasecCodes, riasecScores, higherOrderScores, bigFiveScores, enabled]);

  useEffect(() => {
    if (enabled) {
      fetchAIScores();
    }
  }, [enabled, fetchAIScores]);

  return {
    aiCareerResults,
    isLoading,
    error,
    refetch: fetchAIScores,
  };
}
