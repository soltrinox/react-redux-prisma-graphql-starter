module.exports = [
  {
    test: /\.(js|jsx)$/,
    use: [
      'cache-loader',
      {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        }
      }
    ],
    exclude: /node_modules/
  },
  {
    test: /\.(css|less)$/,
    use: [
      'style-loader',
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
          plugins: () => [require('postcss-normalize')({forceImport: true})]
        }
      },
      'cache-loader',
      {
        loader: 'less-loader',
        options: {
          sourceMap: true,
          javascriptEnabled: true
        }
      }
    ]
  }
]
