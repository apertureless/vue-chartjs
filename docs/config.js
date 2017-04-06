const langs = [
  {title: 'English', path: '/home', matchPath: /^\/(home|changelog)/},
  {title: 'Deutsch', path: '/de/', matchPath: /^\/de/}
]

docute.init({
  title: 'vue-chartjs docs',
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
      tags: ['english', 'de'],
      // this plugin does require a url too
      // where docsearch fetches contents
      url: 'https://vue-chartjs.org'
    })
  ],
})
