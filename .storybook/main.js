const path = require('path')

module.exports = {
  stories: ['../stories/*.stories.@(ts|js)'],
  addons: ['@storybook/addon-essentials'],
  framework: '@storybook/vue3',
  core: {
    builder: '@storybook/builder-webpack5'
  },
  webpackFinal: async config => {
    config.resolve.alias['vue-chartjs'] = path.resolve(
      __dirname,
      '../src/index.ts'
    )
    return config
  }
}
