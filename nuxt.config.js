export default {
  ssr: false,

  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'salescom',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'WP Salescom' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=Roboto+Mono&family=Source+Code+Pro&display=swap' },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/main.css',
    '@/assets/css/transition.css',
    '@/assets/css/v-tooltip.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~/plugins/google-maps", ssr: false },
    { src: "~/plugins/v-tooltip" },
    { src: "~/plugins/awesome-notification" },
    { src: "~/plugins/vue-shortkey", mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxt/postcss8',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],

  axios: {
    baseURL: process.env.BASE_URL, // Used as fallback if no runtime config is provided
  },

  publicRuntimeConfig: {
    googleMapsApiKey: process.env.GOOGLEMAPS_API_KEY,
    axios: {
      browserBaseURL: process.env.BASE_URL,
    }
  },

  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.BASE_URL,
    }
  },

  // Middleware
  router: {
    middleware: ['auth']
  },

  auth: {
    strategies: {
      'laravelSanctum': {
        provider: 'laravel/sanctum',
        url: process.env.AUTH_URL,
        endpoints: {
          login: {
            url: '/api/login'
          },
          logout: {
            url: '/api/logout'
          },
        },
        user: {
          property: 'data'
        }
      },
    },

    redirect: {
      login: '/login',
      logout: '/',
      home: '/dashboard'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^vue2-google-maps($|\/)/],
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  }
}
