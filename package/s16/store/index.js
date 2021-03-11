const localeDomains = require('../lang/locale-domains');
module.exports = {
    state: {
        counter: 0,
        lang: 'zh',
        localeDomains
    },
    mutations: {
        increment(state) {
            state.counter++
        },
        setLang(state, lang) {
            state.lang = lang
        }
    }
}
