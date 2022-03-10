const path = require('path')

module.exports = {
  stories: ['../stories/*.stories.(js|ts)'],
  addons: ['@storybook/addon-essentials'],
  framework: '@storybook/vue3',
  webpackFinal: async config => {
    config.resolve.alias['vue-chartjs'] = path.resolve(
      __dirname,
      '../src/index.js'
    )
    return config
  }
}
