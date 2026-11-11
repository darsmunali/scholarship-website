// Scholarship data used by every page
// Note: details are sample information for a student project – always confirm on the official website.

const scholarships = [
  {
    id: 1,
    name: "HEC Need-Based Scholarship",
    provider: "Higher Education Commission, Pakistan",
    country: "Pakistan",
    level: "Undergraduate",
    type: "Need-Based",
    field: "Any",
    amount: "Full tuition + monthly stipend",
    deadline: "2026-12-15",
    minGpa: 2.5,
    maxIncome: 100000,
    description: "Supports talented students from low-income families studying at public sector universities in Pakistan.",
    eligibility: [
      "Pakistani national",
      "Enrolled in a participating public university",
      "Monthly household income below Rs. 100,000",
      "Minimum CGPA of 2.5 or equivalent"
    ],
    documents: ["CNIC / B-Form", "Income certificate", "Utility bills", "Admission letter", "Academic transcripts"],
    website: "https://www.hec.gov.pk"
  },
  {
    id: 2,
    name: "Ehsaas Undergraduate Scholarship",
    provider: "Government of Pakistan",
    country: "Pakistan",
    level: "Undergraduate",
    type: "Need-Based",
    field: "Any",
    amount: "Tuition + Rs. 4,000 monthly stipend",
    deadline: "2026-12-31",
    minGpa: 2.0,
    maxIncome: 45000,
    description: "A government programme that helps students from low-income households complete a four-year undergraduate degree.",
    eligibility: [
      "Pakistani national",
      "Admission in a 4–5 year undergraduate programme",
      "Family income below Rs. 45,000 per month",
      "Not receiving any other scholarship"
    ],
    documents: ["CNIC / B-Form", "Parents' CNIC", "Income proof", "Admission proof", "Death certificate (if parent deceased)"],
    website: "https://www.hec.gov.pk"
  },
  {
    id: 3,
    name: "PEEF Scholarship",
    provider: "Punjab Educational Endowment Fund",
    country: "Pakistan",
    level: "Intermediate",
    type: "Merit + Need",
    field: "Any",
    amount: "Tuition fee + monthly stipend",
    deadline: "2027-01-20",
    minGpa: 3.0,
    maxIncome: 60000,
    description: "Helps bright students with limited financial resources continue their education from matric onwards.",
    eligibility: [
      "Good academic record in the previous exam",
      "Family income within the set limit",
      "Enrolled in a recognised institution"
    ],
    documents: ["Result card", "Income certificate", "CNIC / B-Form", "Institution verification form"],
    website: "https://www.peef.org.pk"
  },
  {
    id: 4,
    name: "Sindh Educational Endowment Fund",
    provider: "Government of Sindh",
    country: "Pakistan",
    level: "Undergraduate",
    type: "Merit + Need",
    field: "Any",
    amount: "Full tuition fee",
    deadline: "2026-12-10",
    minGpa: 3.0,
    maxIncome: 80000,
    description: "Supports students with Sindh domicile who are admitted to top universities in Pakistan.",
    eligibility: [
      "Sindh domicile",
      "Admission in a recognised university",
      "Strong academic record",
      "Demonstrated financial need"
    ],
    documents: ["Domicile and PRC", "Admission letter", "Fee voucher", "Income proof", "Transcripts"],
    website: "https://www.seef.gos.pk"
  },
  {
    id: 5,
    name: "Fulbright Scholarship",
    provider: "USEFP",
    country: "USA",
    level: "Masters",
    type: "Merit-Based",
    field: "Any",
    amount: "Fully funded",
    deadline: "2027-02-01",
    minGpa: 3.0,
    maxIncome: null,
    description: "Fully funded master's and PhD study in the United States for outstanding Pakistani students.",
    eligibility: [
      "Pakistani citizen residing in Pakistan",
      "16 years of education",
      "GRE score (where required)",
      "Strong leadership and academic profile"
    ],
    documents: ["Transcripts and degrees", "GRE score report", "Recommendation letters", "Study objectives essay", "CNIC"],
    website: "https://www.usefpakistan.org"
  },
  {
    id: 6,
    name: "Chevening Scholarship",
    provider: "UK Government",
    country: "UK",
    level: "Masters",
    type: "Merit-Based",
    field: "Any",
    amount: "Fully funded one-year master's",
    deadline: "2026-11-30",
    minGpa: 3.0,
    maxIncome: null,
    description: "The UK government's global scholarship programme for future leaders to study a one-year master's in the UK.",
    eligibility: [
      "Undergraduate degree",
      "At least two years of work experience",
      "Applications to three eligible UK courses",
      "Return to home country for two years after study"
    ],
    documents: ["Degree and transcripts", "Two reference letters", "Four essays", "Passport"],
    website: "https://www.chevening.org"
  },
  {
    id: 7,
    name: "DAAD Scholarship",
    provider: "German Academic Exchange Service",
    country: "Germany",
    level: "Masters",
    type: "Merit-Based",
    field: "Engineering",
    amount: "Monthly stipend + travel + insurance",
    deadline: "2027-01-15",
    minGpa: 3.0,
    maxIncome: null,
    description: "Postgraduate scholarships for development-related courses at German universities.",
    eligibility: [
      "Bachelor's degree in a related field",
      "Two years of professional experience",
      "Good command of English or German"
    ],
    documents: ["CV", "Motivation letter", "Work experience certificates", "Language certificate", "Transcripts"],
    website: "https://www.daad.de"
  },
  {
    id: 8,
    name: "Erasmus Mundus Joint Masters",
    provider: "European Union",
    country: "Europe",
    level: "Masters",
    type: "Merit-Based",
    field: "Any",
    amount: "Fully funded",
    deadline: "2027-01-10",
    minGpa: 3.2,
    maxIncome: null,
    description: "Study in two or more European countries through an internationally recognised joint master's programme.",
    eligibility: [
      "Bachelor's degree",
      "English proficiency (IELTS/TOEFL)",
      "Meets the specific programme's requirements"
    ],
    documents: ["CV", "Motivation letter", "Recommendation letters", "IELTS/TOEFL score", "Passport"],
    website: "https://www.eacea.ec.europa.eu"
  },
  {
    id: 9,
    name: "Commonwealth Scholarship",
    provider: "Commonwealth Scholarship Commission",
    country: "UK",
    level: "PhD",
    type: "Merit + Need",
    field: "Science",
    amount: "Fully funded",
    deadline: "2026-12-05",
    minGpa: 3.3,
    maxIncome: null,
    description: "For students from Commonwealth countries who want to pursue a PhD in the UK and contribute to development at home.",
    eligibility: [
      "Citizen of an eligible Commonwealth country",
      "Master's degree (for PhD)",
      "Unable to afford UK study without the scholarship"
    ],
    documents: ["Research proposal", "Transcripts", "References", "Passport"],
    website: "https://cscuk.fcdo.gov.uk"
  },
  {
    id: 10,
    name: "Women in STEM Scholarship",
    provider: "Sample Foundation",
    country: "Pakistan",
    level: "Undergraduate",
    type: "Merit-Based",
    field: "Science",
    amount: "50% tuition waiver",
    deadline: "2027-03-01",
    minGpa: 3.0,
    maxIncome: null,
    gender: "Female",
    description: "Encourages female students to take up degrees in science, technology, engineering and mathematics.",
    eligibility: [
      "Female student",
      "Enrolled in a STEM degree",
      "Minimum CGPA of 3.0"
    ],
    documents: ["CNIC / B-Form", "Transcripts", "Personal statement", "Enrollment proof"],
    website: "#"
  }
];

// ---------- Date helpers ----------
// Dates are stored as "YYYY-MM-DD" and read as local dates, so a deadline
// never shows up one day early in time zones behind UTC.
function parseDate(dateStr) {
  const parts = dateStr.split("-").map(Number);
  return new Date(parts[0], parts[1] - 1, parts[2]);
}

function formatDate(dateStr) {
  return parseDate(dateStr).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function daysLeft(dateStr) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = parseDate(dateStr) - today;
  return Math.round(diff / (1000 * 60 * 60 * 24));
}
