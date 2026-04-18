const express = require('express');
const router = express.Router();
const Workout = require('../models/Workout');

// POST /api/workouts/save
router.post('/save', async (req, res) => {
    try {
        const { userId, exerciseType, reps } = req.body;
        const workout = new Workout({ userId, exerciseType, reps });
        await workout.save();
        res.status(201).json({ message: 'Workout saved successfully', workout });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /api/workouts/history/:userId
router.get('/history/:userId', async (req, res) => {
    try {
        const workouts = await Workout.find({ userId: req.params.userId }).sort({ date: -1 });
        res.json(workouts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
