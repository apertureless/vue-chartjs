const langs = [
  {title: 'English', path: '/home', matchPath: /^\/(home|changelog)/},
  {title: 'Deutsch', path: '/de/', matchPath: /^\/de/},
  {title: 'Français', path: '/fr-fr/', matchPath: /^\/fr-fr/},
  {title: '日本語', path: '/ja/', matchPath: /^\/ja/},
  {title: 'Português do Brasil', path: '/pt-br/', matchPath: /^\/pt-br/},
  {title: '中文(简体)', path: '/zh-cn/', matchPath: /^\/zh-cn/},
  {title: 'Русский', path: '/ru/', matchPath: /^\/ru/},
  {title: 'Bahasa Indonesia', path: '/id/', matchPath: /^\/ru/}
]

docute.init({
  title: 'vue-chartjs docs',
  announcement(route) {
    const info = { type: 'success' }
    info.html = '<a style="margin-right:10px;" class="docute-button docute-button-mini docute-button-success" href="https://www.paypal.me/apertureless/50eur" target="_blank">Donate!</a> Support vue-chartjs development by a one-time donation.'
    return info
  },
  landing: true,
  landing: '_landing.html',
  repo: 'apertureless/vue-chartjs',
  twitter: 'apertureless',
  tocVisibleDepth: 2,
  'edit-link': 'https://github.com/apertureless/vue-chartjs/blob/master/docs',
  nav: {
    default: [
      {
        title: 'Home', path: '/home'
      },
      {
        title: 'Changelog', path: '/changelog', source: 'https://raw.githubusercontent.com/apertureless/vue-chartjs/develop/CHANGELOG.md'
      },
      {
        title: 'Languages', type: 'dropdown', items: langs
      }
    ],
    'de': [
      {
        title: 'Startseite', path: '/de/'
      }
    ]
  },
  plugins: [
    evanyou(),
    docsearch({
      apiKey: 'b3544f7387612693644777553675d56a',
      indexName: 'vue-chartjs',
      // algolia docsearch allows you to search with tag filter
      tags: ['en', 'fr-fr', 'id', 'ja', 'pt-br', 'ru', 'zh-cn'],
      // this plugin does require a url too
      // where docsearch fetches contents
      url: 'https://vue-chartjs.org'
    })
  ]
})
