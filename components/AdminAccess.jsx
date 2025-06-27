import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// 🎯 TAILWIND ADMIN ACCESS - Following Programming Laws
// DRY: Uses Tailwind utility classes (no custom CSS)
// KISS: Simple and clean
// Single Responsibility: Only handles admin access

const AdminAccess = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  // Admin email list - same as in AdminPanel
  const adminEmails = [
    'alimaroger70@gmail.com',
    'admin@bonuslife.com',
    'support@bonuslife.com'
  ];

  const isAdmin = currentUser && adminEmails.includes(currentUser.email);

  // Debug logging
  console.log('AdminAccess - Current user:', currentUser?.email);
  console.log('AdminAccess - Is admin:', isAdmin);

  if (!isAdmin) {
    return null; // Don't show anything for non-admin users
  }

  return (
    <div className="admin-widget">
      <div className="flex justify-between items-center mb-4">
        <h3 className="m-0 text-red-600 font-heading text-lg font-bold">
          🛡️ Admin Access
        </h3>
        <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
          Administrator
        </span>
      </div>

      <p className="text-white/80 text-sm mb-4">
        You have administrative privileges
      </p>

      <div className="grid grid-cols-1 gap-3 mb-4">
        <button
          onClick={() => navigate('/admin')}
          className="btn-primary"
        >
          🔧 Admin Panel
        </button>
        <button
          onClick={() => navigate('/cms')}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
        >
          🛠️ Content Management
        </button>
        <button
          onClick={() => navigate('/admin/cleanup')}
          className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
        >
          🧹 Cleanup Tools
        </button>
      </div>

      <div className="flex gap-4 pt-4 border-t border-red-600/20">
        <div className="flex-1 text-center">
          <div className="text-xs text-white/60 uppercase tracking-wide">STATUS</div>
          <div className="text-green-500 font-semibold">Online</div>
        </div>
        <div className="flex-1 text-center">
          <div className="text-xs text-white/60 uppercase tracking-wide">ROLE</div>
          <div className="text-red-600 font-semibold">Super Admin</div>
        </div>
      </div>
    </div>
  );
};

export default AdminAccess;
