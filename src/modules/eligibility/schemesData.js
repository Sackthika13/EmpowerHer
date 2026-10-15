a// SAMPLE DATA for demonstration. Rules are simplified; always confirm the
// real criteria on the official portal before applying.
// To add a scheme: append an object to SCHEMES. No engine changes needed.

export const EDUCATION_LEVELS = [
  { value: 'none', label: 'No formal schooling', rank: 0 },
  { value: 'primary', label: 'Primary (up to Class 5)', rank: 1 },
  { value: 'middle', label: 'Middle school (Class 6–8)', rank: 2 },
  { value: 'secondary', label: 'Secondary (Class 10)', rank: 3 },
  { value: 'higher_secondary', label: 'Higher secondary (Class 12)', rank: 4 },
  { value: 'diploma', label: 'Diploma / ITI', rank: 5 },
  { value: 'graduate', label: 'Graduate', rank: 6 },
  { value: 'postgraduate', label: 'Postgraduate or above', rank: 7 },
];

export const OCCUPATIONS = [
  { value: 'student', label: 'Student' },
  { value: 'homemaker', label: 'Homemaker' },
  { value: 'unemployed', label: 'Looking for work' },
  { value: 'wage_worker', label: 'Daily-wage / casual worker' },
  { value: 'salaried', label: 'Salaried employee' },
  { value: 'self_employed', label: 'Self-employed / small business owner' },
  { value: 'farmer', label: 'Farmer / agricultural worker' },
  { value: 'artisan', label: 'Artisan / craftsperson' },
];

// Shared document library, so the same document is described once and
// de-duplicated in the combined checklist.
export const DOCUMENTS = {
  aadhaar: {
    name: 'Aadhaar card',
    tip: 'Name and date of birth should match your other documents.',
  },
  bank: {
    name: 'Bank passbook (first page)',
    tip: 'Account should be active and linked to your Aadhaar.',
  },
  family_card: {
    name: 'Ration / family card',
    tip: 'Used to confirm household details.',
  },
  income_cert: {
    name: 'Income certificate',
    tip: 'Issued by the revenue authority (in Tamil Nadu, usually via an e-Sevai centre). Check how recent it must be.',
  },
  photo: {
    name: 'Passport-size photograph',
    tip: 'Recent, plain background.',
  },
  mobile: {
    name: 'Mobile number linked to Aadhaar',
    tip: 'OTP verification is usually needed during application.',
  },
  education_proof: {
    name: 'Education certificate / mark sheet',
    tip: 'Highest qualification you have completed.',
  },
  student_proof: {
    name: 'Bonafide / student ID from your institution',
    tip: 'Shows you are currently enrolled.',
  },
  community_cert: {
    name: 'Community certificate',
    tip: 'Needed where a category-based benefit applies.',
  },
  business_proof: {
    name: 'Business proof or project plan',
    tip: 'Shop licence, Udyam registration, or a short plan for a new venture.',
  },
  pan: {
    name: 'PAN card',
    tip: 'Commonly asked for by banks on business loans.',
  },
  land_records: {
    name: 'Land records (patta / chitta)',
    tip: 'Must be in your or your family’s name.',
  },
  artisan_proof: {
    name: 'Proof of trade / craft',
    tip: 'Any document or local certificate showing you practise the craft.',
  },
  address_proof: {
    name: 'Address proof',
    tip: 'Aadhaar often works; otherwise utility bill or ration card.',
  },
};

// Rule types: age {min,max} · income {max} · education {min} · occupation {anyOf}
export const SCHEMES = [
  {
    id: 'kmut',
    name: 'Kalaignar Magalir Urimai Thogai',
    region: 'Tamil Nadu',
    category: 'Monthly assistance',
    benefit: 'Monthly financial assistance of ₹1,000 for eligible women heads of family.',
    note: 'Extra conditions (such as land and asset limits) are checked on the official portal.',
    portal: 'https://www.tn.gov.in',
    rules: [
      { type: 'age', min: 21 },
      { type: 'income', max: 250000 },
    ],
    docs: ['aadhaar', 'family_card', 'bank', 'mobile'],
  },
  {
    id: 'pudhumai_penn',
    name: 'Pudhumai Penn',
    region: 'Tamil Nadu',
    category: 'Education support',
    benefit: 'Monthly support for girls from government schools who continue to higher education.',
    note: 'Requires having studied in a government school; the portal verifies this.',
    portal: 'https://www.tn.gov.in',
    rules: [
      { type: 'age', min: 17, max: 25 },
      { type: 'occupation', anyOf: ['student'] },
      { type: 'education', min: 'higher_secondary' },
    ],
    docs: ['aadhaar', 'student_proof', 'education_proof', 'bank'],
  },
  {
    id: 'mudra',
    name: 'PM Mudra Yojana',
    region: 'All India',
    category: 'Business loan',
    benefit: 'Collateral-free loans for small non-farm businesses and micro-enterprises.',
    note: 'Lenders (banks, MFIs) make the final decision.',
    portal: 'https://www.mudra.org.in',
    rules: [
      { type: 'age', min: 18, max: 65 },
      { type: 'occupation', anyOf: ['self_employed', 'artisan'] },
    ],
    docs: ['aadhaar', 'pan', 'business_proof', 'bank', 'photo', 'address_proof'],
  },
  {
    id: 'standup_india',
    name: 'Stand-Up India',
    region: 'All India',
    category: 'Business loan',
    benefit: 'Bank loans between ₹10 lakh and ₹1 crore for a new (greenfield) enterprise run by a woman.',
    note: 'Applies to setting up a first-time enterprise in manufacturing, services or trading.',
    portal: 'https://www.standupmitra.in',
    rules: [
      { type: 'age', min: 18 },
      { type: 'occupation', anyOf: ['self_employed'] },
    ],
    docs: ['aadhaar', 'pan', 'business_proof', 'bank', 'photo', 'address_proof'],
  },
  {
    id: 'nrlm',
    name: 'DAY-NRLM Self-Help Group support',
    region: 'All India (rural focus)',
    category: 'Livelihood',
    benefit: 'Join a Self-Help Group for savings, revolving funds, bank-linked credit and livelihood training.',
    note: 'Mainly for rural, lower-income households; income limit here is a simplified stand-in.',
    portal: 'https://nrlm.gov.in',
    rules: [
      { type: 'age', min: 18, max: 60 },
      { type: 'income', max: 300000 },
      {
        type: 'occupation',
        anyOf: ['homemaker', 'farmer', 'wage_worker', 'unemployed', 'artisan', 'self_employed'],
      },
    ],
    docs: ['aadhaar', 'bank', 'family_card', 'address_proof', 'photo'],
  },
  {
    id: 'pmkvy',
    name: 'PM Kaushal Vikas Yojana (skill training)',
    region: 'All India',
    category: 'Skill training',
    benefit: 'Free short-term skill training with a certificate and placement support.',
    note: 'Courses and training centres vary by district.',
    portal: 'https://www.pmkvyofficial.org',
    rules: [
      { type: 'age', min: 15, max: 45 },
      { type: 'occupation', anyOf: ['student', 'unemployed', 'homemaker', 'wage_worker'] },
    ],
    docs: ['aadhaar', 'bank', 'education_proof', 'photo'],
  },
  {
    id: 'ujjwala',
    name: 'PM Ujjwala Yojana',
    region: 'All India',
    category: 'Household support',
    benefit: 'Free LPG connection for adult women from poor households.',
    note: 'The real test is household priority status; the income limit here is a simplified stand-in.',
    portal: 'https://www.pmuy.gov.in',
    rules: [
      { type: 'age', min: 18 },
      { type: 'income', max: 100000 },
    ],
    docs: ['aadhaar', 'family_card', 'bank', 'address_proof', 'photo'],
  },
  {
    id: 'pm_kisan',
    name: 'PM-KISAN',
    region: 'All India',
    category: 'Farmer support',
    benefit: '₹6,000 per year in three instalments for landholding farmer families.',
    note: 'Some categories (for example, income-tax payers) are excluded on the portal.',
    portal: 'https://pmkisan.gov.in',
    rules: [
      { type: 'age', min: 18 },
      { type: 'occupation', anyOf: ['farmer'] },
    ],
    docs: ['aadhaar', 'land_records', 'bank', 'mobile'],
  },
  {
    id: 'pm_vishwakarma',
    name: 'PM Vishwakarma',
    region: 'All India',
    category: 'Artisan support',
    benefit: 'Recognition, skill upgrade, toolkit support and low-interest credit for traditional artisans.',
    note: 'Only listed traditional trades qualify; the portal shows the list.',
    portal: 'https://pmvishwakarma.gov.in',
    rules: [
      { type: 'age', min: 18 },
      { type: 'occupation', anyOf: ['artisan'] },
    ],
    docs: ['aadhaar', 'artisan_proof', 'bank', 'mobile', 'photo'],
  },
];
