// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://www.syjzb.store:8080',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', // 将/api前缀移除
      },
    })
  );
};
