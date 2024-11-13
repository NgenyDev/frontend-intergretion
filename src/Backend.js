import React, { useState } from 'react';
import './Backend.css'; // Import external CSS file for styling
import Navbaruser from './Navbaruser';
import { FaThumbsUp, FaThumbsDown, FaPlus, FaBookmark as FaBookmarkSolid, FaRegBookmark } from 'react-icons/fa';

const CreatePostModal = ({ isOpen, onClose, onSubmit }) => {
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (description.trim()) {
      onSubmit({
        description,
        image: '/api/placeholder/600/400'
      });
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
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What's on your mind about Backend?"
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

const BackendFeature = ({ 
  image, 
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
    <div className="devops-feature">
      <div className="feature-image-container">
        <img src={image} alt="Backend" className="feature-image" />
      </div>
      <div className="devops-feature-info">
        <div className="feature-text">
          {description}
        </div>
        <div className="devops-feature-actions">
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

const BackendComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState([
    {
      id: 1,
      image: '/api/placeholder/600/400',
      description: 'Backend development handles the server-side operations of an application, including logic, database connections, and authentication.',
      likes: 42,
      dislikes: 8,
      isBookmarked: false,
      comments: [
        { avatar: "/api/placeholder/32/32", username: "hwduidfgeruatjhvjknm", text: "Great insights!" },
        { avatar: "/api/placeholder/32/32", username: "edgfjhnhjfjg", text: "Very helpful." }
      ]
    },
    {
      id: 2,
      image: '/api/placeholder/600/400',
      description: 'APIs enable communication between the backend and other systems, allowing data exchange and integration with external services.',
      likes: 35,
      dislikes: 5,
      isBookmarked: false,
      comments: [
        { avatar: "/api/placeholder/32/32", username: "jjydjjd", text: "Amazing explanation!" },
        { avatar: "/api/placeholder/32/32", username: "ukgkkuikg", text: "This helps a lot!" }
      ]
    },
    {
      id: 3,
      image: '/api/placeholder/600/400',
      description: 'Backend development ensures data security by implementing authentication, authorization, and encryption protocols.',
      likes: 38,
      dislikes: 6,
      isBookmarked: false,
      comments: [
        { avatar: "/api/placeholder/32/32", username: "gjkdklgi", text: "Very informative!" },
        { avatar: "/api/placeholder/32/32", username: "lgjdlfljhkjhuy", text: "Great post!" }
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
      <div className="devops-container">
        <button className="create-post-btn" onClick={() => setIsModalOpen(true)}>
          <FaPlus /> Create Post
        </button>
        <div className="devops-features">
          {posts.map((post) => (
            <BackendFeature
              key={post.id}
              image={post.image}
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

export default BackendComponent;
