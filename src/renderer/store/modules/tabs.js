export default  {

    namespaced: true,
    state: {
        tab: null,
        tabs: []
    },


    mutations: {
        set: (s, {k, v}) => s[k] = v
    },


    getters: {
        tab: (s) => s.tab,
        tabs: (s) => s.tabs,
    }



}
