export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || 'Minimal LaptopStore using Nuxt'
      }
    ],
    link: [{
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Raleway:200,300,400,500&display=swap'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Merriweather:400,700,900&display=swap'
      }, {
        rel: 'stylesheet',
        href: 'css/main.css'
      },

    ],
    script: [{
        src: 'https://js.stripe.com/v3/',
        defer: true
      }, {
        src: 'https://kit.fontawesome.com/6a0488f883.js'
      },
      {
        src: 'js/all.js'
      },
      {
        src: 'https://checkout.stripe.com/checkout.js'
      },
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#05B050',
    throttle: 0
  },
  /*
   ** Global CSS
   */
  css: [
    'quill/dist/quill.snow.css',
    'quill/dist/quill.bubble.css',
    'quill/dist/quill.core.css'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{
      src: '~/plugins/VueperSlide',
      ssr: true
    },
    {
      src: '~/plugins/vuex-persist',
      ssr: true
    },
    {
      src: '~plugins/nuxt-quill-plugin.js',
      ssr: true
    },
  ],
  /*
   ** Nuxt.js dev-modules
   */
  devModules: [
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    'nuxt-vuex-localstorage'

  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {

    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },
  env: {
    baseUrl: process.env.NODE_ENV === 'dev' ?
      'https://localhost:3000' : 'https://buylaptops.herokuapp.com'
  }
}
