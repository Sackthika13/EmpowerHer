import React, { useState } from 'react';
import { X, ChevronRight, Check } from 'lucide-react';

const SchemeEligibilityTool = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    age: '',
    region: 'Tamil Nadu',
    category: 'Education'
  });

  if (!isOpen) return null;

  const handleNext = () => setStep(step + 1);

  return (
    <div className="modal-overlay" style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
      backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', 
      alignItems: 'center', justifyContent: 'center', zIndex: 2000,
      backdropFilter: 'blur(5px)'
    }}>
      <div className="glass-card" style={{
        width: '90%', maxWidth: '500px', background: 'white', 
        padding: '40px', position: 'relative'
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: '20px', right: '20px', 
          background: 'none', border: 'none', cursor: 'pointer'
        }}>
          <X size={24} />
        </button>

        {step === 1 && (
          <div>
            <span className="feature-tag">Step 1 of 3</span>
            <h2 style={{marginBottom: '20px'}}>Tell us about yourself</h2>
            <div style={{marginBottom: '15px'}}>
              <label style={{display: 'block', marginBottom: '5px', fontWeight: '500'}}>Your Age</label>
              <input 
                type="number" 
                placeholder="Ex: 24" 
                style={{width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd'}}
                value={formData.age}
                onChange={(e) => setFormData({...formData, age: e.target.value})}
              />
            </div>
            <div style={{marginBottom: '20px'}}>
              <label style={{display: 'block', marginBottom: '5px', fontWeight: '500'}}>Region / State</label>
              <select 
                style={{width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd'}}
                value={formData.region}
                onChange={(e) => setFormData({...formData, region: e.target.value})}
              >
                <option>Tamil Nadu</option>
                <option>Uttar Pradesh</option>
                <option>Delhi</option>
                <option>Maharashtra</option>
              </select>
            </div>
            <button className="btn btn-primary" style={{width: '100%'}} onClick={handleNext}>
              Next <ChevronRight size={18} />
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <span className="feature-tag">Step 2 of 3</span>
            <h2 style={{marginBottom: '20px'}}>Your Interests</h2>
            <div className="grid" style={{gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px'}}>
              {['Education', 'Healthcare', 'Business', 'Welfare'].map(cat => (
                <button 
                  key={cat}
                  onClick={() => setFormData({...formData, category: cat})}
                  style={{
                    padding: '15px', borderRadius: '12px', 
                    border: formData.category === cat ? '2px solid var(--primary)' : '1px solid #ddd',
                    background: formData.category === cat ? 'var(--primary-light)' : 'white',
                    color: formData.category === cat ? 'var(--primary)' : 'inherit',
                    fontWeight: '600', cursor: 'pointer'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
            <button className="btn btn-primary" style={{width: '100%'}} onClick={handleNext}>
              Show Results
            </button>
          </div>
        )}

        {step === 3 && (
          <div style={{textAlign: 'center'}}>
            <div style={{
              width: '60px', height: '60px', borderRadius: '50%', background: '#d4edda', 
              color: '#28a745', display: 'flex', alignItems: 'center', 
              justifyContent: 'center', margin: '0 auto 20px'
            }}>
              <Check size={32} />
            </div>
            <h2>We found 4 Schemes!</h2>
            <p style={{color: '#666', marginBottom: '20px'}}>Based on your profile, you are eligible for the following:</p>
            <div style={{textAlign: 'left', marginBottom: '20px'}}>
              <div style={{padding: '10px', borderBottom: '1px solid #eee'}}>
                <span className="badge badge-success">Top Match</span>
                <p style={{fontWeight: '600', marginTop: '5px'}}>Amma Two Wheeler Scheme</p>
              </div>
              <div style={{padding: '10px', borderBottom: '1px solid #eee'}}>
                <p style={{fontWeight: '600'}}>Mahila Entrepreneurship Fund</p>
              </div>
            </div>
            <button className="btn btn-primary" style={{width: '100%'}} onClick={onClose}>
              View All My Schemes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SchemeEligibilityTool;
