// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute({ allowedRoles }) {
    const role = localStorage.getItem('role');
    return allowedRoles.includes(role) ? <Outlet /> : <Navigate to="/login" />;
}
