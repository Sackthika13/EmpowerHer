import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  Mic, 
  MicOff, 
  Send, 
  X, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Globe,
  Bot,
  User,
  HelpCircle
} from 'lucide-react';

const AIChatbotVoice = ({ lang, isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: lang === 'ta' 
        ? "வணக்கம்! நான் எம்பவர்ஹெர் AI குரல் உதவி. உங்களுக்கு என்ன திட்டங்கள் தேவை? (எ.கா. 'கல்வி உதவித்தொகை', 'கர்ப்பிணி உதவி')" 
        : lang === 'hi' 
        ? "नमस्ते! मैं एमपावरहर एआई वॉयस असिस्टेंट हूँ। मैं आपकी क्या सहायता कर सकता हूँ?" 
        : "Namaste! I am the EmpowerHer AI Voice & Scheme Assistant. How can I help you today? Ask me about schemes, education grants, or document assistance!"
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (textToSend) => {
    const text = textToSend || inputQuery;
    if (!text.trim()) return;

    // Add user message
    const updatedMsgs = [...messages, { sender: 'user', text }];
    setMessages(updatedMsgs);
    setInputQuery('');

    // Simulate AI response synthesis
    setTimeout(() => {
      let botAnswer = "Based on your query, you may be eligible for the Pudhumai Penn Higher Education Grant (₹1,000/month) or Kalaignar Magalir Urimai Thittam. Would you like me to start the guided 5-step application for you?";
      const lower = text.toLowerCase();

      if (lower.includes('income') || lower.includes('வருமானம்') || lower.includes('आय')) {
        botAnswer = "For family income below ₹2.5 Lakh/year, you qualify for 100% free Naan Mudhalvan skill training, Pudhumai Penn scholarship, and zero-collateral SHG loans!";
      } else if (lower.includes('document') || lower.includes('ஆவணம்') || lower.includes('दस्तावेज़')) {
        botAnswer = "Our Document OCR Scanner can automatically extract your details from Aadhaar Card and Income Certificate. Click the 'Document OCR' button at the top to scan your card!";
      } else if (lower.includes('tamil') || lower.includes('தமிழ்')) {
        botAnswer = "நிச்சயமாக! தமிழக அரசு வழங்கும் புதுமைப் பெண் திட்டம் மற்றும் கலைஞர் மகளிர் உரிமைத் திட்டத்திற்கு நீங்கள் விண்ணப்பிக்கலாம்.";
      }

      setMessages(prev => [...prev, { sender: 'bot', text: botAnswer }]);

      // Audio TTS simulation speech
      if (soundEnabled && 'speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(botAnswer);
        utterance.rate = 0.95;
        window.speechSynthesis.speak(utterance);
      }
    }, 1000);
  };

  const toggleVoiceListen = () => {
    if (isListening) {
      setIsListening(false);
    } else {
      setIsListening(true);
      // Simulate speech recognition
      setTimeout(() => {
        setIsListening(false);
        handleSend(lang === 'ta' ? "கல்வி உதவித்தொகை திட்டங்கள் எவை?" : "Which schemes offer education financial support?");
      }, 3000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="chatbot-window-floating glass-card">
      {/* Header */}
      <div className="chatbot-header">
        <div className="chatbot-title-group">
          <div className="bot-avatar">
            <Bot size={20} color="white" />
          </div>
          <div>
            <h4 style={{ margin: 0, color: 'white' }}>AI Voice & Text Assistant</h4>
            <span className="bot-status-sub">● Online • Multi-lingual (TN/HI/EN)</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button 
            className="icon-mini-btn" 
            onClick={() => setSoundEnabled(!soundEnabled)}
            title="Toggle Text-to-Speech Audio"
          >
            {soundEnabled ? <Volume2 size={16} color="white" /> : <VolumeX size={16} color="white" />}
          </button>
          <button className="icon-mini-btn" onClick={onClose}>
            <X size={18} color="white" />
          </button>
        </div>
      </div>

      {/* Messages Container */}
      <div className="chatbot-body">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-bubble-wrap ${msg.sender}`}>
            <div className="avatar-chip">
              {msg.sender === 'bot' ? <Sparkles size={14} color="var(--primary)" /> : <User size={14} color="#555" />}
            </div>
            <div className="chat-bubble">
              <p>{msg.text}</p>
            </div>
          </div>
        ))}

        {isListening && (
          <div className="voice-visualizer-box">
            <div className="soundwave-bar bar1"></div>
            <div className="soundwave-bar bar2"></div>
            <div className="soundwave-bar bar3"></div>
            <div className="soundwave-bar bar4"></div>
            <span>Listening to your voice prompt... (Speak now)</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Bar */}
      <div className="quick-prompts-bar">
        <button className="prompt-chip" onClick={() => handleSend("Am I eligible for Pudhumai Penn?")}>
          🎓 Pudhumai Penn
        </button>
        <button className="prompt-chip" onClick={() => handleSend("What documents do I need?")}>
          📄 Required Documents
        </button>
        <button className="prompt-chip" onClick={() => handleSend("Help me scan my Aadhaar card")}>
          🔍 OCR Scan
        </button>
      </div>

      {/* Input Form */}
      <div className="chatbot-footer">
        <button 
          className={`btn-mic-record ${isListening ? 'recording' : ''}`}
          onClick={toggleVoiceListen}
          title="Click to speak using Voice Assistant"
        >
          {isListening ? <MicOff size={18} color="white" /> : <Mic size={18} color="var(--primary)" />}
        </button>

        <input 
          type="text" 
          placeholder="Ask anything in English, Tamil, or Hindi..."
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />

        <button className="btn-send-chat" onClick={() => handleSend()}>
          <Send size={16} color="white" />
        </button>
      </div>
    </div>
  );
};

export default AIChatbotVoice;
