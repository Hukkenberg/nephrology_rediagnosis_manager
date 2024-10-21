// controllers/authController.js
const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ where: { username } });
        if (!user) return res.status(401).json({ message: 'Sai tên đăng nhập hoặc mật khẩu' });

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) return res.status(401).json({ message: 'Sai tên đăng nhập hoặc mật khẩu' });

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });

        res.json({ token, role: user.role });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi đăng nhập' });
    }
};

module.exports = { login };
