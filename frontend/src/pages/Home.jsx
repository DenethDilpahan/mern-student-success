import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/Home.css';

gsap.registerPlugin(ScrollTrigger);

function Home() {
  const sectionsRef = useRef([]);
  const floatingShapesRef = useRef([]);

  useEffect(() => {
    // Scroll animations for each section
    sectionsRef.current.forEach((section, index) => {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 50,
        duration: 1,
        delay: index * 0.1,
        ease: 'power2.out',
      });
    });

    // Floating shapes animation
    floatingShapesRef.current.forEach(shape => {
      gsap.to(shape, {
        y: '+=20',
        repeat: -1,
        yoyo: true,
        duration: 3 + Math.random() * 2,
        ease: 'sine.inOut',
      });
    });
  }, []);

  return (
    <div className="home-container">
      {/* Floating background shapes */}
      <div className="floating-shape shape1" ref={el => floatingShapesRef.current[0] = el}></div>
      <div className="floating-shape shape2" ref={el => floatingShapesRef.current[1] = el}></div>

      {/* Hero Section */}
      <section className="hero" ref={el => sectionsRef.current[0] = el}>
        <h1>Empowering Students to Succeed</h1>
        <p>Plan, Learn, Collaborate, and Track with our interactive student platform.</p>
        <div className="hero-buttons">
          <Link to="/planner" className="btn-primary">Get Started</Link>
          <Link to="/about" className="btn-secondary">Learn More</Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" ref={el => sectionsRef.current[1] = el}>
        <h2>Explore Features</h2>
        <div className="feature-cards">
          {[
            { title: "📅 Study Planner", desc: "Organize daily study tasks and time." , link: "/planner" },
            { title: "❓ Ask a Teacher", desc: "Get help from real teachers." , link: "/ask" },
            { title: "📚 Resource Library", desc: "Sri Lankan syllabus study materials.", link: "/resources" },
            { title: "💬 Collaboration Zone", desc: "Study together and share notes.", link: "/collaboration" },
            { title: "📈 Progress Tracker", desc: "Track your growth and achievements.", link: "/progress" }
          ].map((feat, i) => (
            <Link to={feat.link} key={i} className="feature-card">
              <h3>{feat.title}</h3>
              <p>{feat.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works" ref={el => sectionsRef.current[2] = el}>
        <h2>How It Works</h2>
        <div className="steps">
          {[
            { step: "1", title: "Plan", desc: "Create your personalized study schedule." },
            { step: "2", title: "Learn", desc: "Access resources and ask questions." },
            { step: "3", title: "Track", desc: "Visualize your academic progress." }
          ].map((item, i) => (
            <div className="step" key={i}>
              <div className="step-circle">{item.step}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Achievements */}
      <section className="achievements" ref={el => sectionsRef.current[3] = el}>
        <h2>Our Impact</h2>
        <div className="stats">
          <div className="stat">
            <h3>500+</h3>
            <p>Students Helped</p>
          </div>
          <div className="stat">
            <h3>1000+</h3>
            <p>Questions Answered</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta" ref={el => sectionsRef.current[4] = el}>
        <h2>Be Part of Our Learning Community</h2>
        <Link to="/collaboration" className="btn-primary">Join Now</Link>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-links">
          <Link to='/planner'>Planner</Link>
          <Link to='/ask'>Ask</Link>
          <Link to='/resources'>Resources</Link>
          <Link to='/collaboration'>Collab Zone</Link>
          <Link to='/progress'>Tracker</Link>
        </div>
        <p>© 2025 Student Success Platform. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
