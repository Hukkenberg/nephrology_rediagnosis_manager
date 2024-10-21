// routes/appointments.js
const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRole } = require('../middleware/auth');
const {
    getAppointmentsByPatient,
    createAppointment,
    confirmAppointment,
} = require('../controllers/appointmentController');

// Bác sĩ tạo lịch khám
router.post('/', authenticateToken, authorizeRole('doctor'), createAppointment);

// Bệnh nhân xem lịch khám của mình
router.get('/:patientId', authenticateToken, getAppointmentsByPatient);

// Bệnh nhân xác nhận lịch khám
router.put('/confirm/:id', authenticateToken, confirmAppointment);

// Xóa lịch khám
router.delete('/:id', deleteAppointment);

// Lấy lịch sử khám của một bệnh nhân (cho tất cả người dùng)
router.get('/history/:patientId', authenticateToken, getPatientHistory);

module.exports = router;
