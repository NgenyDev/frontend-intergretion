import React from 'react';
import './TechWriterDashboard.css';

const TechWriterDashboard = () => {
  return (
    <div className="techwriter-dashboard">
      <h1>Tech Writer Dashboard</h1>
      <div className="dashboard-content">
        <p>Welcome to the Tech Writer Dashboard! Here you can manage articles and submit new content.</p>
        <button className="btn">View Articles</button>
        <button className="btn">Write New Article</button>
        <button className="btn">Edit Profile</button>
      </div>
    </div>
  );
};

export default TechWriterDashboard;
