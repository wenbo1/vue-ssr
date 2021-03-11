import getPackage from '../utils/getPackage';

const pack = getPackage();

const localeDomains = require(`~/package/${pack}/store`);

const publicState = {
    site: '0'
}

const publicMutations = {
    setSite(state, site) {
        state.site = site
    }
}

export const state = () => (Object.assign({}, publicState, localeDomains.state));

export const mutations = Object.assign({}, publicMutations, localeDomains.mutations);
