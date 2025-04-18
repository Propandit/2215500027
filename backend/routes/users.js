const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get top users by post count
router.get('/top', async (req, res) => {
  try {
    const topUsers = await User.find()
      .sort({ postCount: -1 })
      .limit(5);
    
    res.json(topUsers);
  } catch (error) {
    console.error('Error fetching top users:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;