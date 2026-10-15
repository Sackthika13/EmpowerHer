import React, { useState } from 'react';
import { 
  X, 
  UploadCloud, 
  FileCheck, 
  CheckCircle, 
  Sparkles, 
  User, 
  Briefcase, 
  GraduationCap, 
  CreditCard, 
  MapPin, 
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

const UserProfileOCR = ({ isOpen, onClose, userProfile, setUserProfile }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [ocrSuccess, setOcrSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('ocr');

  if (!isOpen) return null;

  const handleSimulateOCR = () => {
    setIsScanning(true);
    setOcrSuccess(false);

    setTimeout(() => {
      setIsScanning(false);
      setOcrSuccess(true);
      
      // Auto fill verified profile data extracted via mock OCR
      setUserProfile(prev => ({
        ...prev,
        name: "Selvi K.",
        aadhaarNo: "XXXX-XXXX-8924",
        age: 22,
        education: "Undergraduate (B.Sc Computer Science - 3rd Year)",
        income: 120000,
        occupation: "Student / Freelancer",
        familyStatus: "Single",
        location: "Kanchipuram, Tamil Nadu",
        category: "BC",
        isOcrVerified: true,
        completeness: 95
      }));
    }, 2200);
  };

  const handleInputChange = (field, value) => {
    setUserProfile(prev => {
      const updated = { ...prev, [field]: value };
      // recalculate completeness
      let filled = 0;
      const totalFields = 7;
      if (updated.name) filled++;
      if (updated.age) filled++;
      if (updated.education) filled++;
      if (updated.income) filled++;
      if (updated.occupation) filled++;
      if (updated.location) filled++;
      if (updated.aadhaarNo) filled++;
      updated.completeness = Math.round((filled / totalFields) * 100);
      return updated;
    });
  };

  return (
    <div className="modal-overlay">
      <div className="glass-card modal-container modal-large">
        <div className="modal-header">
          <div className="title-with-icon">
            <Sparkles size={24} color="var(--primary)" />
            <div>
              <h2>Create & Verify User Profile</h2>
              <p className="subtitle-text">Manual Data Input & AI Document OCR Auto-Extraction</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose}><X size={20} /></button>
        </div>

        {/* Tab Selection */}
        <div className="modal-tabs">
          <button 
            className={`tab-btn ${activeTab === 'ocr' ? 'active' : ''}`}
            onClick={() => setActiveTab('ocr')}
          >
            <UploadCloud size={16} /> Instant Document OCR Scan
          </button>
          <button 
            className={`tab-btn ${activeTab === 'manual' ? 'active' : ''}`}
            onClick={() => setActiveTab('manual')}
          >
            <User size={16} /> Manual Profile Details
          </button>
        </div>

        <div className="modal-body">
          {/* Completeness Bar */}
          <div className="completeness-bar-container">
            <div className="completeness-header">
              <span>Profile Completeness & Data Validation</span>
              <strong style={{ color: 'var(--primary)' }}>{userProfile.completeness}% Ready</strong>
            </div>
            <div className="progress-track">
              <div 
                className="progress-fill" 
                style={{ width: `${userProfile.completeness}%` }}
              ></div>
            </div>
          </div>

          {activeTab === 'ocr' ? (
            <div className="ocr-section">
              <div className="ocr-card">
                <div className="ocr-icon-circle">
                  <UploadCloud size={36} color="var(--primary)" />
                </div>
                <h3>Scan Aadhaar / Income / Govt Document</h3>
                <p style={{ color: '#666', fontSize: '0.95rem', maxWidth: '450px', margin: '0 auto 20px' }}>
                  Our AI OCR automatically reads name, age, address, and Aadhaar number to verify your data instantly without manual typing.
                </p>

                <div className="ocr-upload-actions">
                  <button 
                    className="btn btn-primary btn-large"
                    onClick={() => handleSimulateOCR('Aadhaar')}
                    disabled={isScanning}
                  >
                    {isScanning ? (
                      <>
                        <div className="spinner-sm"></div>
                        Scanning Document with AI OCR...
                      </>
                    ) : (
                      <>
                        <Sparkles size={18} /> Upload & Scan Aadhaar Card
                      </>
                    )}
                  </button>
                  <button 
                    className="btn btn-outline"
                    onClick={() => handleSimulateOCR('Income')}
                    disabled={isScanning}
                  >
                    Scan Income Certificate
                  </button>
                </div>

                {isScanning && (
                  <div className="scanning-animation-box">
                    <div className="ocr-scan-line"></div>
                    <p style={{ marginTop: '15px', fontWeight: '600', color: 'var(--primary)' }}>
                      🔍 Scanning document image... Validating Aadhaar checksum & extracting text fields...
                    </p>
                  </div>
                )}

                {ocrSuccess && (
                  <div className="alert-box alert-success" style={{ marginTop: '20px' }}>
                    <CheckCircle size={20} color="#2ec4b6" />
                    <div>
                      <strong>Document OCR Verified Successfully!</strong>
                      <p style={{ margin: 0, fontSize: '0.88rem' }}>
                        Extracted Name: <b>Selvi K.</b> | Aadhaar: <b>XXXX-XXXX-8924</b> | Location: <b>Kanchipuram, TN</b>
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Data Validation Check list */}
              <div className="validation-checklist">
                <h4><ShieldCheck size={18} color="var(--primary)" /> Data Validation & Analysis Rules</h4>
                <ul className="check-grid">
                  <li className="checked"><CheckCircle size={14} color="#2ec4b6" /> Age & DOB Verification</li>
                  <li className="checked"><CheckCircle size={14} color="#2ec4b6" /> Annual Household Income Proof</li>
                  <li className="checked"><CheckCircle size={14} color="#2ec4b6" /> Location & Residence State Check</li>
                  <li className="checked"><CheckCircle size={14} color="#2ec4b6" /> Educational Qualifications</li>
                  <li className="checked"><CheckCircle size={14} color="#2ec4b6" /> Occupation & Community Category</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="manual-form-grid">
              <div className="form-group">
                <label><User size={14} /> Full Name</label>
                <input 
                  type="text" 
                  className="form-input"
                  value={userProfile.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter full name"
                />
              </div>

              <div className="form-group">
                <label><CreditCard size={14} /> Aadhaar / ID Number</label>
                <input 
                  type="text" 
                  className="form-input"
                  value={userProfile.aadhaarNo}
                  onChange={(e) => handleInputChange('aadhaarNo', e.target.value)}
                  placeholder="XXXX-XXXX-1234"
                />
              </div>

              <div className="form-group">
                <label>Age</label>
                <input 
                  type="number" 
                  className="form-input"
                  value={userProfile.age}
                  onChange={(e) => handleInputChange('age', parseInt(e.target.value) || '')}
                  placeholder="22"
                />
              </div>

              <div className="form-group">
                <label><GraduationCap size={14} /> Education</label>
                <select 
                  className="form-input"
                  value={userProfile.education}
                  onChange={(e) => handleInputChange('education', e.target.value)}
                >
                  <option>Passed 10th</option>
                  <option>Passed 12th (Govt School)</option>
                  <option>Undergraduate (B.Sc / B.E / B.Com)</option>
                  <option>Postgraduate / Diploma</option>
                  <option>No Formal Education</option>
                </select>
              </div>

              <div className="form-group">
                <label>Annual Family Income (₹)</label>
                <input 
                  type="number" 
                  className="form-input"
                  value={userProfile.income}
                  onChange={(e) => handleInputChange('income', parseInt(e.target.value) || 0)}
                  placeholder="120000"
                />
              </div>

              <div className="form-group">
                <label><Briefcase size={14} /> Occupation</label>
                <select 
                  className="form-input"
                  value={userProfile.occupation}
                  onChange={(e) => handleInputChange('occupation', e.target.value)}
                >
                  <option>Student</option>
                  <option>Homemaker / Unorganized Worker</option>
                  <option>Self-Employed / Entrepreneur</option>
                  <option>Artisan / Handloom</option>
                  <option>Unemployed</option>
                </select>
              </div>

              <div className="form-group">
                <label><MapPin size={14} /> Location / State</label>
                <input 
                  type="text" 
                  className="form-input"
                  value={userProfile.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="District, State"
                />
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn btn-outline" onClick={onClose}>Close</button>
          <button className="btn btn-primary" onClick={onClose}>
            <FileCheck size={16} /> Save & Apply to Schemes
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfileOCR;
