// Navbar.js
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
          <NavLink to="/" className="navbar-item" activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" className="navbar-item" activeClassName="active">
            Contact Us
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin" className="navbar-item" activeClassName="active">
            Admin
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" className="navbar-item" activeClassName="active">
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
