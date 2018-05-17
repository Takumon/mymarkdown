import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showSnackbar: false,
    snackbarText: '',
    showDeletingDialog: false,
    showSidebar: false,
    showLoading: false,
    loginUser: null,
    textEditorPreviewMode: 'tab-editor-and-preview',
    nowSaving: false,
  },
  actions: {
    setShowSnackbar ({ commit }, { isShow, text}) {
      commit( 'setShowSnackbar', { isShow, text })
    },
    setShowDeletingDialog ( { commit }, isShow) {
      commit( 'setShowDeletingDialog', { isShow })
    },
    setShowSidebar ({ commit }, isShow ) {
      commit( 'setShowSidebar', { isShow })
    },
    setShowLoading ({ commit }, isShow) {
      commit( 'setShowLoading', { isShow })
    },
    setTextEditorPreviewMode ({ commit }, mode) {
      commit( 'setTextEditorPreviewMode', { mode } )
    },
    setLoginUser({ commit }, loginUser) {
      commit( 'setLoginUser' , { loginUser })
    },
    setNowSaving({ commit }, nowSaving) {
      commit( 'setNowSaving', { nowSaving })
    },
  },
  mutations: {
    setShowSnackbar (state, payload) {
      state.showSnackbar = payload.isShow
      // textを指定してる時のみ更新
      if (payload.text) {
        state.snackbarText = payload.text
      }
    },
    setShowDeletingDialog (state, payload) {
      state.showDeletingDialog = payload.isShow
    },
    setShowSidebar (state, payload) {
      state.showSidebar = payload.isShow
    },
    setShowLoading (state, payload) {
      state.showLoading = payload.isShow
    },
    setTextEditorPreviewMode (state, payload) {
      state.textEditorPreviewMode = payload.mode
    },
    setLoginUser (state, payload) {
      state.loginUser = payload.loginUser
    },
    setNowSaving (state, payload) {
      state.nowSaving = payload.nowSaving
    }
  }
})