import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  CheckCircle, 
  ChevronRight, 
  ChevronLeft, 
  User, 
  GraduationCap, 
  Briefcase, 
  CreditCard, 
  Target, 
  Building, 
  FileText, 
  Award,
  ArrowRight
} from 'lucide-react';
import { schemes } from '../data/SchemeDatabase';
import { jobs } from '../data/JobListings';
import { skillCourses } from '../data/SkillCourses';

const AssessmentPage = ({ userProfile, setUserProfile }) => {
  const [step, setStep] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);
  const navigate = useNavigate();

  const [assessmentData, setAssessmentData] = useState({
    age: userProfile.age || 22,
    district: "Kanchipuram",
    state: "Tamil Nadu",
    education: "Graduate",
    employment: "Student",
    annualIncome: userProfile.income || 120000,
    needs: ["Education support", "Skill training"]
  });

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      // Complete Assessment & Compute Results
      setUserProfile(prev => ({
        ...prev,
        age: parseInt(assessmentData.age) || prev.age,
        income: parseInt(assessmentData.annualIncome) || prev.income,
        education: assessmentData.education,
        occupation: assessmentData.employment,
        location: `${assessmentData.district}, ${assessmentData.state}`,
        completeness: 95
      }));
      setIsCompleted(true);
    }
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const toggleNeed = (needItem) => {
    setAssessmentData(prev => {
      const exists = prev.needs.includes(needItem);
      return {
        ...prev,
        needs: exists ? prev.needs.filter(n => n !== needItem) : [...prev.needs, needItem]
      };
    });
  };

  // Calculate dynamic rule-based matching based on assessmentData
  const matchedSchemes = schemes.filter(s => {
    const ageOk = assessmentData.age >= s.eligibilityCriteria.minAge && assessmentData.age <= s.eligibilityCriteria.maxAge;
    const incomeOk = assessmentData.annualIncome <= s.eligibilityCriteria.maxIncome;
    return ageOk && incomeOk;
  });

  return (
    <div className="assessment-page-container">
      <div className="container">
        {!isCompleted ? (
          <div className="glass-card assessment-wizard-card">
            <div className="wizard-header text-center">
              <span className="feature-pill-tag">
                <Sparkles size={14} /> Interactive Smart Assessment
              </span>
              <h2>Discover Your Personalized Scheme & Skill Match Profile</h2>
              <p className="subtitle-text">Step {step} of 5 — Answer 5 quick questions for instant rule-based matching.</p>
            </div>

            {/* Step Progress Bar */}
            <div className="assessment-progress-track">
              <div 
                className="assessment-progress-fill" 
                style={{ width: `${(step / 5) * 100}%` }}
              ></div>
            </div>

            <div className="wizard-step-body" style={{ minHeight: '300px', marginTop: '30px' }}>
              {/* Step 1: Basic Information */}
              {step === 1 && (
                <div className="step-panel">
                  <h3><User size={20} color="var(--primary)" /> Step 1: Basic Information</h3>
                  <div className="manual-form-grid" style={{ marginTop: '20px' }}>
                    <div className="form-group">
                      <label>Your Age (Years)</label>
                      <input 
                        type="number" 
                        className="form-input"
                        value={assessmentData.age}
                        onChange={(e) => setAssessmentData({...assessmentData, age: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label>District</label>
                      <input 
                        type="text" 
                        className="form-input"
                        value={assessmentData.district}
                        onChange={(e) => setAssessmentData({...assessmentData, district: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label>State</label>
                      <select 
                        className="form-input"
                        value={assessmentData.state}
                        onChange={(e) => setAssessmentData({...assessmentData, state: e.target.value})}
                      >
                        <option>Tamil Nadu</option>
                        <option>Uttar Pradesh</option>
                        <option>Delhi</option>
                        <option>Maharashtra</option>
                        <option>All India</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Education */}
              {step === 2 && (
                <div className="step-panel">
                  <h3><GraduationCap size={20} color="var(--primary)" /> Step 2: Educational Qualification</h3>
                  <div className="radio-options-grid" style={{ marginTop: '20px' }}>
                    {["School (6th-10th)", "12th Passed (Govt School)", "College Student", "Graduate", "Postgraduate / Diploma", "No Formal Schooling"].map(edu => (
                      <button 
                        key={edu}
                        type="button"
                        className={`option-btn ${assessmentData.education === edu ? 'selected' : ''}`}
                        onClick={() => setAssessmentData({...assessmentData, education: edu})}
                      >
                        {edu}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Employment */}
              {step === 3 && (
                <div className="step-panel">
                  <h3><Briefcase size={20} color="var(--primary)" /> Step 3: Employment Status</h3>
                  <div className="radio-options-grid" style={{ marginTop: '20px' }}>
                    {["Student", "Employed (Salaried)", "Unemployed / Job Seeker", "Self-Employed / Entrepreneur", "Homemaker / Daily Wage Worker"].map(emp => (
                      <button 
                        key={emp}
                        type="button"
                        className={`option-btn ${assessmentData.employment === emp ? 'selected' : ''}`}
                        onClick={() => setAssessmentData({...assessmentData, employment: emp})}
                      >
                        {emp}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Income */}
              {step === 4 && (
                <div className="step-panel">
                  <h3><CreditCard size={20} color="var(--primary)" /> Step 4: Household Income</h3>
                  <p className="subtitle-text">Used by rule engine to calculate financial grant eligibility.</p>
                  
                  <div className="form-group" style={{ maxWidth: '400px', marginTop: '20px' }}>
                    <label>Annual Family Income (₹)</label>
                    <input 
                      type="number" 
                      className="form-input"
                      value={assessmentData.annualIncome}
                      onChange={(e) => setAssessmentData({...assessmentData, annualIncome: e.target.value})}
                    />
                  </div>
                </div>
              )}

              {/* Step 5: What Do You Need? */}
              {step === 5 && (
                <div className="step-panel">
                  <h3><Target size={20} color="var(--primary)" /> Step 5: What Support Do You Need?</h3>
                  <p className="subtitle-text">Select all that apply to personalize your dashboard recommendations.</p>

                  <div className="checkbox-options-grid" style={{ marginTop: '20px' }}>
                    {[
                      "Education support", 
                      "Job opportunities", 
                      "Skill training", 
                      "Financial assistance", 
                      "Business support & startup micro-loans"
                    ].map(need => {
                      const isChecked = assessmentData.needs.includes(need);
                      return (
                        <button 
                          key={need}
                          type="button"
                          className={`option-btn ${isChecked ? 'selected' : ''}`}
                          onClick={() => toggleNeed(need)}
                        >
                          {isChecked ? "✓ " : "+ "} {need}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Wizard Navigation Footer */}
            <div className="wizard-actions-bar" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
              <button 
                className="btn btn-outline" 
                onClick={handlePrev}
                disabled={step === 1}
              >
                <ChevronLeft size={16} /> Back
              </button>

              <button 
                className="btn btn-primary"
                onClick={handleNext}
              >
                {step === 5 ? "Submit & View Match Profile" : "Continue to Next Step"} <ChevronRight size={16} />
              </button>
            </div>
          </div>
        ) : (
          /* Assessment Match Results Page */
          <div className="assessment-results-wrap glass-card">
            <div className="results-header text-center">
              <div className="match-score-badge-large">
                <CheckCircle size={40} color="#2ec4b6" />
                <div>
                  <h1 style={{ margin: 0, color: 'var(--primary)' }}>98% Match Profile</h1>
                  <span className="sub-text">Calculated via EmpowerHer Rule Engine</span>
                </div>
              </div>
              <h2 style={{ marginTop: '16px' }}>Your EmpowerHer Personal Opportunity Profile</h2>
              <p className="subtitle-text">
                Based on your inputs (Age: {assessmentData.age}, Income: ₹{parseInt(assessmentData.annualIncome).toLocaleString()}, Education: {assessmentData.education}), here are your exact matches:
              </p>
            </div>

            <div className="results-sections-grid" style={{ marginTop: '30px' }}>
              {/* Eligible Schemes */}
              <div className="result-category-box">
                <h4><Building size={18} color="var(--primary)" /> Eligible Schemes ({matchedSchemes.length})</h4>
                <ul className="result-list">
                  {matchedSchemes.map(scheme => (
                    <li key={scheme.id}>
                      <strong>✓ {scheme.title}</strong>
                      <span className="sub-text">{scheme.benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommended Jobs */}
              <div className="result-category-box">
                <h4><Briefcase size={18} color="var(--secondary)" /> Recommended Jobs ({jobs.length})</h4>
                <ul className="result-list">
                  {jobs.slice(0, 2).map(job => (
                    <li key={job.id}>
                      <strong>✓ {job.title} ({job.company})</strong>
                      <span className="sub-text">{job.location} • {job.salary}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommended Skills */}
              <div className="result-category-box">
                <h4><Award size={18} color="#7012ce" /> Recommended Skill Courses ({skillCourses.length})</h4>
                <ul className="result-list">
                  {skillCourses.slice(0, 2).map(course => (
                    <li key={course.id}>
                      <strong>✓ {course.title}</strong>
                      <span className="sub-text">{course.duration} • {course.difficulty}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Required Documents */}
              <div className="result-category-box">
                <h4><FileText size={18} color="#0ca678" /> Required Documents Checklist</h4>
                <ul className="result-list">
                  <li>✓ Aadhaar Card (Linked to NPCI)</li>
                  <li>✓ Income Certificate (&lt; ₹2.5 Lakh)</li>
                  <li>✓ Community Certificate / Ration Card</li>
                </ul>
              </div>
            </div>

            <div className="results-actions-bar text-center" style={{ marginTop: '30px' }}>
              <button 
                className="btn btn-primary btn-large"
                onClick={() => navigate('/dashboard')}
              >
                Go to My Dashboard <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssessmentPage;
