import Vue from 'vue';
import Vuex, { mapActions, mapState } from 'vuex'

import { storiesOf } from '@storybook/vue';
import Centered from '@storybook/addon-centered'

import store from '~/store'
import Sidebar from '~/components/Sidebar.vue'


storiesOf('Sidebar', module)
  .addDecorator(Centered)
  .add('opened with 2 mmos', () => {
    const isShow = true
    const sysdate = new Date().toString()
    const memos = [
      {
        markdown: '# メモその１' + `
          * 結構
          * たくさん
          * めもる
        `,
        tags: ['Java', 'JavaScript'],
        created: sysdate,
        updated: sysdate,
      },
      {
        markdown: '# メモその2' + `
          * memo
        `,
        tags: [],
        created: sysdate,
        updated: sysdate,
      }
    ];

    const selectedMemoIndex = 0

    return {
      components: {
        'Sidebar': Vue.extend({
          mixins: [Sidebar],
          methods: {
            $_memoController_saveMemosToDB_core: function() {
              return new Promise(function(resolve, reject){
                resolve()
              })
            },
          }
        }),
      },
      template: `
        <md-app md-waterfall md-mode="fixed">
          <md-app-drawer md-permanent="full" :md-active.sync="showSidebar">
            <Sidebar />
          </md-app-drawer>
          <md-app-content>
            <md-button class="md-icon-button md-raised" @click="showSidebar = true"><i class="fas fa-angle-right"></i></md-button>
            <h1>Memo Text</h1>
            <pre style="background-color: #f1f1f1;">{{memos[selectedMemoIndex].markdown}}</pre>
          </md-app-content>
        </md-app>
      `,
      computed: {
        showSidebar: {
          get() {
            return this.$store.state.showSidebar
          },
          set (isShow) {
            this.setShowSidebar(isShow)
          }
        },
        ...mapState([
          'memos',
          'selectedMemoIndex',
        ])
      },
      methods: {
        ...mapActions([
          'setShowSidebar'
        ])
      },
      store: new Vuex.Store({
        state: {
          memos: memos,
          selectedMemoIndex: selectedMemoIndex,
          showSidebar: isShow,
          showSnackbar: false,
          snackbarText: '',
          showLoading: false,
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
    };
  })
  .add('closed with 2 memos', () => {
    const isShow = false
    const sysdate = new Date().toString()
    const memos = [
      {
        markdown: '# メモその１' + `
          * 結構
          * たくさん
          * めもる
        `,
        tags: ['Java', 'JavaScript'],
        created: sysdate,
        updated: sysdate,
      },
      {
        markdown: '# メモその2' + `
          * memo
        `,
        tags: [],
        created: sysdate,
        updated: sysdate,
      }
    ];

    const selectedMemoIndex = 0

    return {
      components: {
        'Sidebar': Vue.extend({
          mixins: [Sidebar],
          methods: {
            $_memoController_saveMemosToDB_core: function() {
              return new Promise(function(resolve, reject){
                resolve()
              })
            },
          }
        }),
      },
      template: `
        <md-app md-waterfall md-mode="fixed">
          <md-app-drawer md-permanent="full" :md-active.sync="showSidebar">
            <Sidebar />
          </md-app-drawer>
          <md-app-content>
            <md-button class="md-icon-button md-raised" @click="showSidebar = true"><i class="fas fa-angle-right"></i></md-button>
            <h1>Memo Text</h1>
            <pre style="background-color: #f1f1f1;">{{memos[selectedMemoIndex].markdown}}</pre>
          </md-app-content>
        </md-app>
      `,
      computed: {
        showSidebar: {
          get() {
            return this.$store.state.showSidebar
          },
          set (isShow) {
            this.setShowSidebar(isShow)
          }
        },
        ...mapState([
          'memos',
          'selectedMemoIndex',
        ])
      },
      methods: {
        ...mapActions([
          'setShowSidebar'
        ])
      },
      store: new Vuex.Store({
        state: {
          memos: memos,
          selectedMemoIndex: selectedMemoIndex,
          showSidebar: isShow,
          showSnackbar: false,
          snackbarText: '',
          showLoading: false,
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
    };
  })