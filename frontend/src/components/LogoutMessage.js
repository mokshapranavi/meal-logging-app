import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
const LogoutMessage = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="form-container">
      <div className="success-message">
        <h2>Successfully Logged Out</h2>
        <p>You have been successfully logged out of your account.</p>
        <Link to="/login" className="login-link">
          Click here to login again
        </Link>
      </div>
    </div>
  );
};
export default LogoutMessage;
