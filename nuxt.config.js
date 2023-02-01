export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'order-sales-frontend',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/vue-sax',
    '~/plugins/vuelidate',
    { src: '~/plugins/vue-easytable', ssr: false},
    { src: '~/plugins/vue-sweetalert2', mode: 'client', ssr: false},
    { src: '~/plugins/vue-toastification', mode: 'client', ssr: false}
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: {
    global: true,
    dirs: [
      '~/components',
      '~/components/users',
      '~/components/partials'
    ]
  },
  publicRuntimeConfig: {
    colorLoading: '#1D4ED8',
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
          login: { url: '/login', method: 'post' },
          logout: { url: '/logout', method: 'post' },
          user: { url: '/api/v1/user', method: 'get' }
        }
      }
    }
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode'
  ],
  colorMode:{
    classSuffix: '',
    preference: 'system'
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
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
  build: {
  }
}
