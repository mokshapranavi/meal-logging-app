import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BackButton from './BackButton';
const MealHistory = ({bmr}) => {
  const [meals, setMeals] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    fetchMeals();
  }, [date]);
  const fetchMeals = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(`/api/meals?date=${date}`);
      setMeals(res.data.data.meals);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  return (
    <div>
      {bmr && (
        <div className="component-bmr-display">
          Your BMR: {bmr.toFixed(0)} calories/day
        </div>
      )}
    <div className="meal-history">
      <BackButton />
      <h2>Meal History</h2>
      <div className="form-group">
        <label>Select Date</label>
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
      </div>
      {loading && <p>Loading meals...</p>}
      {error && <div className="error-message">{error}</div>}
      <div className="meal-list">
        {meals.length === 0 && !loading ? (
          <p>No meals found for this date.</p>
        ) : (
          meals.map(meal => (
            <div key={meal._id} className="meal-card">
              <h3>{meal.mealType.charAt(0).toUpperCase() + meal.mealType.slice(1)}</h3>
              <p><strong>Food Items:</strong> {meal.foodItems.join(', ')}</p>
              <p><strong>Nutrition:</strong> {meal.nutrition.calories} calories, {meal.nutrition.protein}g protein, {meal.nutrition.carbs}g carbs, {meal.nutrition.fiber}g fiber</p>
              <p><strong>Logged at:</strong> {formatDate(meal.loggedAt)}</p>
            </div>
          ))
        )}
      </div>
    </div>
    </div>
  );
};
export default MealHistory;
