const path = require('path')

const _env_to_dir = {
  ashare: 'ashare',

}


let _baseUrl = 'demo'
let _env_config = String(process.env.env_config || 'ashare').trim()
let _dirName = _env_to_dir[_env_config]

const dynConfig = require(`./${_dirName}/vue.config.js`)//根据环境变量动态引入相应配置

module.exports = {
  outputDir: path.resolve(__dirname, '../', `./${_baseUrl}/${_dirName}/`),
  baseUrl: `/${_baseUrl}/${_dirName}/`,
  ...dynConfig,
}