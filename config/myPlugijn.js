const fs = require('fs')

class WebpackAssetsPlugin {
  constructor(options) {
    this.options = options
  }

  apply(compiler) {
    //每当webpack开启一次新的编译 ，就会创建一个新的compilation
    compiler.hooks.compilation.tap('WebpackAssetsPlugin', (compilation) => {
      //每次根据chunk创建一个新的文件后会触发一次chunkAsset
      compilation.hooks.chunkAsset.tap('WebpackAssetsPlugin', (chunk, filename) => {
        fs.writeFileSync('./chuck.txt', JSON.stringify({ id: chunk.id, filename }))
      })
    })
  }
}

module.exports = WebpackAssetsPlugin
