const commonPlugin = require('../common.plugin')


const path = require('path')
let _dirName = __dirname.split(path.sep).pop()

module.exports = {
  // baseUrl: `/${_baseUrl}/${_dirName}/`,
  pages: {
    [_dirName]: {
      entry: `./${_dirName}/main.js`,
      template: `./${_dirName}/index.html`,
      filename: `index.html`,
    }
  },
  configureWebpack: config => {
    // console.log(config)
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      return {
        plugins: [
          ...commonPlugin.prodPlugin
        ]
      }
    } else {
      // 为开发环境修改配置...
    }
  }
}