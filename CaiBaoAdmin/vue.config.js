module.exports = {
  devServer: {
    disableHostCheck: true,
    proxy: { // 配置跨域
      '/api': {
        target: 'http://106.14.205.124:83/',
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
