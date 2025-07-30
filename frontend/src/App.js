import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import Sidebar from './pages/Sidebar';

import Home from './pages/Home';
import StudyPlanner from './pages/StudyPlanner';
import AskTeacher from './pages/AskTeacher';
import AnswerQuestions from './pages/AnswerQuestions';
import ResourceLibrary from './pages/ResourceLibrary';
import CollaborationZone from './pages/CollaborationZone';
import ProgressTracker from './pages/ProgressTracker';
import About from './pages/About';
import AdminDashboard from './pages/AdminDashboard';
import MyCollaborations from './pages/MyCollaborations';

import './App.css';  // Ensure you have the layout styles I mentioned earlier here.

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    window.location.href = '/login';
  };

  const toggleSidebar = () => setCollapsed(!collapsed);

  return (
    <Router>
      <div className={`layout-container ${collapsed ? 'collapsed' : ''}`}>
        <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />

        <div className="main-content">
          <div className='page-wrapper'>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route path="/planner" element={<ProtectedRoute><StudyPlanner /></ProtectedRoute>} />
              <Route path="/resources" element={<ProtectedRoute><ResourceLibrary /></ProtectedRoute>} />
              <Route path="/collaboration" element={<ProtectedRoute><CollaborationZone /></ProtectedRoute>} />
              <Route path="/ask" element={<ProtectedRoute><AskTeacher /></ProtectedRoute>} />
              <Route path="/progress" element={<ProtectedRoute><ProgressTracker /></ProtectedRoute>} />
              <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
              <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
              <Route path="/answer-questions" element={<ProtectedRoute allowedRoles={['teacher', 'admin']}><AnswerQuestions /></ProtectedRoute>} />
              <Route path="/my-collaborations" element={<ProtectedRoute><MyCollaborations /></ProtectedRoute>} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
