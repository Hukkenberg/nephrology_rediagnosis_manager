// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
    const role = localStorage.getItem('role');

    return (
        <nav>
            <Link to="/patients">Danh Sách Bệnh Nhân</Link>
            {role === 'manager' && <Link to="/manage-accounts">Quản Lý Tài Khoản</Link>}
            {role === 'lab_staff' && <Link to="/lab-requests">Yêu Cầu Xét Nghiệm</Link>}
            <button onClick={() => localStorage.clear()}>Đăng Xuất</button>
        </nav>
    );
}
