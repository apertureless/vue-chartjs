module.exports = {
  title: 'vue-chartjs documentation',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'API', link: '/api/' }
    ],
    sidebar: 'auto',
    repo: 'apertureless/vue-chartjs',
    editLinks: true,
    editLinkText: 'Help us improve this page!',
    docsDir: 'docs',
    docsBranch: 'master',
    serviceWorker: true,
    locales: {
      '/': {
        selectText: 'Languages',
        label: 'English',
        editLinkText: 'Edit this page on GitHub',
        serviceWorker: {
          updatePopup: {
            message: "New content is available.",
            buttonText: "Refresh"
          }
        },
      },
      '/zh-cn/': {
        selectText: '选择语言',
        label: '中文(简体)',
        sidebar: 'auto',
        editLinkText: '在GitHub上编辑本页',
        nav: [
          {
            text: '指南',
            link: '/zh-cn/guide/'
          },
          {
            text: 'API 参考',
            link: '/zh-cn/api/'
          }
        ],
        serviceWorker: {
          updatePopup: {
            message: "有新内容更新.",
            buttonText: "刷新"
          }
        }
      },
      '/id/': {
        selectText: 'Languages',
        label: 'Bahasa Indonesia',
        editLinkText: 'Edit this page on GitHub',
        serviceWorker: {
          updatePopup: {
            message: "New content is available.",
            buttonText: "Refresh"
          }
        },
      },
      '/ja/': {
        selectText: 'Languages',
        label: '日本語',
        editLinkText: 'Edit this page on GitHub',
        serviceWorker: {
          updatePopup: {
            message: "New content is available.",
            buttonText: "Refresh"
          }
        },
      },
      '/ru/': {
        selectText: 'Languages',
        label: 'Русский',
        editLinkText: 'Edit this page on GitHub',
        serviceWorker: {
          updatePopup: {
            message: "New content is available.",
            buttonText: "Refresh"
          }
        },
      },
      '/pt-br/': {
        selectText: 'Languages',
        label: 'Português do Brasil',
        editLinkText: 'Edit this page on GitHub',
        serviceWorker: {
          updatePopup: {
            message: "New content is available.",
            buttonText: "Refresh"
          }
        },
      },
      '/fr-fr/': {
        selectText: 'Languages',
        label: 'Français',
        editLinkText: 'Edit this page on GitHub',
        serviceWorker: {
          updatePopup: {
            message: "New content is available.",
            buttonText: "Refresh"
          }
        },
      }
    },
    algolia: {
      indexName: 'vue-chartjs',
      apiKey: 'b3544f7387612693644777553675d56a'
    }
  },
  locales: {
    '/': {
      lang: 'en-US',
      title: '📈 vue-chartjs',
      description: '⚡ Easy and beautiful charts with Chart.js and Vue.js'
    },
    '/zh-cn/': {
      lang: 'zh-CN',
      title: '📈 vue-chartjs',
      description: '⚡ 使用 Chart.js 和 Vue.js 搭建简单和漂亮的图表'
    },
    '/id/': {
      lang: 'id',
      title: '📈 vue-chartjs',
      description: '⚡ Easy and beautiful charts with Chart.js and Vue.js'
    },
    '/ja/': {
      lang: 'ja',
      title: '📈 vue-chartjs',
      description: '⚡ Easy and beautiful charts with Chart.js and Vue.js'
    },
    '/ru/': {
      lang: 'ru',
      title: '📈 vue-chartjs',
      description: '⚡ Easy and beautiful charts with Chart.js and Vue.js'
    },
    '/pt-br/': {
      lang: 'pt-br',
      title: '📈 vue-chartjs',
      description: '⚡ Easy and beautiful charts with Chart.js and Vue.js'
    },
    '/fr-fr/': {
      lang: 'fr-fr',
      title: '📈 vue-chartjs',
      description: '⚡ Easy and beautiful charts with Chart.js and Vue.js'
    }
  }
}
