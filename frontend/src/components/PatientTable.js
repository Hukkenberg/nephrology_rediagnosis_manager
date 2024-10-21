// src/components/PatientTable.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function PatientTable() {
    const [patients, setPatients] = useState([]); // Danh sách bệnh nhân
    const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu
    const [error, setError] = useState(null); // Lưu thông báo lỗi (nếu có)
    const token = localStorage.getItem('token'); // Lấy token từ localStorage
    const role = localStorage.getItem('role'); // Lấy vai trò người dùng
    const navigate = useNavigate();

    // Kiểm tra quyền truy cập ngay khi component được render
    useEffect(() => {
        if (!token || role !== 'doctor') {
            alert('Bạn không có quyền truy cập. Vui lòng đăng nhập với tài khoản bác sĩ.');
            navigate('/login'); // Điều hướng về trang đăng nhập nếu không đủ quyền
        }
    }, [token, role, navigate]);

    // Lấy danh sách bệnh nhân từ API
    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axios.get('/api/patients', {
                    headers: { Authorization: `Bearer ${token}` }, // Gửi token trong header
                });
                setPatients(response.data); // Lưu danh sách bệnh nhân vào state
            } catch (error) {
                console.error('Lỗi khi lấy danh sách bệnh nhân:', error);
                setError('Không thể tải danh sách bệnh nhân.'); // Lưu thông báo lỗi
            } finally {
                setLoading(false); // Kết thúc trạng thái tải
            }
        };

        if (token && role === 'doctor') {
            fetchPatients(); // Gọi API nếu người dùng có quyền
        }
    }, [token, role]);

    // Điều hướng đến trang chi tiết bệnh nhân khi click vào hàng
    const handleRowClick = (id) => {
        navigate(`/patient/${id}`); // Điều hướng đến trang chi tiết bệnh nhân
    };

    // Hiển thị trạng thái tải hoặc lỗi
    if (loading) return <Typography align="center">Đang tải danh sách bệnh nhân...</Typography>;
    if (error) return <Typography align="center" color="error">{error}</Typography>;

    return (
        <TableContainer component={Paper}>
            <Typography variant="h4" align="center" gutterBottom>
                Danh Sách Bệnh Nhân
            </Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Tên</TableCell>
                        <TableCell>Ngày Sinh</TableCell>
                        <TableCell>Giới Tính</TableCell>
                        <TableCell>Điện Thoại</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {patients.map((patient) => (
                        <TableRow
                            key={patient.id}
                            onClick={() => handleRowClick(patient.id)}
                            style={{ cursor: 'pointer' }}
                        >
                            <TableCell>{patient.name}</TableCell>
                            <TableCell>{patient.dob}</TableCell>
                            <TableCell>{patient.gender}</TableCell>
                            <TableCell>{patient.phone}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
