import React, { useState } from 'react';
import { 
  GraduationCap, 
  PlayCircle, 
  CheckCircle, 
  Lock, 
  Award, 
  BookOpen, 
  Download, 
  Check, 
  Sparkles,
  Calculator
} from 'lucide-react';
import { skillCourses } from '../data/SkillCourses';

const SkillsPage = ({ userName }) => {
  const [coursesList, setCoursesList] = useState(skillCourses);
  const [activeCourseModal, setActiveCourseModal] = useState(null);
  const [unlockedCertificate, setUnlockedCertificate] = useState(null);

  // Profit calculator state
  const [calcCost, setCalcCost] = useState(150);
  const [calcMargin, setCalcMargin] = useState(30);

  const handleMarkLessonComplete = (courseId, lessonId) => {
    setCoursesList(prev => prev.map(course => {
      if (course.id === courseId) {
        const updatedLessons = course.lessons.map(les => {
          if (les.id === lessonId) return { ...les, completed: true, active: false };
          if (les.id === lessonId + 1) return { ...les, locked: false, active: true };
          return les;
        });
        const completedCount = updatedLessons.filter(l => l.completed).length;
        const newProgress = Math.round((completedCount / course.totalLessons) * 100);

        const updatedCourse = {
          ...course,
          lessons: updatedLessons,
          progress: newProgress,
          lessonsCompleted: completedCount
        };

        if (activeCourseModal && activeCourseModal.id === courseId) {
          setActiveCourseModal(updatedCourse);
        }

        if (newProgress === 100) {
          setUnlockedCertificate(updatedCourse);
        }

        return updatedCourse;
      }
      return course;
    }));
  };

  const calculateSellingPrice = () => {
    const profit = (calcCost * calcMargin) / 100;
    return Math.round(calcCost + profit);
  };

  return (
    <div className="skills-page-container">
      <div className="page-header-title">
        <h2>Skill Learning Hub & Micro-Business Toolkit</h2>
        <p className="subtitle-text">Master verified vocational skills, track video lessons, and earn digital certificates.</p>
      </div>

      {/* Courses Catalog Grid */}
      <div className="skills-grid" style={{ marginTop: '24px' }}>
        {coursesList.map((course) => (
          <div key={course.id} className="skill-course-card glass-card hover-lift">
            <div className="course-image-wrap">
              <img src={course.image} alt={course.title} />
              <span className="course-level-badge">{course.difficulty}</span>
              <button 
                className="play-overlay-btn"
                onClick={() => setActiveCourseModal(course)}
              >
                <PlayCircle size={44} color="white" />
              </button>
            </div>

            <div className="course-card-content">
              <span className="course-cat-tag">{course.category}</span>
              <h3>{course.title}</h3>
              <p className="instructor-text">By {course.instructor} • {course.duration}</p>

              {/* Progress Bar */}
              <div className="course-progress-wrap" style={{ margin: '14px 0' }}>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: `${course.progress}%` }}></div>
                </div>
                <span className="progress-num-text">{course.progress}% Complete ({course.lessonsCompleted}/{course.totalLessons} Lessons)</span>
              </div>

              {/* Lesson Checklist Preview */}
              <ul className="lessons-preview-list" style={{ listStyle: 'none', fontSize: '0.85rem', marginBottom: '16px' }}>
                {course.lessons.map(les => (
                  <li key={les.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', color: les.completed ? '#0ca678' : les.active ? 'var(--primary)' : '#888' }}>
                    {les.completed ? <CheckCircle size={14} color="#0ca678" /> : les.locked ? <Lock size={13} color="#ccc" /> : <PlayCircle size={14} color="var(--primary)" />}
                    <span>{les.title}</span>
                  </li>
                ))}
              </ul>

              <div className="course-card-footer">
                <button 
                  className="btn btn-primary btn-sm btn-block"
                  onClick={() => setActiveCourseModal(course)}
                >
                  <BookOpen size={14} /> {course.progress === 100 ? 'View Lessons & Badge' : 'Continue Learning'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Profit Calculator Section */}
      <div className="business-guidance-box glass-card" style={{ marginTop: '40px', padding: '30px' }}>
        <div className="title-with-icon" style={{ marginBottom: '20px' }}>
          <Calculator size={28} color="var(--primary)" />
          <div>
            <h3>Interactive Home Business Profit & Pricing Calculator</h3>
            <p className="subtitle-text">Calculate material costs and recommended selling price for handmade tailoring, food processing, or cosmetics</p>
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

        {/* Pre-built Home Business Startup Guides */}
        <h4 style={{ marginTop: '30px', marginBottom: '14px', fontSize: '1.05rem', color: 'var(--text-dark)' }}>
          🚀 Ready-to-Launch Micro-Business Kits (Costing & Marketing Plans)
        </h4>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          <div className="glass-card" style={{ padding: '16px', border: '1px solid #e9ecef', borderRadius: '12px' }}>
            <h5 style={{ margin: '0 0 6px', color: 'var(--primary)' }}>🧵 Custom Tailoring & Aari Embroidery</h5>
            <p style={{ fontSize: '0.82rem', color: '#666', marginBottom: '10px' }}>Setup: ₹12,000 (Sewing machine + toolkit) • Margin: 45-50%</p>
            <div style={{ background: '#f8f9fa', padding: '10px', borderRadius: '8px', fontSize: '0.8rem', color: '#444', marginBottom: '10px' }}>
              <strong>📱 WhatsApp Marketing Template:</strong><br />
              "🌸 Custom Designer Blouses & Stitching in our village! 48-hr delivery with perfect fit. DM or Call for orders!"
            </div>
            <button className="btn btn-outline btn-sm btn-block" onClick={() => alert("Costing sheet & WhatsApp catalogue guide copied!")}>
              Copy Promotion Template
            </button>
          </div>

          <div className="glass-card" style={{ padding: '16px', border: '1px solid #e9ecef', borderRadius: '12px' }}>
            <h5 style={{ margin: '0 0 6px', color: 'var(--secondary)' }}>🧼 Organic Cold-Pressed Herbal Soaps</h5>
            <p style={{ fontSize: '0.82rem', color: '#666', marginBottom: '10px' }}>Setup: ₹6,500 (Oils, lye, silicone molds) • Margin: 55%</p>
            <div style={{ background: '#f8f9fa', padding: '10px', borderRadius: '8px', fontSize: '0.8rem', color: '#444', marginBottom: '10px' }}>
              <strong>📱 WhatsApp Marketing Template:</strong><br />
              "🌿 100% Chemical-Free Neem & Turmeric Soaps made at home with pure coconut oil. Keep skin glowing naturally! Sample at ₹50."
            </div>
            <button className="btn btn-outline btn-sm btn-block" onClick={() => alert("Costing sheet & WhatsApp catalogue guide copied!")}>
              Copy Promotion Template
            </button>
          </div>

          <div className="glass-card" style={{ padding: '16px', border: '1px solid #e9ecef', borderRadius: '12px' }}>
            <h5 style={{ margin: '0 0 6px', color: '#0ca678' }}>🌾 Millet Health Mix & Value Snacks</h5>
            <p style={{ fontSize: '0.82rem', color: '#666', marginBottom: '10px' }}>Setup: ₹8,000 (Grains, roasting pans, sealer) • Margin: 35-40%</p>
            <div style={{ background: '#f8f9fa', padding: '10px', borderRadius: '8px', fontSize: '0.8rem', color: '#444', marginBottom: '10px' }}>
              <strong>📱 WhatsApp Marketing Template:</strong><br />
              "🌾 Healthy Ragi & Kambu Multigrain Nutri-Mix for kids and elders. Zero preservatives, stone ground. Order your 500g pack today!"
            </div>
            <button className="btn btn-outline btn-sm btn-block" onClick={() => alert("Costing sheet & WhatsApp catalogue guide copied!")}>
              Copy Promotion Template
            </button>
          </div>
        </div>
      </div>

      {/* Course Detail Modal */}
      {activeCourseModal && (
        <div className="modal-overlay">
          <div className="glass-card modal-container modal-large">
            <div className="modal-header">
              <div>
                <span className="course-cat-tag">{activeCourseModal.category}</span>
                <h2>{activeCourseModal.title}</h2>
              </div>
              <button className="modal-close-btn" onClick={() => setActiveCourseModal(null)}>✕</button>
            </div>

            <div className="modal-body">
              <div className="video-player-container" style={{ aspectRatio: '16/9', background: '#000', borderRadius: '12px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <iframe 
                  width="100%" 
                  height="100%" 
                  src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=0" 
                  title={activeCourseModal.title}
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>

              <h4 style={{ marginTop: '20px', marginBottom: '12px' }}>Interactive Lesson Checklist</h4>
              <div className="lessons-interactive-list" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {activeCourseModal.lessons.map(les => (
                  <div 
                    key={les.id} 
                    style={{
                      padding: '12px 16px',
                      borderRadius: '10px',
                      background: les.completed ? '#f4fbf8' : les.active ? '#fff0f3' : '#fafafa',
                      border: les.completed ? '1px solid #c3fae8' : les.active ? '1px solid var(--primary)' : '1px solid #eee',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      {les.completed ? (
                        <CheckCircle size={18} color="#0ca678" />
                      ) : les.locked ? (
                        <Lock size={16} color="#aaa" />
                      ) : (
                        <PlayCircle size={18} color="var(--primary)" />
                      )}
                      <strong style={{ fontSize: '0.92rem', color: les.locked ? '#888' : 'var(--text-dark)' }}>
                        {les.title}
                      </strong>
                    </div>

                    {!les.completed && !les.locked && (
                      <button 
                        className="btn btn-primary btn-sm"
                        onClick={() => handleMarkLessonComplete(activeCourseModal.id, les.id)}
                      >
                        <Check size={14} /> Mark Lesson Complete
                      </button>
                    )}
                    {les.completed && <span style={{ color: '#0ca678', fontWeight: '700', fontSize: '0.85rem' }}>✓ Completed</span>}
                    {les.locked && <span style={{ color: '#aaa', fontSize: '0.85rem' }}>🔒 Locked</span>}
                  </div>
                ))}
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-outline" onClick={() => setActiveCourseModal(null)}>Close Video</button>
              {activeCourseModal.progress === 100 && (
                <button className="btn btn-primary" onClick={() => setUnlockedCertificate(activeCourseModal)}>
                  <Award size={16} /> View Unlocked Certificate
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Certificate Unlocked Modal */}
      {unlockedCertificate && (
        <div className="modal-overlay">
          <div className="glass-card modal-container">
            <div className="modal-header">
              <h2>🎉 Certificate Unlocked!</h2>
              <button className="modal-close-btn" onClick={() => setUnlockedCertificate(null)}>✕</button>
            </div>

            <div className="modal-body">
              <div className="certificate-frame" style={{ border: '4px double var(--secondary)', padding: '30px', textAlign: 'center', background: '#fff', borderRadius: '16px' }}>
                <Award size={56} color="var(--secondary)" style={{ margin: '0 auto 10px' }} />
                <h3 style={{ margin: '5px 0', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Certificate of Empowerment
                </h3>
                <p style={{ color: '#666', fontStyle: 'italic', fontSize: '0.9rem' }}>Presented to</p>
                <h2 style={{ color: 'var(--primary)', textDecoration: 'underline', margin: '10px 0' }}>
                  {userName || 'Selvi K.'}
                </h2>
                <p style={{ margin: '10px 0', fontSize: '0.95rem' }}>
                  For successfully completing 100% course requirements in <strong>{unlockedCertificate.title}</strong> as a verified <strong>{unlockedCertificate.certificateName}</strong>.
                </p>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-primary" onClick={() => { alert("Certificate downloaded as PDF!"); setUnlockedCertificate(null); }}>
                <Download size={16} /> Download Official PDF Certificate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsPage;
