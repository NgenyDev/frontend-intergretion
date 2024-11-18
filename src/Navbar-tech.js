import React, { useState } from 'react';
import './Navbar-tech.css'; // Ensure your CSS is correctly imported
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    FaTachometerAlt, 
    FaFileAlt, 
    FaEdit, 
    FaClipboard, 
    FaList, 
    FaCog 
} from 'react-icons/fa'; // Ensure these icons are imported
import { Link } from 'react-router-dom';  // Add this import

const userName = "Emmanuel Kipkirui"; // User name for initials
const getInitials = (name) => {
    const nameParts = name.split(" ");
    return nameParts.map(part => part.charAt(0).toUpperCase()).join("");
};

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [user, setUser] = useState({
        name: userName,
        email: 'emmanuel@example.com', // Placeholder email
        image: null // Placeholder for profile image
    });

    const handleProfileClick = () => {
        setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown visibility
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        // Here, you would typically send the updated data to the backend or save it in state/context
        console.log('Profile updated:', user);  // For now, just log to the console
        setIsDropdownOpen(false);  // Close the dropdown after saving
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUser(prevState => ({ ...prevState, image: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-profile">
                <div 
                    className="profile-circle" 
                    onClick={handleProfileClick}
                    style={{ backgroundImage: `url(${user.image})`, backgroundSize: 'cover' }} // Show profile image
                >
                    {!user.image && getInitials(user.name)} {/* Display initials if no image */}
                </div>
                <div className="navbar-logo">
                    <h2>Welcome</h2>
                </div>
            </div>
            <div className="navbar-links">
                <ul>
                    <li>
                        <Link to="/techwriter-dashboard">
                            <FontAwesomeIcon icon={FaTachometerAlt} />
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/createContent">
                            <FontAwesomeIcon icon={FaFileAlt} />
                            <span>Create Content</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/editContent">
                            <FontAwesomeIcon icon={FaEdit} />
                            <span>Edit Content</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/reviewContent">
                            <FontAwesomeIcon icon={FaClipboard} />
                            <span>Review Content</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/manageCategories">
                            <FontAwesomeIcon icon={FaList} />
                            <span>Manage Categories</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/settings">
                            <FontAwesomeIcon icon={FaCog} />
                            <span>Settings</span>
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Profile Dropdown Menu */}
            {isDropdownOpen && (
                <div className="dropdown-menu">
                    <form onSubmit={handleSave}>
                        <div>
                            <label>Name</label>
                            <input 
                                type="text" 
                                name="name" 
                                value={user.name} 
                                onChange={handleChange} 
                                placeholder="Enter your name" 
                            />
                        </div>
                        <div>
                            <label>Email</label>
                            <input 
                                type="email" 
                                name="email" 
                                value={user.email} 
                                onChange={handleChange} 
                                placeholder="Enter your email" 
                            />
                        </div>
                        <div>
                            <label>Profile Picture</label>
                            <input 
                                type="file" 
                                onChange={handleImageUpload} 
                            />
                        </div>
                        <div>
                            <button type="submit">Save</button>
                            <button type="button" onClick={() => setIsDropdownOpen(false)}>Close</button>
                        </div>
                    </form>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
