const commonPlugin = require('../common.plugin')

const path = require('path')
let _dirName = __dirname.split(path.sep).pop()
const resolve = dir => {
  return path.join(__dirname, dir)
}
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
      return commonPlugin.prod
    } else {
      return commonPlugin.dev
      // 为开发环境修改配置...
    }
  },
  chainWebpack: config => {
    // phaser load方法Local data URIs are not supported...
    const rules = [
      { name: 'images', dir: 'img' },
      { name: 'media', dir: 'media' }
    ]
    rules.forEach(rule => {
      const ruleConf = config.module.rule(rule.name)

      ruleConf.uses.clear()

      ruleConf
        .use('file-loader')
        .loader('file-loader')
        .options({
          name: `${rule.dir}/[name].[hash:8].[ext]`
        })
    })

    config.resolve.alias
      .set('@', resolve('./')) // key,value自行定义，比如.set('@@', resolve('src/components'))
  }
}