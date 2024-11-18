import React, { useState } from "react";
import "./ReviewContent.css";

// Modal Component to display the selected video with like, share, and comment options
const VideoModal = ({ videoId, onClose, videoDetails, onLike, onShare, onComment }) => {
  const [commentText, setCommentText] = useState("");

  // Handle Like Button Click
  const handleLike = () => {
    onLike(videoId);
  };

  // Handle Share Button Click (Generates shareable link)
  const handleShare = () => {
    const shareLink = `${window.location.origin}/videos/${videoId}`; // Example link generation
    navigator.clipboard.writeText(shareLink).then(() => {
      alert("Link copied to clipboard: " + shareLink);
    });
  };

  // Handle Comment Submit
  const handleCommentSubmit = () => {
    if (commentText.trim() !== "") {
      onComment(videoId, commentText);
      setCommentText(""); // Reset the comment input
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Video Embed */}
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title="Video Player"
          className="modal-iframe"
          allowFullScreen
        ></iframe>

        {/* Video Details Section */}
        <div className="video-details">
          <h2>{videoDetails.title}</h2>
          <p>{videoDetails.description}</p>
          <div className="video-actions">
            <div className="like-share">
              <button className="like-btn" onClick={handleLike}>
                👍 {videoDetails.likes} Like
              </button>
              <button className="share-btn" onClick={handleShare}>
                Share
              </button>
            </div>
            <button className="subscribe-btn">Subscribe</button>
          </div>
        </div>

        {/* Comments Section */}
        <div className="comments-section">
          <h3>Comments</h3>
          <div className="comment-form">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment..."
              rows="3"
            ></textarea>
            <button className="comment-submit" onClick={handleCommentSubmit}>Post Comment</button>
          </div>
          {/* Render Comments */}
          {videoDetails.comments && videoDetails.comments.map((comment, index) => (
            <div key={index} className="comment">
              <p><strong>{comment.user}</strong>: {comment.text}</p>
            </div>
          ))}
        </div>

        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default VideoModal;
