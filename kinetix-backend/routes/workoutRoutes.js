const express = require('express');
const router = express.Router();
const { saveWorkout, getUserWorkouts } = require('../controllers/workoutController');

// Mapping routes to controller logic
router.post('/save', saveWorkout);
router.get('/:userId', getUserWorkouts);

module.exports = router;
