import Vue from 'vue'

import App from './App'
import store from './store'
// Load fonts
import 'font-awesome/css/font-awesome.min.css'
import './../assets/fonts/browser/browser.font'
import './../assets/scss/fonts/index.scss'


if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({

    components: {App},
    store,
    template: '<App/>'

}).$mount('#app')
