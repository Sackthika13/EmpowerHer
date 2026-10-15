import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  FileText, 
  Sparkles, 
  ShieldCheck, 
  UploadCloud, 
  ArrowLeft 
} from 'lucide-react';
import { schemes } from '../data/SchemeDatabase';

const ApplySchemePage = ({ userProfile, onAddApplication }) => {
  const { schemeId } = useParams();
  const navigate = useNavigate();

  const scheme = schemes.find(s => s.id === schemeId) || schemes[0];

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedAppId, setSubmittedAppId] = useState(null);

  const [formData, setFormData] = useState({
    fullName: userProfile.name || '',
    phone: '9840192837',
    aadhaar: userProfile.aadhaarNo || '',
    rationCardNo: '33/08/98721',
    income: userProfile.income || 120000,
    education: userProfile.education || 'Graduate',
    documents: {
      aadhaar: true,
      incomeCert: true,
      passbook: true,
      schoolCert: false
    }
  });

  const handleNext = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const generatedId = `EMP-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      setSubmittedAppId(generatedId);

      const appRecord = {
        appId: generatedId,
        schemeTitle: scheme.title,
        applicantName: formData.fullName,
        submittedDate: new Date().toLocaleDateString(),
        status: "Submitted",
        currentTimelineStep: 1,
        logs: [
          `Submitted via Online Portal on ${new Date().toLocaleDateString()}`,
          "Automated Document OCR validation passed",
          "Forwarded to District Panchayat Nodal Officer"
        ]
      };

      onAddApplication(appRecord);
    }, 1500);
  };

  return (
    <div className="apply-scheme-page container">
      <button 
        className="btn btn-outline btn-sm" 
        onClick={() => navigate('/schemes')}
        style={{ marginBottom: '20px' }}
      >
        <ArrowLeft size={16} /> Back to Schemes Directory
      </button>

      {!submittedAppId ? (
        <div className="glass-card apply-wizard-card">
          <div className="apply-header">
            <span className="feature-pill-tag">Guided 5-Step Portal</span>
            <h2 style={{ marginTop: '4px' }}>Application for {scheme.title}</h2>
            <p className="subtitle-text">Step {currentStep} of 5 — {scheme.benefit}</p>
          </div>

          {/* Wizard Step Nodes */}
          <div className="wizard-progress-bar" style={{ borderRadius: '12px', marginTop: '20px' }}>
            {[
              "1. Personal Details",
              "2. Eligibility Check",
              "3. Document Upload",
              "4. Final Review",
              "5. Digital Submit"
            ].map((label, idx) => {
              const stepNum = idx + 1;
              const isDone = stepNum < currentStep;
              const isActive = stepNum === currentStep;
              return (
                <div 
                  key={idx} 
                  className={`wizard-step-node ${isActive ? 'active' : ''} ${isDone ? 'completed' : ''}`}
                  onClick={() => isDone && setCurrentStep(stepNum)}
                >
                  <div className="step-circle">{isDone ? <Check size={14} /> : stepNum}</div>
                  <span className="step-label">{label}</span>
                </div>
              );
            })}
          </div>

          <div className="wizard-body-panel" style={{ minHeight: '320px', padding: '30px 0' }}>
            {/* Step 1 */}
            {currentStep === 1 && (
              <div className="step-content-box">
                <h3>Step 1: Personal Details</h3>
                <div className="manual-form-grid" style={{ marginTop: '20px' }}>
                  <div className="form-group">
                    <label>Full Applicant Name</label>
                    <input 
                      type="text" 
                      className="form-input"
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Mobile Number (SMS Updates)</label>
                    <input 
                      type="text" 
                      className="form-input"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Aadhaar Card Number</label>
                    <input 
                      type="text" 
                      className="form-input"
                      value={formData.aadhaar}
                      onChange={(e) => setFormData({...formData, aadhaar: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2 */}
            {currentStep === 2 && (
              <div className="step-content-box">
                <h3>Step 2: Eligibility Verification Details</h3>
                <div className="manual-form-grid" style={{ marginTop: '20px' }}>
                  <div className="form-group">
                    <label>Smart Ration Card Number</label>
                    <input 
                      type="text" 
                      className="form-input"
                      value={formData.rationCardNo}
                      onChange={(e) => setFormData({...formData, rationCardNo: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Declared Family Income (₹)</label>
                    <input 
                      type="number" 
                      className="form-input"
                      value={formData.income}
                      onChange={(e) => setFormData({...formData, income: parseInt(e.target.value) || 0})}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {currentStep === 3 && (
              <div className="step-content-box">
                <h3>Step 3: Document Upload Checklist</h3>
                <div className="doc-upload-grid" style={{ marginTop: '20px' }}>
                  {scheme.documentsRequired.map((doc, i) => (
                    <div key={i} className="doc-upload-card uploaded">
                      <FileText size={20} color="var(--primary)" />
                      <div>
                        <strong>{doc}</strong>
                        <span className="doc-status-sub">✓ Verified in Profile</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4 */}
            {currentStep === 4 && (
              <div className="step-content-box">
                <h3>Step 4: Final Summary Review</h3>
                <div className="summary-review-card glass-card" style={{ marginTop: '16px', padding: '20px' }}>
                  <div className="review-row"><span>Applied Scheme:</span> <strong>{scheme.title}</strong></div>
                  <div className="review-row"><span>Applicant Name:</span> <strong>{formData.fullName}</strong></div>
                  <div className="review-row"><span>Aadhaar Number:</span> <strong>{formData.aadhaar}</strong></div>
                  <div className="review-row"><span>District:</span> <strong>{userProfile.location}</strong></div>
                </div>
              </div>
            )}

            {/* Step 5 */}
            {currentStep === 5 && (
              <div className="step-content-box text-center" style={{ padding: '20px' }}>
                <Sparkles size={48} color="var(--primary)" style={{ margin: '0 auto 16px' }} />
                <h3>Ready for Digital Submission</h3>
                <p style={{ color: '#666', maxWidth: '500px', margin: '0 auto 20px' }}>
                  Clicking confirm will generate your tracking application ID and route your profile to the Panchayat Nodal Verification Officer.
                </p>
              </div>
            )}
          </div>

          {/* Action Navigation Bar */}
          <div className="wizard-actions-bar" style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-light)', paddingTop: '20px' }}>
            <button 
              className="btn btn-outline"
              onClick={handlePrev}
              disabled={currentStep === 1 || isSubmitting}
            >
              <ChevronLeft size={16} /> Back
            </button>

            {currentStep < 5 ? (
              <button className="btn btn-primary" onClick={handleNext}>
                Continue to Step {currentStep + 1} <ChevronRight size={16} />
              </button>
            ) : (
              <button 
                className="btn btn-primary btn-large"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting Application..." : "Confirm & Submit Application"}
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Submission Success Screen */
        <div className="glass-card submit-success-card text-center" style={{ padding: '50px 30px' }}>
          <div className="success-icon-wrap" style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#e6fcf5', color: '#0ca678', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <Check size={44} />
          </div>

          <span className="app-id-badge" style={{ fontSize: '1rem', padding: '6px 18px' }}>
            Application ID: {submittedAppId}
          </span>

          <h2 style={{ marginTop: '16px' }}>Application Submitted Successfully!</h2>
          <p style={{ color: '#666', maxWidth: '540px', margin: '10px auto 30px' }}>
            Your application for <strong>{scheme.title}</strong> has been registered. You can monitor verification progress anytime in the Application Tracker.
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <button className="btn btn-primary" onClick={() => navigate('/tracker')}>
              Go to Application Tracker <ChevronRight size={16} />
            </button>
            <button className="btn btn-outline" onClick={() => navigate('/dashboard')}>
              Return to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplySchemePage;
