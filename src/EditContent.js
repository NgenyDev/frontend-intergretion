import React, { useEffect, useState } from "react";
import "./TechWriterVideos.css";

const TechWriterVideos = () => {
  const [videos, setVideos] = useState([]);
  const [editingVideo, setEditingVideo] = useState(null);
  const [formData, setFormData] = useState({ title: "", description: "" });

  // Fetch videos from the backend
  useEffect(() => {
    fetch("http://localhost:5000/videos") // Replace with your backend URL
      .then((response) => response.json())
      .then((data) => setVideos(data))
      .catch((error) => console.error("Error fetching videos:", error));
  }, []);

  // Handle click on the pen icon to edit
  const handleEditClick = (video) => {
    setEditingVideo(video.id); // Set the current video ID for editing
    setFormData({ title: video.title, description: video.description }); // Pre-fill form
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:5000/videos/${editingVideo}`, {
      method: "PUT", // Update video details
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((updatedVideo) => {
        // Update the video in the local state
        setVideos((prevVideos) =>
          prevVideos.map((video) =>
            video.id === editingVideo ? updatedVideo : video
          )
        );
        setEditingVideo(null); // Close the editing form
      })
      .catch((error) => console.error("Error updating video:", error));
  };

  return (
    <div className="video-container">
      {videos.map((video) => (
        <div className="video-card" key={video.id}>
          <iframe
            src={`https://www.youtube.com/embed/${video.videoId}`}
            title={video.title}
            className="video-iframe"
          ></iframe>
          <div className="video-details">
            <h3>{video.title}</h3>
            <p>{video.description}</p>
            <button
              className="edit-button"
              onClick={() => handleEditClick(video)}
            >
              ✏️ Edit
            </button>
          </div>
        </div>
      ))}

      {editingVideo && (
        <div className="edit-form-container">
          <h2>Edit Video</h2>
          <form onSubmit={handleFormSubmit}>
            <label>
              Title:
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Description:
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </label>
            <button type="submit">Save</button>
            <button
              type="button"
              onClick={() => setEditingVideo(null)}
              className="cancel-button"
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default TechWriterVideos;
