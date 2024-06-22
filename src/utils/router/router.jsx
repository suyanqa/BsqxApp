// src/router.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../../pages/login/login';
import Home from '../../pages/home/home';
import Product from '../../pages/home/product/product';
import NotFound from '../../components/404/notfound';
import PrivateRoute from './privateRouter/privateRouter';

const Router = () => (
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        {/** 一级路由/home,通过我们封装的privateRouter组件开启路由守卫,在未登录的情况下保护我们的其余路由
            必须登录后才可以进入其余子路由.
        */}
        <Route path="/home" element={
            <PrivateRoute>
            {/**  这里的home组件就是传递我们PrivateRoute组件的'children'组件 */}
                <Home />
            </PrivateRoute>
        } />
        <Route path="/home/product" element={
            <PrivateRoute>
                <Product />
            </PrivateRoute>
        } />
        
        <Route path="*" element={<NotFound />} />  {/* 配置404页面 */}
    </Routes>
);

export default Router;
