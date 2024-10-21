// src/routes/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../components/Login';
import PatientTable from '../components/PatientTable';
import PatientDetails from '../components/PatientDetails';
import LabRequests from '../components/LabRequests';
import ManageAccounts from '../components/ManageAccounts';
import ProtectedRoute from '../components/ProtectedRoute';

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route element={<ProtectedRoute allowedRoles={['doctor']} />}>
                    <Route path="/patients" element={<PatientTable />} />
                    <Route path="/patient/:id" element={<PatientDetails />} />
                </Route>
                <Route element={<ProtectedRoute allowedRoles={['lab_staff']} />}>
                    <Route path="/lab-requests" element={<LabRequests />} />
                </Route>
                <Route element={<ProtectedRoute allowedRoles={['manager']} />}>
                    <Route path="/manage-accounts" element={<ManageAccounts />} />
                </Route>
            </Routes>
        </Router>
    );
}
