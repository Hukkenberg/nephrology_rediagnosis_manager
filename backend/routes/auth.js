// routes/auth.js
const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authController');

// API đăng nhập
router.post('/login', login);

module.exports = router;
