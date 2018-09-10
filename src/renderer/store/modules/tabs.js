import set from 'lodash/set'
import moment from 'moment'

export default  {

    namespaced: true,
    state: {
        tab: null,
        tabs: []
    },


    mutations: {


        /**
         * Update tabs data
         *
         * @param s
         * @param k
         * @param v
         * @returns {Object}
         */
        update: (s, {k, v}) => set(s, k, v),


        /**
         * Add new tab to stack
         *
         * @param s
         * @param session
         * @returns {number}
         */
        add: (s, {session}) => s.tabs.push({
            favicon: null,
            hash: moment().format('x'),
            url: null,
            session
        }),



        remove: (s, index) => s.tabs.splice(index, 1),
    },


    getters: {
        tab: (s) => s.tab,
        tabs: (s) => s.tabs,
    }



}
