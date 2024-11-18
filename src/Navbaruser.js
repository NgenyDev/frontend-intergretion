import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBell, FaBookmark, FaUser } from "react-icons/fa";
import NotificationsOverlay from "./NotificationsOverlay";
import BookmarksOverlay from "./BookmarksOverlay";
import ProfileOverlay from "./ProfileOverlay";
import "./Navbar-user.css";

const Navbaruser = () => {
  const [activeOverlay, setActiveOverlay] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  // Example of getting userId from localStorage
  const userId = localStorage.getItem("userId");

  // Handle image selection in the profile overlay
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result; // This will be a base64 URL
        setProfileImage(imageUrl); // Set the image as base64 URL
        console.log("Profile image updated:", imageUrl); // Debugging line
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  const openOverlay = (overlay) => {
    setActiveOverlay(overlay);
  };

  const closeOverlay = () => {
    setActiveOverlay(null);
  };

  return (
    <nav className="navbar3">
      <div className="navbar-content3">
        {/* Logo Section */}
        <div className="logo3">
          <NavLink to="/">
            <img
              src="https://iconape.com/wp-content/png_logo_vector/moringa-school-logo.png"
              alt="Moringa logo"
              width="100"
              height="50"
            />
          </NavLink>
        </div>

        {/* Icons Section */}
        <div className="icons">
          <li className="icon" onClick={() => openOverlay("notifications")}>
            <FaBell />
          </li>
          <li className="icon" onClick={() => openOverlay("bookmarks")}>
            <FaBookmark />
          </li>
          <li className="icon circle-icon" onClick={() => openOverlay("profile")}>
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="profile-image"
                style={{ width: "40px", height: "40px", borderRadius: "50%" }}
              />
            ) : (
              <FaUser />
            )}
          </li>
        </div>
      </div>

      {/* Navigation Links */}
      <ul className="navbar-links3">
        <li>
          <NavLink
            to="/user-dashboard"
            className={({ isActive }) => (isActive ? "navbar-item3 active" : "navbar-item3")}
          >
            FOR YOU
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/devops"
            className={({ isActive }) => (isActive ? "navbar-item3 active" : "navbar-item3")}
          >
            DEVOPS
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/fullstack"
            className={({ isActive }) => (isActive ? "navbar-item3 active" : "navbar-item3")}
          >
            FULLSTACK
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/frontend"
            className={({ isActive }) => (isActive ? "navbar-item3 active" : "navbar-item3")}
          >
            FRONTEND
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/backend"
            className={({ isActive }) => (isActive ? "navbar-item3 active" : "navbar-item3")}
          >
            BACKEND
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/cloudcomputing"
            className={({ isActive }) => (isActive ? "navbar-item3 active" : "navbar-item3")}
          >
            CLOUD COMPUTING
          </NavLink>
        </li>
      </ul>

      {/* Overlays */}
      {activeOverlay === "notifications" && <NotificationsOverlay onClose={closeOverlay} />}
      {activeOverlay === "bookmarks" && <BookmarksOverlay onClose={closeOverlay} />}
      {activeOverlay === "profile" && userId && (
        <ProfileOverlay onClose={closeOverlay} userId={userId}>
          <div className="profile-overlay-content">
            <h3>Update Profile Image</h3>
            <input
              type="file"
              id="profileImageInput"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
            <label htmlFor="profileImageInput" className="upload-btn">
              Choose Profile Image
            </label>
            {profileImage && (
              <div>
                <img
                  src={profileImage}
                  alt="Profile Preview"
                  className="profile-preview"
                  style={{ width: "100px", height: "100px", borderRadius: "50%" }}
                />
              </div>
            )}
          </div>
        </ProfileOverlay>
      )}
      {activeOverlay === "profile" && !userId && (
        <div className="error-message">Please log in to access your profile.</div>
      )}
    </nav>
  );
};

export default Navbaruser;
