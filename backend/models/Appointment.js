// models/Appointment.js
module.exports = (sequelize, DataTypes) => {
    const Appointment = sequelize.define('Appointment', {
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        notes: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    });

    // Thiết lập quan hệ (association)
    Appointment.associate = (models) => {
        Appointment.belongsTo(models.Patient, { foreignKey: 'patient_id', onDelete: 'CASCADE' });
        Appointment.belongsTo(models.User, { foreignKey: 'doctor_id', onDelete: 'SET NULL' });
    };

    return Appointment;
};
