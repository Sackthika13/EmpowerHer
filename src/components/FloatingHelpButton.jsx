import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MessageSquare, 
  X, 
  Search, 
  CheckCircle, 
  FileText, 
  Clock, 
  MapPin, 
  GraduationCap, 
  Mic,
  ChevronRight,
  Sparkles,
  Building2
} from 'lucide-react';

const FloatingHelpButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleAction = (path) => {
    setIsOpen(false);
    navigate(path);
  };

  return (
    <div className="floating-help-widget">
      {isOpen ? (
        <div className="glass-card help-popup-card">
          <div className="popup-header">
            <div className="popup-title">
              <span>🌸</span>
              <div>
                <strong>EmpowerHer Assistant</strong>
                <span className="sub">How can I help you today?</span>
              </div>
            </div>
            <button className="popup-close-btn" onClick={() => setIsOpen(false)}>
              <X size={16} />
            </button>
          </div>

          <div className="popup-options-list">
            <button className="popup-option-btn" onClick={() => handleAction('/schemes')}>
              <Search size={16} color="var(--primary)" />
              <span>Find a Scheme</span>
              <ChevronRight size={14} color="#aaa" />
            </button>

            <button className="popup-option-btn" onClick={() => handleAction('/assessment')}>
              <CheckCircle size={16} color="var(--accent-teal)" />
              <span>Check Eligibility</span>
              <ChevronRight size={14} color="#aaa" />
            </button>

            <button className="popup-option-btn" onClick={() => handleAction('/schemes')}>
              <FileText size={16} color="var(--secondary)" />
              <span>Apply Online</span>
              <ChevronRight size={14} color="#aaa" />
            </button>

            <button className="popup-option-btn" onClick={() => handleAction('/tracker')}>
              <Clock size={16} color="#f59f00" />
              <span>Track Application</span>
              <ChevronRight size={14} color="#aaa" />
            </button>

            <button className="popup-option-btn" onClick={() => handleAction('/help-centers')}>
              <MapPin size={16} color="#e63946" />
              <span>Find Help Center</span>
              <ChevronRight size={14} color="#aaa" />
            </button>

            <button className="popup-option-btn" onClick={() => handleAction('/skills')}>
              <GraduationCap size={16} color="#7012ce" />
              <span>Learn a Skill</span>
              <ChevronRight size={14} color="#aaa" />
            </button>

            <button className="popup-option-btn" onClick={() => handleAction('/panchayat')}>
              <Building2 size={16} color="#7012ce" />
              <span>Panchayat Staff Kiosk</span>
              <ChevronRight size={14} color="#aaa" />
            </button>

            <button className="popup-option-btn" onClick={() => handleAction('/voice')}>
              <Mic size={16} color="var(--primary)" />
              <span>Talk to Voice Support</span>
              <ChevronRight size={14} color="#aaa" />
            </button>
          </div>
        </div>
      ) : (
        <button 
          className="btn-floating-launcher"
          onClick={() => setIsOpen(true)}
          title="Need Help?"
        >
          <Sparkles size={20} color="white" />
          <span>🌸 Need Help?</span>
        </button>
      )}
    </div>
  );
};

export default FloatingHelpButton;
