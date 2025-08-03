import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/Home.css';

gsap.registerPlugin(ScrollTrigger);

function Home() {
  const sectionsRef = useRef([]);

  useEffect(() => {
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
  }, []);

  return (
    <div className="home-container">
      {/* Static Background Blobs */}
      <div className="background-blobs">
        <div className="blob blob1"></div>
        <div className="blob blob2"></div>
        <div className="blob blob3"></div>
      </div>

      {/* Hero Section */}
      <section className="hero" ref={el => sectionsRef.current[0] = el}>
        <h1>Your Academic Success Begins Here</h1>
        <p>Plan, Learn, Collaborate, and Track with ease using our platform.</p>
        <div className="hero-buttons">
          <Link to="/planner" className="btn-primary">Get Started</Link>
          <Link to="/about" className="btn-secondary">Learn More</Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" ref={el => sectionsRef.current[1] = el}>
        <h2>Platform Features</h2>
        <div className="feature-cards">
          {[
            { title: "Study Planner", desc: "Organize daily tasks and manage time." },
            { title: "Ask a Teacher", desc: "Get help from real teachers anytime." },
            { title: "Resource Library", desc: "Sri Lankan syllabus-based materials." },
            { title: "Collaboration Zone", desc: "Connect, share notes, and study together." },
            { title: "Progress Tracker", desc: "Visualize your academic growth." },
          ].map((feat, i) => (
            <div key={i} className="feature-card">
              <h3>{feat.title}</h3>
              <p>{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials" ref={el => sectionsRef.current[2] = el}>
        <h2>What Students Say</h2>
        <div className="testimonial-cards">
          <div className="testimonial-card">
            <p>"This platform made my studies so much easier. The planner is a lifesaver!"</p>
            <h4>– Anuki D.</h4>
          </div>
          <div className="testimonial-card">
            <p>"I love how I can ask teachers and get answers quickly."</p>
            <h4>– Sachini W.</h4>
          </div>
          <div className="testimonial-card">
            <p>"Progress Tracker keeps me motivated to study every day!"</p>
            <h4>– Dilan P.</h4>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works" ref={el => sectionsRef.current[3] = el}>
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-circle">1</div>
            <h3>Plan</h3>
            <p>Create your personalized study schedule easily.</p>
          </div>
          <div className="step">
            <div className="step-circle">2</div>
            <h3>Learn</h3>
            <p>Use resources and ask teachers for help anytime.</p>
          </div>
          <div className="step">
            <div className="step-circle">3</div>
            <h3>Track</h3>
            <p>See your progress and celebrate achievements.</p>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="achievements" ref={el => sectionsRef.current[4] = el}>
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

      {/* CTA Section */}
      <section className="cta" ref={el => sectionsRef.current[5] = el}>
        <h2>Join Our Learning Community Today</h2>
        <Link to="/collaboration" className="btn-primary">Get Started Now</Link>
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
