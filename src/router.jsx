// src/router.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/login/login';
import Home from './pages/home/home';

const Router = () => (
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        {/* 注册其他路由 */}
    </Routes>
);

export default Router;
