// frontend/src/components/BmrDisplay.js
import React from 'react';

const BmrDisplay = ({ bmr }) => {
  if (!bmr) return null;

  return (
    <div className="bmr-display">
      <span className="bmr-label">Your BMR: </span>
      <span className="bmr-value">{bmr.toFixed(0)} calories/day</span>
    </div>
  );
};

export default BmrDisplay;