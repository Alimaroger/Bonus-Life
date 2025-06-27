import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebase-config';
import { useAuth } from '../context/AuthContext';

// 🎯 TAILWIND NAVIGATION - Following Programming Laws
// DRY: Uses Tailwind utility classes (no custom CSS)
// KISS: Simple and clean
// Single Responsibility: Only handles navigation

const Navigation = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  // Admin email list - same as in AdminPanel
  const adminEmails = [
    'alimaroger70@gmail.com',
    'admin@bonuslife.fitness',
    'bonuslife.team@ictuniversity.edu'
  ];

  const isAdmin = currentUser && adminEmails.includes(currentUser.email);

  // Debug logging
  console.log('Navigation - Current user:', currentUser?.email);
  console.log('Navigation - Is admin:', isAdmin);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="nav-fixed">
      <div className="container-custom">
        <div className="flex justify-between items-center">
          <h1 className="m-0 text-red-600 font-heading text-xl font-bold">
            💪 Bonus Life
          </h1>

          <div className="flex items-center gap-4">
            <NavLink to="/dashboard" className="nav-link">📊 Dashboard</NavLink>
            <NavLink to="/plans" className="nav-link">🏋️‍♂️ Workouts</NavLink>
            <NavLink to="/nutrition" className="nav-link">🍎 Nutrition</NavLink>
            <NavLink to="/nutrition-advanced" className="nav-link">🔬 Food Scanner</NavLink>
            <NavLink to="/videos" className="nav-link">🎬 Videos</NavLink>
            <NavLink to="/analytics" className="nav-link">📊 Analytics</NavLink>
            <NavLink to="/subscribe" className="nav-link">⭐ Subscribe</NavLink>
            <NavLink to="/profile" className="nav-link">👤 Profile</NavLink>
            <NavLink to="/about" className="nav-link">ℹ️ About Us</NavLink>
            <NavLink to="/contact" className="nav-link">📧 Contact</NavLink>
            {isAdmin && (
              <NavLink to="/admin" className="nav-link-admin">
                🛡️ Admin
              </NavLink>
            )}
            <button onClick={handleLogout} className="btn-secondary">
              🚪 Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
