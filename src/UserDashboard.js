// import React, { useState, useEffect } from 'react';
// import './UserDashboard.css';
// import Navbaruser from './Navbaruser';
// import { FaThumbsUp, FaThumbsDown, FaBookmark } from 'react-icons/fa';

// function Post({ image, title, likeCount, dislikeCount, isBookmarked }) {
//   return (
//     <div className="post">
//       <img src={image} alt={title} className="post-image" />
//       <div className="post-info">
//         <h3 className="post-title">{title}</h3>
//         <div className="post-actions">
//           <button className="like-btn">
//             <FaThumbsUp size={18} />
//             <span>{likeCount}</span>
//           </button>
//           <button className="dislike-btn">
//             <FaThumbsDown size={18} />
//             <span>{dislikeCount}</span>
//           </button>
//           <button className={`bookmark-btn ${isBookmarked ? 'bookmarked' : ''}`}>
//             <FaBookmark size={18} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// function UserDashboard() {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     // Fetch the data from the JSON server
//     fetch('http://localhost:5000/posts')
//       .then(response => response.json())
//       .then(data => setPosts(data))
//       .catch(error => console.error('Error fetching data:', error));
//   }, []);

//   return (
//     <>
//       <Navbaruser />
//       <div className="UserDashboard">
//         <div className="post-list">
//           {posts.map((post, index) => (
//             <Post
//               key={index}
//               image={post.image}
//               title={post.title}
//               likeCount={post.likeCount}
//               dislikeCount={post.dislikeCount}
//               isBookmarked={post.isBookmarked}
//             />
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }

// export default UserDashboard;

import React, { useState, useEffect } from 'react';
import './UserDashboard.css';
import Navbaruser from './Navbaruser';
import Sidebar from './Sidebar-adding'; // Import Sidebar component
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
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch the data from the JSON server
    fetch('http://localhost:5000/posts')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <>
      <Navbaruser />
      <div className="dashboard-container">
        <Sidebar /> {/* Include Sidebar component */}
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
      </div>
    </>
  );
}

export default UserDashboard;
