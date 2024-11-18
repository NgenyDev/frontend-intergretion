import React, { useState, useEffect } from "react";
import "./ProfileOverlay.css";

const ProfileOverlay = ({ onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user data from local storage when component mounts
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user")); // Get user data from local storage
    if (!userData || !userData.id) {
      setError("User is not logged in.");
      setLoading(false);
      return;
    }

    const userId = userData.id; // Extract user ID from localStorage data
    setLoading(true);
    fetch(`http://localhost:5000/users/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("User not found");
        }
        return response.json();
      })
      .then((data) => {
        setName(data.name);
        setEmail(data.email);
        setProfilePic(data.profilePic || "https://via.placeholder.com/150"); // Default to placeholder if no profilePic exists
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message || "Error fetching user data.");
        setLoading(false);
      });
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result); // Set the selected image as base64
      };
      reader.readAsDataURL(file); // Read the file as a data URL (base64)
    }
  };

  const handleSave = () => {
    const userData = JSON.parse(localStorage.getItem("user")); // Fetch userData inside handleSave
    if (!userData || !userData.id) {
      setError("User is not logged in.");
      return;
    }

    const updatedProfile = {
      name,
      email,
      profilePic,
    };

    setLoading(true);

    fetch(`http://localhost:5000/users/${userData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProfile),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to save profile");
        }
        return response.json();
      })
      .then(() => {
        setIsEditing(false);
        onClose();
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message || "Error saving profile.");
        setLoading(false);
      });
  };

  // Early return if there's an error or loading
  if (error) {
    return (
      <div className="overlay profile-overlay">
        <div className="overlay-content">
          <button className="close-button" onClick={onClose}>
            X
          </button>
          <div className="error-message">{error}</div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="overlay profile-overlay">
        <div className="overlay-content">
          <button className="close-button" onClick={onClose}>
            X
          </button>
          <div className="loading">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="overlay profile-overlay">
      <div className="overlay-content">
        <button className="close-button" onClick={onClose}>
          X
        </button>

        {isEditing ? (
          <>
            <h2>Edit Profile</h2>
            <div className="profile-pic-container">
              <img
                src={profilePic || "https://via.placeholder.com/150"}
                alt="Profile"
                className="profile-pic"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="profile-pic-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-input"
                placeholder="Enter your name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                placeholder="Enter your email"
              />
            </div>
            <button
              onClick={handleSave}
              className="save-button"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </>
        ) : (
          <>
            <h2>Profile</h2>
            <div className="profile-pic-container">
              <img
                src={profilePic || "https://via.placeholder.com/150"}
                alt="Profile"
                className="profile-pic"
              />
            </div>
            <p>
              <strong>Name:</strong> {name}
            </p>
            <p>
              <strong>Email:</strong> {email}
            </p>
            <button
              onClick={() => setIsEditing(true)}
              className="edit-button"
            >
              Edit Profile
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileOverlay;
