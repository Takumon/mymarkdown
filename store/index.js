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
    // ログアウトしてログイン画面にきたことを判断するために使用する
    // ログイン画面表示時にgetRedirectResultで認証判定を実施するが、
    // 一度ログインしてログアウトした際にfirebaseのsignoutを実行してもgetRedirectResultでユーザが取得できてしまう
    // ログアウトした直後はログイン画面を表示したいので、ログアウト時に本属性の値をtrueに設定し
    // ログイン画面表示時のgetRedirectResultでの判定材料として使用する
    fromLogout: false,
  },
  actions: {
    setMemos ( { commit}, memos) {
      return new Promise((resolve, reject) => {
        commit('setMemos', { memos })
        resolve()
      })
    },
    addMemo ( { commit }, memo = {}) {
      return new Promise((resolve, reject) => {
        commit('addMemo', { memo })
        resolve()
      })
    },
    updateMemoUpdated( { commit }, index) {
      return new Promise((resolve, reject) => {
        commit('updateMemoUpdated', { index })
        resolve()
      })
    },
    deleteMemo( { commit }, index) {
      return new Promise((resolve, reject) => {
        commit('deleteMemo', { index })
        resolve()
      })
    },
    setSelectedMemoIndex( { commit }, selectedMemoIndex) {
      return new Promise((resolve, reject) => {
        commit( 'setSelectedMemoIndex', { selectedMemoIndex })
        resolve()
      })
    },
    setShowSnackbar ({ commit }, { isShow, text}) {
      return new Promise((resolve, reject) => {
        commit( 'setShowSnackbar', { isShow, text })
        resolve()
      })
    },
    setShowDeletingDialog ( { commit }, isShow) {
      return new Promise((resolve, reject) => {
        commit( 'setShowDeletingDialog', { isShow })
        resolve()
      })
    },
    setShowSidebar ({ commit }, isShow ) {
      return new Promise((resolve, reject) => {
        commit( 'setShowSidebar', { isShow })
        resolve()
      })
    },
    setShowLoading ({ commit }, isShow) {
      return new Promise((resolve, reject) => {
        commit( 'setShowLoading', { isShow })
        resolve()
      })
    },
    setTextEditorPreviewMode ({ commit }, mode) {
      return new Promise((resolve, reject) => {
        commit( 'setTextEditorPreviewMode', { mode } )
        resolve()
      })
    },
    setLoginUser({ commit }, loginUser) {
      return new Promise((resolve, reject) => {
        commit( 'setLoginUser' , { loginUser })
        resolve()
      })
    },
    setNowSaving({ commit }, nowSaving) {
      return new Promise((resolve, reject) => {
        commit( 'setNowSaving', { nowSaving })
        resolve()
      })
    },
    setFromLogout( { commit }, fromLogout) {
      return new Promise((resolve, reject) => {
        commit( 'setFromLogout', { fromLogout })
        resolve()
      })
    }
  },
  mutations: {
    setMemos (state, payload) {
      state.memos = payload.memos
    },
    addMemo (state, payload) {
      const sysdate = new Date().toString()
      payload.memo.markdown = payload.memo.markdown || '# 無題のメモ'
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
    },
    setFromLogout (state, payload) {
      state.fromLogout = payload.fromLogout
    },
  }
})


export default store
