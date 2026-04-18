const Workout = require('../models/Workout');

// @desc    Save a new workout session
// @route   POST /api/workouts/save
const saveWorkout = async (req, res) => {
    try {
        const { userId, exerciseName, reps, formScore, duration } = req.body;

        if (!userId || !exerciseName) {
            return res.status(400).json({ error: 'Incomplete workout data' });
        }

        const workout = new Workout({
            userId,
            exerciseName,
            reps,
            formScore,
            duration
        });

        const savedWorkout = await workout.save();
        res.status(201).json(savedWorkout);
    } catch (err) {
        res.status(500).json({ error: 'Failed to save workout', message: err.message });
    }
};

// @desc    Get all workouts for a specific user
// @route   GET /api/workouts/:userId
const getUserWorkouts = async (req, res) => {
    try {
        const { userId } = req.params;
        const workouts = await Workout.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json(workouts);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve workouts', message: err.message });
    }
};

module.exports = { saveWorkout, getUserWorkouts };
