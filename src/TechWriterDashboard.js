import React from 'react';
import './TechWriterDashboard.css'; // Importing CSS for styling
import { FaUsers, FaUserEdit, FaClipboardList, FaPen, FaRegThumbsUp, FaCommentDots } from 'react-icons/fa';
import SidebarTechwriter from './Navbar-tech'; // Sidebar component
import { Link } from 'react-router-dom'; // Importing Link from react-router-dom

const TechWriterHomePage = () => {
  return (
    <div className="techwriter-homepage">
      {/* Navbar (SidebarTechwriter) */}
      <SidebarTechwriter />

      
      <div className="main-content">
        {/* Header Section */}
        <header className="header">
          <div className="container">
            <h1 className="header-title">Moringa School daily.dev</h1>
            <p className="header-subtitle">
              A platform for high-quality tech content, curated by the Moringa School community, offering industry insights and expertise.
            </p>
            <button className="cta-btn primary-btn">
              <Link to="/signup">Join the Community</Link>
            </button>
          </div>
        </header>

        {/* Platform Overview Section */}
        <section className="overview-section">
          <div className="container">
            <h2 className="section-title">About Moringa School daily.dev</h2>
            <p className="section-description">
              Moringa School daily.dev is your go-to platform for industry-verified tech content, created by our vibrant Moringa School community.
            </p>
          </div>
        </section>

        {/* Video Introduction Section */}
        <section className="video-introduction">
          <div className="container">
            <h2 className="section-title">Platform Overview</h2>
            <div className="video-container">
              <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/AtozUZ_GZRw?si=hXp1mZy2bfub7Zg2&rel=0"
                title="YouTube video"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <p className="video-description">
              Watch this video to get an in-depth overview of our platform and learn how it can benefit you.
            </p>
          </div>
        </section>

        {/* Platform Features Section */}
        <section className="features-section">
          <div className="container">
            <h2 className="section-title">Key Features</h2>
            <div className="features-cards">
              <div className="feature-card">
                <FaUsers className="feature-icon" />
                <h3 className="feature-title">User Authentication</h3>
                <p className="feature-description">
                  Multiple user roles including Admins, Tech Writers, and Users with specific permissions.
                </p>
              </div>
              <div className="feature-card">
                <FaUserEdit className="feature-icon" />
                <h3 className="feature-title">Content Creation & Editing</h3>
                <p className="feature-description">
                  Seamlessly create and manage high-quality content, ensuring up-to-date contributions.
                </p>
              </div>
              <div className="feature-card">
                <FaClipboardList className="feature-icon" />
                <h3 className="feature-title">Content Management</h3>
                <p className="feature-description">
                  Admins can oversee content approval and categorize for improved access.
                </p>
              </div>
              <div className="feature-card">
                <FaPen className="feature-icon" />
                <h3 className="feature-title">Content Categorization</h3>
                <p className="feature-description">
                  Flexible category options like DevOps, Fullstack, and Front-End development.
                </p>
              </div>
              <div className="feature-card">
                <FaRegThumbsUp className="feature-icon" />
                <h3 className="feature-title">Content Interaction</h3>
                <p className="feature-description">
                  Users can like, comment, and engage with content, fostering collaboration.
                </p>
              </div>
              <div className="feature-card">
                <FaCommentDots className="feature-icon" />
                <h3 className="feature-title">Discussion & Feedback</h3>
                <p className="feature-description">
                  Engage in constructive discussions and share feedback within the community.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Writer Actions Section */}
        <section className="techwriter-actions">
          <div className="container">
            <h2 className="section-title">Tech Writer Actions</h2>
            <div className="action-cards">
              <div className="action-card">
                <Link to="/createProfile">
                  <button className="action-btn primary-btn">Create Your Profile</button>
                </Link>
                <p className="action-description">Set up your profile to begin sharing your expertise.</p>
              </div>
              <div className="action-card">
                <Link to="/createContent">
                  <button className="action-btn primary-btn">Create Content</button>
                </Link>
                <p className="action-description">Publish insightful articles, videos, or podcasts.</p>
              </div>
              <div className="action-card">
                <Link to="/approveContent">
                  <button className="action-btn primary-btn">Approve Content</button>
                </Link>
                <p className="action-description">Review and approve content for quality assurance.</p>
              </div>
              <div className="action-card">
                <Link to="/ContentModeration">
                  <button className="action-btn primary-btn">Flag Content</button>
                </Link>
                <p className="action-description">Report inappropriate content for review.</p>
              </div>
              <div className="action-card">
                <Link to="/editContent">
                  <button className="action-btn primary-btn">Edit Your Content</button>
                </Link>
                <p className="action-description">Update your content to maintain accuracy and relevance.</p>
              </div>
              <div className="action-card">
                <Link to="/reviewFeedback">
                  <button className="action-btn primary-btn">Review Feedback</button>
                </Link>
                <p className="action-description">Evaluate feedback to enhance future contributions.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Subscription & Notifications Section */}
        <section className="subscriptions-section">
          <div className="container">
            <h2 className="section-title">Customize Your Interests</h2>
            <p className="section-description">
              Subscribe to your favorite content categories and receive personalized notifications on new posts.
            </p>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="testimonials-section">
          <div className="container">
            <h2 className="section-title">What Our Writers Say</h2>
            <div className="testimonials-cards">
              <div className="testimonial-card">
                <p className="testimonial-text">"Moringa School daily.dev has given me a platform to share my passion for tech with a community of like-minded individuals."</p>
                <p className="testimonial-author">- Jane Doe, Tech Writer</p>
              </div>
              <div className="testimonial-card">
                <p className="testimonial-text">"The easy-to-use interface and content approval process have made it a pleasure to contribute."</p>
                <p className="testimonial-author">- John Smith, Senior Developer</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer Section */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 Moringa School. All rights reserved.</p>
          <div className="footer-links">
            
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TechWriterHomePage;
