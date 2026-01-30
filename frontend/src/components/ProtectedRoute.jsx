import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const auth = localStorage.getItem('auth'); // Simple Basic Auth token storage
    return auth ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;
