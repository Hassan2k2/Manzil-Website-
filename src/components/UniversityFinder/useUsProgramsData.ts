import { useEffect, useMemo, useState } from "react";

export interface UsProgram {
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

export interface UsInstituteData {
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
}

function uniqSorted(values: string[]) {
  return [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b));
}

// Real .edu domain map for known US universities
const US_DOMAIN_MAP: Record<string, string> = {
  "Brown University": "brown.edu",
  "Columbia University": "columbia.edu",
  "Cornell University": "cornell.edu",
  "Dartmouth College": "dartmouth.edu",
  "Harvard University": "harvard.edu",
  "Princeton University": "princeton.edu",
  "University of Pennsylvania": "upenn.edu",
  "Yale University": "yale.edu",
  "California Institute of Technology (Caltech)": "caltech.edu",
  "Carnegie Mellon University": "cmu.edu",
  "Duke University": "duke.edu",
  "Emory University": "emory.edu",
  "Georgetown University": "georgetown.edu",
  "Johns Hopkins University": "jhu.edu",
  "Massachusetts Institute of Technology (MIT)": "mit.edu",
  "New York University (NYU)": "nyu.edu",
  "Northwestern University": "northwestern.edu",
  "Rice University": "rice.edu",
  "Stanford University": "stanford.edu",
  "Tufts University": "tufts.edu",
  "Tulane University": "tulane.edu",
  "University of California, Berkeley (UC Berkeley)": "berkeley.edu",
  "University of California, Los Angeles (UCLA)": "ucla.edu",
  "University of Chicago": "uchicago.edu",
  "University of Michigan, Ann Arbor": "umich.edu",
  "University of Southern California": "usc.edu",
  "University of Virginia": "virginia.edu",
  "Vanderbilt University": "vanderbilt.edu",
  "Washington University in St. Louis": "wustl.edu",
  "Wake Forest University": "wfu.edu",
  "Brandeis University": "brandeis.edu",
  "Case Western Reserve University": "case.edu",
  "College of William & Mary": "wm.edu",
  "William & Mary": "wm.edu",
  "George Washington University": "gwu.edu",
  "Lehigh University": "lehigh.edu",
  "Northeastern University": "northeastern.edu",
  "Pepperdine University": "pepperdine.edu",
  "SMU (Southern Methodist University)": "smu.edu",
  "Stevens Institute of Technology": "stevens.edu",
  "Syracuse University": "syracuse.edu",
  "Fordham University": "fordham.edu",
  "American University": "american.edu",
  "Baylor University": "baylor.edu",
  "Boston College": "bc.edu",
  "Boston University": "bu.edu",
  "Clark University": "clarku.edu",
  "Clemson University": "clemson.edu",
  "Colorado State University": "colostate.edu",
  "DePaul University": "depaul.edu",
  "Drexel University": "drexel.edu",
  "Elon University": "elon.edu",
  "Fairfield University": "fairfield.edu",
  "Florida International University": "fiu.edu",
  "Florida State University": "fsu.edu",
  "Gonzaga University": "gonzaga.edu",
  "Georgia Institute of Technology (Georgia Tech)": "gatech.edu",
  "Hofstra University": "hofstra.edu",
  "Illinois State University": "illinoisstate.edu",
  "Indiana University Bloomington": "indiana.edu",
  "Iowa State University": "iastate.edu",
  "James Madison University": "jmu.edu",
  "Kansas State University": "k-state.edu",
  "Kent State University": "kent.edu",
  "Liberty University": "liberty.edu",
  "Loyola Marymount University": "lmu.edu",
  "Loyola University Chicago": "luc.edu",
  "Marquette University": "marquette.edu",
  "Miami University": "miamioh.edu",
  "Michigan State University": "msu.edu",
  "Montana State University": "montana.edu",
  "New Mexico State University": "nmsu.edu",
  "Ohio State University": "osu.edu",
  "Ohio University": "ohio.edu",
  "Oklahoma State University": "okstate.edu",
  "Old Dominion University": "odu.edu",
  "Oregon State University": "oregonstate.edu",
  "Pennsylvania State University (Penn State)": "psu.edu",
  "Portland State University": "pdx.edu",
  "Providence College": "providence.edu",
  "Purdue University": "purdue.edu",
  "Quinnipiac University": "quinnipiac.edu",
  "Rowan University": "rowan.edu",
  "Rutgers University - New Brunswick": "rutgers.edu",
  "Seton Hall University": "shu.edu",
  "St. John's University": "stjohns.edu",
  "Stony Brook University (SUNY)": "stonybrook.edu",
  "Suffolk University": "suffolk.edu",
  "Temple University": "temple.edu",
  "Texas A&M University": "tamu.edu",
  "Texas Tech University": "ttu.edu",
  "University at Buffalo (SUNY)": "buffalo.edu",
  "University of Alabama": "ua.edu",
  "University of Arizona": "arizona.edu",
  "University of Arkansas": "uark.edu",
  "University of California, Davis": "ucdavis.edu",
  "University of California, Irvine": "uci.edu",
  "University of California, San Diego (UCSD)": "ucsd.edu",
  "University of California, Santa Barbara (UCSB)": "ucsb.edu",
  "University of Cincinnati": "uc.edu",
  "University of Colorado Boulder": "colorado.edu",
  "University of Connecticut": "uconn.edu",
  "University of Denver": "du.edu",
  "University of Florida": "ufl.edu",
  "University of Georgia": "uga.edu",
  "University of Hawaii at Manoa": "hawaii.edu",
  "University of Illinois Urbana-Champaign": "illinois.edu",
  "University of Iowa": "uiowa.edu",
  "University of Kansas": "ku.edu",
  "University of Kentucky": "uky.edu",
  "University of Louisville": "louisville.edu",
  "University of Maryland, College Park": "umd.edu",
  "University of Memphis": "memphis.edu",
  "University of Minnesota, Twin Cities": "umn.edu",
  "University of Mississippi": "olemiss.edu",
  "University of Missouri": "missouri.edu",
  "University of Nebraska-Lincoln": "unl.edu",
  "University of Nevada, Las Vegas": "unlv.edu",
  "University of New Mexico": "unm.edu",
  "University of North Carolina at Chapel Hill": "unc.edu",
  "University of Oklahoma": "ou.edu",
  "University of Pittsburgh": "pitt.edu",
  "University of Texas at Austin": "utexas.edu",
  "University of Washington": "uw.edu",
  "University of Wisconsin-Madison": "wisc.edu",
  "Virginia Tech": "vt.edu",
  "Worcester Polytechnic Institute (WPI)": "wpi.edu",
  "Yeshiva University": "yu.edu",
  "Appalachian State University": "appstate.edu",
  "Arizona State University": "asu.edu",
  "Auburn University": "auburn.edu",
  "Austin Community College": "austincc.edu",
  "Ball State University": "bsu.edu",
  "Boise State University": "boisestate.edu",
  "Chapman University": "chapman.edu",
  "East Carolina University": "ecu.edu",
  "Eastern Michigan University": "emich.edu",
  "Florida International University": "fiu.edu",
  "Hofstra University": "hofstra.edu",
  "Northern Arizona University": "nau.edu",
  "Northern Virginia Community College (NOVA)": "nvcc.edu",
  "Ohio State University": "osu.edu",
};

export function generateUsWebsite(name: string): string {
  const domain = US_DOMAIN_MAP[name];
  if (domain) return `https://www.${domain}`;
  return `https://www.google.com/search?q=${encodeURIComponent(name + " official website")}`;
}

export function getUsDomain(name: string): string | null {
  return US_DOMAIN_MAP[name] ?? null;
}

export function useUsProgramsData(options: {
  enabled: boolean;
  pageSize?: number;
}) {
  const { enabled } = options;

  const [allPrograms, setAllPrograms] = useState<UsProgram[]>([]);
  const [usInstitutes, setUsInstitutes] = useState<string[]>([]);
  const [usMajors, setUsMajors] = useState<string[]>([]);
  const [loadingProgramsData, setLoadingProgramsData] = useState(false);
  const [programsError, setProgramsError] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    let cancelled = false;

    async function fetchAllPrograms() {
      setLoadingProgramsData(true);
      setProgramsError(false);

      try {
        const [ivyRes, tier1Res, tier2Res, tier3Res, tier4Res] = await Promise.all([
          fetch("/US_Unis/IVY_leagu_unis_merger.json"),
          fetch("/US_Unis/Tier_1_US_unis_Merge.json"),
          fetch("/US_Unis/Tier_2_US_unis_Merge.json"),
          fetch("/US_Unis/Tier_3_US_unis_Merge.json"),
          fetch("/US_Unis/Tier_4_US_unis_Merge.json"),
        ]);

        if (!ivyRes.ok || !tier1Res.ok || !tier2Res.ok || !tier3Res.ok || !tier4Res.ok) {
          throw new Error("Failed to fetch US programs data files");
        }

        const [ivy, tier1, tier2, tier3, tier4] = await Promise.all([
          ivyRes.json(),
          tier1Res.json(),
          tier2Res.json(),
          tier3Res.json(),
          tier4Res.json(),
        ]);

        if (cancelled) return;

        // Merge and deduplicate by university_name+program+degree
        const seenKeys = new Set<string>();
        const allRaw = [...ivy, ...tier1, ...tier2, ...tier3, ...tier4] as UsProgram[];
        const all = allRaw.filter((p) => {
          const key = `${p.university_name}||${p.program}||${p.degree}`;
          if (seenKeys.has(key)) return false;
          seenKeys.add(key);
          return true;
        });

        setAllPrograms(all);
        const institutes = uniqSorted(all.map((p) => p.university_name));
        const programs = uniqSorted(all.map((p) => p.program).filter(Boolean) as string[]);
        setUsInstitutes(institutes);
        setUsMajors(programs);
      } catch (e) {
        console.error("[UniversityFinder] Failed to fetch US programs:", e);
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

  const usCities = useMemo(() => {
    const citiesSet = new Set<string>();
    allPrograms.forEach((program) => {
      if (program.city) citiesSet.add(program.city);
    });
    return Array.from(citiesSet).sort((a, b) => a.localeCompare(b));
  }, [allPrograms]);

  const instituteDataMap = useMemo(() => {
    const map = new Map<string, UsInstituteData>();
    allPrograms.forEach((row) => {
      if (!map.has(row.university_name)) {
        map.set(row.university_name, {
          cities: new Set(),
          programs: new Set(),
          departments: new Set(),
          primaryCity: row.city,
          degrees: new Set(),
          deadlineText: null,
          website: generateUsWebsite(row.university_name),
          eligibilityCriteria: null,
          testRequired: null,
          programUrl: null,
          feeStructureText: null,
          durations: new Set(),
        });
      }
      const data = map.get(row.university_name)!;
      if (row.city) data.cities.add(row.city);
      if (row.program) data.programs.add(row.program);
      if (row.department) data.departments.add(row.department);
      if (row.degree) data.degrees.add(row.degree);
      if (row.duration) data.durations.add(row.duration);

      // Capture first non-null value for text fields
      if (row.fee_structure && !data.feeStructureText) data.feeStructureText = row.fee_structure;
      if (row.admission_deadline && !data.deadlineText) data.deadlineText = row.admission_deadline;
      if (row.eligibility_criteria && !data.eligibilityCriteria) data.eligibilityCriteria = row.eligibility_criteria;
      if (row.test_required && !data.testRequired) data.testRequired = row.test_required;
      // Prefer actual program URL over fallback
      if (row.program_url && !data.programUrl) data.programUrl = row.program_url;
    });
    return map;
  }, [allPrograms]);

  return {
    allPrograms,
    usInstitutes,
    usMajors,
    usCities,
    instituteDataMap,
    loadingProgramsData,
    programsError,
  };
}
