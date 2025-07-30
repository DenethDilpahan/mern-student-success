import React from 'react';
import '../styles/About.css';
import profileImage from '../assets/profile.jpg';

const AboutPage = () => {
  return (
    <div className="about-container">
      <section className="section about">
        <h2>About This Platform</h2>
        <p>
          This platform was built to support students with accessible learning tools, resources,
          and teacher collaboration.
        </p>
      </section>

      <section className="section features">
        <h2>Features</h2>
        <ul>
          <li>📚 Study Planner to organize tasks and subjects</li>
          <li>👩‍🏫 Ask a Teacher and get answers anytime</li>
          <li>📈 Progress Tracking to monitor your goals</li>
          <li>🛠️ Admin Dashboard to manage platform content</li>
        </ul>
      </section>

      <section className="section mission">
        <h2>Our Mission</h2>
        <p>
          To empower every student to take charge of their learning journey using modern technology
          and support networks.
        </p>
      </section>

      <section className="section credits">
        <h2>Credits</h2>
        <div className="credit-box">
          <img src={profileImage} alt="Profile" className="profile-photo" />
          <div>
            <p>Created by <strong>Deneth Dilpahan</strong></p>
            <p>Student & Developer</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;



