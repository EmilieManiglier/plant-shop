const { createProxyMiddleware } = require('http-proxy-middleware');

/*
 * This file is used to configure the proxy for the development server
 * The proxy is used to redirect requests to the backend server and to prevent CORS errors
 */
module.exports = function (app) {
  app.use(
    /\/(admin|users|rails-assets|letter_opener|api-docs|rails|api|sidekiq)/,
    createProxyMiddleware({
      /* target port must match the API port */
      target: 'http://localhost:3000',
      changeOrigin: false,
      secure: false
    })
  );
};
