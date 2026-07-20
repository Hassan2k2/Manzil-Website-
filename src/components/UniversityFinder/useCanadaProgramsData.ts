import { useEffect, useMemo, useState } from "react";

export interface CanadaProgram {
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
  verification_notes?: string | null;
}

export interface CanadaInstituteData {
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
  durations: Set<string>;
  scholarships: any[];
}

function uniqSorted(values: string[]) {
  return [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b));
}

// Known Canada university domain map for direct website links
const CANADA_DOMAIN_MAP: Record<string, string> = {
  "Brock University": "brocku.ca",
  "Carleton University": "carleton.ca",
  "Concordia University": "concordia.ca",
  "Dalhousie University": "dal.ca",
  "HEC Montréal": "hec.ca",
  "McGill University": "mcgill.ca",
  "McMaster University": "mcmaster.ca",
  "Memorial University of Newfoundland": "mun.ca",
  "Polytechnique Montréal": "polymtl.ca",
  "Queen's University": "queensu.ca",
  "Simon Fraser University": "sfu.ca",
  "Thompson Rivers University": "tru.ca",
  "Toronto Metropolitan University": "torontomu.ca",
  "Trent University": "trentu.ca",
  "University of Alberta": "ualberta.ca",
  "University of British Columbia": "ubc.ca",
  "University of Calgary": "ucalgary.ca",
  "University of Guelph": "uoguelph.ca",
  "University of Lethbridge": "ulethbridge.ca",
  "University of Manitoba": "umanitoba.ca",
  "University of New Brunswick": "unb.ca",
  "University of Ottawa": "uottawa.ca",
  "University of Regina": "uregina.ca",
  "University of Saskatchewan": "usask.ca",
  "University of Toronto": "utoronto.ca",
  "University of Victoria": "uvic.ca",
  "University of Waterloo": "uwaterloo.ca",
  "University of Windsor": "uwindsor.ca",
  "Université Laval": "ulaval.ca",
  "Université de Montréal": "umontreal.ca",
  "Université de Sherbrooke": "usherbrooke.ca",
  "Université du Québec à Chicoutimi (UQAC)": "uqac.ca",
  "Université du Québec à Montréal (UQAM)": "uqam.ca",
  "Université du Québec": "uquebec.ca",
  "Western University": "uwo.ca",
  "York University": "yorku.ca",
  "École de Technologie Supérieure (ÉTS)": "etsmtl.ca",
};

export function generateCanadaWebsite(name: string): string {
  const domain = CANADA_DOMAIN_MAP[name];
  if (domain) return `https://www.${domain}`;
  return `https://www.google.com/search?q=${encodeURIComponent(name + " Canada official website")}`;
}

export function getCanadaDomain(name: string): string | null {
  return CANADA_DOMAIN_MAP[name] ?? null;
}

export function useCanadaProgramsData(options: {
  enabled: boolean;
  pageSize?: number;
}) {
  const { enabled } = options;

  const [allPrograms, setAllPrograms] = useState<CanadaProgram[]>([]);
  const [canadaInstitutes, setCanadaInstitutes] = useState<string[]>([]);
  const [canadaMajors, setCanadaMajors] = useState<string[]>([]);
  const [canadaScholarships, setCanadaScholarships] = useState<any[]>([]);
  const [loadingProgramsData, setLoadingProgramsData] = useState(false);
  const [programsError, setProgramsError] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    let cancelled = false;

    async function fetchAllPrograms() {
      setLoadingProgramsData(true);
      setProgramsError(false);

      try {
        const [tier1Res, tier2Res, scholarshipsRes] = await Promise.all([
          fetch("/Canada_Unis/Canada_Tier_1_unis_Data_merged.json"),
          fetch("/Canada_Unis/Canada_Tier_2_unis_Data_merged.json"),
          fetch("/canada_scholarship_data/canada_36_university_scholarships.json"),
        ]);

        if (!tier1Res.ok || !tier2Res.ok) {
          throw new Error("Failed to fetch Canada programs data files");
        }

        const [tier1, tier2, scholarshipsData] = await Promise.all([
          tier1Res.json(),
          tier2Res.json(),
          scholarshipsRes.ok ? scholarshipsRes.json() : Promise.resolve([]),
        ]);

        if (cancelled) return;
        
        setCanadaScholarships(scholarshipsData);

        // Merge and deduplicate by university_name + program + degree
        const seenKeys = new Set<string>();
        const allRaw = [...tier1, ...tier2] as CanadaProgram[];
        const all = allRaw.filter((p) => {
          const key = `${p.university_name}||${p.program}||${p.degree}`;
          if (seenKeys.has(key)) return false;
          seenKeys.add(key);
          return true;
        });

        setAllPrograms(all);
        const institutes = uniqSorted(all.map((p) => p.university_name));
        const programs = uniqSorted(
          all.map((p) => p.program).filter(Boolean) as string[]
        );
        setCanadaInstitutes(institutes);
        setCanadaMajors(programs);
      } catch (e) {
        console.error("[UniversityFinder] Failed to fetch Canada programs:", e);
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

  const canadaCities = useMemo(() => {
    const citiesSet = new Set<string>();
    allPrograms.forEach((program) => {
      if (program.city) citiesSet.add(program.city);
    });
    return Array.from(citiesSet).sort((a, b) => a.localeCompare(b));
  }, [allPrograms]);

  const instituteDataMap = useMemo(() => {
    const schMap = new Map<string, any[]>();
    canadaScholarships.forEach((sch) => {
      if (!schMap.has(sch.university_name)) schMap.set(sch.university_name, []);
      schMap.get(sch.university_name)!.push({
        name: sch.scholarship_name,
        coverage: sch.amount_cad || sch.amount_type || "Variable",
        eligibility: sch.eligibility_summary || "Check website for details",
        deadline: sch.deadline || "Check website",
        applyLink: sch.source_url || generateCanadaWebsite(sch.university_name),
      });
    });

    const map = new Map<string, CanadaInstituteData>();
    allPrograms.forEach((row) => {
      if (!map.has(row.university_name)) {
        map.set(row.university_name, {
          cities: new Set(),
          programs: new Set(),
          departments: new Set(),
          primaryCity: row.city,
          degrees: new Set(),
          deadlineText: null,
          website: generateCanadaWebsite(row.university_name),
          eligibilityCriteria: null,
          testRequired: null,
          programUrl: null,
          feeStructureText: null,
          durations: new Set(),
          scholarships: schMap.get(row.university_name) || [],
        });
      }
      const data = map.get(row.university_name)!;
      if (row.city) data.cities.add(row.city);
      if (row.program) data.programs.add(row.program);
      if (row.department) data.departments.add(row.department);
      if (row.degree) data.degrees.add(row.degree);
      if (row.duration) data.durations.add(row.duration);

      // Capture first non-null value for text fields
      if (row.fee_structure && !data.feeStructureText)
        data.feeStructureText = row.fee_structure;
      if (row.admission_deadline && !data.deadlineText)
        data.deadlineText = row.admission_deadline;
      if (row.eligibility_criteria && !data.eligibilityCriteria)
        data.eligibilityCriteria = row.eligibility_criteria;
      if (row.test_required && !data.testRequired)
        data.testRequired = row.test_required;
      // Prefer actual program URL over fallback
      if (row.program_url && !data.programUrl) {
        data.programUrl = row.program_url;
        if (data.website.includes("google.com/search")) {
          try {
            data.website = new URL(row.program_url).origin;
          } catch (e) {
            // ignore invalid URL
          }
        }
      }
    });
    return map;
  }, [allPrograms]);

  return {
    allPrograms,
    canadaInstitutes,
    canadaMajors,
    canadaCities,
    instituteDataMap,
    loadingProgramsData,
    programsError,
  };
}
