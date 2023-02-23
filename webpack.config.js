const { merge } = require('webpack-merge')
const commonConfig = require('./config/webpack.common.js')

module.exports = (envVars) => {
  const { env } = envVars
  console.log(`Environment: ${env}`)
  console.log(`Config file: ./config/webpack.${env}.js`)
  const envConfig = require(`./config/webpack.${env}.js`)
  const config = merge(commonConfig, envConfig)
  return config
}
