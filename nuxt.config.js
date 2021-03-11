import { api_host } from './site.config';
import extendRoutes from './utils/extendRoutes';
import buildDir from './utils/buildDir';
import getPackage from './utils/getPackage';

const pack = getPackage();
// process.env.package = pack;

export default {
    // target: 'static',
    // (https://go.nuxtjs.dev/config-head)
    head: {
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width,viewport-fit=cover,initial-scale=1,user-scalable=no'},
        ],
        link: [
            // {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
        ],
    },

    // (https://go.nuxtjs.dev/config-css)
    css: [
        'element-ui/lib/theme-chalk/index.css',
        '@/assets/css/reset.css',
        '@/assets/css/style.css',
        '@/assets/iconfont/iconfont.css'
    ],

    env: {
        package: pack
    },
    loading: {
        color: '#ffffff'
    },

    serverMiddleware: ['~/middleware/logger'],

    // (https://go.nuxtjs.dev/config-plugins)
    plugins: [
        '@/plugins/element-ui',
        '@/plugins/axios',
        '@/plugins/route',
        {src: `@/package/${pack}/main`, ssr: false}
    ],

    // 自动引入组件 (https://go.nuxtjs.dev/config-components)
    components: false,

    // (https://go.nuxtjs.dev/config-modules)
    buildModules: [
        '@nuxtjs/router'
    ],

    routerModule: {

    },

    router: {
        middleware: 'router',
        prefetchLinks: false,
        // extendRoutes
    },

    // (https://go.nuxtjs.dev/config-modules)
    modules: [
        '@nuxtjs/axios',
        'nuxt-i18n'
    ],

    i18n: require(`./package/${pack}/lang`),

    axios: {
        baseURL: api_host,
        retry: { retries: 3 }
    },

    // (https://go.nuxtjs.dev/config-build)
    build: {
        // analyze: true,
        transpile: [/^element-ui/],
        // publicPath: 'http://ssr.static.com',
        extractCSS: true,
        // optimization: {
        //     splitChunks: {
        //         cacheGroups: {
        //             styles: {
        //                 name: 'styles',
        //                 test: /\.(css|vue)$/,
        //                 chunks: 'all',
        //                 enforce: true
        //             }
        //         }
        //     }
        // }
    },

    buildDir: buildDir('.nuxt'),

    generate: {
        dir: buildDir('dist'),
        // interval: 3000,
        // routes: [
        //     '/bbs'
        // ]
    },

    publicRuntimeConfig: {
        baseURL: 123,
        package: pack
    },

    // server: {
    //     port: 1997, // default: 3000
    //     host: '0.0.0.0', // default: localhost,
    //     timing: false
    // }
}
