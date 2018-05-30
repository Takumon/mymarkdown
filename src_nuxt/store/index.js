import Vuex from 'vuex'

const store = () => new Vuex.Store({
  state: {
    memos: [],
    selectedMemoIndex: 0,
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
    setMemos ( { commit}, memos) {
      commit('setMemos', { memos })
    },
    addMemo ( { commit }, memo = {}) {
      commit('addMemo', { memo })
    },
    updateMemoUpdated( { commit }, index) {
      commit('updateMemoUpdated', { index })
    },
    deleteMemo( { commit }, index) {
      commit('deleteMemo', { index })
    },
    setSelectedMemoIndex( { commit }, selectedMemoIndex) {
      commit( 'setSelectedMemoIndex', { selectedMemoIndex })
    },
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
    setMemos (state, payload) {
      state.memos = payload.memos
    },
    addMemo (state, payload) {
      const sysdate = new Date().toString()
      payload.memo.markdown = payload.memo.markdown || '無題のメモ'
      payload.memo.tags = payload.memo.tags || []
      payload.memo.created = payload.memo.created || sysdate
      payload.memo.updated = payload.memo.updated || sysdate

      state.memos.push(payload.memo)
    },
    deleteMemo(state, payload) {
      if (state.selectedMemoIndex > 0) {
        state.selectedMemoIndex--
      }

      state.memos.splice(payload.index, 1)
    },
    updateMemoUpdated(state, payload) {
      state.memos[payload.index].updated = new Date().toString()
    },
    setSelectedMemoIndex(state, payload) {
      state.selectedMemoIndex = payload.selectedMemoIndex
    },
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


export default store
