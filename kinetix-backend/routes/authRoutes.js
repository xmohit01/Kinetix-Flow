const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

// Mapping POST requests to controller logic
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
