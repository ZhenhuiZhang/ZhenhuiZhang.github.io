const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const env = require('./env')
let commonPlugin = new CopyWebpackPlugin([
  {
    from: path.resolve(__dirname, `${env['dirName']}`, './static'),
    to: './static'
  }
])
module.exports = {
  prod: {
    plugins: [
      new CompressionWebpackPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        include: new RegExp(// gz压缩,(后缀名前的一段命名为config.的过滤掉)
          `\.(${['js', 'css', 'ttf'].join('|')})$`
        ),
        threshold: 0,
        minRatio: 0.8
      }),
      commonPlugin
    ]
  },
  dev: {
    plugins: [commonPlugin]
  }
}