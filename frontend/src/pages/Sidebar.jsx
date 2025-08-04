import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Sidebar.css';
import {
  FaHome, FaCalendarAlt, FaBook, FaUsers, FaQuestionCircle, FaChartLine,
  FaInfoCircle, FaSignInAlt, FaTools, FaComments, FaSignOutAlt, FaBars, FaTimes
} from 'react-icons/fa';

const Sidebar = ({ collapsed, toggleSidebar }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate('/login');
  };

  const navItems = [
    { to: '/', label: 'Home', icon: <FaHome /> },
    { to: '/planner', label: 'Study Planner', icon: <FaCalendarAlt /> },
    { to: '/resources', label: 'Resource Library', icon: <FaBook /> },
    { to: '/collaboration', label: 'Collaboration Zone', icon: <FaUsers /> },
    { to: '/ask', label: 'Ask a Teacher', icon: <FaQuestionCircle /> },
    { to: '/progress', label: 'Progress Tracker', icon: <FaChartLine /> },
    { to: '/about', label: 'About', icon: <FaInfoCircle /> },
  ];

  if (!isLoggedIn) navItems.push({ to: '/login', label: 'Login', icon: <FaSignInAlt /> });
  if (localStorage.getItem('role') === 'admin') navItems.push({ to: '/admin', label: 'Admin', icon: <FaTools /> });
  if (['admin', 'teacher'].includes(localStorage.getItem('role'))) navItems.push({ to: '/answer-questions', label: 'Answer Qs', icon: <FaComments /> });

  const isMobile = window.innerWidth < 768;

  return (
    <>
      <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
        <button className="toggle-btn" onClick={toggleSidebar}>
          {collapsed ? <FaBars /> : <FaTimes />}
        </button>

        {!collapsed && <h2 className="sidebar-logo">Student Platform</h2>}

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <Link key={item.to} to={item.to} onClick={() => isMobile && toggleSidebar()}>
              <span className="icon">{item.icon}</span>
              {!collapsed && <span className="label">{item.label}</span>}
            </Link>
          ))}

          {isLoggedIn && (
            <button className="logout-btn" onClick={handleLogout}>
              <span className="icon"><FaSignOutAlt /></span>
              {!collapsed && <span className="label">Logout</span>}
            </button>
          )}
        </nav>
      </div>

      {/* Overlay - MOBILE only */}
      {isMobile && !collapsed && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}

      {/* Floating Toggle Button - MOBILE only */}
      {isMobile && collapsed && (
        <button className="floating-toggle-btn" onClick={toggleSidebar}>
          <FaBars />
        </button>
      )}
    </>
  );
};

export default Sidebar;
