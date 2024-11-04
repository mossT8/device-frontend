const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8081,
    proxy: {
      "/api": {
        target: "http://localhost:8080", // Replace with your API server URL
        changeOrigin: true,
        secure: false,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
        onProxyRes: function (proxyRes) {
          proxyRes.headers["Access-Control-Allow-Origin"] = "*";
        },
      },
    },
  },
});
