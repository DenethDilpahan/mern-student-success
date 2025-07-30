import React from 'react';
import '../styles/About.css';
import profileImage from '../assets/profile.jpg';

const AboutPage = () => {
  return (
    <div className="about-container">
        <section className="section about">
        <h2>About This Project</h2>
        <h1>Project Overview</h1>
        <p>
          The Student Success Platform is a full-stack web application designed to assist students in managing their academic journey through an interactive, collaborative, and resource-driven environment. 
          The platform offers a centralized space for students to plan their studies, track progress, access educational resources, collaborate with peers, and communicate with teachers — all while being managed through a robust admin system.
        </p>
        <h1>Technical Architecture and Technologies Used</h1>
        <ol>
          <li>Frontend: React.js</li>
          <p>The platform's user interface is built using React.js, a robust JavaScript library known for its component-based architecture and dynamic state management. React's Virtual DOM allows efficient rendering of interactive UI elements such as the collapsible Sidebar, dynamic progress bars, real-time updates in collaboration posts, and protected routing based on user roles (admin, teacher, student).</p>
          <li>Styling & Animations: CSS & GSAP</li>
          <p>For the visual aesthetics:</p>
            <ul>
              <li>CSS (Cascading Style Sheets) is used for the core layout design, responsive structures, and component-level styling. Custom reusable styles ensure consistency across all pages.</li>
              <li>GSAP (GreenSock Animation Platform) adds smooth, professional-grade animations to interactive elements such as page transitions, floating objects, animated progress bars, and content reveals, enhancing the user experience with modern web animation standards.</li>
            </ul>
          <li>Backend: Node.js with Express.js</li>
          <p>The backend is powered by Node.js using the Express.js framework. This environment facilitates efficient server-side operations, RESTful API development, user authentication (using JSON Web Tokens - JWT), CRUD operations, and secure role-based access control for Admin and Teacher functionalities.</p>
          <p>Key Backend Operations:</p>
            <ul>
              <li>Authentication & Authorization using JWT.</li>
              <li>CRUD API Endpoints for Users, Resources, Collaboration Posts, Progress Tracking, and Admin Announcements.</li>
              <li>Role-based Middleware to protect sensitive routes.</li>
            </ul>
          <li> Database: MongoDB (NoSQL)</li>
          <p>All application data is stored in MongoDB, a flexible NoSQL database. Collections are structured for Users, Progress Goals, Resources, Collaboration Posts, and System Announcements. MongoDB’s schema-less architecture enables fast iterations and scalability, which is essential for educational platforms with dynamically evolving data structures.</p>
        </ol>
        <p>
          This platform is designed to promote self-learning, peer collaboration, and teacher guidance — all in one place.
          For demonstration purposes, use the test accounts provided on the Login Page.
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



