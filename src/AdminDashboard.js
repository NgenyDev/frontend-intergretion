import React from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="dashboard-content">
        <p>Welcome to the Admin Dashboard! Here you can manage users, view reports, and more.</p>
        <button className="btn">Manage Users</button>
        <button className="btn">View Reports</button>
        <button className="btn">Settings</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
