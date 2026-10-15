import React, { useState } from 'react';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Globe, 
  Sparkles, 
  Send, 
  User, 
  Bot, 
  CheckCircle,
  HelpCircle
} from 'lucide-react';

const VoiceAssistantPage = ({ lang, setLang }) => {
  const [isListening, setIsListening] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: lang === 'ta'
        ? "வணக்கம்! நான் எம்பவர்ஹெர் குரல் உதவி. 'எனக்கு கல்வி உதவி வேண்டும்' அல்லது 'புதுமை பெண் திட்டம்' பற்றி கேட்கலாம்."
        : lang === 'hi'
        ? "नमस्ते! मैं एमपावरहर वॉयस असिस्टेंट हूँ। आप मुझसे योजनाओं और छात्रवृत्ति के बारे में पूछ सकते हैं।"
        : "Namaste! I am the EmpowerHer Accessible Voice Assistant. Click the microphone button below to speak in English, Tamil, or Hindi."
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');

  const handleSendQuery = (queryText) => {
    const text = queryText || inputQuery;
    if (!text.trim()) return;

    setMessages(prev => [...prev, { sender: 'user', text }]);
    setInputQuery('');

    setTimeout(() => {
      let botAnswer = "Based on your query, Pudhumai Penn Scheme offers ₹1,000/month grant for higher education, and Naan Mudhalvan provides 100% free IT & skill training with job placement.";
      const lower = text.toLowerCase();

      if (lower.includes('கல்வி') || lower.includes('education') || lower.includes('शिक्षा')) {
        botAnswer = "Here are education-related schemes available for your profile: Pudhumai Penn Grant (₹1,000/mo) and Kanya Sumangala Yojana.";
      } else if (lower.includes('job') || lower.includes('வேலை') || lower.includes('नौकरी')) {
        botAnswer = "We found 4 verified job opportunities including Work From Home Customer Support and Primary School Teacher in Tamil Nadu.";
      } else if (lower.includes('document') || lower.includes('ஆவணம்')) {
        botAnswer = "Our AI Document OCR tool can automatically read your Aadhaar card and fill out your profile details instantly!";
      }

      setMessages(prev => [...prev, { sender: 'bot', text: botAnswer }]);

      if (soundEnabled && 'speechSynthesis' in window) {
        const synth = new SpeechSynthesisUtterance(botAnswer);
        synth.rate = 0.95;
        window.speechSynthesis.speak(synth);
      }
    }, 1000);
  };

  const toggleVoiceListen = () => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = lang === 'ta' ? 'ta-IN' : lang === 'hi' ? 'hi-IN' : 'en-US';

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event) => {
        setIsListening(false);
        const transcript = event.results[0][0].transcript;
        handleSendQuery(transcript);
      };
      recognition.onerror = () => {
        setIsListening(false);
        // Fallback simulation
        handleSendQuery(lang === 'ta' ? "எனக்கு கல்வி உதவி வேண்டும்" : "I need education financial support");
      };
      recognition.start();
    } else {
      // Fallback simulation for unsupported browsers
      setIsListening(true);
      setTimeout(() => {
        setIsListening(false);
        handleSendQuery(lang === 'ta' ? "எனக்கு கல்வி உதவி வேண்டும்" : "Which education schemes am I eligible for?");
      }, 2500);
    }
  };

  return (
    <div className="voice-page-container container">
      <div className="page-header-title text-center">
        <span className="feature-pill-tag">
          <Mic size={14} /> Accessible Voice Support
        </span>
        <h2>Talk to EmpowerHer Voice Assistant</h2>
        <p className="subtitle-text">Designed for hands-free and multi-lingual voice interaction in Tamil, Hindi, and English.</p>
      </div>

      <div className="voice-interface-card glass-card" style={{ maxWidth: '720px', margin: '24px auto 0', padding: '0', overflow: 'hidden' }}>
        {/* Voice Controls Header */}
        <div className="voice-card-topbar">
          <div className="lang-switcher-dropdown">
            <Globe size={15} color="white" />
            <button className={`lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>English</button>
            <button className={`lang-btn ${lang === 'ta' ? 'active' : ''}`} onClick={() => setLang('ta')}>தமிழ்</button>
            <button className={`lang-btn ${lang === 'hi' ? 'active' : ''}`} onClick={() => setLang('hi')}>हिंदी</button>
          </div>

          <button 
            className="icon-mini-btn"
            onClick={() => setSoundEnabled(!soundEnabled)}
            title="Toggle Text-to-Speech Audio Playback"
          >
            {soundEnabled ? <Volume2 size={18} color="white" /> : <VolumeX size={18} color="white" />}
          </button>
        </div>

        {/* Chat History Messages */}
        <div className="voice-chat-history">
          {messages.map((msg, idx) => (
            <div key={idx} className={`chat-bubble-wrap ${msg.sender}`}>
              <div className="avatar-chip">
                {msg.sender === 'bot' ? <Sparkles size={14} color="var(--primary)" /> : <User size={14} color="#555" />}
              </div>
              <div className="chat-bubble">
                <p>{msg.text}</p>
              </div>
            </div>
          ))}

          {isListening && (
            <div className="voice-visualizer-box text-center" style={{ margin: '20px auto', justifyContent: 'center' }}>
              <div className="soundwave-bar bar1"></div>
              <div className="soundwave-bar bar2"></div>
              <div className="soundwave-bar bar3"></div>
              <div className="soundwave-bar bar4"></div>
              <span>Listening to your speech input... Speak now!</span>
            </div>
          )}
        </div>

        {/* Huge Microphone Action Center */}
        <div className="voice-action-center text-center">
          <button 
            className={`mic-giant-btn ${isListening ? 'listening-pulse' : ''}`}
            onClick={toggleVoiceListen}
          >
            {isListening ? <MicOff size={36} color="white" /> : <Mic size={36} color="white" />}
          </button>
          <strong style={{ display: 'block', marginTop: '12px', fontSize: '1.05rem', color: 'var(--text-dark)' }}>
            🎙️ Talk to EmpowerHer
          </strong>
          <span style={{ fontSize: '0.85rem', color: '#666' }}>Tap mic button to start voice recognition</span>
        </div>

        {/* Text Input Fallback */}
        <div className="chatbot-footer" style={{ borderTop: '1px solid var(--border-light)', padding: '16px 20px' }}>
          <input 
            type="text"
            className="form-input"
            placeholder="Or type query manually in Tamil, Hindi, or English..."
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendQuery()}
          />
          <button className="btn btn-primary" onClick={() => handleSendQuery()}>
            Send <Send size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoiceAssistantPage;
