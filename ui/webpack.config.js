require('@babel/register')
const webpackMerge = require('webpack-merge')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')

const common = require('./webpack/webpack.base.babel')

const smp = new SpeedMeasurePlugin()

const envs = {
  development: 'dev',
  production: 'prod'
}

/* eslint-disable global-require,import/no-dynamic-require */
const env = envs[process.env.NODE_ENV || 'development']
const envConfig = require(`./webpack/webpack.${env}.babel`)
module.exports = smp.wrap(webpackMerge(common, envConfig))
