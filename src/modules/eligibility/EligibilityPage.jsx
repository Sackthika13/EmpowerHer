import { useState } from 'react';
import { Check, X, ExternalLink, Info } from 'lucide-react';
import { EDUCATION_LEVELS, OCCUPATIONS } from './schemesData.js';
import { matchSchemes, validateProfile, collectDocuments } from './eligibilityEngine.js';
import './eligibility.css';

const EMPTY = { age: '', income: '', education: '', occupation: '' };

function Field({ id, label, hint, error, children }) {
  return (
    <div className="eh-field">
      <label htmlFor={id}>{label}</label>
      {children}
      {hint && !error && <span className="eh-hint" id={`${id}-hint`}>{hint}</span>}
      {error && <span className="eh-error" id={`${id}-err`} role="alert">{error}</span>}
    </div>
  );
}

function SchemeCard({ result, defaultOpen }) {
  const { scheme, status, percent, met, unmet, documents } = result;
  const label = { eligible: 'Matches your profile', almost: 'One requirement missing', no: 'Not a match' }[status];

  return (
    <details className={`eh-card eh-${status}`} open={defaultOpen}>
      <summary>
        <span className="eh-card-title">
          <strong>{scheme.name}</strong>
          <small>{scheme.region} · {scheme.category}</small>
        </span>
        <span className="eh-badge">{label} · {percent}%</span>
      </summary>

      <div className="eh-card-body">
        <p className="eh-benefit">{scheme.benefit}</p>

        <h4>Why {status === 'eligible' ? 'you match' : 'this result'}</h4>
        <ul className="eh-reasons">
          {met.map((t) => (
            <li key={t}><Check size={16} aria-hidden="true" className="eh-ok" /><span>{t}</span></li>
          ))}
          {unmet.map((t) => (
            <li key={t}><X size={16} aria-hidden="true" className="eh-bad" /><span>{t}</span></li>
          ))}
        </ul>

        {status !== 'no' && (
          <>
            <h4>Documents you may need</h4>
            <ul className="eh-docs">
              {documents.map((d) => (
                <li key={d.id}><strong>{d.name}</strong>{d.tip && <span> — {d.tip}</span>}</li>
              ))}
            </ul>
          </>
        )}

        {scheme.note && <p className="eh-note"><Info size={14} aria-hidden="true" /> {scheme.note}</p>}

        <a className="eh-portal" href={scheme.portal} target="_blank" rel="noopener noreferrer">
          Open official portal <ExternalLink size={14} aria-hidden="true" />
        </a>
      </div>
    </details>
  );
}

export default function EligibilityPage() {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [results, setResults] = useState(null);
  const [checked, setChecked] = useState({});

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  function handleSubmit(e) {
    e.preventDefault();
    const { errors: errs, profile } = validateProfile(form);
    setErrors(errs);
    if (profile) {
      setResults(matchSchemes(profile));
      setChecked({});
    }
  }

  function handleReset() {
    setForm(EMPTY);
    setErrors({});
    setResults(null);
    setChecked({});
  }

  const eligible = results?.filter((r) => r.status === 'eligible') ?? [];
  const almost = results?.filter((r) => r.status === 'almost') ?? [];
  const others = results?.filter((r) => r.status === 'no') ?? [];
  const checklist = collectDocuments(eligible);
  const readyCount = checklist.filter((d) => checked[d.id]).length;

  return (
    <main className="eh-elig">
      <header className="eh-head">
        <h1>Find schemes you may qualify for</h1>
        <p>Tell us a little about yourself. We compare it with sample scheme rules and list the documents to prepare.</p>
      </header>

      <div className="eh-layout">
        <form className="eh-form" onSubmit={handleSubmit} noValidate>
          <Field id="age" label="Age (years)" error={errors.age}>
            <input id="age" type="number" inputMode="numeric" min="10" max="100"
              value={form.age} onChange={update('age')}
              aria-invalid={!!errors.age} aria-describedby={errors.age ? 'age-err' : undefined} />
          </Field>

          <Field id="income" label="Annual family income (₹)" hint="Total yearly income of everyone in your household." error={errors.income}>
            <input id="income" type="number" inputMode="numeric" min="0" step="1000"
              value={form.income} onChange={update('income')}
              aria-invalid={!!errors.income}
              aria-describedby={errors.income ? 'income-err' : 'income-hint'} />
          </Field>

          <Field id="education" label="Highest education completed" error={errors.education}>
            <select id="education" value={form.education} onChange={update('education')}
              aria-invalid={!!errors.education} aria-describedby={errors.education ? 'education-err' : undefined}>
              <option value="">Select…</option>
              {EDUCATION_LEVELS.map((e) => <option key={e.value} value={e.value}>{e.label}</option>)}
            </select>
          </Field>

          <Field id="occupation" label="Occupation" error={errors.occupation}>
            <select id="occupation" value={form.occupation} onChange={update('occupation')}
              aria-invalid={!!errors.occupation} aria-describedby={errors.occupation ? 'occupation-err' : undefined}>
              <option value="">Select…</option>
              {OCCUPATIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </Field>

          <div className="eh-actions">
            <button type="submit" className="eh-primary">Check my schemes</button>
            {results && <button type="button" className="eh-secondary" onClick={handleReset}>Start over</button>}
          </div>
        </form>

        <section className="eh-results" aria-live="polite">
          {!results && (
            <div className="eh-empty">
              <p>Your matching schemes will appear here after you fill in the form.</p>
            </div>
          )}

          {results && (
            <>
              <p className="eh-disclaimer">
                <Info size={16} aria-hidden="true" />
                <span>These are sample rules for demonstration. Final eligibility is decided by the department on the official portal, so confirm the criteria there before applying.</span>
              </p>

              <h2>{eligible.length > 0
                ? `${eligible.length} ${eligible.length === 1 ? 'scheme matches' : 'schemes match'} your profile`
                : 'No scheme fully matches your profile'}</h2>
              {eligible.map((r, i) => <SchemeCard key={r.scheme.id} result={r} defaultOpen={i === 0} />)}

              {almost.length > 0 && (
                <>
                  <h2>Close matches</h2>
                  <p className="eh-sub">You meet all but one requirement for these.</p>
                  {almost.map((r) => <SchemeCard key={r.scheme.id} result={r} />)}
                </>
              )}

              {checklist.length > 0 && (
                <section className="eh-checklist" aria-labelledby="eh-check-title">
                  <h2 id="eh-check-title">Documents to prepare</h2>
                  <p className="eh-sub">{readyCount} of {checklist.length} ready. Tick each one as you collect it.</p>
                  <ul>
                    {checklist.map((d) => (
                      <li key={d.id}>
                        <label>
                          <input type="checkbox" checked={!!checked[d.id]}
                            onChange={() => setChecked((c) => ({ ...c, [d.id]: !c[d.id] }))} />
                          <span>
                            <strong>{d.name}</strong>
                            <small>Needed for {d.neededFor.join(', ')}</small>
                          </span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {others.length > 0 && (
                <details className="eh-others">
                  <summary>Schemes that do not match ({others.length})</summary>
                  {others.map((r) => <SchemeCard key={r.scheme.id} result={r} />)}
                </details>
              )}
            </>
          )}
        </section>
      </div>
    </main>
  );
}
