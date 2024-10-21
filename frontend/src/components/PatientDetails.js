// src/PatientDetails.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Tabs, Tab, Box, Typography, Button, TextField } from '@mui/material';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div role="tabpanel" hidden={value !== index} {...other}>
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

export default function PatientDetails() {
    const { id } = useParams(); // Lấy ID bệnh nhân từ URL
    const navigate = useNavigate();
    const [patient, setPatient] = useState(null);
    const [value, setValue] = useState(0); // Tab đang mở
    const [isEditing, setIsEditing] = useState(false); // Trạng thái chỉnh sửa
    const [editableData, setEditableData] = useState({}); // Dữ liệu có thể chỉnh sửa
    const [filter, setFilter] = useState(''); // Bộ lọc lịch sử khám

    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');

    useEffect(() => {
        const fetchPatientDetails = async () => {
            try {
                const response = await axios.get(`/api/patients/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setPatient(response.data);
                setEditableData(response.data); // Sao chép dữ liệu vào editableData
            } catch (error) {
                console.error('Lỗi khi lấy thông tin bệnh nhân:', error);
            }
        };
        fetchPatientDetails();
    }, [id, token]);

    const handleTabChange = (event, newValue) => setValue(newValue);

    const handleEditClick = () => setIsEditing(true); // Bắt đầu chỉnh sửa

    const handleCancelClick = () => {
        setIsEditing(false); // Hủy chỉnh sửa
        setEditableData(patient); // Khôi phục dữ liệu gốc
    };

    const handleUpdateClick = async () => {
        try {
            await axios.put(`/api/patients/${id}`, editableData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setPatient(editableData); // Cập nhật dữ liệu hiển thị
            setIsEditing(false); // Thoát chế độ chỉnh sửa
            alert('Cập nhật thành công!');
        } catch (error) {
            console.error('Lỗi khi cập nhật thông tin:', error);
        }
    };

    const handleInputChange = (field, value) => {
        setEditableData((prev) => ({ ...prev, [field]: value }));
    };

    const filteredHistory = patient?.history?.filter((item) =>
        item.result.toLowerCase().includes(filter.toLowerCase())
    );

    if (!patient) return <p>Đang tải thông tin...</p>;

    return (
        <Box sx={{ width: '100%' }}>
            {/* Thanh Tabs */}
            <Tabs value={value} onChange={handleTabChange} centered>
                <Tab label="Thông tin cá nhân" />
                <Tab label="Thông tin lâm sàng" />
                <Tab label="Lịch sử khám" />
            </Tabs>

            {/* Nội dung từng tab */}
            <TabPanel value={value} index={0}>
                <h2>Thông tin cá nhân</h2>
                <TextField
                    label="Tên"
                    value={editableData.name || ''}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    disabled={!isEditing}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Ngày sinh"
                    value={editableData.dob || ''}
                    onChange={(e) => handleInputChange('dob', e.target.value)}
                    disabled={!isEditing}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Giới tính"
                    value={editableData.gender || ''}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    disabled={!isEditing}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Điện thoại"
                    value={editableData.phone || ''}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    disabled={!isEditing}
                    fullWidth
                    margin="normal"
                />

                {userRole === 'doctor' && (
                    <Box mt={2}>
                        {!isEditing ? (
                            <Button variant="contained" onClick={handleEditClick}>
                                Chỉnh sửa
                            </Button>
                        ) : (
                            <>
                                <Button
                                    variant="contained"
                                    onClick={handleUpdateClick}
                                    sx={{ mr: 2 }}
                                >
                                    Cập nhật
                                </Button>
                                <Button variant="outlined" onClick={handleCancelClick}>
                                    Hủy bỏ
                                </Button>
                            </>
                        )}
                    </Box>
                )}
            </TabPanel>

            <TabPanel value={value} index={1}>
                <h2>Thông tin lâm sàng</h2>
                <p>{patient.clinical_info}</p>
            </TabPanel>

            <TabPanel value={value} index={2}>
                <h2>Lịch sử khám</h2>
                <TextField
                    label="Lọc kết quả"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                {filteredHistory?.map((item, index) => (
                    <Box key={index} mb={2}>
                        <p><strong>Ngày:</strong> {item.date}</p>
                        <p><strong>Kết quả:</strong> {item.result}</p>
                    </Box>
                ))}
            </TabPanel>
        </Box>
    );
}
