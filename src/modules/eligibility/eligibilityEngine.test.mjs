// Run with: node src/modules/eligibility/eligibilityEngine.test.mjs
import assert from 'node:assert/strict';
import { matchSchemes, validateProfile, collectDocuments } from './eligibilityEngine.js';

const ids = (rs, status) => rs.filter((r) => r.status === status).map((r) => r.scheme.id);

// Homemaker, 35, ₹2L income, Class 10
let rs = matchSchemes({ age: 35, income: 200000, education: 'secondary', occupation: 'homemaker' });
assert.deepEqual(ids(rs, 'eligible').sort(), ['kmut', 'nrlm', 'pmkvy']);

// Student, 22, ₹1.5L income, Class 12
rs = matchSchemes({ age: 22, income: 150000, education: 'higher_secondary', occupation: 'student' });
assert.ok(ids(rs, 'eligible').includes('pudhumai_penn'));
assert.ok(ids(rs, 'eligible').includes('pmkvy'));

// Self-employed, 40, ₹8L income: business loans yes, KMUT only 'almost' (income)
rs = matchSchemes({ age: 40, income: 800000, education: 'graduate', occupation: 'self_employed' });
assert.ok(ids(rs, 'eligible').includes('mudra') && ids(rs, 'eligible').includes('standup_india'));
const kmut = rs.find((r) => r.scheme.id === 'kmut');
assert.equal(kmut.status, 'almost');
assert.equal(kmut.percent, 50);
assert.match(kmut.unmet[0], /Family income/);

// Boundary: income exactly at the limit is eligible
rs = matchSchemes({ age: 21, income: 250000, education: 'none', occupation: 'homemaker' });
assert.equal(rs.find((r) => r.scheme.id === 'kmut').status, 'eligible');

// Documents are de-duplicated
const docs = collectDocuments(rs.filter((r) => r.status === 'eligible'));
assert.equal(new Set(docs.map((d) => d.id)).size, docs.length);

// Validation
assert.ok(validateProfile({ age: '', income: '1', education: 'none', occupation: 'student' }).errors.age);
assert.ok(validateProfile({ age: '30', income: '-5', education: 'none', occupation: 'student' }).errors.income);
assert.ok(validateProfile({ age: '30', income: '0', education: 'x', occupation: 'student' }).errors.education);
assert.ok(validateProfile({ age: '30', income: '0', education: 'none', occupation: 'student' }).profile);

console.log('All eligibility engine tests passed');
