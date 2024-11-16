import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { IoMail, IoPhonePortrait, IoLocation } from 'react-icons/io5';
import './Footer.css'; // Ensure you have this CSS file for styling

const Footer = () => {
  const handleSubscribeClick = (event) => {
    event.preventDefault(); // Prevent form submission
    alert('Thank you for subscribing!'); // Placeholder for actual subscription logic
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About Us Section */}
        <div className="footer-section">
          <h3>About Us</h3>
          <p>Empowering students with the latest tech skills through innovative learning. Moringa School is dedicated to transforming the tech space with highly skilled professionals.</p>
          <div className="social-icons">
            <a href="https://www.facebook.com/moringaschool" target="_blank" rel="noopener noreferrer" title="Facebook">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com/moringaschool" target="_blank" rel="noopener noreferrer" title="Twitter">
              <FaTwitter />
            </a>
            <a href="https://www.instagram.com/moringaschool" target="_blank" rel="noopener noreferrer" title="Instagram">
              <FaInstagram />
            </a>
            <a href="https://www.linkedin.com/school/moringaschool" target="_blank" rel="noopener noreferrer" title="LinkedIn">
              <FaLinkedin />
            </a>
          </div>
        </div>

        {/* Courses Section */}
        <div className="footer-section">
          <h3>Our Courses</h3>
          <ul>
            <li><a href="/courses/software-engineering">Software Engineering</a></li>
            <li><a href="/courses/web-development">Web Development</a></li>
            <li><a href="/courses/data-science">Data Science</a></li>
            <li><a href="/courses/ux-design">UX Design</a></li>
            <li><a href="/courses/devops">DevOps</a></li>
          </ul>
        </div>

        {/* Support Section */}
        <div className="footer-section">
          <h3>Support</h3>
          <ul>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/terms">Terms of Service</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Contact Info Section */}
        <div className="footer-section">
          <h3>Contact Info</h3>
          <p><IoPhonePortrait /> +254-712-345-678</p>
          <p><IoMail /> support@moringaschool.com</p>
          <p><IoLocation /> Nairobi, Kenya</p>
        </div>

        {/* Newsletter Subscription Section */}
        <div className="footer-section">
          <h3>Subscribe to Our Newsletter</h3>
          <p>Get the latest updates, tech insights, and course announcements directly to your inbox.</p>
          <form onSubmit={handleSubscribeClick}>
            <input type="email" name="email" className="email" placeholder="Your email" required />
            <input type="submit" value="Subscribe" className="btn" />
          </form>
        </div>
      </div>

      <div className="footer-credit">
        <p>© {new Date().getFullYear()} Moringa School. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
