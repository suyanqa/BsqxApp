// src/components/layout/Layout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import './layout.css';

const Layout = () => {
    return (
        <>
            {/* 头部 */}
            <div className='header'>
                {/* 网页Logo */}
                <img alt="Logo" src="/images/Logo.jpg" />
                <div className="header-content">
                    <h1>博速汽修</h1>
                    <p>&nbsp;&nbsp;专业汽车维修服务</p>
                </div>
            </div>
            {/* 内容区 */}
            <div className='content'>
                <Outlet />
            </div>
            {/* 页脚 */}
            <div className='footer'></div>
        </>
    );
}

export default Layout;
