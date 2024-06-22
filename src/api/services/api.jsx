import Cookies from 'js-cookie';
import axios from 'axios';
import md5 from 'md5';

const api = axios.create({
  baseURL: '/api',
});

// 设置请求拦截器,将登录信息存入cooked
api.interceptors.request.use(
  config => {
    const token = Cookies.get('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    // 添加时间戳
    const timestamp = new Date().getTime();
    config.headers['X-Request-Timestamp'] = timestamp;

    // 计算请求签名,未处理后续会添加签名认证
    const requestData = JSON.stringify(config.data); // 根据请求数据计算签名，这里假设请求数据是 JSON 格式
    const signature = md5(`${timestamp}${requestData}`); // 使用 md5 算法生成签名
    config.headers['X-Request-Signature'] = signature;

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 设置 Authorization 头部和存储到 Cookie 的函数
export const setAuthToken = (token) => {
  if (token) {
    Cookies.set('token', token, { expires: 1 }); // 将 token 存储在 Cookie 中，有效期为1天
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    Cookies.remove('token'); // 移除 Cookie 中的 token
    delete api.defaults.headers.common['Authorization'];
  }
};

// 示例请求方法
export const fetchUserData = () => {
  return api.get('/');
};

/* 用户管理接口 */
// 登录
export const login = (user, password) => {
  return api.post('/user/login', {
    user,
    password
  });
};

// 忘记密码
export const userRecover = (user,email,newPassword) => {
  return api.post('/user/recover',{
    user,email,newPassword
  })
}

/* 类别管理接口 */
// 添加类别
export const categoryAdd = (category_Id,name) => {
  return api.post("/category/add",{
  })
}

// 删除类别
export const categoryDelete = (category_Id,name) => {
  return api.delete("/category/delete",{
  })
}

// 查询类别
export const categorySearch = (category_Id,name) => {
  return api.get('category/search',{
    category_Id,name
  })
}

// 查询所有类别
export const getCategory = () => {
  return api.get('/category/all');
};


/* 品牌管理 */
// 添加品牌
export const brandAdd = (name,remarks) => {
  return api.post('/brand/add')
}

// 查询品牌
export const brandSearch = (keyWord) => {
  return api.get(`/brand/search?keyWord=${keyWord}`)
}

// 查询所有品牌
export const brandAll = () => {
  return api.get('/brand/all')
}

// 获取所有商品
export const getProducts = () => {
  return api.get('/product/all');
};

// 更新商品
export const updateProduct = (productData) => {
  const {
    productId,
    imageUrl,
    name,
    categoryId,
    brandId,
    dateAdded,
    specifications,
    quantity,
    stock,
    purchasePrice,
    salePrice,
    remarks
  } = productData;

  return api.post('/product/update', {
    productId,
    imageUrl,
    name,
    categoryId,
    brandId,
    dateAdded,
    specifications,
    quantity,
    stock,
    purchasePrice,
    salePrice,
    remarks
  }).then(response => {
    return response.data; // 可以根据需要返回处理后的数据或者状态
  }).catch(error => {
    throw error; // 可以选择抛出错误，由调用方处理
  });
};

// 删除商品
export const deleteProduct = async (productId) => {
  try {
      const response = await api.delete(`/product/delete`, {
          params: { productId }
      });
      return response.data;
  } catch (error) {
      console.error('删除产品请求失败:', error);
      throw error;
  }
};


// 添加商品
export const addProduct = async (productData) => {
  try {
    const response = await api.post('/product/add', productData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

