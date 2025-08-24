import React, { useState } from 'react';
import axios from 'axios';
import BackButton from './BackButton';
const MealLog = ({bmr}) => {
  const [formData, setFormData] = useState({
    mealType: 'breakfast',
    foodItems: ['']
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { mealType, foodItems } = formData;

  const onChange = e => {
    if (e.target.name === 'mealType') {
      setFormData({ ...formData, mealType: e.target.value });
    }
  };

  const onFoodItemChange = (index, value) => {
    const newFoodItems = [...foodItems];
    newFoodItems[index] = value;
    setFormData({ ...formData, foodItems: newFoodItems });
  };

  const addFoodItem = () => {
    setFormData({ ...formData, foodItems: [...foodItems, ''] });
  };

  const removeFoodItem = (index) => {
    const newFoodItems = foodItems.filter((_, i) => i !== index);
    setFormData({ ...formData, foodItems: newFoodItems });
  };

  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    
    try {
      // Filter out empty food items
      const nonEmptyFoodItems = foodItems.filter(item => item.trim() !== '');
      
      if (nonEmptyFoodItems.length === 0) {
        setError('Please add at least one food item');
        return;
      }
      
      const res = await axios.post('/api/log_meals', {
        mealType,
        foodItems: nonEmptyFoodItems
      });
      
      setMessage('Meal logged successfully!');
      setFormData({ mealType: 'breakfast', foodItems: [''] });
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>{bmr && (
        <div className="component-bmr-display">
          Your BMR: {bmr.toFixed(0)} calories/day
        </div>
      )}
    <div className="meal-form">
      <BackButton />
      <h2>Log a Meal</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Meal Type</label>
          <select name="mealType" value={mealType} onChange={onChange} required>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="snack">Snack</option>
          </select>
        </div>
        
        <div className="food-items">
          <label>Food Items</label>
          {foodItems.map((item, index) => (
            <div key={index} className="food-item">
              <input
                type="text"
                value={item}
                onChange={e => onFoodItemChange(index, e.target.value)}
                placeholder="Enter food item"
              />
              {foodItems.length > 1 && (
                <button 
                  type="button" 
                  className="remove-btn"
                  onClick={() => removeFoodItem(index)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={addFoodItem}>
            Add Another Food Item
          </button>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        {message && <div className="success-message">{message}</div>}
        
        <button type="submit" disabled={loading}>
          {loading ? 'Logging Meal...' : 'Log Meal'}
        </button>
      </form>
    </div>
    </div>
  );
};

export default MealLog;