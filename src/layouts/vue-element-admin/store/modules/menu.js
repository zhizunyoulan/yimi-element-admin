const state = {
    menus: []
}

const getters = {
    menus: state => state.menus,
}

const mutations = {
    setMenus: (state, menus) => {
        // console.info('set menus:', menus)
        state.menus = menus
    }
}


export default {
    namespaced: true,
    state,
    getters,
    mutations
}