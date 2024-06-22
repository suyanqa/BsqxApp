import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../api/services/api';
import Cookies from 'js-cookie'; // 导入 js-cookie 库
import './login.css';

const Login = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [modal, setModal] = useState('');

    const handleUserChange = (e) => {
        setUser(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await login(user, password);
            const { data } = response;
            const { token } = data;

            const isLoginSuccess = !!token; // 使用 !! 来判断 token 的真值
            setModal(isLoginSuccess ? 'success' : 'failure');

            if (isLoginSuccess) {
                // 将 token 存储到 cookie 中，有效期设置为 1 小时
                Cookies.set('token', token, { expires: 1 / 24 }); // 1 小时过期

                setTimeout(() => {
                    setModal('');
                    navigate('/home');
                }, 1000);
            } else {
                setTimeout(() => {
                    setModal('');
                }, 1000);
            }
        } catch (error) {
            console.error('登录失败:', error);
            setModal('failure');

            setTimeout(() => {
                setModal('');
            }, 1000);
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

            {modal && (
                <div className={`modal ${modal}`}>
                <p>{modal === 'success' ? '登录成功，正在跳转...' : '登录失败，请稍后重试。'}</p>
                </div>
            )}
        </div>
    );
};

export default Login;
