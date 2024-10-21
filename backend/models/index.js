// models/index.js
const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

// Khởi tạo các model
const User = require('./User')(sequelize, DataTypes);
const Patient = require('./Patient')(sequelize, DataTypes);
const LabRequest = require('./LabRequest')(sequelize, DataTypes);
const Appointment = require('./Appointment')(sequelize, DataTypes);

// Thiết lập quan hệ giữa các model
Patient.associate({ Appointment, LabRequest });
LabRequest.associate({ Patient, User });
Appointment.associate({ Patient, User });

module.exports = { sequelize, User, Patient, LabRequest, Appointment };
