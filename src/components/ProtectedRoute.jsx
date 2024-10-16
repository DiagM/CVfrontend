import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token'); // Assuming you store your JWT in localStorage after login

    // If no token, redirect to login page
    if (!token) {
        return <Navigate to="/login" />;
    }

    // Otherwise, render the protected route
    return children;
};

export default ProtectedRoute;
