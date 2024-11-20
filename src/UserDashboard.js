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
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Function to get user ID from localStorage
  const getUserId = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    return userData && userData.user_id ? userData.user_id : null;
  };

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

    // Fetch post details
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

        // Fetch comments for the post
        return fetch(`https://moringadailydev.onrender.com/comments?content_id=${postId}`);
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch comments');
        }
        return response.json();
      })
      .then(commentsData => {
        setComments(commentsData);
      })
      .catch(error => {
        console.error('Error fetching post details or comments:', error);
        setError(error.message);
      });
  };

  // Submit a new comment
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!selectedPost || !newComment.trim()) {
      alert('Please enter a comment');
      return;
    }

    const postId = selectedPost._id || selectedPost.id;
    const userId = getUserId();

    // Validate user and post
    if (!postId) {
      console.error('No valid post ID for comment submission');
      alert('Invalid post');
      return;
    }

    if (!userId) {
      alert('Please log in to post a comment');
      return;
    }

    // Prepare comment payload
    const commentPayload = {
      content_id: postId,
      user_id: userId,
      text: newComment,
      parent_comment_id: null
    };

    // Set submitting state
    setIsSubmitting(true);

    // Submit comment
    fetch('https://moringadailydev.onrender.com/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentPayload)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to submit comment');
      }
      return response.json();
    })
    .then((newCommentData) => {
      // Update comments locally
      setComments(prevComments => [...prevComments, newCommentData]);
      setNewComment('');
    })
    .catch(error => {
      console.error('Error submitting comment:', error);
      alert('Failed to submit comment. Please try again.');
    })
    .finally(() => {
      setIsSubmitting(false);
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
                  disabled={isSubmitting}
                  required
                />
                <button 
                  type="submit" 
                  className="comment-submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
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
        <div className="User  Dashboard">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error: {error}</div>
          ) : (
            renderContent()
          )}
        </div>
      </div>
    </>
  );
}

export default UserDashboard;