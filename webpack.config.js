const { merge } = require('webpack-merge')
const commonConfig = require('./config/webpack.common.js')

module.exports = (envVars) => {
  const { env } = envVars
  console.info(`Environment: ${env}`)
  console.info(`Config file: ./config/webpack.${env}.js`)
  const envConfig = require(`./config/webpack.${env}.js`)
  const config = merge(commonConfig, envConfig)
  return config
}
