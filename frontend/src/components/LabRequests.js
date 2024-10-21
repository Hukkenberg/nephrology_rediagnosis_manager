// src/components/LabRequests.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';

export default function LabRequests() {
    const [labRequests, setLabRequests] = useState([]); // Danh sách yêu cầu xét nghiệm
    const [labInfo, setLabInfo] = useState(''); // Thông tin xét nghiệm nhập vào
    const token = localStorage.getItem('token'); // Lấy token từ localStorage

    // Gọi API để lấy danh sách yêu cầu xét nghiệm
    useEffect(() => {
        const fetchLabRequests = async () => {
            try {
                const response = await axios.get('/api/lab-requests', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setLabRequests(response.data); // Lưu danh sách vào state
            } catch (error) {
                console.error('Lỗi khi lấy yêu cầu xét nghiệm:', error);
                alert('Không thể tải danh sách yêu cầu xét nghiệm.');
            }
        };

        fetchLabRequests();
    }, [token]);

    // Cập nhật thông tin xét nghiệm và thay đổi trạng thái
    const handleUpdate = async (id) => {
        try {
            await axios.put(
                `/api/lab-requests/${id}`,
                { lab_info: labInfo },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert('Cập nhật thông tin xét nghiệm thành công!');
            setLabRequests((prev) => prev.filter((req) => req.id !== id)); // Loại bỏ yêu cầu đã xử lý
        } catch (error) {
            console.error('Lỗi khi cập nhật thông tin xét nghiệm:', error);
            alert('Có lỗi xảy ra khi cập nhật thông tin.');
        }
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Danh Sách Yêu Cầu Xét Nghiệm
            </Typography>
            {labRequests.length === 0 ? (
                <Typography align="center">Không có yêu cầu xét nghiệm đang chờ xử lý.</Typography>
            ) : (
                labRequests.map((request) => (
                    <Paper key={request.id} sx={{ padding: 2, marginBottom: 2 }}>
                        <Typography><strong>Bệnh nhân:</strong> {request.Patient.name}</Typography>
                        <Typography><strong>Ngày sinh:</strong> {request.Patient.dob}</Typography>
                        <Typography><strong>Ngày yêu cầu:</strong> {new Date(request.request_date).toLocaleDateString()}</Typography>

                        <TextField
                            label="Thông tin xét nghiệm"
                            value={labInfo}
                            onChange={(e) => setLabInfo(e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <Button
                            variant="contained"
                            onClick={() => handleUpdate(request.id)}
                            sx={{ marginTop: 1 }}
                        >
                            Xác nhận
                        </Button>
                    </Paper>
                ))
            )}
        </Box>
    );
}
