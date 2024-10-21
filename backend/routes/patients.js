// routes/patients.js
const express = require('express');
const router = express.Router();
const {
    getAllPatients,
    getPatientById,
    createPatient,
    deletePatient,
} = require('../controllers/patientController');

// Các route cho bệnh nhân
router.get('/', getAllPatients);
router.get('/:id', getPatientById);
router.post('/', createPatient);
router.delete('/:id', deletePatient);

module.exports = router;
