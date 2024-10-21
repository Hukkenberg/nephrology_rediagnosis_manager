// models/LabRequest.js
module.exports = (sequelize, DataTypes) => {
    const LabRequest = sequelize.define('LabRequest', {
        request_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        status: {
            type: DataTypes.ENUM('pending', 'completed'),
            defaultValue: 'pending',
        },
        lab_info: {
            type: DataTypes.TEXT,
            allowNull: true, // Chỉ cập nhật khi hoàn tất xét nghiệm
        },
    });

    // Thiết lập quan hệ (association)
    LabRequest.associate = (models) => {
        LabRequest.belongsTo(models.Patient, { foreignKey: 'patient_id', onDelete: 'CASCADE' });
        LabRequest.belongsTo(models.User, { foreignKey: 'doctor_id', onDelete: 'SET NULL' });
    };

    return LabRequest;
};
