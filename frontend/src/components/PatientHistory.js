// src/components/PatientHistory.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Paper } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { useParams } from 'react-router-dom';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

export default function PatientHistory() {
    const { patientId } = useParams();
    const [appointments, setAppointments] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchPatientHistory = async () => {
            try {
                const response = await axios.get(`/api/appointments/history/${patientId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setAppointments(response.data);
            } catch (error) {
                console.error('Lỗi khi lấy lịch sử khám:', error);
            }
        };

        fetchPatientHistory();
    }, [patientId, token]);

    // Dữ liệu cho biểu đồ
    const chartData = {
        labels: appointments.map((appt) => appt.date),
        datasets: [
            {
                label: 'Lịch sử khám',
                data: appointments.map((_, index) => index + 1),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
            },
        ],
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Lịch Sử Khám Bệnh Nhân
            </Typography>

            <Line data={chartData} />

            {appointments.map((appointment) => (
                <Paper key={appointment.id} sx={{ padding: 2, marginTop: 2 }}>
                    <Typography>Ngày: {appointment.date}</Typography>
                    <Typography>Bác sĩ: {appointment.doctor.username}</Typography>
                    <Typography>Ghi chú: {appointment.notes}</Typography>
                </Paper>
            ))}
        </Box>
    );
}
