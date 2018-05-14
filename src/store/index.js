import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showSavedSnackbar: false,
  },
  actions: {
    setShowSavedSnackbar ({ commit }, flag) {
      commit( 'setShowSavedSnackbar', {
        data: flag
      })
    }


  },
  mutations: {
    setShowSavedSnackbar (state, payload) {
      state.showSavedSnackbar = payload.data
    }
  }
})