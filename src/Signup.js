import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import Navbar from './Navbar';
import Footer from './Footer';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user_type, setUserType] = useState('user');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the fields before submitting
    if (!username || !email || !password || !user_type) {
      setError('All fields are required');
      return;
    }

    const userData = { 
      username, 
      email, 
      password, 
      user_type 
    };

    try {
      const response = await fetch('https://moringadailydev.onrender.com/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess('User signed up successfully! Redirecting to login...');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError(result.message || 'Error signing up user');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
      console.error('Error during signup:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="signup-container">
        <h2>Sign Up</h2>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="input-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="user_type">Select Role:</label>
            <select
              id="user_type"
              value={user_type}
              onChange={(e) => setUserType(e.target.value)}
              required
            >
              <option value="user">User</option>
              <option value="techwriter">Tech Writer</option>
            </select>
          </div>
          <button type="submit">Sign Up</button>
        </form>
        <div className="login-link">
          <p>Already have an account? <a href="/Login">Login</a></p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Signup;