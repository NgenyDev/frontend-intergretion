import React, { useEffect, useState } from "react";
import "./ReviewFeedback.css";

const ReviewFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  // Fetch feedbacks from the backend
  useEffect(() => {
    fetch("http://localhost:5000/feedback") // Replace with your backend URL
      .then((response) => response.json())
      .then((data) => setFeedbacks(data))
      .catch((error) => console.error("Error fetching feedback:", error));
  }, []);

  // Handle like action
  const handleLike = (id) => {
    setFeedbacks((prevFeedbacks) =>
      prevFeedbacks.map((feedback) =>
        feedback.id === id
          ? { ...feedback, likes: feedback.likes + 1 }
          : feedback
      )
    );
  };

  // Handle dislike action
  const handleDislike = (id) => {
    setFeedbacks((prevFeedbacks) =>
      prevFeedbacks.map((feedback) =>
        feedback.id === id
          ? { ...feedback, dislikes: feedback.dislikes + 1 }
          : feedback
      )
    );
  };

  // Handle flag action
  const handleFlag = (id) => {
    console.log(`Feedback with ID ${id} flagged!`);
    // For example, you could call a backend API to flag content:
    // fetch(`http://localhost:5000/feedback/${id}/flag`, { method: "POST" })
    //   .then((response) => console.log("Content flagged"))
    //   .catch((error) => console.error("Error flagging content:", error));
  };

  // Handle comment click (expand comment view)
  const handleCommentClick = (feedbackId, commentId) => {
    const feedback = feedbacks.find((fb) => fb.id === feedbackId);
    const comment = feedback.comments.find((com) => com.id === commentId);
    setSelectedFeedback(comment);
  };

  return (
    <div className="review-feedback">
      <header>
        <h1>Review Feedback</h1>
        <p>View and manage feedback provided by users.</p>
      </header>
      <div className="feedback-container">
        {feedbacks.length === 0 ? (
          <p>No feedback available.</p>
        ) : (
          feedbacks.map((feedback) => (
            <div className="feedback-card" key={feedback.id}>
              <h3>{feedback.title}</h3>
              <p><strong>User:</strong> {feedback.user}</p>
              <p><strong>Feedback:</strong> {feedback.comment}</p>
              <div className="feedback-actions">
                <button
                  className="like-btn"
                  onClick={() => handleLike(feedback.id)}
                >
                  👍 {feedback.likes}
                </button>
                <button
                  className="dislike-btn"
                  onClick={() => handleDislike(feedback.id)}
                >
                  👎 {feedback.dislikes}
                </button>
                <button
                  className="flag-btn"
                  onClick={() => handleFlag(feedback.id)}
                >
                  🚩 Flag
                </button>
              </div>

              <div className="comments-section">
                <h4>Comments:</h4>
                {Array.isArray(feedback.comments) && feedback.comments.length === 0 ? (
                  <p>No comments yet.</p>
                ) : (
                  Array.isArray(feedback.comments) &&
                  feedback.comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="comment"
                      onClick={() => handleCommentClick(feedback.id, comment.id)}
                    >
                      <p><strong>{comment.user}:</strong> {comment.text}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal or detailed view for selected comment */}
      {selectedFeedback && (
        <div className="comment-detail-modal">
          <div className="modal-content">
            <h3>{selectedFeedback.user}'s Comment</h3>
            <p>{selectedFeedback.text}</p>
            <button onClick={() => setSelectedFeedback(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewFeedback;
