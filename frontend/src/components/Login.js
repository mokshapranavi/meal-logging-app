import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const Login = ({ login, showLogoutMessage = false }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [logoutMessage, setLogoutMessage] = useState(showLogoutMessage);
  useEffect(() => {
    if (showLogoutMessage) {
      setLogoutMessage(true);
      // Clear the message after 3 seconds
      const timer = setTimeout(() => {
        setLogoutMessage(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showLogoutMessage]);
  const { email, password } = formData;
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setLogoutMessage(false);
    try {
      const res = await axios.post('/api/auth/login', formData);
      login(res.data.token);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="form-container">
      {logoutMessage && (
        <div className="success-message">
          <h2>Successfully Logged Out</h2>
          <p>You have been successfully logged out of your account.</p>
        </div>
      )}
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};
export default Login;
