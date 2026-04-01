import { useState, useMemo } from "react";
import { API_URL } from "@/lib/api";
import { motion } from "framer-motion";
import { ArrowLeft, GraduationCap, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { universities, University } from "@/data/universitiesData";
import { UniversityFilters, UniversityFilters as FiltersType } from "./UniversityFilters";
import { UniversityFinderCard } from "./UniversityFinderCard";
import { UniversityPreferencesForm, UniversityPreferences } from "@/components/UniversityPreferencesForm";
import { usePakistanProgramsData } from "./usePakistanProgramsData";

interface UniversityFinderModuleProps {
  onBack?: () => void;
}

function extractCity(location: string): string {
  const parts = location.split(",");
  return parts[0].trim();
}

function parseTuitionFee(fee: string | undefined): number | null {
  if (!fee) return null;
  const match = fee.replace(/,/g, "").match(/(\d+)/);
  if (!match) return null;
  let value = parseInt(match[1], 10);
  if (fee.toLowerCase().includes("semester")) value *= 2;
  return value;
}

function getMinTuition(university: University): number | null {
  if (!university.tuitionFees || university.tuitionFees.length === 0) return null;
  const fees = university.tuitionFees
    .map((f) => parseTuitionFee(f.localFee))
    .filter((f): f is number => f !== null);
  return fees.length > 0 ? Math.min(...fees) : null;
}

function normalizeForMatch(str: string): string {
  return str.toLowerCase().trim().replace(/[.,'"()]/g, "").replace(/\s+/g, " ");
}

function fuzzyMatch(a: string, b: string): boolean {
  const normA = normalizeForMatch(a);
  const normB = normalizeForMatch(b);
  return normA.includes(normB) || normB.includes(normA);
}

function intersectSets(a: Set<string>, b: Set<string>): Set<string> {
  const out = new Set<string>();
  a.forEach((v) => { if (b.has(v)) out.add(v); });
  return out;
}

function formatPKR(amount: number): string {
  if (amount >= 1000000) return `PKR ${(amount / 1000000).toFixed(1)}M`;
  if (amount >= 1000) return `PKR ${(amount / 1000).toFixed(0)}K`;
  return `PKR ${amount.toLocaleString()}`;
}

function getUniversityLogoUrl(universityName: string): string | null {
  // Use the local Logos directory with the exact university name as filename
  return `/Logos/${encodeURIComponent(universityName)}.png`;
}

function createVirtualUniversity(
  universityName: string,
  city: string,
  programs: string[],
  options?: {
    allCities?: Set<string>;
    website?: string | null;
    minFee?: number | null;
    maxFee?: number | null;
    degrees?: Set<string>;
    deadlineText?: string | null;
    logoUrl?: string | null;
    eligibilityCriteria?: string | null;
    testRequired?: string | null;
    programUrl?: string | null;
    departments?: Set<string>;
  }
): University {
  const { allCities, website, minFee, maxFee, degrees, deadlineText } = options ?? {};

  const tuitionFees: { program: string; localFee: string }[] = [];
  if (minFee != null) {
    if (maxFee != null && maxFee !== minFee) {
      tuitionFees.push({ program: "Programs", localFee: `${formatPKR(minFee)} - ${formatPKR(maxFee)}` });
    } else {
      tuitionFees.push({ program: "Programs", localFee: formatPKR(minFee) });
    }
  }

  return {
    id: `db-${normalizeForMatch(universityName).replace(/\s+/g, "-")}`,
    name: universityName,
    location: `${city}, Pakistan`,
    country: "Pakistan" as const,
    type: "Private" as const,
    selectivity: "Moderately Selective" as const,
    acceptanceRate: "N/A",
    applicationDeadline: deadlineText || "Check website",
    deadlineDate: new Date(),
    fundingOptions: [],
    majorsOffered: programs,
    admissionRequirements: {
      minGrades: (options?.eligibilityCriteria as any) || "Flexible" as const,
      acceptedCurriculums: ["Matric", "FSC", "O Levels", "A Levels"],
      entranceTest: options?.testRequired || undefined,
    },
    scholarships: [],
    website: options?.programUrl || website || `https://www.google.com/search?q=${encodeURIComponent(universityName + " Pakistan official website")}`,
    logo: options?.logoUrl || undefined,
    tuitionFees: tuitionFees.length > 0 ? tuitionFees : undefined,
    internationalFriendly: false,
    financialAidForInternational: false,
    ...(allCities && allCities.size > 1 ? { additionalCities: Array.from(allCities) } : {}),
  };
}

export function UniversityFinderModule({ onBack }: UniversityFinderModuleProps) {
  const [step, setStep] = useState<"questionnaire" | "results">("questionnaire");
  const [userPreferences, setUserPreferences] = useState<UniversityPreferences | null>(null);

  const {
    allPrograms,
    pakistanInstitutes,
    pakistanMajors,
    pakistanCities,
    instituteDataMap,
    loadingProgramsData,
  } = usePakistanProgramsData({ enabled: step === "results", pageSize: 1000 });

  const pakistaniUniversities = useMemo(() => {
    return universities.filter((u) => u.country === "Pakistan");
  }, []);

  const [filters, setFilters] = useState<FiltersType>({
    search: "",
    majors: [],
    countries: [],
    cities: [],
    types: [],
    budgetRange: "any",
    rankings: [],
    institutes: [],
  });

  // Get institutes that offer selected programs
  const institutesOfferingSelectedSubjects = useMemo(() => {
    if (filters.majors.length === 0) return new Set<string>();
    const matchingInstitutes = new Set<string>();
    const normalizedSelectedMajors = filters.majors.map(m => normalizeForMatch(m));
    allPrograms.forEach((row) => {
      const normalizedProgram = normalizeForMatch(row.program || "");
      if (
        normalizedSelectedMajors.some(
          (sel) => normalizedProgram === sel || normalizedProgram.includes(sel) || sel.includes(normalizedProgram)
        )
      ) {
        matchingInstitutes.add(row.university_name);
      }
    });
    return matchingInstitutes;
  }, [filters.majors, allPrograms]);

  const institutesInSelectedCities = useMemo(() => {
    if (filters.cities.length === 0) return new Set<string>();
    const matchingInstitutes = new Set<string>();
    const normalizedSelectedCities = filters.cities.map(c => normalizeForMatch(c));
    allPrograms.forEach(row => {
      const normalizedCity = normalizeForMatch(row.city);
      if (normalizedSelectedCities.some(selectedCity => fuzzyMatch(normalizedCity, selectedCity))) {
        matchingInstitutes.add(row.university_name);
      }
    });
    return matchingInstitutes;
  }, [filters.cities, allPrograms]);

  const institutesMatchingSearch = useMemo(() => {
    if (!filters.search) return new Set<string>();
    const matchingInstitutes = new Set<string>();
    const normalizedSearch = normalizeForMatch(filters.search);
    allPrograms.forEach(row => {
      const matchesName = normalizeForMatch(row.university_name).includes(normalizedSearch);
      const matchesProgram = normalizeForMatch(row.program || "").includes(normalizedSearch);
      const matchesCity = normalizeForMatch(row.city).includes(normalizedSearch);
      const matchesDept = normalizeForMatch(row.department || "").includes(normalizedSearch);
      const matchesDegree = normalizeForMatch(row.degree || "").includes(normalizedSearch);
      const matchesEligibility = normalizeForMatch(row.eligibility_criteria || "").includes(normalizedSearch);
      const matchesTest = normalizeForMatch(row.test_required || "").includes(normalizedSearch);
      if (matchesName || matchesProgram || matchesCity || matchesDept || matchesDegree || matchesEligibility || matchesTest) {
        matchingInstitutes.add(row.university_name);
      }
    });
    return matchingInstitutes;
  }, [filters.search, allPrograms]);

  const handlePreferencesSubmit = (preferences: UniversityPreferences) => {
    setUserPreferences(preferences);
    setFilters(prev => ({
      ...prev,
      majors: preferences.preferredMajors,
      countries: preferences.countryPreferences.filter(c => c !== "Anywhere with good funding"),
    }));
    setStep("results");
  };

  const filterOptions = useMemo(() => {
    const staticMajorsSet = new Set<string>();
    const staticCitiesSet = new Set<string>();
    const rankingsSet = new Set<string>();
    pakistaniUniversities.forEach((uni) => {
      uni.majorsOffered.forEach((m) => staticMajorsSet.add(m));
      staticCitiesSet.add(extractCity(uni.location));
      if (uni.ranking) rankingsSet.add(uni.ranking);
    });
    const majors = pakistanMajors.length > 0 ? pakistanMajors : Array.from(staticMajorsSet).sort();
    const cities = pakistanCities.length > 0 ? pakistanCities : Array.from(staticCitiesSet).sort();
    return { majors, cities, rankings: Array.from(rankingsSet), institutes: pakistanInstitutes };
  }, [pakistaniUniversities, pakistanMajors, pakistanInstitutes, pakistanCities]);

  const dbInstitutesToShow = useMemo(() => {
    const hasMajor = filters.majors.length > 0;
    const hasCity = filters.cities.length > 0;
    const hasInstitute = filters.institutes.length > 0;
    const hasSearch = Boolean(filters.search && filters.search.trim().length > 0);
    let current: Set<string> | null = null;
    const apply = (s: Set<string>) => { current = current ? intersectSets(current, s) : new Set(s); };
    if (hasMajor) apply(institutesOfferingSelectedSubjects);
    if (hasCity) apply(institutesInSelectedCities);
    if (hasSearch) apply(institutesMatchingSearch);
    if (hasInstitute) apply(new Set(filters.institutes));
    return current ?? new Set<string>();
  }, [filters.majors, filters.cities, filters.search, filters.institutes, institutesOfferingSelectedSubjects, institutesInSelectedCities, institutesMatchingSearch]);

  const filteredUniversities = useMemo(() => {
    const results: University[] = [];
    const addedInstituteKeys = new Set<string>();

    const passesCommonFilters = (uni: University): boolean => {
      if (filters.search) {
        const query = filters.search.toLowerCase();
        const matchesSearch =
          uni.name.toLowerCase().includes(query) ||
          (uni.shortName?.toLowerCase().includes(query) ?? false) ||
          uni.location.toLowerCase().includes(query) ||
          uni.majorsOffered.some((m) => m.toLowerCase().includes(query));
        if (!matchesSearch) return false;
      }
      if (filters.majors.length > 0) {
        const normalizedSelected = filters.majors.map((m) => normalizeForMatch(m));
        const matchesMajor = uni.majorsOffered.some((m) => {
          const nm = normalizeForMatch(m);
          return normalizedSelected.some((sel) => nm === sel || nm.includes(sel) || sel.includes(nm));
        });
        if (!matchesMajor) return false;
      }
      if (filters.institutes.length > 0) {
        const matchesInstitute = filters.institutes.some(
          (inst) => fuzzyMatch(uni.name, inst) || (uni.shortName ? fuzzyMatch(uni.shortName, inst) : false)
        );
        if (!matchesInstitute) return false;
      }
      if (filters.cities.length > 0) {
        const uniCity = extractCity(uni.location);
        if (!filters.cities.some(selectedCity => fuzzyMatch(uniCity, selectedCity))) return false;
      }
      if (filters.types.length > 0 && !uni.id.startsWith("db-")) {
        if (!filters.types.includes(uni.type)) return false;
      }
      if (filters.budgetRange !== "any" && !uni.id.startsWith("db-")) {
        const minTuition = getMinTuition(uni);
        if (minTuition === null) return false;
        switch (filters.budgetRange) {
          case "under500k": if (minTuition >= 500000) return false; break;
          case "500k-1m": if (minTuition < 500000 || minTuition >= 1000000) return false; break;
          case "1m-2m": if (minTuition < 1000000 || minTuition >= 2000000) return false; break;
          case "over2m": if (minTuition < 2000000) return false; break;
        }
      }
      return true;
    };

    const hasActiveFilters =
      filters.majors.length > 0 || filters.institutes.length > 0 ||
      filters.cities.length > 0 || Boolean(filters.search && filters.search.trim().length > 0);

    pakistaniUniversities.forEach((uni) => {
      if (passesCommonFilters(uni)) {
        results.push(uni);
        addedInstituteKeys.add(normalizeForMatch(uni.name));
        if (uni.shortName) addedInstituteKeys.add(normalizeForMatch(uni.shortName));
      }
    });

    const buildVirtualUni = (instituteName: string, displayCity?: string) => {
      const data = instituteDataMap.get(instituteName);
      if (!data) return null;
      const logoUrl = getUniversityLogoUrl(instituteName);
      return createVirtualUniversity(
        instituteName,
        displayCity || data.primaryCity,
        Array.from(data.programs),
        {
          allCities: data.cities,
          website: data.website,
          minFee: data.minFee,
          maxFee: data.maxFee,
          degrees: data.degrees,
          deadlineText: data.deadlineText,
          logoUrl,
          eligibilityCriteria: data.eligibilityCriteria,
          testRequired: data.testRequired,
          programUrl: data.programUrl,
          departments: data.departments,
        }
      );
    };

    if (!hasActiveFilters) {
      pakistanInstitutes.forEach((instituteName) => {
        const normName = normalizeForMatch(instituteName);
        if (addedInstituteKeys.has(normName)) return;
        const virtualUni = buildVirtualUni(instituteName);
        if (virtualUni) {
          results.push(virtualUni);
          addedInstituteKeys.add(normName);
        }
      });
    } else {
      dbInstitutesToShow.forEach((instituteName) => {
        const normName = normalizeForMatch(instituteName);
        if (addedInstituteKeys.has(normName)) return;
        let displayCity: string | undefined;
        if (filters.cities.length > 0) {
          const data = instituteDataMap.get(instituteName);
          if (data) {
            const matchingCity = [...data.cities].find((city) =>
              filters.cities.some((selectedCity) => fuzzyMatch(city, selectedCity))
            );
            if (matchingCity) displayCity = matchingCity;
          }
        }
        const virtualUni = buildVirtualUni(instituteName, displayCity);
        if (virtualUni && passesCommonFilters(virtualUni)) {
          results.push(virtualUni);
          addedInstituteKeys.add(normName);
        }
      });
    }

    return results;
  }, [filters, pakistaniUniversities, instituteDataMap, dbInstitutesToShow, pakistanInstitutes]);

  const sortedUniversities = useMemo(() => {
    const selectivityOrder: Record<string, number> = {
      "Most Selective": 1, "Highly Selective": 2, "Selective": 3, "Moderately Selective": 4, "Less Selective": 5,
    };
    return [...filteredUniversities].sort((a, b) => {
      if (a.country === "Pakistan" && b.country !== "Pakistan") return -1;
      if (a.country !== "Pakistan" && b.country === "Pakistan") return 1;
      return (selectivityOrder[a.selectivity] || 99) - (selectivityOrder[b.selectivity] || 99);
    });
  }, [filteredUniversities]);

  if (step === "questionnaire") {
    return (
      <div className="min-h-screen bg-background">
        <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              {onBack && (
                <Button variant="ghost" size="icon" onClick={onBack}>
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              )}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal to-primary flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="font-display font-bold text-xl text-foreground">University Finder</h1>
                  <p className="text-sm text-muted-foreground">Tell us about yourself to find the best matches</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <UniversityPreferencesForm suggestedMajors={[]} onSubmit={handlePreferencesSubmit} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setStep("questionnaire")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal to-primary flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-display font-bold text-xl text-foreground">University Finder</h1>
                <p className="text-sm text-muted-foreground">Find universities & scholarships across Pakistan and beyond</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <UniversityFilters
          filters={filters}
          onChange={setFilters}
          availableMajors={filterOptions.majors}
          availableCities={filterOptions.cities}
          availableRankings={filterOptions.rankings}
          availableInstitutes={filterOptions.institutes}
          loadingProgramsData={loadingProgramsData}
          resultCount={sortedUniversities.length}
        />

        <div className="mt-8">
          {loadingProgramsData ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Loading universities...</h3>
              <p className="text-muted-foreground">Fetching all institutes from database</p>
            </div>
          ) : sortedUniversities.length === 0 ? (
            <div className="text-center py-16">
              <GraduationCap className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No universities match your filters</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your search or filters</p>
              <Button
                variant="outline"
                onClick={() => setFilters({ search: "", majors: [], countries: [], cities: [], types: [], budgetRange: "any", rankings: [], institutes: [] })}
              >
                Clear All Filters
              </Button>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {sortedUniversities.map((university, index) => (
                <motion.div
                  key={`${university.id}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(index * 0.03, 0.3) }}
                >
                  <UniversityFinderCard university={university} rank={index + 1} />
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {sortedUniversities.length > 0 && (
          <div className="mt-8 p-4 rounded-xl bg-primary/5 border border-primary/20">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">Want personalized recommendations?</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Take our career discovery quiz to get universities matched to your interests, personality, and values.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
