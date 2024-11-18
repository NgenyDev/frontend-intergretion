import React, { useState, useEffect } from 'react';
import './Subscriptions.css';

const Subscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock subscriptions data for development
  const mockSubscriptions = [
    { id: 1, name: 'Premium Plan', description: 'Access to all premium features', price: 15 },
    { id: 2, name: 'Basic Plan', description: 'Limited access', price: 5 },
    { id: 3, name: 'Free Plan', description: 'Free access with ads', price: 0 }
  ];

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        // Attempt to fetch data from the API
        const response = await fetch('http://localhost:5000/subscriptions');
        
        if (!response.ok) {
          throw new Error('Failed to fetch subscriptions');
        }

        const data = await response.json();
        setSubscriptions(data);
      } catch (err) {
        // Fallback to mock data if fetch fails
        setSubscriptions(mockSubscriptions);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, []);

  const handleUnsubscribe = async (id) => {
    try {
      // Optionally, send DELETE request to remove the subscription
      const response = await fetch(`http://localhost:5000/subscriptions/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Update the subscription state by toggling the unsubscribed status
        setSubscriptions(subscriptions.map((subscription) =>
          subscription.id === id
            ? { ...subscription, unsubscribed: true } // Mark as unsubscribed
            : subscription
        ));
      } else {
        console.error('Failed to unsubscribe');
      }
    } catch (err) {
      console.error('Error unsubscribing:', err);
    }
  };

  const handleSubscribe = (id) => {
    // Revert to the original state or send a POST request to resubscribe
    setSubscriptions(subscriptions.map((subscription) =>
      subscription.id === id
        ? { ...subscription, unsubscribed: false } // Mark as subscribed
        : subscription
    ));
  };

  const handleRemove = async (id) => {
    try {
      // Send request to remove the subscription permanently
      const response = await fetch(`http://localhost:5000/subscriptions/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove subscription from state completely
        setSubscriptions(subscriptions.filter((subscription) => subscription.id !== id));
      } else {
        console.error('Failed to remove subscription');
      }
    } catch (err) {
      console.error('Error removing subscription:', err);
    }
  };

  return (
    <div className="subscriptions-container">
      <h2>Your Subscriptions</h2>
      {loading && <p>Loading subscriptions...</p>}
      {subscriptions.length > 0 ? (
        <ul>
          {subscriptions.map((subscription) => (
            <li key={subscription.id} className="subscription-item">
              <h3>{subscription.name}</h3>
              <p>{subscription.description}</p>
              <p>Price: ${subscription.price}</p>
              {!subscription.unsubscribed ? (
                <button
                  className="unsubscribe-btn"
                  onClick={() => handleUnsubscribe(subscription.id)}
                >
                  Unsubscribe
                </button>
              ) : (
                <>
                  <button
                    className="subscribe-btn"
                    onClick={() => handleSubscribe(subscription.id)}
                  >
                    Subscribe Again
                  </button>
                  <button
                    className="remove-btn"
                    onClick={() => handleRemove(subscription.id)}
                  >
                    Remove
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No subscriptions found.</p>
      )}
    </div>
  );
};

export default Subscriptions;
