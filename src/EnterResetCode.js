import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EnterResetCode.css';

const EnterResetCode = () => {
  const [resetCode, setResetCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const handleResetCodeSubmit = () => {
    if (resetCode.length !== 6 || isNaN(resetCode)) {
      setError('Please enter a valid 6-digit reset code.');
      return;
    }

    setLoading(true);
    // Here we can simulate the reset code verification process
    setTimeout(() => {
      setLoading(false);
      navigate('/reset-password-success'); // Redirect to success page
    }, 2000);
  };

  return (
    <div className="reset-code-container">
      <div className="reset-code-form">
        <h2>Enter Reset Code</h2>
        <p>A reset code has been sent to your email. Please enter the 6-digit code below.</p>

        <div className="input-group">
          <label>Reset Code</label>
          <input
            type="text"
            maxLength="6"
            value={resetCode}
            onChange={(e) => setResetCode(e.target.value)}
            placeholder="Enter 6-digit code"
          />
        </div>

        {/* Display error message */}
        {error && <p className="error-message">{error}</p>}

        <button className="reset-code-button" onClick={handleResetCodeSubmit} disabled={loading}>
          {loading ? <div className="spinner"></div> : 'Verify Code'}
        </button>
      </div>
    </div>
  );
};

export default EnterResetCode;
