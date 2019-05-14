const tabWrap = {
  state: {
    tabData: []
  },
  mutations: {
    CHANGE_TAB_DATA: (state, tabType) => {
      state.tabData = tabType;
    }
  },
  actions: {
    addtabData({commit}, tabType) {
      commit('ADD_VISITED_VIEWS', tabType);
    }
  }
};

export default tabWrap;
