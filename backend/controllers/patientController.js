// controllers/patientController.js
const { Patient } = require('../models');

// Lấy danh sách tất cả bệnh nhân
const getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.findAll();
        res.json(patients);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy danh sách bệnh nhân' });
    }
};

// Lấy thông tin chi tiết của một bệnh nhân
const getPatientById = async (req, res) => {
    try {
        const patient = await Patient.findByPk(req.params.id);
        if (!patient) return res.status(404).json({ message: 'Không tìm thấy bệnh nhân' });
        res.json(patient);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy thông tin bệnh nhân' });
    }
};

// Tạo mới một bệnh nhân
const createPatient = async (req, res) => {
    try {
        const newPatient = await Patient.create(req.body);
        res.status(201).json(newPatient);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi tạo bệnh nhân mới' });
    }
};

// Xóa một bệnh nhân
const deletePatient = async (req, res) => {
    try {
        await Patient.destroy({ where: { id: req.params.id } });
        res.json({ message: 'Bệnh nhân đã được xóa' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi xóa bệnh nhân' });
    }
};

module.exports = {
    getAllPatients,
    getPatientById,
    createPatient,
    deletePatient,
};