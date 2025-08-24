import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = ({bmr}) => {
  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      {bmr && (
        <div className="bmr-summary">
          <h3>Your Metabolic Profile</h3>
          <p>Your Basal Metabolic Rate (BMR) is calculated based on your profile information:</p>
          <div className="bmr-value-large">
            {bmr.toFixed(0)} calories/day
          </div>
          <p>This is the number of calories your body needs at rest to maintain basic physiological functions.</p>
        </div>
      )}
      <div className="dashboard-nav">
        <div className="dashboard-card">
          <h3>Log Meal</h3>
          <p>Record what you've eaten</p>
          <Link to="/log-meal" className="dashboard-link">Go to Meal Log</Link>
        </div>
        
        <div className="dashboard-card">
          <h3>Meal History</h3>
          <p>View your past meals</p>
          <Link to="/meal-history" className="dashboard-link">View History</Link>
        </div>
        
        <div className="dashboard-card">
          <h3>Nutrition Status</h3>
          <p>Check your nutrition intake</p>
          <Link to="/nutrition-status" className="dashboard-link">View Status</Link>
        </div>
        
        <div className="dashboard-card">
          <h3>Webhook Simulator</h3>
          <p>Test message-based logging</p>
          <Link to="/webhook-simulator" className="dashboard-link">Try Simulator</Link>
        </div>
        <div className="dashboard-card">
  <h3>Profile</h3>
  <p>Manage your account settings</p>
  <Link to="/profile" className="dashboard-link">Update Profile</Link>
</div>
      </div>
    </div>
  );
};

export default Dashboard;