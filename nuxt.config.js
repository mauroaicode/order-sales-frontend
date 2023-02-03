export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'order-sales-frontend',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''},
      {name: 'format-detection', content: 'telephone=no'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ],
    bodyAttrs: {
      class: 'bg-gray-50'
    }
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/bus',
    '~/plugins/vue-sax',
    '~/plugins/vuelidate',
    '~/plugins/vue-gates',
    '~/plugins/laravel-permissions',
    {src: '~/plugins/vue-easytable', ssr: false},
    {src: '~/plugins/vue-sweetalert2', mode: 'client', ssr: false},
    {src: '~/plugins/vue-file-agent.js', mode: 'client', ssr: false},
    {src: '~/plugins/vue-toastification', mode: 'client', ssr: false},
    {src: '~/plugins/vue-fullpage-modal.js', mode: 'client', ssr: false},
    {src: '~/plugins/vue-currency-filter.js', mode: 'client', ssr: false}
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: {
    global: true,
    dirs: [
      '~/components',
      '~/components/roles',
      '~/components/users',
      '~/components/products',
      '~/components/partials'
    ]
  },
  publicRuntimeConfig: {
    colorLoading: '#1D4ED8',
    baseUrlBack: process.env.BASE_URL_API_BACK,
    axios: {
      baseURL: process.env.BASE_URL_API_BACK
    }
  },

  auth: {
    redirect: {
      login: 'auth/login',
      logout: '/auth/login',
      home: '/'
    },
    strategies: {
      local: {
        token: {
          property: 'token',
          global: true
          // required: true,
          // type: 'Bearer'
        },
        user: {
          property: 'user'
          // autoFetch: true
        },
        endpoints: {
          login: {url: '/login', method: 'post'},
          logout: {url: '/logout', method: 'post'},
          user: {url: '/api/v1/user', method: 'get'}
        }
      }
    }
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/moment',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode'
  ],
  moment: {
    defaultLocale: 'es',
    locales: ['es'],
    timezone: true,
    defaultTimezone: 'America/Bogota'
  },
  colorMode: {
    classSuffix: '',
    preference: 'system'
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    "vue-toastification/nuxt",
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
}
