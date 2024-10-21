// controllers/appointmentController.js
const { Appointment, Patient, User } = require('../models');

// Lấy danh sách lịch khám của bệnh nhân
const getAppointmentsByPatient = async (req, res) => {
    try {
        const appointments = await Appointment.findAll({
            where: { patient_id: req.params.patientId },
            include: [{ model: User, as: 'doctor', attributes: ['username'] }],
        });
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy lịch khám.' });
    }
};

// Bác sĩ tạo lịch khám cho bệnh nhân
const createAppointment = async (req, res) => {
    try {
        const newAppointment = await Appointment.create(req.body);
        res.status(201).json(newAppointment);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi tạo lịch khám.' });
    }
};

// Bệnh nhân xác nhận lịch khám
const confirmAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findByPk(req.params.id);
        if (!appointment) return res.status(404).json({ message: 'Không tìm thấy lịch khám.' });

        await appointment.update({ status: 'confirmed' });
        res.json({ message: 'Lịch khám đã được xác nhận.' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi xác nhận lịch khám.' });
    }
};

// Xóa lịch khám
const deleteAppointment = async (req, res) => {
    try {
        await Appointment.destroy({ where: { id: req.params.id } });
        res.json({ message: 'Lịch khám đã được xóa' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi xóa lịch khám' });
    }
};

module.exports = {
    getAppointmentsByPatient,
    createAppointment,
    deleteAppointment,
    confirmAppointment,
};
