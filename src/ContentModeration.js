import React, { useState, useEffect } from 'react';
import './ContentModeration.css';

// Fetch content from the correct API endpoint
const fetchContent = async (contentType) => {
  const response = await fetch(`http://localhost:5000/${contentType}`);
  const data = await response.json();
  return data;
};

const ContentModeration = () => {
  const [contentType, setContentType] = useState('posts'); // Default to 'posts'
  const [content, setContent] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);

  useEffect(() => {
    // Fetch the content when the component mounts or contentType changes
    const getContent = async () => {
      const data = await fetchContent(contentType);
      setContent(data);
    };

    getContent();
  }, [contentType]); // Fetch content whenever contentType changes

  const handleApprove = (id) => {
    const updatedContent = content.map(item =>
      item.id === id ? { ...item, status: 'approved' } : item
    );
    setContent(updatedContent);
  };

  const handleFlag = (id) => {
    const updatedContent = content.map(item =>
      item.id === id ? { ...item, status: 'flagged' } : item
    );
    setContent(updatedContent);
  };

  const handleDelete = (id) => {
    const updatedContent = content.filter(item => item.id !== id);
    setContent(updatedContent);
  };

  const handleContentTypeChange = (type) => {
    setContentType(type);
  };

  const openModal = (item) => {
    setSelectedContent(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedContent(null);
  };

  return (
    <div className="content-moderation">
      <h2>Content Moderation</h2>
      <p>Review, flag, or approve content submitted by users.</p>

      {/* Navbar for selecting content type */}
      <div className="navbar">
        <button onClick={() => handleContentTypeChange('posts')} className={`navbar-btn ${contentType === 'posts' ? 'active' : ''}`}>Posts</button>
        <button onClick={() => handleContentTypeChange('videos')} className={`navbar-btn ${contentType === 'videos' ? 'active' : ''}`}>Videos</button>
        <button onClick={() => handleContentTypeChange('audios')} className={`navbar-btn ${contentType === 'audios' ? 'active' : ''}`}>Audios</button>
      </div>

      <div className="content-list">
        {content.map(item => (
          <div key={item.id} className={`content-item ${item.status}`}>
            <p><strong>User:</strong> {item.user}</p>
            <p><strong>Content:</strong> {item.text}</p>
            <p><strong>Status:</strong> <span className={`status-${item.status}`}>{item.status}</span></p>

            {/* Display content type specific information */}
            {item.type === 'video' && (
              <div className="video-thumbnail" onClick={() => openModal(item)}>
                <img src={`https://img.youtube.com/vi/${item.videoUrl.split('=')[1]}/0.jpg`} alt="Video thumbnail" />
                <p>Click to view video</p>
              </div>
            )}
            {item.type === 'audio' && (
              <div className="audio-thumbnail" onClick={() => openModal(item)}>
                <p>{item.text}</p>
                <p>Click to listen</p>
              </div>
            )}
            {item.type === 'post' && (
              <p>{item.text}</p>
            )}

            <div className="actions">
              {item.status === 'pending' && (
                <>
                  <button onClick={() => handleApprove(item.id)} className="approve-btn">Approve</button>
                  <button onClick={() => handleFlag(item.id)} className="flag-btn">Flag</button>
                </>
              )}
              <button onClick={() => handleDelete(item.id)} className="delete-btn">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for displaying selected content */}
      {isModalOpen && selectedContent && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {selectedContent.type === 'video' && (
              <div className="video-container">
                <iframe width="560" height="315" src={selectedContent.videoUrl} title="Video player" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                <p><strong>Description:</strong> {selectedContent.text}</p>
              </div>
            )}
            {selectedContent.type === 'audio' && (
              <div className="audio-container">
                <audio controls>
                  <source src={selectedContent.audioUrl} type="audio/mp3" />
                  Your browser does not support the audio element.
                </audio>
                <p><strong>Description:</strong> {selectedContent.text}</p>
              </div>
            )}
            <button onClick={closeModal} className="close-btn">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentModeration;
