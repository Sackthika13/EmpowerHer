import React from 'react';
import { Settings, Globe, Bell, Eye, Shield, Check } from 'lucide-react';

const SettingsPage = ({ lang, setLang }) => {
  return (
    <div className="settings-page-container">
      <div className="page-header-title">
        <h2>System & Application Settings</h2>
        <p className="subtitle-text">Manage language preferences, accessibility options, and notification controls.</p>
      </div>

      <div className="glass-card settings-card" style={{ padding: '30px', marginTop: '24px' }}>
        <h3><Globe size={20} color="var(--primary)" /> Preferred Language</h3>
        <p className="sub-text" style={{ marginBottom: '16px' }}>Select platform interface language</p>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button className={`btn ${lang === 'en' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setLang('en')}>
            English (A)
          </button>
          <button className={`btn ${lang === 'ta' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setLang('ta')}>
            தமிழ் (அ)
          </button>
          <button className={`btn ${lang === 'hi' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setLang('hi')}>
            हिंदी (अ)
          </button>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid var(--border-light)', margin: '30px 0' }} />

        <h3><Eye size={20} color="var(--secondary)" /> Accessibility Controls</h3>
        <div className="manual-form-grid" style={{ marginTop: '16px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem' }}>
            <input type="checkbox" defaultChecked /> Simple Explanation Mode (Plain Language)
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem' }}>
            <input type="checkbox" defaultChecked /> Voice Assistant Audio Read-Aloud (TTS)
          </label>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
