// routes/users.js
const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRole } = require('../middleware/auth');
const { getAllUsers, createUser, deleteUser } = require('../controllers/userController');

// Chỉ nhân viên quản lý mới được phép truy cập
router.get('/', authenticateToken, authorizeRole('manager'), getAllUsers);
router.post('/', authenticateToken, authorizeRole('manager'), createUser);
router.delete('/:id', authenticateToken, authorizeRole('manager'), deleteUser);

module.exports = router;
