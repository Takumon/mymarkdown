const path = require('path')
const rootPath = path.resolve(__dirname, '../')

module.exports = (baseConfig, env, defaultConfig) => {
  defaultConfig.resolve.alias['@'] = rootPath;
  defaultConfig.resolve.alias['~'] = rootPath;

  return defaultConfig;
}