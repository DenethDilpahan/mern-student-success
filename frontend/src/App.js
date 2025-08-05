import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
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

import './App.css';

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const INACTIVITY_LIMIT = 10 * 60 * 1000; // 10 minutes

  const logoutUser = useCallback(() => {
    console.log('User has been logged out due to inactivity');
    localStorage.clear();
    setIsLoggedIn(false);
    navigate('/login');
  }, [navigate]);

  useEffect(() => {
    let timeoutId;

    const resetTimer = () => {
      clearTimeout(timeoutId);
      if (localStorage.getItem('token')) {
        timeoutId = setTimeout(logoutUser, INACTIVITY_LIMIT);
      }
    };

    const activityEvents = ['mousemove', 'keydown', 'scroll', 'click'];

    activityEvents.forEach(event =>
      window.addEventListener(event, resetTimer)
    );

    resetTimer(); // Start timer on component mount

    return () => {
      clearTimeout(timeoutId);
      activityEvents.forEach(event =>
        window.removeEventListener(event, resetTimer)
      );
    };
  }, [logoutUser]);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate('/login');
  };

  const toggleSidebar = () => setCollapsed(!collapsed);

  return (
    <div className={`layout-container ${collapsed ? 'collapsed' : ''}`}>
      <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <div className="main-content">
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
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
