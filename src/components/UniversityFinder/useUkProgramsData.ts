import { useEffect, useMemo, useState } from "react";
import { fetchWithAuth } from "@/lib/api";

export interface UkProgram {
  university_name: string;
  city: string;
  department?: string | null;
  degree?: string | null;
  program?: string | null;
  duration?: string | null;
  eligibility_criteria?: string | null;
  test_required?: string | null;
  fee_structure?: string | null;
  admission_deadline?: string | null;
  program_url?: string | null;
}

export interface UkInstituteData {
  cities: Set<string>;
  programs: Set<string>;
  departments: Set<string>;
  primaryCity: string;
  degrees: Set<string>;
  deadlineText: string | null;
  website: string;
  eligibilityCriteria: string | null;
  testRequired: string | null;
  programUrl: string | null;
  feeStructureText: string | null;
}

function uniqSorted(values: string[]) {
  return [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b));
}

function generateWebsiteFromName(name: string): string {
  return `https://www.google.com/search?q=${encodeURIComponent(name + " UK official website")}`;
}

export function useUkProgramsData(options: {
  enabled: boolean;
  pageSize?: number;
}) {
  const { enabled } = options;

  const [allPrograms, setAllPrograms] = useState<UkProgram[]>([]);
  const [ukInstitutes, setUkInstitutes] = useState<string[]>([]);
  const [ukMajors, setUkMajors] = useState<string[]>([]);
  const [loadingProgramsData, setLoadingProgramsData] = useState(false);
  const [programsError, setProgramsError] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    let cancelled = false;

    async function fetchAllPrograms() {
      setLoadingProgramsData(true);
      setProgramsError(false);

      try {
        const data = await fetchWithAuth("/university/uk-programs");
        
        if (cancelled) return;

        const all = data as UkProgram[];
        setAllPrograms(all);
        const institutes = uniqSorted(all.map((p) => p.university_name));
        const programs = uniqSorted(all.map((p) => p.program).filter(Boolean) as string[]);
        setUkInstitutes(institutes);
        setUkMajors(programs);
      } catch (e) {
        console.error("[UniversityFinder] Failed to fetch UK programs:", e);
        if (!cancelled) {
          setProgramsError(true);
        }
      } finally {
        if (!cancelled) setLoadingProgramsData(false);
      }
    }

    fetchAllPrograms();
    return () => {
      cancelled = true;
    };
  }, [enabled]);

  const ukCities = useMemo(() => {
    const citiesSet = new Set<string>();
    allPrograms.forEach((program) => {
      if (program.city) citiesSet.add(program.city);
    });
    return Array.from(citiesSet).sort((a, b) => a.localeCompare(b));
  }, [allPrograms]);

  const instituteDataMap = useMemo(() => {
    const map = new Map<string, UkInstituteData>();
    allPrograms.forEach((row) => {
      if (!map.has(row.university_name)) {
        map.set(row.university_name, {
          cities: new Set(),
          programs: new Set(),
          departments: new Set(),
          primaryCity: row.city,
          degrees: new Set(),
          deadlineText: null,
          website: generateWebsiteFromName(row.university_name),
          eligibilityCriteria: null,
          testRequired: null,
          programUrl: null,
          feeStructureText: null,
        });
      }
      const data = map.get(row.university_name)!;
      data.cities.add(row.city);
      if (row.program) data.programs.add(row.program);
      if (row.department) data.departments.add(row.department);
      if (row.degree) data.degrees.add(row.degree);

      if (row.fee_structure && !data.feeStructureText) data.feeStructureText = row.fee_structure;
      if (row.admission_deadline && !data.deadlineText) data.deadlineText = row.admission_deadline;
    });
    return map;
  }, [allPrograms]);

  return {
    allPrograms,
    ukInstitutes,
    ukMajors,
    ukCities,
    instituteDataMap,
    loadingProgramsData,
    programsError,
  };
}
