import React, { useState, useEffect } from 'react';
import './UserDashboard.css';
import Navbaruser from './Navbaruser';
import { FaThumbsUp, FaThumbsDown, FaBookmark } from 'react-icons/fa';

function Post({ image, title, likeCount, dislikeCount, isBookmarked }) {
  return (
    <div className="post">
      <img src={image} alt={title} className="post-image" />
      <div className="post-info">
        <h3 className="post-title">{title}</h3>
        <div className="post-actions">
          <button className="like-btn">
            <FaThumbsUp size={18} />
            <span>{likeCount}</span>
          </button>
          <button className="dislike-btn">
            <FaThumbsDown size={18} />
            <span>{dislikeCount}</span>
          </button>
          <button className={`bookmark-btn ${isBookmarked ? 'bookmarked' : ''}`}>
            <FaBookmark size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

function UserDashboard() {
  const [posts, setPosts] = useState([
    {
      image: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
      title: 'Peaceful Retreat',
      likeCount: 67,
      dislikeCount: 12,
      isBookmarked: true,
    },
    {
      image: 'https://cdn.pixabay.com/photo/2015/07/09/22/45/tree-838667__480.jpg',
      title: 'Autumn Wonder',
      likeCount: 83,
      dislikeCount: 5,
      isBookmarked: false,
    },
    {
      image: 'https://cdn.pixabay.com/photo/2015/06/19/21/24/avenue-815297__480.jpg',
      title: 'City Stroll',
      likeCount: 42,
      dislikeCount: 18,
      isBookmarked: true,
    },
    {
      image: 'https://cdn.pixabay.com/photo/2016/11/29/05/45/astronomy-1867616__480.jpg',
      title: 'Starry Night',
      likeCount: 120,
      dislikeCount: 3,
      isBookmarked: true,
    },

    {
      image: 'https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823__480.jpg',
      title: 'Winding Road',
      likeCount: 78,
      dislikeCount: 9,
      isBookmarked: false,
    },
    {
      image: 'https://img.freepik.com/free-photo/multi-colored-psychedelic-background_23-2148805290.jpg?t=st=1731414796~exp=1731418396~hmac=1dc9e2daadcc02cfa6e38abdc2f015349d3a5609f4ad27af46693a8f8d909944&w=740',
      title: 'Focused Work',
      likeCount: 52,
      dislikeCount: 14,
      isBookmarked: true,
    },
  ]);

  return (
    <>
      <Navbaruser />
      <div className="UserDashboard">
        <div className="post-list">
          {posts.map((post, index) => (
            <Post
              key={index}
              image={post.image}
              title={post.title}
              likeCount={post.likeCount}
              dislikeCount={post.dislikeCount}
              isBookmarked={post.isBookmarked}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default UserDashboard;