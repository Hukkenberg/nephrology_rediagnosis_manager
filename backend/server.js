// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./models');
const authRoutes = require('./routes/auth');
const patientRoutes = require('./routes/patients');
const labRequestRoutes = require('./routes/labRequests');
const appointmentRoutes = require('./routes/appointments');
const userRoutes = require('./routes/users');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/lab-requests', labRequestRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/users', userRoutes);

db.sequelize.sync().then(() => {
    app.listen(process.env.PORT || 3001, () => {
        console.log('Server is running on port 3001');
    });
});
