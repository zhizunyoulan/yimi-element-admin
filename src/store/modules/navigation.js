export default {
  state: {
    navStack: [],
    contentSpinShow: false,
  },
  getters: {
    breadNavStack: (state) => {
      return state.navStack.reverse();
    },
    contentSpinVisible: (state,) => {
      return state.contentSpinShow;
    },
  },
  mutations: {
    setContentSpinVisible(state, visible) {
      state.contentSpinShow = visible;
    },
    pushNavItem(state, navItem) {
      var index = state.navStack.findIndex(function(item) {
        return item.path == navItem.path;
      });
      if (index != -1) {
        state.navStack.splice(index, 1);
      } else if (state.navStack.length > 2) {
        state.navStack.splice(0, 1);
      }
      state.navStack.push(navItem);
    },
    clearNavStack(state) {
      state.navStack = [];
    },
  },
};
