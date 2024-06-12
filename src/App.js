// src/App.js
import React from 'react';
import './App.css';
import Router from './router'; // 引入路由配置
import Layout from './components/layout/layout';

function App() {
    return (
        <div className="App">
            <Layout>
                <Router />
            </Layout>
        </div>
    );
}

export default App;
