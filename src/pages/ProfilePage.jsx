import React, { useState } from 'react';
import { 
  User, 
  GraduationCap, 
  Briefcase, 
  CreditCard, 
  MapPin, 
  ShieldCheck, 
  Edit3, 
  CheckCircle, 
  AlertTriangle,
  Award,
  FileText
} from 'lucide-react';

const ProfilePage = ({ userProfile, setUserProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState({ ...userProfile });

  const handleSave = () => {
    setUserProfile(tempProfile);
    setIsEditing(false);
    alert("Profile details updated successfully!");
  };

  return (
    <div className="profile-page-container">
      <div className="page-header-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2>My EmpowerHer Profile</h2>
          <p className="subtitle-text">Manage your verified credentials for automated rule-based scheme matching.</p>
        </div>
        <button className="btn btn-primary btn-sm" onClick={() => setIsEditing(!isEditing)}>
          <Edit3 size={15} /> {isEditing ? 'Cancel Edit' : 'Edit Profile'}
        </button>
      </div>

      {/* Completeness Card */}
      <div className="completeness-bar-container glass-card" style={{ padding: '24px', marginBottom: '24px' }}>
        <div className="completeness-header">
          <div>
            <h3 style={{ margin: 0 }}>Profile Completion Status</h3>
            <span className="sub-text">Higher completion rate unlocks 100% accurate scheme recommendations</span>
          </div>
          <strong style={{ fontSize: '1.8rem', color: 'var(--primary)' }}>{userProfile.completeness}%</strong>
        </div>

        <div className="progress-track" style={{ height: '10px', margin: '14px 0' }}>
          <div className="progress-fill" style={{ width: `${userProfile.completeness}%` }}></div>
        </div>

        {/* Missing Fields Warning Pills */}
        <div style={{ marginTop: '16px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <span className="badge" style={{ background: '#fff9db', color: '#f59f00', border: '1px solid #f59f00', padding: '4px 12px', borderRadius: '14px', fontSize: '0.8rem', fontWeight: '600' }}>
            ⚠ Add employment status details
          </span>
          <span className="badge" style={{ background: '#fff9db', color: '#f59f00', border: '1px solid #f59f00', padding: '4px 12px', borderRadius: '14px', fontSize: '0.8rem', fontWeight: '600' }}>
            ⚠ Add certified skills
          </span>
          <span className="badge" style={{ background: '#fff9db', color: '#f59f00', border: '1px solid #f59f00', padding: '4px 12px', borderRadius: '14px', fontSize: '0.8rem', fontWeight: '600' }}>
            ⚠ Upload latest income certificate
          </span>
        </div>
      </div>

      {/* Profile Details Form / View Card */}
      <div className="glass-card profile-details-card" style={{ padding: '30px' }}>
        <h3><User size={20} color="var(--primary)" /> Verified Credentials</h3>

        <div className="manual-form-grid" style={{ marginTop: '20px' }}>
          <div className="form-group">
            <label>Full Name</label>
            <input 
              type="text" 
              className="form-input"
              disabled={!isEditing}
              value={isEditing ? tempProfile.name : userProfile.name}
              onChange={(e) => setTempProfile({...tempProfile, name: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label>Aadhaar / ID Number</label>
            <input 
              type="text" 
              className="form-input"
              disabled={!isEditing}
              value={isEditing ? tempProfile.aadhaarNo : userProfile.aadhaarNo}
              onChange={(e) => setTempProfile({...tempProfile, aadhaarNo: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label>Age (Years)</label>
            <input 
              type="number" 
              className="form-input"
              disabled={!isEditing}
              value={isEditing ? tempProfile.age : userProfile.age}
              onChange={(e) => setTempProfile({...tempProfile, age: parseInt(e.target.value) || ''})}
            />
          </div>

          <div className="form-group">
            <label>Educational Qualification</label>
            <input 
              type="text" 
              className="form-input"
              disabled={!isEditing}
              value={isEditing ? tempProfile.education : userProfile.education}
              onChange={(e) => setTempProfile({...tempProfile, education: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label>Annual Family Income (₹)</label>
            <input 
              type="number" 
              className="form-input"
              disabled={!isEditing}
              value={isEditing ? tempProfile.income : userProfile.income}
              onChange={(e) => setTempProfile({...tempProfile, income: parseInt(e.target.value) || 0})}
            />
          </div>

          <div className="form-group">
            <label>Occupation</label>
            <input 
              type="text" 
              className="form-input"
              disabled={!isEditing}
              value={isEditing ? tempProfile.occupation : userProfile.occupation}
              onChange={(e) => setTempProfile({...tempProfile, occupation: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label>Location / District</label>
            <input 
              type="text" 
              className="form-input"
              disabled={!isEditing}
              value={isEditing ? tempProfile.location : userProfile.location}
              onChange={(e) => setTempProfile({...tempProfile, location: e.target.value})}
            />
          </div>
        </div>

        {isEditing && (
          <div style={{ marginTop: '30px', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <button className="btn btn-outline" onClick={() => setIsEditing(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={handleSave}>
              Save Profile Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
