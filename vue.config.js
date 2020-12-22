const Config = require('./util/config.js')

module.exports = {
  devServer: {
    proxy: {
      '/yifang-read-api': {
        target: Config['baseUrl'],
        pathRewrite: {
          '^/yifang-read-api': ''
        }
      }
    },
  }
}