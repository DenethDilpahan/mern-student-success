import React from 'react';
import '../styles/About.css';
import profileImage from '../assets/profile.jpg';

const AboutPage = () => {
  return (
    <div className="about-container">

      <section className="about-hero-section">
        <h1>🎓 Student Success Platform</h1>
        <p>Empowering students with technology to organize, learn, and grow.</p>
      </section>

      <section className="section about">
        <h2>📖 Project Overview</h2>
        <p>
          The Student Success Platform is a full-stack web application designed to support students in managing their academic journey through interactive tools, collaborative features, and a centralized resource library.
          It integrates study planning, progress tracking, peer collaboration, and teacher communication within a single ecosystem — efficiently managed via an admin dashboard.
        </p>
      </section>

      <section className="section tech-stack">
        <h2>🛠️ Technology Stack</h2>
        <div className="tech-grid">
          <div className="tech-card">
            <h3>Frontend – React.js</h3>
            <p>Built with React's component-based structure for dynamic UI rendering, efficient state management, and protected routing based on user roles.</p>
          </div>
          <div className="tech-card">
            <h3>Styling & Animations – CSS & GSAP</h3>
            <p>Core layouts and responsive design handled with CSS. GSAP powers smooth animations such as page transitions and interactive elements.</p>
          </div>
          <div className="tech-card">
            <h3>Backend – Node.js & Express.js</h3>
            <p>Express.js provides a robust REST API framework with secure JWT-based authentication and role-based authorization for Admin and Teachers.</p>
          </div>
          <div className="tech-card">
            <h3>Database – MongoDB</h3>
            <p>NoSQL database architecture with collections for Users, Resources, Collaboration Posts, Progress Goals, and Announcements ensuring flexibility and scalability.</p>
          </div>
        </div>
      </section>

      <section className="section features">
        <h2>✨ Key Features</h2>
        <ul>
          <li>📅 Study Planner to organize tasks and subjects</li>
          <li>🧑‍🏫 Ask a Teacher anytime for academic support</li>
          <li>📊 Progress Tracker to monitor goals and achievements</li>
          <li>🛠️ Admin Dashboard for content management and system oversight</li>
        </ul>
      </section>

      <section className="section mission">
        <h2>🚀 Our Mission</h2>
        <p>
          To empower students to take ownership of their learning journey with modern technology, fostering a culture of self-learning, collaboration, and guided mentorship.
        </p>
      </section>

      <section className="section credits">
        <h2>👤 Project Creator</h2>
        <div className="credit-box">
          <img src={profileImage} alt="Profile" className="profile-photo" />
          <div>
            <p><strong>Deneth Dilpahan</strong></p>
            <p>Student & Developer</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
