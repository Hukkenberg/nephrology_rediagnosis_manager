// controllers/appointmentController.js
const { Appointment, Patient, User } = require('../models');

// Lấy danh sách tất cả các lịch khám
const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.findAll({
            include: [
                { model: Patient, attributes: ['name'] },
                { model: User, attributes: ['username'] },
            ],
        });
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy danh sách lịch khám' });
    }
};

// Tạo lịch khám mới
const createAppointment = async (req, res) => {
    try {
        const newAppointment = await Appointment.create(req.body);
        res.status(201).json(newAppointment);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi tạo lịch khám mới' });
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
    getAllAppointments,
    createAppointment,
    deleteAppointment,
};
