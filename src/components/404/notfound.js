import React from 'react';
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    // 按下按钮后返回home路由
    const handleBackHome = () => {
        navigate('/home');
    };

    return (
        <Result
            status="404"
            title="404"
            subTitle="对不起，您访问的页面不存在。"
            extra={<Button type="primary" onClick={handleBackHome}>返回首页</Button>}
        />
    );
}

export default NotFound;
