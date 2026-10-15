import React, { useState } from 'react';
import { 
  Building2, 
  UserPlus, 
  Printer, 
  ShieldCheck, 
  FileText, 
  Search, 
  CheckCircle, 
  Clock, 
  QrCode,
  Download,
  AlertCircle
} from 'lucide-react';
import { schemes } from '../data/SchemeDatabase';

const PanchayatPage = ({ onAddApplication }) => {
  const [activeTab, setActiveTab] = useState('register');
  const [registeredList, setRegisteredList] = useState([
    { 
      appId: "EMP-PAN-8812", 
      name: "Mariammal T.", 
      village: "Melur Panchayat - Ward 2", 
      status: "Verified by Officer", 
      age: 48, 
      aadhaar: "XXXX-XXXX-9912", 
      scheme: "Kalaignar Magalir Urimai Thittam",
      date: "2026-10-10",
      category: "MBC",
      income: "₹72,000"
    },
    { 
      appId: "EMP-PAN-8813", 
      name: "Kavitha R.", 
      village: "Perumalpattu Panchayat", 
      status: "Submitted to District Office", 
      age: 24, 
      aadhaar: "XXXX-XXXX-4482", 
      scheme: "Pudhumai Penn Higher Education Grant",
      date: "2026-10-12",
      category: "BC",
      income: "₹1,10,000"
    },
    { 
      appId: "EMP-PAN-8814", 
      name: "Lakshmi Narayanan", 
      village: "Kanchipuram Rural - Ward 5", 
      status: "Biometric Verified", 
      age: 38, 
      aadhaar: "XXXX-XXXX-3310", 
      scheme: "SEWA Self-Help Livelihood Grant",
      date: "2026-10-14",
      category: "SC",
      income: "₹65,000"
    }
  ]);

  const [newReg, setNewReg] = useState({
    name: '',
    village: 'Kanchipuram Panchayat - Ward 4',
    age: '',
    aadhaar: '',
    income: 80000,
    occupation: 'Homemaker / Daily Wage',
    selectedScheme: schemes[0].id,
    phone: '',
    category: 'BC'
  });

  const [printReceipt, setPrintReceipt] = useState(null);
  const [successToast, setSuccessToast] = useState(null);

  const handleCreateRegistration = (e) => {
    e.preventDefault();
    if (!newReg.name || !newReg.aadhaar) return;

    const matchedScheme = schemes.find(s => s.id === newReg.selectedScheme) || schemes[0];
    const generatedId = `EMP-PAN-${Math.floor(1000 + Math.random() * 9000)}`;

    const newRecord = {
      appId: generatedId,
      name: newReg.name,
      village: newReg.village,
      status: "Submitted by Panchayat Staff",
      age: parseInt(newReg.age) || 28,
      aadhaar: newReg.aadhaar.startsWith('XXXX') ? newReg.aadhaar : `XXXX-XXXX-${newReg.aadhaar.slice(-4) || '1234'}`,
      scheme: matchedScheme.title,
      date: new Date().toISOString().split('T')[0],
      category: newReg.category,
      income: `₹${parseInt(newReg.income).toLocaleString('en-IN')}`
    };

    setRegisteredList([newRecord, ...registeredList]);
    setPrintReceipt(newRecord);
    setSuccessToast(`Beneficiary ${newReg.name} registered successfully! Application ID: ${generatedId}`);

    if (onAddApplication) {
      onAddApplication({
        appId: generatedId,
        schemeTitle: matchedScheme.title,
        applicantName: newReg.name,
        submittedDate: newRecord.date,
        status: "Panchayat Assisted - Submitted",
        currentTimelineStep: 1,
        logs: [
          `Registered via Kanchipuram Panchayat Kiosk on ${newRecord.date}`,
          "Assisted by Panchayat Nodal Officer (Staff ID: TN-PAN-092)",
          "Biometric & document physical check completed"
        ]
      });
    }

    setNewReg({
      name: '',
      village: 'Kanchipuram Panchayat - Ward 4',
      age: '',
      aadhaar: '',
      income: 80000,
      occupation: 'Homemaker / Daily Wage',
      selectedScheme: schemes[0].id,
      phone: '',
      category: 'BC'
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="panchayat-page-container">
      {/* Top Header */}
      <div className="dash-welcome-banner glass-card" style={{ background: 'linear-gradient(135deg, #49108b, #7012ce, #ff4d6d)', color: 'white' }}>
        <div className="welcome-text">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <Building2 size={28} color="white" />
            <h1 style={{ color: 'white', margin: 0 }}>Panchayat & CSC Staff Assisted Portal</h1>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.9)', margin: 0 }}>
            Dedicated kiosk mode to assist women with no smartphone or internet access. Register applicants, run scheme matching, and print official receipts.
          </p>
        </div>
        <div className="kiosk-badge" style={{ background: 'rgba(255,255,255,0.2)', padding: '8px 16px', borderRadius: '30px', fontWeight: 'bold' }}>
          🏛️ Officer Node: TN-KPM-04
        </div>
      </div>

      {successToast && (
        <div className="alert-box alert-success" style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle size={18} color="#0ca678" />
            <span>{successToast}</span>
          </div>
          <button className="btn btn-sm btn-outline" onClick={() => setSuccessToast(null)}>Dismiss</button>
        </div>
      )}

      {/* Tabs */}
      <div className="modal-tabs" style={{ marginTop: '24px' }}>
        <button 
          className={`tab-btn ${activeTab === 'register' ? 'active' : ''}`}
          onClick={() => setActiveTab('register')}
        >
          <UserPlus size={16} /> Register Walk-in Beneficiary
        </button>
        <button 
          className={`tab-btn ${activeTab === 'records' ? 'active' : ''}`}
          onClick={() => setActiveTab('records')}
        >
          <FileText size={16} /> Village Applications Database ({registeredList.length})
        </button>
      </div>

      {/* Register Tab */}
      {activeTab === 'register' && (
        <div className="glass-card" style={{ marginTop: '20px', padding: '28px' }}>
          <div className="alert-box alert-info" style={{ marginBottom: '24px' }}>
            <ShieldCheck size={20} color="var(--primary)" />
            <span>
              <strong>Assisted Kiosk Service:</strong> Complete the beneficiary details below on behalf of the applicant. The system will auto-verify basic eligibility criteria and generate an official physical slip with an application reference ID.
            </span>
          </div>

          <form onSubmit={handleCreateRegistration}>
            <div className="manual-form-grid">
              <div className="form-group">
                <label>Beneficiary Full Name *</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Kasthuri M."
                  required
                  value={newReg.name}
                  onChange={(e) => setNewReg({ ...newReg, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Aadhaar Number (12 digits) *</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. 5421 8940 2311"
                  required
                  value={newReg.aadhaar}
                  onChange={(e) => setNewReg({ ...newReg, aadhaar: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Age *</label>
                <input 
                  type="number" 
                  className="form-input" 
                  placeholder="e.g. 24"
                  required
                  value={newReg.age}
                  onChange={(e) => setNewReg({ ...newReg, age: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Panchayat / Village Ward *</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={newReg.village}
                  onChange={(e) => setNewReg({ ...newReg, village: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Annual Household Income (₹) *</label>
                <input 
                  type="number" 
                  className="form-input" 
                  value={newReg.income}
                  onChange={(e) => setNewReg({ ...newReg, income: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Social Category</label>
                <select 
                  className="form-select"
                  value={newReg.category}
                  onChange={(e) => setNewReg({ ...newReg, category: e.target.value })}
                >
                  <option value="SC">SC (Scheduled Caste)</option>
                  <option value="ST">ST (Scheduled Tribe)</option>
                  <option value="MBC">MBC (Most Backward Class)</option>
                  <option value="BC">BC (Backward Class)</option>
                  <option value="General">General / Others</option>
                </select>
              </div>

              <div className="form-group" style={{ gridColumn: 'span 2' }}>
                <label>Select Target Welfare Scheme *</label>
                <select 
                  className="form-select"
                  value={newReg.selectedScheme}
                  onChange={(e) => setNewReg({ ...newReg, selectedScheme: e.target.value })}
                >
                  {schemes.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.title} — {s.benefit} ({s.category})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Applicant Contact Number (Self / Relative)</label>
                <input 
                  type="tel" 
                  className="form-input" 
                  placeholder="e.g. 98401 23456"
                  value={newReg.phone}
                  onChange={(e) => setNewReg({ ...newReg, phone: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Occupation / Livelihood</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={newReg.occupation}
                  onChange={(e) => setNewReg({ ...newReg, occupation: e.target.value })}
                />
              </div>
            </div>

            <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
              <button type="submit" className="btn btn-primary btn-large">
                <CheckCircle size={18} /> Register & Generate Official Slip
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Database Records Tab */}
      {activeTab === 'records' && (
        <div className="glass-card" style={{ marginTop: '20px', padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h3 style={{ margin: 0 }}>Registered Beneficiaries Registry</h3>
              <p className="subtitle-text" style={{ margin: '4px 0 0' }}>Village level walk-in submissions processed through this nodal office</p>
            </div>
            <button className="btn btn-outline btn-sm" onClick={handlePrint}>
              <Printer size={16} /> Print Full Register
            </button>
          </div>

          <div className="table-responsive" style={{ overflowX: 'auto' }}>
            <table className="custom-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #eee', background: 'rgba(0,0,0,0.02)' }}>
                  <th style={{ padding: '12px 14px' }}>App ID</th>
                  <th style={{ padding: '12px 14px' }}>Beneficiary</th>
                  <th style={{ padding: '12px 14px' }}>Village / Ward</th>
                  <th style={{ padding: '12px 14px' }}>Aadhaar</th>
                  <th style={{ padding: '12px 14px' }}>Applied Scheme</th>
                  <th style={{ padding: '12px 14px' }}>Income</th>
                  <th style={{ padding: '12px 14px' }}>Status</th>
                  <th style={{ padding: '12px 14px' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {registeredList.map((rec) => (
                  <tr key={rec.appId} style={{ borderBottom: '1px solid #f0f0f0' }}>
                    <td style={{ padding: '12px 14px', fontWeight: 'bold', color: 'var(--primary)' }}>{rec.appId}</td>
                    <td style={{ padding: '12px 14px' }}>
                      <strong>{rec.name}</strong>
                      <div style={{ fontSize: '0.8rem', color: '#666' }}>Age: {rec.age} • {rec.category}</div>
                    </td>
                    <td style={{ padding: '12px 14px', fontSize: '0.9rem' }}>{rec.village}</td>
                    <td style={{ padding: '12px 14px', fontFamily: 'monospace' }}>{rec.aadhaar}</td>
                    <td style={{ padding: '12px 14px', fontSize: '0.9rem' }}>{rec.scheme}</td>
                    <td style={{ padding: '12px 14px' }}>{rec.income}</td>
                    <td style={{ padding: '12px 14px' }}>
                      <span className="status-badge status-eligible" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <CheckCircle size={12} /> {rec.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px 14px' }}>
                      <button 
                        className="btn btn-sm btn-outline"
                        onClick={() => setPrintReceipt(rec)}
                        title="Print Acknowledgment"
                      >
                        <Printer size={14} /> Slip
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Official Printable Receipt Modal */}
      {printReceipt && (
        <div className="modal-overlay">
          <div className="glass-card modal-container" style={{ maxWidth: '640px', padding: '0', overflow: 'hidden' }}>
            <div className="modal-header" style={{ background: '#2c3e50', color: 'white' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Printer size={22} color="white" />
                <h3 style={{ color: 'white', margin: 0 }}>Official Application Acknowledgment</h3>
              </div>
              <button className="modal-close-btn" style={{ color: 'white' }} onClick={() => setPrintReceipt(null)}>✕</button>
            </div>

            {/* Printable Receipt Body */}
            <div id="printable-slip" style={{ padding: '24px', background: '#fff', color: '#222' }}>
              <div style={{ border: '2px solid #333', padding: '20px', borderRadius: '8px' }}>
                <div style={{ textAlign: 'center', borderBottom: '2px dashed #999', paddingBottom: '14px', marginBottom: '16px' }}>
                  <h2 style={{ margin: '0 0 4px', fontSize: '1.25rem', color: '#7012ce' }}>GOVERNMENT OF TAMIL NADU / CSC NODE</h2>
                  <h4 style={{ margin: '0 0 4px', fontWeight: '600' }}>EmpowerHer Welfare & Financial Assistance Portal</h4>
                  <span style={{ fontSize: '0.85rem', color: '#555' }}>Citizen Assistance Kiosk Receipt • Rural Delivery Unit</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.9rem', marginBottom: '16px' }}>
                  <div><strong>Application Ref No:</strong> <span style={{ color: '#c92a2a', fontWeight: 'bold' }}>{printReceipt.appId}</span></div>
                  <div><strong>Submission Date:</strong> {printReceipt.date || new Date().toISOString().split('T')[0]}</div>
                  <div><strong>Beneficiary Name:</strong> {printReceipt.name}</div>
                  <div><strong>Aadhaar (Masked):</strong> {printReceipt.aadhaar}</div>
                  <div><strong>Village / Ward:</strong> {printReceipt.village}</div>
                  <div><strong>Social Category:</strong> {printReceipt.category}</div>
                  <div><strong>Reported Income:</strong> {printReceipt.income}</div>
                  <div><strong>Nodal Center:</strong> TN-KPM-04 (Panchayat Union)</div>
                </div>

                <div style={{ background: '#f8f9fa', padding: '12px', borderRadius: '6px', border: '1px solid #dee2e6', marginBottom: '16px' }}>
                  <div style={{ fontSize: '0.85rem', color: '#555' }}>Applied Scheme:</div>
                  <strong style={{ fontSize: '1rem', color: '#1c7ed6' }}>{printReceipt.scheme}</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '2px dashed #999', paddingTop: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <QrCode size={48} color="#333" />
                    <div style={{ fontSize: '0.75rem', color: '#666' }}>
                      Scan QR code on<br />village kiosk or mobile<br />to check live status
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', fontSize: '0.8rem' }}>
                    <div style={{ height: '35px' }}></div>
                    <strong>Signature of Nodal Officer</strong><br />
                    <span>Panchayat Union Service Desk</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer" style={{ background: '#f8f9fa', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button className="btn btn-outline" onClick={() => setPrintReceipt(null)}>Close</button>
              <button className="btn btn-primary" onClick={handlePrint}>
                <Printer size={16} /> Print Physical Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PanchayatPage;
