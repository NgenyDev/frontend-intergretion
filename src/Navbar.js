import React from "react";
import { NavLink } from "react-router-dom"; // Import NavLink
import "./Navbar.css"; // Import Navbar CSS

const Navbar = () => {
  return (
    <nav className="navbar2">
      <ul className="navbar-links2">
        <li className="logo2">
          <img src="https://iconape.com/wp-content/png_logo_vector/moringa-school-logo.png" alt="" width="100" height="50"></img>
        </li>
        <li>
          <NavLink to="/" className="navbar-item2" activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" className="navbar-item2" activeClassName="active">
            Contact Us
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" className="navbar-item2" activeClassName="active">
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
