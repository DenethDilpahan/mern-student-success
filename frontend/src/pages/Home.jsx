import '../styles/Home.css';
import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useRef } from 'react';
import introVideo from '../assets/intro-video.mp4';

function Home() {

  const ref = useRef(null);

  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: 'smooth'});
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        // Count Up Logic for Stats
        if (entry.target.classList.contains('achievements')) {
          const counters = entry.target.querySelectorAll('.count-up');
          counters.forEach(counter => {
            const updateCount = () => {
              const target = +counter.getAttribute('data-target');
              const current = +counter.innerText;

              const increment = Math.ceil(target / 150); // Adjust speed

              if (current < target) {
                counter.innerText = current + increment;
                setTimeout(updateCount, 20);
              } else {
                counter.innerText = target + '+';
              }
            };
            updateCount();
          });
        }
      }
    });
  }, { threshold: 0.2 });


    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => observer.observe(el));

    // Cleanup on unmount
    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section with Video Background */}
      <section className="hero-section">
        <video autoPlay loop muted playsInline className="hero-video">
          <source src={introVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="hero-overlay">
          <div className="hero-content animate-on-scroll">
            <h1>Your Academic Success Begins Here</h1>
            <p>Plan, Learn, Collaborate, and Track with ease using our platform.</p>
            <div className="hero-buttons">
              <button className="btn-primary" onClick={handleClick}>Get Started</button>
              <Link to="/about" className="btn-secondary">Learn More</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={ref} className="features-section animate-on-scroll">
        <h2>Platform Features</h2>
        <div className="feature-boxes">
          <Link to="/planner" className="feature-box">
            <h3>📅 Study Planner</h3>
            <p>Organize your daily study tasks and manage your time effectively.</p>
          </Link>
          <Link to="/ask" className="feature-box">
            <h3>❓ Ask a Teacher</h3>
            <p>Submit your academic questions and get help from real teachers.</p>
          </Link>
          <Link to="/resources" className="feature-box">
            <h3>📚 Resource Library</h3>
            <p>Access grade-specific study materials based on the Sri Lankan syllabus.</p>
          </Link>
          <Link to="/collaboration" className="feature-box">
            <h3>💬 Collaboration Zone</h3>
            <p>Connect with peers to study together, share notes, and discuss topics.</p>
          </Link>
          <Link to="/progress" className="feature-box">
            <h3>📈 Progress Tracker</h3>
            <p>Track your academic growth, achievements, and completed tasks.</p>
          </Link>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works animate-on-scroll">
        <h2>How It Works</h2>
        <div className="roadmap-container">
          <div className="road-line"></div>

          <div className="road-step">
            <div className="circle">1</div>
            <div className="step-content">
              <h3>Plan</h3>
              <p>Create your personalized study schedule easily.</p>
            </div>
          </div>

          <div className="road-step">
            <div className="circle">2</div>
            <div className="step-content">
              <h3>Learn</h3>
              <p>Use resources and ask teachers for help anytime.</p>
            </div>
          </div>

          <div className="road-step">
            <div className="circle">3</div>
            <div className="step-content">
              <h3>Track</h3>
              <p>See your progress and celebrate achievements.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="achievements animate-on-scroll">
        <h2>Our Impact</h2>
        <div className="stats">
          <div className="stat">
            <h3 className="count-up" data-target="500">0</h3>
            <p>Students Helped</p>
          </div>
          <div className="stat">
            <h3 className="count-up" data-target="1000">0</h3>
            <p>Questions Answered</p>
          </div>
        </div>
      </section>

      {/* Get Involved */}
      <section className="get-involved animate-on-scroll">
        <h2>Join Our Learning Community</h2>
        <Link to="/collaboration" className="btn-primary">Go to Collaboration Zone</Link>
      </section>


      <footer className="footer-section">
        <div className="footer-columns">
          <div className="footer-column">
            <h4>Solutions</h4>
            <ul>
              <li><Link to='/planner'>Study Planner</Link></li>
              <li><Link to='/ask'>Teacher Q&A</Link></li>
              <li><Link to='/resources'>Resource Library</Link></li>
              <li><Link to='/collaboration'>Collaboration Zone</Link></li>
              <li><Link to='/progress'>Progress Tracker</Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>About Us</h4>
            <ul>
              <li>Our Story</li>
              <li>Contact</li>
              <li>Careers</li>
              <li>Feedback</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-socials">
            <a href="#"><i className="fab fa-x-twitter"></i></a>
            <a href="#"><i className="fab fa-linkedin"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-facebook"></i></a>
          </div>
        </div>

        <div className="footer-copyright">
          <p>© 2025 Student Success Platform. All rights reserved.</p>
          <div>
            <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default Home;
