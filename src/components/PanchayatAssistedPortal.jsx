import React, { useState } from 'react';
import { 
  Building2, 
  UserPlus, 
  Printer, 
  ShieldCheck, 
  FileText
} from 'lucide-react';

const PanchayatAssistedPortal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('register');
  const [registeredList, setRegisteredList] = useState([
    { name: "Mariammal T.", village: "Melur Village", status: "Verified", age: 48, aadhaar: "XXXX-XXXX-9912", scheme: "Kalaignar Magalir Urimai Thittam" },
    { name: "Kavitha R.", village: "Perumalpattu Panchayat", status: "Application Submitted", age: 24, aadhaar: "XXXX-XXXX-4482", scheme: "Pudhumai Penn Scheme" }
  ]);

  const [newReg, setNewReg] = useState({
    name: '',
    village: 'Kanchipuram Panchayat - Ward 4',
    age: '',
    aadhaar: '',
    income: 80000,
    occupation: 'Homemaker / Daily Wage'
  });

  const [printSummary, setPrintSummary] = useState(null);

  if (!isOpen) return null;

  const handleCreateRegistration = (e) => {
    e.preventDefault();
    if (!newReg.name) return;

    const record = {
      ...newReg,
      status: "Verified by Panchayat Staff",
      scheme: "Pudhumai Penn / Magalir Urimai Match"
    };

    setRegisteredList([record, ...registeredList]);
    setPrintSummary(record);
    setNewReg({
      name: '',
      village: 'Kanchipuram Panchayat - Ward 4',
      age: '',
      aadhaar: '',
      income: 80000,
      occupation: 'Homemaker / Daily Wage'
    });
  };

  return (
    <div className="modal-overlay">
      <div className="glass-card modal-container modal-large">
        <div className="modal-header" style={{ background: 'linear-gradient(135deg, #7012ce, #ff4d6d)', color: 'white' }}>
          <div className="title-with-icon">
            <Building2 size={26} color="white" />
            <div>
              <h2 style={{ color: 'white', margin: 0 }}>Panchayat Staff Assistance Portal</h2>
              <p style={{ color: 'rgba(255,255,255,0.85)', margin: 0, fontSize: '0.88rem' }}>
                Kiosk & Staff Login • Assisted Service for Rural Beneficiaries
              </p>
            </div>
          </div>
          <button className="modal-close-btn" style={{ color: 'white' }} onClick={onClose}>✕</button>
        </div>

        {/* Navigation Tabs */}
        <div className="modal-tabs">
          <button 
            className={`tab-btn ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => setActiveTab('register')}
          >
            <UserPlus size={16} /> Register Beneficiary (No Smartphone)
          </button>
          <button 
            className={`tab-btn ${activeTab === 'list' ? 'active' : ''}`}
            onClick={() => setActiveTab('list')}
          >
            <FileText size={16} /> Beneficiary Records ({registeredList.length})
          </button>
        </div>

        <div className="modal-body">
          {activeTab === 'register' ? (
            <form onSubmit={handleCreateRegistration} className="panchayat-form">
              <div className="alert-box alert-info" style={{ marginBottom: '20px' }}>
                <ShieldCheck size={18} color="var(--primary)" />
                <span>
                  <strong>Staff Mode:</strong> Enter the rural applicant's details below to run automated scheme matching & print an official physical application slip.
                </span>
              </div>

              <div className="manual-form-grid">
                <div className="form-group">
                  <label>Beneficiary Full Name</label>
                  <input 
                    type="text" 
                    className="form-input"
                    required
                    placeholder="E.g., Kannagi M."
                    value={newReg.name}
                    onChange={(e) => setNewReg({...newReg, name: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label>Village / Panchayat Ward</label>
                  <input 
                    type="text" 
                    className="form-input"
                    value={newReg.village}
                    onChange={(e) => setNewReg({...newReg, village: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label>Age</label>
                  <input 
                    type="number" 
                    className="form-input"
                    required
                    placeholder="42"
                    value={newReg.age}
                    onChange={(e) => setNewReg({...newReg, age: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label>Aadhaar Card Number</label>
                  <input 
                    type="text" 
                    className="form-input"
                    placeholder="XXXX-XXXX-1234"
                    value={newReg.aadhaar}
                    onChange={(e) => setNewReg({...newReg, aadhaar: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label>Annual Family Income (₹)</label>
                  <input 
                    type="number" 
                    className="form-input"
                    value={newReg.income}
                    onChange={(e) => setNewReg({...newReg, income: parseInt(e.target.value) || 0})}
                  />
                </div>

                <div className="form-group">
                  <label>Occupation</label>
                  <select 
                    className="form-input"
                    value={newReg.occupation}
                    onChange={(e) => setNewReg({...newReg, occupation: e.target.value})}
                  >
                    <option>Homemaker / Daily Wage</option>
                    <option>Agriculture / Laborer</option>
                    <option>Student</option>
                    <option>Self-Help Group Member</option>
                  </select>
                </div>
              </div>

              <div style={{ marginTop: '25px', display: 'flex', gap: '15px' }}>
                <button type="submit" className="btn btn-primary btn-large">
                  <UserPlus size={18} /> Register & Generate Scheme Slip
                </button>
              </div>
            </form>
          ) : (
            <div className="registered-table-wrap">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Applicant Name</th>
                    <th>Age</th>
                    <th>Village / Ward</th>
                    <th>Matched Scheme</th>
                    <th>Status</th>
                    <th>Print</th>
                  </tr>
                </thead>
                <tbody>
                  {registeredList.map((item, idx) => (
                    <tr key={idx}>
                      <td><strong>{item.name}</strong></td>
                      <td>{item.age}</td>
                      <td>{item.village}</td>
                      <td>{item.scheme}</td>
                      <td>
                        <span className="badge badge-success">✓ {item.status}</span>
                      </td>
                      <td>
                        <button 
                          className="btn btn-outline btn-sm"
                          onClick={() => setPrintSummary(item)}
                        >
                          <Printer size={14} /> Slip
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn btn-outline" onClick={onClose}>Close Portal</button>
        </div>
      </div>

      {/* Printable Slip Overlay */}
      {printSummary && (
        <div className="modal-overlay" style={{ zIndex: 3000 }}>
          <div className="glass-card modal-container">
            <div className="modal-header">
              <h2>Panchayat Assisted Scheme Slip</h2>
              <button className="modal-close-btn" onClick={() => setPrintSummary(null)}>✕</button>
            </div>

            <div className="modal-body">
              <div className="receipt-box" style={{ background: '#fff', border: '2px solid #7012ce', padding: '25px', borderRadius: '12px' }}>
                <div style={{ textAlign: 'center', borderBottom: '2px solid #eee', paddingBottom: '15px', marginBottom: '15px' }}>
                  <h3 style={{ margin: 0, color: '#7012ce' }}>PANCHAYAT UNION OFFICE ASSISTANCE SLIP</h3>
                  <span style={{ fontSize: '0.85rem', color: '#666' }}>EmpowerHer Welfare Kiosk System</span>
                </div>

                <div className="receipt-row"><strong>Beneficiary Name:</strong> {printSummary.name}</div>
                <div className="receipt-row"><strong>Village Ward:</strong> {printSummary.village}</div>
                <div className="receipt-row"><strong>Age / Aadhaar:</strong> {printSummary.age} yrs | {printSummary.aadhaar || 'Verified'}</div>
                <div className="receipt-row"><strong>Recommended Scheme:</strong> <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>{printSummary.scheme}</span></div>
                <div className="receipt-row"><strong>Panchayat Nodal Officer:</strong> Verified & Submitted</div>
              </div>
            </div>

            <div className="modal-footer">
              <button 
                className="btn btn-primary"
                onClick={() => {
                  window.print();
                  setPrintSummary(null);
                }}
              >
                <Printer size={16} /> Print Physical Slip for Beneficiary
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PanchayatAssistedPortal;
