import React, { useState } from 'react';
import { 
  X, 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  UploadCloud, 
  FileText, 
  HelpCircle, 
  CheckCircle, 
  Sparkles,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

const GuidedApplicationModal = ({ 
  scheme, 
  isOpen, 
  onClose, 
  userProfile, 
  onSubmitSuccess 
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showDocumentAssistant, setShowDocumentAssistant] = useState(false);
  const [formData, setFormData] = useState({
    fullName: userProfile.name || '',
    phone: '9840192837',
    aadhaar: userProfile.aadhaarNo || '',
    familyHead: 'Selvi K. (Self)',
    familyIncome: userProfile.income || 120000,
    rationCardNo: '33/08/98721',
    uploadedDocs: {
      aadhaar: true,
      incomeCert: true,
      bankPassbook: false,
      bonafide: true
    }
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !scheme) return null;

  const handleNextStep = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const toggleDocUpload = (docKey) => {
    setFormData(prev => ({
      ...prev,
      uploadedDocs: {
        ...prev.uploadedDocs,
        [docKey]: !prev.uploadedDocs[docKey]
      }
    }));
  };

  const handleFinalSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const appRecord = {
        appId: `EMP-${Math.floor(100000 + Math.random() * 900000)}`,
        schemeTitle: scheme.title,
        applicantName: formData.fullName,
        submittedDate: new Date().toLocaleDateString(),
        status: 'Applied',
        currentTimelineStep: 1,
        logs: [
          `Submitted online application on ${new Date().toLocaleDateString()}`,
          'Document automated OCR validation complete',
          'Forwarded to Panchayat Nodal Officer for physical verification'
        ]
      };
      onSubmitSuccess(appRecord);
      onClose();
    }, 1800);
  };

  return (
    <div className="modal-overlay">
      <div className="glass-card modal-container modal-large">
        <div className="modal-header">
          <div>
            <span className="feature-pill-tag">Guided Application Wizard</span>
            <h2 style={{ marginTop: '5px' }}>{scheme.title}</h2>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              className="btn btn-outline btn-sm"
              onClick={() => setShowDocumentAssistant(!showDocumentAssistant)}
            >
              <HelpCircle size={15} /> Document Assistant
            </button>
            <button className="modal-close-btn" onClick={onClose}><X size={20} /></button>
          </div>
        </div>

        {/* Step Indicator Wizard Bar */}
        <div className="wizard-progress-bar">
          {[
            "1. Personal Details",
            "2. Family Details",
            "3. Income Details",
            "4. Upload Documents",
            "5. Review & Submit"
          ].map((label, idx) => {
            const stepNum = idx + 1;
            const isCompleted = stepNum < currentStep;
            const isActive = stepNum === currentStep;
            return (
              <div 
                key={idx} 
                className={`wizard-step-node ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                onClick={() => isCompleted && setCurrentStep(stepNum)}
              >
                <div className="step-circle">
                  {isCompleted ? <Check size={14} /> : stepNum}
                </div>
                <span className="step-label">{label}</span>
              </div>
            );
          })}
        </div>

        {/* Document Assistant Drawer Toggle */}
        {showDocumentAssistant && (
          <div className="document-assistant-drawer alert-box alert-info">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 style={{ margin: 0 }}><FileText size={16} color="var(--primary)" /> Document Assistant Guide</h4>
              <button 
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                onClick={() => setShowDocumentAssistant(false)}
              >
                ✕
              </button>
            </div>
            <p style={{ margin: '8px 0 12px', fontSize: '0.9rem' }}>
              {scheme.documentGuide || "Ensure your Aadhaar is linked to your bank account via NPCI for direct benefit transfer."}
            </p>
            <ul className="mini-bullet-list">
              <li><strong>Missing Income Certificate?</strong> Visit your nearest e-Sevai centre with smart card or apply via tnesevai.tn.gov.in</li>
              <li><strong>Simple Language Explanation:</strong> Benefits are credited directly to your bank account without middlemen.</li>
            </ul>
          </div>
        )}

        <div className="modal-body" style={{ minHeight: '320px' }}>
          {/* Step 1: Personal Details */}
          {currentStep === 1 && (
            <div className="step-content">
              <h3>Step 1: Applicant Personal Details</h3>
              <p className="subtitle-text">Pre-filled from verified user profile & document scan.</p>
              
              <div className="manual-form-grid" style={{ marginTop: '20px' }}>
                <div className="form-group">
                  <label>Full Name (as per Aadhaar)</label>
                  <input 
                    type="text" 
                    className="form-input"
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Mobile Number (for SMS Tracking Updates)</label>
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
                <div className="form-group">
                  <label>State / Region</label>
                  <input 
                    type="text" 
                    className="form-input"
                    value={userProfile.location}
                    readOnly
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Family Details */}
          {currentStep === 2 && (
            <div className="step-content">
              <h3>Step 2: Family & Residence Info</h3>
              <p className="subtitle-text">Details required for family welfare classification.</p>
              
              <div className="manual-form-grid" style={{ marginTop: '20px' }}>
                <div className="form-group">
                  <label>Smart Family Card (Ration Card Number)</label>
                  <input 
                    type="text" 
                    className="form-input"
                    value={formData.rationCardNo}
                    onChange={(e) => setFormData({...formData, rationCardNo: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Head of Household Name</label>
                  <input 
                    type="text" 
                    className="form-input"
                    value={formData.familyHead}
                    onChange={(e) => setFormData({...formData, familyHead: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Panchayat / Local Ward Number</label>
                  <input 
                    type="text" 
                    className="form-input"
                    defaultValue="Kanchipuram Block - Ward 12"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Income Details */}
          {currentStep === 3 && (
            <div className="step-content">
              <h3>Step 3: Income & Occupation Declaration</h3>
              <p className="subtitle-text">Used by rule engine to verify grant criteria.</p>
              
              <div className="manual-form-grid" style={{ marginTop: '20px' }}>
                <div className="form-group">
                  <label>Annual Household Income (₹)</label>
                  <input 
                    type="number" 
                    className="form-input"
                    value={formData.familyIncome}
                    onChange={(e) => setFormData({...formData, familyIncome: parseInt(e.target.value) || 0})}
                  />
                </div>
                <div className="form-group">
                  <label>Primary Occupation</label>
                  <input 
                    type="text" 
                    className="form-input"
                    value={userProfile.occupation}
                    readOnly
                  />
                </div>
              </div>

              <div className="alert-box alert-success" style={{ marginTop: '20px' }}>
                <CheckCircle size={18} color="#2ec4b6" />
                <span>
                  Income criteria check: Your income of <strong>₹{formData.familyIncome.toLocaleString()}</strong> is below the maximum threshold of <strong>₹{scheme.eligibilityCriteria.maxIncome.toLocaleString()}</strong>!
                </span>
              </div>
            </div>
          )}

          {/* Step 4: Upload Documents */}
          {currentStep === 4 && (
            <div className="step-content">
              <h3>Step 4: Upload Mandatory Documents</h3>
              <p className="subtitle-text">Our auto OCR scanner checks uploaded file completeness.</p>
              
              <div className="doc-upload-grid" style={{ marginTop: '20px' }}>
                {scheme.documentsRequired.map((docTitle, idx) => {
                  const docKey = idx === 0 ? 'aadhaar' : idx === 1 ? 'incomeCert' : idx === 2 ? 'bankPassbook' : 'bonafide';
                  const isUploaded = formData.uploadedDocs[docKey];
                  return (
                    <div key={idx} className={`doc-upload-card ${isUploaded ? 'uploaded' : ''}`}>
                      <div className="doc-info">
                        <FileText size={20} color="var(--primary)" />
                        <div>
                          <strong>{docTitle}</strong>
                          <span className="doc-status-sub">
                            {isUploaded ? "✓ Verified & Uploaded" : "Pending Upload"}
                          </span>
                        </div>
                      </div>

                      <button 
                        className={`btn ${isUploaded ? 'btn-outline' : 'btn-primary'} btn-sm`}
                        onClick={() => toggleDocUpload(docKey)}
                      >
                        {isUploaded ? "Re-upload" : "Upload File"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 5: Review & Submit */}
          {currentStep === 5 && (
            <div className="step-content">
              <h3>Step 5: Final Review & Application Submission</h3>
              <p className="subtitle-text">Review your application summary before digital submission.</p>

              <div className="summary-review-card glass-card" style={{ marginTop: '20px', padding: '20px' }}>
                <div className="review-row">
                  <span>Applied Scheme:</span> <strong>{scheme.title}</strong>
                </div>
                <div className="review-row">
                  <span>Applicant Name:</span> <strong>{formData.fullName}</strong>
                </div>
                <div className="review-row">
                  <span>Aadhaar Number:</span> <strong>{formData.aadhaar}</strong>
                </div>
                <div className="review-row">
                  <span>Income & District:</span> <strong>₹{formData.familyIncome.toLocaleString()} / {userProfile.location}</strong>
                </div>
                <div className="review-row">
                  <span>Uploaded Documents:</span> <strong>4 of 4 Files Verified</strong>
                </div>
              </div>

              <div className="alert-box alert-info" style={{ marginTop: '15px' }}>
                <ShieldCheck size={18} color="var(--primary)" />
                <span>
                  By submitting, your application will be assigned an automated tracking ID (e.g. EMP-2026-XXXX) and synced with the Panchayat & e-Sevai portal.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation Controls */}
        <div className="modal-footer" style={{ justifyContent: 'space-between' }}>
          <button 
            className="btn btn-outline" 
            onClick={handlePrevStep}
            disabled={currentStep === 1 || isSubmitting}
          >
            <ChevronLeft size={16} /> Back
          </button>

          {currentStep < 5 ? (
            <button className="btn btn-primary" onClick={handleNextStep}>
              Continue to Step {currentStep + 1} <ChevronRight size={16} />
            </button>
          ) : (
            <button 
              className="btn btn-primary btn-large"
              onClick={handleFinalSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="spinner-sm"></div> Submitting Application...
                </>
              ) : (
                <>
                  <Sparkles size={18} /> Confirm & Submit Application
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GuidedApplicationModal;
