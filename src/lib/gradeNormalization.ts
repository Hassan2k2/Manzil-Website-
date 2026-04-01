// Grade Normalization System
// Converts different curriculum grades to a unified eligibility band

export type EligibilityBand = "Elite" | "Very Strong" | "Strong" | "Average" | "Below Average";

export interface NormalizedGrade {
  band: EligibilityBand;
  score: number; // 1-5 scale for matching (5 = Elite, 1 = Below Average)
  description: string;
}

// Grade mapping for Cambridge O/A Levels
const cambridgeGradeMap: Record<string, NormalizedGrade> = {
  "A*/A": { band: "Elite", score: 5, description: "Top-tier Cambridge performance" },
  "B": { band: "Very Strong", score: 4, description: "Strong Cambridge record" },
  "C": { band: "Strong", score: 3, description: "Solid Cambridge foundation" },
  "D or below": { band: "Average", score: 2, description: "Below average Cambridge grades" },
};

// Grade mapping for National (FSc/Matric) - percentage based
const nationalGradeMap: Record<string, NormalizedGrade> = {
  "A+ (85-100%)": { band: "Elite", score: 5, description: "Top-tier (935+ marks)" },
  "A (75-84%)": { band: "Very Strong", score: 4, description: "Very Good (825-934 marks)" },
  "B (65-74%)": { band: "Strong", score: 3, description: "Good (715-824 marks)" },
  "C (55-64%)": { band: "Average", score: 2, description: "Average (605-714 marks)" },
  "D or below": { band: "Below Average", score: 1, description: "Below 605 marks" },
};

// Grade mapping for IB - points out of 45
const ibGradeMap: Record<string, NormalizedGrade> = {
  "Top tier (42-45)": { band: "Elite", score: 5, description: "Excellent / Elite (42-45 points)" },
  "Strong (36-41)": { band: "Very Strong", score: 4, description: "Strong / Very Strong (36-41 points)" },
  "Average (30-35)": { band: "Strong", score: 3, description: "Average (30-35 points)" },
  "Below 30": { band: "Below Average", score: 1, description: "Below passing threshold" },
};

// University requirement grade bands
export const universityGradeBands: Record<string, { minScore: number; band: EligibilityBand }> = {
  "Top tier (A*/A)": { minScore: 5, band: "Elite" },
  "Strong (B+/A)": { minScore: 4, band: "Very Strong" },
  "Average (C-B)": { minScore: 3, band: "Strong" },
  "Flexible": { minScore: 2, band: "Average" },
};

export function normalizeGrade(curriculum: string, gradeLevel: string): NormalizedGrade {
  let gradeMap: Record<string, NormalizedGrade>;
  
  switch (curriculum) {
    case "Cambridge":
      gradeMap = cambridgeGradeMap;
      break;
    case "National":
      gradeMap = nationalGradeMap;
      break;
    case "IB":
      gradeMap = ibGradeMap;
      break;
    default:
      gradeMap = cambridgeGradeMap;
  }
  
  return gradeMap[gradeLevel] || { band: "Average", score: 2, description: "Grade not specified" };
}

export function getUniversityRequirementScore(minGrades: string): number {
  return universityGradeBands[minGrades]?.minScore || 2;
}

// Get band color for UI
export function getBandColor(band: EligibilityBand): string {
  switch (band) {
    case "Elite":
      return "text-amber";
    case "Very Strong":
      return "text-teal";
    case "Strong":
      return "text-primary";
    case "Average":
      return "text-muted-foreground";
    case "Below Average":
      return "text-coral";
    default:
      return "text-foreground";
  }
}

export function getBandBgColor(band: EligibilityBand): string {
  switch (band) {
    case "Elite":
      return "bg-amber/20";
    case "Very Strong":
      return "bg-teal/20";
    case "Strong":
      return "bg-primary/20";
    case "Average":
      return "bg-muted";
    case "Below Average":
      return "bg-coral/20";
    default:
      return "bg-muted";
  }
}
