import React, { useEffect, useState } from 'react';
import './NotificationsOverlay.css';

const NotificationsOverlay = ({ onClose }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch notifications based on the logged-in user
    const fetchNotifications = async () => {
      try {
        const userId = localStorage.getItem('userId'); // Get the logged-in user ID from localStorage

        if (!userId) {
          setError('User is not logged in');
          setLoading(false);
          return;
        }

        const response = await fetch(`http://localhost:5000/notifications?userId=${userId}`); // Assuming the API filters notifications based on userId
        if (!response.ok) {
          throw new Error('Failed to fetch notifications');
        }
        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []); // Empty dependency array ensures this runs once on component mount

  if (loading) {
    return (
      <div className="overlay notifications-overlay">
        <div className="overlay-content">
          <button className="close-button" onClick={onClose}>X</button>
          <h2>Loading Notifications...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="overlay notifications-overlay">
        <div className="overlay-content">
          <button className="close-button" onClick={onClose}>X</button>
          <h2>Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overlay notifications-overlay">
      <div className="overlay-content">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>Notifications</h2>
        {notifications.length > 0 ? (
          <ul>
            {notifications.map((notification, index) => (
              <li key={index}>
                <h3>{notification.title}</h3>
                <p>{notification.message}</p>
                <span>{new Date(notification.timestamp).toLocaleString()}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No notifications available.</p>
        )}
      </div>
    </div>
  );
};

export default NotificationsOverlay;
