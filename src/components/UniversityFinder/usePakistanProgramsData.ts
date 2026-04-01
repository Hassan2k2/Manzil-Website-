import { useEffect, useMemo, useState } from "react";
import { fetchWithAuth } from "@/lib/api";

export interface PakistanProgram {
  university_name: string;
  city: string;
  department?: string | null;
  degree?: string | null;
  program?: string | null;
  duration?: string | null;
  eligibility_criteria?: string | null;
  test_required?: string | null;
  fee_structure?: number | null;
  admission_deadline?: string | null;
  program_url?: string | null;
}

export interface InstituteData {
  cities: Set<string>;
  programs: Set<string>;
  departments: Set<string>;
  primaryCity: string;
  minFee: number | null;
  maxFee: number | null;
  degrees: Set<string>;
  deadlineText: string | null;
  website: string;
  eligibilityCriteria: string | null;
  testRequired: string | null;
  programUrl: string | null;
}

function uniqSorted(values: string[]) {
  return [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b));
}

function generateWebsiteFromName(name: string): string {
  // ... (keeping the same logic as it's purely frontend)
  return `https://www.google.com/search?q=${encodeURIComponent(name + " Pakistan official website")}`;
}

export function usePakistanProgramsData(options: {
  enabled: boolean;
  pageSize?: number;
}) {
  const { enabled } = options;

  const [allPrograms, setAllPrograms] = useState<PakistanProgram[]>([]);
  const [pakistanInstitutes, setPakistanInstitutes] = useState<string[]>([]);
  const [pakistanMajors, setPakistanMajors] = useState<string[]>([]);
  const [loadingProgramsData, setLoadingProgramsData] = useState(false);
  const [programsError, setProgramsError] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    let cancelled = false;

    async function fetchAllPrograms() {
      setLoadingProgramsData(true);
      setProgramsError(false);

      try {
        const response = await fetch("/Pakistan_Unis/merged_all_unis_data_UPDATED_latest.json");
        if (!response.ok) throw new Error("Failed to fetch programs data file");
        const data = await response.json();
        
        if (cancelled) return;

        const all = data as PakistanProgram[];
        setAllPrograms(all);
        const institutes = uniqSorted(all.map((p) => p.university_name));
        const programs = uniqSorted(all.map((p) => p.program).filter(Boolean) as string[]);
        setPakistanInstitutes(institutes);
        setPakistanMajors(programs);
      } catch (e) {
        console.error("[UniversityFinder] Failed to fetch programs:", e);
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

  const pakistanCities = useMemo(() => {
    const citiesSet = new Set<string>();
    allPrograms.forEach((program) => {
      if (program.city) citiesSet.add(program.city);
    });
    return Array.from(citiesSet).sort((a, b) => a.localeCompare(b));
  }, [allPrograms]);

  const instituteDataMap = useMemo(() => {
    const map = new Map<string, InstituteData>();
    allPrograms.forEach((row) => {
      if (!map.has(row.university_name)) {
        map.set(row.university_name, {
          cities: new Set(),
          programs: new Set(),
          departments: new Set(),
          primaryCity: row.city,
          minFee: null,
          maxFee: null,
          degrees: new Set(),
          deadlineText: null,
          website: generateWebsiteFromName(row.university_name),
          eligibilityCriteria: null,
          testRequired: null,
          programUrl: null,
        });
      }
      const data = map.get(row.university_name)!;
      data.cities.add(row.city);
      if (row.program) data.programs.add(row.program);
      if (row.department) data.departments.add(row.department);
      if (row.degree) data.degrees.add(row.degree);

      if (row.fee_structure != null) {
        if (data.minFee === null || row.fee_structure < data.minFee) data.minFee = row.fee_structure;
        if (data.maxFee === null || row.fee_structure > data.maxFee) data.maxFee = row.fee_structure;
      }
      if (row.admission_deadline && !data.deadlineText) data.deadlineText = row.admission_deadline;
    });
    return map;
  }, [allPrograms]);

  return {
    allPrograms,
    pakistanInstitutes,
    pakistanMajors,
    pakistanCities,
    instituteDataMap,
    loadingProgramsData,
    programsError,
  };
}
