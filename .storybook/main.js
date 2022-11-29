const path = require('path')
const { mergeConfig } = require('vite')

module.exports = {
  core: {
    builder: '@storybook/builder-vite'
  },
  viteFinal(config) {
    return mergeConfig(config, {
      resolve: {
        dedupe: ['@storybook/client-api'],
        alias: {
          'vue-chartjs': path.resolve(__dirname, '../src')
        }
      }
    })
  },
  framework: '@storybook/vue3',
  stories: ['../stories/*.stories.@(ts|js)'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-controls',
    '@storybook/addon-actions'
  ]
}
