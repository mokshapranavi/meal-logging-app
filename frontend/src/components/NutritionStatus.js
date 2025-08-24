import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BackButton from './BackButton';
const NutritionStatus = ({bmr}) => {
  const [nutrition, setNutrition] = useState(null);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Get the user ID from the token
  const getUserIdFromToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        
        const decodedToken = JSON.parse(jsonPayload);
        return decodedToken.id;
      } catch (err) {
        console.error('Error decoding token:', err);
        return null;
      }
    }
    return null;
  };

  useEffect(() => {
    fetchNutrition();
  }, [date]);

  const fetchNutrition = async () => {
    setLoading(true);
    setError('');
    setNutrition(null);
    
    try {
      const userId = getUserIdFromToken();
      if (!userId) {
        setError('User not authenticated');
        return;
      }
      
      const res = await axios.get(`/api/status/${userId}?date=${date}`);
      setNutrition(res.data.data.totalNutrition);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {bmr && (
        <div className="component-bmr-display">
          Your BMR: {bmr.toFixed(0)} calories/day
        </div>
      )}
    <div className="nutrition-status">
      <BackButton />
      <h2>Nutrition Status</h2>
      
      <div className="form-group">
        <label>Select Date</label>
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
      </div>
      
      {loading && <p>Loading nutrition data...</p>}
      {error && <div className="error-message">{error}</div>}
      
      {nutrition && (
        <div className="nutrition-stats">
          <div className="stat-card">
            <div className="stat-value">{nutrition.calories}</div>
            <div className="stat-label">Calories</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{nutrition.protein}g</div>
            <div className="stat-label">Protein</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{nutrition.carbs}g</div>
            <div className="stat-label">Carbs</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{nutrition.fiber}g</div>
            <div className="stat-label">Fiber</div>
          </div>
        </div>
      )}
    </div>
    
    </div>
  );
};

export default NutritionStatus;