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
  Bell
} from 'lucide-react';
import './EmpowerHerStyle.css';
import heroImg from './assets/images/hero.png';
import SchemeEligibilityTool from './components/SchemeEligibilityTool';
import { schemes } from './data/SchemeDatabase';
import { jobs } from './data/JobListings';

const EmpowerHerMain = () => {
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [isCheckerOpen, setIsCheckerOpen] = useState(false);
  const [voiceText, setVoiceText] = useState("");

  const toggleVoice = () => {
    setIsVoiceActive(!isVoiceActive);
    if (!isVoiceActive) {
      setVoiceText("Namaste! How can I help you today? (Try: 'Find schemes for education')");
      // Simulate voice response
      setTimeout(() => setVoiceText("Recognizing voice... Searching for Education schemes in Tamil Nadu..."), 2000);
    } else {
      setVoiceText("");
    }
  };

  const features = [
    {
      title: "Smart Eligibility Checker",
      desc: "Find government schemes you are eligible for in seconds.",
      icon: <CheckCircle className="card-icon" />,
      tag: "Awareness"
    },
    {
      title: "Job Opportunities",
      desc: "Verified local job listings curated specifically for women.",
      icon: <Briefcase className="card-icon" />,
      tag: "Employment"
    },
    {
      title: "Skill Development",
      desc: "Recommended training programs to boost your career growth.",
      icon: <Award className="card-icon" />,
      tag: "Growth"
    },
    {
      title: "Community Forum",
      desc: "Connect, share experiences, and support fellow women.",
      icon: <Users className="card-icon" />,
      tag: "Support"
    }
  ];

  return (
    <div className="empower-app">
      <header>
        <div className="container" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
          <div className="logo">EmpowerHer</div>
          <nav>
            <a href="#schemes">Schemes</a>
            <a href="#jobs">Jobs</a>
            <a href="#skills">Skills</a>
            <a href="#community">Community</a>
            <button className="btn btn-primary" style={{marginLeft: '20px'}}>Sign In</button>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="hero container">
          <div className="hero-content">
            <span className="feature-tag">Holistic Women's Empowerment</span>
            <h1>Bridging the Gap for Every Woman.</h1>
            <p>
              Easy access to government schemes, job opportunities, and skill development—all in one place. 
              Designed for rural women, working professionals, students, and seniors.
            </p>
            <div style={{display: 'flex', gap: '15px'}}>
              <button className="btn btn-primary" onClick={() => setIsCheckerOpen(true)}>
                Check Eligibility <ArrowRight size={18} />
              </button>
              <button 
                className={`btn ${isVoiceActive ? 'btn-primary' : ''}`} 
                onClick={toggleVoice}
                style={{
                  background: isVoiceActive ? '#ff4d6d' : '#f0f0f0', 
                  color: isVoiceActive ? 'white' : '#1a1a1a',
                  position: 'relative'
                }}
              >
                <Mic size={18} /> {isVoiceActive ? "Listening..." : "Voice Assistant"}
              </button>
            </div>
            {isVoiceActive && (
              <div className="glass-card" style={{
                marginTop: '15px', padding: '10px 20px', 
                borderLeft: '4px solid var(--primary)', animation: 'fadeIn 0.5s ease'
              }}>
                <p style={{fontSize: '0.9rem', fontStyle: 'italic', margin: 0}}>{voiceText}</p>
              </div>
            )}
          </div>
          <div className="hero-image">
            <img src={heroImg} alt="Empowering Women" />
          </div>
        </section>

        {/* Search Bar Section */}
        <section className="section" style={{background: '#f8f9fa'}}>
          <div className="container">
            <div className="glass-card" style={{display: 'flex', gap: '20px', alignItems: 'center', padding: '15px 30px', marginTop: '-120px', position: 'relative', zIndex: '10'}}>
              <div style={{flex: 1, display: 'flex', alignItems: 'center', gap: '10px', borderRight: '1px solid #ddd'}}>
                <Search size={20} color="#666" />
                <input type="text" placeholder="Search for schemes (e.g. Education, Health)" style={{border: 'none', outline: 'none', width: '100%', fontSize: '1rem', background: 'transparent'}} />
              </div>
              <div style={{flex: 1, display: 'flex', alignItems: 'center', gap: '10px'}}>
                <MapPin size={20} color="#666" />
                <input type="text" placeholder="Your Location" defaultValue="Tamil Nadu, India" style={{border: 'none', outline: 'none', width: '100%', fontSize: '1rem', background: 'transparent'}} />
              </div>
              <button className="btn btn-primary">Find Support</button>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="section container">
          <div className="section-title">
            <span className="feature-tag">Our Services</span>
            <h2>Designed for Your Empowerment</h2>
          </div>
          <div className="grid">
            {features.map((f, i) => (
              <div key={i} className="card">
                <div style={{color: 'var(--primary)', marginBottom: '15px'}}>{f.icon}</div>
                <span className="feature-tag">{f.tag}</span>
                <h3>{f.title}</h3>
                <p style={{marginTop: '10px', color: '#666'}}>{f.desc}</p>
                <button style={{marginTop: '20px', background: 'none', border: 'none', color: 'var(--primary)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer'}}>
                  Explore More <ChevronRight size={16} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Job Listings Section */}
        <section id="jobs" className="section container">
          <div className="section-title">
            <span className="feature-tag">Opportunities</span>
            <h2>Verified Job Listings for Women</h2>
          </div>
          <div className="grid">
            {jobs.map((job) => (
              <div key={job.id} className="card" style={{borderLeft: '4px solid var(--secondary)'}}>
                <h3>{job.title}</h3>
                <p style={{color: 'var(--secondary)', fontWeight: '600'}}>{job.company}</p>
                <div style={{margin: '15px 0', fontSize: '0.9rem', color: '#666'}}>
                  <p><MapPin size={14} /> {job.location}</p>
                  <p><Briefcase size={14} /> {job.type}</p>
                  <p><Award size={14} /> {job.salary}</p>
                </div>
                <button className="btn btn-primary" style={{width: '100%', fontSize: '0.9rem'}}>Apply Now</button>
              </div>
            ))}
          </div>
          <div style={{textAlign: 'center', marginTop: '40px'}}>
             <button className="btn" style={{border: '2px solid var(--primary)', color: 'var(--primary)'}}>View All 150+ Jobs</button>
          </div>
        </section>

        {/* Call to Action */}
        <section className="section" style={{background: 'linear-gradient(135deg, var(--secondary), var(--primary))', color: 'white'}}>
          <div className="container" style={{textAlign: 'center'}}>
            <h2 style={{color: 'white', marginBottom: '20px'}}>Ready to take the next step?</h2>
            <p style={{color: 'rgba(255,255,255,0.8)', fontSize: '1.2rem', marginBottom: '30px', maxWidth: '700px', margin: '0 auto 30px'}}>
              Join thousands of women who are finding new opportunities and securing their future with EmpowerHer.
            </p>
            <button className="btn" style={{background: 'white', color: 'var(--primary)', padding: '15px 40px', fontSize: '1.1rem'}}>
              Start Free Assessment
            </button>
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <div className="logo" style={{filter: 'brightness(0) invert(1)', marginBottom: '20px'}}>EmpowerHer</div>
          <p style={{color: '#888'}}>© 2026 EmpowerHer Initiative. Holistic support for every woman.</p>
          <div style={{display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px'}}>
            <a href="#" style={{color: '#888'}}>About</a>
            <a href="#" style={{color: '#888'}}>Privacy</a>
            <a href="#" style={{color: '#888'}}>Terms</a>
            <a href="#" style={{color: '#888'}}>Contact</a>
          </div>
        </div>
      </footer>

      <SchemeEligibilityTool isOpen={isCheckerOpen} onClose={() => setIsCheckerOpen(false)} />

      {/* Floating Action Buttons */}
      <div style={{position: 'fixed', bottom: '30px', right: '30px', display: 'flex', flexDirection: 'column', gap: '15px'}}>
        <button className="btn-primary" style={{width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 20px rgba(0,0,0,0.2)', cursor: 'pointer'}}>
          <MessageSquare size={24} />
        </button>
        <button className="btn" style={{background: 'white', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 20px rgba(0,0,0,0.1)', cursor: 'pointer'}}>
          <Bell size={24} color="var(--primary)" />
        </button>
      </div>
    </div>
  );
};

export default EmpowerHerMain;
