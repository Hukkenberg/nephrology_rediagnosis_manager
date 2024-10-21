// src/components/DoctorAppointments.js
import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';

export default function DoctorAppointments() {
    const [appointment, setAppointment] = useState({ patient_id: '', date: '', notes: '' });
    const token = localStorage.getItem('token');

    const handleCreateAppointment = async () => {
        try {
            await axios.post('/api/appointments', appointment, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert('Lịch khám đã được tạo!');
            setAppointment({ patient_id: '', date: '', notes: '' });
        } catch (error) {
            console.error('Lỗi khi tạo lịch khám:', error);
        }
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Tạo Lịch Khám
            </Typography>

            <Paper sx={{ padding: 2 }}>
                <TextField
                    label="ID Bệnh Nhân"
                    value={appointment.patient_id}
                    onChange={(e) => setAppointment({ ...appointment, patient_id: e.target.value })}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Ngày Khám"
                    type="date"
                    value={appointment.date}
                    onChange={(e) => setAppointment({ ...appointment, date: e.target.value })}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    label="Ghi Chú"
                    value={appointment.notes}
                    onChange={(e) => setAppointment({ ...appointment, notes: e.target.value })}
                    fullWidth
                    margin="normal"
                />
                <Button variant="contained" onClick={handleCreateAppointment} sx={{ marginTop: 2 }}>
                    Tạo Lịch Khám
                </Button>
            </Paper>
        </Box>
    );
}
