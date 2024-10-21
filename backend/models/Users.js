const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        username: { type: DataTypes.STRING, unique: true },
        password_hash: DataTypes.STRING,
        role: DataTypes.ENUM('doctor', 'lab_staff', 'manager', 'patient'),
    });

    // Hàm băm mật khẩu trước khi lưu
    User.beforeCreate(async (user) => {
        user.password_hash = await bcrypt.hash(user.password_hash, 10);
    });

    return User;
};
