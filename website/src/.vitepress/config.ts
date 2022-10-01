import { defineConfig } from 'vitepress'

export default defineConfig({
  lastUpdated: true,

  themeConfig: {
    repo: 'apertureless/vue-chartjs',
    docsDir: 'website/src',
    docsBranch: 'main',
    editLinks: true,
    editLinkText: 'Help us improve this page!',
    lastUpdated: 'Last Updated',

    algolia: {
      indexName: 'vue-chartjs',
      apiKey: 'a1bb4528e8ed1eb89e40d6e4c1000514',
      appId: '24VA3R3NCC'
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
        text: 'Slack',
        link: 'https://slack.cube.dev/?ref=eco-vue-chartjs'
      },
      {
        text: 'Stack Overflow',
        link: 'https://stackoverflow.com/questions/tagged/vue-chartjs/'
      }
    ],

    sidebar: 'auto',

    locales: {
      '/': {
        selectText: 'Languages',
        label: 'English',
        editLinkText: 'Edit this page on GitHub'
      }
      // '/ru/': {
      //   selectText: 'Языки',
      //   label: 'Русский',
      //   editLinkText: 'Редактировать эту страницу на GitHub',
      //   nav: [
      //     {
      //       text: 'Руководство',
      //       link: '/ru/guide/'
      //     },
      //     {
      //       text: 'API',
      //       link: '/ru/api/'
      //     }
      //   ]
      // }
      // '/zh-cn/': {
      //   selectText: '选择语言',
      //   label: '中文(简体)',
      //   sidebar: 'auto',
      //   editLinkText: '在GitHub上编辑本页',
      //   nav: [
      //     {
      //       text: '指南',
      //       link: '/zh-cn/guide/'
      //     },
      //     {
      //       text: 'API 参考',
      //       link: '/zh-cn/api/'
      //     }
      //   ]
      // },
      // '/ja/': {
      //   selectText: 'Languages',
      //   label: '日本語',
      //   editLinkText: 'Edit this page on GitHub',
      //   nav: [
      //     {
      //       text: 'Guide',
      //       link: '/ja/guide/'
      //     },
      //     {
      //       text: 'API',
      //       link: '/ja/api/'
      //     }
      //   ]
      // },
      // '/pt-br/': {
      //   selectText: 'Linguas',
      //   label: 'Português do Brasil',
      //   editLinkText: 'Edite esta página no GitHub',
      //   nav: [
      //     { text: 'Guia', link: '/pt-br/guide/' },
      //     { text: 'API', link: '/pt-br/api/' }
      //   ]
      // }
    }
  },
  locales: {
    '/': {
      lang: 'en-US',
      title: '📈 vue-chartjs',
      description: '⚡ Easy and beautiful charts with Chart.js and Vue.js'
    }
    // '/ru/': {
    //   lang: 'ru',
    //   title: '📈 vue-chartjs',
    //   description: '⚡ Простые и красивые графики с Chart.js и Vue.js'
    // }
    // '/zh-cn/': {
    //   lang: 'zh-CN',
    //   title: '📈 vue-chartjs',
    //   description: '⚡ 使用 Chart.js 和 Vue.js 搭建简单和漂亮的图表'
    // },
    // '/ja/': {
    //   lang: 'ja',
    //   title: '📈 vue-chartjs',
    //   description: '⚡ Easy and beautiful charts with Chart.js and Vue.js'
    // },
    // '/pt-br/': {
    //   lang: 'pt-br',
    //   title: '📈 vue-chartjs',
    //   description: '⚡ Gráficos bonitos e fácil com Chart.js e Vue.js'
    // }
  }
})
