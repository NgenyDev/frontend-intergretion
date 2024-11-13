import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Navbar from './Navbar';
import Footer from './Footer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Fetch user data from the mock API
    const response = await fetch('http://localhost:3000/users');
    const users = await response.json();

    const user = users.find((user) => user.email === email && user.password === password);

    if (user) {
      console.log('Login successful');
      // Store user ID in localStorage
      localStorage.setItem('userId', user.id);
      
      // Redirect based on the user role
      if (user.role === 'admin') {
        navigate('/AdminDashboard');
      } else if (user.role === 'techwriter') {
        navigate('/TechWriterDashboard');
      } else {
        navigate('/UserDashboard');
      }
    } else {
      console.log('Invalid credentials');
    }
  };

  return (
    <>
      <Navbar />
      <div className="login-container">
        <h2>Login</h2>
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
