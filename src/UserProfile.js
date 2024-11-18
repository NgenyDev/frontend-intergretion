import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Added useNavigate for navigating back
import axios from 'axios'; // For fetching data from API
import './UserProfile.css'; // External CSS for user profile styling

const UserProfile = () => {
  const { id } = useParams(); // Get the user ID from the URL
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Hook to navigate programmatically

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [id]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="user-profile-container">
      <button className="back-button" onClick={() => navigate(-1)}>Back</button>
      <h2>{user.name}'s Profile</h2>
      <div className="profile-details">
        <img src={user.image || 'https://via.placeholder.com/150'} alt="Profile" className="profile-image" />
        <div className="profile-info">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Status:</strong> {user.status}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
