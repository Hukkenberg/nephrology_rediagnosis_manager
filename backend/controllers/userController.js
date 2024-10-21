// controllers/userController.js
const { User } = require('../models');
const bcrypt = require('bcryptjs');

// Lấy danh sách người dùng
const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({ attributes: ['id', 'username', 'role'] });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy danh sách người dùng' });
    }
};

// Tạo tài khoản mới
const createUser = async (req, res) => {
    const { username, password, role } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, password_hash: hashedPassword, role });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi tạo tài khoản' });
    }
};

// Xóa tài khoản
const deleteUser = async (req, res) => {
    try {
        await User.destroy({ where: { id: req.params.id } });
        res.json({ message: 'Tài khoản đã được xóa' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi xóa tài khoản' });
    }
};

module.exports = {
    getAllUsers,
    createUser,
    deleteUser,
};
