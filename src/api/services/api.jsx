import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // 这里配置了基本路径
});

// 添加一个方法来设置 Authorization 头部
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// 示例请求方法
export const fetchUserData = () => {
  return api.get('/');
};

export const login = (user,password) => {
  return api.post('/user/login',{
    user,
    password
  },{
    headers:{
      "X-Forwarded-For":" "
    }
  })
}


