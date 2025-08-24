const mongoose = require('mongoose');

const foodDb = {
  "Jeera Rice": { calories: 250, protein: 5, carbs: 45, fiber: 2 },
  "Dal": { calories: 180, protein: 12, carbs: 20, fiber: 5 },
  "Cucumber": { calories: 16, protein: 1, carbs: 4, fiber: 1 },
  "Chapati": { calories: 120, protein: 4, carbs: 20, fiber: 2 },
  "Chicken Curry": { calories: 350, protein: 30, carbs: 10, fiber: 2 },
  "Salad": { calories: 50, protein: 2, carbs: 8, fiber: 3 }
};

const nutritionSchema = new mongoose.Schema({
  calories: Number,
  protein: Number,
  carbs: Number,
  fiber: Number
});

const mealSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  mealType: {
    type: String,
    required: true,
    enum: ['breakfast', 'lunch', 'dinner', 'snack']
  },
  foodItems: [{
    type: String,
    required: true
  }],
  nutrition: nutritionSchema,
  loggedAt: {
    type: Date,
    default: Date.now
  }
});

mealSchema.pre('save', function(next) {
  // Calculate nutrition based on foodItems
  this.nutrition = this.foodItems.reduce((acc, item) => {
    const foodData = foodDb[item] || { calories: 0, protein: 0, carbs: 0, fiber: 0 };
    acc.calories += foodData.calories;
    acc.protein += foodData.protein;
    acc.carbs += foodData.carbs;
    acc.fiber += foodData.fiber;
    return acc;
  }, { calories: 0, protein: 0, carbs: 0, fiber: 0 });
  
  next();
});

module.exports = mongoose.model('Meal', mealSchema);