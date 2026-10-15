import { SCHEMES, DOCUMENTS, EDUCATION_LEVELS, OCCUPATIONS } from './schemesData.js';

const inr = (n) => '₹' + Number(n).toLocaleString('en-IN');
const eduRank = (v) => EDUCATION_LEVELS.find((e) => e.value === v)?.rank ?? -1;
const eduLabel = (v) => EDUCATION_LEVELS.find((e) => e.value === v)?.label ?? v;
const occLabel = (v) => OCCUPATIONS.find((o) => o.value === v)?.label ?? v;

function ageRange(min, max) {
  if (min != null && max != null) return `between ${min} and ${max}`;
  if (min != null) return `${min} or above`;
  return `up to ${max}`;
}

// Checks one rule against a profile. Returns { ok, text } where text is a
// plain-language reason that the UI can show as-is.
export function evaluateRule(rule, p) {
  switch (rule.type) {
    case 'age': {
      const lo = rule.min ?? -Infinity;
      const hi = rule.max ?? Infinity;
      const ok = p.age >= lo && p.age <= hi;
      const range = ageRange(rule.min, rule.max);
      return {
        ok,
        text: ok
          ? `Your age (${p.age}) fits the age limit: ${range}`
          : `Age should be ${range}; you entered ${p.age}`,
      };
    }
    case 'income': {
      const ok = p.income <= rule.max;
      return {
        ok,
        text: ok
          ? `Family income ${inr(p.income)} is within the ${inr(rule.max)} limit`
          : `Family income should be ${inr(rule.max)} or less; you entered ${inr(p.income)}`,
      };
    }
    case 'education': {
      const ok = eduRank(p.education) >= eduRank(rule.min);
      return {
        ok,
        text: ok
          ? `Your education (${eduLabel(p.education)}) meets the minimum`
          : `Minimum education: ${eduLabel(rule.min)}`,
      };
    }
    case 'occupation': {
      const ok = rule.anyOf.includes(p.occupation);
      return {
        ok,
        text: ok
          ? `Your occupation (${occLabel(p.occupation)}) is covered`
          : `Meant for: ${rule.anyOf.map(occLabel).join(', ')}`,
      };
    }
    default:
      throw new Error(`Unknown rule type: ${rule.type}`);
  }
}

// status: 'eligible' (all rules pass) | 'almost' (exactly one fails) | 'no'
export function matchScheme(scheme, profile) {
  const checks = scheme.rules.map((rule) => ({
    ...evaluateRule(rule, profile),
    weight: rule.weight ?? 1,
  }));
  const total = checks.reduce((s, c) => s + c.weight, 0);
  const passed = checks.reduce((s, c) => s + (c.ok ? c.weight : 0), 0);
  const failedCount = checks.filter((c) => !c.ok).length;
  const status = failedCount === 0 ? 'eligible' : failedCount === 1 ? 'almost' : 'no';

  return {
    scheme,
    status,
    percent: Math.round((passed / total) * 100),
    met: checks.filter((c) => c.ok).map((c) => c.text),
    unmet: checks.filter((c) => !c.ok).map((c) => c.text),
    documents: scheme.docs.map((id) => ({ id, ...DOCUMENTS[id] })),
  };
}

const ORDER = { eligible: 0, almost: 1, no: 2 };

export function matchSchemes(profile, schemes = SCHEMES) {
  return schemes
    .map((s) => matchScheme(s, profile))
    .sort((a, b) => ORDER[a.status] - ORDER[b.status] || b.percent - a.percent);
}

// Combined, de-duplicated document list for the schemes a woman qualifies for.
export function collectDocuments(results) {
  const map = new Map();
  for (const r of results) {
    for (const d of r.documents) {
      if (!map.has(d.id)) map.set(d.id, { ...d, neededFor: [] });
      map.get(d.id).neededFor.push(r.scheme.name);
    }
  }
  return [...map.values()].sort((a, b) => b.neededFor.length - a.neededFor.length);
}

// Turns raw form strings into a clean profile, or field-level errors.
export function validateProfile(raw) {
  const errors = {};
  const age = Number(raw.age);
  const income = Number(raw.income);

  if (raw.age === '' || !Number.isInteger(age)) errors.age = 'Enter your age in whole years.';
  else if (age < 10 || age > 100) errors.age = 'Enter an age between 10 and 100.';

  if (raw.income === '' || Number.isNaN(income)) errors.income = 'Enter yearly family income in rupees. Use 0 if none.';
  else if (income < 0) errors.income = 'Income cannot be negative.';

  if (!EDUCATION_LEVELS.some((e) => e.value === raw.education)) errors.education = 'Choose your education level.';
  if (!OCCUPATIONS.some((o) => o.value === raw.occupation)) errors.occupation = 'Choose your occupation.';

  return {
    errors,
    profile: Object.keys(errors).length
      ? null
      : { age, income, education: raw.education, occupation: raw.occupation },
  };
}
