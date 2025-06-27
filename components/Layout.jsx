import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebase-config';
import { useAuth } from '../context/AuthContext';

const Layout = ({ children, title, subtitle }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="app-layout">
      {/* Mobile Header */}
      <header className="mobile-header">
        <button 
          className="menu-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <h1 className="mobile-logo">💪 Bonus Life</h1>
        <div className="mobile-user">
          {currentUser?.email?.split('@')[0]?.charAt(0).toUpperCase()}
        </div>
      </header>

      {/* Sidebar Overlay */}
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>}

      {/* Sidebar */}
      <nav className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <h1>💪 Bonus Life</h1>
          <button 
            className="sidebar-close"
            onClick={() => setSidebarOpen(false)}
          >
            ✕
          </button>
        </div>
        
        <div className="user-info">
          <div className="user-avatar">
            {currentUser?.email?.split('@')[0]?.charAt(0).toUpperCase()}
          </div>
          <div className="user-details">
            <p className="user-name">{currentUser?.email?.split('@')[0]}</p>
            <p className="user-level">Bronze Member</p>
          </div>
        </div>

        <ul className="sidebar-menu">
          <li>
            <NavLink to="/dashboard" onClick={() => setSidebarOpen(false)}>
              <span className="menu-icon">📊</span>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/plans" onClick={() => setSidebarOpen(false)}>
              <span className="menu-icon">🏋️‍♂️</span>
              Workout Plans
            </NavLink>
          </li>
          <li>
            <NavLink to="/subscribe" onClick={() => setSidebarOpen(false)}>
              <span className="menu-icon">⭐</span>
              Subscribe
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile" onClick={() => setSidebarOpen(false)}>
              <span className="menu-icon">👤</span>
              Profile
            </NavLink>
          </li>
        </ul>

        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-btn">
            <span className="menu-icon">🚪</span>
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <div className="content-wrapper">
          {(title || subtitle) && (
            <header className="page-header">
              {title && <h1 className="page-title">{title}</h1>}
              {subtitle && <p className="page-subtitle">{subtitle}</p>}
            </header>
          )}
          
          <div className="page-content">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
