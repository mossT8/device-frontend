const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8081,
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
        onProxyReq: function(proxyReq, req) {
          if (req.headers.cookie) {
            const tokenMatch = req.headers.cookie.match(/auth-token=([^;]+)/);
            const token = tokenMatch ? tokenMatch[1] : null;
            if (token) {
              proxyReq.setHeader('Authorization', `Bearer ${token}`);
            }
          }
        },
      },
    },
  },
});
