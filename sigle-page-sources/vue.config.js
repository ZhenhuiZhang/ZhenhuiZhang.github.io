const path = require('path')
const env = require('./env.js')

const dynConfig = require(`./${env['dirName']}/vue.config.js`)//根据环境变量动态引入相应配置

module.exports = {
  outputDir: path.resolve(__dirname, '../', `./${env['baseUrl']}/${env['dirName']}/`),
  publicPath: `/${env['baseUrl']}/${env['dirName']}/`,
  productionSourceMap: false,
  ...dynConfig,
}