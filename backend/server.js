const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const mealRoutes = require('./routes/meals');
const webhookRoutes = require('./routes/webhook');
const profileRoutes = require('./routes/profile');
const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10kb' }));
// Add this after your middleware but before your routes
app.get('/', (req, res) => {
  res.send('Meal Logging API is running...');
});
// Routes
app.use('/api/auth', authRoutes);
app.use('/api', mealRoutes);
app.use('/api', webhookRoutes);
app.use('/api', profileRoutes);
// Database connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.log('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});