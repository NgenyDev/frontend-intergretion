import React, { useState, useEffect } from 'react';
import './UserDashboard.css';
import Navbaruser from './Navbaruser';
import Sidebar from './Sidebar-adding';

// Placeholder images array
const PLACEHOLDER_IMAGES = [
  'https://images.unsplash.com/photo-1542744173-8e7e53415bb0',
  'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
  'https://images.unsplash.com/photo-1516259762381-22954d7d9261',
  'https://images.unsplash.com/photo-1531297484001-80022131f5a1',
  'https://images.unsplash.com/photo-1522252234503-e356532cafd5'
];

function UserDashboard() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to get a random placeholder image
  const getPlaceholderImage = () => {
    return PLACEHOLDER_IMAGES[Math.floor(Math.random() * PLACEHOLDER_IMAGES.length)];
  };

  // Function to validate image URL
  const validateImageUrl = (imageUrl) => {
    if (!imageUrl) return false;
    try {
      new URL(imageUrl);
      return true;
    } catch {
      return false;
    }
  };

  // Fetch all posts
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    fetch('https://moringadailydev.onrender.com/contents')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Enhance posts with placeholder images if needed
        const enhancedPosts = data.map(post => ({
          ...post,
          image: validateImageUrl(post.image) ? post.image : getPlaceholderImage()
        }));
        setPosts(enhancedPosts);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      });
  };

  // Fetch specific post details
  const fetchPostDetails = (postId) => {
    if (!postId) {
      console.error('Invalid post ID');
      return;
    }

    fetch(`https://moringadailydev.onrender.com/contents/${postId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Enhance post with placeholder image if needed
        const enhancedPost = {
          ...data,
          image: validateImageUrl(data.image) ? data.image : getPlaceholderImage()
        };
        setSelectedPost(enhancedPost);

        // Extract comments directly from the content response
        const contentComments = data.comments || [];
        setComments(contentComments);
      })
      .catch(error => {
        console.error('Error fetching post details:', error);
        setError(error.message);
      });
  };

  // Submit a new comment
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!selectedPost || !newComment.trim()) return;

    const postId = selectedPost._id || selectedPost.id;
    if (!postId) {
      console.error('No valid post ID for comment submission');
      return;
    }

    fetch(`https://moringadailydev.onrender.com/contents/${postId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        text: newComment,
        // Add any additional comment metadata if required
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to submit comment');
      }
      return response.json();
    })
    .then(newCommentData => {
      // Refetch the entire content to get updated comments
      return fetch(`https://moringadailydev.onrender.com/contents/${postId}`);
    })
    .then(response => response.json())
    .then(updatedContent => {
      setComments(updatedContent.comments || []);
      setNewComment('');
    })
    .catch(error => {
      console.error('Error submitting comment:', error);
      alert('Failed to submit comment. Please try again.');
    });
  };

  // Render post list or post details
  const renderContent = () => {
    // Post details view
    if (selectedPost) {
      return (
        <div className="post-details-container">
          <div className="post-details">
            <button 
              className="back-button" 
              onClick={() => setSelectedPost(null)}
            >
              ← Back to Posts
            </button>
            
            <div className="post-header">
              <h2>{selectedPost.title}</h2>
              <img 
                src={selectedPost.image} 
                alt={selectedPost.title} 
                className="post-detail-image"
              />
            </div>
            
            <div className="post-content">
              <p>{selectedPost.content}</p>
            </div>

            {/* Comments Section */}
            <div className="comments-section">
              <h3>Comments</h3>
              {comments.length > 0 ? (
                comments.map((comment, index) => (
                  <div 
                    key={comment._id || index} 
                    className="comment"
                  >
                    <p>{comment.text}</p>
                  </div>
                ))
              ) : (
                <p className="no-comments">No comments yet</p>
              )}

              {/* Comment Input */}
              <form onSubmit={handleCommentSubmit} className="comment-form">
                <input 
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write a comment..."
                  className="comment-input"
                  required
                />
                <button type="submit" className="comment-submit-btn">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      );
    }

    // Post list view
    return (
      <div className="post-list">
        {posts.map((post) => {
          const postId = post._id || post.id;
          
          return (
            <div 
              key={postId} 
              className="post" 
              onClick={() => fetchPostDetails(postId)}
            >
              <img 
                src={post.image} 
                alt={post.title} 
                className="post-image" 
                onError={(e) => {
                  e.target.src = getPlaceholderImage();
                }}
              />
              <div className="post-info">
                <h3 className="post-title">{post.title}</h3>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // Main render
  return (
    <> 
      <Navbaruser />
      <div className="dashboard-container">
        <Sidebar />
        <div className="User Dashboard">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error: {error}</div>
          ) : (
            renderContent()
          )}
        </div> </div>
    </>
  );
}

export default UserDashboard;