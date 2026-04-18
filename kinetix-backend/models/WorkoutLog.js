const mongoose = require('mongoose');

const workoutLogSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    exerciseName: { type: String, required: true },
    reps: { type: Number, required: true },
    duration: { type: String, required: true },
    dateCompleted: { type: Date, default: Date.now }
});

module.exports = mongoose.model('WorkoutLog', workoutLogSchema);
