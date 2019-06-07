import webpack from 'webpack'
import HTMLWebpackPlugin from 'html-webpack-plugin' // generates an index.html
import path from 'path'
import paths from './paths'
import rules from './rules'

module.exports = {
  entry: paths.entryPath,
  module: {
    rules
  },
  resolve: {
    extensions: ['.mjs', '.js', '.jsx'],
    // can import anything in shared folder with the same syntax as if it was in node modules
    // i.e import foo from 'bar'
    // bar being a component under src/shared
    modules: ['node_modules', path.join(__dirname, 'src'), 'shared'],
    alias: {
      // TEMPORARY -> more info in paths.js
      // '@ant-design/icons/lib/dist$': paths.antIconsPath
    }
  },

  plugins: [
    new webpack.ProgressPlugin(),
    new HTMLWebpackPlugin({
      template: paths.templatePath,
      filename: 'index.html',
      minify: {
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true,
        preserveLineBreaks: true,
        minifyURLs: true,
        // removeComments: true,
        removeAttributeQuotes: true
      }
    })
  ]
}
