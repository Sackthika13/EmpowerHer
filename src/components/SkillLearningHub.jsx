import React, { useState } from 'react';
import { 
  Award, 
  PlayCircle, 
  Scissors, 
  Sparkles, 
  Utensils, 
  Smartphone, 
  Calculator, 
  CheckCircle2, 
  Download, 
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { skillCourses } from '../data/SkillCourses';

const SkillLearningHub = ({ userName }) => {
  const [activeCourse, setActiveCourse] = useState(null);
  const [calcCost, setCalcCost] = useState(150);
  const [calcMargin, setCalcMargin] = useState(30);
  const [claimedBadge, setClaimedBadge] = useState(null);

  const calculateSellingPrice = () => {
    const profit = (calcCost * calcMargin) / 100;
    return Math.round(calcCost + profit);
  };

  return (
    <section id="skills" className="section-padding bg-light">
      <div className="container">
        <div className="section-header text-center">
          <span className="feature-pill-tag">
            <Award size={14} /> Skill Learning & Home Business Enterprise
          </span>
          <h2>Empowerment Video Courses & Micro-Business Toolkit</h2>
          <p className="section-desc">
            Structured skill training from beginner to advanced level with verified digital certificates & business guidance.
          </p>
        </div>

        {/* Course Catalog Grid */}
        <div className="skills-grid">
          {skillCourses.map((course) => (
            <div key={course.id} className="skill-course-card glass-card hover-lift">
              <div className="course-image-wrap">
                <img src={course.image} alt={course.title} />
                <span className="course-level-badge">{course.level}</span>
                <button 
                  className="play-overlay-btn"
                  onClick={() => setActiveCourse(course)}
                >
                  <PlayCircle size={44} color="white" />
                </button>
              </div>

              <div className="course-card-content">
                <span className="course-cat-tag">{course.category}</span>
                <h3>{course.title}</h3>
                <p className="instructor-text">By {course.instructor} • {course.duration}</p>

                <div className="modules-list-preview">
                  <strong>Structured Learning Modules:</strong>
                  <ul>
                    {course.modules.slice(0, 3).map((mod, i) => (
                      <li key={i}>• {mod}</li>
                    ))}
                  </ul>
                </div>

                <div className="course-card-footer">
                  <button 
                    className="btn btn-outline btn-sm"
                    onClick={() => setActiveCourse(course)}
                  >
                    <BookOpen size={14} /> Watch Lessons
                  </button>
                  <button 
                    className="btn btn-primary btn-sm"
                    onClick={() => setClaimedBadge(course)}
                  >
                    <Award size={14} /> Claim Certificate
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Home Business Guidance Section */}
        <div className="business-guidance-box glass-card" style={{ marginTop: '40px', padding: '30px' }}>
          <div className="title-with-icon" style={{ marginBottom: '20px' }}>
            <Calculator size={28} color="var(--primary)" />
            <div>
              <h3>Interactive Home Business Profit Calculator</h3>
              <p className="subtitle-text">Estimate raw material costs & pricing for your handmade tailoring, soap, or food product</p>
            </div>
          </div>

          <div className="calculator-grid">
            <div className="calc-input-group">
              <label>Raw Material Cost Per Item (₹)</label>
              <input 
                type="number" 
                className="form-input"
                value={calcCost}
                onChange={(e) => setCalcCost(parseFloat(e.target.value) || 0)}
              />
            </div>

            <div className="calc-input-group">
              <label>Desired Profit Margin (%)</label>
              <input 
                type="number" 
                className="form-input"
                value={calcMargin}
                onChange={(e) => setCalcMargin(parseFloat(e.target.value) || 0)}
              />
            </div>

            <div className="calc-result-card">
              <span>Recommended Selling Price:</span>
              <strong className="result-price">₹{calculateSellingPrice()}</strong>
              <span className="profit-text">Net Profit: ₹{calculateSellingPrice() - calcCost} / unit</span>
            </div>
          </div>
        </div>
      </div>

      {/* Video Lesson Modal */}
      {activeCourse && (
        <div className="modal-overlay">
          <div className="glass-card modal-container modal-large">
            <div className="modal-header">
              <div>
                <span className="course-cat-tag">{activeCourse.category}</span>
                <h2>{activeCourse.title}</h2>
              </div>
              <button className="modal-close-btn" onClick={() => setActiveCourse(null)}>✕</button>
            </div>

            <div className="modal-body">
              <div className="video-player-container" style={{ aspectRatio: '16/9', background: '#000', borderRadius: '12px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <iframe 
                  width="100%" 
                  height="100%" 
                  src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=0" 
                  title={activeCourse.title}
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>

              <h4 style={{ marginTop: '20px' }}>Course Syllabus & Lessons</h4>
              <ul className="step-number-list">
                {activeCourse.modules.map((modText, idx) => (
                  <li key={idx}><span>Lesson {idx + 1}:</span> {modText}</li>
                ))}
              </ul>
            </div>

            <div className="modal-footer">
              <button className="btn btn-outline" onClick={() => setActiveCourse(null)}>Close Video</button>
              <button 
                className="btn btn-primary"
                onClick={() => {
                  const c = activeCourse;
                  setActiveCourse(null);
                  setClaimedBadge(c);
                }}
              >
                <Award size={16} /> Complete & Claim Badge
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Certificate Claim Modal */}
      {claimedBadge && (
        <div className="modal-overlay">
          <div className="glass-card modal-container">
            <div className="modal-header">
              <h2>Official Skill Certificate & Badge</h2>
              <button className="modal-close-btn" onClick={() => setClaimedBadge(null)}>✕</button>
            </div>

            <div className="modal-body">
              <div className="certificate-frame" style={{ border: `4px double ${claimedBadge.badgeColor}`, padding: '30px', textAlign: 'center', background: '#fff', borderRadius: '16px' }}>
                <Award size={56} color={claimedBadge.badgeColor} style={{ margin: '0 auto 10px' }} />
                <h3 style={{ margin: '5px 0', textTransform: 'uppercase', letterSpacing: '1px', color: '#111' }}>
                  Certificate of Empowerment
                </h3>
                <p style={{ color: '#666', fontStyle: 'italic', fontSize: '0.9rem' }}>This is proudly presented to</p>
                <h2 style={{ color: 'var(--primary)', textDecoration: 'underline', margin: '10px 0' }}>
                  {userName || 'Selvi K.'}
                </h2>
                <p style={{ margin: '10px 0', fontSize: '0.95rem' }}>
                  For successfully mastering the course <strong>{claimedBadge.title}</strong> and demonstrating proficiency as a certified <strong>{claimedBadge.badgeName}</strong>.
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '25px', paddingTop: '15px', borderTop: '1px solid #eee', fontSize: '0.8rem', color: '#888' }}>
                  <span>Verified by EmpowerHer Skill Board</span>
                  <span>Issued Date: {new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button 
                className="btn btn-primary"
                onClick={() => {
                  alert("Certificate downloaded as PDF/Image!");
                  setClaimedBadge(null);
                }}
              >
                <Download size={16} /> Download Certificate (PDF)
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SkillLearningHub;
