// src/ContactUs.js
import React, { useState } from 'react';
import './ContactUs.css'; // Ensure this CSS file has appropriate styles
import Navbar from './Navbar';
import Footer from './Footer';

const ContactUs = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false); // Track form submission
  const [error, setError] = useState(''); // Track validation errors

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic email validation
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Reset form and set success message
    setIsSubmitted(true);
    setEmail('');
    setMessage('');
    setError('');
  };

  return (
    <>
      <Navbar />
      <div className="contact-us">
        <h1 className="text">Get in Touch</h1>
        <p className="contact-description">
          We value your feedback. Fill out the form below, and we’ll respond as soon as possible!
        </p>

        <form onSubmit={handleSubmit} className="contact-us-form">
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Enter your email address"
              required
            />
            {error && <small className="error-message">{error}</small>}
          </div>

          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              placeholder="Write your message here"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              aria-label="Write your message here"
              required
            />
          </div>

          <button type="submit" className="submit-button">Send Message</button>
        </form>

        {isSubmitted && (
          <div className="success-message">
            <p>Thank you for reaching out! We’ll get back to you shortly.</p>
            <button onClick={() => setIsSubmitted(false)} className="dismiss-button">
              Dismiss
            </button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
