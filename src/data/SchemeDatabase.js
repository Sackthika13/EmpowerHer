export const schemes = [
  {
    id: "pudhumai-penn",
    title: "Pudhumai Penn Scheme (Moovalur Ramamirtham Ammaiyar)",
    category: "Scholarships",
    type: "govt",
    benefit: "₹1,000 / month direct bank grant until degree/diploma completion",
    description: "Financial assistance program by the Tamil Nadu Government to encourage girl students from government schools to pursue higher education.",
    eligibilityCriteria: {
      minAge: 17,
      maxAge: 25,
      maxIncome: 250000,
      educationRequired: "Passed 12th Grade (Govt School 6th to 12th)",
      occupationRequired: "Student",
      stateRequired: "Tamil Nadu",
      genderRequired: "Female"
    },
    ruleExplanation: [
      { rule: "Age between 17 and 25 years", passField: "age", check: (p) => p.age >= 17 && p.age <= 25 },
      { rule: "Resident of Tamil Nadu", passField: "location", check: (p) => p.location.includes("Tamil Nadu") },
      { rule: "Family income under ₹2.5 Lakh/year", passField: "income", check: (p) => p.income <= 250000 },
      { rule: "Enrolled in higher education after Govt Schooling", passField: "education", check: (p) => p.education.includes("Undergraduate") || p.education.includes("12th") }
    ],
    region: "Tamil Nadu",
    district: "All Districts",
    matchScore: 98,
    status: "Eligible",
    documentsRequired: [
      "Aadhaar Card",
      "School Transfer Certificate (6th-12th Govt School)",
      "Bank Passbook (Aadhaar Seeded)",
      "College Bonafide Certificate"
    ],
    applicationProcess: [
      "Register on Penkalvi / EmpowerHer portal",
      "Verify EMIS student number",
      "Upload Bonafide certificate from college",
      "Nodal officer physical verification & DBT approval"
    ],
    deadline: "2026-11-15",
    officialLink: "https://penkalvi.tn.gov.in",
    tags: ["Higher Education", "Girl Student", "Direct Transfer"]
  },
  {
    id: "magalir-urimai",
    title: "Kalaignar Magalir Urimai Thittam",
    category: "Government Schemes",
    type: "govt",
    benefit: "₹1,000 monthly basic income support for women heads of families",
    description: "Universal basic income initiative to empower women heads of households and enhance economic security in Tamil Nadu.",
    eligibilityCriteria: {
      minAge: 21,
      maxAge: 65,
      maxIncome: 250000,
      educationRequired: "Any / None",
      occupationRequired: "Homemaker / Unorganized Worker",
      stateRequired: "Tamil Nadu",
      genderRequired: "Female"
    },
    ruleExplanation: [
      { rule: "Age between 21 and 65 years", passField: "age", check: (p) => p.age >= 21 && p.age <= 65 },
      { rule: "Resident of Tamil Nadu", passField: "location", check: (p) => p.location.includes("Tamil Nadu") },
      { rule: "Family income under ₹2.5 Lakh/year", passField: "income", check: (p) => p.income <= 250000 },
      { rule: "Smart Family Ration Card holder", passField: "documents", check: () => true }
    ],
    region: "Tamil Nadu",
    district: "All Districts",
    matchScore: 95,
    status: "Eligible",
    documentsRequired: [
      "Smart Family Card (Ration Card)",
      "Aadhaar Card of Applicant",
      "Electricity Bill / Rent Receipt",
      "Bank Account Details"
    ],
    applicationProcess: [
      "Obtain application token from local Fair Price Shop",
      "Attend Panchayat / Ward registration camp",
      "Biometric & Aadhaar authentication",
      "Field verification by Village Administrative Officer"
    ],
    deadline: "2026-12-01",
    officialLink: "https://kmut.tn.gov.in",
    tags: ["Universal Income", "Welfare", "Panchayat Camp"]
  },
  {
    id: "pmmvy",
    title: "Pradhan Mantri Matru Vandana Yojana (PMMVY)",
    category: "Financial Support",
    type: "govt",
    benefit: "₹5,000 cash grant in installments for pregnant & lactating mothers",
    description: "Maternal cash incentive scheme by the Ministry of Women and Child Development to compensate for wage loss during pregnancy.",
    eligibilityCriteria: {
      minAge: 19,
      maxAge: 45,
      maxIncome: 800000,
      educationRequired: "Any",
      occupationRequired: "Any",
      stateRequired: "All India",
      genderRequired: "Female"
    },
    ruleExplanation: [
      { rule: "Age 19 years or older", passField: "age", check: (p) => p.age >= 19 },
      { rule: "Income limit up to ₹8 Lakh/year", passField: "income", check: (p) => p.income <= 800000 },
      { rule: "Registered at Anganwadi Centre", passField: "location", check: () => true }
    ],
    region: "National",
    district: "All India",
    matchScore: 82,
    status: "Possibly Eligible",
    documentsRequired: [
      "Mother & Child Protection (MCP) Card",
      "Aadhaar Card of Wife & Husband",
      "Bank Account linked to Aadhaar",
      "Pregnancy Registration Certificate"
    ],
    applicationProcess: [
      "Register at nearest Anganwadi Centre (AWC)",
      "Fill Form 1-A with assistance of ASHA worker",
      "Submit mandatory ANC check-up proof",
      "Direct Benefit Transfer to bank account"
    ],
    deadline: "Continuous",
    officialLink: "https://pmmvy.wcd.gov.in",
    tags: ["Maternal Health", "Nutritional Grant", "Anganwadi"]
  },
  {
    id: "naan-mudhalvan",
    title: "Naan Mudhalvan Skill & Technical Training",
    category: "Education",
    type: "govt",
    benefit: "100% Free technical training in IT, Data Entry, Apparel & Healthcare with placement",
    description: "Flagship skill development program in Tamil Nadu aiming to equip 10 lakh youth and women annually with industry-ready skills.",
    eligibilityCriteria: {
      minAge: 18,
      maxAge: 35,
      maxIncome: 300000,
      educationRequired: "Passed 10th / 12th / Diploma / Degree",
      occupationRequired: "Student / Unemployed / Job Seeker",
      stateRequired: "Tamil Nadu",
      genderRequired: "All / Women"
    },
    ruleExplanation: [
      { rule: "Age between 18 and 35 years", passField: "age", check: (p) => p.age >= 18 && p.age <= 35 },
      { rule: "Passed minimum 10th Grade", passField: "education", check: (p) => !p.education.includes("No Formal") },
      { rule: "Resident of Tamil Nadu", passField: "location", check: (p) => p.location.includes("Tamil Nadu") }
    ],
    region: "Tamil Nadu",
    district: "All Districts",
    matchScore: 94,
    status: "Eligible",
    documentsRequired: [
      "10th / 12th / Degree Marksheet",
      "Community Certificate",
      "Aadhaar Card",
      "Passport Size Photo"
    ],
    applicationProcess: [
      "Select desired skill track (e.g., Coding, Tailoring, Digital Marketing)",
      "Choose nearest District Training Hub",
      "Attend aptitude assessment",
      "Enroll in 3-month course batch"
    ],
    deadline: "2026-11-05",
    officialLink: "https://naanmudhalvan.tn.gov.in",
    tags: ["Skill Training", "Job Guarantee", "Free Course"]
  },
  {
    id: "wep-entrepreneur",
    title: "Niti Aayog Women Entrepreneurship Platform (WEP)",
    category: "Women Entrepreneurship",
    type: "ngo",
    benefit: "Up to ₹10 Lakh collateral-free loan + 6 months 1-on-1 startup mentorship",
    description: "A unified portal bringing together women entrepreneurs, incubators, investors, and mentors across India.",
    eligibilityCriteria: {
      minAge: 18,
      maxAge: 60,
      maxIncome: 1000000,
      educationRequired: "10th Pass or Higher",
      occupationRequired: "Entrepreneur / Self-Employed / Business Owner",
      stateRequired: "All India",
      genderRequired: "Female"
    },
    ruleExplanation: [
      { rule: "Woman entrepreneur or co-founder", passField: "occupation", check: (p) => p.occupation.includes("Entrepreneur") || p.occupation.includes("Self-Employed") || p.occupation.includes("Student") },
      { rule: "Age between 18 and 60 years", passField: "age", check: (p) => p.age >= 18 && p.age <= 60 }
    ],
    region: "National",
    district: "All India",
    matchScore: 90,
    status: "Eligible",
    documentsRequired: [
      "Udyam MSME Registration",
      "Business Proposal Summary",
      "PAN Card & Aadhaar",
      "6 Months Bank Statement"
    ],
    applicationProcess: [
      "Create WEP portal account",
      "Submit Business Idea Pitch Deck",
      "Virtual evaluation by expert panel",
      "Loan sanctioning & mentor matching"
    ],
    deadline: "2026-10-30",
    officialLink: "https://wep.gov.in",
    tags: ["Startup Loan", "Mentorship", "MSME"]
  },
  {
    id: "sewa-micro-grant",
    title: "SEWA Mahila Micro-Business Support Grant",
    category: "Women Entrepreneurship",
    type: "ngo",
    benefit: "Equipment grant up to ₹35,000 for sewing machines & food processing units",
    description: "Self-Employed Women's Association initiative empowering rural women artisans and micro-entrepreneurs.",
    eligibilityCriteria: {
      minAge: 20,
      maxAge: 55,
      maxIncome: 180000,
      educationRequired: "Any / None",
      occupationRequired: "Artisan / Handloom / Homemaker",
      stateRequired: "All India",
      genderRequired: "Female"
    },
    ruleExplanation: [
      { rule: "Family income under ₹1.8 Lakh/year", passField: "income", check: (p) => p.income <= 180000 },
      { rule: "Self-Help Group (SHG) membership or artisan focus", passField: "occupation", check: () => true }
    ],
    region: "National",
    district: "All India",
    matchScore: 88,
    status: "Eligible",
    documentsRequired: [
      "SHG Passbook or Recommendation",
      "Income Certificate",
      "Aadhaar Card",
      "Bank Account Details"
    ],
    applicationProcess: [
      "Submit application through local SHG leader",
      "Field visit by SEWA representative",
      "Equipment delivery / direct grant transfer"
    ],
    deadline: "2026-12-15",
    officialLink: "https://sewa.org",
    tags: ["SHG Grant", "Equipment", "Rural Women"]
  }
];
