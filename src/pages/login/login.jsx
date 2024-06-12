import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PubSub from 'pubsub-js';
import { login } from '../../api/services/api';
import './login.css';

const Login = () => {
    const navigate = useNavigate(); // 获取navigate函数

    // 通过钩子函数设置状态
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [loginState, setLoginState] = useState({
        isLoggedIn: false,
        message: ''
    });
    const [modal, setModal] = useState(''); // 初始为空字符串

    /* 获取用户输入的账号函数 */
    const handleUserChange = (e) => {
        setUser(e.target.value);
    };
    /* 获取用户输入密码函数 */
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    /* 点击按钮后执行的函数 */
    const handleSubmit = async (e) => {
        e.preventDefault(); // 阻止表单默认提交

        try {
            // 调用登录函数发送登录请求
            const response = await login(user, password);
            // 请求到的响应写入data变量
            let data = response.data;
            console.log(data);

            // 判断登录是否成功
            const isLoginSuccess = data.token !== null && data.token !== '';

            // 将token存储到状态中
            setToken(data.token);
            setLoginState({
                isLoggedIn: isLoginSuccess,
                message: data.message
            });

            // 设置modal状态，表示成功或失败
            setModal(isLoginSuccess ? 'success' : 'failure');

            // 通过pubsub-js发布消息，消息名为token
            PubSub.publish('token', token);

            // 设置定时器，在3秒后隐藏提示消息并进行重定向
            setTimeout(() => {
                setModal(''); // 隐藏拟态框
                setLoginState({
                    isLoggedIn: false,
                    message: ''
                });

                if (isLoginSuccess) {
                    navigate('/home'); // 登录成功后重定向到仪表盘页面
                }
            }, 3000);
        } catch (error) {
            console.error('登录失败:', error);
            // 设置modal状态为失败
            setModal('failure');
            setLoginState({
                isLoggedIn: false,
                message: '登录失败，请稍后重试。'
            });

            // 设置定时器，在3秒后隐藏提示消息
            setTimeout(() => {
                setModal(''); // 隐藏拟态框
                setLoginState({
                    isLoggedIn: false,
                    message: ''
                });
            }, 3000);
        }
    };

    return (
        <div className='login'>
            <h2>欢迎使用本系统</h2>
            <form onSubmit={handleSubmit}>
                <div className='user'>
                    <label><span>账号:</span>
                        <input name='user' value={user} onChange={handleUserChange} />
                    </label>
                </div>
                <div className='pwd'>
                    <label><span>密码:</span>
                        <input type='password' name='password' value={password} onChange={handlePasswordChange} />
                    </label>
                </div>
                <button type='submit'>登录</button>
                <div className='forgotPassword'>
                    <Link to="/forgotPassword">忘记密码</Link>
                </div>
            </form>

            {/* 拟态框 */}
            {modal && (
                <div className={`modal ${modal}`}>
                    <p>{loginState.message}</p>
                </div>
            )}
        </div>
    );
};

export default Login;
