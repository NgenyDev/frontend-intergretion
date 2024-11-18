import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateAccount.css'; // Add styles for the page

const CreateAccount = () => {
  const navigate = useNavigate();

  return (
    <div className="create-account-container">
      <h2>Contact Admin</h2>
      <p>
        To create an account, please contact your domain administrator. They will provide
        you with the necessary credentials to access the system.
      </p>
      <ul>
        <li>Ensure you have a valid organizational email address.</li>
        <li>Provide your full name and department details to the admin.</li>
        <li>Follow the instructions provided by the admin to complete registration.</li>
      </ul>
      <button onClick={() => navigate('/')}>Back to Login</button>
    </div>
  );
};

export default CreateAccount;
