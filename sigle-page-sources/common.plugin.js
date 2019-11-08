var CompressionWebpackPlugin = require('compression-webpack-plugin')
module.exports={
  prodPlugin : [
    new CompressionWebpackPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      include: new RegExp(// gz压缩,(后缀名前的一段命名为config.的过滤掉)
            `\.(${['js', 'css', 'ttf'].join('|')})$`
          ),
      threshold: 0,
      minRatio: 0.8
    })
  ],
  devPlugin:[]
}