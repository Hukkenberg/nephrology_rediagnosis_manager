// routes/labRequests.js
const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRole } = require('../middleware/auth');
const { getAllLabRequests, updateLabRequest } = require('../controllers/labRequestController');

// Lấy danh sách yêu cầu xét nghiệm (Chỉ nhân viên xét nghiệm)
router.get('/', authenticateToken, authorizeRole('lab_staff'), getAllLabRequests);

// Cập nhật kết quả xét nghiệm (Chỉ nhân viên xét nghiệm)
router.put('/:id', authenticateToken, authorizeRole('lab_staff'), updateLabRequest);

module.exports = router;
