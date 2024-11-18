// Wishlist.js
import React, { useState, useEffect } from 'react';
import './Wishlist.css';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    // Fetch wishlist items from the backend or localStorage
    const fetchWishlist = async () => {
      try {
        // Fetch wishlist data from an API (or use localStorage as fallback)
        const response = await fetch('http://localhost:5000/wishlist');
        if (!response.ok) {
          throw new Error('Failed to fetch wishlist items');
        }
        const data = await response.json();
        setWishlistItems(data);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };

    fetchWishlist();
  }, []);

  return (
    <div className="wishlist-container">
      <h2>Your Wishlist</h2>
      {wishlistItems.length > 0 ? (
        <ul>
          {wishlistItems.map((item) => (
            <li key={item.id}>
              <img src={item.image} alt={item.name} />
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <button>Remove from Wishlist</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Your wishlist is empty.</p>
      )}
    </div>
  );
};

export default Wishlist;
