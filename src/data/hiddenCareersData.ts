export interface MarketInfo {
  country: "Pakistan" | "US" | "UK" | "Canada" | "Australia" | "Dubai" | "Germany" | "Singapore";
  demandLevel: "High" | "Emerging" | "Growing" | "Moderate";
  salaryRange: string;
  growthPercent: string;
  opportunities: string;
}

export interface HiddenCareer {
  id: string;
  name: string;
  category: "tech-ai" | "green-sustainability" | "creative-design" | "policy-social";
  tagline: string;
  description: string;
  whyHidden: string;
  skills: string[];
  entryPaths: string[];
  marketInfo: MarketInfo[];
}

export const categoryLabels: Record<string, { label: string; emoji: string; color: string }> = {
  "tech-ai": { label: "Tech & AI", emoji: "🤖", color: "teal" },
  "green-sustainability": { label: "Green & Sustainability", emoji: "🌱", color: "green" },
  "creative-design": { label: "Creative & Design", emoji: "🎨", color: "coral" },
  "policy-social": { label: "Policy & Social Impact", emoji: "🌍", color: "amber" },
};

export const hiddenCareers: HiddenCareer[] = [
  // TECH & AI
  {
    id: "ai-ml-engineer",
    name: "AI/ML Engineer",
    category: "tech-ai",
    tagline: "Build the brains behind smart systems",
    description: "Design and deploy machine learning models that power recommendations, predictions, and automation across industries.",
    whyHidden: "Often lumped with 'software engineering' but requires specialized skills in data science, neural networks, and model deployment.",
    skills: ["Python/TensorFlow", "Deep Learning", "Data Pipelines", "MLOps", "Statistics"],
    entryPaths: ["CS + ML specialization", "Data Science bootcamp", "Self-taught + portfolio"],
    marketInfo: [
      { country: "Pakistan", demandLevel: "Emerging", salaryRange: "PKR 1.5M - 6M/yr", growthPercent: "+45%", opportunities: "Startups, fintech, telecom companies actively hiring" },
      { country: "US", demandLevel: "High", salaryRange: "$120K - $250K/yr", growthPercent: "+40%", opportunities: "FAANG, AI startups, research labs, consulting firms" },
      { country: "UK", demandLevel: "High", salaryRange: "£60K - £120K/yr", growthPercent: "+35%", opportunities: "London tech hub, DeepMind, fintech, healthcare AI" },
      { country: "Canada", demandLevel: "High", salaryRange: "CAD $90K - $180K/yr", growthPercent: "+38%", opportunities: "Toronto-Waterloo corridor, Montreal AI ecosystem" },
    ],
  },
  {
    id: "prompt-engineer",
    name: "Prompt Engineer / AI Trainer",
    category: "tech-ai",
    tagline: "Teach AI how to think and respond",
    description: "Craft prompts and fine-tune AI models to generate better outputs. A new field born from the generative AI revolution.",
    whyHidden: "Didn't exist 3 years ago! Combines linguistics, psychology, and technical understanding of LLMs.",
    skills: ["Prompt Design", "LLM Understanding", "Critical Thinking", "Writing", "A/B Testing"],
    entryPaths: ["Any degree + AI curiosity", "Linguistics/Psychology background", "Self-taught experimentation"],
    marketInfo: [
      { country: "Pakistan", demandLevel: "Emerging", salaryRange: "PKR 800K - 3M/yr", growthPercent: "+120%", opportunities: "Remote work for global companies, local AI startups" },
      { country: "US", demandLevel: "High", salaryRange: "$80K - $180K/yr", growthPercent: "+100%", opportunities: "OpenAI, Anthropic, enterprise AI teams" },
      { country: "UK", demandLevel: "Growing", salaryRange: "£45K - £90K/yr", growthPercent: "+85%", opportunities: "AI consultancies, tech companies, content firms" },
      { country: "Canada", demandLevel: "Growing", salaryRange: "CAD $70K - $140K/yr", growthPercent: "+90%", opportunities: "AI research labs, enterprise software companies" },
    ],
  },
  {
    id: "data-scientist",
    name: "Data Scientist",
    category: "tech-ai",
    tagline: "Turn messy data into business gold",
    description: "Extract insights from complex datasets to drive decisions. Combines statistics, programming, and domain expertise.",
    whyHidden: "Often confused with 'data analyst' but involves much deeper statistical modeling and ML.",
    skills: ["Python/R", "Statistical Modeling", "SQL", "Data Visualization", "Business Acumen"],
    entryPaths: ["Statistics/Math degree", "CS with data focus", "Bootcamp + strong portfolio"],
    marketInfo: [
      { country: "Pakistan", demandLevel: "Growing", salaryRange: "PKR 1.2M - 4.5M/yr", growthPercent: "+35%", opportunities: "Banking, e-commerce, telecom, consulting" },
      { country: "US", demandLevel: "High", salaryRange: "$100K - $200K/yr", growthPercent: "+32%", opportunities: "Every major company, startups, consulting" },
      { country: "UK", demandLevel: "High", salaryRange: "£50K - £100K/yr", growthPercent: "+28%", opportunities: "Finance, healthcare, retail analytics" },
      { country: "Canada", demandLevel: "High", salaryRange: "CAD $80K - $160K/yr", growthPercent: "+30%", opportunities: "Tech hubs, banking, healthcare" },
    ],
  },
  {
    id: "devops-cloud",
    name: "DevOps / Cloud Engineer",
    category: "tech-ai",
    tagline: "Keep the digital world running smoothly",
    description: "Build and maintain the infrastructure that powers applications. Automate deployments and ensure reliability.",
    whyHidden: "Parents think 'IT support' but it's highly strategic, well-paid, and in massive demand.",
    skills: ["AWS/Azure/GCP", "Docker/Kubernetes", "CI/CD", "Linux", "Infrastructure as Code"],
    entryPaths: ["CS degree", "IT certification path", "Self-taught + cloud certs"],
    marketInfo: [
      { country: "Pakistan", demandLevel: "High", salaryRange: "PKR 1.5M - 5M/yr", growthPercent: "+40%", opportunities: "Remote work boom, local tech companies" },
      { country: "US", demandLevel: "High", salaryRange: "$110K - $200K/yr", growthPercent: "+35%", opportunities: "Every tech company, cloud providers" },
      { country: "UK", demandLevel: "High", salaryRange: "£55K - £110K/yr", growthPercent: "+30%", opportunities: "Fintech, enterprise, startups" },
      { country: "Canada", demandLevel: "High", salaryRange: "CAD $85K - $160K/yr", growthPercent: "+33%", opportunities: "Tech companies, government digital" },
    ],
  },

  // GREEN & SUSTAINABILITY
  {
    id: "sustainability-consultant",
    name: "Sustainability Consultant",
    category: "green-sustainability",
    tagline: "Help businesses go green profitably",
    description: "Advise organizations on reducing environmental impact while maintaining profitability. ESG is now mandatory for major companies.",
    whyHidden: "Seen as 'activist work' but it's become mainstream corporate strategy with serious salaries.",
    skills: ["ESG Frameworks", "Carbon Accounting", "Stakeholder Management", "Data Analysis", "Report Writing"],
    entryPaths: ["Environmental science", "Business + sustainability cert", "Engineering + MBA"],
    marketInfo: [
      { country: "Pakistan", demandLevel: "Emerging", salaryRange: "PKR 800K - 3M/yr", growthPercent: "+60%", opportunities: "Multinationals, textile sector, development orgs" },
      { country: "US", demandLevel: "High", salaryRange: "$80K - $160K/yr", growthPercent: "+50%", opportunities: "Big 4 consulting, corporations, NGOs" },
      { country: "UK", demandLevel: "High", salaryRange: "£45K - £100K/yr", growthPercent: "+55%", opportunities: "Europe's strictest ESG rules drive demand" },
      { country: "Canada", demandLevel: "Growing", salaryRange: "CAD $70K - $130K/yr", growthPercent: "+45%", opportunities: "Mining, energy transition, government" },
    ],
  },
  {
    id: "renewable-energy-analyst",
    name: "Renewable Energy Analyst",
    category: "green-sustainability",
    tagline: "Power the clean energy revolution",
    description: "Analyze solar, wind, and other renewable projects for feasibility, financing, and optimization.",
    whyHidden: "Pakistan has massive solar potential but few know this is a structured career path.",
    skills: ["Energy Modeling", "Financial Analysis", "Project Management", "Technical Knowledge", "Policy Understanding"],
    entryPaths: ["Engineering + energy focus", "Finance + energy sector", "Environmental science"],
    marketInfo: [
      { country: "Pakistan", demandLevel: "Growing", salaryRange: "PKR 1M - 4M/yr", growthPercent: "+70%", opportunities: "Solar boom, CPEC energy projects, development banks" },
      { country: "US", demandLevel: "High", salaryRange: "$75K - $140K/yr", growthPercent: "+65%", opportunities: "Clean energy companies, utilities, investment firms" },
      { country: "UK", demandLevel: "High", salaryRange: "£40K - £90K/yr", growthPercent: "+60%", opportunities: "Offshore wind leader, energy transition" },
      { country: "Canada", demandLevel: "High", salaryRange: "CAD $70K - $130K/yr", growthPercent: "+55%", opportunities: "Hydro, wind, government clean energy push" },
    ],
  },
  {
    id: "climate-policy-analyst",
    name: "Climate Policy Analyst",
    category: "green-sustainability",
    tagline: "Shape the rules that save the planet",
    description: "Research and develop policies to address climate change at government, NGO, or corporate level.",
    whyHidden: "Combines science with policy—not pure activism, but strategic influence work.",
    skills: ["Policy Analysis", "Climate Science Basics", "Research", "Writing", "Stakeholder Engagement"],
    entryPaths: ["Public policy + environment", "Environmental law", "Science + policy masters"],
    marketInfo: [
      { country: "Pakistan", demandLevel: "Emerging", salaryRange: "PKR 600K - 2.5M/yr", growthPercent: "+50%", opportunities: "Ministry, UNDP, World Bank, climate funds" },
      { country: "US", demandLevel: "Growing", salaryRange: "$65K - $130K/yr", growthPercent: "+40%", opportunities: "Think tanks, government, advocacy orgs" },
      { country: "UK", demandLevel: "High", salaryRange: "£40K - £85K/yr", growthPercent: "+45%", opportunities: "COP host country, strong policy focus" },
      { country: "Canada", demandLevel: "Growing", salaryRange: "CAD $60K - $120K/yr", growthPercent: "+42%", opportunities: "Federal climate commitments drive hiring" },
    ],
  },
  {
    id: "circular-economy-specialist",
    name: "Circular Economy Specialist",
    category: "green-sustainability",
    tagline: "Design waste out of the system",
    description: "Help companies redesign products and processes to eliminate waste and keep materials in use longer.",
    whyHidden: "New field that combines design thinking, supply chain, and sustainability—very few people trained.",
    skills: ["Systems Thinking", "Supply Chain", "Product Design", "Life Cycle Assessment", "Innovation"],
    entryPaths: ["Engineering + sustainability", "Design + MBA", "Supply chain + environment cert"],
    marketInfo: [
      { country: "Pakistan", demandLevel: "Emerging", salaryRange: "PKR 700K - 2.5M/yr", growthPercent: "+55%", opportunities: "Textile sustainability, packaging innovation" },
      { country: "US", demandLevel: "Growing", salaryRange: "$70K - $140K/yr", growthPercent: "+48%", opportunities: "Consumer goods, tech, consulting" },
      { country: "UK", demandLevel: "High", salaryRange: "£45K - £95K/yr", growthPercent: "+52%", opportunities: "EU circular economy regulations drive demand" },
      { country: "Canada", demandLevel: "Growing", salaryRange: "CAD $65K - $125K/yr", growthPercent: "+45%", opportunities: "Resource sector, manufacturing" },
    ],
  },

  // CREATIVE & DESIGN
  {
    id: "ux-designer",
    name: "UX/UI Designer",
    category: "creative-design",
    tagline: "Make technology feel human",
    description: "Design digital experiences that are intuitive, beautiful, and user-centered. Crucial for any tech product.",
    whyHidden: "Parents think 'graphic design' but UX is strategic, research-driven, and very well paid.",
    skills: ["User Research", "Wireframing", "Prototyping", "Visual Design", "Usability Testing"],
    entryPaths: ["Design degree + UX focus", "Psychology + design bootcamp", "Self-taught + strong portfolio"],
    marketInfo: [
      { country: "Pakistan", demandLevel: "Growing", salaryRange: "PKR 800K - 3.5M/yr", growthPercent: "+45%", opportunities: "Tech startups, freelance for global clients" },
      { country: "US", demandLevel: "High", salaryRange: "$85K - $170K/yr", growthPercent: "+35%", opportunities: "Every tech company, agencies, consulting" },
      { country: "UK", demandLevel: "High", salaryRange: "£40K - £90K/yr", growthPercent: "+32%", opportunities: "Fintech, startups, agencies" },
      { country: "Canada", demandLevel: "High", salaryRange: "CAD $70K - $140K/yr", growthPercent: "+33%", opportunities: "Tech hubs, e-commerce, gaming" },
    ],
  },
  {
    id: "content-strategist",
    name: "Content Strategist",
    category: "creative-design",
    tagline: "Craft messages that move millions",
    description: "Plan and create content that drives business goals. Combines creativity with data-driven decision making.",
    whyHidden: "Often dismissed as 'just writing' but it's strategic thinking that directly impacts revenue.",
    skills: ["Strategic Thinking", "Writing", "SEO", "Analytics", "Brand Voice"],
    entryPaths: ["Communications/Marketing degree", "Journalism + digital skills", "Any degree + portfolio"],
    marketInfo: [
      { country: "Pakistan", demandLevel: "Growing", salaryRange: "PKR 600K - 2.5M/yr", growthPercent: "+40%", opportunities: "Digital agencies, e-commerce, remote work" },
      { country: "US", demandLevel: "High", salaryRange: "$70K - $140K/yr", growthPercent: "+30%", opportunities: "Tech, media, agencies, in-house teams" },
      { country: "UK", demandLevel: "High", salaryRange: "£40K - £80K/yr", growthPercent: "+28%", opportunities: "Publishing, tech, agencies" },
      { country: "Canada", demandLevel: "Growing", salaryRange: "CAD $60K - $120K/yr", growthPercent: "+30%", opportunities: "Tech companies, agencies" },
    ],
  },
  {
    id: "product-designer",
    name: "Product Designer",
    category: "creative-design",
    tagline: "Design products people actually want",
    description: "End-to-end design of digital products from concept to launch. Strategic role combining UX, UI, and business thinking.",
    whyHidden: "Evolved from UX but more strategic—often reports directly to founders/executives.",
    skills: ["Product Thinking", "Design Systems", "Prototyping", "User Research", "Cross-functional Collaboration"],
    entryPaths: ["UX + product experience", "Design degree + tech internships", "Bootcamp + portfolio"],
    marketInfo: [
      { country: "Pakistan", demandLevel: "Emerging", salaryRange: "PKR 1M - 4M/yr", growthPercent: "+50%", opportunities: "Tech startups, remote for global companies" },
      { country: "US", demandLevel: "High", salaryRange: "$100K - $200K/yr", growthPercent: "+38%", opportunities: "Startups, FAANG, product companies" },
      { country: "UK", demandLevel: "High", salaryRange: "£50K - £110K/yr", growthPercent: "+35%", opportunities: "Fintech, startups, scale-ups" },
      { country: "Canada", demandLevel: "High", salaryRange: "CAD $85K - $160K/yr", growthPercent: "+36%", opportunities: "Shopify ecosystem, tech startups" },
    ],
  },
  {
    id: "brand-designer",
    name: "Brand Designer / Strategist",
    category: "creative-design",
    tagline: "Build identities that people remember",
    description: "Create comprehensive brand identities from logos to full brand systems. Strategic design that shapes perception.",
    whyHidden: "Goes far beyond 'logo design'—involves psychology, strategy, and business understanding.",
    skills: ["Visual Identity", "Brand Strategy", "Typography", "Creative Direction", "Presentation"],
    entryPaths: ["Graphic design + brand focus", "Fine arts + strategy", "Self-taught + agency experience"],
    marketInfo: [
      { country: "Pakistan", demandLevel: "Growing", salaryRange: "PKR 600K - 3M/yr", growthPercent: "+35%", opportunities: "Agencies, startups, freelance" },
      { country: "US", demandLevel: "High", salaryRange: "$75K - $150K/yr", growthPercent: "+28%", opportunities: "Agencies, in-house, consulting" },
      { country: "UK", demandLevel: "High", salaryRange: "£40K - £90K/yr", growthPercent: "+25%", opportunities: "London agencies, global brands" },
      { country: "Canada", demandLevel: "Growing", salaryRange: "CAD $65K - $130K/yr", growthPercent: "+27%", opportunities: "Agencies, tech, CPG companies" },
    ],
  },

  // POLICY & SOCIAL
  {
    id: "social-entrepreneur",
    name: "Social Entrepreneur",
    category: "policy-social",
    tagline: "Build businesses that solve problems",
    description: "Create ventures that address social issues while being financially sustainable. Impact + income.",
    whyHidden: "Often seen as 'charity work' but successful social enterprises are profitable businesses.",
    skills: ["Business Model Design", "Impact Measurement", "Fundraising", "Leadership", "Storytelling"],
    entryPaths: ["Business + social sector experience", "NGO + business training", "Direct startup experience"],
    marketInfo: [
      { country: "Pakistan", demandLevel: "Growing", salaryRange: "Varies (equity/impact)", growthPercent: "+55%", opportunities: "LUMS, Acumen, impact investors expanding" },
      { country: "US", demandLevel: "High", salaryRange: "$60K - $150K+ (varies)", growthPercent: "+45%", opportunities: "B Corps, impact funds, Ashoka network" },
      { country: "UK", demandLevel: "High", salaryRange: "£35K - £100K+ (varies)", growthPercent: "+40%", opportunities: "Strong social enterprise ecosystem" },
      { country: "Canada", demandLevel: "Growing", salaryRange: "CAD $50K - $120K+ (varies)", growthPercent: "+42%", opportunities: "Government support for social enterprises" },
    ],
  },
  {
    id: "public-health-specialist",
    name: "Public Health Specialist",
    category: "policy-social",
    tagline: "Protect communities at scale",
    description: "Design and implement health programs that reach entire populations. Prevention over treatment.",
    whyHidden: "COVID showed its importance but people still think 'doctor' is the only health career.",
    skills: ["Epidemiology", "Health Policy", "Data Analysis", "Program Management", "Communication"],
    entryPaths: ["MPH degree", "Medicine + public health", "Social sciences + health focus"],
    marketInfo: [
      { country: "Pakistan", demandLevel: "High", salaryRange: "PKR 800K - 3.5M/yr", growthPercent: "+45%", opportunities: "WHO, UNICEF, government, NGOs" },
      { country: "US", demandLevel: "High", salaryRange: "$65K - $130K/yr", growthPercent: "+35%", opportunities: "CDC, state health, nonprofits, consulting" },
      { country: "UK", demandLevel: "High", salaryRange: "£35K - £80K/yr", growthPercent: "+30%", opportunities: "NHS, Public Health England, WHO" },
      { country: "Canada", demandLevel: "High", salaryRange: "CAD $60K - $120K/yr", growthPercent: "+32%", opportunities: "Provincial health, federal agencies" },
    ],
  },
  {
    id: "policy-analyst",
    name: "Policy Analyst / Researcher",
    category: "policy-social",
    tagline: "Shape decisions with evidence",
    description: "Research and analyze policy options to inform government and organizational decisions. Evidence-based change.",
    whyHidden: "Not as visible as politicians but often more influential in actual policy outcomes.",
    skills: ["Research Methods", "Data Analysis", "Policy Writing", "Stakeholder Analysis", "Quantitative Methods"],
    entryPaths: ["Public policy degree", "Economics/Political science + masters", "Think tank experience"],
    marketInfo: [
      { country: "Pakistan", demandLevel: "Growing", salaryRange: "PKR 700K - 3M/yr", growthPercent: "+35%", opportunities: "Think tanks, government, World Bank, development" },
      { country: "US", demandLevel: "High", salaryRange: "$60K - $120K/yr", growthPercent: "+28%", opportunities: "Think tanks, government, consulting" },
      { country: "UK", demandLevel: "High", salaryRange: "£35K - £75K/yr", growthPercent: "+25%", opportunities: "Civil service, think tanks, Parliament" },
      { country: "Canada", demandLevel: "Growing", salaryRange: "CAD $55K - $110K/yr", growthPercent: "+27%", opportunities: "Federal/provincial government, research institutes" },
    ],
  },
  {
    id: "dei-specialist",
    name: "DEI Specialist (Diversity, Equity, Inclusion)",
    category: "policy-social",
    tagline: "Build workplaces where everyone thrives",
    description: "Help organizations create inclusive cultures and equitable practices. Growing corporate priority globally.",
    whyHidden: "New field that combines HR, psychology, and social justice—didn't exist as a career 10 years ago.",
    skills: ["Training Design", "Data Analysis", "Change Management", "Facilitation", "Policy Development"],
    entryPaths: ["HR + DEI certification", "Psychology/Sociology + corporate experience", "Activism + business training"],
    marketInfo: [
      { country: "Pakistan", demandLevel: "Emerging", salaryRange: "PKR 600K - 2M/yr", growthPercent: "+40%", opportunities: "Multinationals, development sector" },
      { country: "US", demandLevel: "High", salaryRange: "$70K - $150K/yr", growthPercent: "+45%", opportunities: "Every Fortune 500, consulting, nonprofits" },
      { country: "UK", demandLevel: "High", salaryRange: "£40K - £90K/yr", growthPercent: "+42%", opportunities: "Corporate, public sector, consulting" },
      { country: "Canada", demandLevel: "High", salaryRange: "CAD $60K - $130K/yr", growthPercent: "+40%", opportunities: "Corporate, government, education" },
    ],
  },
];
