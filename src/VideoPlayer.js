import React from 'react';
import { useParams, Link } from 'react-router-dom';

const VideoPlayer = ({ posts }) => {
  const { id } = useParams();
  const videoPost = posts.find(post => post.id === parseInt(id));

  if (!videoPost) {
    return <p>Video not found</p>;
  }

  return (
    <div className="video-player-container">
      <Link to="/">← Back to Home</Link>
      <div className="video-player">
        <video src={videoPost.videoUrl} controls autoPlay style={{ width: '100%' }} />
      </div>
      <h2>{videoPost.description}</h2>
      <p>{videoPost.likes} Likes | {videoPost.dislikes} Dislikes</p>
      {/* Additional actions like commenting can go here */}
    </div>
  );
};

export default VideoPlayer;
