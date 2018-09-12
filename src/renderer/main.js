import Vue from 'vue'
import NProgress from 'vue-nprogress'

import App from './App'
import store from './store'

// Load fonts
import 'font-awesome/css/font-awesome.min.css'
import './../assets/fonts/browser/browser.font'
import './../assets/scss/fonts/index.scss'


Vue.use(NProgress)


if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

const nprogress = new NProgress({
    parent: '.nprogress-container',
    showSpinner: false
})


/* eslint-disable no-new */
new Vue({
    components: {App},
    store,
    nprogress,
    template: '<App/>'
}).$mount('#app')
