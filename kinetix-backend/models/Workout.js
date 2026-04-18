const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    exerciseName: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    formScore: {
        type: Number,
        default: 100 // Out of 100
    },
    duration: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Workout', workoutSchema);
