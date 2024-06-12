import React from 'react';
import { Link } from 'react-router-dom';
import {} from '../../api/services/api';
import './index.css';

const Home = () => {

    return (
        <div className="home">
            <h1>导航区</h1>
            <div className="nav-list">
                <Link to="/category">类别管理</Link>
                <Link to="/brand">品牌管理</Link>
                <Link to="/product">商品管理</Link>
                <Link to="/purchase">采购入库</Link>
                <Link to="/sale">销售出库</Link>
                <Link to="/supplier">供应商管理</Link>
                <Link to="/customer">客户管理</Link>
                <Link to="/order">订单管理</Link>
                <Link to="/visual">数据分析</Link>
            </div>

        </div>
    );
};

export default Home;
