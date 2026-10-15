import React from 'react';
import { CheckCircle, AlertTriangle, XCircle, X, ShieldCheck, ArrowRight, ExternalLink } from 'lucide-react';

const ModalEligibilityExplanation = ({ scheme, userProfile, isOpen, onClose, onApply }) => {
  if (!isOpen || !scheme) return null;

  // Run dynamic rule checks against user profile
  const ruleResults = scheme.ruleExplanation ? scheme.ruleExplanation.map(ruleObj => {
    const passed = ruleObj.check(userProfile);
    return {
      rule: ruleObj.rule,
      passed: passed
    };
  }) : [
    { rule: "Age criteria matched", passed: userProfile.age >= scheme.eligibilityCriteria.minAge },
    { rule: "Location resident requirement satisfied", passed: scheme.region === "National" || userProfile.location.includes("Tamil Nadu") },
    { rule: "Family income within limit", passed: userProfile.income <= scheme.eligibilityCriteria.maxIncome }
  ];

  const allPassed = ruleResults.every(r => r.passed);
  const somePassed = ruleResults.some(r => r.passed);

  let statusBadge = "Eligible";
  let statusColor = "#2ec4b6";
  let statusBg = "#e6fcf5";
  let StatusIcon = CheckCircle;

  if (allPassed) {
    statusBadge = "Eligible";
    statusColor = "#0ca678";
    statusBg = "#e6fcf5";
    StatusIcon = CheckCircle;
  } else if (somePassed) {
    statusBadge = "Possibly Eligible";
    statusColor = "#f59f00";
    statusBg = "#fff9db";
    StatusIcon = AlertTriangle;
  } else {
    statusBadge = "Not Eligible";
    statusColor = "#f03e3e";
    statusBg = "#ffe3e3";
    StatusIcon = XCircle;
  }

  return (
    <div className="modal-overlay">
      <div className="glass-card modal-container">
        <div className="modal-header">
          <div>
            <span className="scheme-cat-tag">{scheme.category}</span>
            <h2 style={{ marginTop: '6px' }}>Smart Eligibility Analysis</h2>
          </div>
          <button className="modal-close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          {/* Status Result Header */}
          <div 
            className="eligibility-status-banner" 
            style={{ background: statusBg, color: statusColor, padding: '16px 20px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}
          >
            <StatusIcon size={28} color={statusColor} />
            <div>
              <h3 style={{ margin: 0, color: statusColor }}>{statusBadge}</h3>
              <p style={{ margin: 0, fontSize: '0.88rem' }}>
                Evaluated for profile: <strong>{userProfile.name}</strong> (Age: {userProfile.age}, Income: ₹{userProfile.income.toLocaleString()})
              </p>
            </div>
          </div>

          <h4 style={{ marginBottom: '12px' }}>Detailed Rule Matching Breakdown:</h4>
          
          {/* Rules Checklist with WHY */}
          <ul className="rule-explanation-list" style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {ruleResults.map((res, i) => (
              <li 
                key={i} 
                style={{
                  padding: '10px 14px',
                  borderRadius: '8px',
                  background: res.passed ? '#f4fbf8' : '#fff5f5',
                  border: res.passed ? '1px solid #c3fae8' : '1px solid #ffe3e3',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: '0.92rem'
                }}
              >
                {res.passed ? (
                  <CheckCircle size={18} color="#0ca678" />
                ) : (
                  <XCircle size={18} color="#f03e3e" />
                )}
                <span style={{ fontWeight: '500', color: res.passed ? '#2b8a3e' : '#c92a2a' }}>
                  {res.passed ? "✓ " : "✗ "} {res.rule}
                </span>
              </li>
            ))}
          </ul>

          <div style={{ marginTop: '20px', background: '#f8f9fa', padding: '14px', borderRadius: '10px', fontSize: '0.88rem', color: '#555' }}>
            <strong>💡 Note:</strong> If any document condition is missing, you can upload certificates in the <a href="/documents" style={{ color: 'var(--primary)', fontWeight: 'bold' }}>Document Assistant</a> page for instant verification.
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-outline" onClick={onClose}>Close Analysis</button>
          <button 
            className="btn btn-primary"
            onClick={() => {
              onClose();
              onApply(scheme);
            }}
          >
            Start Application <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalEligibilityExplanation;
