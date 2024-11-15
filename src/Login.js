import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Navbar from './Navbar';
import Footer from './Footer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to the backend for login authentication
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const user = await response.json();

        // Store user ID and role in localStorage
        localStorage.setItem('userId', user.id);
        localStorage.setItem('userRole', user.role);

        // Redirect based on user role
        if (user.role === 'admin') {
          navigate('http://127.0.0.1:5001/admin/dashboard');
        } else if (user.role === 'techwriter') {
          navigate('/TechWriterDashboard');
        } else {
          navigate('/UserDashboard');
        }
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessage('Error logging in. Please try again later.');
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
