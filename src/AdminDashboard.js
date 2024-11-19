import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import './AdminDashboard.css';
import ManageUsers from './ManageUsers';
import ContentModeration from './ContentModeration';
import ManageCategories from './ManageCategories';
import Settings from './Settings';
import Dashboard from './pages/Dashboard';
import Login from './LoginAdmin';

const AdminDashboard = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Initially set to null to check loading state

  // Use useEffect to check localStorage for authentication status when component mounts
  useEffect(() => {
    const storedAuthStatus = localStorage.getItem('isAuthenticated');
    console.log('Stored Auth Status:', storedAuthStatus); // Log for debugging
    if (storedAuthStatus === 'true') {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []); // Empty dependency array ensures this only runs once on component mount

  // Function to handle login
  const handleLogin = () => {
    console.log('User logged in');
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true'); // Save authentication status in localStorage
  };

  // If authentication status is not yet determined (still null), show the login form
  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Show a loading state while authentication status is being checked
  }

  // If not authenticated, show the Login page first
  if (!isAuthenticated) {
    console.log("Not authenticated, showing login.");
    return <Login onLogin={handleLogin} />;
  }

  // Function to render the appropriate content based on the current page
  const renderContent = () => {
    switch (currentPage) {
      case 'manageUsers':
        return <ManageUsers />;
      case 'contentModeration':
        return <ContentModeration />;
      case 'manageCategories':
        return <ManageCategories />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="admin-dashboard-container">
      <Sidebar onSelectPage={setCurrentPage} />
      <main className="admin-dashboard">
        <h1>Admin Dashboard</h1>
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminDashboard;
