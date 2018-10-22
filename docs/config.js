const langs = [
  {title: 'English', path: '/home', matchPath: /^\/(home|changelog)/},
  {title: 'Français', path: '/fr-fr/', matchPath: /^\/fr-fr/},
  {title: 'Bahasa Indonesia', path: '/id/', matchPath: /^\/id/},
  {title: '日本語', path: '/ja/', matchPath: /^\/ja/},
  {title: 'Português do Brasil', path: '/pt-br/', matchPath: /^\/pt-br/},
  {title: 'Русский', path: '/ru/', matchPath: /^\/ru/},
  {title: '中文(简体)', path: '/zh-cn/', matchPath: /^\/zh-cn/}
]

docute.init({
  title: 'vue-chartjs documentation',
  announcement(route) {
    const info = { type: 'success' }
    info.html = '<a style="margin-right:10px;" class="docute-button docute-button-mini docute-button-success" href="https://www.paypal.me/apertureless/50eur" target="_blank">Donate!</a> Support vue-chartjs development by a one-time donation.'
    return info
  },
  debug: true,
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
    'fr-fr': [
      {
        title: 'Home', path: '/fr-fr/'
      }
    ]
  },
  plugins: [
    evanyou(),
    docsearch({
      appId: 'BH4D9OD16A',
      apiKey: 'b3544f7387612693644777553675d56a',
      indexName: 'vue-chartjs',
      // algolia docsearch allows you to search with tag filter
      tags: ['en', 'fr-fr', 'id', 'ja', 'pt-br', 'ru', 'zh-cn'],
      // this plugin does require a url too
      // where docsearch fetches contents
      url: 'http://vue-chartjs.org'
    })
  ]
})
