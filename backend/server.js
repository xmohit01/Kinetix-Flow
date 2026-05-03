const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();

// Security Middleware: Set HTTP headers
app.use(helmet());

// Security Middleware: Global Rate Limiting
const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    message: 'Too many requests from this IP, please try again after 15 minutes',
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(globalLimiter);

// Middleware
app.use(cors());
// Security: Limit JSON body size to prevent payload exhaustion attacks
app.use(express.json({ limit: '10kb' }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/workouts', require('./routes/workouts'));

// Startup Security Checks
if (!process.env.JWT_SECRET || process.env.JWT_SECRET === 'your_super_secret_jwt_key_here') {
    console.error('FATAL ERROR: JWT_SECRET is not defined or is using the default placeholder.');
    process.exit(1);
}
if (!process.env.MONGO_URI) {
    console.error('FATAL ERROR: MONGO_URI is not defined.');
    process.exit(1);
}

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => {
        console.error('MongoDB Connection Error:', err);
        process.exit(1);
    });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
