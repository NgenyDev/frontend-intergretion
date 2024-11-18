import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBell, FaBookmark, FaUser } from "react-icons/fa";
import NotificationsOverlay from "./NotificationsOverlay";
import BookmarksOverlay from "./BookmarksOverlay";
import ProfileOverlay from "./ProfileOverlay";
import "./Navbar-user.css";

const Navbaruser = () => {
  const [activeOverlay, setActiveOverlay] = useState(null);

  const openOverlay = (overlay) => {
    setActiveOverlay(overlay);
  };

  const closeOverlay = () => {
    setActiveOverlay(null);
  };

  return (
    <nav className="navbar3">
      <div className="navbar-content3">
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
        <ul className="navbar-links3">
          <li>
            <NavLink 
              to="/user-dashboard" 
              className={({ isActive }) => isActive ? "navbar-item3 active" : "navbar-item3"}
            >
              FOR YOU
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/devops" 
              className={({ isActive }) => isActive ? "navbar-item3 active" : "navbar-item3"}
            >
              DEVOPS
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/fullstack" 
              className={({ isActive }) => isActive ? "navbar-item3 active" : "navbar-item3"}
            >
              FULLSTACK
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/frontend" 
              className={({ isActive }) => isActive ? "navbar-item3 active" : "navbar-item3"}
            >
              FRONTEND
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/backend" 
              className={({ isActive }) => isActive ? "navbar-item3 active" : "navbar-item3"}
            >
              BACKEND
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/cloudcomputing" 
              className={({ isActive }) => isActive ? "navbar-item3 active" : "navbar-item3"}
            >
              CLOUD COMPUTING
            </NavLink>
          </li>
          <li className="icon" onClick={() => openOverlay("notifications")}>
            <FaBell />
          </li>
          <li className="icon" onClick={() => openOverlay("bookmarks")}>
            <FaBookmark />
          </li>
          <li className="icon" onClick={() => openOverlay("profile")}>
            <FaUser />
          </li>
          
        </ul>
      </div>

      {/* Render overlays conditionally without affecting navbar visibility */}
      {activeOverlay === "notifications" && <NotificationsOverlay onClose={closeOverlay} />}
      {activeOverlay === "bookmarks" && <BookmarksOverlay onClose={closeOverlay} />}
      {activeOverlay === "profile" && <ProfileOverlay onClose={closeOverlay} />}
    </nav>
  );
};

export default Navbaruser;
