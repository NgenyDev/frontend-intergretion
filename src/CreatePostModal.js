import React, { useState } from 'react';
import './DevOpsComponent.css';
import { FaPlus } from 'react-icons/fa';

const CreatePostModal = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [contentType, setContentType] = useState('Post');
  const [description, setDescription] = useState('');
  const [contentValue, setContentValue] = useState(''); // URL or file for video/audio
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate form fields before submitting
    if (title.trim() && description.trim()) {
      const newPost = {
        title,
        category,
        contentType,
        description,
        contentValue,
        image: '/api/placeholder/600/400', // Placeholder for image
      };

      try {
        // Using a single endpoint for posts
        const endpoint = 'http://localhost:5000/posts';
        const formData = new FormData();
        
        formData.append('title', title);
        formData.append('category', category);
        formData.append('description', description);
        formData.append('contentValue', contentValue);
        formData.append('contentType', contentType);

        if (file) formData.append('file', file);

        const response = await fetch(endpoint, {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const savedPost = await response.json();
          onSubmit(savedPost); // Add the post to the state of the parent component
          setTitle('');
          setCategory('');
          setDescription('');
          setContentValue('');
          setFile(null);
          onClose(); // Close the modal after submission
        } else {
          console.error('Error creating post:', response.statusText);
        }
      } catch (error) {
        console.error('Error submitting post:', error);
      }
    } else {
      // You can display a message or feedback here for missing fields
      console.error('Title and description are required.');
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setContentValue('');
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
            placeholder="Post Title"
            required
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            <option value="Full Stack">Full Stack</option>
            <option value="DevOps">DevOps</option>
            <option value="Backend">Backend</option>
            <option value="Cloud Computing">Cloud Computing</option>
          </select>
          <select
            value={contentType}
            onChange={(e) => setContentType(e.target.value)}
            required
          >
            <option value="Post">Post</option>
            <option value="Video">Video</option>
            <option value="Audio">Audio</option>
          </select>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What's on your mind?"
            rows="4"
            required
          />

          {contentType === 'Post' && (
            <>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                accept="image/*"
              />
            </>
          )}

          {contentType === 'Video' && (
            <>
              <input
                type="text"
                value={contentValue}
                onChange={(e) => setContentValue(e.target.value)}
                placeholder="Enter video URL"
              />
              <input
                type="file"
                onChange={handleFileChange}
                accept="video/*"
              />
            </>
          )}

          {contentType === 'Audio' && (
            <>
              <input
                type="text"
                value={contentValue}
                onChange={(e) => setContentValue(e.target.value)}
                placeholder="Enter audio URL"
              />
              <input
                type="file"
                onChange={handleFileChange}
                accept="audio/*"
              />
            </>
          )}

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

export default CreatePostModal;
