import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showSavedSnackbar: false,
    showDeletedSnackbar: false,
    showDeletingDialog: false,
  },
  actions: {
    setShowSavedSnackbar ({ commit }, isShow) {
      commit( 'setShowSavedSnackbar', { isShow })
    },
    setShowDeletedSnackbar ({ commit }, isShow) {
      commit( 'setShowDeletedSnackbar', { isShow })
    },
    setShowDeletingDialog ({ commit }, isShow) {
      commit( 'setShowDeletingDialog', { isShow })
    },
  },
  mutations: {
    setShowSavedSnackbar (state, payload) {
      state.showSavedSnackbar = payload.isShow
    },
    setShowDeletedSnackbar (state, payload) {
      state.showDeletedSnackbar = payload.isShow
    },
    setShowDeletingDialog (state, payload) {
      state.showDeletingDialog = payload.isShow
    },
  }
})