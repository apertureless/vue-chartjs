import { defineConfig } from 'vitepress'

export default defineConfig({
  lastUpdated: true,

  themeConfig: {
    editLink: {
      pattern:
        'https://github.com/apertureless/vue-chartjs/edit/main/website/src/:path'
    },
    search: {
      provider: 'algolia',
      options: {
        indexName: 'vue-chartjs',
        apiKey: 'a1bb4528e8ed1eb89e40d6e4c1000514',
        appId: '24VA3R3NCC'
      }
    },

    nav: [
      { text: 'Guide', link: '/guide/', activeMatch: '^/guide/' },
      {
        text: 'Migration guides',
        link: '/migration-guides/',
        activeMatch: '^/migration-guides/'
      },
      {
        text: 'API',
        link: '/api/',
        activeMatch: '^/api/'
      },
      {
        text: 'Examples',
        link: '/examples/',
        activeMatch: '^/examples/'
      },
      {
        text: 'Stack Overflow',
        link: 'https://stackoverflow.com/questions/tagged/vue-chartjs/'
      },
      {
        text: 'Github',
        link: 'https://github.com/apertureless/vue-chartjs'
      }
    ],

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Getting started', link: '/guide' },
          { text: 'Examples', link: '/guide/examples' }
        ]
      },
      {
        text: 'Migration',
        items: [
          { text: 'Introduction', link: '/migration-guides/' },
          { text: 'Migrate to v5', link: '/migration-guides/v5' },
          { text: 'Migrate to v4', link: '/migration-guides/v4' },
          {
            text: 'Migrate from vue-chart-3',
            link: '/migration-guides/vue-chart-3'
          }
        ]
      }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2019-present Jakub Juszczak'
    }
  },

  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
      title: '📈 vue-chartjs',
      description: '⚡ Easy and beautiful charts with Chart.js and Vue.js'
    },
    de: {
      label: 'Deutsch',
      lang: 'de',
      link: '/de/',
      title: '📈 vue-chartjs',
      description: '⚡Einfache und schöne Diagramme mit Chart.js und Vue.js'
    }
  }
})
