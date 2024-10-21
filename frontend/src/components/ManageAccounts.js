// src/ManageAccounts.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography, Select, MenuItem } from '@mui/material';

export default function ManageAccounts() {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ username: '', password: '', role: 'patient' });

    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('/api/users', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUsers(response.data);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách tài khoản:', error);
            }
        };
        fetchUsers();
    }, [token]);

    const handleCreateUser = async () => {
        try {
            await axios.post('/api/users', newUser, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert('Tạo tài khoản thành công!');
        } catch (error) {
            console.error('Lỗi khi tạo tài khoản:', error);
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            await axios.delete(`/api/users/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUsers((prev) => prev.filter((user) => user.id !== userId));
            alert('Xóa tài khoản thành công!');
        } catch (error) {
            console.error('Lỗi khi xóa tài khoản:', error);
        }
    };

    return (
        <Box>
            <h1>Quản lý Tài khoản</h1>
            <Box mb={2}>
                <TextField
                    label="Tên đăng nhập"
                    value={newUser.username}
                    onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Mật khẩu"
                    type="password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    fullWidth
                    margin="normal"
                />
                <Select
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                    fullWidth
                >
                    <MenuItem value="patient">Bệnh nhân</MenuItem>
                    <MenuItem value="doctor">Bác sĩ</MenuItem>
                    <MenuItem value="lab_staff">Nhân viên xét nghiệm</MenuItem>
                    <MenuItem value="manager">Quản lý</MenuItem>
                </Select>
                <Button variant="contained" onClick={handleCreateUser}>
                    Tạo Tài khoản
                </Button>
            </Box>

            <h2>Danh sách Tài khoản</h2>
            {users.map((user) => (
                <Box key={user.id} mb={2} p={2} border="1px solid #ccc" borderRadius="8px">
                    <Typography><strong>Tên đăng nhập:</strong> {user.username}</Typography>
                    <Typography><strong>Vai trò:</strong> {user.role}</Typography>
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleDeleteUser(user.id)}
                    >
                        Xóa
                    </Button>
                </Box>
            ))}
        </Box>
    );
}
