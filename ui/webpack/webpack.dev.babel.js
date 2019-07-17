import paths from './paths'

module.exports = {
  mode: 'development',
  output: {
    path: paths.outputPath,
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: '/'
  },
  // performance: {
  //   hints: 'warning',
  //   maxAssetSize: 450000,
  //   maxEntrypointSize: 8500000,
  //   assetFilter: assetFilename => {
  //     return assetFilename.endsWith('.css') || assetFilename.endsWith('.js')
  //   }
  // },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  devServer: {
    port: 8000,
    historyApiFallback: true,
    // Enable gzip compression of generated files.
    compress: true,
    clientLogLevel: 'error'
  },
  devtool: 'cheap-eval-source-map',
  plugins: []
}
