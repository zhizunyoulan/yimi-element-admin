import { convertRoutesToMenu } from '@/utils/route'
import { pages } from '@/utils/page'

function getRouter() {
  return import("@/router");
}

const state = {
  pages
};

const getters = {
  pages: (state) => state.pages,
};

const mutations = {};

const actions = {
  initMenu() {
    return new Promise(resolve => {
      getRouter().then(module => {
        let menu = convertRoutesToMenu(module.wholeRoutes)
        resolve(menu)
      })
    })
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
