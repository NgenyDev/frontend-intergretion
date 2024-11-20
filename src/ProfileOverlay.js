import React, { useEffect, useState } from 'react';
import './ProfileOverlay.css';  // Import the CSS file

const ProfileOverlay = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (userData && userData.user_id) {
      const userId = userData.user_id;

      const fetchUserDetails = async () => {
        try {
          const response = await fetch(`https://moringadailydev.onrender.com/users/${userId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            throw new Error('Failed to fetch user details');
          }

          const data = await response.json();
          setUserDetails(data);
        } catch (error) {
          console.error('Error fetching user details:', error.message);
          setErrorMessage('Unable to load user information.');
        } finally {
          setLoading(false);
        }
      };

      fetchUserDetails();
    } else {
      setErrorMessage('No user data available. Please log in.');
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <p className="loading-message">Loading user information...</p>;
  }

  if (errorMessage) {
    return <p className="error-message">{errorMessage}</p>;
  }

  if (!userDetails) {
    return <p className="no-user-message">No user information available.</p>;
  }

  return (
    <div className="profile-overlay">
      <h2>User Profile</h2>
      <p><strong>Name:</strong> {userDetails.username || 'N/A'}</p>
      <p><strong>Email:</strong> {userDetails.email || 'N/A'}</p>
      <p><strong>Role:</strong> {userDetails.role || 'N/A'}</p>
      <p><strong>User ID:</strong> {userDetails.id || 'N/A'}</p>
    </div>
  );
};

export default ProfileOverlay;
