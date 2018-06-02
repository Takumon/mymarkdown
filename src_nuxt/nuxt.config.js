module.exports = {
  env: {
    APIKEY: 'AIzaSyAY88eDIcBJHxzXw-VnsnpTub-uoVvH2b4',
    AUTHDOMAIN: 'mymarkdown-233ca.firebaseapp.com',
    DATABASEURL: 'https://mymarkdown-233ca.firebaseio.com',
    PROJECTID: 'mymarkdown-233ca',
    STORAGEBUCKET: '',
    MESSAGINGSENDERID: '360435751539',
  },
  router: {
    middleware: 'authenticated'
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'Markdown Mome',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    script: [
      { src: 'https://www.gstatic.com/firebasejs/4.13.0/firebase.js' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet',　href: '//fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons'　},
      { rel: 'stylesheet',　href: 'https://use.fontawesome.com/releases/v5.0.6/css/all.css'},
      { rel: 'stylesheet',　href: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/8.6/styles/solarized_light.min.css'},
      { rel: 'stylesheet',　href: 'https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/2.10.0/github-markdown.min.css'},

    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  plugins: [
    '~/plugins/vue-material',
    '~/plugins/vue-scroll',
  ],

  /*
  ** Build configuration
  */
  build: {
    vendor: [
      'vue-material/dist/components',
      'axios',
    ],
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
