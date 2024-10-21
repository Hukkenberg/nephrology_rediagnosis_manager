module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
        username: { type: DataTypes.STRING, unique: true },
        password_hash: DataTypes.STRING,
        role: DataTypes.ENUM('doctor', 'lab_staff', 'manager', 'patient'),
    });
};
