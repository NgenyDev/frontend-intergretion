import React, { useEffect, useState } from "react";
import VideoModal from "./VideoModal"; // Import the modal component
import "./ReviewContent.css";

const ReviewContent = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const [selectedVideoDetails, setSelectedVideoDetails] = useState(null);

  // Fetch videos from the backend
  useEffect(() => {
    fetch("http://localhost:5000/videos") // Replace with your backend URL
      .then((response) => response.json())
      .then((data) => setVideos(data))
      .catch((error) => console.error("Error fetching videos:", error));
  }, []);

  // Handle opening video modal and fetching video details
  const openModal = (videoId) => {
    setSelectedVideoId(videoId);
    const video = videos.find((video) => video.videoId === videoId);
    setSelectedVideoDetails(video);
  };

  // Handle closing video modal
  const closeModal = () => {
    setSelectedVideoId(null);
    setSelectedVideoDetails(null);
  };

  // Handle Like button action
  const handleLike = (videoId) => {
    alert(`Liked video ${videoId}`);
    // Implement additional like functionality, such as updating the like count
    const updatedVideos = videos.map((video) => {
      if (video.videoId === videoId) {
        return {
          ...video,
          likes: video.likes + 1, // Assuming 'likes' is a property of the video
        };
      }
      return video;
    });
    setVideos(updatedVideos); // Update the like count in the state
  };

  // Handle Share button action
  const handleShare = (videoId) => {
    alert(`Shared video ${videoId}`);
    // Implement share functionality, such as generating a link to share
    const videoToShare = videos.find((video) => video.videoId === videoId);
    if (videoToShare) {
      const shareLink = `https://www.youtube.com/watch?v=${videoId}`;
      alert(`Share this link: ${shareLink}`);
    }
  };

  // Handle Comment submission
  const handleComment = (videoId, commentText) => {
    if (!commentText.trim()) return; // Prevent submitting empty comments

    const updatedVideos = videos.map((video) => {
      if (video.videoId === videoId) {
        return {
          ...video,
          comments: [
            ...video.comments,
            { user: "User", text: commentText, timestamp: new Date().toISOString() },
          ], // Add a timestamp for the comment
        };
      }
      return video;
    });

    setVideos(updatedVideos); // Update videos state with new comment
    alert(`Comment added to video ${videoId}: ${commentText}`);
  };

  return (
    <div className="review-container">
      <h1>Review Content</h1>
      <p>Review the content submitted by users.</p>

      <div className="video-grid">
        {videos.map((video) => (
          <div
            className="video-thumbnail"
            key={video.videoId}
            onClick={() => openModal(video.videoId)}
          >
            <img
              src={`https://img.youtube.com/vi/${video.videoId}/0.jpg`} // YouTube thumbnail
              alt={video.title}
              className="thumbnail-img"
            />
            <div className="video-info">
              <h3>{video.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {selectedVideoId && selectedVideoDetails && (
        <VideoModal
          videoId={selectedVideoId}
          onClose={closeModal}
          videoDetails={selectedVideoDetails}
          onLike={handleLike}
          onShare={handleShare}
          onComment={handleComment}
        />
      )}
    </div>
  );
};

export default ReviewContent;
