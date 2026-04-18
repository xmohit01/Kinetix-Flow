const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    exerciseType: { type: String, required: true },
    reps: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Workout', workoutSchema);
