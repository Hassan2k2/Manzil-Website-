export interface Major {
  id: string;
  name: string;
  description: string;
  riasecMatch: string[]; // Primary RIASEC codes
  valueMatch: string[]; // Matching higher-order values
  personalityMatch: {
    openness: "high" | "medium" | "low";
    conscientiousness: "high" | "medium" | "low";
    extraversion: "high" | "medium" | "low";
    agreeableness: "high" | "medium" | "low";
    neuroticism: "high" | "medium" | "low";
  };
  skills: string[];
  careers: string[];
  whyFits: string[];
  whatGives: string[];
  whyNotBoring: string;
  whyNot?: string[]; // Reasons why this might NOT be a good fit
}

export interface Career {
  id: string;
  name: string;
  description: string;
  riasecMatch: string[];
  valueMatch: string[];
  personalityMatch: {
    openness: "high" | "medium" | "low";
    conscientiousness: "high" | "medium" | "low";
    extraversion: "high" | "medium" | "low";
    agreeableness: "high" | "medium" | "low";
    neuroticism: "high" | "medium" | "low";
  };
  skills: string[];
  careers: string[];
  whyFits: string[];
  whatGives: string[];
  whyNotBoring: string;
  whyNot: string[];
}

export const majors: Major[] = [
  {
    id: "economics",
    name: "Economics / Political Economy",
    description: "Study of markets, incentives, and how societies allocate resources. Combines analytical thinking with real-world problem solving.",
    riasecMatch: ["E", "I", "C"],
    valueMatch: ["Self-Enhancement", "Openness to Change"],
    personalityMatch: {
      openness: "high",
      conscientiousness: "high",
      extraversion: "medium",
      agreeableness: "medium",
      neuroticism: "low"
    },
    skills: ["Analytical thinking", "Data analysis", "Strategic planning", "Problem solving"],
    careers: ["Economist", "Policy Analyst", "Financial Analyst", "Consultant"],
    whyFits: [
      "You like influence, strategy, and understanding how systems work",
      "You enjoy solving real-world problems, not just memorising theory",
      "You value independence, excitement, and keeping your options open"
    ],
    whatGives: [
      "Strong analytical skills",
      "High flexibility for future careers",
      "A reputation that travels well across countries and industries"
    ],
    whyNotBoring: "It's about decisions, incentives, power, and money — not just numbers.",
    whyNot: [
      "Can be highly theoretical in early years",
      "Math-heavy if you dislike quantitative work"
    ]
  },
  {
    id: "public-policy",
    name: "Public Policy / Public Administration",
    description: "Learn how governments make decisions and solve big societal problems. Perfect for those who want to create real change.",
    riasecMatch: ["S", "E", "I"],
    valueMatch: ["Self-Transcendence", "Conservation"],
    personalityMatch: {
      openness: "high",
      conscientiousness: "high",
      extraversion: "high",
      agreeableness: "high",
      neuroticism: "low"
    },
    skills: ["Leadership", "Communication", "Policy analysis", "Stakeholder management"],
    careers: ["Policy Advisor", "Government Official", "NGO Manager", "Diplomat"],
    whyFits: [
      "You care about big-picture issues and fairness",
      "You're comfortable with responsibility and leadership",
      "You like structured problem-solving with real impact"
    ],
    whatGives: [
      "Understanding how decisions are made in governments and institutions",
      "Strong communication and leadership skills",
      "Clear pathways into policy, NGOs, and international work"
    ],
    whyNotBoring: "It's debates, strategy, real problems — not just paperwork.",
    whyNot: [
      "Can feel bureaucratic at times",
      "Change happens slowly in government"
    ]
  },
  {
    id: "business-admin",
    name: "Business Administration / Management",
    description: "Master the art of leading teams, making strategic decisions, and building successful organizations.",
    riasecMatch: ["E", "C", "S"],
    valueMatch: ["Self-Enhancement", "Openness to Change"],
    personalityMatch: {
      openness: "medium",
      conscientiousness: "high",
      extraversion: "high",
      agreeableness: "medium",
      neuroticism: "low"
    },
    skills: ["Leadership", "Decision-making", "Team management", "Strategic thinking"],
    careers: ["Manager", "Entrepreneur", "Consultant", "Marketing Director"],
    whyFits: [
      "You enjoy leading, persuading, and making things happen",
      "You prefer practical skills over abstract theory",
      "You like fast-paced environments and variety"
    ],
    whatGives: [
      "Leadership and decision-making skills",
      "Exposure to multiple fields (strategy, marketing, operations)",
      "A strong base for consulting or entrepreneurship"
    ],
    whyNotBoring: "You'll work on real projects, real teams, and real decisions.",
    whyNot: [
      "Can be too broad without specialization",
      "Some courses may feel generic"
    ]
  },
  {
    id: "psychology",
    name: "Psychology (Organisational / Social Focus)",
    description: "Understand how people think, feel, and behave. Great for those curious about human nature and helping others.",
    riasecMatch: ["S", "I", "A"],
    valueMatch: ["Self-Transcendence", "Openness to Change"],
    personalityMatch: {
      openness: "high",
      conscientiousness: "medium",
      extraversion: "medium",
      agreeableness: "high",
      neuroticism: "medium"
    },
    skills: ["Empathy", "Research", "Communication", "Analysis"],
    careers: ["Psychologist", "HR Specialist", "Counselor", "Researcher"],
    whyFits: [
      "You're curious about how people think and behave",
      "You enjoy understanding motivations and group dynamics",
      "You want to help people thrive"
    ],
    whatGives: [
      "Deep understanding of human behavior",
      "Research and analytical skills",
      "Foundation for many helping professions"
    ],
    whyNotBoring: "You'll learn why people do what they do — including yourself!",
    whyNot: [
      "Less focus on leadership and influence",
      "Often requires graduate study for higher-level roles"
    ]
  },
  {
    id: "international-relations",
    name: "International Relations / Global Studies",
    description: "Explore how countries interact, global issues, and international cooperation. For big-picture thinkers.",
    riasecMatch: ["S", "E", "I"],
    valueMatch: ["Self-Transcendence", "Openness to Change"],
    personalityMatch: {
      openness: "high",
      conscientiousness: "medium",
      extraversion: "high",
      agreeableness: "high",
      neuroticism: "low"
    },
    skills: ["Critical thinking", "Cultural awareness", "Diplomacy", "Research"],
    careers: ["Diplomat", "International Consultant", "NGO Worker", "Journalist"],
    whyFits: [
      "You think globally and enjoy complex issues",
      "You like big ideas and discussions",
      "You're fascinated by different cultures and perspectives"
    ],
    whatGives: [
      "Global perspective and cultural competence",
      "Strong research and analytical skills",
      "Network across international organizations"
    ],
    whyNotBoring: "You'll debate world issues, not just read about them.",
    whyNot: [
      "More theory-heavy than some expect",
      "Less direct skill-building unless paired with economics or policy"
    ]
  },
  {
    id: "communications",
    name: "Communications / Media / Strategic Communication",
    description: "Learn the power of messaging, storytelling, and connecting with audiences. Perfect for persuasive communicators.",
    riasecMatch: ["A", "E", "S"],
    valueMatch: ["Openness to Change", "Self-Enhancement"],
    personalityMatch: {
      openness: "high",
      conscientiousness: "medium",
      extraversion: "high",
      agreeableness: "medium",
      neuroticism: "low"
    },
    skills: ["Writing", "Public speaking", "Creative thinking", "Social media"],
    careers: ["PR Specialist", "Content Creator", "Marketing Manager", "Journalist"],
    whyFits: [
      "You're persuasive and expressive",
      "You understand the power of messaging",
      "You love telling stories and connecting with people"
    ],
    whatGives: [
      "Strong writing and presentation skills",
      "Understanding of media and public relations",
      "Creative and strategic thinking abilities"
    ],
    whyNotBoring: "You'll create content that moves people to action.",
    whyNot: [
      "Less structured career path",
      "Weaker alignment with highly analytical strengths"
    ]
  },
  {
    id: "engineering",
    name: "Engineering (Mechanical, Electrical, Civil)",
    description: "Design and build the physical world around us. For those who love hands-on problem solving and technical challenges.",
    riasecMatch: ["R", "I", "C"],
    valueMatch: ["Self-Enhancement", "Conservation"],
    personalityMatch: {
      openness: "medium",
      conscientiousness: "high",
      extraversion: "low",
      agreeableness: "medium",
      neuroticism: "low"
    },
    skills: ["Technical skills", "Problem solving", "Math", "Attention to detail"],
    careers: ["Engineer", "Project Manager", "Technical Consultant", "Researcher"],
    whyFits: [
      "You love building and creating tangible things",
      "You enjoy technical challenges and precision",
      "You like seeing real-world results from your work"
    ],
    whatGives: [
      "Strong technical and analytical skills",
      "High employability and good salaries",
      "Ability to create real-world solutions"
    ],
    whyNotBoring: "You'll design things that actually get built and used.",
    whyNot: [
      "Highly rigid and technical curriculum",
      "Limited people interaction in some roles",
      "Low alignment with creative and persuasive strengths"
    ]
  },
  {
    id: "computer-science",
    name: "Computer Science / Software Engineering",
    description: "Build the digital future through code. Perfect for logical thinkers who love technology and innovation.",
    riasecMatch: ["I", "R", "C"],
    valueMatch: ["Openness to Change", "Self-Enhancement"],
    personalityMatch: {
      openness: "high",
      conscientiousness: "high",
      extraversion: "low",
      agreeableness: "medium",
      neuroticism: "low"
    },
    skills: ["Programming", "Logic", "Problem solving", "Creativity"],
    careers: ["Software Developer", "Data Scientist", "Product Manager", "Tech Entrepreneur"],
    whyFits: [
      "You love solving puzzles and logical challenges",
      "You're fascinated by technology and innovation",
      "You want to build things that millions of people use"
    ],
    whatGives: [
      "In-demand technical skills",
      "High flexibility in career paths",
      "Ability to create and innovate"
    ],
    whyNotBoring: "You'll build apps, games, and systems that change how people live.",
    whyNot: [
      "Can be isolating without team-oriented roles",
      "Heavy focus on abstract logic"
    ]
  },
  {
    id: "medicine",
    name: "Medicine / Healthcare",
    description: "Dedicate yourself to healing and helping others. Combines science with deep human connection.",
    riasecMatch: ["S", "I", "R"],
    valueMatch: ["Self-Transcendence", "Conservation"],
    personalityMatch: {
      openness: "medium",
      conscientiousness: "high",
      extraversion: "medium",
      agreeableness: "high",
      neuroticism: "low"
    },
    skills: ["Science", "Empathy", "Attention to detail", "Communication"],
    careers: ["Doctor", "Nurse", "Healthcare Administrator", "Medical Researcher"],
    whyFits: [
      "You're driven to help people in tangible ways",
      "You love science and understanding how bodies work",
      "You thrive under pressure and responsibility"
    ],
    whatGives: [
      "Highly respected and stable career",
      "Direct impact on people's lives",
      "Continuous learning and challenges"
    ],
    whyNotBoring: "Every patient is different, every day brings new challenges.",
    whyNot: [
      "Extremely long training period",
      "High stress and emotional demands",
      "Less creative freedom"
    ]
  },
  {
    id: "education",
    name: "Education / Teaching",
    description: "Shape young minds and make a lasting impact on future generations. For natural mentors and communicators.",
    riasecMatch: ["S", "A", "C"],
    valueMatch: ["Self-Transcendence", "Conservation"],
    personalityMatch: {
      openness: "high",
      conscientiousness: "high",
      extraversion: "high",
      agreeableness: "high",
      neuroticism: "low"
    },
    skills: ["Communication", "Patience", "Creativity", "Organization"],
    careers: ["Teacher", "Professor", "Education Administrator", "Curriculum Developer"],
    whyFits: [
      "You love sharing knowledge and seeing others grow",
      "You're patient and enjoy working with young people",
      "You want to make a lasting difference"
    ],
    whatGives: [
      "Deep personal fulfillment",
      "Strong communication and leadership skills",
      "Stable career with good work-life balance"
    ],
    whyNotBoring: "You'll watch students transform and know you made it happen.",
    whyNot: [
      "Lower pay compared to other professions",
      "Can be bureaucratically frustrating"
    ]
  },
  {
    id: "accounting",
    name: "Accounting / Auditing",
    description: "Master the language of business through numbers. For detail-oriented individuals who love structure.",
    riasecMatch: ["C", "E", "I"],
    valueMatch: ["Conservation", "Self-Enhancement"],
    personalityMatch: {
      openness: "low",
      conscientiousness: "high",
      extraversion: "low",
      agreeableness: "medium",
      neuroticism: "low"
    },
    skills: ["Numerical analysis", "Attention to detail", "Organization", "Ethics"],
    careers: ["Accountant", "Financial Analyst", "Auditor", "CFO"],
    whyFits: [
      "You love precision and getting things exactly right",
      "You enjoy working with numbers and systems",
      "You value stability and clear career progression"
    ],
    whatGives: [
      "High job security and stable income",
      "Clear career path to senior roles",
      "Skills valued across all industries"
    ],
    whyNotBoring: "You'll be the one who sees behind the curtain of every business.",
    whyNot: [
      "Highly repetitive and rule-based work",
      "Low stimulation for creative types",
      "Minimal leadership or creative freedom"
    ]
  },
  {
    id: "arts",
    name: "Fine Arts / Design",
    description: "Express yourself through visual creativity. For those who see the world differently and want to share their vision.",
    riasecMatch: ["A", "R", "I"],
    valueMatch: ["Openness to Change", "Self-Transcendence"],
    personalityMatch: {
      openness: "high",
      conscientiousness: "medium",
      extraversion: "medium",
      agreeableness: "medium",
      neuroticism: "medium"
    },
    skills: ["Creativity", "Visual thinking", "Technical skills", "Self-expression"],
    careers: ["Artist", "Graphic Designer", "UX Designer", "Art Director"],
    whyFits: [
      "You need to create and express yourself",
      "You see beauty and possibilities others miss",
      "You want freedom to explore your ideas"
    ],
    whatGives: [
      "Portfolio of creative work",
      "Strong visual and design thinking skills",
      "Ability to communicate through visuals"
    ],
    whyNotBoring: "You'll create things that didn't exist before you imagined them.",
    whyNot: [
      "Unstable income potential",
      "Highly competitive market",
      "Less structure than some prefer"
    ]
  },
  {
    id: "law",
    name: "Law / Legal Studies",
    description: "Champion justice and navigate complex legal systems. For those who love debate and helping others through advocacy.",
    riasecMatch: ["E", "S", "C"],
    valueMatch: ["Self-Enhancement", "Self-Transcendence"],
    personalityMatch: {
      openness: "medium",
      conscientiousness: "high",
      extraversion: "high",
      agreeableness: "medium",
      neuroticism: "low"
    },
    skills: ["Critical thinking", "Argumentation", "Research", "Communication"],
    careers: ["Lawyer", "Judge", "Legal Consultant", "Policy Advisor"],
    whyFits: [
      "You love debating and defending positions",
      "You're drawn to justice and fairness",
      "You enjoy complex problem-solving"
    ],
    whatGives: [
      "Strong analytical and argumentation skills",
      "Prestigious and well-compensated career",
      "Ability to advocate for change"
    ],
    whyNotBoring: "You'll argue cases, negotiate deals, and fight for what's right.",
    whyNot: [
      "Extremely demanding workload",
      "Long and expensive training",
      "High stress environment"
    ]
  },
  {
    id: "sciences",
    name: "Natural Sciences (Physics, Chemistry, Biology)",
    description: "Discover how the universe works through scientific inquiry. For curious minds who love experimentation.",
    riasecMatch: ["I", "R", "A"],
    valueMatch: ["Openness to Change", "Self-Transcendence"],
    personalityMatch: {
      openness: "high",
      conscientiousness: "high",
      extraversion: "low",
      agreeableness: "medium",
      neuroticism: "low"
    },
    skills: ["Scientific method", "Analysis", "Lab skills", "Critical thinking"],
    careers: ["Scientist", "Researcher", "Professor", "Lab Director"],
    whyFits: [
      "You're endlessly curious about how things work",
      "You love experiments and discovering new things",
      "You enjoy deep, focused work"
    ],
    whatGives: [
      "Deep understanding of the natural world",
      "Strong research and analytical skills",
      "Foundation for many advanced careers"
    ],
    whyNotBoring: "You'll discover things no human has ever known before.",
    whyNot: [
      "Heavy focus on lab work and theory",
      "Limited connection to people or real-world decision-making",
      "Can feel isolated"
    ]
  },
  {
    id: "marketing",
    name: "Marketing / Advertising",
    description: "Connect products with people through creative strategies. For those who understand what makes people tick.",
    riasecMatch: ["E", "A", "S"],
    valueMatch: ["Self-Enhancement", "Openness to Change"],
    personalityMatch: {
      openness: "high",
      conscientiousness: "medium",
      extraversion: "high",
      agreeableness: "medium",
      neuroticism: "low"
    },
    skills: ["Creativity", "Communication", "Analytics", "Strategy"],
    careers: ["Marketing Manager", "Brand Strategist", "Digital Marketer", "Creative Director"],
    whyFits: [
      "You understand what motivates people",
      "You're creative AND strategic",
      "You love crafting messages that connect"
    ],
    whatGives: [
      "Blend of creative and analytical skills",
      "Understanding of consumer psychology",
      "Versatile career options"
    ],
    whyNotBoring: "You'll create campaigns that change how people think and act.",
    whyNot: [
      "Can feel superficial to some",
      "Fast-paced and sometimes stressful"
    ]
  }
];

export const careers: Career[] = [
  // 1. Computer Science
  {
    id: "computer-science",
    name: "Computer Science",
    description: "Study of computation, algorithms, and building software systems. Combines logical thinking with creative problem solving.",
    riasecMatch: ["I", "R", "C"],
    valueMatch: ["Self-Direction", "Openness to Change"],
    personalityMatch: {
      openness: "high",
      conscientiousness: "high",
      extraversion: "low",
      agreeableness: "medium",
      neuroticism: "low"
    },
    skills: ["Programming", "Logical thinking", "Problem solving", "Systems design"],
    careers: ["Software Engineer", "Data Scientist", "AI Researcher", "Systems Architect"],
    whyFits: [
      "You enjoy building things and solving complex puzzles",
      "You like working independently with clear, logical systems",
      "You value innovation and staying at the cutting edge"
    ],
    whatGives: [
      "High earning potential and job security",
      "Remote work flexibility",
      "Ability to create products used by millions"
    ],
    whyNotBoring: "You're literally building the future and solving problems that didn't exist yesterday.",
    whyNot: [
      "Constantly need to learn new technologies",
      "Can involve long hours debugging frustrating problems"
    ]
  },
  // 2. Medicine
  {
    id: "medicine-career",
    name: "Medicine",
    description: "Science and practice of diagnosing, treating, and preventing disease. Combines scientific knowledge with direct human impact.",
    riasecMatch: ["I", "S", "R"],
    valueMatch: ["Benevolence", "Self-Direction"],
    personalityMatch: {
      openness: "high",
      conscientiousness: "high",
      extraversion: "medium",
      agreeableness: "high",
      neuroticism: "low"
    },
    skills: ["Critical thinking", "Communication", "Empathy", "Decision making under pressure"],
    careers: ["Physician", "Surgeon", "Psychiatrist", "Medical Researcher"],
    whyFits: [
      "You want to directly help people and save lives",
      "You're fascinated by how the human body works",
      "You can handle high-pressure situations and long training"
    ],
    whatGives: [
      "Deep respect and social status",
      "Job security and high income",
      "Profound sense of purpose"
    ],
    whyNotBoring: "Every patient is different, and you're literally holding lives in your hands.",
    whyNot: [
      "10+ years of demanding education and training",
      "Emotionally draining and long work hours"
    ]
  },
  // 3. Mechanical Engineering
  {
    id: "mechanical-engineering",
    name: "Mechanical Engineering",
    description: "Design and build machines, engines, and mechanical systems. Combines physics with practical problem solving.",
    riasecMatch: ["R", "I", "C"],
    valueMatch: ["Self-Direction", "Achievement"],
    personalityMatch: {
      openness: "high",
      conscientiousness: "high",
      extraversion: "low",
      agreeableness: "medium",
      neuroticism: "low"
    },
    skills: ["CAD design", "Physics application", "Problem solving", "Project management"],
    careers: ["Mechanical Engineer", "Aerospace Engineer", "Automotive Engineer", "Robotics Engineer"],
    whyFits: [
      "You like understanding how things work and building them",
      "You enjoy hands-on problem solving with real-world constraints",
      "You want to see tangible results of your work"
    ],
    whatGives: [
      "Versatile skills applicable across industries",
      "Good salary and job stability",
      "Satisfaction of creating physical products"
    ],
    whyNotBoring: "From rockets to robots to renewable energy—you're building the physical future.",
    whyNot: [
      "Heavy math and physics requirements",
      "Can be repetitive in some corporate environments"
    ]
  },
  // 4. Psychology
  {
    id: "psychology-career",
    name: "Psychology",
    description: "Scientific study of mind and behavior. Understanding why people think, feel, and act the way they do.",
    riasecMatch: ["I", "S", "A"],
    valueMatch: ["Benevolence", "Universalism"],
    personalityMatch: {
      openness: "high",
      conscientiousness: "medium",
      extraversion: "medium",
      agreeableness: "high",
      neuroticism: "medium"
    },
    skills: ["Active listening", "Empathy", "Critical thinking", "Research methods"],
    careers: ["Clinical Psychologist", "Counselor", "UX Researcher", "Organizational Psychologist"],
    whyFits: [
      "You're endlessly curious about what makes people tick",
      "You want to help others improve their mental health",
      "You enjoy both science and human connection"
    ],
    whatGives: [
      "Deep understanding of human nature",
      "Flexible career paths across many industries",
      "Meaningful impact on people's lives"
    ],
    whyNotBoring: "The human mind is the most complex thing in the universe—you'll never run out of mysteries.",
    whyNot: [
      "Requires graduate school for most clinical careers",
      "Can be emotionally taxing"
    ]
  },
  // 5. Business Administration
  {
    id: "business-administration",
    name: "Business Administration",
    description: "Study of managing organizations, operations, and resources. Combines strategy with practical leadership.",
    riasecMatch: ["E", "C", "S"],
    valueMatch: ["Achievement", "Power"],
    personalityMatch: {
      openness: "medium",
      conscientiousness: "high",
      extraversion: "high",
      agreeableness: "medium",
      neuroticism: "low"
    },
    skills: ["Leadership", "Strategic thinking", "Communication", "Financial literacy"],
    careers: ["Business Manager", "Entrepreneur", "Management Consultant", "Operations Manager"],
    whyFits: [
      "You like leading teams and driving results",
      "You want broad knowledge applicable to any industry",
      "You're ambitious about climbing the corporate ladder"
    ],
    whatGives: [
      "Wide range of career options",
      "Strong networking opportunities",
      "Path to executive leadership"
    ],
    whyNotBoring: "You're orchestrating people, money, and strategy to win in competitive markets.",
    whyNot: [
      "Can be generalist without deep expertise",
      "Oversaturated field in some regions"
    ]
  },
  // 6. Architecture
  {
    id: "architecture",
    name: "Architecture",
    description: "Design of buildings and spaces where people live and work. Blends art, engineering, and human psychology.",
    riasecMatch: ["A", "R", "I"],
    valueMatch: ["Self-Direction", "Achievement"],
    personalityMatch: {
      openness: "high",
      conscientiousness: "high",
      extraversion: "medium",
      agreeableness: "medium",
      neuroticism: "medium"
    },
    skills: ["3D visualization", "Technical drawing", "Creative problem solving", "Project management"],
    careers: ["Architect", "Urban Planner", "Interior Designer", "Landscape Architect"],
    whyFits: [
      "You're both creative and analytical",
      "You want to shape the physical environment",
      "You enjoy seeing your designs become reality"
    ],
    whatGives: [
      "Lasting legacy through built work",
      "Blend of art and science",
      "Respected profession with social impact"
    ],
    whyNotBoring: "Your creations will outlive you and shape how people experience space daily.",
    whyNot: [
      "Long education path with licensing requirements",
      "Demanding clients and tight deadlines"
    ]
  },
  // 7. Nursing
  {
    id: "nursing",
    name: "Nursing",
    description: "Direct patient care and health advocacy. Combines medical knowledge with compassionate human interaction.",
    riasecMatch: ["S", "R", "I"],
    valueMatch: ["Benevolence", "Security"],
    personalityMatch: {
      openness: "medium",
      conscientiousness: "high",
      extraversion: "medium",
      agreeableness: "high",
      neuroticism: "low"
    },
    skills: ["Patient care", "Medical procedures", "Communication", "Crisis management"],
    careers: ["Registered Nurse", "Nurse Practitioner", "Nurse Anesthetist", "Clinical Nurse Specialist"],
    whyFits: [
      "You want hands-on work helping people daily",
      "You thrive in fast-paced, dynamic environments",
      "You value job security and flexibility"
    ],
    whatGives: [
      "High demand with excellent job security",
      "Flexible schedules and locations",
      "Direct, meaningful impact on patients"
    ],
    whyNotBoring: "No two shifts are the same, and you're often the person patients trust most.",
    whyNot: [
      "Physically and emotionally demanding",
      "Shift work including nights and weekends"
    ]
  },
  // 8. Electrical Engineering
  {
    id: "electrical-engineering",
    name: "Electrical Engineering",
    description: "Study of electricity, electronics, and electromagnetism. Design circuits, systems, and devices that power modern life.",
    riasecMatch: ["I", "R", "C"],
    valueMatch: ["Self-Direction", "Achievement"],
    personalityMatch: {
      openness: "high",
      conscientiousness: "high",
      extraversion: "low",
      agreeableness: "medium",
      neuroticism: "low"
    },
    skills: ["Circuit design", "Problem solving", "Programming", "Systems thinking"],
    careers: ["Electrical Engineer", "Electronics Engineer", "Power Systems Engineer", "Control Systems Engineer"],
    whyFits: [
      "You're fascinated by how electronics work",
      "You enjoy both theory and practical application",
      "You want to work on cutting-edge technology"
    ],
    whatGives: [
      "High salary and job security",
      "Work on everything from phones to power grids",
      "Foundation for many tech careers"
    ],
    whyNotBoring: "From microchips to renewable energy grids—you're powering the future.",
    whyNot: [
      "Heavy math and abstract concepts",
      "Requires precision and attention to detail"
    ]
  },
  // 9. Marketing
  {
    id: "marketing-career",
    name: "Marketing",
    description: "Understanding consumer behavior and promoting products or services. Combines psychology, creativity, and data analysis.",
    riasecMatch: ["E", "A", "C"],
    valueMatch: ["Achievement", "Stimulation"],
    personalityMatch: {
      openness: "high",
      conscientiousness: "medium",
      extraversion: "high",
      agreeableness: "medium",
      neuroticism: "low"
    },
    skills: ["Communication", "Data analysis", "Creativity", "Strategic thinking"],
    careers: ["Marketing Manager", "Brand Strategist", "Digital Marketer", "Market Researcher"],
    whyFits: [
      "You're creative but also data-driven",
      "You enjoy persuasion and storytelling",
      "You like fast-paced, trendy work"
    ],
    whatGives: [
      "Dynamic career with constant change",
      "Blend of creativity and analytics",
      "See direct impact of your campaigns"
    ],
    whyNotBoring: "You're shaping culture, launching trends, and influencing millions of buying decisions.",
    whyNot: [
      "Can be superficial or manipulative feeling",
      "Pressure to constantly deliver results"
    ]
  },
  // 10. Law
  {
    id: "law-career",
    name: "Law",
    description: "Study and practice of legal systems and advocacy. Combines analytical reasoning with persuasive argumentation.",
    riasecMatch: ["E", "I", "C"],
    valueMatch: ["Power", "Achievement"],
    personalityMatch: {
      openness: "medium",
      conscientiousness: "high",
      extraversion: "high",
      agreeableness: "medium",
      neuroticism: "low"
    },
    skills: ["Analytical thinking", "Persuasion", "Research", "Written communication"],
    careers: ["Lawyer", "Judge", "Legal Consultant", "Corporate Counsel"],
    whyFits: [
      "You love debate and winning arguments",
      "You care about justice and rights",
      "You enjoy complex problem solving"
    ],
    whatGives: [
      "High prestige and earning potential",
      "Intellectual challenge",
      "Ability to influence society"
    ],
    whyNotBoring: "Every case is a puzzle where you're fighting for something that matters.",
    whyNot: [
      "Extremely long hours and high stress",
      "Expensive education with heavy debt"
    ]
  },
  // 11. Graphic Design
  {
    id: "graphic-design",
    name: "Graphic Design",
    description: "Visual communication through typography, imagery, and layout. Combines artistic skill with strategic thinking.",
    riasecMatch: ["A", "E", "R"],
    valueMatch: ["Self-Direction", "Stimulation"],
    personalityMatch: {
      openness: "high",
      conscientiousness: "medium",
      extraversion: "medium",
      agreeableness: "medium",
      neuroticism: "medium"
    },
    skills: ["Adobe Creative Suite", "Visual composition", "Typography", "Brand thinking"],
    careers: ["Graphic Designer", "Art Director", "UI Designer", "Brand Designer"],
    whyFits: [
      "You're visually creative and detail-oriented",
      "You want to see your work in the world",
      "You enjoy solving problems through design"
    ],
    whatGives: [
      "Tangible portfolio of creative work",
      "Freelance flexibility",
      "Influence visual culture"
    ],
    whyNotBoring: "Your designs shape how people see brands, products, and ideas every day.",
    whyNot: [
      "Competitive field with subjective feedback",
      "Tight deadlines and demanding clients"
    ]
  },
  // 12. Chemistry
  {
    id: "chemistry",
    name: "Chemistry",
    description: "Study of matter, its properties, and transformations. Understanding the molecular world and creating new substances.",
    riasecMatch: ["I", "R", "C"],
    valueMatch: ["Self-Direction", "Achievement"],
    personalityMatch: {
      openness: "high",
      conscientiousness: "high",
      extraversion: "low",
      agreeableness: "medium",
      neuroticism: "low"
    },
    skills: ["Laboratory techniques", "Analytical thinking", "Attention to detail", "Problem solving"],
    careers: ["Chemist", "Chemical Engineer", "Pharmaceutical Scientist", "Materials Scientist"],
    whyFits: [
      "You're curious about how substances work at molecular level",
      "You enjoy lab work and experimentation",
      "You want to discover new materials or medicines"
    ],
    whatGives: [
      "Foundation for many scientific careers",
      "Work in cutting-edge research",
      "Contribute to medical and technological advances"
    ],
    whyNotBoring: "From new medicines to sustainable materials—you're literally creating things that never existed.",
    whyNot: [
      "Requires advanced degrees for research positions",
      "Lab work can be repetitive"
    ]
  },
  // 13. Civil Engineering
  {
    id: "civil-engineering",
    name: "Civil Engineering",
    description: "Design and construction of infrastructure like roads, bridges, and buildings. Shaping the physical world we live in.",
    riasecMatch: ["R", "I", "C"],
    valueMatch: ["Achievement", "Security"],
    personalityMatch: {
      openness: "medium",
      conscientiousness: "high",
      extraversion: "medium",
      agreeableness: "medium",
      neuroticism: "low"
    },
    skills: ["Structural analysis", "Project management", "CAD software", "Problem solving"],
    careers: ["Civil Engineer", "Structural Engineer", "Transportation Engineer", "Construction Manager"],
    whyFits: [
      "You want to build infrastructure that serves communities",
      "You enjoy practical, visible results",
      "You like working on large-scale projects"
    ],
    whatGives: [
      "Stable career with consistent demand",
      "See your projects used by thousands",
      "Work outdoors and in offices"
    ],
    whyNotBoring: "Bridges, tunnels, skyscrapers—you're building monuments that last generations.",
    whyNot: [
      "Projects move slowly with lots of regulations",
      "Liability and safety concerns"
    ]
  },
  // 14. Journalism
  {
    id: "journalism",
    name: "Journalism",
    description: "Investigating and reporting news and stories. Informing the public and holding power accountable.",
    riasecMatch: ["I", "A", "E"],
    valueMatch: ["Universalism", "Self-Direction"],
    personalityMatch: {
      openness: "high",
      conscientiousness: "medium",
      extraversion: "high",
      agreeableness: "medium",
      neuroticism: "medium"
    },
    skills: ["Writing", "Investigation", "Interviewing", "Critical thinking"],
    careers: ["Reporter", "Editor", "Investigative Journalist", "Broadcast Journalist"],
    whyFits: [
      "You're curious about everything and love asking questions",
      "You care about truth and transparency",
      "You write well under pressure"
    ],
    whatGives: [
      "Variety and constant learning",
      "Influence public discourse",
      "Meet fascinating people"
    ],
    whyNotBoring: "Every day brings new stories, and you're uncovering truths that matter.",
    whyNot: [
      "Industry instability and low starting pay",
      "Stressful deadlines and irregular hours"
    ]
  },
  // 15. Biology
  {
    id: "biology",
    name: "Biology",
    description: "Study of living organisms and life processes. Understanding everything from cells to ecosystems.",
    riasecMatch: ["I", "R", "S"],
    valueMatch: ["Self-Direction", "Universalism"],
    personalityMatch: {
      openness: "high",
      conscientiousness: "high",
      extraversion: "low",
      agreeableness: "high",
      neuroticism: "low"
    },
    skills: ["Scientific method", "Laboratory skills", "Data analysis", "Critical thinking"],
    careers: ["Biologist", "Research Scientist", "Biotech Specialist", "Environmental Consultant"],
    whyFits: [
      "You're fascinated by living systems",
      "You enjoy both fieldwork and lab research",
      "You want to contribute to medical or environmental advances"
    ],
    whatGives: [
      "Diverse career paths from medicine to conservation",
      "Contribute to solving global challenges",
      "Constant discoveries in the field"
    ],
    whyNotBoring: "Life is endlessly complex—from gene editing to saving species, you're exploring the frontier.",
    whyNot: [
      "Often requires graduate education",
      "Research positions are competitive"
    ]
  },
  // 16. Finance
  {
    id: "finance",
    name: "Finance",
    description: "Managing money, investments, and financial systems. Combines quantitative analysis with strategic decision-making.",
    riasecMatch: ["C", "E", "I"],
    valueMatch: ["Achievement", "Power"],
    personalityMatch: {
      openness: "medium",
      conscientiousness: "high",
      extraversion: "high",
      agreeableness: "low",
      neuroticism: "low"
    },
    skills: ["Financial modeling", "Analytical thinking", "Risk assessment", "Communication"],
    careers: ["Financial Analyst", "Investment Banker", "Portfolio Manager", "CFO"],
    whyFits: [
      "You're good with numbers and strategic thinking",
      "You're motivated by high compensation",
      "You thrive in competitive environments"
    ],
    whatGives: [
      "High earning potential",
      "Fast-paced, dynamic work",
      "Clear performance metrics"
    ],
    whyNotBoring: "Markets move every second, and you're playing a high-stakes game with real money.",
    whyNot: [
      "Extremely long hours especially early career",
      "High stress and intense competition"
    ]
  },
  // 17. Education
  {
    id: "education-career",
    name: "Education / Teaching",
    description: "Facilitating learning and development in students. Shaping minds and inspiring the next generation.",
    riasecMatch: ["S", "A", "C"],
    valueMatch: ["Benevolence", "Security"],
    personalityMatch: {
      openness: "medium",
      conscientiousness: "high",
      extraversion: "high",
      agreeableness: "high",
      neuroticism: "low"
    },
    skills: ["Communication", "Patience", "Creativity", "Classroom management"],
    careers: ["Teacher", "Principal", "Curriculum Developer", "Educational Consultant"],
    whyFits: [
      "You love helping others learn and grow",
      "You're patient and enjoy working with people",
      "You want stable, meaningful work"
    ],
    whatGives: [
      "Direct impact on students' lives",
      "Job security and benefits",
      "Summers off and consistent schedule"
    ],
    whyNotBoring: "You're shaping the future by inspiring curious minds every single day.",
    whyNot: [
      "Lower pay compared to other professions",
      "Dealing with difficult students and parents"
    ]
  },
  // 18. Music
  {
    id: "music",
    name: "Music Performance / Composition",
    description: "Creating, performing, or producing music. Expressing emotion and ideas through sound.",
    riasecMatch: ["A", "E", "S"],
    valueMatch: ["Self-Direction", "Stimulation"],
    personalityMatch: {
      openness: "high",
      conscientiousness: "medium",
      extraversion: "medium",
      agreeableness: "medium",
      neuroticism: "medium"
    },
    skills: ["Musical technique", "Creativity", "Practice discipline", "Performance"],
    careers: ["Musician", "Music Producer", "Composer", "Music Teacher"],
    whyFits: [
      "Music is your passion and form of expression",
      "You're willing to practice relentlessly",
      "You want to create emotional experiences"
    ],
    whatGives: [
      "Doing what you love as a career",
      "Creative freedom",
      "Connecting with audiences emotionally"
    ],
    whyNotBoring: "You're creating art that moves people and potentially reaching millions.",
    whyNot: [
      "Very competitive with unstable income",
      "Requires immense practice and sacrifice"
    ]
  },
  // 19. Data Science
  {
    id: "data-science",
    name: "Data Science",
    description: "Extracting insights from data using statistics, programming, and machine learning. Turning data into decisions.",
    riasecMatch: ["I", "C", "E"],
    valueMatch: ["Achievement", "Self-Direction"],
    personalityMatch: {
      openness: "high",
      conscientiousness: "high",
      extraversion: "low",
      agreeableness: "medium",
      neuroticism: "low"
    },
    skills: ["Programming", "Statistics", "Machine learning", "Data visualization"],
    careers: ["Data Scientist", "Machine Learning Engineer", "Analytics Manager", "AI Researcher"],
    whyFits: [
      "You love finding patterns in complex information",
      "You're comfortable with math and coding",
      "You want to solve problems with data"
    ],
    whatGives: [
      "Extremely high demand and salary",
      "Work across all industries",
      "Shape business decisions with insights"
    ],
    whyNotBoring: "You're the detective who finds billion-dollar insights hidden in the numbers.",
    whyNot: [
      "Requires strong quantitative background",
      "Can involve cleaning messy data constantly"
    ]
  },
  // 20. Environmental Science
  {
    id: "environmental-science",
    name: "Environmental Science",
    description: "Study of environmental problems and sustainable solutions. Protecting ecosystems and addressing climate change.",
    riasecMatch: ["I", "R", "S"],
    valueMatch: ["Universalism", "Self-Direction"],
    personalityMatch: {
      openness: "high",
      conscientiousness: "high",
      extraversion: "medium",
      agreeableness: "high",
      neuroticism: "low"
    },
    skills: ["Research methods", "Data analysis", "Field work", "Systems thinking"],
    careers: ["Environmental Scientist", "Conservation Biologist", "Sustainability Consultant", "Environmental Engineer"],
    whyFits: [
      "You care deeply about the planet's future",
      "You enjoy both fieldwork and research",
      "You want to address pressing global challenges"
    ],
    whatGives: [
      "Work on critical issues like climate change",
      "Outdoor work in natural settings",
      "Growing field with increasing importance"
    ],
    whyNotBoring: "You're literally fighting to save the planet and future generations.",
    whyNot: [
      "Can be underfunded compared to corporate sectors",
      "Slow bureaucratic processes"
    ]
  },
  // 21. Philosophy
  {
    id: "philosophy",
    name: "Philosophy",
    description: "Study of fundamental questions about existence, knowledge, values, and reason. Training in deep analytical thinking.",
    riasecMatch: ["I", "A", "S"],
    valueMatch: ["Self-Direction", "Universalism"],
    personalityMatch: {
      openness: "high",
      conscientiousness: "medium",
      extraversion: "low",
      agreeableness: "medium",
      neuroticism: "medium"
    },
    skills: ["Critical thinking", "Argumentation", "Writing", "Abstract reasoning"],
    careers: ["Professor", "Writer", "Consultant", "Policy Analyst"],
    whyFits: [
      "You love questioning everything and deep thinking",
      "You enjoy reading and rigorous arguments",
      "You want to understand fundamental truths"
    ],
    whatGives: [
      "Exceptional critical thinking skills",
      "Foundation for law, consulting, writing",
      "Intellectual fulfillment"
    ],
    whyNotBoring: "You're grappling with the deepest questions humanity has ever asked.",
    whyNot: [
      "Limited direct career paths",
      "Often requires graduate school"
    ]
  },
  // 22. Physical Therapy
  {
    id: "physical-therapy",
    name: "Physical Therapy",
    description: "Helping people recover from injuries and improve movement. Combines medical knowledge with hands-on care.",
    riasecMatch: ["S", "R", "I"],
    valueMatch: ["Benevolence", "Security"],
    personalityMatch: {
      openness: "medium",
      conscientiousness: "high",
      extraversion: "high",
      agreeableness: "high",
      neuroticism: "low"
    },
    skills: ["Anatomy knowledge", "Manual therapy", "Patient communication", "Exercise prescription"],
    careers: ["Physical Therapist", "Sports Therapist", "Rehabilitation Specialist", "Orthopedic Therapist"],
    whyFits: [
      "You want hands-on work helping people heal",
      "You're interested in human movement and anatomy",
      "You enjoy building relationships with patients"
    ],
    whatGives: [
      "High job satisfaction and demand",
      "Good work-life balance",
      "See tangible patient progress"
    ],
    whyNotBoring: "Every patient is a puzzle, and you're helping them reclaim their mobility and life.",
    whyNot: [
      "Physically demanding work",
      "Requires doctoral degree in most countries"
    ]
  },
  // 23. Aerospace Engineering
  {
    id: "aerospace-engineering",
    name: "Aerospace Engineering",
    description: "Design and development of aircraft and spacecraft. Engineering for flight and space exploration.",
    riasecMatch: ["R", "I", "C"],
    valueMatch: ["Achievement", "Self-Direction"],
    personalityMatch: {
      openness: "high",
      conscientiousness: "high",
      extraversion: "low",
      agreeableness: "medium",
      neuroticism: "low"
    },
    skills: ["Aerodynamics", "CAD design", "Systems engineering", "Physics application"],
    careers: ["Aerospace Engineer", "Flight Systems Engineer", "Spacecraft Designer", "Aviation Consultant"],
    whyFits: [
      "You're fascinated by flight and space",
      "You want to work on cutting-edge technology",
      "You dream big about humanity's future"
    ],
    whatGives: [
      "Work on rockets, planes, and spacecraft",
      "High salary and job prestige",
      "Push technological boundaries"
    ],
    whyNotBoring: "You're literally working on technology that goes to space and breaks the sound barrier.",
    whyNot: [
      "Highly specialized with limited job locations",
      "Requires security clearances for many positions"
    ]
  },
  // 24. Social Work
  {
    id: "social-work",
    name: "Social Work",
    description: "Helping individuals, families, and communities overcome challenges. Advocacy and support for vulnerable populations.",
    riasecMatch: ["S", "E", "A"],
    valueMatch: ["Benevolence", "Universalism"],
    personalityMatch: {
      openness: "medium",
      conscientiousness: "high",
      extraversion: "medium",
      agreeableness: "high",
      neuroticism: "low"
    },
    skills: ["Empathy", "Case management", "Crisis intervention", "Advocacy"],
    careers: ["Social Worker", "Counselor", "Case Manager", "Community Organizer"],
    whyFits: [
      "You're driven to help those in difficult situations",
      "You want to address systemic inequality",
      "You're emotionally resilient and empathetic"
    ],
    whatGives: [
      "Profound sense of purpose",
      "Diverse work settings",
      "Direct impact on vulnerable people"
    ],
    whyNotBoring: "You're changing lives and fighting injustice on the frontlines every day.",
    whyNot: [
      "Emotionally draining with vicarious trauma",
      "Lower pay relative to education required"
    ]
  },
  // 25. Accounting
  {
    id: "accounting-career",
    name: "Accounting",
    description: "Recording, analyzing, and reporting financial information. The language of business.",
    riasecMatch: ["C", "E", "I"],
    valueMatch: ["Security", "Achievement"],
    personalityMatch: {
      openness: "low",
      conscientiousness: "high",
      extraversion: "low",
      agreeableness: "medium",
      neuroticism: "low"
    },
    skills: ["Attention to detail", "Financial analysis", "Tax knowledge", "Excel proficiency"],
    careers: ["Accountant", "Auditor", "Tax Consultant", "Financial Controller"],
    whyFits: [
      "You like order, accuracy, and clear rules",
      "You're good with numbers and details",
      "You want stable, predictable work"
    ],
    whatGives: [
      "Excellent job security",
      "Clear career progression",
      "Work in every industry"
    ],
    whyNotBoring: "You're the detective finding financial truth and keeping businesses honest.",
    whyNot: [
      "Can be repetitive and routine",
      "Stressful during tax season"
    ]
  },
  // 26. Culinary Arts
  {
    id: "culinary-arts",
    name: "Culinary Arts",
    description: "The art and science of cooking and food preparation. Creating delicious experiences for others.",
    riasecMatch: ["R", "A", "E"],
    valueMatch: ["Stimulation", "Self-Direction"],
    personalityMatch: {
      openness: "high",
      conscientiousness: "high",
      extraversion: "medium",
      agreeableness: "medium",
      neuroticism: "medium"
    },
    skills: ["Cooking techniques", "Creativity", "Time management", "Pressure handling"],
    careers: ["Chef", "Pastry Chef", "Restaurant Owner", "Food Stylist"],
    whyFits: [
      "You're passionate about food and creativity",
      "You thrive in fast-paced environments",
      "You want to create experiences that bring people joy"
    ],
    whatGives: [
      "Creative expression through food",
      "Immediate feedback and satisfaction",
      "Path to entrepreneurship"
    ],
    whyNotBoring: "Every dish is a canvas, and you're creating art people literally devour.",
    whyNot: [
      "Long hours on your feet",
      "High-stress kitchen environments"
    ]
  },
  // 27. Veterinary Medicine
  {
    id: "veterinary-medicine",
    name: "Veterinary Medicine",
    description: "Medical care for animals. Combining love of animals with medical science.",
    riasecMatch: ["I", "R", "S"],
    valueMatch: ["Benevolence", "Self-Direction"],
    personalityMatch: {
      openness: "high",
      conscientiousness: "high",
      extraversion: "medium",
      agreeableness: "high",
      neuroticism: "low"
    },
    skills: ["Animal handling", "Medical diagnosis", "Surgery", "Client communication"],
    careers: ["Veterinarian", "Veterinary Surgeon", "Animal Researcher", "Zoo Veterinarian"],
    whyFits: [
      "You love animals and want to help them",
      "You're fascinated by animal biology",
      "You want meaningful, varied work"
    ],
    whatGives: [
      "Work with animals daily",
      "Respected profession with good income",
      "Variety from pets to wildlife"
    ],
    whyNotBoring: "From puppies to exotic animals—every patient is different and can't tell you what hurts.",
    whyNot: [
      "Emotionally difficult with euthanasia",
      "Long education and competitive entry"
    ]
  },
  // 28. International Relations
  {
    id: "international-relations-career",
    name: "International Relations",
    description: "Study of global politics, diplomacy, and international affairs. Understanding how nations interact.",
    riasecMatch: ["E", "I", "S"],
    valueMatch: ["Universalism", "Self-Direction"],
    personalityMatch: {
      openness: "high",
      conscientiousness: "medium",
      extraversion: "high",
      agreeableness: "high",
      neuroticism: "low"
    },
    skills: ["Diplomacy", "Cultural intelligence", "Research", "Negotiation"],
    careers: ["Diplomat", "Foreign Service Officer", "International Analyst", "NGO Director"],
    whyFits: [
      "You're fascinated by global affairs",
      "You want to work across cultures",
      "You care about international cooperation"
    ],
    whatGives: [
      "Travel and international exposure",
      "Work on global issues",
      "Prestigious career paths"
    ],
    whyNotBoring: "You're navigating geopolitics and shaping how nations work together.",
    whyNot: [
      "Can be bureaucratic and slow-moving",
      "Often requires relocation and travel"
    ]
  },
  // 29. Anthropology
  {
    id: "anthropology",
    name: "Anthropology",
    description: "Study of human societies, cultures, and their development. Understanding what makes us human.",
    riasecMatch: ["I", "S", "A"],
    valueMatch: ["Universalism", "Self-Direction"],
    personalityMatch: {
      openness: "high",
      conscientiousness: "medium",
      extraversion: "medium",
      agreeableness: "high",
      neuroticism: "low"
    },
    skills: ["Ethnographic research", "Cultural analysis", "Writing", "Observation"],
    careers: ["Anthropologist", "Museum Curator", "Cultural Consultant", "UX Researcher"],
    whyFits: [
      "You're endlessly curious about different cultures",
      "You enjoy fieldwork and immersive research",
      "You want to understand humanity deeply"
    ],
    whatGives: [
      "Deep cultural understanding",
      "Unique perspective applicable to many fields",
      "Fieldwork in fascinating places"
    ],
    whyNotBoring: "You're exploring what makes human societies tick across time and space.",
    whyNot: [
      "Limited traditional job market",
      "Academic path often required"
    ]
  },
  // 30. Pharmacy
  {
    id: "pharmacy",
    name: "Pharmacy",
    description: "Science of medications and their effects. Ensuring safe and effective drug therapy.",
    riasecMatch: ["I", "C", "S"],
    valueMatch: ["Benevolence", "Security"],
    personalityMatch: {
      openness: "medium",
      conscientiousness: "high",
      extraversion: "medium",
      agreeableness: "high",
      neuroticism: "low"
    },
    skills: ["Pharmacology", "Patient counseling", "Attention to detail", "Healthcare knowledge"],
    careers: ["Pharmacist", "Clinical Pharmacist", "Pharmaceutical Scientist", "Pharmacy Manager"],
    whyFits: [
      "You're interested in medicine without direct patient care",
      "You like precision and detailed work",
      "You want stable, well-paying healthcare work"
    ],
    whatGives: [
      "Excellent salary and job security",
      "Work-life balance in retail settings",
      "Help patients understand medications"
    ],
    whyNotBoring: "You're the medication expert preventing dangerous interactions and optimizing treatments.",
    whyNot: [
      "Can be repetitive in retail settings",
      "Standing for long hours"
    ]
  },
  // 31. Film & Television Production
  {
    id: "film-production",
    name: "Film & Television Production",
    description: "Creating visual stories for screens. Combining artistic vision with technical expertise.",
    riasecMatch: ["A", "E", "R"],
    valueMatch: ["Stimulation", "Self-Direction"],
    personalityMatch: {
      openness: "high",
      conscientiousness: "medium",
      extraversion: "high",
      agreeableness: "medium",
      neuroticism: "medium"
    },
    skills: ["Visual storytelling", "Team coordination", "Technical equipment", "Creative vision"],
    careers: ["Film Director", "Producer", "Cinematographer", "Editor"],
    whyFits: [
      "You're a visual storyteller with big ideas",
      "You enjoy collaborative creative work",
      "You want to influence culture through media"
    ],
    whatGives: [
      "Create content seen by millions",
      "Collaborative creative environment",
      "Variety of projects and challenges"
    ],
    whyNotBoring: "You're crafting the stories that shape how people see the world.",
    whyNot: [
      "Extremely competitive industry",
      "Irregular hours and project-based work"
    ]
  },
  // 32. Political Science
  {
    id: "political-science",
    name: "Political Science",
    description: "Study of government, political behavior, and power. Understanding how societies govern themselves.",
    riasecMatch: ["I", "E", "S"],
    valueMatch: ["Self-Direction", "Universalism"],
    personalityMatch: {
      openness: "high",
      conscientiousness: "medium",
      extraversion: "high",
      agreeableness: "medium",
      neuroticism: "low"
    },
    skills: ["Research", "Analysis", "Writing", "Debate"],
    careers: ["Political Analyst", "Campaign Manager", "Lobbyist", "Government Affairs"],
    whyFits: [
      "You're fascinated by power and governance",
      "You enjoy debate and political strategy",
      "You want to understand or influence politics"
    ],
    whatGives: [
      "Deep understanding of political systems",
      "Pathways to policy and government",
      "Critical analysis skills"
    ],
    whyNotBoring: "You're studying how power works and how societies make collective decisions.",
    whyNot: [
      "Can feel abstract without applied work",
      "Political environments can be polarizing"
    ]
  },
  // 33. Sports Management
  {
    id: "sports-management",
    name: "Sports Management",
    description: "Business side of athletics. Managing teams, events, and sports organizations.",
    riasecMatch: ["E", "S", "C"],
    valueMatch: ["Achievement", "Stimulation"],
    personalityMatch: {
      openness: "medium",
      conscientiousness: "high",
      extraversion: "high",
      agreeableness: "medium",
      neuroticism: "low"
    },
    skills: ["Event management", "Marketing", "Negotiation", "Leadership"],
    careers: ["Sports Agent", "Athletic Director", "Event Manager", "Team Manager"],
    whyFits: [
      "You love sports and want a career around them",
      "You're business-minded and competitive",
      "You enjoy fast-paced, exciting environments"
    ],
    whatGives: [
      "Work in an industry you're passionate about",
      "High-energy, exciting career",
      "Network with athletes and executives"
    ],
    whyNotBoring: "You're in the action of professional sports, making deals and running events.",
    whyNot: [
      "Highly competitive field",
      "Long hours during seasons and events"
    ]
  },
  // 34. Information Technology
  {
    id: "information-technology",
    name: "Information Technology",
    description: "Managing computer systems and networks. Keeping organizations running technologically.",
    riasecMatch: ["R", "I", "C"],
    valueMatch: ["Security", "Achievement"],
    personalityMatch: {
      openness: "medium",
      conscientiousness: "high",
      extraversion: "low",
      agreeableness: "medium",
      neuroticism: "low"
    },
    skills: ["System administration", "Troubleshooting", "Network management", "Security"],
    careers: ["IT Manager", "Network Administrator", "Systems Analyst", "IT Consultant"],
    whyFits: [
      "You enjoy solving technical problems",
      "You like being the go-to tech expert",
      "You want stable, in-demand work"
    ],
    whatGives: [
      "Strong job security",
      "Clear career progression",
      "Work in any industry"
    ],
    whyNotBoring: "You're the person everyone depends on when technology breaks—and it always does.",
    whyNot: [
      "Can be reactive and stressful",
      "Constant need to update skills"
    ]
  },
  // 35. Public Health
  {
    id: "public-health",
    name: "Public Health",
    description: "Protecting and improving community health. Prevention and population-level healthcare.",
    riasecMatch: ["I", "S", "E"],
    valueMatch: ["Universalism", "Benevolence"],
    personalityMatch: {
      openness: "high",
      conscientiousness: "high",
      extraversion: "medium",
      agreeableness: "high",
      neuroticism: "low"
    },
    skills: ["Epidemiology", "Data analysis", "Program management", "Communication"],
    careers: ["Epidemiologist", "Health Educator", "Policy Analyst", "Program Director"],
    whyFits: [
      "You want to help communities, not just individuals",
      "You're interested in prevention over treatment",
      "You care about health equity"
    ],
    whatGives: [
      "Impact on population health",
      "Variety of career paths",
      "Meaningful work on major issues"
    ],
    whyNotBoring: "You're fighting epidemics, improving health systems, and saving millions of lives.",
    whyNot: [
      "Can feel bureaucratic",
      "Results take time to see"
    ]
  },
  // 36. Economics (Career)
  {
    id: "economics-career",
    name: "Economics",
    description: "Analysis of markets, policy, and economic systems. Using data to understand and predict behavior.",
    riasecMatch: ["I", "E", "C"],
    valueMatch: ["Achievement", "Self-Direction"],
    personalityMatch: {
      openness: "high",
      conscientiousness: "high",
      extraversion: "medium",
      agreeableness: "medium",
      neuroticism: "low"
    },
    skills: ["Quantitative analysis", "Economic modeling", "Research", "Policy analysis"],
    careers: ["Economist", "Policy Advisor", "Research Analyst", "Economic Consultant"],
    whyFits: [
      "You love analyzing systems and incentives",
      "You enjoy both theory and application",
      "You want to influence major decisions"
    ],
    whatGives: [
      "High-demand analytical skills",
      "Influence on policy and business",
      "Versatile career options"
    ],
    whyNotBoring: "You're understanding the forces that shape markets, nations, and daily life.",
    whyNot: [
      "Heavy math and statistics",
      "Can feel abstract"
    ]
  },
  // 37. Urban Planning
  {
    id: "urban-planning",
    name: "Urban Planning",
    description: "Designing cities and communities. Creating spaces where people live, work, and play.",
    riasecMatch: ["I", "A", "S"],
    valueMatch: ["Universalism", "Self-Direction"],
    personalityMatch: {
      openness: "high",
      conscientiousness: "high",
      extraversion: "medium",
      agreeableness: "high",
      neuroticism: "low"
    },
    skills: ["Spatial analysis", "Community engagement", "Policy knowledge", "Design thinking"],
    careers: ["Urban Planner", "Transportation Planner", "Community Developer", "Policy Analyst"],
    whyFits: [
      "You want to shape how communities develop",
      "You care about sustainable, equitable cities",
      "You enjoy both big-picture and detail work"
    ],
    whatGives: [
      "Lasting impact on communities",
      "Blend of creative and analytical work",
      "Address real societal challenges"
    ],
    whyNotBoring: "You're literally designing the future of cities and how millions of people live.",
    whyNot: [
      "Bureaucratic approval processes",
      "Projects take years to complete"
    ]
  },
  // 38. Human Resources
  {
    id: "human-resources",
    name: "Human Resources",
    description: "Managing people and organizational culture. Building teams and supporting employee growth.",
    riasecMatch: ["S", "E", "C"],
    valueMatch: ["Benevolence", "Security"],
    personalityMatch: {
      openness: "medium",
      conscientiousness: "high",
      extraversion: "high",
      agreeableness: "high",
      neuroticism: "low"
    },
    skills: ["People management", "Conflict resolution", "Recruiting", "Policy development"],
    careers: ["HR Manager", "Talent Acquisition", "HR Director", "Organizational Development"],
    whyFits: [
      "You enjoy working with people",
      "You want to build positive workplace culture",
      "You're good at navigating relationships"
    ],
    whatGives: [
      "Central role in organizations",
      "Help people succeed in their careers",
      "Stable, growing field"
    ],
    whyNotBoring: "You're shaping company culture and helping people find their best work fit.",
    whyNot: [
      "Can be caught between management and employees",
      "Dealing with difficult personnel issues"
    ]
  },
  // 39. Dentistry
  {
    id: "dentistry",
    name: "Dentistry",
    description: "Oral health care and dental medicine. Combining precision work with patient care.",
    riasecMatch: ["I", "R", "S"],
    valueMatch: ["Achievement", "Benevolence"],
    personalityMatch: {
      openness: "medium",
      conscientiousness: "high",
      extraversion: "medium",
      agreeableness: "high",
      neuroticism: "low"
    },
    skills: ["Manual dexterity", "Patient care", "Precision work", "Communication"],
    careers: ["Dentist", "Oral Surgeon", "Orthodontist", "Pediatric Dentist"],
    whyFits: [
      "You enjoy detailed, hands-on work",
      "You want patient interaction with clear outcomes",
      "You value work-life balance with high income"
    ],
    whatGives: [
      "Excellent income and autonomy",
      "Flexible practice ownership",
      "Direct patient relationships"
    ],
    whyNotBoring: "You're giving people confidence through healthy, beautiful smiles.",
    whyNot: [
      "Expensive education with debt",
      "Repetitive procedures"
    ]
  },
  // 40. Actuarial Science
  {
    id: "actuarial-science",
    name: "Actuarial Science",
    description: "Using math and statistics to assess risk. The math behind insurance and finance.",
    riasecMatch: ["C", "I", "E"],
    valueMatch: ["Security", "Achievement"],
    personalityMatch: {
      openness: "medium",
      conscientiousness: "high",
      extraversion: "low",
      agreeableness: "medium",
      neuroticism: "low"
    },
    skills: ["Statistical analysis", "Risk modeling", "Problem solving", "Business acumen"],
    careers: ["Actuary", "Risk Analyst", "Insurance Analyst", "Pension Consultant"],
    whyFits: [
      "You excel at math and probability",
      "You enjoy solving complex problems with data",
      "You want high pay with work-life balance"
    ],
    whatGives: [
      "Top-tier salary and job security",
      "Intellectual challenges",
      "Work-life balance"
    ],
    whyNotBoring: "You're predicting the future and helping companies prepare for uncertainty.",
    whyNot: [
      "Intense exams over several years",
      "Can be highly specialized"
    ]
  },
  // 41. Biomedical Engineering
  {
    id: "biomedical-engineering",
    name: "Biomedical Engineering",
    description: "Engineering principles applied to healthcare. Creating medical devices and solutions.",
    riasecMatch: ["I", "R", "S"],
    valueMatch: ["Achievement", "Benevolence"],
    personalityMatch: {
      openness: "high",
      conscientiousness: "high",
      extraversion: "low",
      agreeableness: "medium",
      neuroticism: "low"
    },
    skills: ["Engineering design", "Biology knowledge", "Problem solving", "Research"],
    careers: ["Biomedical Engineer", "Medical Device Designer", "Clinical Engineer", "Research Scientist"],
    whyFits: [
      "You want engineering with direct human impact",
      "You're fascinated by the intersection of tech and medicine",
      "You want to create life-saving devices"
    ],
    whatGives: [
      "Cutting-edge, meaningful work",
      "High demand and good salary",
      "Create devices that save lives"
    ],
    whyNotBoring: "You're designing artificial organs, prosthetics, and breakthrough medical technology.",
    whyNot: [
      "Highly specialized field",
      "Regulatory challenges"
    ]
  },
  // 42. Theater & Drama
  {
    id: "theater-drama",
    name: "Theater & Drama",
    description: "Performing arts and theatrical production. Bringing stories to life on stage.",
    riasecMatch: ["A", "S", "E"],
    valueMatch: ["Stimulation", "Self-Direction"],
    personalityMatch: {
      openness: "high",
      conscientiousness: "medium",
      extraversion: "high",
      agreeableness: "medium",
      neuroticism: "medium"
    },
    skills: ["Acting", "Voice and movement", "Emotional intelligence", "Collaboration"],
    careers: ["Actor", "Director", "Theater Producer", "Drama Teacher"],
    whyFits: [
      "You love performing and expressing emotions",
      "You want to move audiences",
      "You thrive on creative collaboration"
    ],
    whatGives: [
      "Express your creativity fully",
      "Connect with audiences emotionally",
      "Collaborative artistic community"
    ],
    whyNotBoring: "You're bringing human stories to life and making audiences laugh, cry, and think.",
    whyNot: [
      "Extremely competitive with low pay",
      "Unstable career path"
    ]
  },
  // 43. Supply Chain Management
  {
    id: "supply-chain",
    name: "Supply Chain Management",
    description: "Managing the flow of goods and services. Optimizing how products get from creation to consumption.",
    riasecMatch: ["C", "E", "R"],
    valueMatch: ["Achievement", "Security"],
    personalityMatch: {
      openness: "medium",
      conscientiousness: "high",
      extraversion: "medium",
      agreeableness: "medium",
      neuroticism: "low"
    },
    skills: ["Logistics", "Data analysis", "Negotiation", "Problem solving"],
    careers: ["Supply Chain Manager", "Logistics Coordinator", "Operations Manager", "Procurement Specialist"],
    whyFits: [
      "You like optimizing complex systems",
      "You enjoy solving practical problems",
      "You want to see direct impact on efficiency"
    ],
    whatGives: [
      "High demand across industries",
      "Strategic business impact",
      "Clear career progression"
    ],
    whyNotBoring: "You're the invisible hand making sure products get anywhere in the world on time.",
    whyNot: [
      "Can be stressful during disruptions",
      "Pressure to cut costs constantly"
    ]
  },
  // 44. Criminology
  {
    id: "criminology",
    name: "Criminology",
    description: "Study of crime, criminal behavior, and justice systems. Understanding why people break laws.",
    riasecMatch: ["I", "S", "E"],
    valueMatch: ["Universalism", "Security"],
    personalityMatch: {
      openness: "high",
      conscientiousness: "medium",
      extraversion: "medium",
      agreeableness: "medium",
      neuroticism: "low"
    },
    skills: ["Research", "Analysis", "Understanding behavior", "Communication"],
    careers: ["Criminal Justice Professional", "FBI Agent", "Policy Analyst", "Probation Officer"],
    whyFits: [
      "You're fascinated by crime and human behavior",
      "You want to understand and prevent criminal behavior",
      "You care about justice and reform"
    ],
    whatGives: [
      "Understand criminal behavior",
      "Work in justice system",
      "Contribute to safer communities"
    ],
    whyNotBoring: "You're unraveling why people commit crimes and how to prevent them.",
    whyNot: [
      "Exposure to disturbing content",
      "Can be emotionally challenging"
    ]
  },
  // 45. Fashion Design
  {
    id: "fashion-design",
    name: "Fashion Design",
    description: "Creating clothing and accessories. Combining artistic vision with technical skill.",
    riasecMatch: ["A", "R", "E"],
    valueMatch: ["Stimulation", "Self-Direction"],
    personalityMatch: {
      openness: "high",
      conscientiousness: "medium",
      extraversion: "high",
      agreeableness: "medium",
      neuroticism: "medium"
    },
    skills: ["Design", "Sewing", "Trend forecasting", "Visual creativity"],
    careers: ["Fashion Designer", "Stylist", "Textile Designer", "Costume Designer"],
    whyFits: [
      "You're obsessed with aesthetics and self-expression",
      "You want to define what people wear",
      "You love the intersection of art and commerce"
    ],
    whatGives: [
      "Creative expression through wearable art",
      "Influence culture and trends",
      "Potential for personal brand"
    ],
    whyNotBoring: "You're creating the clothes that define how people express themselves.",
    whyNot: [
      "Extremely competitive industry",
      "Fast-paced with tight deadlines"
    ]
  },
  // 46. Geology
  {
    id: "geology",
    name: "Geology",
    description: "Study of Earth's physical structure and processes. Understanding our planet's history and resources.",
    riasecMatch: ["I", "R", "C"],
    valueMatch: ["Self-Direction", "Universalism"],
    personalityMatch: {
      openness: "high",
      conscientiousness: "high",
      extraversion: "low",
      agreeableness: "medium",
      neuroticism: "low"
    },
    skills: ["Fieldwork", "Analysis", "Mapping", "Research"],
    careers: ["Geologist", "Environmental Consultant", "Mining Engineer", "Seismologist"],
    whyFits: [
      "You're fascinated by Earth's processes",
      "You enjoy outdoor fieldwork",
      "You want to understand our planet's history"
    ],
    whatGives: [
      "Outdoor work in beautiful locations",
      "Contribute to energy and resources",
      "Understand Earth's deep history"
    ],
    whyNotBoring: "You're reading millions of years of Earth history written in rocks.",
    whyNot: [
      "Remote fieldwork locations",
      "Tied to resource industries"
    ]
  },
  // 47. Occupational Therapy
  {
    id: "occupational-therapy",
    name: "Occupational Therapy",
    description: "Helping people perform daily activities after injury or disability. Rehabilitation through meaningful activities.",
    riasecMatch: ["S", "I", "A"],
    valueMatch: ["Benevolence", "Security"],
    personalityMatch: {
      openness: "high",
      conscientiousness: "high",
      extraversion: "high",
      agreeableness: "high",
      neuroticism: "low"
    },
    skills: ["Patient assessment", "Creative problem solving", "Empathy", "Rehabilitation techniques"],
    careers: ["Occupational Therapist", "Rehabilitation Specialist", "Pediatric OT", "Hand Therapist"],
    whyFits: [
      "You want to help people regain independence",
      "You enjoy creative problem-solving for individuals",
      "You value meaningful, patient-centered work"
    ],
    whatGives: [
      "High job satisfaction",
      "Growing demand and good pay",
      "See real patient progress"
    ],
    whyNotBoring: "You're helping people do the things that give their lives meaning.",
    whyNot: [
      "Emotionally demanding",
      "Graduate education required"
    ]
  },
  // 48. Real Estate
  {
    id: "real-estate",
    name: "Real Estate",
    description: "Buying, selling, and managing property. Combining sales with investment knowledge.",
    riasecMatch: ["E", "C", "S"],
    valueMatch: ["Achievement", "Self-Direction"],
    personalityMatch: {
      openness: "medium",
      conscientiousness: "high",
      extraversion: "high",
      agreeableness: "medium",
      neuroticism: "low"
    },
    skills: ["Negotiation", "Sales", "Market analysis", "Networking"],
    careers: ["Real Estate Agent", "Property Developer", "Real Estate Investor", "Property Manager"],
    whyFits: [
      "You're entrepreneurial and people-oriented",
      "You want to help people find homes",
      "You're motivated by commission-based income"
    ],
    whatGives: [
      "Unlimited earning potential",
      "Flexible schedule",
      "Entrepreneurial path"
    ],
    whyNotBoring: "You're matching people with their dream homes and making deals happen.",
    whyNot: [
      "Inconsistent income",
      "Market-dependent success"
    ]
  },
  // 49. Cybersecurity
  {
    id: "cybersecurity",
    name: "Cybersecurity",
    description: "Protecting systems and data from cyber threats. The digital security experts.",
    riasecMatch: ["I", "R", "C"],
    valueMatch: ["Security", "Achievement"],
    personalityMatch: {
      openness: "high",
      conscientiousness: "high",
      extraversion: "low",
      agreeableness: "medium",
      neuroticism: "low"
    },
    skills: ["Security analysis", "Ethical hacking", "Problem solving", "System knowledge"],
    careers: ["Security Analyst", "Penetration Tester", "CISO", "Cybersecurity Consultant"],
    whyFits: [
      "You love solving puzzles and finding vulnerabilities",
      "You want to be on the front lines of digital defense",
      "You enjoy constant learning in a changing field"
    ],
    whatGives: [
      "Extremely high demand and salary",
      "Constant intellectual challenge",
      "Protect organizations from real threats"
    ],
    whyNotBoring: "You're essentially a digital detective hunting hackers and protecting secrets.",
    whyNot: [
      "High-stress during incidents",
      "Constantly evolving threats"
    ]
  },
  // 50. Linguistics
  {
    id: "linguistics",
    name: "Linguistics",
    description: "Scientific study of language and its structure. Understanding how humans communicate.",
    riasecMatch: ["I", "A", "S"],
    valueMatch: ["Self-Direction", "Universalism"],
    personalityMatch: {
      openness: "high",
      conscientiousness: "medium",
      extraversion: "medium",
      agreeableness: "medium",
      neuroticism: "low"
    },
    skills: ["Language analysis", "Research", "Pattern recognition", "Critical thinking"],
    careers: ["Linguist", "Translator", "Speech Therapist", "NLP Researcher"],
    whyFits: [
      "You're fascinated by how language works",
      "You enjoy analyzing patterns and structures",
      "You want to understand human communication"
    ],
    whatGives: [
      "Deep understanding of communication",
      "Skills for tech (NLP) and therapy",
      "Appreciation for linguistic diversity"
    ],
    whyNotBoring: "You're decoding the most complex system humans ever created—language itself.",
    whyNot: [
      "Limited traditional job market",
      "Often requires graduate study"
    ]
  },
  // 51. Hospitality Management
  {
    id: "hospitality-management",
    name: "Hospitality Management",
    description: "Managing hotels, restaurants, and tourism. Creating exceptional guest experiences.",
    riasecMatch: ["E", "S", "C"],
    valueMatch: ["Stimulation", "Achievement"],
    personalityMatch: {
      openness: "medium",
      conscientiousness: "high",
      extraversion: "high",
      agreeableness: "high",
      neuroticism: "low"
    },
    skills: ["Customer service", "Operations management", "Problem solving", "Team leadership"],
    careers: ["Hotel Manager", "Restaurant Manager", "Event Planner", "Tourism Director"],
    whyFits: [
      "You love creating memorable experiences",
      "You thrive in people-oriented environments",
      "You enjoy fast-paced, varied work"
    ],
    whatGives: [
      "Work in exciting locations",
      "Create experiences for others",
      "Clear path to management"
    ],
    whyNotBoring: "You're creating the experiences people remember from their vacations and celebrations.",
    whyNot: [
      "Long hours including weekends",
      "Demanding customer expectations"
    ]
  },
  // 52. Nuclear Engineering
  {
    id: "nuclear-engineering",
    name: "Nuclear Engineering",
    description: "Harnessing nuclear energy for power and medicine. Working with atomic-level technology.",
    riasecMatch: ["I", "R", "C"],
    valueMatch: ["Achievement", "Self-Direction"],
    personalityMatch: {
      openness: "high",
      conscientiousness: "high",
      extraversion: "low",
      agreeableness: "medium",
      neuroticism: "low"
    },
    skills: ["Nuclear physics", "Safety protocols", "Systems engineering", "Problem solving"],
    careers: ["Nuclear Engineer", "Reactor Operator", "Radiation Scientist", "Nuclear Safety Specialist"],
    whyFits: [
      "You're fascinated by nuclear physics",
      "You want to work on clean energy solutions",
      "You handle responsibility and safety seriously"
    ],
    whatGives: [
      "Work on important energy challenges",
      "High salary and specialized expertise",
      "Contribute to clean energy"
    ],
    whyNotBoring: "You're harnessing the power of atoms to generate clean energy.",
    whyNot: [
      "Public perception challenges",
      "Heavy safety regulations"
    ]
  },
  // 53. Sports Medicine
  {
    id: "sports-medicine",
    name: "Sports Medicine",
    description: "Medical care for athletes. Preventing and treating sports-related injuries.",
    riasecMatch: ["S", "I", "R"],
    valueMatch: ["Benevolence", "Achievement"],
    personalityMatch: {
      openness: "medium",
      conscientiousness: "high",
      extraversion: "high",
      agreeableness: "high",
      neuroticism: "low"
    },
    skills: ["Medical knowledge", "Athletic training", "Rehabilitation", "Communication"],
    careers: ["Sports Medicine Physician", "Athletic Trainer", "Physical Therapist", "Team Doctor"],
    whyFits: [
      "You love sports and want to help athletes",
      "You enjoy the challenge of performance optimization",
      "You want hands-on medical work"
    ],
    whatGives: [
      "Work with athletes at all levels",
      "Combine medicine with sports passion",
      "Dynamic, active work environment"
    ],
    whyNotBoring: "You're keeping athletes in peak condition and helping them comeback from injuries.",
    whyNot: [
      "Long hours during seasons",
      "Travel required for teams"
    ]
  },
  // 54. Statistics
  {
    id: "statistics",
    name: "Statistics",
    description: "Science of collecting, analyzing, and interpreting data. The foundation of evidence-based decisions.",
    riasecMatch: ["I", "C", "R"],
    valueMatch: ["Achievement", "Self-Direction"],
    personalityMatch: {
      openness: "high",
      conscientiousness: "high",
      extraversion: "low",
      agreeableness: "medium",
      neuroticism: "low"
    },
    skills: ["Statistical analysis", "Programming", "Data visualization", "Critical thinking"],
    careers: ["Statistician", "Biostatistician", "Data Analyst", "Research Scientist"],
    whyFits: [
      "You love finding patterns in numbers",
      "You want to inform decisions with data",
      "You enjoy mathematical rigor"
    ],
    whatGives: [
      "High demand across all industries",
      "Foundation for data science",
      "Influence decisions with evidence"
    ],
    whyNotBoring: "You're finding the truth hidden in data and helping people make better decisions.",
    whyNot: [
      "Can be abstract and theoretical",
      "Requires strong math background"
    ]
  },
  // 55. Creative Writing
  {
    id: "creative-writing",
    name: "Creative Writing",
    description: "Crafting stories, poetry, and creative content. Expressing ideas through written word.",
    riasecMatch: ["A", "I", "S"],
    valueMatch: ["Self-Direction", "Stimulation"],
    personalityMatch: {
      openness: "high",
      conscientiousness: "medium",
      extraversion: "low",
      agreeableness: "medium",
      neuroticism: "medium"
    },
    skills: ["Writing", "Storytelling", "Imagination", "Self-discipline"],
    careers: ["Author", "Screenwriter", "Copywriter", "Content Writer"],
    whyFits: [
      "You have stories you need to tell",
      "You love the craft of writing",
      "You want creative independence"
    ],
    whatGives: [
      "Express your creative vision",
      "Skills applicable to many fields",
      "Potential for lasting impact"
    ],
    whyNotBoring: "You're creating worlds and characters that live in readers' minds.",
    whyNot: [
      "Difficult to make steady income",
      "Isolation and self-motivation required"
    ]
  },
  // 56. Optometry
  {
    id: "optometry",
    name: "Optometry",
    description: "Eye care and vision correction. Helping people see clearly.",
    riasecMatch: ["I", "S", "C"],
    valueMatch: ["Benevolence", "Security"],
    personalityMatch: {
      openness: "medium",
      conscientiousness: "high",
      extraversion: "medium",
      agreeableness: "high",
      neuroticism: "low"
    },
    skills: ["Eye examination", "Patient care", "Diagnostic equipment", "Communication"],
    careers: ["Optometrist", "Vision Scientist", "Contact Lens Specialist", "Practice Owner"],
    whyFits: [
      "You want healthcare with work-life balance",
      "You enjoy patient interaction",
      "You're interested in vision science"
    ],
    whatGives: [
      "Good income with reasonable hours",
      "Help people see the world clearly",
      "Path to practice ownership"
    ],
    whyNotBoring: "You're giving people the gift of clear vision and catching eye diseases early.",
    whyNot: [
      "Expensive education",
      "Can be routine in some practices"
    ]
  },
  // 57. Construction Management
  {
    id: "construction-management",
    name: "Construction Management",
    description: "Overseeing construction projects from start to finish. Building the physical world.",
    riasecMatch: ["R", "E", "C"],
    valueMatch: ["Achievement", "Security"],
    personalityMatch: {
      openness: "medium",
      conscientiousness: "high",
      extraversion: "high",
      agreeableness: "medium",
      neuroticism: "low"
    },
    skills: ["Project management", "Budgeting", "Team coordination", "Problem solving"],
    careers: ["Construction Manager", "Project Manager", "Site Supervisor", "General Contractor"],
    whyFits: [
      "You want to see tangible results from your work",
      "You enjoy coordinating complex projects",
      "You like being hands-on and outdoors"
    ],
    whatGives: [
      "Build structures that last",
      "High demand and good salary",
      "Variety of projects"
    ],
    whyNotBoring: "You're building the structures where people live, work, and create memories.",
    whyNot: [
      "Stressful deadlines and budgets",
      "Outdoor work in all conditions"
    ]
  },
  // 58. Neuroscience
  {
    id: "neuroscience",
    name: "Neuroscience",
    description: "Study of the brain and nervous system. Understanding the most complex organ.",
    riasecMatch: ["I", "R", "A"],
    valueMatch: ["Self-Direction", "Achievement"],
    personalityMatch: {
      openness: "high",
      conscientiousness: "high",
      extraversion: "low",
      agreeableness: "medium",
      neuroticism: "low"
    },
    skills: ["Research methods", "Lab techniques", "Data analysis", "Scientific writing"],
    careers: ["Neuroscientist", "Research Scientist", "Neurotech Developer", "Clinical Researcher"],
    whyFits: [
      "You're fascinated by how the brain works",
      "You want to solve medical mysteries",
      "You enjoy cutting-edge research"
    ],
    whatGives: [
      "Work on humanity's greatest mystery",
      "Contribute to treating brain disorders",
      "Cutting-edge research opportunities"
    ],
    whyNotBoring: "You're exploring the 3-pound universe inside our heads.",
    whyNot: [
      "Long research training",
      "Competitive academic path"
    ]
  },
  // 59. Advertising
  {
    id: "advertising",
    name: "Advertising",
    description: "Creating campaigns that capture attention. Persuasive communication at scale.",
    riasecMatch: ["A", "E", "S"],
    valueMatch: ["Stimulation", "Achievement"],
    personalityMatch: {
      openness: "high",
      conscientiousness: "medium",
      extraversion: "high",
      agreeableness: "medium",
      neuroticism: "low"
    },
    skills: ["Creative thinking", "Copywriting", "Strategy", "Presentation"],
    careers: ["Creative Director", "Copywriter", "Account Executive", "Media Planner"],
    whyFits: [
      "You're creative and persuasive",
      "You want to create memorable campaigns",
      "You thrive on variety and deadlines"
    ],
    whatGives: [
      "Creative career with business impact",
      "See your work everywhere",
      "Dynamic agency culture"
    ],
    whyNotBoring: "You're creating the ads that become part of culture and conversation.",
    whyNot: [
      "High-pressure deadlines",
      "Client demands can limit creativity"
    ]
  },
  // 60. Agricultural Science
  {
    id: "agricultural-science",
    name: "Agricultural Science",
    description: "Science of food production and farming. Feeding the world sustainably.",
    riasecMatch: ["I", "R", "C"],
    valueMatch: ["Universalism", "Security"],
    personalityMatch: {
      openness: "high",
      conscientiousness: "high",
      extraversion: "low",
      agreeableness: "high",
      neuroticism: "low"
    },
    skills: ["Research", "Biology", "Problem solving", "Field work"],
    careers: ["Agricultural Scientist", "Agronomist", "Food Scientist", "Sustainability Specialist"],
    whyFits: [
      "You want to solve food security challenges",
      "You enjoy applied science with real impact",
      "You care about sustainable farming"
    ],
    whatGives: [
      "Address global food challenges",
      "Combine science with practical application",
      "Work outdoors and in labs"
    ],
    whyNotBoring: "You're developing solutions to feed billions while protecting the planet.",
    whyNot: [
      "Can be tied to rural locations",
      "Weather and market uncertainties"
    ]
  },
  // 61. Kinesiology
  {
    id: "kinesiology",
    name: "Kinesiology",
    description: "Study of human movement. Understanding how bodies move and perform.",
    riasecMatch: ["I", "S", "R"],
    valueMatch: ["Benevolence", "Achievement"],
    personalityMatch: {
      openness: "high",
      conscientiousness: "high",
      extraversion: "medium",
      agreeableness: "high",
      neuroticism: "low"
    },
    skills: ["Anatomy knowledge", "Movement analysis", "Research", "Communication"],
    careers: ["Kinesiologist", "Exercise Physiologist", "Athletic Coach", "Rehabilitation Specialist"],
    whyFits: [
      "You're fascinated by human movement",
      "You want to help people move better",
      "You're interested in sports and fitness"
    ],
    whatGives: [
      "Help people optimize movement",
      "Pathway to many health careers",
      "Active work environment"
    ],
    whyNotBoring: "You're unlocking the secrets of human movement and athletic performance.",
    whyNot: [
      "May require additional certifications",
      "Some paths need graduate school"
    ]
  },
  // 62. Interior Design
  {
    id: "interior-design",
    name: "Interior Design",
    description: "Creating functional and beautiful interior spaces. Transforming how people experience rooms.",
    riasecMatch: ["A", "R", "E"],
    valueMatch: ["Self-Direction", "Stimulation"],
    personalityMatch: {
      openness: "high",
      conscientiousness: "high",
      extraversion: "medium",
      agreeableness: "medium",
      neuroticism: "medium"
    },
    skills: ["Spatial design", "Color theory", "Client relations", "CAD software"],
    careers: ["Interior Designer", "Space Planner", "Kitchen Designer", "Retail Designer"],
    whyFits: [
      "You have an eye for aesthetics",
      "You want to create beautiful, functional spaces",
      "You enjoy working with clients"
    ],
    whatGives: [
      "Creative career with tangible results",
      "Transform how people live",
      "Potential for entrepreneurship"
    ],
    whyNotBoring: "You're creating the spaces where people live their most intimate moments.",
    whyNot: [
      "Client taste may override yours",
      "Variable income"
    ]
  },
  // 63. Biotechnology
  {
    id: "biotechnology",
    name: "Biotechnology",
    description: "Using biology to develop products and technologies. Science at the cutting edge.",
    riasecMatch: ["I", "R", "C"],
    valueMatch: ["Achievement", "Self-Direction"],
    personalityMatch: {
      openness: "high",
      conscientiousness: "high",
      extraversion: "low",
      agreeableness: "medium",
      neuroticism: "low"
    },
    skills: ["Lab techniques", "Research", "Data analysis", "Scientific method"],
    careers: ["Biotechnologist", "Research Scientist", "Lab Director", "Biotech Entrepreneur"],
    whyFits: [
      "You want to be at the frontier of science",
      "You enjoy detailed lab work",
      "You want to create solutions for health and environment"
    ],
    whatGives: [
      "Work on breakthrough technologies",
      "High demand in growing industry",
      "Contribute to medical advances"
    ],
    whyNotBoring: "You're engineering life itself to solve humanity's biggest problems.",
    whyNot: [
      "Long research timelines",
      "Heavy regulation"
    ]
  },
  // 64. Public Relations
  {
    id: "public-relations",
    name: "Public Relations",
    description: "Managing reputation and public image. Strategic communication for organizations.",
    riasecMatch: ["E", "A", "S"],
    valueMatch: ["Achievement", "Stimulation"],
    personalityMatch: {
      openness: "high",
      conscientiousness: "high",
      extraversion: "high",
      agreeableness: "high",
      neuroticism: "low"
    },
    skills: ["Communication", "Writing", "Crisis management", "Relationship building"],
    careers: ["PR Specialist", "Communications Director", "Crisis Manager", "Media Relations"],
    whyFits: [
      "You're a natural communicator",
      "You enjoy building relationships with media",
      "You thrive under pressure"
    ],
    whatGives: [
      "Shape how organizations are perceived",
      "Dynamic, fast-paced work",
      "Build extensive networks"
    ],
    whyNotBoring: "You're shaping stories and managing reputations in real-time.",
    whyNot: [
      "Crisis mode is stressful",
      "Media cycles are relentless"
    ]
  },
  // 65. Forensic Science
  {
    id: "forensic-science",
    name: "Forensic Science",
    description: "Applying science to legal investigations. Solving crimes through evidence.",
    riasecMatch: ["I", "R", "C"],
    valueMatch: ["Security", "Achievement"],
    personalityMatch: {
      openness: "high",
      conscientiousness: "high",
      extraversion: "low",
      agreeableness: "medium",
      neuroticism: "low"
    },
    skills: ["Lab analysis", "Attention to detail", "Report writing", "Critical thinking"],
    careers: ["Forensic Scientist", "Crime Scene Investigator", "DNA Analyst", "Forensic Pathologist"],
    whyFits: [
      "You're fascinated by solving mysteries",
      "You enjoy detailed, methodical work",
      "You want to contribute to justice"
    ],
    whatGives: [
      "Help solve crimes and find justice",
      "Intellectually challenging work",
      "Variety of specializations"
    ],
    whyNotBoring: "You're the real-life detective using science to solve crimes.",
    whyNot: [
      "Exposure to disturbing scenes",
      "Must be precise—lives depend on it"
    ]
  },
  // 66. Animation
  {
    id: "animation",
    name: "Animation",
    description: "Bringing characters and stories to life through motion. Digital and traditional animation arts.",
    riasecMatch: ["A", "R", "I"],
    valueMatch: ["Self-Direction", "Stimulation"],
    personalityMatch: {
      openness: "high",
      conscientiousness: "high",
      extraversion: "low",
      agreeableness: "medium",
      neuroticism: "medium"
    },
    skills: ["Drawing", "Animation software", "Storytelling", "Attention to detail"],
    careers: ["Animator", "Character Designer", "Storyboard Artist", "Motion Graphics Designer"],
    whyFits: [
      "You want to bring characters to life",
      "You're detail-oriented and patient",
      "You love visual storytelling"
    ],
    whatGives: [
      "Create entertainment seen by millions",
      "Blend art and technology",
      "Work in games, film, or advertising"
    ],
    whyNotBoring: "You're creating worlds and characters that entertain people globally.",
    whyNot: [
      "Long hours on detailed work",
      "Competitive industry"
    ]
  },
  // 67. Materials Science
  {
    id: "materials-science",
    name: "Materials Science",
    description: "Study of materials and their properties. Creating the substances of tomorrow.",
    riasecMatch: ["I", "R", "C"],
    valueMatch: ["Achievement", "Self-Direction"],
    personalityMatch: {
      openness: "high",
      conscientiousness: "high",
      extraversion: "low",
      agreeableness: "medium",
      neuroticism: "low"
    },
    skills: ["Lab research", "Analysis", "Problem solving", "Technical writing"],
    careers: ["Materials Scientist", "Research Engineer", "Product Developer", "Quality Engineer"],
    whyFits: [
      "You're curious about what things are made of",
      "You want to create new materials",
      "You enjoy hands-on research"
    ],
    whatGives: [
      "Create materials that change industries",
      "Work in multiple sectors",
      "Cutting-edge research"
    ],
    whyNotBoring: "You're inventing the materials that will build the future.",
    whyNot: [
      "Can be highly specialized",
      "Lab work can be slow"
    ]
  },
  // 68. Social Media Management
  {
    id: "social-media",
    name: "Social Media Management",
    description: "Managing brand presence on social platforms. Creating content that connects.",
    riasecMatch: ["E", "A", "S"],
    valueMatch: ["Stimulation", "Achievement"],
    personalityMatch: {
      openness: "high",
      conscientiousness: "medium",
      extraversion: "high",
      agreeableness: "high",
      neuroticism: "low"
    },
    skills: ["Content creation", "Analytics", "Community management", "Trend awareness"],
    careers: ["Social Media Manager", "Content Creator", "Community Manager", "Influencer Marketing"],
    whyFits: [
      "You understand social platforms deeply",
      "You're creative and trend-aware",
      "You enjoy building online communities"
    ],
    whatGives: [
      "Creative, fast-paced work",
      "Build brand voices",
      "Stay on cutting edge of culture"
    ],
    whyNotBoring: "You're on the frontlines of culture, creating content that goes viral.",
    whyNot: [
      "Always-on expectations",
      "Platform changes constantly"
    ]
  },
  // 69. Audiology
  {
    id: "audiology",
    name: "Audiology",
    description: "Diagnosing and treating hearing disorders. Helping people connect through sound.",
    riasecMatch: ["I", "S", "C"],
    valueMatch: ["Benevolence", "Security"],
    personalityMatch: {
      openness: "medium",
      conscientiousness: "high",
      extraversion: "medium",
      agreeableness: "high",
      neuroticism: "low"
    },
    skills: ["Hearing assessment", "Patient care", "Technical equipment", "Communication"],
    careers: ["Audiologist", "Hearing Specialist", "Research Audiologist", "Cochlear Implant Specialist"],
    whyFits: [
      "You want to help people hear",
      "You enjoy healthcare with technology",
      "You value patient relationships"
    ],
    whatGives: [
      "Life-changing impact on patients",
      "Good salary and work-life balance",
      "Growing demand"
    ],
    whyNotBoring: "You're giving people the gift of hearing and connection.",
    whyNot: [
      "Requires doctoral degree",
      "Limited scope compared to other healthcare"
    ]
  },
  // 70. Event Planning
  {
    id: "event-planning",
    name: "Event Planning",
    description: "Creating memorable events and experiences. Logistics meets creativity.",
    riasecMatch: ["E", "A", "C"],
    valueMatch: ["Stimulation", "Achievement"],
    personalityMatch: {
      openness: "high",
      conscientiousness: "high",
      extraversion: "high",
      agreeableness: "high",
      neuroticism: "low"
    },
    skills: ["Organization", "Vendor management", "Creativity", "Problem solving"],
    careers: ["Event Planner", "Wedding Planner", "Conference Organizer", "Festival Director"],
    whyFits: [
      "You love creating memorable experiences",
      "You're highly organized and detail-oriented",
      "You thrive under pressure"
    ],
    whatGives: [
      "Create celebrations and memories",
      "Variety of events and clients",
      "Entrepreneurial opportunities"
    ],
    whyNotBoring: "You're creating the moments people remember for a lifetime.",
    whyNot: [
      "High-stress on event days",
      "Irregular hours"
    ]
  },
  // 71. Renewable Energy
  {
    id: "renewable-energy",
    name: "Renewable Energy",
    description: "Developing sustainable energy solutions. Powering the future cleanly.",
    riasecMatch: ["I", "R", "E"],
    valueMatch: ["Universalism", "Achievement"],
    personalityMatch: {
      openness: "high",
      conscientiousness: "high",
      extraversion: "medium",
      agreeableness: "high",
      neuroticism: "low"
    },
    skills: ["Engineering", "Project management", "Data analysis", "Problem solving"],
    careers: ["Renewable Energy Engineer", "Solar Designer", "Wind Energy Technician", "Sustainability Consultant"],
    whyFits: [
      "You want to combat climate change",
      "You enjoy technical problem solving",
      "You want meaningful, growing work"
    ],
    whatGives: [
      "Work on climate solutions",
      "Rapidly growing industry",
      "Tangible environmental impact"
    ],
    whyNotBoring: "You're building the energy systems that will power a sustainable future.",
    whyNot: [
      "Policy and subsidy dependent",
      "Can involve remote locations"
    ]
  },
  // 72. Game Design
  {
    id: "game-design",
    name: "Game Design",
    description: "Creating video games and interactive experiences. Entertainment through gameplay.",
    riasecMatch: ["A", "I", "R"],
    valueMatch: ["Stimulation", "Self-Direction"],
    personalityMatch: {
      openness: "high",
      conscientiousness: "medium",
      extraversion: "low",
      agreeableness: "medium",
      neuroticism: "medium"
    },
    skills: ["Game mechanics", "Programming", "Storytelling", "User experience"],
    careers: ["Game Designer", "Level Designer", "Game Developer", "Narrative Designer"],
    whyFits: [
      "You're passionate about games",
      "You want to create interactive worlds",
      "You enjoy both creativity and logic"
    ],
    whatGives: [
      "Create entertainment for millions",
      "Blend art, story, and technology",
      "Passionate community"
    ],
    whyNotBoring: "You're creating worlds where people escape, compete, and connect.",
    whyNot: [
      "Crunch culture is common",
      "Competitive industry"
    ]
  },
  // 73. Speech-Language Pathology
  {
    id: "speech-pathology",
    name: "Speech-Language Pathology",
    description: "Treating speech and communication disorders. Helping people find their voice.",
    riasecMatch: ["S", "I", "A"],
    valueMatch: ["Benevolence", "Security"],
    personalityMatch: {
      openness: "high",
      conscientiousness: "high",
      extraversion: "high",
      agreeableness: "high",
      neuroticism: "low"
    },
    skills: ["Communication disorders", "Patient therapy", "Assessment", "Empathy"],
    careers: ["Speech-Language Pathologist", "Voice Therapist", "Swallowing Specialist", "School SLP"],
    whyFits: [
      "You want to help people communicate",
      "You enjoy one-on-one therapy",
      "You're patient and creative"
    ],
    whatGives: [
      "High job satisfaction",
      "Growing demand",
      "Variety of settings and populations"
    ],
    whyNotBoring: "You're helping people express themselves and connect with others.",
    whyNot: [
      "Requires master's degree",
      "Can be emotionally challenging"
    ]
  },
  // 74. Entrepreneurship
  {
    id: "entrepreneurship",
    name: "Entrepreneurship",
    description: "Starting and growing businesses. Creating value through innovation and risk-taking.",
    riasecMatch: ["E", "A", "I"],
    valueMatch: ["Self-Direction", "Achievement"],
    personalityMatch: {
      openness: "high",
      conscientiousness: "high",
      extraversion: "high",
      agreeableness: "medium",
      neuroticism: "low"
    },
    skills: ["Business development", "Risk management", "Leadership", "Sales"],
    careers: ["Startup Founder", "Business Owner", "Venture Capitalist", "Serial Entrepreneur"],
    whyFits: [
      "You want to build something of your own",
      "You're comfortable with uncertainty",
      "You're driven to create and lead"
    ],
    whatGives: [
      "Complete autonomy and ownership",
      "Unlimited income potential",
      "Create jobs and value"
    ],
    whyNotBoring: "You're building companies from nothing and betting on yourself.",
    whyNot: [
      "High failure rate",
      "Financial and emotional stress"
    ]
  },
  // 75. Marine Biology
  {
    id: "marine-biology",
    name: "Marine Biology",
    description: "Study of ocean life and ecosystems. Understanding the underwater world.",
    riasecMatch: ["I", "R", "A"],
    valueMatch: ["Universalism", "Self-Direction"],
    personalityMatch: {
      openness: "high",
      conscientiousness: "high",
      extraversion: "low",
      agreeableness: "high",
      neuroticism: "low"
    },
    skills: ["Research", "Diving", "Data analysis", "Field work"],
    careers: ["Marine Biologist", "Ocean Researcher", "Marine Conservationist", "Aquarium Scientist"],
    whyFits: [
      "You're passionate about ocean life",
      "You enjoy fieldwork and research",
      "You want to protect marine ecosystems"
    ],
    whatGives: [
      "Work in beautiful ocean environments",
      "Contribute to conservation",
      "Discover unknown species"
    ],
    whyNotBoring: "You're exploring the last frontier on Earth—the deep ocean.",
    whyNot: [
      "Competitive for positions",
      "Remote fieldwork locations"
    ]
  },
  // 76. Insurance
  {
    id: "insurance",
    name: "Insurance",
    description: "Managing risk and protecting people. The business of security.",
    riasecMatch: ["C", "E", "S"],
    valueMatch: ["Security", "Achievement"],
    personalityMatch: {
      openness: "medium",
      conscientiousness: "high",
      extraversion: "high",
      agreeableness: "high",
      neuroticism: "low"
    },
    skills: ["Risk assessment", "Sales", "Analysis", "Client relations"],
    careers: ["Insurance Agent", "Underwriter", "Claims Adjuster", "Risk Manager"],
    whyFits: [
      "You want stable, well-paying work",
      "You enjoy helping people plan",
      "You're analytical and people-oriented"
    ],
    whatGives: [
      "Job stability",
      "Help people in difficult times",
      "Clear career progression"
    ],
    whyNotBoring: "You're helping people protect everything they've worked for.",
    whyNot: [
      "Can feel sales-focused",
      "Regulatory complexity"
    ]
  },
  // 77. Astronomy
  {
    id: "astronomy",
    name: "Astronomy",
    description: "Study of celestial objects and the universe. Understanding our cosmic place.",
    riasecMatch: ["I", "R", "A"],
    valueMatch: ["Self-Direction", "Universalism"],
    personalityMatch: {
      openness: "high",
      conscientiousness: "high",
      extraversion: "low",
      agreeableness: "medium",
      neuroticism: "low"
    },
    skills: ["Physics", "Data analysis", "Observation", "Research"],
    careers: ["Astronomer", "Astrophysicist", "Planetarium Director", "Space Scientist"],
    whyFits: [
      "You're fascinated by the cosmos",
      "You enjoy deep theoretical work",
      "You want to answer big questions"
    ],
    whatGives: [
      "Study the universe itself",
      "Contribute to humanity's knowledge",
      "Work with cutting-edge technology"
    ],
    whyNotBoring: "You're exploring questions about the origin and fate of the universe.",
    whyNot: [
      "Very competitive academic path",
      "Limited job positions"
    ]
  },
  // 78. Technical Writing
  {
    id: "technical-writing",
    name: "Technical Writing",
    description: "Translating complex information into clear documentation. Making the complex understandable.",
    riasecMatch: ["C", "I", "A"],
    valueMatch: ["Achievement", "Security"],
    personalityMatch: {
      openness: "high",
      conscientiousness: "high",
      extraversion: "low",
      agreeableness: "medium",
      neuroticism: "low"
    },
    skills: ["Writing", "Technical understanding", "Organization", "Research"],
    careers: ["Technical Writer", "Documentation Specialist", "API Writer", "Content Developer"],
    whyFits: [
      "You can explain complex things simply",
      "You enjoy writing with purpose",
      "You're detail-oriented and clear"
    ],
    whatGives: [
      "High demand in tech industry",
      "Work remotely",
      "Intellectual but practical work"
    ],
    whyNotBoring: "You're the bridge between engineers and users, making technology accessible.",
    whyNot: [
      "Can feel less creative than other writing",
      "Depends on others' work"
    ]
  },
  // 79. Chiropractic
  {
    id: "chiropractic",
    name: "Chiropractic",
    description: "Manual treatment of musculoskeletal issues. Hands-on healthcare.",
    riasecMatch: ["S", "R", "I"],
    valueMatch: ["Benevolence", "Self-Direction"],
    personalityMatch: {
      openness: "medium",
      conscientiousness: "high",
      extraversion: "high",
      agreeableness: "high",
      neuroticism: "low"
    },
    skills: ["Manual therapy", "Patient care", "Anatomy knowledge", "Business management"],
    careers: ["Chiropractor", "Sports Chiropractor", "Wellness Director", "Practice Owner"],
    whyFits: [
      "You want hands-on healing work",
      "You prefer alternative healthcare approaches",
      "You want to own your practice"
    ],
    whatGives: [
      "Help people with pain",
      "Autonomous practice",
      "Good income potential"
    ],
    whyNotBoring: "You're using your hands to relieve pain and improve people's quality of life.",
    whyNot: [
      "Skepticism from some in medicine",
      "Building patient base takes time"
    ]
  },
  // 80. Nonprofit Management
  {
    id: "nonprofit-management",
    name: "Nonprofit Management",
    description: "Leading organizations focused on social impact. Business skills for good causes.",
    riasecMatch: ["S", "E", "C"],
    valueMatch: ["Benevolence", "Universalism"],
    personalityMatch: {
      openness: "high",
      conscientiousness: "high",
      extraversion: "high",
      agreeableness: "high",
      neuroticism: "low"
    },
    skills: ["Fundraising", "Program management", "Leadership", "Strategic planning"],
    careers: ["Nonprofit Director", "Program Manager", "Fundraiser", "Grant Writer"],
    whyFits: [
      "You want to make a difference",
      "You enjoy leadership with purpose",
      "You care about social causes"
    ],
    whatGives: [
      "Meaningful work every day",
      "Lead mission-driven organizations",
      "Impact communities"
    ],
    whyNotBoring: "You're running organizations that tackle society's biggest challenges.",
    whyNot: [
      "Lower pay than private sector",
      "Constant fundraising pressure"
    ]
  },
  // 81. Petroleum Engineering
  {
    id: "petroleum-engineering",
    name: "Petroleum Engineering",
    description: "Extracting oil and gas resources. High-stakes engineering in energy.",
    riasecMatch: ["R", "I", "E"],
    valueMatch: ["Achievement", "Security"],
    personalityMatch: {
      openness: "medium",
      conscientiousness: "high",
      extraversion: "medium",
      agreeableness: "medium",
      neuroticism: "low"
    },
    skills: ["Engineering", "Geology", "Problem solving", "Project management"],
    careers: ["Petroleum Engineer", "Drilling Engineer", "Reservoir Engineer", "Field Manager"],
    whyFits: [
      "You want high-paying engineering work",
      "You enjoy complex technical challenges",
      "You're okay with remote locations"
    ],
    whatGives: [
      "Among highest-paid engineering fields",
      "Technical challenges",
      "Global opportunities"
    ],
    whyNotBoring: "You're solving million-dollar problems thousands of feet underground.",
    whyNot: [
      "Industry volatility",
      "Environmental concerns"
    ]
  },
  // 82. Makeup Artistry
  {
    id: "makeup-artistry",
    name: "Makeup Artistry",
    description: "Transforming appearance through cosmetics. Creating beauty and characters.",
    riasecMatch: ["A", "S", "R"],
    valueMatch: ["Stimulation", "Self-Direction"],
    personalityMatch: {
      openness: "high",
      conscientiousness: "medium",
      extraversion: "high",
      agreeableness: "high",
      neuroticism: "medium"
    },
    skills: ["Artistic skill", "Color theory", "Client relations", "Trend awareness"],
    careers: ["Makeup Artist", "Special Effects Makeup", "Bridal Makeup Artist", "Beauty Influencer"],
    whyFits: [
      "You're artistic and detail-oriented",
      "You enjoy transforming people's appearance",
      "You love beauty and self-expression"
    ],
    whatGives: [
      "Creative expression",
      "Make people feel beautiful",
      "Flexible work options"
    ],
    whyNotBoring: "You're an artist using the human face as your canvas.",
    whyNot: [
      "Inconsistent income",
      "Standing for long periods"
    ]
  },
  // 83. Archaeology
  {
    id: "archaeology",
    name: "Archaeology",
    description: "Studying human history through material remains. Uncovering the past.",
    riasecMatch: ["I", "R", "A"],
    valueMatch: ["Self-Direction", "Universalism"],
    personalityMatch: {
      openness: "high",
      conscientiousness: "high",
      extraversion: "low",
      agreeableness: "medium",
      neuroticism: "low"
    },
    skills: ["Excavation", "Analysis", "Research", "Patience"],
    careers: ["Archaeologist", "Museum Curator", "Cultural Resource Manager", "Professor"],
    whyFits: [
      "You're fascinated by ancient civilizations",
      "You enjoy hands-on discovery",
      "You want to preserve human history"
    ],
    whatGives: [
      "Discover lost history",
      "Fieldwork in fascinating locations",
      "Contribute to human knowledge"
    ],
    whyNotBoring: "You're literally uncovering buried treasures and lost civilizations.",
    whyNot: [
      "Academic path often required",
      "Fieldwork in harsh conditions"
    ]
  },
  // 84. Piloting / Aviation
  {
    id: "aviation",
    name: "Piloting / Aviation",
    description: "Flying aircraft as a career. Mastering the skies.",
    riasecMatch: ["R", "I", "E"],
    valueMatch: ["Stimulation", "Achievement"],
    personalityMatch: {
      openness: "medium",
      conscientiousness: "high",
      extraversion: "medium",
      agreeableness: "medium",
      neuroticism: "low"
    },
    skills: ["Flying", "Navigation", "Decision making", "Situational awareness"],
    careers: ["Airline Pilot", "Commercial Pilot", "Flight Instructor", "Military Pilot"],
    whyFits: [
      "You dream of flying",
      "You handle pressure well",
      "You want adventure and travel"
    ],
    whatGives: [
      "Fly around the world",
      "High salary for airline pilots",
      "Respected, skilled profession"
    ],
    whyNotBoring: "You're commanding aircraft through the sky and seeing the world.",
    whyNot: [
      "Expensive training",
      "Time away from home"
    ]
  },
  // 85. Genetic Counseling
  {
    id: "genetic-counseling",
    name: "Genetic Counseling",
    description: "Helping people understand genetic risks. Where genetics meets counseling.",
    riasecMatch: ["S", "I", "C"],
    valueMatch: ["Benevolence", "Self-Direction"],
    personalityMatch: {
      openness: "high",
      conscientiousness: "high",
      extraversion: "medium",
      agreeableness: "high",
      neuroticism: "low"
    },
    skills: ["Genetics knowledge", "Counseling", "Communication", "Empathy"],
    careers: ["Genetic Counselor", "Clinical Geneticist", "Research Coordinator", "Lab Consultant"],
    whyFits: [
      "You're interested in genetics and helping people",
      "You enjoy complex conversations",
      "You want healthcare without clinical procedures"
    ],
    whatGives: [
      "Growing field with high demand",
      "Help families make decisions",
      "Cutting-edge science"
    ],
    whyNotBoring: "You're helping people navigate their genetic destiny.",
    whyNot: [
      "Emotionally difficult conversations",
      "Requires master's degree"
    ]
  },
  // 86. Logistics
  {
    id: "logistics",
    name: "Logistics",
    description: "Moving goods efficiently around the world. The backbone of global trade.",
    riasecMatch: ["C", "E", "R"],
    valueMatch: ["Achievement", "Security"],
    personalityMatch: {
      openness: "medium",
      conscientiousness: "high",
      extraversion: "medium",
      agreeableness: "medium",
      neuroticism: "low"
    },
    skills: ["Planning", "Problem solving", "Analysis", "Coordination"],
    careers: ["Logistics Manager", "Supply Chain Analyst", "Distribution Manager", "Import/Export Specialist"],
    whyFits: [
      "You enjoy optimizing systems",
      "You like solving practical problems",
      "You want essential, stable work"
    ],
    whatGives: [
      "Growing e-commerce demand",
      "Global career opportunities",
      "Essential industry"
    ],
    whyNotBoring: "You're the reason things arrive on time from anywhere in the world.",
    whyNot: [
      "Stressful during disruptions",
      "Can involve long hours"
    ]
  },
  // 87. Dietetics / Nutrition
  {
    id: "dietetics",
    name: "Dietetics / Nutrition",
    description: "Science of food and nutrition. Helping people eat for health.",
    riasecMatch: ["I", "S", "C"],
    valueMatch: ["Benevolence", "Security"],
    personalityMatch: {
      openness: "high",
      conscientiousness: "high",
      extraversion: "medium",
      agreeableness: "high",
      neuroticism: "low"
    },
    skills: ["Nutrition science", "Counseling", "Meal planning", "Communication"],
    careers: ["Dietitian", "Nutritionist", "Sports Nutritionist", "Food Service Director"],
    whyFits: [
      "You're passionate about food and health",
      "You want to help people improve their lives",
      "You enjoy science-based practice"
    ],
    whatGives: [
      "Help people transform health",
      "Growing wellness industry",
      "Various work settings"
    ],
    whyNotBoring: "You're changing lives one meal at a time.",
    whyNot: [
      "Requires credentialing",
      "Patient compliance can be frustrating"
    ]
  },
  // 88. Urban Farming / Horticulture
  {
    id: "horticulture",
    name: "Urban Farming / Horticulture",
    description: "Growing plants and food in urban environments. Green thumbs in the city.",
    riasecMatch: ["R", "I", "S"],
    valueMatch: ["Universalism", "Self-Direction"],
    personalityMatch: {
      openness: "high",
      conscientiousness: "high",
      extraversion: "low",
      agreeableness: "high",
      neuroticism: "low"
    },
    skills: ["Plant science", "Sustainability", "Problem solving", "Physical labor"],
    careers: ["Urban Farmer", "Horticulturist", "Greenhouse Manager", "Landscape Designer"],
    whyFits: [
      "You love working with plants",
      "You want to create green spaces",
      "You care about sustainable food"
    ],
    whatGives: [
      "Connect with nature daily",
      "Growing sustainability field",
      "Tangible, growing results"
    ],
    whyNotBoring: "You're bringing nature into cities and growing food where it's needed.",
    whyNot: [
      "Weather dependent",
      "Can be physically demanding"
    ]
  },
  // 89. Paralegal
  {
    id: "paralegal",
    name: "Paralegal",
    description: "Legal support and research. The backbone of legal practice.",
    riasecMatch: ["C", "I", "E"],
    valueMatch: ["Security", "Achievement"],
    personalityMatch: {
      openness: "medium",
      conscientiousness: "high",
      extraversion: "low",
      agreeableness: "medium",
      neuroticism: "low"
    },
    skills: ["Legal research", "Organization", "Writing", "Attention to detail"],
    careers: ["Paralegal", "Legal Assistant", "Litigation Support", "Corporate Paralegal"],
    whyFits: [
      "You're interested in law without law school",
      "You enjoy research and organization",
      "You want stable professional work"
    ],
    whatGives: [
      "Entry to legal field without JD",
      "Good salary with less debt",
      "Variety of legal areas"
    ],
    whyNotBoring: "You're the detective behind legal cases, finding the evidence that wins.",
    whyNot: [
      "Work controlled by attorneys",
      "Can be deadline-intensive"
    ]
  },
  // 90. UX/UI Design
  {
    id: "ux-design",
    name: "UX/UI Design",
    description: "Designing digital experiences. Making technology intuitive and beautiful.",
    riasecMatch: ["A", "I", "S"],
    valueMatch: ["Self-Direction", "Achievement"],
    personalityMatch: {
      openness: "high",
      conscientiousness: "high",
      extraversion: "medium",
      agreeableness: "high",
      neuroticism: "low"
    },
    skills: ["User research", "Visual design", "Prototyping", "Empathy"],
    careers: ["UX Designer", "UI Designer", "Product Designer", "Design Lead"],
    whyFits: [
      "You want to make technology human-friendly",
      "You're creative and analytical",
      "You care about user needs"
    ],
    whatGives: [
      "High demand and salary",
      "Creative tech career",
      "Impact millions of users"
    ],
    whyNotBoring: "You're designing the apps and websites people use every single day.",
    whyNot: [
      "Must advocate for users vs. business",
      "Constant iteration"
    ]
  },
  // 91. Midwifery
  {
    id: "midwifery",
    name: "Midwifery",
    description: "Supporting pregnancy and childbirth. Holistic care for mothers.",
    riasecMatch: ["S", "I", "R"],
    valueMatch: ["Benevolence", "Security"],
    personalityMatch: {
      openness: "high",
      conscientiousness: "high",
      extraversion: "high",
      agreeableness: "high",
      neuroticism: "low"
    },
    skills: ["Patient care", "Medical knowledge", "Communication", "Crisis management"],
    careers: ["Certified Midwife", "Nurse Midwife", "Birth Center Director", "Lactation Consultant"],
    whyFits: [
      "You want to support women through birth",
      "You prefer holistic healthcare approaches",
      "You want intimate patient relationships"
    ],
    whatGives: [
      "Witness life's most profound moment",
      "Growing demand for midwifery care",
      "Autonomous practice options"
    ],
    whyNotBoring: "You're welcoming new life into the world every day.",
    whyNot: [
      "On-call lifestyle",
      "Emotionally intense"
    ]
  },
  // 92. Product Management
  {
    id: "product-management",
    name: "Product Management",
    description: "Guiding products from idea to launch. The CEO of your product.",
    riasecMatch: ["E", "I", "A"],
    valueMatch: ["Achievement", "Self-Direction"],
    personalityMatch: {
      openness: "high",
      conscientiousness: "high",
      extraversion: "high",
      agreeableness: "medium",
      neuroticism: "low"
    },
    skills: ["Strategy", "Communication", "Data analysis", "Leadership"],
    careers: ["Product Manager", "Product Owner", "VP of Product", "Chief Product Officer"],
    whyFits: [
      "You want to shape products people use",
      "You enjoy strategy and execution",
      "You can lead without authority"
    ],
    whatGives: [
      "High-impact strategic role",
      "Strong tech industry demand",
      "Path to executive leadership"
    ],
    whyNotBoring: "You're deciding what gets built and shaping products used by millions.",
    whyNot: [
      "Responsibility without direct authority",
      "Constant stakeholder management"
    ]
  },
  // 93. Radiology Technology
  {
    id: "radiology-tech",
    name: "Radiology Technology",
    description: "Operating medical imaging equipment. Seeing inside the body.",
    riasecMatch: ["R", "I", "C"],
    valueMatch: ["Security", "Benevolence"],
    personalityMatch: {
      openness: "medium",
      conscientiousness: "high",
      extraversion: "medium",
      agreeableness: "high",
      neuroticism: "low"
    },
    skills: ["Imaging equipment", "Patient care", "Attention to detail", "Technical skills"],
    careers: ["Radiologic Technologist", "MRI Technologist", "CT Technologist", "Sonographer"],
    whyFits: [
      "You want healthcare without long school",
      "You enjoy technology and patient care",
      "You want stable, in-demand work"
    ],
    whatGives: [
      "Good salary with associate degree",
      "High job security",
      "Variety of specializations"
    ],
    whyNotBoring: "You're creating the images that help doctors diagnose and save lives.",
    whyNot: [
      "Radiation exposure concerns",
      "Can be repetitive"
    ]
  },
  // 94. Consulting
  {
    id: "consulting",
    name: "Consulting",
    description: "Solving business problems for clients. Expert advice for hire.",
    riasecMatch: ["E", "I", "C"],
    valueMatch: ["Achievement", "Self-Direction"],
    personalityMatch: {
      openness: "high",
      conscientiousness: "high",
      extraversion: "high",
      agreeableness: "medium",
      neuroticism: "low"
    },
    skills: ["Problem solving", "Communication", "Analysis", "Presentation"],
    careers: ["Management Consultant", "Strategy Consultant", "IT Consultant", "HR Consultant"],
    whyFits: [
      "You love solving different problems",
      "You want variety and intellectual challenge",
      "You're ambitious and driven"
    ],
    whatGives: [
      "Rapid learning and growth",
      "High compensation",
      "Exposure to many industries"
    ],
    whyNotBoring: "You're solving different business puzzles for different clients constantly.",
    whyNot: [
      "Heavy travel and long hours",
      "High pressure environment"
    ]
  },
  // 95. Wildlife Biology
  {
    id: "wildlife-biology",
    name: "Wildlife Biology",
    description: "Studying and protecting wild animals. Conservation through science.",
    riasecMatch: ["I", "R", "S"],
    valueMatch: ["Universalism", "Self-Direction"],
    personalityMatch: {
      openness: "high",
      conscientiousness: "high",
      extraversion: "low",
      agreeableness: "high",
      neuroticism: "low"
    },
    skills: ["Field research", "Data analysis", "Conservation", "Physical stamina"],
    careers: ["Wildlife Biologist", "Conservation Officer", "Park Ranger", "Research Scientist"],
    whyFits: [
      "You're passionate about wildlife",
      "You love outdoor fieldwork",
      "You want to protect species"
    ],
    whatGives: [
      "Work in nature with animals",
      "Contribute to conservation",
      "Adventure and discovery"
    ],
    whyNotBoring: "You're tracking, studying, and protecting Earth's amazing creatures.",
    whyNot: [
      "Remote locations and conditions",
      "Competitive for positions"
    ]
  },
  // 96. Wealth Management
  {
    id: "wealth-management",
    name: "Wealth Management",
    description: "Managing investments for high-net-worth individuals. Financial planning for the wealthy.",
    riasecMatch: ["E", "C", "I"],
    valueMatch: ["Achievement", "Power"],
    personalityMatch: {
      openness: "medium",
      conscientiousness: "high",
      extraversion: "high",
      agreeableness: "high",
      neuroticism: "low"
    },
    skills: ["Financial planning", "Relationship building", "Investment knowledge", "Sales"],
    careers: ["Financial Advisor", "Wealth Manager", "Private Banker", "Estate Planner"],
    whyFits: [
      "You enjoy building client relationships",
      "You're interested in finance and investments",
      "You want high earning potential"
    ],
    whatGives: [
      "Work with affluent clients",
      "High income potential",
      "Entrepreneurial within finance"
    ],
    whyNotBoring: "You're managing millions and helping families preserve generational wealth.",
    whyNot: [
      "Pressure to bring in clients",
      "Market volatility affects relationships"
    ]
  },
  // 97. Emergency Medicine
  {
    id: "emergency-medicine",
    name: "Emergency Medicine",
    description: "Acute care in emergency situations. First response medicine.",
    riasecMatch: ["I", "S", "R"],
    valueMatch: ["Benevolence", "Stimulation"],
    personalityMatch: {
      openness: "high",
      conscientiousness: "high",
      extraversion: "high",
      agreeableness: "high",
      neuroticism: "low"
    },
    skills: ["Rapid diagnosis", "Crisis management", "Medical procedures", "Decision making"],
    careers: ["Emergency Physician", "Paramedic", "ER Nurse", "Flight Medic"],
    whyFits: [
      "You thrive under pressure",
      "You want immediate impact",
      "You enjoy variety and adrenaline"
    ],
    whatGives: [
      "Save lives in critical moments",
      "Never a dull moment",
      "Variety of cases"
    ],
    whyNotBoring: "You're the last line of defense saving lives in their most critical moments.",
    whyNot: [
      "High stress and trauma exposure",
      "Shift work and burnout"
    ]
  },
  // 98. Industrial Design
  {
    id: "industrial-design",
    name: "Industrial Design",
    description: "Designing products for manufacturing. Creating objects people use daily.",
    riasecMatch: ["A", "R", "I"],
    valueMatch: ["Self-Direction", "Achievement"],
    personalityMatch: {
      openness: "high",
      conscientiousness: "high",
      extraversion: "medium",
      agreeableness: "medium",
      neuroticism: "medium"
    },
    skills: ["Product design", "3D modeling", "Prototyping", "User research"],
    careers: ["Industrial Designer", "Product Designer", "Design Director", "Innovation Consultant"],
    whyFits: [
      "You want to design physical products",
      "You're creative and practical",
      "You enjoy the design-to-manufacture process"
    ],
    whatGives: [
      "Design products used by millions",
      "Blend creativity with engineering",
      "See your designs in stores"
    ],
    whyNotBoring: "You're designing the everyday objects that make life better.",
    whyNot: [
      "Manufacturing constraints limit creativity",
      "Long development cycles"
    ]
  },
  // 99. Venture Capital
  {
    id: "venture-capital",
    name: "Venture Capital",
    description: "Investing in startups and emerging companies. Betting on the future.",
    riasecMatch: ["E", "I", "C"],
    valueMatch: ["Achievement", "Power"],
    personalityMatch: {
      openness: "high",
      conscientiousness: "high",
      extraversion: "high",
      agreeableness: "medium",
      neuroticism: "low"
    },
    skills: ["Investment analysis", "Networking", "Due diligence", "Pattern recognition"],
    careers: ["Venture Capitalist", "Associate", "Partner", "Angel Investor"],
    whyFits: [
      "You want to shape the future through investing",
      "You enjoy meeting founders and evaluating ideas",
      "You're connected and analytical"
    ],
    whatGives: [
      "Front-row seat to innovation",
      "High-stakes, high-reward",
      "Help build the next big thing"
    ],
    whyNotBoring: "You're betting on founders and technologies that could change the world.",
    whyNot: [
      "Extremely competitive to enter",
      "Long timelines for returns"
    ]
  },
  // 100. Sports Psychology
  {
    id: "sports-psychology",
    name: "Sports Psychology",
    description: "Mental performance for athletes. The mind behind peak performance.",
    riasecMatch: ["S", "I", "A"],
    valueMatch: ["Achievement", "Benevolence"],
    personalityMatch: {
      openness: "high",
      conscientiousness: "high",
      extraversion: "high",
      agreeableness: "high",
      neuroticism: "low"
    },
    skills: ["Psychology", "Performance coaching", "Communication", "Mental training"],
    careers: ["Sports Psychologist", "Mental Performance Coach", "Team Consultant", "Peak Performance Specialist"],
    whyFits: [
      "You're passionate about sports and psychology",
      "You want to help athletes perform their best",
      "You enjoy high-pressure environments"
    ],
    whatGives: [
      "Work with elite athletes",
      "Combine passion for sports and helping",
      "Growing recognition of mental game"
    ],
    whyNotBoring: "You're unlocking the mental edge that separates champions from contenders.",
    whyNot: [
      "Requires advanced degrees",
      "Athletes can be skeptical"
    ]
  }
];
