import commonRules from './rules.common'

const envs = {
  development: 'dev',
  production: 'prod'
}

/* eslint-disable global-require,import/no-dynamic-require */
const env = envs[process.env.NODE_ENV || 'development']
const envRules = require(`./rules.${env}`)
export default [...commonRules, ...envRules]
