import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import "./Footer.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li className="logo">
          <img
            src="https://iconape.com/wp-content/png_logo_vector/moringa-school-logo.png"
            alt="Moringa School Logo"
            width="100"
            height="50"
          />
          <span className="logo-title">Moringa School Daily Dev</span>
        </li>
        <li>
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? "navbar-item active" : "navbar-item"} 
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/contact" 
            className={({ isActive }) => isActive ? "navbar-item active" : "navbar-item"} 
          >
            Contact Us
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/admin-dashboard" 
            className={({ isActive }) => isActive ? "navbar-item active" : "navbar-item"} 
          >
            Admin
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/login" 
            className={({ isActive }) => isActive ? "navbar-item active" : "navbar-item"} 
          >
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
