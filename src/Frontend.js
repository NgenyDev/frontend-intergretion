import React, { useState } from 'react';
import './Frontend.css';
import Navbar from './Navbaruser';
import Sidebar from './Sidebar-adding'; // Import Sidebar
import { FaThumbsUp, FaThumbsDown, FaPlus, FaBookmark as FaBookmarkSolid, FaRegBookmark } from 'react-icons/fa';

const CreatePostModal = ({ isOpen, onClose, onSubmit }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit({
        content,
        image: '/api/placeholder/600/400',
      });
      setContent('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Create New Post</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your thoughts..."
            rows="4"
          />
          <div className="modal-buttons">
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const FrontendFeature = ({ 
  image, 
  content, 
  likes, 
  dislikes, 
  isBookmarked,
  onLike, 
  onDislike, 
  onBookmark,
  comments, 
  onAddComment 
}) => {
  const [newComment, setNewComment] = useState('');

  const handleCommentSubmit = () => {
    if (newComment.trim() !== '') {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  return (
    <div className="frontend-feature">
      <div className="feature-image-container">
        <img src={image} alt="Frontend" className="feature-image" />
      </div>
      <div className="frontend-feature-info">
        <div className="feature-text">
          {content}
        </div>
        <div className="frontend-feature-actions">
          <button className="action-btn like-btn" onClick={onLike}>
            <FaThumbsUp size={18} />
            <span>{likes}</span>
          </button>
          <button className="action-btn dislike-btn" onClick={onDislike}>
            <FaThumbsDown size={18} />
            <span>{dislikes}</span>
          </button>
          <button 
            className={`action-btn bookmark-btn ${isBookmarked ? 'bookmarked' : ''}`} 
            onClick={onBookmark}
          >
            {isBookmarked ? 
              <FaBookmarkSolid size={18} /> : 
              <FaRegBookmark size={18} />
            }
          </button>
        </div>
      </div>
      <div className="comment-section">
        <div className="comment-input">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
          />
          <button onClick={handleCommentSubmit}>Post</button>
        </div>
        <div className="comments-list">
          {comments.map((comment, index) => (
            <div key={index} className="comment">
              <img src={comment.avatar} alt="User avatar" className="comment-avatar" />
              <div className="comment-content">
                <span className="comment-username">{comment.username}</span>
                <p className="comment-text">{comment.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const FrontendComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState([
    {
      id: 1,
      image: '/api/placeholder/600/400',
      content: 'Frontend development focuses on creating user interfaces and interactions on the web.',
      likes: 42,
      dislikes: 8,
      isBookmarked: false,
      comments: [
        { avatar: "/api/placeholder/32/32", username: "john_doe", text: "Great post!" },
        { avatar: "/api/placeholder/32/32", username: "jane_doe", text: "Really informative." }
      ]
    },
    {
      id: 2,
      image: 'https://youtu.be/iql930GDmVQ?si=E-MNKTd_mkbl6t2M',
      content: 'Responsive design is key in frontend development to ensure accessibility across devices.',
      likes: 35,
      dislikes: 5,
      isBookmarked: false,
      comments: [
        { avatar: "/api/placeholder/32/32", username: "dev_mike", text: "Awesome explanation!" },
        { avatar: "/api/placeholder/32/32", username: "web_queen", text: "This was really helpful!" }
      ]
    }
  ]);

  const handleCreatePost = (newPost) => {
    const post = {
      id: posts.length + 1,
      ...newPost,
      likes: 0,
      dislikes: 0,
      isBookmarked: false,
      comments: []
    };
    setPosts([post, ...posts]);
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const handleDislike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, dislikes: post.dislikes + 1 } : post
    ));
  };

  const handleBookmark = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, isBookmarked: !post.isBookmarked } : post
    ));
  };

  const handleAddComment = (postId, newComment) => {
    setPosts(posts.map(post => 
      post.id === postId ? {
        ...post,
        comments: [...post.comments, {
          avatar: "/api/placeholder/32/32",
          username: "user" + Math.floor(Math.random() * 1000),
          text: newComment
        }]
      } : post
    ));
  };

  return (
    <>
      <Navbar />
      <div className="frontend-container">
        <Sidebar /> {/* Add Sidebar here */}
        <div className="frontend-content">
          <button className="create-post-btn" onClick={() => setIsModalOpen(true)}>
            <FaPlus /> Create Post
          </button>
          <div className="frontend-features">
            {posts.map((post) => (
              <FrontendFeature
                key={post.id}
                image={post.image}
                content={post.content}
                likes={post.likes}
                dislikes={post.dislikes}
                isBookmarked={post.isBookmarked}
                comments={post.comments}
                onLike={() => handleLike(post.id)}
                onDislike={() => handleDislike(post.id)}
                onBookmark={() => handleBookmark(post.id)}
                onAddComment={(comment) => handleAddComment(post.id, comment)}
              />
            ))}
          </div>
          <CreatePostModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleCreatePost}
          />
        </div>
      </div>
    </>
  );
};

export default FrontendComponent;
