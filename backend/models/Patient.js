// models/Patient.js
module.exports = (sequelize, DataTypes) => {
    const Patient = sequelize.define('Patient', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dob: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        gender: {
            type: DataTypes.ENUM('male', 'female', 'other'),
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    });

    // Thiết lập quan hệ (association)
    Patient.associate = (models) => {
        Patient.hasMany(models.Appointment, { foreignKey: 'patient_id', onDelete: 'CASCADE' });
        Patient.hasMany(models.LabRequest, { foreignKey: 'patient_id', onDelete: 'CASCADE' });
    };

    return Patient;
};
