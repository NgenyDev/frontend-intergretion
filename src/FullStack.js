import React, { useState } from 'react';
import './FullStack.css';
import Navbaruser from './Navbaruser';
import Sidebar from './Sidebar-adding'; // Import Sidebar
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
      image: 'data:image/jpeg;base64,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',
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
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlvZkx1G7auHtB1v_s7ZB-MkdYtainYosDAw&s',
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
      image: 'data:image/png;base64,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',
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
        <div className="sidebar-container">
          <Sidebar />
        </div>
        <div className="main-content">
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
