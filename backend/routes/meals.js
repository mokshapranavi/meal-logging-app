const express = require('express');
const Meal = require('../models/Meal');
const auth = require('../middleware/auth');
const mongoose = require('mongoose');
const router = express.Router();
router.use(auth);
router.post('/log_meals', async (req, res) => {
  try {
    const { mealType, foodItems } = req.body;
    const userId = req.user.id;
    const meal = await Meal.create({
      userId,
      mealType,
      foodItems
    });
    res.status(201).json({
      status: 'success',
      data: {
        meal
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
});
router.get('/meals', async (req, res) => {
  try {
    const { date, userId } = req.query;
    const query = {};
    if (userId) query.userId = userId;
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 1);
      query.loggedAt = {
        $gte: startDate,
        $lt: endDate
      };
    }
    const meals = await Meal.find(query).populate('userId', 'name');
    res.status(200).json({
      status: 'success',
      results: meals.length,
      data: {
        meals
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
});
router.get('/status/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { date } = req.query;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        status: 'fail',
        message: 'Invalid user ID format'
      });
    }
    const startDate = new Date(date);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 1);
    const meals = await Meal.find({
      userId,
      loggedAt: {
        $gte: startDate,
        $lt: endDate
      }
    });
    const totalNutrition = meals.reduce((acc, meal) => {
      acc.calories += meal.nutrition.calories;
      acc.protein += meal.nutrition.protein;
      acc.carbs += meal.nutrition.carbs;
      acc.fiber += meal.nutrition.fiber;
      return acc;
    }, { calories: 0, protein: 0, carbs: 0, fiber: 0 });
    res.status(200).json({
      status: 'success',
      data: {
        totalNutrition
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
});
module.exports = router;
