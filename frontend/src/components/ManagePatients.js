// src/components/ManagePatients.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';

export default function ManagePatients() {
    const [patients, setPatients] = useState([]);
    const [newPatient, setNewPatient] = useState({ name: '', dob: '', gender: '', phone: '' });
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axios.get('/api/patients', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setPatients(response.data);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách bệnh nhân:', error);
            }
        };
        fetchPatients();
    }, [token]);

    const handleCreatePatient = async () => {
        try {
            await axios.post('/api/patients', newPatient, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert('Tạo bệnh nhân thành công!');
        } catch (error) {
            console.error('Lỗi khi tạo bệnh nhân:', error);
        }
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Quản Lý Bệnh Nhân
            </Typography>

            <Paper sx={{ padding: 2, marginBottom: 3 }}>
                <TextField
                    label="Tên"
                    value={newPatient.name}
                    onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                    fullWidth
                    margin="normal"
                />
                <Button variant="contained" onClick={handleCreatePatient} sx={{ marginTop: 2 }}>
                    Tạo Bệnh Nhân
                </Button>
            </Paper>

            {patients.map((patient) => (
                <Paper key={patient.id} sx={{ padding: 2, marginBottom: 2 }}>
                    <Typography>{patient.name}</Typography>
                </Paper>
            ))}
        </Box>
    );
}
