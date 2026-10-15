import React, { useState } from 'react';
import { 
  FileText, 
  UploadCloud, 
  CheckCircle, 
  AlertTriangle, 
  Sparkles, 
  Check, 
  ShieldCheck, 
  User, 
  CreditCard,
  Edit2
} from 'lucide-react';

const DocumentsPage = ({ userProfile, setUserProfile }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [extractedData, setExtractedData] = useState(null);

  const documentChecklist = [
    { name: "Aadhaar Card (Aadhaar Seeded)", status: "Uploaded", badgeClass: "status-eligible" },
    { name: "Income Certificate (Annual Household < ₹2.5L)", status: "Uploaded", badgeClass: "status-eligible" },
    { name: "Community Certificate (BC/MBC/SC/ST)", status: "Uploaded", badgeClass: "status-eligible" },
    { name: "Bank Account Passbook (NPCI Mapped)", status: "Needs Verification", badgeClass: "status-possibly" },
    { name: "School 6th-12th Bonafide Transfer Certificate", status: "Required", badgeClass: "status-not" }
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
    }, 2000);
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
        <h2>Document Assistant & OCR Auto-Scanner</h2>
        <p className="subtitle-text">Manage required credentials for {userProfile.name} and extract details automatically using AI OCR.</p>
      </div>

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
                  <span className="sub-text">Format: PDF / JPG (Max 5MB)</span>
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
              Drag & drop document image or click button below to run mock OCR scanner
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
    </div>
  );
};

export default DocumentsPage;
