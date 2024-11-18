import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ResetPasswordSuccess.css';

const ResetPasswordSuccess = () => {
  const navigate = useNavigate(); // Hook for navigation

  const handleBackToLogin = () => {
    navigate('/'); // Redirect to the login page
  };

  return (
    <div className="reset-success-container">
      <div className="reset-success-form">
        <h2>Password Reset Successful!</h2>
        <p>Your password has been successfully reset. You can now log in with your new password.</p>
        <button className="back-to-login-button" onClick={handleBackToLogin}>
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default ResetPasswordSuccess;
