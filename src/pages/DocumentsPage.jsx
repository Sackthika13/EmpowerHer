import React, { useState } from 'react';
import { 
  FileText, 
  UploadCloud, 
  CheckCircle, 
  AlertTriangle, 
  Sparkles, 
  Check, 
  ShieldCheck, 
  HelpCircle,
  ExternalLink,
  Clock,
  MapPin,
  BookOpen,
  Edit2
} from 'lucide-react';

const DocumentsPage = ({ userProfile, setUserProfile }) => {
  const [activeTab, setActiveTab] = useState('checklist');
  const [isScanning, setIsScanning] = useState(false);
  const [extractedData, setExtractedData] = useState(null);

  const documentChecklist = [
    { name: "Aadhaar Card (Aadhaar Seeded)", status: "Uploaded", badgeClass: "status-eligible", requiredFor: "All Central & State Schemes" },
    { name: "Income Certificate (Annual Household < ₹2.5L)", status: "Uploaded", badgeClass: "status-eligible", requiredFor: "Pudhumai Penn, Magalir Urimai" },
    { name: "Community Certificate (BC/MBC/SC/ST)", status: "Uploaded", badgeClass: "status-eligible", requiredFor: "Fee waivers, Special Reservations" },
    { name: "Bank Account Passbook (NPCI Mapped)", status: "Needs Verification", badgeClass: "status-possibly", requiredFor: "Direct Benefit Transfer (DBT)" },
    { name: "School 6th-12th Bonafide Transfer Certificate", status: "Required", badgeClass: "status-not", requiredFor: "Penkalvi & Higher Education Grants" }
  ];

  const missingGuides = [
    {
      title: "Income Certificate (வருமானச் சான்றிதழ்)",
      purpose: "Required to prove annual family income is below ₹2,50,000 for government grants.",
      whereToApply: "Local e-Sevai Center / TN e-District Portal (tnesevai.tn.gov.in) or Tahsildar Office",
      fee: "₹60 (Government processing charge)",
      timeline: "7 to 15 business days",
      requiredProofs: [
        "Applicant's Aadhaar Card",
        "Ration Card / Smart Card",
        "Salary slip / VAO (Village Administrative Officer) statement",
        "Self-declaration affidavit"
      ],
      portalUrl: "https://www.tnesevai.tn.gov.in"
    },
    {
      title: "Community / Caste Certificate (சாதிச் சான்றிதழ்)",
      purpose: "Mandatory for BC, MBC, SC, and ST scholarship eligibility and loan subsidies.",
      whereToApply: "e-Sevai Center or Village Administrative Officer (VAO) Camp",
      fee: "₹60",
      timeline: "15 business days",
      requiredProofs: [
        "Aadhaar Card",
        "Parent's or Sibling's Community Certificate copy",
        "School Transfer Certificate (TC) mentioning caste",
        "Ration Card copy"
      ],
      portalUrl: "https://www.tnesevai.tn.gov.in"
    },
    {
      title: "First Graduate Certificate (முதல் பட்டதாரி சான்றிதழ்)",
      purpose: "Provides full tuition fee concession for first-generation college students.",
      whereToApply: "e-Sevai Center / Revenue Department (Tahsildar)",
      fee: "₹60",
      timeline: "15 to 20 business days",
      requiredProofs: [
        "10th & 12th Marksheets of Applicant",
        "Transfer Certificate (TC)",
        "Parents' and Siblings' Educational Status Self-Affidavit",
        "Ration Card & Family Tree Certificate from VAO"
      ],
      portalUrl: "https://www.tnesevai.tn.gov.in"
    },
    {
      title: "College Bonafide Certificate (கல்வி நிறுவனச் சான்றிதழ்)",
      purpose: "Proves current active enrollment in undergraduate, postgraduate, or diploma course.",
      whereToApply: "Principal / Administrative Office of your enrolled College / Polytechnic",
      fee: "Free / Nominal College Fee",
      timeline: "1 to 3 days",
      requiredProofs: [
        "College ID Card",
        "Current Semester Fee Receipt",
        "Written application to Head of Department"
      ],
      portalUrl: "#"
    }
  ];

  const jargonBuster = [
    {
      term: "Aadhaar Seeding vs. Aadhaar Linking",
      tamil: "ஆதார் சீடிங் மற்றும் ஆதார் இணைப்பு",
      explanation: "Linking only connects your Aadhaar for KYC identification. Seeding specifically connects your Aadhaar with the NPCI gateway so government money (DBT) directly credits into that bank account.",
      actionNeeded: "Visit your bank branch and submit the 'NPCI Aadhaar Mandate Form'."
    },
    {
      term: "NPCI / DBT Enabled Bank Account",
      tamil: "நேரடிப் பணப் பரிமாற்றம் (DBT) வங்கி கணக்கு",
      explanation: "Direct Benefit Transfer (DBT) allows government welfare funds to deposit straight into your savings account with zero delays and no middlemen.",
      actionNeeded: "Check DBT status by dialling *99*99*1# on your phone or ask at your bank."
    },
    {
      term: "Bonafide Certificate",
      tamil: "உண்மைச் சான்றிதழ்",
      explanation: "An official letter issued by your school or college principal certifying that you are currently studying there as a regular student.",
      actionNeeded: "Obtain it directly from your college administrative desk."
    },
    {
      term: "Smart Family Ration Card - Head of Family",
      tamil: "குடும்பத் தலைவி",
      explanation: "For schemes like Kalaignar Magalir Urimai Thittam, the woman must be listed as the family head on the Smart Ration card (or recognized as primary homemaker).",
      actionNeeded: "Verify your name is listed on tnpds.gov.in."
    }
  ];

  const handleSimulateOCRScan = (docType) => {
    setIsScanning(true);
    setExtractedData(null);

    setTimeout(() => {
      setIsScanning(false);
      setExtractedData({
        docType: docType,
        docNumber: docType === 'Aadhaar' ? '9872-4410-8924' : 'TN-INC-2026-9812',
        name: "Selvi K.",
        dob: "14/08/2004",
        address: "14/B, Vandavasi Road, Kanchipuram, Tamil Nadu",
        incomeExtracted: "₹1,20,000 / annum"
      });
    }, 1800);
  };

  const handleConfirmUpdate = () => {
    setUserProfile(prev => ({
      ...prev,
      name: extractedData.name,
      aadhaarNo: extractedData.docNumber,
      location: "Kanchipuram, Tamil Nadu",
      isOcrVerified: true,
      completeness: 95
    }));
    alert("Profile verified & auto-updated with document OCR data!");
    setExtractedData(null);
  };

  return (
    <div className="documents-page-container">
      <div className="page-header-title">
        <h2>Document Assistant & Smart Vault</h2>
        <p className="subtitle-text">
          Manage verification credentials for {userProfile.name}, auto-extract with AI OCR, and find simple guides to obtain missing certificates.
        </p>
      </div>

      {/* Tabs */}
      <div className="modal-tabs" style={{ marginTop: '24px' }}>
        <button 
          className={`tab-btn ${activeTab === 'checklist' ? 'active' : ''}`}
          onClick={() => setActiveTab('checklist')}
        >
          <FileText size={16} /> Document Checklist & AI OCR
        </button>
        <button 
          className={`tab-btn ${activeTab === 'missing' ? 'active' : ''}`}
          onClick={() => setActiveTab('missing')}
        >
          <HelpCircle size={16} /> How to Obtain Missing Documents
        </button>
        <button 
          className={`tab-btn ${activeTab === 'jargon' ? 'active' : ''}`}
          onClick={() => setActiveTab('jargon')}
        >
          <BookOpen size={16} /> Simple Language Explainer (Jargon Buster)
        </button>
      </div>

      {/* Tab 1: Checklist & OCR */}
      {activeTab === 'checklist' && (
        <div className="docs-split-grid" style={{ marginTop: '24px' }}>
          {/* Left: Required Documents Checklist */}
          <div className="glass-card docs-checklist-card">
            <h3><FileText size={20} color="var(--primary)" /> Required Documents Checklist</h3>
            <p className="sub-text" style={{ marginBottom: '16px' }}>Status across all matched welfare schemes</p>

            <div className="checklist-items-list">
              {documentChecklist.map((item, idx) => (
                <div key={idx} className="doc-check-item">
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.92rem' }}>{item.name}</strong>
                    <span className="sub-text" style={{ color: '#555' }}>Required for: {item.requiredFor}</span>
                  </div>
                  <span className={`status-badge ${item.badgeClass}`}>
                    {item.status === 'Uploaded' ? '✓ Uploaded' : item.status === 'Needs Verification' ? '⚠ Needs Verification' : '○ Required'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: OCR Scanner Interface */}
          <div className="glass-card ocr-scanner-card">
            <div className="title-with-icon" style={{ marginBottom: '16px' }}>
              <Sparkles size={22} color="var(--primary)" />
              <div>
                <h3>AI OCR Document Auto-Extractor</h3>
                <p className="sub-text">Upload Aadhaar or Income Cert for instant auto-filling</p>
              </div>
            </div>

            <div className="ocr-upload-dropzone">
              <UploadCloud size={44} color="var(--primary)" style={{ margin: '0 auto 12px' }} />
              <h4>Upload Aadhaar or Income Certificate</h4>
              <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '16px' }}>
                Drag & drop document image or click buttons below to run AI OCR scanner
              </p>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <button 
                  className="btn btn-primary btn-sm"
                  onClick={() => handleSimulateOCRScan('Aadhaar')}
                  disabled={isScanning}
                >
                  Scan Aadhaar Card
                </button>
                <button 
                  className="btn btn-outline btn-sm"
                  onClick={() => handleSimulateOCRScan('Income Cert')}
                  disabled={isScanning}
                >
                  Scan Income Certificate
                </button>
              </div>
            </div>

            {isScanning && (
              <div className="scanning-animation-box" style={{ marginTop: '20px' }}>
                <div className="ocr-scan-line"></div>
                <p style={{ marginTop: '12px', fontWeight: '700', color: 'var(--primary)', textAlign: 'center' }}>
                  🔍 AI OCR Scanning document... Extracting name, DOB, and ID number...
                </p>
              </div>
            )}

            {extractedData && (
              <div className="extracted-results-box glass-card" style={{ marginTop: '20px', padding: '20px', background: '#f4fbf8', border: '1px solid #2ec4b6' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#0ca678', marginBottom: '12px' }}>
                  <CheckCircle size={20} />
                  <strong>Extracted Information ({extractedData.docType})</strong>
                </div>

                <div className="extracted-row"><span>Document No:</span> <strong>{extractedData.docNumber}</strong></div>
                <div className="extracted-row"><span>Name:</span> <strong>{extractedData.name}</strong></div>
                <div className="extracted-row"><span>DOB:</span> <strong>{extractedData.dob}</strong></div>
                <div className="extracted-row"><span>Address:</span> <strong>{extractedData.address}</strong></div>

                <div style={{ marginTop: '16px', display: 'flex', gap: '10px' }}>
                  <button className="btn btn-primary btn-sm" onClick={handleConfirmUpdate}>
                    <Check size={14} /> Confirm & Update Profile
                  </button>
                  <button className="btn btn-outline btn-sm" onClick={() => alert("Form opened for manual editing.")}>
                    <Edit2 size={14} /> Edit Details
                  </button>
                </div>
              </div>
            )}

            <p style={{ fontSize: '0.78rem', color: '#888', marginTop: '20px', textAlign: 'center' }}>
              🔒 Privacy Protection: Demo mode uses simulated sample documents. No actual personal Aadhaar files are permanently stored on cloud servers.
            </p>
          </div>
        </div>
      )}

      {/* Tab 2: How to Obtain Missing Documents */}
      {activeTab === 'missing' && (
        <div className="missing-docs-section" style={{ marginTop: '24px' }}>
          <div className="alert-box alert-info" style={{ marginBottom: '24px' }}>
            <ShieldCheck size={20} color="var(--primary)" />
            <span>
              <strong>Missing a Certificate?</strong> Don't let paperwork stop your application! Follow these verified step-by-step government guidelines to get your certificates issued quickly.
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            {missingGuides.map((guide, idx) => (
              <div key={idx} className="glass-card hover-lift" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ color: 'var(--primary)', marginBottom: '8px', fontSize: '1.1rem' }}>{guide.title}</h3>
                  <p style={{ fontSize: '0.88rem', color: '#555', marginBottom: '14px' }}>{guide.purpose}</p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem', marginBottom: '16px' }}>
                    <div><strong>📍 Where to apply:</strong> {guide.whereToApply}</div>
                    <div><strong>💰 Official Fee:</strong> {guide.fee}</div>
                    <div><strong>⏱️ Expected Timeline:</strong> {guide.timeline}</div>
                  </div>

                  <div style={{ background: '#f8f9fa', padding: '12px', borderRadius: '8px', marginBottom: '16px' }}>
                    <strong style={{ fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>Mandatory Proofs Needed:</strong>
                    <ul style={{ paddingLeft: '18px', margin: 0, fontSize: '0.82rem', color: '#444' }}>
                      {guide.requiredProofs.map((p, i) => (
                        <li key={i} style={{ marginBottom: '4px' }}>{p}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {guide.portalUrl !== '#' && (
                  <a 
                    href={guide.portalUrl} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="btn btn-outline btn-sm"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                  >
                    Open e-Sevai Portal <ExternalLink size={14} />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Simple Language Explainer */}
      {activeTab === 'jargon' && (
        <div className="jargon-section" style={{ marginTop: '24px' }}>
          <div className="alert-box alert-success" style={{ marginBottom: '24px' }}>
            <CheckCircle size={20} color="#0ca678" />
            <span>
              <strong>Plain Language Assistant:</strong> Government scheme notices use complex terms. Here is what they actually mean in simple words!
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
            {jargonBuster.map((item, idx) => (
              <div key={idx} className="glass-card" style={{ padding: '22px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                  <h3 style={{ margin: 0, color: 'var(--primary)', fontSize: '1.05rem' }}>{item.term}</h3>
                  <span style={{ background: 'var(--secondary-light)', color: 'var(--secondary)', padding: '4px 10px', borderRadius: '12px', fontSize: '0.82rem', fontWeight: 'bold' }}>
                    {item.tamil}
                  </span>
                </div>

                <p style={{ margin: '12px 0', fontSize: '0.92rem', color: '#333', lineHeight: '1.5' }}>
                  {item.explanation}
                </p>

                <div style={{ background: '#eefcf6', padding: '10px 14px', borderRadius: '8px', borderLeft: '4px solid #0ca678', fontSize: '0.88rem' }}>
                  <strong>👉 What you need to do:</strong> {item.actionNeeded}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentsPage;
