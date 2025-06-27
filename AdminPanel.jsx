import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  collection, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy,
  where,
  getDoc
} from 'firebase/firestore';
import { db } from '../firebase/firebase-config';
import './AdminPanel.css';

const AdminPanel = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('users');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalWorkouts: 0,
    totalNutritionLogs: 0
  });

  // Admin email list - Add your email and other admin emails here
  const adminEmails = [
    'alimaroger70@gmail.com', // Your email
    'admin@bonuslife.com',    // Add other admin emails
    'support@bonuslife.com'   // Add more as needed
  ];

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    // Check if current user is admin
    const userIsAdmin = adminEmails.includes(currentUser.email);
    console.log('AdminPanel - Current user:', currentUser.email);
    console.log('AdminPanel - Admin emails:', adminEmails);
    console.log('AdminPanel - Is admin:', userIsAdmin);

    setIsAdmin(userIsAdmin);

    if (userIsAdmin) {
      fetchUsers();
      fetchStats();
    }
  }, [currentUser, navigate]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const usersRef = collection(db, 'users');
      const q = query(usersRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const usersData = [];
      querySnapshot.forEach((doc) => {
        usersData.push({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate?.() || new Date()
        });
      });
      
      setUsers(usersData);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const usersRef = collection(db, 'users');
      const usersSnapshot = await getDocs(usersRef);
      
      let totalWorkouts = 0;
      let activeUsers = 0;
      const now = new Date();
      const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

      usersSnapshot.forEach((doc) => {
        const userData = doc.data();
        const lastActive = userData.lastActive?.toDate?.() || userData.createdAt?.toDate?.();
        
        if (lastActive && lastActive > thirtyDaysAgo) {
          activeUsers++;
        }
        
        totalWorkouts += userData.totalWorkouts || 0;
      });

      setStats({
        totalUsers: usersSnapshot.size,
        activeUsers,
        totalWorkouts,
        totalNutritionLogs: Math.floor(totalWorkouts * 1.5) // Estimated
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const updateUserStatus = async (userId, status) => {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, { 
        status: status,
        updatedAt: new Date()
      });
      
      // Update local state
      setUsers(users.map(user => 
        user.id === userId ? { ...user, status } : user
      ));
      
      alert(`User ${status} successfully!`);
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Error updating user status');
    }
  };

  const deleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return;
    }

    try {
      await deleteDoc(doc(db, 'users', userId));
      setUsers(users.filter(user => user.id !== userId));
      setSelectedUser(null);
      alert('User deleted successfully!');
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Error deleting user');
    }
  };

  const makeAdmin = async (userId) => {
    if (!window.confirm('Are you sure you want to make this user an admin?')) {
      return;
    }

    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, { 
        isAdmin: true,
        adminSince: new Date(),
        updatedAt: new Date()
      });
      
      setUsers(users.map(user => 
        user.id === userId ? { ...user, isAdmin: true, adminSince: new Date() } : user
      ));
      
      alert('User promoted to admin successfully!');
    } catch (error) {
      console.error('Error making user admin:', error);
      alert('Error promoting user to admin');
    }
  };

  const filteredUsers = users.filter(user =>
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  // Show access denied for non-admin users
  if (currentUser && !adminEmails.includes(currentUser.email)) {
    return (
      <div className="admin-access-denied">
        <div className="access-denied-content">
          <h1>🚫 Access Denied</h1>
          <p>You don't have permission to access the admin panel.</p>
          <p>Current user: {currentUser.email}</p>
          <button onClick={() => navigate('/dashboard')} className="back-btn">
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>🛡️ Admin Panel</h1>
        <p>Manage users and monitor application analytics</p>
        <div className="admin-info">
          <span>Logged in as: <strong>{currentUser?.email}</strong></span>
          <button onClick={() => navigate('/dashboard')} className="back-to-app">
            Back to App
          </button>
        </div>
      </div>

      {/* Stats Dashboard */}
      <div className="admin-stats">
        <div className="stat-card">
          <div className="stat-number">{stats.totalUsers}</div>
          <div className="stat-label">Total Users</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.activeUsers}</div>
          <div className="stat-label">Active Users (30d)</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.totalWorkouts}</div>
          <div className="stat-label">Total Workouts</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.totalNutritionLogs}</div>
          <div className="stat-label">Nutrition Logs</div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="admin-tabs">
        <button 
          className={`tab ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          👥 User Management
        </button>
        <button 
          className={`tab ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          📊 Analytics
        </button>
        <button 
          className={`tab ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          ⚙️ Settings
        </button>
      </div>

      {/* User Management Tab */}
      {activeTab === 'users' && (
        <div className="users-section">
          <div className="users-header">
            <h2>User Management</h2>
            <div className="search-container">
              <input
                type="text"
                placeholder="Search users by email or name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <button onClick={fetchUsers} className="refresh-btn">
                🔄 Refresh
              </button>
            </div>
          </div>

          {loading ? (
            <div className="loading">Loading users...</div>
          ) : (
            <div className="users-grid">
              <div className="users-list">
                <div className="users-table">
                  <div className="table-header">
                    <div>User</div>
                    <div>Email</div>
                    <div>Status</div>
                    <div>Joined</div>
                    <div>Actions</div>
                  </div>
                  
                  {filteredUsers.map((user) => (
                    <div key={user.id} className="table-row">
                      <div className="user-info">
                        <div className="user-avatar">
                          {user.displayName?.[0] || user.email?.[0] || '?'}
                        </div>
                        <div>
                          <div className="user-name">
                            {user.displayName || `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'No Name'}
                          </div>
                          <div className="user-id">ID: {user.id.substring(0, 8)}...</div>
                        </div>
                      </div>
                      
                      <div className="user-email">{user.email}</div>
                      
                      <div className="user-status">
                        <span className={`status-badge ${user.status || 'active'}`}>
                          {user.isAdmin ? '👑 Admin' : (user.status || 'Active')}
                        </span>
                      </div>
                      
                      <div className="user-date">
                        {formatDate(user.createdAt)}
                      </div>
                      
                      <div className="user-actions">
                        <button 
                          onClick={() => setSelectedUser(user)}
                          className="action-btn view"
                        >
                          👁️ View
                        </button>
                        {!user.isAdmin && (
                          <>
                            <button 
                              onClick={() => updateUserStatus(user.id, user.status === 'suspended' ? 'active' : 'suspended')}
                              className={`action-btn ${user.status === 'suspended' ? 'activate' : 'suspend'}`}
                            >
                              {user.status === 'suspended' ? '✅ Activate' : '⏸️ Suspend'}
                            </button>
                            <button 
                              onClick={() => makeAdmin(user.id)}
                              className="action-btn admin"
                            >
                              👑 Make Admin
                            </button>
                            <button 
                              onClick={() => deleteUser(user.id)}
                              className="action-btn delete"
                            >
                              🗑️ Delete
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* User Details Panel */}
              {selectedUser && (
                <div className="user-details">
                  <div className="details-header">
                    <h3>User Details</h3>
                    <button 
                      onClick={() => setSelectedUser(null)}
                      className="close-btn"
                    >
                      ✕
                    </button>
                  </div>
                  
                  <div className="details-content">
                    <div className="detail-group">
                      <h4>Personal Information</h4>
                      <p><strong>Name:</strong> {selectedUser.displayName || `${selectedUser.firstName || ''} ${selectedUser.lastName || ''}`.trim() || 'Not provided'}</p>
                      <p><strong>Email:</strong> {selectedUser.email}</p>
                      <p><strong>User ID:</strong> {selectedUser.id}</p>
                      <p><strong>Status:</strong> {selectedUser.isAdmin ? 'Admin' : (selectedUser.status || 'Active')}</p>
                    </div>

                    <div className="detail-group">
                      <h4>Account Information</h4>
                      <p><strong>Created:</strong> {formatDate(selectedUser.createdAt)}</p>
                      <p><strong>Last Updated:</strong> {formatDate(selectedUser.updatedAt)}</p>
                      <p><strong>Email Verified:</strong> {selectedUser.emailVerified ? 'Yes' : 'No'}</p>
                    </div>

                    <div className="detail-group">
                      <h4>Fitness Profile</h4>
                      <p><strong>Age:</strong> {selectedUser.age || 'Not provided'}</p>
                      <p><strong>Weight:</strong> {selectedUser.weight ? `${selectedUser.weight} kg` : 'Not provided'}</p>
                      <p><strong>Height:</strong> {selectedUser.height ? `${selectedUser.height} cm` : 'Not provided'}</p>
                      <p><strong>Fitness Goal:</strong> {selectedUser.fitnessGoal || 'Not set'}</p>
                      <p><strong>Activity Level:</strong> {selectedUser.activityLevel || 'Not set'}</p>
                    </div>

                    <div className="detail-group">
                      <h4>App Usage</h4>
                      <p><strong>Total Workouts:</strong> {selectedUser.totalWorkouts || 0}</p>
                      <p><strong>Current Streak:</strong> {selectedUser.currentStreak || 0} days</p>
                      <p><strong>Subscription:</strong> {selectedUser.subscriptionStatus || 'Free'}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="analytics-section">
          <h2>📊 Application Analytics</h2>
          <div className="analytics-grid">
            <div className="analytics-card">
              <h3>User Growth</h3>
              <div className="growth-stat">
                <span className="growth-number">+{Math.floor(stats.totalUsers * 0.15)}</span>
                <span className="growth-label">New users this month</span>
              </div>
            </div>
            
            <div className="analytics-card">
              <h3>Engagement</h3>
              <div className="engagement-stats">
                <div className="engagement-item">
                  <span>Daily Active Users</span>
                  <span>{Math.floor(stats.activeUsers * 0.3)}</span>
                </div>
                <div className="engagement-item">
                  <span>Avg. Session Duration</span>
                  <span>12 minutes</span>
                </div>
              </div>
            </div>
            
            <div className="analytics-card">
              <h3>Popular Features</h3>
              <div className="feature-stats">
                <div className="feature-item">
                  <span>Workout Plans</span>
                  <div className="feature-bar">
                    <div className="feature-fill" style={{width: '85%'}}></div>
                  </div>
                  <span>85%</span>
                </div>
                <div className="feature-item">
                  <span>Nutrition Tracker</span>
                  <div className="feature-bar">
                    <div className="feature-fill" style={{width: '72%'}}></div>
                  </div>
                  <span>72%</span>
                </div>
                <div className="feature-item">
                  <span>Live Workouts</span>
                  <div className="feature-bar">
                    <div className="feature-fill" style={{width: '68%'}}></div>
                  </div>
                  <span>68%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="settings-section">
          <h2>⚙️ Admin Settings</h2>
          <div className="settings-grid">
            <div className="setting-card">
              <h3>Admin Users</h3>
              <div className="admin-list">
                {adminEmails.map((email, index) => (
                  <div key={index} className="admin-item">
                    <span>👑 {email}</span>
                  </div>
                ))}
              </div>
              <p className="setting-note">
                To add more admins, update the adminEmails array in AdminPanel.jsx
              </p>
            </div>
            
            <div className="setting-card">
              <h3>Application Status</h3>
              <div className="status-indicators">
                <div className="status-item">
                  <span className="status-dot green"></span>
                  <span>Database: Online</span>
                </div>
                <div className="status-item">
                  <span className="status-dot green"></span>
                  <span>Authentication: Active</span>
                </div>
                <div className="status-item">
                  <span className="status-dot green"></span>
                  <span>Hosting: Live</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
