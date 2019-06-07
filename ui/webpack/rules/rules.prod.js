import CleanCSSPlugin from 'less-plugin-clean-css'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

module.exports = [
  {
    test: /\.(js|jsx)$/,
    loader: 'babel-loader',
    exclude: /node_modules/
  },
  {
    test: /\.(css|less)$/,
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {sourceMap: true}
      },
      // postcss-loader needs to be before less|sass loaders
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
          ident: 'postcss',
          plugins: [
            require('autoprefixer'),
            require('postcss-normalize')({forceImport: true})
          ]
        }
      },
      {
        loader: 'less-loader',
        options: {
          sourceMap: true,
          javascriptEnabled: true,
          plugins: [new CleanCSSPlugin({advanced: true})]
        }
      }
    ]
  }
]
