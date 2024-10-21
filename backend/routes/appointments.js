// routes/appointments.js
const express = require('express');
const router = express.Router();
const {
    getAllAppointments,
    createAppointment,
    deleteAppointment,
} = require('../controllers/appointmentController');

// Các route cho lịch khám
router.get('/', getAllAppointments);
router.post('/', createAppointment);
router.delete('/:id', deleteAppointment);

module.exports = router;
