import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Mic, 
  FileText, 
  Briefcase, 
  Award, 
  Users, 
  CheckCircle, 
  ArrowRight, 
  MessageSquare, 
  ChevronRight, 
  Bell, 
  Building2, 
  Sparkles, 
  ShieldCheck, 
  Smartphone, 
  UploadCloud, 
  UserCheck, 
  Clock, 
  BookOpen
} from 'lucide-react';
import './EmpowerHerStyle.css';
import heroImg from './assets/images/hero.png';
import Header from './components/Header';
import UserProfileOCR from './components/UserProfileOCR';
import EligibilityMatchingEngine from './components/EligibilityMatchingEngine';
import GuidedApplicationModal from './components/GuidedApplicationModal';
import ApplicationTracker from './components/ApplicationTracker';
import AIChatbotVoice from './components/AIChatbotVoice';
import SkillLearningHub from './components/SkillLearningHub';
import LocationSupportMap from './components/LocationSupportMap';
import PanchayatAssistedPortal from './components/PanchayatAssistedPortal';
import NotificationsDrawer from './components/NotificationsDrawer';
import OfflineBanner from './components/OfflineBanner';
import { jobs } from './data/JobListings';
import { translations } from './data/translations';

const EmpowerHerMain = () => {
  // System Global States
  const [lang, setLang] = useState('en');
  const [userMode, setUserMode] = useState('smartphone'); // 'smartphone' | 'panchayat'
  const [isOffline, setIsOffline] = useState(false);
  const [offlineQueue, setOfflineQueue] = useState([]);

  // User Profile State
  const [userProfile, setUserProfile] = useState({
    name: "Selvi K.",
    aadhaarNo: "XXXX-XXXX-8924",
    age: 22,
    education: "Undergraduate (B.Sc Computer Science)",
    income: 120000,
    occupation: "Student",
    location: "Kanchipuram, Tamil Nadu",
    category: "BC",
    completeness: 85
  });

  // Applications Tracking State
  const [applications, setApplications] = useState([
    {
      appId: "EMP-2026-8942",
      schemeTitle: "Pudhumai Penn Higher Education Grant",
      applicantName: "Selvi K.",
      submittedDate: "2026-09-28",
      status: "Under Verification",
      currentTimelineStep: 2,
      logs: [
        "Submitted via Online Portal on 2026-09-28",
        "Document automated OCR validation complete",
        "Assigned to Kanchipuram Panchayat Nodal Officer for verification"
      ]
    }
  ]);

  // Notifications State
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "deadline",
      title: "Pudhumai Penn Grant Application Closing Soon",
      message: "The application deadline for 2026 batch ends in 5 days. Complete your document upload.",
      time: "2 hours ago",
      read: false
    },
    {
      id: 2,
      type: "update",
      title: "Application #EMP-2026-8942 Update",
      message: "Your application passed automated document OCR verification and is now under Panchayat review.",
      time: "Yesterday",
      read: false
    },
    {
      id: 3,
      type: "alert",
      title: "New Scheme Launched: SEWA Equipment Grant",
      message: "Grants up to ₹35,000 for tailoring machines and food processing units now open for enrollment.",
      time: "3 days ago",
      read: true
    }
  ]);

  // Modals & Drawers States
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isGuidedAppOpen, setIsGuidedAppOpen] = useState(false);
  const [selectedSchemeForApp, setSelectedSchemeForApp] = useState(null);
  const [isPanchayatPortalOpen, setIsPanchayatPortalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const t = translations[lang] || translations.en;

  const handleStartApplication = (scheme) => {
    setSelectedSchemeForApp(scheme);
    setIsGuidedAppOpen(true);
  };

  const handleApplicationSubmitSuccess = (newAppRecord) => {
    if (isOffline) {
      setOfflineQueue(prev => [...prev, newAppRecord]);
      alert("Application saved locally in Offline Cache! It will sync automatically when back online.");
    } else {
      setApplications(prev => [newAppRecord, ...prev]);
      // Add a notification update
      setNotifications(prev => [
        {
          id: Date.now(),
          type: "update",
          title: `Application ${newAppRecord.appId} Submitted`,
          message: `Your application for ${newAppRecord.schemeTitle} has been registered successfully.`,
          time: "Just now",
          read: false
        },
        ...prev
      ]);
    }
  };

  const handleSyncOffline = () => {
    setApplications(prev => [...offlineQueue, ...prev]);
    setOfflineQueue([]);
    alert("Successfully synced all offline application submissions to the cloud server!");
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="empower-app">
      {/* Offline Status Banner */}
      <OfflineBanner 
        isOffline={isOffline}
        setIsOffline={setIsOffline}
        offlineQueueCount={offlineQueue.length}
        onSyncNow={handleSyncOffline}
      />

      {/* Global Header */}
      <Header 
        lang={lang}
        setLang={setLang}
        userMode={userMode}
        setUserMode={setUserMode}
        isOffline={isOffline}
        setIsOffline={setIsOffline}
        unreadCount={unreadCount}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        userProfile={userProfile}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
        onOpenPanchayatPortal={() => setIsPanchayatPortalOpen(true)}
      />

      <main>
        {/* Hero Section with OCR Quick Trigger & Multi-lingual Tagline */}
        <section className="hero container">
          <div className="hero-content">
            <span className="feature-pill-tag">
              <Sparkles size={14} /> Smart Accessibility & Welfare System
            </span>
            <h1>{t.heroTitle}</h1>
            <p>{t.heroSubtitle}</p>

            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
              <button 
                className="btn btn-primary btn-large" 
                onClick={() => setIsProfileModalOpen(true)}
              >
                <UploadCloud size={20} /> Document OCR Profile Scan
              </button>
              
              <button 
                className="btn btn-outline btn-large"
                onClick={() => setIsChatbotOpen(true)}
              >
                <Mic size={20} color="var(--primary)" /> {t.voiceAssistant}
              </button>
            </div>

            {/* Quick Profile Readiness Pill */}
            <div 
              className="glass-card" 
              style={{ marginTop: '20px', padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
              onClick={() => setIsProfileModalOpen(true)}
            >
              <UserCheck size={20} color="var(--primary)" />
              <div>
                <span style={{ fontSize: '0.88rem', fontWeight: '700' }}>
                  Applicant: {userProfile.name} ({userProfile.age} yrs, {userProfile.location})
                </span>
                <span style={{ display: 'block', fontSize: '0.78rem', color: '#666' }}>
                  Aadhaar Verified • Profile Completeness: <strong>{userProfile.completeness}%</strong> (Click to update)
                </span>
              </div>
            </div>
          </div>

          <div className="hero-image">
            <img src={heroImg} alt="Empowering Women" />
          </div>
        </section>

        {/* 1. Scheme Matching & Eligibility Engine (Steps 5 & 6) */}
        <EligibilityMatchingEngine 
          userProfile={userProfile}
          onStartApplication={handleStartApplication}
          onOpenDocumentGuide={(scheme) => handleStartApplication(scheme)}
        />

        {/* 2. Skill Learning & Home Business Enterprise (Accessibility Module 2) */}
        <SkillLearningHub userName={userProfile.name} />

        {/* 3. Job Opportunities for Women Section */}
        <section id="jobs" className="section-padding container">
          <div className="section-header text-center">
            <span className="feature-pill-tag">
              <Briefcase size={14} /> Employment & Micro-Jobs
            </span>
            <h2>Verified Job Listings for Women</h2>
            <p className="section-desc">Curated local, remote, and work-from-home career opportunities.</p>
          </div>

          <div className="schemes-grid">
            {jobs.map((job) => (
              <div key={job.id} className="scheme-card glass-card hover-lift" style={{ borderLeft: '4px solid var(--secondary)' }}>
                <h3>{job.title}</h3>
                <p style={{ color: 'var(--secondary)', fontWeight: '700', marginBottom: '10px' }}>{job.company}</p>
                <div style={{ fontSize: '0.9rem', color: '#555', marginBottom: '16px' }}>
                  <p><MapPin size={14} /> {job.location}</p>
                  <p><Briefcase size={14} /> {job.type}</p>
                  <p><Award size={14} /> {job.salary}</p>
                </div>
                <button 
                  className="btn btn-primary btn-block" 
                  onClick={() => alert(`Application for ${job.title} sent to company hiring portal!`)}
                >
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Application Tracking System (Step 9) */}
        <ApplicationTracker applications={applications} />

        {/* 5. Location-Based Support & Panchayat Help Centers (Accessibility Module 4) */}
        <LocationSupportMap />

        {/* Call to Action Banner */}
        <section className="section-padding" style={{ background: 'linear-gradient(135deg, var(--secondary), var(--primary))', color: 'white' }}>
          <div className="container" style={{ textAlign: 'center' }}>
            <h2 style={{ color: 'white', marginBottom: '15px', fontSize: '2.5rem' }}>Empowering Every Woman in India</h2>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.2rem', marginBottom: '25px', maxWidth: '700px', margin: '0 auto 25px' }}>
              Access 50+ government schemes, document OCR assistance, and skill certificates right from your phone or local Panchayat office.
            </p>
            <button 
              className="btn btn-large" 
              style={{ background: 'white', color: 'var(--primary)', padding: '16px 40px', fontSize: '1.1rem' }}
              onClick={() => setIsProfileModalOpen(true)}
            >
              Start Free Smart Assessment
            </button>
          </div>
        </section>
      </main>

      {/* Modals & Floating Drawers */}
      <UserProfileOCR 
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        userProfile={userProfile}
        setUserProfile={setUserProfile}
      />

      <GuidedApplicationModal 
        scheme={selectedSchemeForApp}
        isOpen={isGuidedAppOpen}
        onClose={() => setIsGuidedAppOpen(false)}
        userProfile={userProfile}
        onSubmitSuccess={handleApplicationSubmitSuccess}
      />

      <PanchayatAssistedPortal 
        isOpen={isPanchayatPortalOpen}
        onClose={() => setIsPanchayatPortalOpen(false)}
      />

      <NotificationsDrawer 
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        setNotifications={setNotifications}
        onSelectScheme={() => {
          const el = document.getElementById('schemes');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      <AIChatbotVoice 
        lang={lang}
        isOpen={isChatbotOpen}
        onClose={() => setIsChatbotOpen(false)}
      />

      {/* Floating Action Launcher Buttons */}
      <div style={{ position: 'fixed', bottom: '30px', right: '30px', display: 'flex', flexDirection: 'column', gap: '14px', zIndex: 1900 }}>
        {!isChatbotOpen && (
          <button 
            className="btn-primary" 
            onClick={() => setIsChatbotOpen(true)}
            style={{ width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 25px rgba(255,77,109,0.4)', cursor: 'pointer', border: 'none' }}
            title="Open AI Chatbot & Voice Assistant"
          >
            <MessageSquare size={26} color="white" />
          </button>
        )}
      </div>

      <footer style={{ background: '#140c1a', padding: '40px 0', color: '#aaa', textAlign: 'center', fontSize: '0.9rem' }}>
        <div className="container">
          <div className="logo-text" style={{ fontSize: '1.8rem', marginBottom: '10px' }}>🌸 EmpowerHer</div>
          <p>© 2026 EmpowerHer Initiative. Smart Women Empowerment System for Welfare Schemes & Employment Support.</p>
        </div>
      </footer>
    </div>
  );
};

export default EmpowerHerMain;
