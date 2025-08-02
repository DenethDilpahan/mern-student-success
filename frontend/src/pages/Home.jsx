import '../styles/Home.css';
import { Link } from 'react-router-dom';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import introVideo from '../assets/intro-video.mp4';

gsap.registerPlugin(ScrollTrigger);

function Home() {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const howItWorksRef = useRef(null);
  const achievementsRef = useRef(null);
  const getInvolvedRef = useRef(null);

  useEffect(() => {
    // Hero animation
    gsap.fromTo(heroRef.current, 
      { opacity: 0, scale: 0.95 }, 
      { opacity: 1, scale: 1, duration: 1.5, ease: 'power2.out' }
    );

    // Features section scroll animation
    gsap.from(featuresRef.current, {
      scrollTrigger: {
        trigger: featuresRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power2.out',
    });

    // How it Works animation (each step)
    gsap.from(howItWorksRef.current.querySelectorAll('.road-step'), {
      scrollTrigger: {
        trigger: howItWorksRef.current,
        start: 'top 80%',
      },
      opacity: 0,
      y: 50,
      stagger: 0.3,
      duration: 1,
      ease: 'power2.out',
    });

    // Achievements counter and zoom-in
    const stats = achievementsRef.current.querySelectorAll('.count-up');
    ScrollTrigger.create({
      trigger: achievementsRef.current,
      start: 'top 80%',
      onEnter: () => {
        stats.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          let count = 0;
          const increment = Math.ceil(target / 150);
          const updateCount = () => {
            if (count < target) {
              count += increment;
              counter.innerText = count;
              requestAnimationFrame(updateCount);
            } else {
              counter.innerText = target + '+';
            }
          };
          updateCount();
        });

        gsap.to(stats, {
          scale: 1.2,
          duration: 0.8,
          stagger: 0.2,
          ease: 'back.out(1.7)',
        });
      },
    });

    // Get Involved fade-in
    gsap.from(getInvolvedRef.current, {
      scrollTrigger: {
        trigger: getInvolvedRef.current,
        start: 'top 80%',
      },
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power2.out',
    });
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section" ref={heroRef}>
        <video autoPlay loop muted playsInline className="hero-video">
          <source src={introVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="hero-overlay">
          <div className="hero-content">
            <h1>Your Academic Success Begins Here</h1>
            <p>Plan, Learn, Collaborate, and Track with ease using our platform.</p>
            <div className="hero-buttons">
              <Link to="/planner" className="btn-primary">Get Started</Link>
              <Link to="/about" className="btn-secondary">Learn More</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" ref={featuresRef}>
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
      <section className="how-it-works" ref={howItWorksRef}>
        <h2>How It Works</h2>
        <div className="roadmap-container">
          <div className="road-line"></div>
          {[1, 2, 3].map(num => (
            <div key={num} className="road-step">
              <div className="circle">{num}</div>
              <div className="step-content">
                <h3>{num === 1 ? 'Plan' : num === 2 ? 'Learn' : 'Track'}</h3>
                <p>{num === 1 ? 'Create your personalized study schedule easily.'
                    : num === 2 ? 'Use resources and ask teachers for help anytime.'
                    : 'See your progress and celebrate achievements.'}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Achievements Section */}
      <section className="achievements" ref={achievementsRef}>
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

      {/* Get Involved Section */}
      <section className="get-involved" ref={getInvolvedRef}>
        <h2>Join Our Learning Community</h2>
        <Link to="/collaboration" className="btn-primary">Go to Collaboration Zone</Link>
      </section>

      {/* Footer */}
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
