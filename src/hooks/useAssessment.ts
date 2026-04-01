import { useState, useCallback, useMemo } from "react";
import { riasecQuestions, valuesQuestions, bigFiveQuestions, riasecLabels, higherOrderValues, valueCategories } from "@/data/quizData";
import { majors, careers } from "@/data/careersData";

export type AssessmentStep = "welcome" | "riasec" | "riasec-results" | "values" | "values-results" | "bigfive" | "bigfive-results" | "results" | "university-finder";

export interface RiasecScores {
  R: number;
  I: number;
  A: number;
  S: number;
  E: number;
  C: number;
}

export interface ValueScores {
  [key: string]: number;
}

export interface BigFiveScores {
  Extraversion: number;
  Agreeableness: number;
  Conscientiousness: number;
  Neuroticism: number;
  Openness: number;
}

export interface MajorResult {
  id: string;
  name: string;
  description: string;
  score: number;
  fitType: "top" | "good" | "not-fit";
  reasons: string[];
  mismatchReasons: string[]; // Personalized reasons why this major doesn't fit
  skills: string[];
  careers: string[];
}

export interface ScoreBreakdown {
  riasec: number;
  values: number;
  personality: number;
}

export interface CareerResult {
  id: string;
  name: string;
  description: string;
  score: number;
  breakdown: ScoreBreakdown;
}

const LOWER_TO_HIGHER_VALUE: Record<string, string> = (() => {
  const map: Record<string, string> = {};
  Object.entries(higherOrderValues).forEach(([higher, lowerValues]) => {
    lowerValues.forEach((v) => {
      map[v] = higher;
    });
  });
  return map;
})();

const normalizeHigherValue = (value: string) => LOWER_TO_HIGHER_VALUE[value] ?? value;

const clampNumber = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

const scaleMinMax = (
  raw: number,
  minRaw: number,
  maxRaw: number,
  outMin: number,
  outMax: number,
) => {
  if (!Number.isFinite(raw)) return outMin;
  if (maxRaw === minRaw) return Math.round((outMin + outMax) / 2);
  const t = (raw - minRaw) / (maxRaw - minRaw);
  return Math.round(outMin + clampNumber(t, 0, 1) * (outMax - outMin));
};

export function useAssessment() {
  const [currentStep, setCurrentStep] = useState<AssessmentStep>("welcome");
  const [riasecAnswers, setRiasecAnswers] = useState<Record<string, number>>({});
  const [valuesAnswers, setValuesAnswers] = useState<Record<string, number>>({});
  const [bigFiveAnswers, setBigFiveAnswers] = useState<Record<string, number>>({});
  const [demoMode, setDemoMode] = useState(false);
  // Current question index for each section
  const [riasecIndex, setRiasecIndex] = useState(0);
  const [valuesIndex, setValuesIndex] = useState(0);
  const [bigFiveIndex, setBigFiveIndex] = useState(0);

  // Demo/sample data for preview mode
  const demoRiasecScores: RiasecScores = { R: 12, I: 22, A: 18, S: 20, E: 15, C: 8 };
  const demoBigFiveScores: BigFiveScores = { Openness: 78, Conscientiousness: 65, Extraversion: 55, Agreeableness: 72, Neuroticism: 35 };
  const demoHigherOrderScores: Record<string, number> = { "Self-Transcendence": 45, "Self-Enhancement": 32, "Openness to Change": 38, "Conservation": 25 };
  const demoValuesScores: ValueScores = { Stimulation: 12, "Self-Direction": 14, Universalism: 16, Benevolence: 15, Conformity: 8, Tradition: 7, Security: 10, Power: 9, Achievement: 13, Hedonism: 11 };

  // Calculate RIASEC scores
  const riasecScores = useMemo<RiasecScores>(() => {
    if (demoMode) return demoRiasecScores;
    
    const scores: RiasecScores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
    
    Object.entries(riasecAnswers).forEach(([questionId, answer]) => {
      const question = riasecQuestions.find(q => q.id === questionId);
      if (question) {
        scores[question.category as keyof RiasecScores] += answer;
      }
    });
    
    return scores;
  }, [riasecAnswers, demoMode]);

  // Calculate top 3 RIASEC codes
  const topRiasecCodes = useMemo(() => {
    return Object.entries(riasecScores)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([code]) => code);
  }, [riasecScores]);

  // Calculate Values scores
  const valuesScores = useMemo<ValueScores>(() => {
    if (demoMode) return demoValuesScores;
    
    const scores: ValueScores = {};
    valueCategories.forEach(cat => scores[cat] = 0);
    
    Object.entries(valuesAnswers).forEach(([questionId, answer]) => {
      const question = valuesQuestions.find(q => q.id === questionId);
      if (question) {
        scores[question.category] = (scores[question.category] || 0) + answer;
      }
    });
    
    return scores;
  }, [valuesAnswers, demoMode]);

  // Calculate higher-order values
  const higherOrderScores = useMemo(() => {
    if (demoMode) return demoHigherOrderScores;
    
    const scores: Record<string, number> = {};
    
    Object.entries(higherOrderValues).forEach(([higher, lowerValues]) => {
      scores[higher] = lowerValues.reduce((sum, val) => sum + (valuesScores[val] || 0), 0);
    });
    
    return scores;
  }, [valuesScores, demoMode]);

  // Calculate Big Five scores
  const bigFiveScores = useMemo<BigFiveScores>(() => {
    if (demoMode) return demoBigFiveScores;
    
    const scores: BigFiveScores = {
      Extraversion: 0,
      Agreeableness: 0,
      Conscientiousness: 0,
      Neuroticism: 0,
      Openness: 0
    };
    
    const counts: Record<string, number> = {
      Extraversion: 0,
      Agreeableness: 0,
      Conscientiousness: 0,
      Neuroticism: 0,
      Openness: 0
    };
    
    Object.entries(bigFiveAnswers).forEach(([questionId, answer]) => {
      const question = bigFiveQuestions.find(q => q.id === questionId);
      if (question) {
        const [trait, direction] = question.category.split("_");
        // Reverse score for "Low" items
        const adjustedScore = direction === "Low" ? (6 - answer) : answer;
        scores[trait as keyof BigFiveScores] += adjustedScore;
        counts[trait] += 1;
      }
    });
    
    // Normalize to percentages
    Object.keys(scores).forEach(trait => {
      const maxPossible = counts[trait] * 5;
      if (maxPossible > 0) {
        scores[trait as keyof BigFiveScores] = Math.round((scores[trait as keyof BigFiveScores] / maxPossible) * 100);
      }
    });
    
    return scores;
  }, [bigFiveAnswers, demoMode]);

  // Function to skip directly to results with demo data
  const skipToResults = useCallback(() => {
    setDemoMode(true);
    setCurrentStep("results");
  }, []);

  // Function to go directly to university finder (no quiz results)
  const goToUniversityFinder = useCallback(() => {
    setCurrentStep("university-finder");
  }, []);

  // Calculate major recommendations
  const majorResults = useMemo<MajorResult[]>(() => {
    // Get top 3 higher-order values
    const topHigherValues = Object.entries(higherOrderScores)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([val]) => val);

    const rawResults = majors.map((major) => {
      let totalScore = 0;
      const reasons: string[] = [];
      const mismatchReasons: string[] = [];

      // RIASEC matching (40% weight)
      let riasecScore = 0;
      major.riasecMatch.forEach((code, majorIndex) => {
        const userPosition = topRiasecCodes.indexOf(code);
        if (userPosition !== -1) {
          const majorWeight = majorIndex === 0 ? 1.0 : majorIndex === 1 ? 0.7 : 0.4;
          const userWeight = userPosition === 0 ? 1.0 : userPosition === 1 ? 0.85 : 0.7;
          riasecScore += majorWeight * userWeight;
        }
      });
      const riasecPoints = Math.min(40, (riasecScore / 1.5) * 40);
      totalScore += riasecPoints;

      if (riasecScore >= 0.9) {
        const topCodes = major.riasecMatch
          .slice(0, 2)
          .map((c) => riasecLabels[c as keyof typeof riasecLabels]?.name)
          .filter(Boolean)
          .join(" & ");
        if (topCodes) reasons.push(`Strong match with your ${topCodes} interests`);
      }

      // Generate RIASEC mismatch reasons
      if (riasecScore < 0.5) {
        const majorPrimaryCode = major.riasecMatch[0];
        const majorPrimaryName = riasecLabels[majorPrimaryCode as keyof typeof riasecLabels]?.name;
        const userTopName = riasecLabels[topRiasecCodes[0] as keyof typeof riasecLabels]?.name;
        if (majorPrimaryName && userTopName && majorPrimaryName !== userTopName) {
          mismatchReasons.push(`This major emphasizes ${majorPrimaryName} interests, but you prefer ${userTopName} activities`);
        }
      }

      // Values matching (35% weight)
      const normalizedMajorValues = major.valueMatch.map(normalizeHigherValue);
      let valuesScore = 0;
      normalizedMajorValues.forEach((val, index) => {
        const valuePosition = topHigherValues.indexOf(val);
        if (valuePosition !== -1) {
          const weight = index === 0 ? 1.0 : 0.7;
          const posWeight = valuePosition === 0 ? 1.0 : valuePosition === 1 ? 0.85 : 0.7;
          valuesScore += weight * posWeight;
        }
      });
      const valuesPoints = Math.min(35, (valuesScore / 1.3) * 35);
      totalScore += valuesPoints;

      if (valuesScore > 0) reasons.push("Aligns with your core values");

      // Generate values mismatch reasons
      if (valuesScore < 0.3) {
        const majorPrimaryValue = normalizedMajorValues[0];
        const userTopValue = topHigherValues[0];
        if (majorPrimaryValue && userTopValue && majorPrimaryValue !== userTopValue) {
          mismatchReasons.push(`You value ${userTopValue}, but this field prioritizes ${majorPrimaryValue}`);
        }
      }
      // Personality matching (25% weight)
      let personalityScore = 0;
      const personalityMismatches: string[] = [];
      const traits: (keyof BigFiveScores)[] = [
        "Openness",
        "Conscientiousness",
        "Extraversion",
        "Agreeableness",
        "Neuroticism",
      ];

      const traitDescriptions: Record<string, { high: string; low: string; requiresLow: string; userHigh: string }> = {
        Openness: { high: "curiosity and abstract thinking", low: "prefer practical, concrete approaches", requiresLow: "structured, routine work", userHigh: "thrive on novelty and creativity" },
        Conscientiousness: { high: "high organization and discipline", low: "prefer flexibility over strict routines", requiresLow: "flexibility and spontaneity", userHigh: "prefer order and planning" },
        Extraversion: { high: "social energy and teamwork", low: "prefer independent, quieter work", requiresLow: "independent, solitary work", userHigh: "are energized by social interaction" },
        Agreeableness: { high: "empathy and collaboration", low: "prefer working independently", requiresLow: "tough decision-making", userHigh: "prioritize harmony and cooperation" },
        Neuroticism: { high: "emotional sensitivity", low: "stay calm under pressure", requiresLow: "high-pressure environments", userHigh: "may find constant stress draining" },
      };

      traits.forEach((trait) => {
        const userLevel = bigFiveScores[trait];
        const required = major.personalityMatch[trait.toLowerCase() as keyof typeof major.personalityMatch];

        if (required === "high") {
          if (userLevel >= 65) personalityScore += 1.0;
          else if (userLevel >= 50) personalityScore += 0.6;
          else if (userLevel >= 35) personalityScore += 0.3;
          else if (userLevel < 35 && traitDescriptions[trait]) {
            personalityMismatches.push(`This major suits those with ${traitDescriptions[trait].high}, but you ${traitDescriptions[trait].low}`);
          }
        } else if (required === "medium") {
          if (userLevel >= 35 && userLevel <= 75) personalityScore += 1.0;
          else if (userLevel >= 25 && userLevel <= 85) personalityScore += 0.6;
          else if (userLevel >= 15 && userLevel <= 95) personalityScore += 0.3;
        } else if (required === "low") {
          if (userLevel <= 45) personalityScore += 1.0;
          else if (userLevel <= 60) personalityScore += 0.6;
          else if (userLevel <= 75) personalityScore += 0.3;
          else if (userLevel > 75 && traitDescriptions[trait]) {
            personalityMismatches.push(`This field involves ${traitDescriptions[trait].requiresLow}, but you ${traitDescriptions[trait].userHigh}`);
          }
        }
      });

      const personalityPoints = (personalityScore / 5) * 25;
      totalScore += personalityPoints;

      if (personalityScore >= 3.2) reasons.push("Matches your personality profile");

      // Keep a raw score (0–100) and scale *relative to the current set* to avoid score “pileups” (e.g., lots of 98s)
      const rawScore = clampNumber(Math.round(totalScore), 0, 100);

      return {
        _raw: rawScore,
        result: {
          id: major.id,
          name: major.name,
          description: major.description,
          score: rawScore,
          fitType: "not-fit" as const,
          reasons: reasons.length > 0 ? reasons : ["General academic interest"],
          mismatchReasons: [...mismatchReasons, ...personalityMismatches].slice(0, 3),
          skills: major.skills,
          careers: major.careers,
        } satisfies MajorResult,
      };
    });

    const minRaw = Math.min(...rawResults.map((r) => r._raw));
    const maxRaw = Math.max(...rawResults.map((r) => r._raw));

    const OUT_MIN = 35;
    const OUT_MAX = 95;

    const scaled = rawResults.map(({ _raw, result }) => ({
      ...result,
      score: scaleMinMax(_raw, minRaw, maxRaw, OUT_MIN, OUT_MAX),
    }));

    const sorted = scaled.slice().sort((a, b) => b.score - a.score);

    // Assign fit types based on ranking, not absolute score
    return sorted.map((result, index) => ({
      ...result,
      fitType: index < 5 ? ("top" as const) : index < 10 ? ("good" as const) : ("not-fit" as const),
    }));
  }, [topRiasecCodes, higherOrderScores, bigFiveScores]);

  // Calculate career recommendations based on RIASEC, Values, and Big Five
  const careerResults = useMemo<CareerResult[]>(() => {
    // Get top 3 higher-order values
    const topHigherValues = Object.entries(higherOrderScores)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([val]) => val);

    const rawResults = careers.map((career) => {
      // RIASEC matching (40% weight)
      let riasecRaw = 0;
      career.riasecMatch.forEach((code, careerIndex) => {
        const userPosition = topRiasecCodes.indexOf(code);
        if (userPosition !== -1) {
          const careerWeight = careerIndex === 0 ? 1.0 : careerIndex === 1 ? 0.7 : 0.4;
          const userWeight = userPosition === 0 ? 1.0 : userPosition === 1 ? 0.85 : 0.7;
          riasecRaw += careerWeight * userWeight;
        }
      });
      const riasecPoints = Math.min(40, (riasecRaw / 1.5) * 40);

      // Values matching (35% weight)
      const normalizedCareerValues = career.valueMatch.map(normalizeHigherValue);
      let valuesRaw = 0;
      normalizedCareerValues.forEach((val, index) => {
        const valuePosition = topHigherValues.indexOf(val);
        if (valuePosition !== -1) {
          const weight = index === 0 ? 1.0 : 0.7;
          const posWeight = valuePosition === 0 ? 1.0 : valuePosition === 1 ? 0.85 : 0.7;
          valuesRaw += weight * posWeight;
        }
      });
      const valuesPoints = Math.min(35, (valuesRaw / 1.3) * 35);

      // Personality matching (25% weight)
      let personalityRaw = 0;
      const traits: (keyof BigFiveScores)[] = [
        "Openness",
        "Conscientiousness",
        "Extraversion",
        "Agreeableness",
        "Neuroticism",
      ];

      traits.forEach((trait) => {
        const userLevel = bigFiveScores[trait];
        const required = career.personalityMatch[trait.toLowerCase() as keyof typeof career.personalityMatch];

        if (required === "high") {
          if (userLevel >= 65) personalityRaw += 1.0;
          else if (userLevel >= 50) personalityRaw += 0.6;
          else if (userLevel >= 35) personalityRaw += 0.3;
        } else if (required === "medium") {
          if (userLevel >= 35 && userLevel <= 75) personalityRaw += 1.0;
          else if (userLevel >= 25 && userLevel <= 85) personalityRaw += 0.6;
          else if (userLevel >= 15 && userLevel <= 95) personalityRaw += 0.3;
        } else if (required === "low") {
          if (userLevel <= 45) personalityRaw += 1.0;
          else if (userLevel <= 60) personalityRaw += 0.6;
          else if (userLevel <= 75) personalityRaw += 0.3;
        }
      });
      const personalityPoints = (personalityRaw / 5) * 25;

      const totalScore = riasecPoints + valuesPoints + personalityPoints;
      const rawScore = clampNumber(Math.round(totalScore), 0, 100);

      // Calculate percentage breakdown (how much each component contributed)
      const riasecPct = Math.round((riasecPoints / 40) * 100);
      const valuesPct = Math.round((valuesPoints / 35) * 100);
      const personalityPct = Math.round((personalityPoints / 25) * 100);

      return {
        _raw: rawScore,
        result: {
          id: career.id,
          name: career.name,
          description: career.description,
          score: rawScore, // temporary; will be scaled below
          breakdown: {
            riasec: riasecPct,
            values: valuesPct,
            personality: personalityPct,
          },
        } satisfies CareerResult,
      };
    });

    const minRaw = Math.min(...rawResults.map((r) => r._raw));
    const maxRaw = Math.max(...rawResults.map((r) => r._raw));

    const OUT_MIN = 35;
    const OUT_MAX = 95;

    const scaled = rawResults.map(({ _raw, result }) => ({
      ...result,
      score: scaleMinMax(_raw, minRaw, maxRaw, OUT_MIN, OUT_MAX),
    }));

    return scaled.slice().sort((a, b) => b.score - a.score);
  }, [topRiasecCodes, higherOrderScores, bigFiveScores]);

  // Answer handlers
  const answerRiasec = useCallback((questionId: string, value: number) => {
    setRiasecAnswers(prev => ({ ...prev, [questionId]: value }));
  }, []);

  const answerValues = useCallback((questionId: string, value: number) => {
    setValuesAnswers(prev => ({ ...prev, [questionId]: value }));
  }, []);

  const answerBigFive = useCallback((questionId: string, value: number) => {
    setBigFiveAnswers(prev => ({ ...prev, [questionId]: value }));
  }, []);


  // Progress calculation
  const riasecProgress = (Object.keys(riasecAnswers).length / riasecQuestions.length) * 100;
  const valuesProgress = (Object.keys(valuesAnswers).length / valuesQuestions.length) * 100;
  const bigFiveProgress = (Object.keys(bigFiveAnswers).length / bigFiveQuestions.length) * 100;
  
  const totalProgress = (
    (Object.keys(riasecAnswers).length + 
     Object.keys(valuesAnswers).length + 
     Object.keys(bigFiveAnswers).length) /
    (riasecQuestions.length + valuesQuestions.length + bigFiveQuestions.length)
  ) * 100;

  // Navigation
  const goToStep = useCallback((step: AssessmentStep) => {
    setCurrentStep(step);
  }, []);

  const nextQuestion = useCallback(() => {
    if (currentStep === "riasec") {
      if (riasecIndex < riasecQuestions.length - 1) {
        setRiasecIndex(prev => prev + 1);
      } else {
        setCurrentStep("riasec-results");
      }
    } else if (currentStep === "values") {
      if (valuesIndex < valuesQuestions.length - 1) {
        setValuesIndex(prev => prev + 1);
      } else {
        setCurrentStep("values-results");
      }
    } else if (currentStep === "bigfive") {
      if (bigFiveIndex < bigFiveQuestions.length - 1) {
        setBigFiveIndex(prev => prev + 1);
      } else {
        setCurrentStep("bigfive-results");
      }
    }
  }, [currentStep, riasecIndex, valuesIndex, bigFiveIndex]);

  const prevQuestion = useCallback(() => {
    if (currentStep === "riasec") {
      if (riasecIndex > 0) {
        setRiasecIndex(prev => prev - 1);
      } else {
        setCurrentStep("welcome");
      }
    } else if (currentStep === "values") {
      if (valuesIndex > 0) {
        setValuesIndex(prev => prev - 1);
      } else {
        setRiasecIndex(riasecQuestions.length - 1);
        setCurrentStep("riasec");
      }
    } else if (currentStep === "bigfive") {
      if (bigFiveIndex > 0) {
        setBigFiveIndex(prev => prev - 1);
      } else {
        setValuesIndex(valuesQuestions.length - 1);
        setCurrentStep("values");
      }
    }
  }, [currentStep, riasecIndex, valuesIndex, bigFiveIndex]);

  // Restore session from saved data
  const restoreSession = useCallback((data: {
    currentStep: AssessmentStep;
    riasecAnswers: Record<string, number>;
    valuesAnswers: Record<string, number>;
    bigFiveAnswers: Record<string, number>;
  }) => {
    setRiasecAnswers(data.riasecAnswers);
    setValuesAnswers(data.valuesAnswers);
    setBigFiveAnswers(data.bigFiveAnswers);
    
    // Set indices based on answered questions
    const riasecAnsweredCount = Object.keys(data.riasecAnswers).length;
    const valuesAnsweredCount = Object.keys(data.valuesAnswers).length;
    const bigFiveAnsweredCount = Object.keys(data.bigFiveAnswers).length;
    
    setRiasecIndex(Math.min(riasecAnsweredCount, riasecQuestions.length - 1));
    setValuesIndex(Math.min(valuesAnsweredCount, valuesQuestions.length - 1));
    setBigFiveIndex(Math.min(bigFiveAnsweredCount, bigFiveQuestions.length - 1));
    
    setCurrentStep(data.currentStep);
  }, []);

  return {
    // State
    currentStep,
    riasecIndex,
    valuesIndex,
    bigFiveIndex,
    riasecAnswers,
    valuesAnswers,
    bigFiveAnswers,
    
    // Scores
    riasecScores,
    topRiasecCodes,
    valuesScores,
    higherOrderScores,
    bigFiveScores,
    
    // Results
    majorResults,
    careerResults,
    
    // Progress
    riasecProgress,
    valuesProgress,
    bigFiveProgress,
    totalProgress,
    
    // Actions
    answerRiasec,
    answerValues,
    answerBigFive,
    goToStep,
    nextQuestion,
    prevQuestion,
    skipToResults,
    goToUniversityFinder,
    restoreSession,
    
    // Questions
    riasecQuestions,
    valuesQuestions,
    bigFiveQuestions,
  };
}
