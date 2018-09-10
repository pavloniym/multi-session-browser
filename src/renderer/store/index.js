import Vue from 'vue'
import Vuex from 'vuex'
import tabs from './modules/tabs'

import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        tabs
    },
    strict: process.env.NODE_ENV !== 'production',
    plugins: [createPersistedState({
        key: 'mykey',
    })]
})
