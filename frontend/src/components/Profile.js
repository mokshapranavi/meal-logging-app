// frontend/src/components/Profile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BackButton from './BackButton';

const Profile = ({bmr}) => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dateOfBirth: '',
    gender: 'male',
    height: '',
    weight: ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const res = await axios.get('/api/profile');
      const userData = res.data.data.user;
      setUser(userData);
      
      // Format date for input field (YYYY-MM-DD)
      const dob = userData.dateOfBirth ? new Date(userData.dateOfBirth).toISOString().split('T')[0] : '';
      
      setFormData({
        name: userData.name || '',
        email: userData.email || '',
        dateOfBirth: dob,
        gender: userData.gender || 'male',
        height: userData.height || '',
        weight: userData.weight || ''
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch profile');
    }
  };

  const handleInputChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordChange = e => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const handleProfileUpdate = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const res = await axios.patch('/api/profile', formData);
      setMessage('Profile updated successfully!');
      setUser(res.data.data.user);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('New passwords do not match');
      setLoading(false);
      return;
    }

    try {
      await axios.patch('/api/change-password', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      
      setMessage('Password updated successfully!');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  const calculateAge = () => {
    if (!formData.dateOfBirth) return '--';
    
    const today = new Date();
    const birthDate = new Date(formData.dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };
  const calculateBMR = () => {
  const { gender, weight, height } = formData;
  const age = calculateAge();
  
  if (gender && weight && height && age) {
    if (gender.toLowerCase() === 'male') {
      return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
      return 447.593 + (9.247 * weight) + (3.098 * height) - (4.33 * age);
    }
  }
  return null;
};
  return (
    <div>
      {bmr && (
        <div className="component-bmr-display">
          Your BMR: {bmr.toFixed(0)} calories/day
        </div>
      )}
    <div className="profile-container">
      <BackButton />
      
      <h2>Profile Management</h2>
      
      <div className="profile-tabs">
        <button 
          className={activeTab === 'profile' ? 'active' : ''}
          onClick={() => setActiveTab('profile')}
        >
          Profile Info
        </button>
        <button 
          className={activeTab === 'password' ? 'active' : ''}
          onClick={() => setActiveTab('password')}
        >
          Change Password
        </button>
      </div>
      
      {message && <div className="success-message">{message}</div>}
      {error && <div className="error-message">{error}</div>}
      
      {activeTab === 'profile' && (
        <form onSubmit={handleProfileUpdate} className="profile-form">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              required
            />
            <div className="age-display">Age: {calculateAge()} years</div>
          </div>
          
          <div className="form-group">
            <label>Gender</label>
            <select name="gender" value={formData.gender} onChange={handleInputChange} required>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Height (cm)</label>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleInputChange}
              required
              min="1"
            />
          </div>
          
          <div className="form-group">
            <label>Weight (kg)</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleInputChange}
              required
              min="1"
              step="0.1"
            />
          </div>
          <div className="form-group">
  <label>Estimated BMR</label>
  <div className="bmr-display-profile">
    {calculateBMR() ? `${calculateBMR().toFixed(0)} calories/day` : 'Complete your profile to calculate BMR'}
  </div>
  <p className="bmr-explanation">
    Basal Metabolic Rate (BMR) is the number of calories your body needs to perform basic life-sustaining functions.
  </p>
</div>
          <button type="submit" disabled={loading}>
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
      )}
      
      {activeTab === 'password' && (
        <form onSubmit={handlePasswordUpdate} className="password-form">
          <div className="form-group">
            <label>Current Password</label>
            <input
              type="password"
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              required
              minLength="6"
            />
          </div>
          
          <div className="form-group">
            <label>Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              required
              minLength="6"
            />
          </div>
          
          <button type="submit" disabled={loading}>
            {loading ? 'Updating...' : 'Change Password'}
          </button>
        </form>
      )}
    </div>
    
    </div>
  );
};

export default Profile;