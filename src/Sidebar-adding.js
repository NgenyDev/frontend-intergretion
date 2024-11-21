import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink
import { FaHome, FaUser, FaBookmark, FaListAlt, FaBell, FaBars } from 'react-icons/fa';
import './Sidebar-adding.css';

function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State for toggling sidebar visibility
  const sidebarRef = useRef(null); // Reference to the sidebar for detecting clicks outside

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle the sidebar state
  };

  // Close the sidebar if a click happens outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && !event.target.closest('.hamburger-icon')) {
        setIsSidebarOpen(false); // Close sidebar if click is outside
      }
    };

    // Attach the event listener
    document.addEventListener('click', handleClickOutside);

    // Cleanup event listener
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div>
      {/* Hamburger icon */}
      <div className="hamburger-icon" onClick={toggleSidebar}>
        <FaBars size={30} />
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`} ref={sidebarRef}>
        <NavLink to="/user-dashboard" className={({ isActive }) => (isActive ? 'sidebar-item active' : 'sidebar-item')}>
          <FaHome size={24} />
          <span>Home</span>
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => (isActive ? 'sidebar-item active' : 'sidebar-item')}>
          <FaUser size={24} />
          <span>Profile</span>
        </NavLink>
        <NavLink to="/notifications" className={({ isActive }) => (isActive ? 'sidebar-item active' : 'sidebar-item')}>
          <FaBell size={24} />
          <span>Notifications</span>
        </NavLink>
        <NavLink to="/wishlist" className={({ isActive }) => (isActive ? 'sidebar-item active' : 'sidebar-item')}>
          <FaBookmark size={24} />
          <span>My Wishlist</span>
        </NavLink>
        <NavLink to="/subscriptions" className={({ isActive }) => (isActive ? 'sidebar-item active' : 'sidebar-item')}>
          <FaListAlt size={24} />
          <span>Subscriptions</span>
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
