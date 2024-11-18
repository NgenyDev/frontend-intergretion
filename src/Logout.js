import React from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory to navigate programmatically

const Logout = () => {
  const history = useHistory();

  const handleLogout = () => {
    // Add logout logic here, such as clearing user data or tokens
    localStorage.removeItem('user');
    history.push('/login'); // Redirect to the login page after logout
  };

  return (
    <div>
      <h1>Logout</h1>
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
};

export default Logout;
