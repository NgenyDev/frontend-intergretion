import React, { useState } from 'react';
import './FullStack.css';
import Navbaruser from './Navbaruser';
import { FaThumbsUp, FaThumbsDown, FaPlus, FaBookmark as FaBookmarkSolid, FaRegBookmark } from 'react-icons/fa';

const CreatePostModal = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && description.trim()) {
      onSubmit({
        title,
        description,
        image: '/api/placeholder/600/400'
      });
      setTitle('');
      setDescription('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Create New Post</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
            className="modal-input"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What's on your mind about Full Stack Development?"
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

const FullStackFeature = ({
  image,
  title,
  description,
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
    <div className="fullstack-feature">
      <div className="feature-image-container">
        <img src={image} alt={title} className="feature-image" />
      </div>
      <div className="fullstack-feature-info">
        <h3>{title}</h3>
        <div className="feature-text">
          {description}
        </div>
        <div className="fullstack-feature-actions">
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

const FullStackComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState([
    {
      id: 1,
      image: '/api/placeholder/600/400',
      title: 'Frontend Development',
      description: 'Building user interfaces with HTML, CSS, and JavaScript.',
      likes: 42,
      dislikes: 8,
      isBookmarked: false,
      comments: [
        { avatar: "/api/placeholder/32/32", username: "webdev123", text: "Great explanation of frontend!" },
        { avatar: "/api/placeholder/32/32", username: "coder456", text: "Very informative." }
      ]
    },
    {
      id: 2,
      image: '/api/placeholder/600/400',
      title: 'Backend Development',
      description: 'Working with databases, server-side logic, and APIs.',
      likes: 35,
      dislikes: 5,
      isBookmarked: false,
      comments: [
        { avatar: "/api/placeholder/32/32", username: "dbmaster", text: "Useful info on backend!" },
        { avatar: "/api/placeholder/32/32", username: "apidev", text: "I learned a lot from this post." }
      ]
    },
    {
      id: 3,
      image: '/api/placeholder/600/400',
      title: 'Full-Stack Integration',
      description: 'Combining frontend and backend to create a seamless web application.',
      likes: 38,
      dislikes: 6,
      isBookmarked: false,
      comments: [
        { avatar: "/api/placeholder/32/32", username: "fullstack_pro", text: "Nice integration details!" },
        { avatar: "/api/placeholder/32/32", username: "dev_guru", text: "Good explanation of full-stack concepts." }
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
      <Navbaruser />
      <div className="fullstack-container">
        <button className="create-post-btn" onClick={() => setIsModalOpen(true)}>
          <FaPlus /> Create Post
        </button>
        <div className="fullstack-features">
          {posts.map((post) => (
            <FullStackFeature
              key={post.id}
              image={post.image}
              title={post.title}
              description={post.description}
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
    </>
  );
};

export default FullStackComponent;