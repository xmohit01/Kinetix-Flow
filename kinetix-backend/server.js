const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Essential for parsing JSON bodies

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Connected to MongoDB (MVC)'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Route Imports
const authRoutes = require('./routes/authRoutes');
const workoutRoutes = require('./routes/workoutRoutes');

// Root Route
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Kinetix API is live and healthy! 🚀' });
});

// API Routes Mapping
app.use('/api/auth', authRoutes);
app.use('/api/workouts', workoutRoutes);

// Server Error Handling (Catch-all)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
