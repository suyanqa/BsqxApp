// src/components/layout/Layout.js
import React from 'react';
import'./layout.css';

const Layout = ({ children }) => {
    return (
        <div className='layout'>
            {/* 头部 */}
            <div className='header'>
                {/* 网页Logo */}
                <img alt="Logo" src="/images/Logo.jpg"></img>
                <div className="header-content">
                    <h1>博速汽修</h1>
                    <p>&nbsp;&nbsp;专业汽车维修服务</p>
                </div>
            </div>
            {/* 内容区 */}
            <div className='content'>
                {children}
            </div>
            {/* 页脚 */}
            <div className='footer'>
                {/* 页脚内容 */}
            </div>
        </div>
    );
}

export default Layout;
