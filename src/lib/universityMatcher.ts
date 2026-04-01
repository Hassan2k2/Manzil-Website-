// University Matching Algorithm
// Scores universities based on student profile and outputs Reach/Match/Safe tiers

import { University } from "@/data/universitiesData";
import { UniversityPreferences } from "@/components/UniversityPreferencesForm";
import { normalizeGrade, getUniversityRequirementScore, EligibilityBand } from "./gradeNormalization";

export type MatchTier = "Reach" | "Match" | "Safety";

export interface ScoredUniversity {
  university: University;
  score: number;
  tier: MatchTier;
  matchReasons: string[];
  concerns: string[];
  gradeMatch: "exceeds" | "meets" | "below";
  fundingMatch: boolean;
  majorMatch: boolean;
}

interface MatchingCriteria {
  studentGradeScore: number;
  studentGradeBand: EligibilityBand;
  needsFullFunding: boolean;
  needsPartialFunding: boolean;
  preferredCountries: string[];
  preferredMajors: string[];
  curriculum: string;
}

function parsePreferences(preferences: UniversityPreferences): MatchingCriteria {
  const normalized = normalizeGrade(preferences.curriculum, preferences.gradeLevel);
  
  const needsFullFunding = preferences.fundingNeed === "Full scholarship required";
  const needsPartialFunding = preferences.fundingNeed === "Partial scholarship preferred" || needsFullFunding;
  
  // Handle "Anywhere with good funding" as all countries
  const preferredCountries = preferences.countryPreferences.includes("Anywhere with good funding")
    ? ["Pakistan", "US", "UK", "Canada"]
    : preferences.countryPreferences;
  
  return {
    studentGradeScore: normalized.score,
    studentGradeBand: normalized.band,
    needsFullFunding,
    needsPartialFunding,
    preferredCountries,
    preferredMajors: preferences.preferredMajors,
    curriculum: preferences.curriculum,
  };
}

function calculateUniversityScore(
  university: University,
  criteria: MatchingCriteria
): { score: number; matchReasons: string[]; concerns: string[]; gradeMatch: "exceeds" | "meets" | "below"; fundingMatch: boolean; majorMatch: boolean } {
  let score = 0;
  const matchReasons: string[] = [];
  const concerns: string[] = [];
  
  // 1. Country match - skip country filtering since we pre-filter to Pakistan only
  // All Pakistani universities pass this check
  score += 20;
  matchReasons.push(`Located in ${university.country}`);
  
  // 2. Grade matching (40 points max)
  const uniRequirementScore = getUniversityRequirementScore(university.admissionRequirements.minGrades);
  const gradeDiff = criteria.studentGradeScore - uniRequirementScore;
  
  let gradeMatch: "exceeds" | "meets" | "below";
  if (gradeDiff >= 1) {
    score += 40;
    gradeMatch = "exceeds";
    matchReasons.push("Your grades exceed requirements");
  } else if (gradeDiff === 0) {
    score += 30;
    gradeMatch = "meets";
    matchReasons.push("Your grades meet requirements");
  } else if (gradeDiff === -1) {
    score += 15;
    gradeMatch = "below";
    concerns.push("Your grades are slightly below typical admits");
  } else {
    score += 5;
    gradeMatch = "below";
    concerns.push("Your grades are below typical requirements");
  }
  
  // 3. Major matching (20 points max)
  const matchingMajors = university.majorsOffered.filter(major => 
    criteria.preferredMajors.some(pref => 
      major.toLowerCase().includes(pref.toLowerCase()) || 
      pref.toLowerCase().includes(major.toLowerCase())
    )
  );
  
  const majorMatch = matchingMajors.length > 0;
  if (majorMatch) {
    score += 20;
    matchReasons.push(`Offers: ${matchingMajors.slice(0, 2).join(", ")}`);
  } else {
    concerns.push("No direct major match found");
  }
  
  // 4. Funding matching (20 points max)
  let fundingMatch = false;
  
  if (criteria.needsFullFunding) {
    const hasFullFunding = university.fundingOptions.some(f => 
      f.type === "Full Scholarship" || 
      f.type === "Need-Based Aid" ||
      f.amount?.includes("100%")
    );
    
    if (hasFullFunding && (university.financialAidForInternational || university.country === "Pakistan")) {
      score += 20;
      fundingMatch = true;
      matchReasons.push("Full funding available");
    } else if (hasFullFunding) {
      score += 10;
      fundingMatch = true;
      concerns.push("Funding may be limited for international students");
    } else {
      concerns.push("Full funding may not be available");
    }
  } else if (criteria.needsPartialFunding) {
    const hasAnyFunding = university.fundingOptions.length > 0;
    if (hasAnyFunding) {
      score += 15;
      fundingMatch = true;
      matchReasons.push("Scholarships available");
    }
  } else {
    score += 10; // Self-funded students get bonus
    fundingMatch = true;
  }
  
  // 5. Curriculum acceptance (bonus)
  const acceptedCurriculums = university.admissionRequirements.acceptedCurriculums;
  const curriculumMap: Record<string, string[]> = {
    "Cambridge": ["O Levels", "A Levels"],
    "National": ["FSC", "Matric"],
    "IB": ["IB"],
  };
  
  const studentCurriculums = curriculumMap[criteria.curriculum] || [];
  const curriculumAccepted = studentCurriculums.some(c => acceptedCurriculums.includes(c as any));
  
  if (!curriculumAccepted) {
    score -= 10;
    concerns.push(`May not accept ${criteria.curriculum} curriculum directly`);
  }
  
  // 6. Selectivity adjustment
  if (university.selectivity === "Most Selective") {
    score -= 5; // Harder to get in
  } else if (university.selectivity === "Less Selective") {
    score += 5; // Easier to get in
  }
  
  return { score, matchReasons, concerns, gradeMatch, fundingMatch, majorMatch };
}

function determineTier(
  score: number,
  gradeMatch: "exceeds" | "meets" | "below",
  selectivity: string
): MatchTier {
  // Tier determination based on score and grade match
  if (gradeMatch === "below" || (selectivity === "Most Selective" && gradeMatch !== "exceeds")) {
    return "Reach";
  }
  
  if (gradeMatch === "exceeds" && selectivity !== "Most Selective") {
    return "Safety";
  }
  
  if (score >= 80) {
    return "Safety";
  } else if (score >= 60) {
    return "Match";
  } else {
    return "Reach";
  }
}

export function matchUniversities(
  universities: University[],
  preferences: UniversityPreferences
): ScoredUniversity[] {
  const criteria = parsePreferences(preferences);
  
  // Filter to only Pakistani universities for now (other countries coming soon)
  const pakistaniUniversities = universities.filter(u => u.country === "Pakistan");
  
  const scored = pakistaniUniversities
    .map(university => {
      const { score, matchReasons, concerns, gradeMatch, fundingMatch, majorMatch } = calculateUniversityScore(university, criteria);
      if (score < 0) return null; // Filtered out
      
      const tier = determineTier(score, gradeMatch, university.selectivity);
      
      return {
        university,
        score,
        tier,
        matchReasons,
        concerns,
        gradeMatch,
        fundingMatch,
        majorMatch,
      };
    })
    .filter((result): result is ScoredUniversity => result !== null)
    .sort((a, b) => {
      // Sort by tier first (Safety > Match > Reach for display), then by score
      const tierOrder: Record<MatchTier, number> = { Safety: 3, Match: 2, Reach: 1 };
      if (tierOrder[a.tier] !== tierOrder[b.tier]) {
        return tierOrder[b.tier] - tierOrder[a.tier];
      }
      return b.score - a.score;
    });
  
  return scored;
}

export function groupByTier(scoredUniversities: ScoredUniversity[]): Record<MatchTier, ScoredUniversity[]> {
  return {
    Reach: scoredUniversities.filter(u => u.tier === "Reach"),
    Match: scoredUniversities.filter(u => u.tier === "Match"),
    Safety: scoredUniversities.filter(u => u.tier === "Safety"),
  };
}

export function getTierColor(tier: MatchTier): { bg: string; text: string; border: string } {
  switch (tier) {
    case "Reach":
      return { bg: "bg-coral/10", text: "text-coral", border: "border-coral/30" };
    case "Match":
      return { bg: "bg-primary/10", text: "text-primary", border: "border-primary/30" };
    case "Safety":
      return { bg: "bg-teal/10", text: "text-teal", border: "border-teal/30" };
  }
}

export function getTierDescription(tier: MatchTier): string {
  switch (tier) {
    case "Reach":
      return "Competitive admission - strong application needed";
    case "Match":
      return "Good fit - your profile aligns well";
    case "Safety":
      return "Likely admission - you exceed requirements";
  }
}
