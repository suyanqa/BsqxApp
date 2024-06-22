import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    console.log(document.cookie);
    // 检查是否有存储的 token
    const isLoggedIn = document.cookie.split('; ').some(cookie => cookie.startsWith('token='));
    
    return isLoggedIn ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
