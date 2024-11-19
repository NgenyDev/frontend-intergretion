import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Navbar from './Navbar';
import Footer from './Footer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('user');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://moringadailydev.onrender.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email, 
          password,
          user_type: userType
        })
      });

      if (!response.ok) {
        throw new Error('Login authentication failed');
      }

      const userData = await response.json();

      const userRoleMap = {
        'admin': '/AdminDashboard',
        'techwriter': '/techwriter-dashboard',
        'user': '/user-dashboard'
      };

      const normalizedUserType = userType.toLowerCase().trim();

      if (userRoleMap[normalizedUserType]) {
        localStorage.setItem('userData', JSON.stringify(userData));
        localStorage.setItem('userRole', normalizedUserType);
        navigate(userRoleMap[normalizedUserType]);
      } else {
        setErrorMessage(`Unrecognized user role: ${userType}`);
      }

    } catch (error) {
      console.error('Login Error:', error);
      setErrorMessage('Login failed. Please check your credentials.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="login-container">
        <h2>Login</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit} className="login-form">
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
            <label htmlFor="userType">User Role:</label>
            <select
              id="userType"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="techwriter">Tech Writer</option>
            </select>
          </div>
          <button type="submit">Login</button>
        </form>
        <div className="signup-link">
          <p>Don't have an account? <a href="/signup">Sign up</a></p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;