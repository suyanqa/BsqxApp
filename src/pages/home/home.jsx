import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const Home = () => {

    return (
        <div className="home">
            <h1>导航区</h1>
            <div className="nav-list">
                <Link to="/home/category">类别管理</Link>
                <Link to="/home/brand">品牌管理</Link>
                <Link to="/home/product">商品管理</Link>
                <Link to="/home/purchase">采购入库</Link>
                <Link to="/home/sale">销售出库</Link>
                <Link to="/home/supplier">供应商管理</Link>
                <Link to="/home/customer">客户管理</Link>
                <Link to="/home/order">订单管理</Link>
                <Link to="/home/visual">数据分析</Link>
            </div>

        </div>
    );
};

export default Home;
