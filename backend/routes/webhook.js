const express = require('express');
const Meal = require('../models/Meal');
const auth = require('../middleware/auth');
const router = express.Router();
router.post('/webhook', auth, async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.user.id;
    const regex = /log\s+(\w+):\s*(.+)/i;
    const match = message.match(regex);
    if (!match) {
      return res.status(400).json({
        status: 'fail',
        message: 'Invalid message format. Use: "log [mealType]: [foodItem1], [foodItem2]"'
      });
    }
    const mealType = match[1].toLowerCase();
    const foodItems = match[2].split(',').map(item => item.trim());
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
module.exports = router;
