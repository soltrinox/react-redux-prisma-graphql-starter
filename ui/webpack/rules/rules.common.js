import paths from '../paths'

module.exports = [
  {
    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'file-loader',
        options: {
          outputPath: paths.fontsFolder
        }
      }
    ]
  },
  {
    test: /\.(woff|woff2)$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 5000,
          prefix: 'font',
          outputPath: paths.fontsFolder
        }
      }
    ]
  },
  {
    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/octet-stream',
          outputPath: paths.fontsFolder
        }
      }
    ]
  },
  {
    test: /\.(jpe?g|png|gif|svg)$/i,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 10000,
          name(file) {
            if (process.env.NODE_ENV === 'development') {
              return '[path][name].[ext]'
            }

            return `${paths.imagesFolder}/[name].[hash].[ext]`
          }
        }
      },
      'img-loader'
    ]
  }
]
