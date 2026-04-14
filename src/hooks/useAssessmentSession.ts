import { useState, useEffect, useCallback, useRef } from "react";
import { fetchWithAuth } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import type { AssessmentStep, RiasecScores, BigFiveScores, MajorResult, CareerResult } from "./useAssessment";

interface SessionData {
  id: string;
  user_id: string | null;
  current_step: string;
  riasec_answers: Record<string, number>;
  values_answers: Record<string, number>;
  big_five_answers: Record<string, number>;
  riasec_scores: RiasecScores;
  top_riasec_codes: string[];
  value_scores: Record<string, number>;
  higher_order_scores: Record<string, number>;
  big_five_scores: BigFiveScores;
  major_results: MajorResult[];
  career_results: CareerResult[];
  completed_at: string | null;
}

interface UseAssessmentSessionReturn {
  sessionId: string | null;
  isLoading: boolean;
  hasExistingSession: boolean;
  initSession: () => Promise<string | null>;
  saveProgress: (data: Partial<SessionData>) => Promise<void>;
  markCompleted: () => Promise<void>;
  resumeSession: SessionData | null;
}

export function useAssessmentSession(): UseAssessmentSessionReturn {
  const { user } = useAuth();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasExistingSession, setHasExistingSession] = useState(false);
  const [resumeSession, setResumeSession] = useState<SessionData | null>(null);
  const pendingDataRef = useRef<Partial<SessionData> | null>(null);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const checkExistingSession = async () => {
      if (!user) {
        setHasExistingSession(false);
        setResumeSession(null);
        setSessionId(null);
        setIsLoading(false);
        return;
      }

      try {
        const sessionData = await fetchWithAuth('/assessment/progress');
        if (sessionData && sessionData.currentStep !== 'welcome') {
          setHasExistingSession(true);
          // Map backend casing to frontend casing
          setResumeSession({
            id: sessionData.id,
            user_id: sessionData.userId,
            current_step: sessionData.currentStep,
            riasec_answers: sessionData.riasecAnswers,
            values_answers: sessionData.valuesAnswers,
            big_five_answers: sessionData.bigFiveAnswers,
            riasec_scores: sessionData.riasecScores,
            top_riasec_codes: sessionData.topRiasecCodes,
            value_scores: sessionData.valuesScores,
            higher_order_scores: sessionData.higherOrderScores || {},
            big_five_scores: sessionData.bigFiveScores,
            major_results: sessionData.majorResults,
            career_results: [],
            completed_at: null
          });
          setSessionId(sessionData.id);
        }
      } catch (err) {
        console.error('Failed to check existing session:', err);
      }
      setIsLoading(false);
    };

    checkExistingSession();
  }, [user]);

  const initSession = useCallback(async (): Promise<string | null> => {
    try {
      const resp = await fetchWithAuth('/assessment/progress', {
        method: 'POST',
        body: JSON.stringify({ current_step: 'riasec' })
      });
      setSessionId(resp.assessment.id);
      setHasExistingSession(false);
      setResumeSession(null);
      return resp.assessment.id;
    } catch (err) {
      console.error('Failed to create session:', err);
      return null;
    }
  }, []);

  const saveProgress = useCallback(async (data: Partial<SessionData>) => {
    if (!sessionId) return;

    pendingDataRef.current = { ...pendingDataRef.current, ...data };

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(async () => {
      const dataToSave = pendingDataRef.current;
      pendingDataRef.current = null;

      if (!dataToSave) return;

      try {
        await fetchWithAuth('/assessment/progress', {
          method: 'POST',
          body: JSON.stringify(dataToSave)
        });
      } catch (err) {
        console.error('Failed to save progress:', err);
      }
    }, 500);
  }, [sessionId]);

  const markCompleted = useCallback(async () => {
    if (!sessionId) return;
    try {
      await fetchWithAuth('/assessment/progress', {
        method: 'POST',
        body: JSON.stringify({ current_step: 'results', completed_at: new Date().toISOString() })
      });
    } catch (err) {
      console.error('Failed to mark completed:', err);
    }
  }, [sessionId]);

  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  return {
    sessionId,
    isLoading,
    hasExistingSession,
    initSession,
    saveProgress,
    markCompleted,
    resumeSession,
  };
}
