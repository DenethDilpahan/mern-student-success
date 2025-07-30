import React, { useState } from 'react';
import '../styles/AdminDashboard.css';
import ManageUsers from '../components/ManageUsers';
import ManageResults from '../components/ManageResults';
import PostAnnouncement from '../components/PostAnnouncement';

const AdminDashboard = () => {
  const username = localStorage.getItem('username');
  const [activeSection, setActiveSection] = useState('Manage Users');

  const handleCardClick = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="admin-container">
      <div className="admin-inner">
        <h1 className="admin-title">Admin Dashboard</h1>
        <p className="admin-welcome">Welcome back, <span className="admin-username">{username}</span> 👋</p>

        <div className="card-grid">
          <DashboardCard title="Manage Users" icon="👥" onClick={() => handleCardClick('Manage Users')} />
          <DashboardCard title="Manage Results" icon="📝" onClick={() => handleCardClick('Manage Results')} />
          <DashboardCard title="Track Progress" icon="📈" onClick={() => handleCardClick('Track Progress')} />
          <DashboardCard title="Post Announcement" icon="📢" onClick={() => handleCardClick('Post Announcement')} />
        </div>

        <div className="admin-section">
          {activeSection === 'Manage Users' && <ManageUsers />}
          {activeSection === 'Manage Results' && <ManageResults />}
          {activeSection === 'Track Progress' && <TrackProgress />}
          {activeSection === 'Post Announcement' && <PostAnnouncement />}
        </div>
      </div>
    </div>
  );
};

const DashboardCard = ({ title, icon, onClick }) => (
  <div className="dashboard-card" onClick={onClick}>
    <div className="card-icon">{icon}</div>
    <h2 className="card-title">{title}</h2>
    <p className="card-description">Click to manage {title.toLowerCase()}.</p>
  </div>
);

// Section Components:
// const ManageUsers = () => (
//   <div className="section-content">
//     <h2>Manage Users</h2>
//     <p>Here you can view, add, or remove users.</p>
//     <table className="admin-table">
//       <thead>
//         <tr><th>Username</th><th>Email</th><th>Role</th><th>Actions</th></tr>
//       </thead>
//       <tbody>
//         <tr><td>student_01</td><td>student1@example.com</td><td>Student</td><td><button>Edit</button> <button>Delete</button></td></tr>
//         <tr><td>teacher_01</td><td>teacher1@example.com</td><td>Teacher</td><td><button>Edit</button> <button>Delete</button></td></tr>
//       </tbody>
//     </table>
//   </div>
// );

// const ManageResults = () => (
//   <div className="section-content">
//     <h2>Manage Results</h2>
//     <p>Upload or modify student results here.</p>
//     <button>Upload Results</button>
//     <table className="admin-table">
//       <thead>
//         <tr><th>Student</th><th>Subject</th><th>Score</th><th>Actions</th></tr>
//       </thead>
//       <tbody>
//         <tr><td>student_01</td><td>Math</td><td>85%</td><td><button>Edit</button></td></tr>
//         <tr><td>student_02</td><td>Science</td><td>90%</td><td><button>Edit</button></td></tr>
//       </tbody>
//     </table>
//   </div>
// );

const TrackProgress = () => (
  <div className="section-content">
    <h2>Track Progress</h2>
    <p>Monitor student activity and academic progress.</p>
    <ul>
      <li>Student 1 has completed 70% of tasks.</li>
      <li>Student 2 has completed 90% of tasks.</li>
    </ul>
  </div>
);

// const PostAnnouncement = () => (
//   <div className="section-content">
//     <h2>Post Announcement</h2>
//     <textarea rows="4" placeholder="Write your announcement here..."></textarea>
//     <button className="post-button">Post</button>
//   </div>
// );

export default AdminDashboard;

