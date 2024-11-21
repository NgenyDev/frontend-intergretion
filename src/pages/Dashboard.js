import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUserPlus, faUserSlash, faFlag, faCheck, faCog, faEye, faBell, faUsers, faEdit, faListAlt,
  faChartLine, faPlayCircle
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const Dashboard = () => {
  const [isUserManagementOpen, setUserManagementOpen] = useState(false);
  const [isContentModerationOpen, setContentModerationOpen] = useState(false);
  const [isCategoryManagementOpen, setCategoryManagementOpen] = useState(false);
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const [isRecentActivitiesOpen, setRecentActivitiesOpen] = useState(false);
  const [isAnalyticsOpen, setAnalyticsOpen] = useState(false);
  
  const navigate = useNavigate(); // Initialize navigate hook

  useEffect(() => {
    const content = document.querySelector('.dashboard-content');
    content.classList.add('fade-in');
  }, []);

  const handleVisitSite = () => {
    navigate('/user-dashboard'); // Navigate to the /UserDashboard route
  };

  const handleLogout = () => {
    // Clear authentication status from localStorage
    localStorage.removeItem('isAuthenticated');
    navigate('/'); // Redirect to the home page
  };

  return (
    <div className="dashboard-content">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome to the platform management dashboard</p>

        {/* Button to visit the main site */}
        <button className="btn primary" onClick={handleVisitSite}>
          Visit Site
        </button>

        {/* Button for logout */}
        <button className="btn danger" onClick={handleLogout}>
          Logout
        </button>
      </div>


      <section className="dashboard-cards">
        {/* User Management Section */}
        <div className="card">
          <h2><FontAwesomeIcon icon={faUsers} /> Manage Users</h2>
          <button className="btn primary" onClick={() => setUserManagementOpen(!isUserManagementOpen)}>
            {isUserManagementOpen ? 'Hide' : 'Show'} User Management
          </button>
          {isUserManagementOpen && (
            <div className="card-actions">
              <button className="btn primary"><FontAwesomeIcon icon={faUserPlus} /> Add User</button>
              <button className="btn danger"><FontAwesomeIcon icon={faUserSlash} /> Deactivate User</button>
              <button className="btn secondary"><FontAwesomeIcon icon={faEdit} /> View Profile</button>
            </div>
          )}
        </div>

        {/* Content Moderation Section */}
        <div className="card">
          <h2><FontAwesomeIcon icon={faFlag} /> Content Moderation</h2>
          <button className="btn primary" onClick={() => setContentModerationOpen(!isContentModerationOpen)}>
            {isContentModerationOpen ? 'Hide' : 'Show'} Content Moderation
          </button>
          {isContentModerationOpen && (
            <div className="card-actions">
              <button className="btn warning"><FontAwesomeIcon icon={faFlag} /> Flag/Remove Content</button>
              <button className="btn success"><FontAwesomeIcon icon={faCheck} /> Approve Content</button>
              <button className="btn secondary"><FontAwesomeIcon icon={faListAlt} /> Pending Review</button>
            </div>
          )}
        </div>

        {/* Manage Categories Section */}
        <div className="card">
          <h2><FontAwesomeIcon icon={faCog} /> Manage Categories</h2>
          <button className="btn primary" onClick={() => setCategoryManagementOpen(!isCategoryManagementOpen)}>
            {isCategoryManagementOpen ? 'Hide' : 'Show'} Categories Management
          </button>
          {isCategoryManagementOpen && (
            <div className="card-actions">
              <button className="btn primary"><FontAwesomeIcon icon={faCog} /> Create Category</button>
              <button className="btn secondary"><FontAwesomeIcon icon={faEdit} /> Edit Categories</button>
            </div>
          )}
        </div>

        {/* Admin Profile & Settings Section */}
        <div className="card">
          <h2><FontAwesomeIcon icon={faEye} /> Settings</h2>
          <button className="btn primary" onClick={() => setSettingsOpen(!isSettingsOpen)}>
            {isSettingsOpen ? 'Hide' : 'Show'} Settings
          </button>
          {isSettingsOpen && (
            <div className="card-actions">
              <button className="btn secondary"><FontAwesomeIcon icon={faCog} /> System Settings</button>
              <button className="btn secondary"><FontAwesomeIcon icon={faEye} /> View Reports</button>
              <button className="btn secondary"><FontAwesomeIcon icon={faBell} /> Notifications</button>
            </div>
          )}
        </div>

        {/* Recent Activities Feed */}
        <div className="card">
          <h2><FontAwesomeIcon icon={faBell} /> Recent Activities</h2>
          <button className="btn primary" onClick={() => setRecentActivitiesOpen(!isRecentActivitiesOpen)}>
            {isRecentActivitiesOpen ? 'Hide' : 'Show'} Recent Activities
          </button>
          {isRecentActivitiesOpen && (
            <div className="card-actions">
              <button className="btn primary">New Posts</button>
              <button className="btn warning">New User Registrations</button>
              <button className="btn secondary">Content Approvals</button>
            </div>
          )}
        </div>

        {/* Platform Analytics Section */}
        <div className="card">
          <h2><FontAwesomeIcon icon={faChartLine} /> Platform Analytics</h2>
          <button className="btn primary" onClick={() => setAnalyticsOpen(!isAnalyticsOpen)}>
            {isAnalyticsOpen ? 'Hide' : 'Show'} Platform Analytics
          </button>
          {isAnalyticsOpen && (
            <div className="card-actions">
              <button className="btn primary"><FontAwesomeIcon icon={faPlayCircle} /> View Activity</button>
              <button className="btn secondary">User Trends</button>
              <button className="btn success">Post Performance</button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
