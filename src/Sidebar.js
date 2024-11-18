import React, { useState } from 'react';
import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faTasks, faList, faCog } from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ onSelectPage }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            {/* Hamburger Menu Button */}
            {!isOpen && (
                <button className="hamburger-menu" onClick={toggleSidebar}>
                    ☰
                </button>
            )}

            <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
                <div className="sidebar-header">
                    {isOpen && <h2 className="sidebar-title">Admin Panel</h2>}
                    <button className="close-btn" onClick={toggleSidebar}>✖</button>
                </div>
                <nav className="sidebar-content">
                    <ul>
                        <li onClick={() => onSelectPage('dashboard')}>
                            <FontAwesomeIcon icon={faHome} />
                            {isOpen && <span>Dashboard</span>}
                        </li>
                        <li onClick={() => onSelectPage('manageUsers')}>
                            <FontAwesomeIcon icon={faUsers} />
                            {isOpen && <span>Manage Users</span>}
                        </li>
                        <li onClick={() => onSelectPage('contentModeration')}>
                            <FontAwesomeIcon icon={faTasks} />
                            {isOpen && <span>Content Moderation</span>}
                        </li>
                        <li onClick={() => onSelectPage('manageCategories')}>
                            <FontAwesomeIcon icon={faList} />
                            {isOpen && <span>Manage Categories</span>}
                        </li>
                        <li onClick={() => onSelectPage('settings')}>
                            <FontAwesomeIcon icon={faCog} />
                            {isOpen && <span>Settings</span>}
                        </li>
                    </ul>
                </nav>
            </aside>
        </div>
    );
};

export default Sidebar;
