import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import DashboardLayout from './layouts/DashboardLayout';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardHome from './pages/DashboardHome';
import ProfilePage from './pages/ProfilePage';
import AssessmentPage from './pages/AssessmentPage';
import SchemesPage from './pages/SchemesPage';
import ApplySchemePage from './pages/ApplySchemePage';
import DocumentsPage from './pages/DocumentsPage';
import JobsPage from './pages/JobsPage';
import SkillsPage from './pages/SkillsPage';
import TrackerPage from './pages/TrackerPage';
import HelpCentersPage from './pages/HelpCentersPage';
import VoiceAssistantPage from './pages/VoiceAssistantPage';
import NotificationsPage from './pages/NotificationsPage';
import SettingsPage from './pages/SettingsPage';

import FloatingHelpButton from './components/FloatingHelpButton';

const App = () => {
  const [lang, setLang] = useState('en');

  // Demo User State
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
      title: "Application #EMP-2026-8942 Status Update",
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

  const handleAddApplication = (newApp) => {
    setApplications(prev => [newApp, ...prev]);
    setNotifications(prev => [
      {
        id: Date.now(),
        type: "update",
        title: `Application ${newApp.appId} Registered`,
        message: `Your application for ${newApp.schemeTitle} has been submitted successfully.`,
        time: "Just now",
        read: false
      },
      ...prev
    ]);
  };

  return (
    <BrowserRouter>
      <div className="app-main-root">
        <Routes>
          {/* Public / Landing Routes */}
          <Route element={<PublicLayout lang={lang} setLang={setLang} />}>
            <Route path="/" element={<LandingPage />} />
            <Route 
              path="/login" 
              element={
                <LoginPage 
                  userProfile={userProfile} 
                  onLoginSuccess={() => {}} 
                />
              } 
            />
          </Route>

          {/* Dashboard SaaS Application Routes */}
          <Route 
            element={
              <DashboardLayout 
                userProfile={userProfile} 
                lang={lang} 
                setLang={setLang}
                notifications={notifications}
                onLogout={() => {}}
              />
            }
          >
            <Route 
              path="/dashboard" 
              element={<DashboardHome userProfile={userProfile} applications={applications} />} 
            />
            <Route 
              path="/profile" 
              element={<ProfilePage userProfile={userProfile} setUserProfile={setUserProfile} />} 
            />
            <Route 
              path="/assessment" 
              element={<AssessmentPage userProfile={userProfile} setUserProfile={setUserProfile} />} 
            />
            <Route 
              path="/schemes" 
              element={<SchemesPage userProfile={userProfile} />} 
            />
            <Route 
              path="/apply/:schemeId" 
              element={<ApplySchemePage userProfile={userProfile} onAddApplication={handleAddApplication} />} 
            />
            <Route 
              path="/documents" 
              element={<DocumentsPage userProfile={userProfile} setUserProfile={setUserProfile} />} 
            />
            <Route path="/jobs" element={<JobsPage />} />
            <Route 
              path="/skills" 
              element={<SkillsPage userName={userProfile.name} />} 
            />
            <Route 
              path="/tracker" 
              element={<TrackerPage applications={applications} />} 
            />
            <Route path="/help-centers" element={<HelpCentersPage />} />
            <Route 
              path="/voice" 
              element={<VoiceAssistantPage lang={lang} setLang={setLang} />} 
            />
            <Route 
              path="/notifications" 
              element={<NotificationsPage notifications={notifications} setNotifications={setNotifications} />} 
            />
            <Route 
              path="/settings" 
              element={<SettingsPage lang={lang} setLang={setLang} />} 
            />
          </Route>

          {/* Fallback Catch-all Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* Global Floating Help Launcher Button */}
        <FloatingHelpButton />
      </div>
    </BrowserRouter>
  );
};

export default App;
