const path = require('path')

module.exports = {
  root: path.resolve(__dirname, '../'),
  outputPath: path.resolve(__dirname, '../', 'dist'),
  entryPath: path.resolve(__dirname, '../', 'src/index'),
  templatePath: path.resolve(__dirname, '../', 'src/index.html'),
  imagesFolder: 'images',
  fontsFolder: 'fonts',
  cssFolder: 'css',
  jsFolder: 'js'
  // TEMPORARY UNTIL THIS IS FIXED
  // issue https://github.com/ant-design/ant-design/issues/12011
  // official pull request https://github.com/ant-design/ant-design/pull/12888
  // antIconsPath: path.resolve(__dirname, '../', 'src/ant-icons.js')
}
