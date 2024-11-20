import React, { useState, useEffect } from 'react';
import './UserDashboard.css';
import Navbaruser from './Navbaruser';
import Sidebar from './Sidebar-adding';

function Post({ post }) {
  return (
    <div className="post">
      <img src={post.image} alt={post.title} className="post-image" />
      <div className="post-info">
        <h3 className="post-title">{post.title}</h3>
      </div>
    </div>
  );
}

function UserDashboard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setPosts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Navbaruser />
      <div className="dashboard-container">
        <Sidebar />
        <div className="UserDashboard">
          <div className="post-list">
            {posts.map((post) => (
              <Post key={post._id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default UserDashboard;
