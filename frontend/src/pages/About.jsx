import React from 'react';
import '../styles/About.css';
import profileImage from '../assets/profile.jpg';

const AboutPage = () => {
  return (
    <div className="about-container">
        <section className="section about">
        <h1>About This Project</h1>
        <p>
          The Student Success Platform is a comprehensive educational tool designed to support students in their academic journey.
          It offers a variety of features including:
        </p>
        <ul>
          <li>Personalized Study Planner to organize daily tasks</li>
          <li>Resource Library with subject-wise materials</li>
          <li>Collaboration Zone to interact and share ideas</li>
          <li>Ask a Teacher section for direct expert support</li>
          <li>Progress Tracker to monitor academic goals</li>
          <li>Admin Dashboard to manage users, results, and announcements</li>
        </ul>
        <p>
          This platform is designed to promote self-learning, peer collaboration, and teacher guidance — all in one place.
          For demonstration purposes, use the test accounts provided on the Home Page.
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



