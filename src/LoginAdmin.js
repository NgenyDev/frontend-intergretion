import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import axios from 'axios';
import './LoginAdmin.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetMessage, setResetMessage] = useState('');

  const navigate = useNavigate(); // Hook for navigation

  const handleLoginClick = async () => {
    if (!email || !password) {
      setError('Both fields are required.');
      return;
    }

    // Validate email format
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setError(''); // Clear any previous errors
    setLoading(true); // Show loading indicator

    try {
      // Fetch users from the JSON server
      const response = await axios.get('https://moringadailydev.onrender.com/auth/login');
      const users = response.data;

      // Check if email and password match any user
      const user = users.find((u) => u.email === email && u.password === password);

      if (user) {
        setLoading(false); // Hide loading spinner
        onLogin(); // Trigger login success and redirect to dashboard
      } else {
        setLoading(false); // Hide loading spinner
        setError('Invalid email or password.');
      }
    } catch (err) {
      setLoading(false); // Hide loading spinner
      setError('An error occurred while connecting to the server.');
    }
  };

  const handleForgotPasswordClick = () => {
    if (!email) {
      setError('Please enter your email address.');
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setError(''); // Clear error message
    setResetMessage('If this email is registered, you’ll receive a password reset link shortly.');

    // Redirect to the reset code page
    navigate('/enter-reset-code'); // Redirect to reset page
  };

  const handleCreateAccountClick = () => {
    navigate('/create-account'); // Navigate to the "Create Account" page
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>{isForgotPassword ? 'Reset Password' : 'Welcome Back'}</h2>
        <p>{isForgotPassword ? 'Enter your email to reset your password.' : 'Please login to your account'}</p>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Show password field only if not in forgot password mode */}
        {!isForgotPassword && (
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        )}

        {/* Display error message */}
        {error && <p className="error-message">{error}</p>}

        {/* Display reset message if it's shown */}
        {resetMessage && <p className="reset-message">{resetMessage}</p>}

        {isForgotPassword ? (
          <>
            <button className="login-button" onClick={handleForgotPasswordClick} disabled={loading}>
              {loading ? <div className="spinner"></div> : 'Send Reset Link'}
            </button>
            <p className="forgot-password" onClick={() => setIsForgotPassword(false)}>
              Back to Login
            </p>
          </>
        ) : (
          <>
            <button className="login-button" onClick={handleLoginClick} disabled={loading}>
              {loading ? <div className="spinner"></div> : 'Log In'}
            </button>
            <p className="forgot-password" onClick={() => setIsForgotPassword(true)}>
              Forgot your password?
            </p>
            <button className="create-account-button" onClick={handleCreateAccountClick}>
              Create Account
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
