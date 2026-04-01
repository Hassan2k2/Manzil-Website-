export type UniversityTier = "Dream" | "Ambitious" | "Target" | "Safety";
export type UniversityCountry = "Pakistan" | "US" | "UK" | "Canada";
export type SelectivityLevel = "Most Selective" | "Highly Selective" | "Selective" | "Moderately Selective" | "Less Selective";

export interface TuitionFee {
  program: string;
  localFee: string;
  internationalFee?: string;
  perSemester?: boolean;
}

export interface University {
  id: string;
  name: string;
  shortName?: string;
  location: string;
  country: UniversityCountry;
  type: "Public" | "Private" | "Semi-Government";
  selectivity: SelectivityLevel;
  ranking?: string;
  acceptanceRate: string;
  applicationDeadline: string;
  deadlineDate: Date;
  fundingOptions: FundingOption[];
  majorsOffered: string[];
  tuitionFees?: TuitionFee[]; // Optional - actual tuition per program
  admissionRequirements: AdmissionRequirements;
  scholarships: Scholarship[];
  website: string;
  applyLink?: string;
  logo?: string;
  internationalFriendly: boolean;
  financialAidForInternational: boolean;
}

export interface FundingOption {
  type: "Full Scholarship" | "Partial Scholarship" | "Need-Based Aid" | "Merit-Based" | "Sports Scholarship" | "Research Assistantship";
  description: string;
  amount?: string;
}

export interface AdmissionRequirements {
  minGrades: "Top tier (A*/A)" | "Strong (B+/A)" | "Average (C-B)" | "Flexible";
  acceptedCurriculums: ("Matric" | "O Levels" | "A Levels" | "IB" | "FSC" | "American High School")[];
  entranceTest?: string;
  otherRequirements?: string[];
}

export interface Scholarship {
  name: string;
  coverage: string;
  eligibility: string;
  deadline?: string;
  applyLink?: string;
}

// University data organized by country and selectivity
export const universities: University[] = [
  // ============= PAKISTAN =============
  // Most Selective Pakistani Universities
  {
    id: "lums",
    name: "Lahore University of Management Sciences",
    shortName: "LUMS",
    location: "Lahore, Punjab",
    country: "Pakistan",
    type: "Private",
    selectivity: "Most Selective",
    ranking: "#1 in Pakistan",
    acceptanceRate: "8%",
    applicationDeadline: "March 15, 2025",
    deadlineDate: new Date("2025-03-15"),
    fundingOptions: [
      { type: "Need-Based Aid", description: "National Outreach Programme (NOP)", amount: "100% tuition + living" },
      { type: "Merit-Based", description: "Merit scholarships for top performers", amount: "Up to 100%" },
    ],
    majorsOffered: ["Computer Science", "Economics", "Business Administration", "Electrical Engineering", "Political Science", "Law", "Accounting & Finance"],
    tuitionFees: [
      { program: "Computer Science", localFee: "PKR 1,450,000/year", perSemester: false },
      { program: "Economics", localFee: "PKR 1,350,000/year", perSemester: false },
      { program: "Business Administration", localFee: "PKR 1,450,000/year", perSemester: false },
      { program: "Electrical Engineering", localFee: "PKR 1,450,000/year", perSemester: false },
      { program: "Law", localFee: "PKR 1,250,000/year", perSemester: false },
    ],
    admissionRequirements: {
      minGrades: "Top tier (A*/A)",
      acceptedCurriculums: ["O Levels", "A Levels", "IB", "FSC", "Matric"],
      entranceTest: "LCAT or SAT",
      otherRequirements: ["Personal Statement", "Recommendations"],
    },
    scholarships: [
      { name: "National Outreach Programme (NOP)", coverage: "100% tuition + stipend", eligibility: "Low-income students from rural areas with excellent academics", deadline: "March 15", applyLink: "https://admission.lums.edu.pk/" },
      { name: "LUMS Merit Scholarship", coverage: "25-100%", eligibility: "Top performers in LCAT/SAT with outstanding academics", applyLink: "https://admission.lums.edu.pk/" },
      { name: "Syed Babar Ali Scholarship", coverage: "100%", eligibility: "Exceptional academic record and leadership", applyLink: "https://admission.lums.edu.pk/" },
    ],
    website: "https://lums.edu.pk",
    applyLink: "https://admission.lums.edu.pk/",
    logo: "https://logo.clearbit.com/lums.edu.pk",
    internationalFriendly: true,
    financialAidForInternational: true,
  },
  {
    id: "aku",
    name: "Aga Khan University",
    shortName: "AKU",
    location: "Karachi, Sindh",
    country: "Pakistan",
    type: "Private",
    selectivity: "Most Selective",
    ranking: "Top Medical School",
    acceptanceRate: "5%",
    applicationDeadline: "October 31, 2025",
    deadlineDate: new Date("2025-10-31"),
    fundingOptions: [
      { type: "Need-Based Aid", description: "Comprehensive financial aid", amount: "Up to 100%" },
    ],
    majorsOffered: ["Medicine (MBBS)", "Nursing"],
    tuitionFees: [
      { program: "Medicine (MBBS)", localFee: "PKR 2,100,000/year", perSemester: false },
      { program: "Nursing", localFee: "PKR 850,000/year", perSemester: false },
    ],
    admissionRequirements: {
      minGrades: "Top tier (A*/A)",
      acceptedCurriculums: ["O Levels", "A Levels", "FSC"],
      entranceTest: "AKU Admission Test",
      otherRequirements: ["Interview"],
    },
    scholarships: [
      { name: "AKU Financial Aid Program", coverage: "Up to 100%", eligibility: "Financial need + strong academics", deadline: "October 31", applyLink: "https://www.aku.edu/admissions/pakistan/Pages/home.aspx" },
      { name: "AKU Merit Scholarship", coverage: "50-75%", eligibility: "Outstanding performance in admission test", applyLink: "https://www.aku.edu/admissions/pakistan/Pages/home.aspx" },
    ],
    website: "https://aku.edu",
    applyLink: "https://www.aku.edu/admissions/pakistan/Pages/home.aspx",
    logo: "https://logo.clearbit.com/aku.edu",
    internationalFriendly: true,
    financialAidForInternational: true,
  },
  {
    id: "iba-karachi",
    name: "Institute of Business Administration",
    shortName: "IBA Karachi",
    location: "Karachi, Sindh",
    country: "Pakistan",
    type: "Public",
    selectivity: "Most Selective",
    ranking: "#1 Business School",
    acceptanceRate: "10%",
    applicationDeadline: "February 28, 2025",
    deadlineDate: new Date("2025-02-28"),
    fundingOptions: [
      { type: "Need-Based Aid", description: "IBA Financial Assistance", amount: "Up to 100%" },
      { type: "Merit-Based", description: "Talent Hunt Program", amount: "Full scholarship" },
    ],
    majorsOffered: ["Business Administration", "Computer Science", "Economics", "Accounting & Finance"],
    tuitionFees: [
      { program: "BBA", localFee: "PKR 485,000/semester", perSemester: true },
      { program: "Computer Science", localFee: "PKR 485,000/semester", perSemester: true },
      { program: "Economics", localFee: "PKR 425,000/semester", perSemester: true },
    ],
    admissionRequirements: {
      minGrades: "Top tier (A*/A)",
      acceptedCurriculums: ["O Levels", "A Levels", "IB", "FSC", "Matric"],
      entranceTest: "IBA Entry Test",
      otherRequirements: ["Interview"],
    },
    scholarships: [
      { name: "IBA Talent Hunt Program", coverage: "Full tuition + stipend", eligibility: "Exceptional students from across Pakistan", deadline: "February 28", applyLink: "https://www.iba.edu.pk/admissions" },
      { name: "IBA Need-Based Financial Aid", coverage: "25-100%", eligibility: "Demonstrated financial need", applyLink: "https://www.iba.edu.pk/admissions" },
      { name: "IBA Merit Scholarship", coverage: "25-50%", eligibility: "Top 10% in admission test", applyLink: "https://www.iba.edu.pk/admissions" },
    ],
    website: "https://iba.edu.pk",
    applyLink: "https://www.iba.edu.pk/admissions",
    logo: "https://logo.clearbit.com/iba.edu.pk",
    internationalFriendly: false,
    financialAidForInternational: false,
  },
  // Highly Selective Pakistani Universities
  {
    id: "nust",
    name: "National University of Sciences & Technology",
    shortName: "NUST",
    location: "Islamabad",
    country: "Pakistan",
    type: "Public",
    selectivity: "Highly Selective",
    ranking: "Top 400 Globally",
    acceptanceRate: "~15%",
    applicationDeadline: "April 30, 2025",
    deadlineDate: new Date("2025-04-30"),
    fundingOptions: [
      { type: "Merit-Based", description: "NUST Merit Scholarship", amount: "50-100%" },
      { type: "Need-Based Aid", description: "Financial assistance", amount: "Variable" },
    ],
    majorsOffered: ["Computer Science", "Electrical Engineering", "Mechanical Engineering", "Civil Engineering", "Business", "Architecture"],
    admissionRequirements: {
      minGrades: "Strong (B+/A)",
      acceptedCurriculums: ["O Levels", "A Levels", "IB", "FSC", "Matric"],
      entranceTest: "NET (NUST Entry Test)",
    },
    scholarships: [
      { name: "NUST Scholarship", coverage: "50-100%", eligibility: "NET score + financial need", applyLink: "https://nust.edu.pk/admissions/scholarships/" },
    ],
    website: "https://nust.edu.pk",
    applyLink: "https://ugadmissions.nust.edu.pk/",
    logo: "https://logo.clearbit.com/nust.edu.pk",
    internationalFriendly: true,
    financialAidForInternational: false,
  },
  {
    id: "giki",
    name: "Ghulam Ishaq Khan Institute",
    shortName: "GIKI",
    location: "Topi, KPK",
    country: "Pakistan",
    type: "Private",
    selectivity: "Highly Selective",
    ranking: "Top 5 Engineering",
    acceptanceRate: "~12%",
    applicationDeadline: "March 31, 2025",
    deadlineDate: new Date("2025-03-31"),
    fundingOptions: [
      { type: "Merit-Based", description: "GIKI Merit Scholarship", amount: "25-100%" },
    ],
    majorsOffered: ["Computer Science", "Electrical Engineering", "Mechanical Engineering", "Computer Engineering"],
    admissionRequirements: {
      minGrades: "Strong (B+/A)",
      acceptedCurriculums: ["O Levels", "A Levels", "FSC", "Matric"],
      entranceTest: "GIKI Test or SAT",
    },
    scholarships: [
      { name: "Merit Scholarship", coverage: "25-100%", eligibility: "Test performance", applyLink: "https://giki.edu.pk/admissions/scholarships/" },
    ],
    website: "https://giki.edu.pk",
    applyLink: "https://admissions.giki.edu.pk/",
    logo: "https://logo.clearbit.com/giki.edu.pk",
    internationalFriendly: false,
    financialAidForInternational: false,
  },
  {
    id: "pieas",
    name: "Pakistan Institute of Engineering & Applied Sciences",
    shortName: "PIEAS",
    location: "Islamabad",
    country: "Pakistan",
    type: "Public",
    selectivity: "Highly Selective",
    ranking: "Top Nuclear Engineering",
    acceptanceRate: "~8%",
    applicationDeadline: "March 31, 2025",
    deadlineDate: new Date("2025-03-31"),
    fundingOptions: [
      { type: "Full Scholarship", description: "PAEC Sponsored", amount: "100% + stipend" },
    ],
    majorsOffered: ["Nuclear Engineering", "Systems Engineering", "Computer Science", "Mechanical Engineering"],
    admissionRequirements: {
      minGrades: "Top tier (A*/A)",
      acceptedCurriculums: ["FSC", "A Levels"],
      entranceTest: "PIEAS Entry Test",
    },
    scholarships: [
      { name: "PAEC Scholarship", coverage: "Full funding", eligibility: "PAEC sponsored", applyLink: "https://pieas.edu.pk/admissions/" },
    ],
    website: "https://pieas.edu.pk",
    applyLink: "https://pieas.edu.pk/",
    logo: "https://logo.clearbit.com/pieas.edu.pk",
    internationalFriendly: false,
    financialAidForInternational: false,
  },
  {
    id: "habib",
    name: "Habib University",
    shortName: "Habib",
    location: "Karachi, Sindh",
    country: "Pakistan",
    type: "Private",
    selectivity: "Highly Selective",
    ranking: "Top Liberal Arts",
    acceptanceRate: "~15%",
    applicationDeadline: "March 15, 2025",
    deadlineDate: new Date("2025-03-15"),
    fundingOptions: [
      { type: "Need-Based Aid", description: "100% need-met policy", amount: "Up to 100%" },
    ],
    majorsOffered: ["Computer Science", "Electrical Engineering", "Social Development", "Communication"],
    admissionRequirements: {
      minGrades: "Strong (B+/A)",
      acceptedCurriculums: ["O Levels", "A Levels", "IB", "FSC", "Matric"],
      entranceTest: "Habib Test or SAT",
      otherRequirements: ["Personal Statement", "Interview"],
    },
    scholarships: [
      { name: "Habib Financial Aid", coverage: "100% need-based", eligibility: "Demonstrated need", applyLink: "https://habib.edu.pk/admissions/financial-aid/" },
    ],
    website: "https://habib.edu.pk",
    applyLink: "https://admissions.habib.edu.pk/",
    logo: "https://logo.clearbit.com/habib.edu.pk",
    internationalFriendly: true,
    financialAidForInternational: false,
  },
  // Selective Pakistani Universities
  {
    id: "fast",
    name: "FAST-NUCES",
    shortName: "FAST",
    location: "Multiple Campuses",
    country: "Pakistan",
    type: "Private",
    selectivity: "Selective",
    ranking: "Top CS/IT University",
    acceptanceRate: "~25%",
    applicationDeadline: "July 31, 2025",
    deadlineDate: new Date("2025-07-31"),
    fundingOptions: [
      { type: "Merit-Based", description: "FAST Merit Scholarship", amount: "25-50%" },
    ],
    majorsOffered: ["Computer Science", "Software Engineering", "Data Science", "AI", "Electrical Engineering"],
    admissionRequirements: {
      minGrades: "Strong (B+/A)",
      acceptedCurriculums: ["O Levels", "A Levels", "FSC", "Matric", "IB"],
      entranceTest: "FAST Entry Test",
    },
    scholarships: [
      { name: "FAST Merit", coverage: "25-50%", eligibility: "Entry test ranking", applyLink: "https://nu.edu.pk/Admissions/Scholarships" },
    ],
    website: "https://nu.edu.pk",
    applyLink: "https://admissions.nu.edu.pk/",
    logo: "https://logo.clearbit.com/nu.edu.pk",
    internationalFriendly: false,
    financialAidForInternational: false,
  },
  {
    id: "comsats",
    name: "COMSATS University Islamabad",
    shortName: "COMSATS",
    location: "Multiple Campuses",
    country: "Pakistan",
    type: "Public",
    selectivity: "Selective",
    ranking: "Top 10 in Pakistan",
    acceptanceRate: "~30%",
    applicationDeadline: "August 31, 2025",
    deadlineDate: new Date("2025-08-31"),
    fundingOptions: [
      { type: "Merit-Based", description: "COMSATS Scholarship", amount: "25-100%" },
      { type: "Need-Based Aid", description: "HEC Scholarship", amount: "Variable" },
    ],
    majorsOffered: ["Computer Science", "Software Engineering", "Electrical Engineering", "Business", "Bioinformatics"],
    admissionRequirements: {
      minGrades: "Average (C-B)",
      acceptedCurriculums: ["O Levels", "A Levels", "FSC", "Matric", "IB"],
      entranceTest: "NTS or COMSATS Test",
    },
    scholarships: [
      { name: "COMSATS Scholarship", coverage: "25-100%", eligibility: "Merit + need", applyLink: "https://www.comsats.edu.pk/Scholarships.aspx" },
    ],
    website: "https://comsats.edu.pk",
    applyLink: "https://admission.comsats.edu.pk/",
    logo: "https://logo.clearbit.com/comsats.edu.pk",
    internationalFriendly: true,
    financialAidForInternational: false,
  },
  {
    id: "ned",
    name: "NED University of Engineering & Technology",
    shortName: "NED",
    location: "Karachi, Sindh",
    country: "Pakistan",
    type: "Public",
    selectivity: "Selective",
    ranking: "Premier Engineering in Sindh",
    acceptanceRate: "~20%",
    applicationDeadline: "September 15, 2025",
    deadlineDate: new Date("2025-09-15"),
    fundingOptions: [
      { type: "Merit-Based", description: "NED Scholarship", amount: "50-100%" },
    ],
    majorsOffered: ["Civil Engineering", "Electrical Engineering", "Mechanical Engineering", "Computer Science", "Architecture"],
    admissionRequirements: {
      minGrades: "Strong (B+/A)",
      acceptedCurriculums: ["FSC", "A Levels", "IB"],
      entranceTest: "NED Entry Test",
    },
    scholarships: [
      { name: "NED Foundation", coverage: "Up to 100%", eligibility: "Academic excellence", applyLink: "https://www.neduet.edu.pk/admissions" },
    ],
    website: "https://neduet.edu.pk",
    applyLink: "https://admissions.neduet.edu.pk/",
    logo: "https://logo.clearbit.com/neduet.edu.pk",
    internationalFriendly: false,
    financialAidForInternational: false,
  },
  // Moderately Selective Pakistani Universities
  {
    id: "uet-lahore",
    name: "UET Lahore",
    shortName: "UET",
    location: "Lahore, Punjab",
    country: "Pakistan",
    type: "Public",
    selectivity: "Moderately Selective",
    ranking: "Top Public Engineering",
    acceptanceRate: "~35%",
    applicationDeadline: "September 15, 2025",
    deadlineDate: new Date("2025-09-15"),
    fundingOptions: [
      { type: "Merit-Based", description: "Punjab Govt Scholarship", amount: "Full tuition" },
    ],
    majorsOffered: ["Civil Engineering", "Electrical Engineering", "Mechanical Engineering", "Computer Science", "Chemical Engineering"],
    admissionRequirements: {
      minGrades: "Average (C-B)",
      acceptedCurriculums: ["FSC", "A Levels", "IB"],
      entranceTest: "ECAT",
    },
    scholarships: [
      { name: "HEC Scholarship", coverage: "Tuition + stipend", eligibility: "Merit + need", applyLink: "https://www.uet.edu.pk/admissions/" },
    ],
    website: "https://uet.edu.pk",
    applyLink: "https://admissions.uet.edu.pk/",
    logo: "https://logo.clearbit.com/uet.edu.pk",
    internationalFriendly: false,
    financialAidForInternational: false,
  },
  {
    id: "qau",
    name: "Quaid-i-Azam University",
    shortName: "QAU",
    location: "Islamabad",
    country: "Pakistan",
    type: "Public",
    selectivity: "Moderately Selective",
    ranking: "Top Research University",
    acceptanceRate: "~40%",
    applicationDeadline: "September 30, 2025",
    deadlineDate: new Date("2025-09-30"),
    fundingOptions: [
      { type: "Merit-Based", description: "QAU Scholarship", amount: "Full tuition" },
    ],
    majorsOffered: ["Physics", "Chemistry", "Biology", "Computer Science", "Economics", "International Relations"],
    admissionRequirements: {
      minGrades: "Average (C-B)",
      acceptedCurriculums: ["FSC", "A Levels", "IB", "Matric"],
      entranceTest: "QAU Entry Test",
    },
    scholarships: [
      { name: "HEC Indigenous", coverage: "Full for PhD", eligibility: "Research students", applyLink: "https://qau.edu.pk/admissions/" },
    ],
    website: "https://qau.edu.pk",
    applyLink: "https://admissions.qau.edu.pk/",
    logo: "https://logo.clearbit.com/qau.edu.pk",
    internationalFriendly: true,
    financialAidForInternational: false,
  },
  {
    id: "punjab-university",
    name: "University of the Punjab",
    shortName: "PU",
    location: "Lahore, Punjab",
    country: "Pakistan",
    type: "Public",
    selectivity: "Moderately Selective",
    ranking: "Oldest University",
    acceptanceRate: "~45%",
    applicationDeadline: "August 15, 2025",
    deadlineDate: new Date("2025-08-15"),
    fundingOptions: [
      { type: "Merit-Based", description: "Punjab Scholarship", amount: "Full tuition" },
    ],
    majorsOffered: ["Law", "Medicine", "Computer Science", "Business", "Economics", "Pharmacy"],
    admissionRequirements: {
      minGrades: "Average (C-B)",
      acceptedCurriculums: ["FSC", "A Levels", "Matric"],
      entranceTest: "PU Entry Test",
    },
    scholarships: [
      { name: "Punjab Govt", coverage: "Full tuition", eligibility: "Domicile + merit", applyLink: "https://pu.edu.pk/page/show/Admissions.html" },
    ],
    website: "https://pu.edu.pk",
    applyLink: "https://admissions.pu.edu.pk/",
    logo: "https://logo.clearbit.com/pu.edu.pk",
    internationalFriendly: false,
    financialAidForInternational: false,
  },

  // ============= UNITED STATES =============
  // Most Selective US Universities
  {
    id: "harvard",
    name: "Harvard University",
    shortName: "Harvard",
    location: "Cambridge, MA",
    country: "US",
    type: "Private",
    selectivity: "Most Selective",
    ranking: "#1 in US",
    acceptanceRate: "~3%",
    applicationDeadline: "January 1, 2025",
    deadlineDate: new Date("2025-01-01"),
    fundingOptions: [
      { type: "Need-Based Aid", description: "100% of demonstrated need met", amount: "Avg $55K/year" },
    ],
    majorsOffered: ["Computer Science", "Economics", "Government", "Biology", "Psychology", "Applied Mathematics"],
    admissionRequirements: {
      minGrades: "Top tier (A*/A)",
      acceptedCurriculums: ["A Levels", "IB", "American High School"],
      entranceTest: "SAT/ACT optional",
      otherRequirements: ["Essays", "Recommendations", "Extracurriculars"],
    },
    scholarships: [
      { name: "Harvard Financial Aid", coverage: "100% of need", eligibility: "Families <$85K pay nothing", applyLink: "https://college.harvard.edu/financial-aid" },
    ],
    website: "https://harvard.edu",
    applyLink: "https://college.harvard.edu/admissions/apply",
    logo: "https://logo.clearbit.com/harvard.edu",
    internationalFriendly: true,
    financialAidForInternational: true,
  },
  {
    id: "mit",
    name: "Massachusetts Institute of Technology",
    shortName: "MIT",
    location: "Cambridge, MA",
    country: "US",
    type: "Private",
    selectivity: "Most Selective",
    ranking: "#1 for Engineering",
    acceptanceRate: "~4%",
    applicationDeadline: "January 4, 2025",
    deadlineDate: new Date("2025-01-04"),
    fundingOptions: [
      { type: "Need-Based Aid", description: "100% of demonstrated need", amount: "Avg $54K/year" },
    ],
    majorsOffered: ["Computer Science", "Electrical Engineering", "Mechanical Engineering", "Physics", "Mathematics", "Economics"],
    admissionRequirements: {
      minGrades: "Top tier (A*/A)",
      acceptedCurriculums: ["A Levels", "IB", "American High School"],
      entranceTest: "SAT/ACT required",
      otherRequirements: ["Essays", "Recommendations", "Interview"],
    },
    scholarships: [
      { name: "MIT Financial Aid", coverage: "100% of need", eligibility: "Need-aware for international", applyLink: "https://sfs.mit.edu/" },
    ],
    website: "https://mit.edu",
    applyLink: "https://apply.mitadmissions.org/",
    logo: "https://logo.clearbit.com/mit.edu",
    internationalFriendly: true,
    financialAidForInternational: true,
  },
  {
    id: "stanford",
    name: "Stanford University",
    shortName: "Stanford",
    location: "Stanford, CA",
    country: "US",
    type: "Private",
    selectivity: "Most Selective",
    ranking: "Top 5 Globally",
    acceptanceRate: "~4%",
    applicationDeadline: "January 5, 2025",
    deadlineDate: new Date("2025-01-05"),
    fundingOptions: [
      { type: "Need-Based Aid", description: "Need-blind for US citizens", amount: "Avg $56K/year" },
    ],
    majorsOffered: ["Computer Science", "Engineering", "Economics", "Biology", "Human Biology", "Symbolic Systems"],
    admissionRequirements: {
      minGrades: "Top tier (A*/A)",
      acceptedCurriculums: ["A Levels", "IB", "American High School"],
      entranceTest: "SAT/ACT optional",
      otherRequirements: ["Essays", "Recommendations"],
    },
    scholarships: [
      { name: "Stanford Aid", coverage: "Full need", eligibility: "Families <$100K free tuition", applyLink: "https://financialaid.stanford.edu/" },
    ],
    website: "https://stanford.edu",
    applyLink: "https://admission.stanford.edu/apply/",
    logo: "https://logo.clearbit.com/stanford.edu",
    internationalFriendly: true,
    financialAidForInternational: true,
  },
  {
    id: "yale",
    name: "Yale University",
    shortName: "Yale",
    location: "New Haven, CT",
    country: "US",
    type: "Private",
    selectivity: "Most Selective",
    ranking: "Top 5 in US",
    acceptanceRate: "~5%",
    applicationDeadline: "January 2, 2025",
    deadlineDate: new Date("2025-01-02"),
    fundingOptions: [
      { type: "Need-Based Aid", description: "Need-blind for international", amount: "100% of need" },
    ],
    majorsOffered: ["Economics", "Political Science", "History", "Computer Science", "Biology", "Psychology"],
    admissionRequirements: {
      minGrades: "Top tier (A*/A)",
      acceptedCurriculums: ["A Levels", "IB", "American High School"],
      entranceTest: "SAT/ACT optional",
      otherRequirements: ["Essays", "Recommendations", "Interview"],
    },
    scholarships: [
      { name: "Yale Financial Aid", coverage: "100% of need", eligibility: "Need-blind admission", applyLink: "https://finaid.yale.edu/" },
    ],
    website: "https://yale.edu",
    applyLink: "https://admissions.yale.edu/apply",
    logo: "https://logo.clearbit.com/yale.edu",
    internationalFriendly: true,
    financialAidForInternational: true,
  },
  {
    id: "princeton",
    name: "Princeton University",
    shortName: "Princeton",
    location: "Princeton, NJ",
    country: "US",
    type: "Private",
    selectivity: "Most Selective",
    ranking: "#1 National University",
    acceptanceRate: "~4%",
    applicationDeadline: "January 1, 2025",
    deadlineDate: new Date("2025-01-01"),
    fundingOptions: [
      { type: "Need-Based Aid", description: "No loans policy", amount: "100% grants" },
    ],
    majorsOffered: ["Computer Science", "Economics", "Public Policy", "Engineering", "Physics", "Mathematics"],
    admissionRequirements: {
      minGrades: "Top tier (A*/A)",
      acceptedCurriculums: ["A Levels", "IB", "American High School"],
      entranceTest: "SAT/ACT optional",
      otherRequirements: ["Essays", "Recommendations", "Interview"],
    },
    scholarships: [
      { name: "Princeton Aid", coverage: "100% grants (no loans)", eligibility: "All admitted students", applyLink: "https://admission.princeton.edu/cost-aid" },
    ],
    website: "https://princeton.edu",
    applyLink: "https://admission.princeton.edu/how-apply",
    logo: "https://logo.clearbit.com/princeton.edu",
    internationalFriendly: true,
    financialAidForInternational: true,
  },
  // Highly Selective US Universities
  {
    id: "upenn",
    name: "University of Pennsylvania",
    shortName: "UPenn",
    location: "Philadelphia, PA",
    country: "US",
    type: "Private",
    selectivity: "Highly Selective",
    ranking: "Top 10 in US",
    acceptanceRate: "~6%",
    applicationDeadline: "January 5, 2025",
    deadlineDate: new Date("2025-01-05"),
    fundingOptions: [
      { type: "Need-Based Aid", description: "Full need met", amount: "100% of need" },
    ],
    majorsOffered: ["Business (Wharton)", "Engineering", "Computer Science", "Economics", "Nursing", "Biology"],
    admissionRequirements: {
      minGrades: "Top tier (A*/A)",
      acceptedCurriculums: ["A Levels", "IB", "American High School"],
      entranceTest: "SAT/ACT optional",
    },
    scholarships: [
      { name: "Penn Grant", coverage: "100% of need", eligibility: "Need-aware for international", applyLink: "https://srfs.upenn.edu/financial-aid" },
    ],
    website: "https://upenn.edu",
    applyLink: "https://www.admissions.upenn.edu/apply",
    logo: "https://logo.clearbit.com/upenn.edu",
    internationalFriendly: true,
    financialAidForInternational: true,
  },
  {
    id: "duke",
    name: "Duke University",
    shortName: "Duke",
    location: "Durham, NC",
    country: "US",
    type: "Private",
    selectivity: "Highly Selective",
    ranking: "Top 10 in US",
    acceptanceRate: "~6%",
    applicationDeadline: "January 4, 2025",
    deadlineDate: new Date("2025-01-04"),
    fundingOptions: [
      { type: "Need-Based Aid", description: "Full need met", amount: "100% of need" },
    ],
    majorsOffered: ["Computer Science", "Economics", "Public Policy", "Biology", "Engineering", "Psychology"],
    admissionRequirements: {
      minGrades: "Top tier (A*/A)",
      acceptedCurriculums: ["A Levels", "IB", "American High School"],
      entranceTest: "SAT/ACT optional",
    },
    scholarships: [
      { name: "Duke Aid", coverage: "100% of need", eligibility: "Need-blind for US", applyLink: "https://financialaid.duke.edu/" },
    ],
    website: "https://duke.edu",
    applyLink: "https://admissions.duke.edu/apply/",
    logo: "https://logo.clearbit.com/duke.edu",
    internationalFriendly: true,
    financialAidForInternational: true,
  },
  {
    id: "northwestern",
    name: "Northwestern University",
    shortName: "Northwestern",
    location: "Evanston, IL",
    country: "US",
    type: "Private",
    selectivity: "Highly Selective",
    ranking: "Top 10 in US",
    acceptanceRate: "~7%",
    applicationDeadline: "January 3, 2025",
    deadlineDate: new Date("2025-01-03"),
    fundingOptions: [
      { type: "Need-Based Aid", description: "100% demonstrated need", amount: "Full need" },
    ],
    majorsOffered: ["Journalism", "Engineering", "Economics", "Computer Science", "Theatre", "Communication"],
    admissionRequirements: {
      minGrades: "Top tier (A*/A)",
      acceptedCurriculums: ["A Levels", "IB", "American High School"],
      entranceTest: "SAT/ACT optional",
    },
    scholarships: [
      { name: "Northwestern Grant", coverage: "100% of need", eligibility: "Need-based", applyLink: "https://undergradaid.northwestern.edu/" },
    ],
    website: "https://northwestern.edu",
    applyLink: "https://admissions.northwestern.edu/apply/",
    logo: "https://logo.clearbit.com/northwestern.edu",
    internationalFriendly: true,
    financialAidForInternational: true,
  },
  // Selective US Universities with Good Aid
  {
    id: "nyu",
    name: "New York University",
    shortName: "NYU",
    location: "New York, NY",
    country: "US",
    type: "Private",
    selectivity: "Selective",
    ranking: "Top 30 in US",
    acceptanceRate: "~12%",
    applicationDeadline: "January 5, 2025",
    deadlineDate: new Date("2025-01-05"),
    fundingOptions: [
      { type: "Merit-Based", description: "Merit scholarships available", amount: "Variable" },
      { type: "Need-Based Aid", description: "Need-based aid", amount: "Variable" },
    ],
    majorsOffered: ["Business", "Film", "Computer Science", "Economics", "Politics", "Drama"],
    admissionRequirements: {
      minGrades: "Strong (B+/A)",
      acceptedCurriculums: ["A Levels", "IB", "American High School"],
      entranceTest: "SAT/ACT optional",
    },
    scholarships: [
      { name: "NYU Scholarship", coverage: "Variable", eligibility: "Merit + need", applyLink: "https://www.nyu.edu/admissions/financial-aid-and-scholarships.html" },
    ],
    website: "https://nyu.edu",
    applyLink: "https://www.nyu.edu/admissions/undergraduate-admissions/how-to-apply.html",
    logo: "https://logo.clearbit.com/nyu.edu",
    internationalFriendly: true,
    financialAidForInternational: false,
  },
  {
    id: "usc",
    name: "University of Southern California",
    shortName: "USC",
    location: "Los Angeles, CA",
    country: "US",
    type: "Private",
    selectivity: "Selective",
    ranking: "Top 30 in US",
    acceptanceRate: "~12%",
    applicationDeadline: "January 15, 2025",
    deadlineDate: new Date("2025-01-15"),
    fundingOptions: [
      { type: "Merit-Based", description: "Trustee & Presidential Scholarships", amount: "Full tuition" },
    ],
    majorsOffered: ["Film", "Business", "Engineering", "Computer Science", "Communication", "Music"],
    admissionRequirements: {
      minGrades: "Strong (B+/A)",
      acceptedCurriculums: ["A Levels", "IB", "American High School"],
      entranceTest: "SAT/ACT optional",
    },
    scholarships: [
      { name: "Trustee Scholarship", coverage: "Full tuition", eligibility: "Top academics + leadership", applyLink: "https://financialaid.usc.edu/undergraduates/prospective/scholarships.html" },
    ],
    website: "https://usc.edu",
    applyLink: "https://admission.usc.edu/apply/",
    logo: "https://logo.clearbit.com/usc.edu",
    internationalFriendly: true,
    financialAidForInternational: false,
  },
  {
    id: "umich",
    name: "University of Michigan",
    shortName: "UMich",
    location: "Ann Arbor, MI",
    country: "US",
    type: "Public",
    selectivity: "Selective",
    ranking: "Top Public University",
    acceptanceRate: "~18%",
    applicationDeadline: "February 1, 2025",
    deadlineDate: new Date("2025-02-01"),
    fundingOptions: [
      { type: "Merit-Based", description: "Merit scholarships", amount: "Variable" },
    ],
    majorsOffered: ["Computer Science", "Engineering", "Business", "Economics", "Psychology", "Biology"],
    admissionRequirements: {
      minGrades: "Strong (B+/A)",
      acceptedCurriculums: ["A Levels", "IB", "American High School"],
      entranceTest: "SAT/ACT optional",
    },
    scholarships: [
      { name: "Michigan Scholarship", coverage: "Variable", eligibility: "Academic merit", applyLink: "https://finaid.umich.edu/" },
    ],
    website: "https://umich.edu",
    applyLink: "https://admissions.umich.edu/apply",
    logo: "https://logo.clearbit.com/umich.edu",
    internationalFriendly: true,
    financialAidForInternational: false,
  },

  // ============= UNITED KINGDOM =============
  // Most Selective UK Universities
  {
    id: "oxford",
    name: "University of Oxford",
    shortName: "Oxford",
    location: "Oxford, England",
    country: "UK",
    type: "Public",
    selectivity: "Most Selective",
    ranking: "#1 in UK",
    acceptanceRate: "~15%",
    applicationDeadline: "October 15, 2025",
    deadlineDate: new Date("2025-10-15"),
    fundingOptions: [
      { type: "Full Scholarship", description: "Rhodes Scholarship", amount: "Full funding" },
      { type: "Need-Based Aid", description: "Reach Oxford", amount: "Full funding" },
    ],
    majorsOffered: ["PPE", "Computer Science", "Medicine", "Law", "Engineering", "Economics", "History"],
    admissionRequirements: {
      minGrades: "Top tier (A*/A)",
      acceptedCurriculums: ["A Levels", "IB"],
      entranceTest: "Subject-specific test + Interview",
      otherRequirements: ["Personal Statement", "References"],
    },
    scholarships: [
      { name: "Reach Oxford", coverage: "Full funding", eligibility: "Developing country students", applyLink: "https://www.ox.ac.uk/admissions/undergraduate/fees-and-funding/reach-oxford-scholarship/" },
    ],
    website: "https://ox.ac.uk",
    applyLink: "https://www.ox.ac.uk/admissions/undergraduate/apply-to-oxford/",
    logo: "https://logo.clearbit.com/ox.ac.uk",
    internationalFriendly: true,
    financialAidForInternational: true,
  },
  {
    id: "cambridge",
    name: "University of Cambridge",
    shortName: "Cambridge",
    location: "Cambridge, England",
    country: "UK",
    type: "Public",
    selectivity: "Most Selective",
    ranking: "#2 in UK",
    acceptanceRate: "~18%",
    applicationDeadline: "October 15, 2025",
    deadlineDate: new Date("2025-10-15"),
    fundingOptions: [
      { type: "Full Scholarship", description: "Gates Cambridge", amount: "Full funding" },
    ],
    majorsOffered: ["Natural Sciences", "Engineering", "Computer Science", "Economics", "Law", "Medicine", "Mathematics"],
    admissionRequirements: {
      minGrades: "Top tier (A*/A)",
      acceptedCurriculums: ["A Levels", "IB"],
      entranceTest: "Subject-specific test + Interview",
      otherRequirements: ["Personal Statement", "Reference"],
    },
    scholarships: [
      { name: "Gates Cambridge", coverage: "Full tuition + living", eligibility: "Outstanding academics + leadership", applyLink: "https://www.gatescambridge.org/" },
    ],
    website: "https://cam.ac.uk",
    applyLink: "https://www.undergraduate.study.cam.ac.uk/applying",
    logo: "https://logo.clearbit.com/cam.ac.uk",
    internationalFriendly: true,
    financialAidForInternational: true,
  },
  {
    id: "lse",
    name: "London School of Economics",
    shortName: "LSE",
    location: "London, England",
    country: "UK",
    type: "Public",
    selectivity: "Highly Selective",
    ranking: "Top 10 Globally for Social Sciences",
    acceptanceRate: "~10%",
    applicationDeadline: "January 15, 2025",
    deadlineDate: new Date("2025-01-15"),
    fundingOptions: [
      { type: "Need-Based Aid", description: "LSE Undergraduate Support", amount: "Up to £15K/year" },
    ],
    majorsOffered: ["Economics", "International Relations", "Law", "Finance", "Politics", "Sociology", "Management"],
    admissionRequirements: {
      minGrades: "Top tier (A*/A)",
      acceptedCurriculums: ["A Levels", "IB"],
      otherRequirements: ["Personal Statement", "Reference"],
    },
    scholarships: [
      { name: "LSE Scholarship", coverage: "Tuition reduction", eligibility: "Need-based", applyLink: "https://www.lse.ac.uk/study-at-lse/Undergraduate/fees-and-funding" },
    ],
    website: "https://lse.ac.uk",
    applyLink: "https://www.lse.ac.uk/study-at-lse/Undergraduate/How-to-apply",
    logo: "https://logo.clearbit.com/lse.ac.uk",
    internationalFriendly: true,
    financialAidForInternational: true,
  },
  {
    id: "imperial",
    name: "Imperial College London",
    shortName: "Imperial",
    location: "London, England",
    country: "UK",
    type: "Public",
    selectivity: "Highly Selective",
    ranking: "Top 10 Globally for STEM",
    acceptanceRate: "~12%",
    applicationDeadline: "January 15, 2025",
    deadlineDate: new Date("2025-01-15"),
    fundingOptions: [
      { type: "Merit-Based", description: "President's Scholarship", amount: "£10K/year" },
    ],
    majorsOffered: ["Engineering", "Medicine", "Computer Science", "Physics", "Mathematics", "Chemistry", "Biology"],
    admissionRequirements: {
      minGrades: "Top tier (A*/A)",
      acceptedCurriculums: ["A Levels", "IB"],
      entranceTest: "BMAT/MAT for some subjects",
      otherRequirements: ["Personal Statement", "Reference"],
    },
    scholarships: [
      { name: "President's Scholarship", coverage: "£10K/year", eligibility: "Academic excellence", applyLink: "https://www.imperial.ac.uk/study/fees-and-funding/undergraduate/" },
    ],
    website: "https://imperial.ac.uk",
    applyLink: "https://www.imperial.ac.uk/study/apply/undergraduate/",
    logo: "https://logo.clearbit.com/imperial.ac.uk",
    internationalFriendly: true,
    financialAidForInternational: true,
  },
  {
    id: "ucl",
    name: "University College London",
    shortName: "UCL",
    location: "London, England",
    country: "UK",
    type: "Public",
    selectivity: "Selective",
    ranking: "Top 10 in UK",
    acceptanceRate: "~20%",
    applicationDeadline: "January 15, 2025",
    deadlineDate: new Date("2025-01-15"),
    fundingOptions: [
      { type: "Merit-Based", description: "UCL Excellence Scholarship", amount: "Variable" },
    ],
    majorsOffered: ["Architecture", "Law", "Economics", "Computer Science", "Medicine", "Engineering", "Psychology"],
    admissionRequirements: {
      minGrades: "Strong (B+/A)",
      acceptedCurriculums: ["A Levels", "IB"],
      otherRequirements: ["Personal Statement", "Reference"],
    },
    scholarships: [
      { name: "UCL Scholarship", coverage: "Variable", eligibility: "Academic merit", applyLink: "https://www.ucl.ac.uk/prospective-students/undergraduate/fees-and-funding" },
    ],
    website: "https://ucl.ac.uk",
    applyLink: "https://www.ucl.ac.uk/prospective-students/undergraduate/how-to-apply",
    logo: "https://logo.clearbit.com/ucl.ac.uk",
    internationalFriendly: true,
    financialAidForInternational: false,
  },
  {
    id: "edinburgh",
    name: "University of Edinburgh",
    shortName: "Edinburgh",
    location: "Edinburgh, Scotland",
    country: "UK",
    type: "Public",
    selectivity: "Selective",
    ranking: "Top 20 in UK",
    acceptanceRate: "~25%",
    applicationDeadline: "January 15, 2025",
    deadlineDate: new Date("2025-01-15"),
    fundingOptions: [
      { type: "Merit-Based", description: "Edinburgh Global Scholarship", amount: "£5K/year" },
    ],
    majorsOffered: ["Computer Science", "Law", "Medicine", "Philosophy", "Engineering", "Business"],
    admissionRequirements: {
      minGrades: "Strong (B+/A)",
      acceptedCurriculums: ["A Levels", "IB"],
      otherRequirements: ["Personal Statement", "Reference"],
    },
    scholarships: [
      { name: "Edinburgh Global", coverage: "£5K/year", eligibility: "International students", applyLink: "https://www.ed.ac.uk/student-funding/undergraduate" },
    ],
    website: "https://ed.ac.uk",
    applyLink: "https://www.ed.ac.uk/studying/undergraduate/applying",
    logo: "https://logo.clearbit.com/ed.ac.uk",
    internationalFriendly: true,
    financialAidForInternational: true,
  },

  // ============= CANADA =============
  // Highly Selective Canadian Universities
  {
    id: "uoft",
    name: "University of Toronto",
    shortName: "UofT",
    location: "Toronto, Ontario",
    country: "Canada",
    type: "Public",
    selectivity: "Highly Selective",
    ranking: "#1 in Canada",
    acceptanceRate: "~40%",
    applicationDeadline: "January 15, 2025",
    deadlineDate: new Date("2025-01-15"),
    fundingOptions: [
      { type: "Full Scholarship", description: "Lester B. Pearson Scholarship", amount: "Full ride for 4 years" },
      { type: "Merit-Based", description: "International Scholar Award", amount: "$10K-40K" },
    ],
    majorsOffered: ["Computer Science", "Engineering", "Commerce", "Life Sciences", "Economics", "Political Science"],
    admissionRequirements: {
      minGrades: "Strong (B+/A)",
      acceptedCurriculums: ["A Levels", "IB", "American High School"],
      otherRequirements: ["Supplementary application for some programs"],
    },
    scholarships: [
      { name: "Lester B. Pearson", coverage: "Full ride", eligibility: "Exceptional international students", applyLink: "https://future.utoronto.ca/pearson/" },
    ],
    website: "https://utoronto.ca",
    applyLink: "https://www.ouac.on.ca/apply/",
    logo: "https://logo.clearbit.com/utoronto.ca",
    internationalFriendly: true,
    financialAidForInternational: true,
  },
  {
    id: "mcgill",
    name: "McGill University",
    shortName: "McGill",
    location: "Montreal, Quebec",
    country: "Canada",
    type: "Public",
    selectivity: "Highly Selective",
    ranking: "#2 in Canada",
    acceptanceRate: "~45%",
    applicationDeadline: "January 15, 2025",
    deadlineDate: new Date("2025-01-15"),
    fundingOptions: [
      { type: "Merit-Based", description: "Entrance Scholarships", amount: "$3K-12K/year" },
    ],
    majorsOffered: ["Medicine", "Engineering", "Computer Science", "Business", "Arts", "Science"],
    admissionRequirements: {
      minGrades: "Strong (B+/A)",
      acceptedCurriculums: ["A Levels", "IB", "American High School"],
    },
    scholarships: [
      { name: "McGill Entrance", coverage: "Up to $12K/year", eligibility: "Academic excellence", applyLink: "https://www.mcgill.ca/studentaid/scholarships-aid" },
    ],
    website: "https://mcgill.ca",
    applyLink: "https://www.mcgill.ca/undergraduate-admissions/apply",
    logo: "https://logo.clearbit.com/mcgill.ca",
    internationalFriendly: true,
    financialAidForInternational: true,
  },
  {
    id: "ubc",
    name: "University of British Columbia",
    shortName: "UBC",
    location: "Vancouver, BC",
    country: "Canada",
    type: "Public",
    selectivity: "Selective",
    ranking: "Top 3 in Canada",
    acceptanceRate: "~50%",
    applicationDeadline: "January 15, 2025",
    deadlineDate: new Date("2025-01-15"),
    fundingOptions: [
      { type: "Full Scholarship", description: "International Scholars", amount: "Full tuition" },
      { type: "Merit-Based", description: "Outstanding International Student Award", amount: "$10K-40K" },
    ],
    majorsOffered: ["Computer Science", "Commerce", "Engineering", "Science", "Arts", "Forestry"],
    admissionRequirements: {
      minGrades: "Strong (B+/A)",
      acceptedCurriculums: ["A Levels", "IB", "American High School"],
    },
    scholarships: [
      { name: "UBC International Scholars", coverage: "Full tuition", eligibility: "Outstanding academics + leadership", applyLink: "https://you.ubc.ca/financial-planning/scholarships-awards-international/" },
    ],
    website: "https://ubc.ca",
    applyLink: "https://you.ubc.ca/applying-ubc/",
    logo: "https://logo.clearbit.com/ubc.ca",
    internationalFriendly: true,
    financialAidForInternational: true,
  },
  {
    id: "waterloo",
    name: "University of Waterloo",
    shortName: "Waterloo",
    location: "Waterloo, Ontario",
    country: "Canada",
    type: "Public",
    selectivity: "Selective",
    ranking: "#1 for Co-op",
    acceptanceRate: "~53%",
    applicationDeadline: "February 1, 2025",
    deadlineDate: new Date("2025-02-01"),
    fundingOptions: [
      { type: "Merit-Based", description: "President's Scholarship", amount: "$10K-25K" },
    ],
    majorsOffered: ["Computer Science", "Engineering", "Mathematics", "Accounting", "Health Sciences"],
    admissionRequirements: {
      minGrades: "Strong (B+/A)",
      acceptedCurriculums: ["A Levels", "IB", "American High School"],
      entranceTest: "AIF (Admission Information Form)",
    },
    scholarships: [
      { name: "President's Scholarship", coverage: "Up to $25K", eligibility: "Academic excellence", applyLink: "https://uwaterloo.ca/future-students/financing/scholarships" },
    ],
    website: "https://uwaterloo.ca",
    applyLink: "https://uwaterloo.ca/future-students/admissions/apply",
    logo: "https://logo.clearbit.com/uwaterloo.ca",
    internationalFriendly: true,
    financialAidForInternational: true,
  },
  {
    id: "queens",
    name: "Queen's University",
    shortName: "Queen's",
    location: "Kingston, Ontario",
    country: "Canada",
    type: "Public",
    selectivity: "Selective",
    ranking: "Top 10 in Canada",
    acceptanceRate: "~42%",
    applicationDeadline: "February 1, 2025",
    deadlineDate: new Date("2025-02-01"),
    fundingOptions: [
      { type: "Merit-Based", description: "Chancellor's Scholarship", amount: "$36K" },
      { type: "Need-Based Aid", description: "Queen's Bursary", amount: "Variable" },
    ],
    majorsOffered: ["Engineering", "Commerce", "Computer Science", "Life Sciences", "Arts", "Health Sciences"],
    admissionRequirements: {
      minGrades: "Strong (B+/A)",
      acceptedCurriculums: ["A Levels", "IB", "American High School"],
      otherRequirements: ["Personal Statement of Experience (PSE)"],
    },
    scholarships: [
      { name: "Chancellor's Scholarship", coverage: "$36K", eligibility: "Outstanding academics & leadership", applyLink: "https://www.queensu.ca/registrar/financial-aid/scholarships-awards" },
    ],
    website: "https://queensu.ca",
    applyLink: "https://www.queensu.ca/admission/apply",
    logo: "https://logo.clearbit.com/queensu.ca",
    internationalFriendly: true,
    financialAidForInternational: true,
  },
  {
    id: "western",
    name: "Western University",
    shortName: "Western",
    location: "London, Ontario",
    country: "Canada",
    type: "Public",
    selectivity: "Moderately Selective",
    ranking: "Top 10 in Canada",
    acceptanceRate: "~56%",
    applicationDeadline: "January 15, 2025",
    deadlineDate: new Date("2025-01-15"),
    fundingOptions: [
      { type: "Merit-Based", description: "National Scholarship", amount: "$60K over 4 years" },
    ],
    majorsOffered: ["Business (Ivey)", "Engineering", "Computer Science", "Health Sciences", "Social Sciences", "Media"],
    admissionRequirements: {
      minGrades: "Average (C-B)",
      acceptedCurriculums: ["A Levels", "IB", "American High School"],
    },
    scholarships: [
      { name: "Western Scholarship of Excellence", coverage: "$3K-5K", eligibility: "Academic excellence", applyLink: "https://registrar.uwo.ca/student_finances/scholarships_awards/" },
    ],
    website: "https://uwo.ca",
    applyLink: "https://welcome.uwo.ca/apply/",
    logo: "https://logo.clearbit.com/uwo.ca",
    internationalFriendly: true,
    financialAidForInternational: false,
  },
  {
    id: "mcmaster",
    name: "McMaster University",
    shortName: "McMaster",
    location: "Hamilton, Ontario",
    country: "Canada",
    type: "Public",
    selectivity: "Selective",
    ranking: "Top 5 for Health Sciences",
    acceptanceRate: "~50%",
    applicationDeadline: "January 15, 2025",
    deadlineDate: new Date("2025-01-15"),
    fundingOptions: [
      { type: "Merit-Based", description: "McMaster Entrance Award", amount: "$2.5K-5K" },
    ],
    majorsOffered: ["Health Sciences", "Engineering", "Commerce", "Computer Science", "Life Sciences", "Social Sciences"],
    admissionRequirements: {
      minGrades: "Strong (B+/A)",
      acceptedCurriculums: ["A Levels", "IB", "American High School"],
      otherRequirements: ["Supplementary Application for some programs"],
    },
    scholarships: [
      { name: "McMaster President's Award", coverage: "$5K", eligibility: "Top applicants", applyLink: "https://sfas.mcmaster.ca/scholarships/" },
    ],
    website: "https://mcmaster.ca",
    applyLink: "https://future.mcmaster.ca/admission/",
    logo: "https://logo.clearbit.com/mcmaster.ca",
    internationalFriendly: true,
    financialAidForInternational: true,
  },
  // Additional US Universities
  {
    id: "nyu",
    name: "New York University",
    shortName: "NYU",
    location: "New York, NY",
    country: "US",
    type: "Private",
    selectivity: "Highly Selective",
    ranking: "Top 30 in US",
    acceptanceRate: "~12%",
    applicationDeadline: "January 5, 2025",
    deadlineDate: new Date("2025-01-05"),
    fundingOptions: [
      { type: "Need-Based Aid", description: "NYU Financial Aid", amount: "Variable" },
      { type: "Merit-Based", description: "Full-tuition scholarships", amount: "Up to $90K/year" },
    ],
    majorsOffered: ["Business (Stern)", "Film & TV", "Computer Science", "Economics", "Psychology", "Drama", "Journalism"],
    admissionRequirements: {
      minGrades: "Top tier (A*/A)",
      acceptedCurriculums: ["A Levels", "IB", "American High School"],
      entranceTest: "SAT/ACT optional",
      otherRequirements: ["Essays", "Recommendations"],
    },
    scholarships: [
      { name: "NYU Scholarships", coverage: "Up to full tuition", eligibility: "Need and merit-based", applyLink: "https://www.nyu.edu/admissions/financial-aid-and-scholarships.html" },
    ],
    website: "https://nyu.edu",
    applyLink: "https://www.nyu.edu/admissions/undergraduate-admissions/how-to-apply.html",
    logo: "https://logo.clearbit.com/nyu.edu",
    internationalFriendly: true,
    financialAidForInternational: true,
  },
  {
    id: "usc",
    name: "University of Southern California",
    shortName: "USC",
    location: "Los Angeles, CA",
    country: "US",
    type: "Private",
    selectivity: "Highly Selective",
    ranking: "Top 25 in US",
    acceptanceRate: "~12%",
    applicationDeadline: "January 15, 2025",
    deadlineDate: new Date("2025-01-15"),
    fundingOptions: [
      { type: "Merit-Based", description: "Trustee Scholarship", amount: "Full tuition" },
      { type: "Need-Based Aid", description: "USC Financial Aid", amount: "Variable" },
    ],
    majorsOffered: ["Business (Marshall)", "Film", "Computer Science", "Engineering", "Communication", "Music"],
    admissionRequirements: {
      minGrades: "Top tier (A*/A)",
      acceptedCurriculums: ["A Levels", "IB", "American High School"],
      entranceTest: "SAT/ACT optional",
    },
    scholarships: [
      { name: "Trustee Scholarship", coverage: "Full tuition", eligibility: "Academic excellence & leadership", applyLink: "https://admission.usc.edu/learn/cost-financial-aid/scholarships/" },
    ],
    website: "https://usc.edu",
    applyLink: "https://admission.usc.edu/apply/",
    logo: "https://logo.clearbit.com/usc.edu",
    internationalFriendly: true,
    financialAidForInternational: true,
  },
  {
    id: "ucla",
    name: "University of California, Los Angeles",
    shortName: "UCLA",
    location: "Los Angeles, CA",
    country: "US",
    type: "Public",
    selectivity: "Highly Selective",
    ranking: "Top 20 Public University",
    acceptanceRate: "~9%",
    applicationDeadline: "November 30, 2024",
    deadlineDate: new Date("2024-11-30"),
    fundingOptions: [
      { type: "Merit-Based", description: "Regents Scholarship", amount: "$20K/year" },
    ],
    majorsOffered: ["Computer Science", "Psychology", "Biology", "Economics", "Political Science", "Engineering", "Film"],
    admissionRequirements: {
      minGrades: "Top tier (A*/A)",
      acceptedCurriculums: ["A Levels", "IB", "American High School"],
      entranceTest: "SAT/ACT not accepted",
      otherRequirements: ["UC Application Essays"],
    },
    scholarships: [
      { name: "Regents Scholarship", coverage: "$20K/year", eligibility: "Top 1.5% of applicants", applyLink: "https://www.ucla.edu/admission/affordability" },
    ],
    website: "https://ucla.edu",
    applyLink: "https://admission.ucla.edu/apply",
    logo: "https://logo.clearbit.com/ucla.edu",
    internationalFriendly: true,
    financialAidForInternational: false,
  },
  {
    id: "berkeley",
    name: "University of California, Berkeley",
    shortName: "UC Berkeley",
    location: "Berkeley, CA",
    country: "US",
    type: "Public",
    selectivity: "Most Selective",
    ranking: "#1 Public University",
    acceptanceRate: "~11%",
    applicationDeadline: "November 30, 2024",
    deadlineDate: new Date("2024-11-30"),
    fundingOptions: [
      { type: "Merit-Based", description: "Regents' and Chancellor's Scholarship", amount: "$30K+" },
    ],
    majorsOffered: ["Computer Science", "Engineering", "Business", "Economics", "Data Science", "Political Science"],
    admissionRequirements: {
      minGrades: "Top tier (A*/A)",
      acceptedCurriculums: ["A Levels", "IB", "American High School"],
      entranceTest: "SAT/ACT not accepted",
      otherRequirements: ["UC Application Essays"],
    },
    scholarships: [
      { name: "Regents' Scholarship", coverage: "$30K+/year", eligibility: "Academic excellence", applyLink: "https://financialaid.berkeley.edu/types-of-aid/scholarships-grants/" },
    ],
    website: "https://berkeley.edu",
    applyLink: "https://admissions.berkeley.edu/apply",
    logo: "https://logo.clearbit.com/berkeley.edu",
    internationalFriendly: true,
    financialAidForInternational: false,
  },
  {
    id: "umich",
    name: "University of Michigan",
    shortName: "UMich",
    location: "Ann Arbor, MI",
    country: "US",
    type: "Public",
    selectivity: "Highly Selective",
    ranking: "Top 25 in US",
    acceptanceRate: "~18%",
    applicationDeadline: "February 1, 2025",
    deadlineDate: new Date("2025-02-01"),
    fundingOptions: [
      { type: "Merit-Based", description: "Stamps Scholarship", amount: "Full cost of attendance" },
    ],
    majorsOffered: ["Business (Ross)", "Engineering", "Computer Science", "Psychology", "Economics", "Political Science"],
    admissionRequirements: {
      minGrades: "Strong (B+/A)",
      acceptedCurriculums: ["A Levels", "IB", "American High School"],
      entranceTest: "SAT/ACT optional",
    },
    scholarships: [
      { name: "Stamps Scholarship", coverage: "Full COA", eligibility: "Leadership & academic excellence", applyLink: "https://finaid.umich.edu/" },
    ],
    website: "https://umich.edu",
    applyLink: "https://admissions.umich.edu/apply",
    logo: "https://logo.clearbit.com/umich.edu",
    internationalFriendly: true,
    financialAidForInternational: false,
  },
  {
    id: "georgia-tech",
    name: "Georgia Institute of Technology",
    shortName: "Georgia Tech",
    location: "Atlanta, GA",
    country: "US",
    type: "Public",
    selectivity: "Highly Selective",
    ranking: "Top 5 for Engineering",
    acceptanceRate: "~16%",
    applicationDeadline: "January 4, 2025",
    deadlineDate: new Date("2025-01-04"),
    fundingOptions: [
      { type: "Merit-Based", description: "Stamps President's Scholarship", amount: "Full COA" },
    ],
    majorsOffered: ["Computer Science", "Mechanical Engineering", "Aerospace Engineering", "Business", "Industrial Engineering"],
    admissionRequirements: {
      minGrades: "Strong (B+/A)",
      acceptedCurriculums: ["A Levels", "IB", "American High School"],
      entranceTest: "SAT/ACT optional",
    },
    scholarships: [
      { name: "Stamps President's Scholars", coverage: "Full COA", eligibility: "Top admits", applyLink: "https://finaid.gatech.edu/scholarships" },
    ],
    website: "https://gatech.edu",
    applyLink: "https://admission.gatech.edu/apply/",
    logo: "https://logo.clearbit.com/gatech.edu",
    internationalFriendly: true,
    financialAidForInternational: false,
  },
  {
    id: "boston-university",
    name: "Boston University",
    shortName: "BU",
    location: "Boston, MA",
    country: "US",
    type: "Private",
    selectivity: "Selective",
    ranking: "Top 40 in US",
    acceptanceRate: "~14%",
    applicationDeadline: "January 4, 2025",
    deadlineDate: new Date("2025-01-04"),
    fundingOptions: [
      { type: "Merit-Based", description: "Trustee Scholarship", amount: "Full tuition" },
      { type: "Need-Based Aid", description: "BU Financial Aid", amount: "Variable" },
    ],
    majorsOffered: ["Business", "Communication", "Engineering", "Computer Science", "Biology", "International Relations"],
    admissionRequirements: {
      minGrades: "Strong (B+/A)",
      acceptedCurriculums: ["A Levels", "IB", "American High School"],
      entranceTest: "SAT/ACT optional",
    },
    scholarships: [
      { name: "Trustee Scholarship", coverage: "Full tuition", eligibility: "Academic excellence", applyLink: "https://www.bu.edu/admissions/tuition-aid/scholarships/" },
    ],
    website: "https://bu.edu",
    applyLink: "https://www.bu.edu/admissions/apply/",
    logo: "https://logo.clearbit.com/bu.edu",
    internationalFriendly: true,
    financialAidForInternational: true,
  },
  {
    id: "purdue",
    name: "Purdue University",
    shortName: "Purdue",
    location: "West Lafayette, IN",
    country: "US",
    type: "Public",
    selectivity: "Selective",
    ranking: "Top 10 for Engineering",
    acceptanceRate: "~53%",
    applicationDeadline: "January 15, 2025",
    deadlineDate: new Date("2025-01-15"),
    fundingOptions: [
      { type: "Merit-Based", description: "Presidential Scholarship", amount: "Up to full tuition" },
    ],
    majorsOffered: ["Engineering", "Computer Science", "Business (Krannert)", "Agriculture", "Pharmacy", "Nursing"],
    admissionRequirements: {
      minGrades: "Average (C-B)",
      acceptedCurriculums: ["A Levels", "IB", "American High School"],
      entranceTest: "SAT/ACT optional",
    },
    scholarships: [
      { name: "Presidential Scholarship", coverage: "Up to full tuition", eligibility: "Academic merit", applyLink: "https://www.purdue.edu/dfa/types/scholarships.html" },
    ],
    website: "https://purdue.edu",
    applyLink: "https://www.admissions.purdue.edu/apply/",
    logo: "https://logo.clearbit.com/purdue.edu",
    internationalFriendly: true,
    financialAidForInternational: false,
  },
];

// Helper function to determine university tier based on student profile
export function getUniversityTier(
  university: University,
  studentProfile: {
    grades: "Top tier (A*/A)" | "Strong (B+/A)" | "Average (C-B)" | "Flexible";
    testScores?: "Excellent" | "Good" | "Average";
    extracurriculars?: "Strong" | "Average" | "Limited";
  }
): UniversityTier {
  const selectivityOrder: Record<SelectivityLevel, number> = {
    "Most Selective": 5,
    "Highly Selective": 4,
    "Selective": 3,
    "Moderately Selective": 2,
    "Less Selective": 1,
  };

  const gradeOrder: Record<string, number> = {
    "Top tier (A*/A)": 4,
    "Strong (B+/A)": 3,
    "Average (C-B)": 2,
    "Flexible": 1,
  };

  const uniSelectivity = selectivityOrder[university.selectivity];
  const studentGradeLevel = gradeOrder[studentProfile.grades];
  const requiredGradeLevel = gradeOrder[university.admissionRequirements.minGrades];

  // Extra boost for excellent test scores and extracurriculars
  let studentBoost = 0;
  if (studentProfile.testScores === "Excellent") studentBoost += 0.5;
  if (studentProfile.extracurriculars === "Strong") studentBoost += 0.5;

  const effectiveStudentLevel = studentGradeLevel + studentBoost;

  // Determine tier based on gap between student profile and university selectivity
  const gap = uniSelectivity - effectiveStudentLevel;

  if (gap >= 2) return "Dream";
  if (gap >= 1) return "Ambitious";
  if (gap >= 0) return "Target";
  return "Safety";
}

// Get matching universities filtered by preferences and categorized by tier
export function getMatchingUniversities(
  preferences: {
    curriculum: string;
    gradeLevel: string;
    fundingNeed: string;
    countryPreferences: string[];
    preferredMajors: string[];
  }
): University[] {
  return universities.filter(uni => {
    // Country match
    const countryMatch = preferences.countryPreferences.includes("Anywhere with good funding") ||
      preferences.countryPreferences.includes(uni.country);
    
    if (!countryMatch) return false;
    
    // Curriculum match - map user selection to actual curriculums
    const curriculumMap: Record<string, string[]> = {
      "National": ["Matric", "FSC"],
      "Cambridge": ["O Levels", "A Levels"],
      "IB": ["IB"],
    };
    
    const acceptableCurriculums = curriculumMap[preferences.curriculum] || [];
    const curriculumMatch = acceptableCurriculums.some(curr => 
      uni.admissionRequirements.acceptedCurriculums.includes(curr as any)
    );
    
    if (!curriculumMatch) return false;
    
    // Funding match - only filter for full scholarship requirement
    if (preferences.fundingNeed === "Full scholarship required") {
      const hasFullScholarship = uni.fundingOptions.some(f => 
        f.type === "Full Scholarship" || 
        f.amount?.includes("100%") || 
        f.amount?.toLowerCase().includes("full")
      ) || uni.financialAidForInternational;
      if (!hasFullScholarship) return false;
    }
    
    return true;
  }).sort((a, b) => {
    // Sort by deadline (upcoming first)
    return a.deadlineDate.getTime() - b.deadlineDate.getTime();
  });
}

// Get universities grouped by tier for a student
export function getUniversitiesByTier(
  universities: University[],
  studentProfile: {
    grades: "Top tier (A*/A)" | "Strong (B+/A)" | "Average (C-B)" | "Flexible";
    testScores?: "Excellent" | "Good" | "Average";
    extracurriculars?: "Strong" | "Average" | "Limited";
  }
): Record<UniversityTier, University[]> {
  const tiers: Record<UniversityTier, University[]> = {
    Dream: [],
    Ambitious: [],
    Target: [],
    Safety: [],
  };

  universities.forEach(uni => {
    const tier = getUniversityTier(uni, studentProfile);
    tiers[tier].push(uni);
  });

  return tiers;
}
