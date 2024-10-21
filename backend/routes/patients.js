// routes/patients.js
const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRole } = require('../middleware/auth');
const {
    getAllPatients, createPatient, updatePatient, deletePatient
} = require('../controllers/patientController');

// Chỉ nhân viên quản lý mới có quyền quản lý bệnh nhân
router.get('/', authenticateToken, authorizeRole('manager'), getAllPatients);
router.post('/', authenticateToken, authorizeRole('manager'), createPatient);
router.put('/:id', authenticateToken, authorizeRole('manager'), updatePatient);
router.delete('/:id', authenticateToken, authorizeRole('manager'), deletePatient);

module.exports = router;
