import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import Navbar from './Navbar';
import Footer from './Footer';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default role is 'user'
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = { email, password, role };

    // Send a POST request to the mock API
    const response = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      console.log('User signed up successfully');
      // Redirect user to login page
      navigate('/login');
    } else {
      console.log('Error signing up user');
    }
  };

  return (
    <>
    <Navbar/>
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} className="signup-form">
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
          <label htmlFor="role">Select Role:</label>
          <select 
            id="role" 
            value={role} 
            onChange={(e) => setRole(e.target.value)} 
            required
          >
            <option value="user">User</option>
            <option value="techwriter">Tech Writer</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <div className="login-link">
        <p>Already have an account? <a href="/login">Login</a></p>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Signup;
