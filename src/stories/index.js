import Vue from 'vue';
import Vuex, { mapActions, mapState } from 'vuex'

import { storiesOf } from '@storybook/vue';
import { action, configureActions } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links'
import { withNotes } from '@storybook/addon-notes'
import {
  withKnobs,
  text,
  number,
  color,
  boolean,
  select,
  object,
} from '@storybook/addon-knobs'
import Centered from '@storybook/addon-centered'

import store from '../store'


import Navigation1 from '../components/Navigation1.vue'
import Navigation2 from '../components/Navigation2.vue'
import Sidebar from '../components/Sidebar.vue'
import Snackbar from '../components/Snackbar.vue'
import DeleteDialog from '../components/DeleteDialog.vue'
import EditorContent from '../components/EditorContent.vue'

storiesOf('Snackbar', module)
  .addDecorator(Centered)
  .addDecorator(withKnobs)
  .add('with some Addons', () => {
    const _isShow = boolean('isShow', true)
    const _text = text('text', 'SampleText')
    return {
      components: { Snackbar },
      template: `
          <Snackbar />
      `,
      store: new Vuex.Store({
        state: {
          showSnackbar: _isShow,
          snackbarText: _text,
        },
        actions: {
          setShowSnackbar ({ commit }, { isShow, text}) {
            commit( 'setShowSnackbar', { isShow, text })
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
        }
      })
    }
  });



storiesOf('Navigation1', module)
  .addDecorator(Centered)
  .addDecorator(withKnobs)
  .add('with some Addons', () => {
    const _isShow = boolean('isShow', false);
    const _loginUser = object('loginUser', {
      displayName: 'SampleUserName'
    });

    return {
      components: { Navigation1 },
      template: `
        <md-app md-waterfall md-mode="fixed">
          <md-app-toolbar class="md-primary">
            <Navigation1 />
          </md-app-toolbar>
        </md-app>
      `,
      store: new Vuex.Store({
        state: {
          showSidebar: _isShow,
          loginUser: _loginUser,
        },
        actions: {
          setShowSidebar ({ commit }, isShow ) {
            commit( 'setShowSidebar', { isShow })
          },
          setLoginUser({ commit }, loginUser) {
            commit( 'setLoginUser' , { loginUser })
          },
        },
        mutations: {
          setShowSidebar (state, payload) {
            state.showSidebar = payload.isShow
          },
          setLoginUser (state, payload) {
            state.loginUser = payload.loginUser
          },
        }
      })
    }
  });



storiesOf('Navigation2', module)
  .addDecorator(Centered)
  .addDecorator(withKnobs)
  .add('with some Addons', () => {
    const _tabMode = select('tabMode', {
      'tab-editor' :'tab-editor',
      'tab-editor-and-preview': 'tab-editor-and-preview',
      'tab-preview': 'tab-preview',
    }, 'tab-editor-and-preview');

    return {
      components: { Navigation2 },
      template: `
        <md-app md-waterfall md-mode="fixed">
          <md-app-toolbar class="md-primary">
            <Navigation2 />
          </md-app-toolbar>
        </md-app>
      `,
      store: new Vuex.Store({
        state: {
          textEditorPreviewMode: _tabMode,
        },
        actions: {
          setTextEditorPreviewMode ({ commit }, mode) {
            commit( 'setTextEditorPreviewMode', { mode } )
          },
        },
        mutations: {
          setTextEditorPreviewMode (state, payload) {
            state.textEditorPreviewMode = payload.mode
          },
        }
      })
    }
  });


storiesOf('Navigation', module)
.addDecorator(Centered)
.addDecorator(withKnobs)
.add('with some Addons', () => {
  const _isShow = boolean('isShow', false);
  const _loginUser = object('loginUser', {
    displayName: 'SampleUserName'
  });
  const _tabMode = select('tabMode', {
    'tab-editor' :'tab-editor',
    'tab-editor-and-preview': 'tab-editor-and-preview',
    'tab-preview': 'tab-preview',
  }, 'tab-editor-and-preview');


  return {
    components: { Navigation1, Navigation2 },
    template: `
      <md-app md-waterfall md-mode="fixed">
        <md-app-toolbar class="md-primary">
          <Navigation1 />
          <Navigation2 />
        </md-app-toolbar>
      </md-app>
    `,
    store: new Vuex.Store({
      state: {
        showSidebar: _isShow,
        loginUser: _loginUser,
        textEditorPreviewMode: _tabMode,
      },
      actions: {
        setShowSidebar ({ commit }, isShow ) {
          commit( 'setShowSidebar', { isShow })
        },
        setLoginUser({ commit }, loginUser) {
          commit( 'setLoginUser' , { loginUser })
        },
        setTextEditorPreviewMode ({ commit }, mode) {
          commit( 'setTextEditorPreviewMode', { mode } )
        },

      },
      mutations: {
        setShowSidebar (state, payload) {
          state.showSidebar = payload.isShow
        },
        setLoginUser (state, payload) {
          state.loginUser = payload.loginUser
        },
        setTextEditorPreviewMode (state, payload) {
          state.textEditorPreviewMode = payload.mode
        },
      }
    })
  };
})

storiesOf('Sidebar', module)
  .addDecorator(Centered)
  .addDecorator(withKnobs)
  .add('with some Addons', () => {
    const _isShow = boolean('isShow', true)
    const sysdate = new Date().toString()
    const _memos = object('memos', [
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
    ]);

    const _selectedMemoIndex = number('_selectedMemoIndex', 0)

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
            <md-button @click="showSidebar = true"C>Open Sidebar</md-button>
            <h1>App Content</h1>
            <p>App Content App Content App Content App Content App Content App Content App Content App Content App Content App Content App Content App Content App Content App Content App Content App Content App Content App Content App Content App Content App Content App Content App Content App Content App Content App Content App Content App Content App Content App Content App Content App Content App Content App Content App Content App Content App Content App Content App Content App Content App Content App Content App Content App Content App Content App Content App Content App Content App Content App Content App Content App Content App Content App Content App Content App Content App Content App Content App Content App Content App Content App Content App Content App Content App Content App Content App Content App Content App Content App Content App Content App Content App Content App Content App Content App Content App Content App Content App Content App Content App Content App Content App Content App Content App Content App Content App Content </p>
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
        }
      },
      methods: {
        ...mapActions([
          'setShowSidebar'
        ])
      },
      store: new Vuex.Store({
        state: {
          memos: _memos,
          selectedMemoIndex: _selectedMemoIndex,
          showSidebar: _isShow,
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

storiesOf('DeleteDialog', module)
  .addDecorator(Centered)
  .addDecorator(withKnobs)
  .add('with some Addons', () => {
    const _isShow = boolean('isShow', true)

    return {
      components: { DeleteDialog },
      template: `
        <DeleteDialog />
      `,
      store: new Vuex.Store({
        state: {
          showDeletingDialog: _isShow,
        },
        actions: {
          setShowDeletingDialog ( { commit }, isShow) {
            commit( 'setShowDeletingDialog', { isShow })
          },
        },
        mutations: {
          setShowDeletingDialog (state, payload) {
            state.showDeletingDialog = payload.isShow
          },
        }
      })
    };
  })


storiesOf('EditorContent', module)
  .addDecorator(Centered)
  .addDecorator(withKnobs)
  .add('with some Addons', () => {
    const sysdate = new Date().toString()
    const _memos = object('memos',[{
        markdown: '# メモその１' + `
          * 結構
          * たくさん
          * めもる
        `,
        tags: ['Java', 'JavaScript'],
        created: sysdate,
        updated: sysdate,
    }])
    const _selectedMemoIndex = number('_selectedMemoIndex', 0)


    const _tabMode = select('tabMode', {
      'tab-editor' :'tab-editor',
      'tab-editor-and-preview': 'tab-editor-and-preview',
      'tab-preview': 'tab-preview',
    }, 'tab-editor-and-preview');


    return {
      components: { EditorContent },
      template: `
      <md-app md-waterfall md-mode="fixed">
        <md-app-content>
          <EditorContent
            v-if="memos[selectedMemoIndex]"
            :memo="memos[selectedMemoIndex]"
            @saveMemo="action('emitSaveMemo')"
          ></EditorContent>
        </md-app-content>
      </md-app>
      `,
      computed: {
        ...mapState([
          'memos',
          'selectedMemoIndex',
        ])
      },
      store: new Vuex.Store({
        state: {
          memos: _memos,
          selectedMemoIndex: _selectedMemoIndex,
          textEditorPreviewMode: _tabMode,
        },
        actions: {
          setTextEditorPreviewMode ({ commit }, mode) {
            commit( 'setTextEditorPreviewMode', { mode } )
          },
        },
        mutations: {
          setTextEditorPreviewMode (state, payload) {
            state.textEditorPreviewMode = payload.mode
          },
        }
      })
    };
  })
  .add('with Navigation', () => {
    const sysdate = new Date().toString()
    const _memos = object('memos',[{
        markdown: '# メモその１' + `
          * 結構
          * たくさん
          * めもる
        `,
        tags: ['Java', 'JavaScript'],
        created: sysdate,
        updated: sysdate,
    }])
    const _selectedMemoIndex = number('_selectedMemoIndex', 0)


    const _tabMode = select('tabMode', {
      'tab-editor' :'tab-editor',
      'tab-editor-and-preview': 'tab-editor-and-preview',
      'tab-preview': 'tab-preview',
    }, 'tab-editor-and-preview');


    return {
      components: { EditorContent, Navigation2 },
      template: `
      <md-app md-waterfall md-mode="fixed">
        <md-app-toolbar class="md-primary">
          <Navigation2 />
        </md-app-toolbar>
        <md-app-content>
          <EditorContent
            v-if="memos[selectedMemoIndex]"
            :memo="memos[selectedMemoIndex]"
            @saveMemo="action('emitSaveMemo')"
          ></EditorContent>
        </md-app-content>
      </md-app>
      `,
      computed: {
        ...mapState([
          'memos',
          'selectedMemoIndex',
        ])
      },
      store: new Vuex.Store({
        state: {
          memos: _memos,
          selectedMemoIndex: _selectedMemoIndex,
          textEditorPreviewMode: _tabMode,
        },
        actions: {
          setTextEditorPreviewMode ({ commit }, mode) {
            commit( 'setTextEditorPreviewMode', { mode } )
          },
        },
        mutations: {
          setTextEditorPreviewMode (state, payload) {
            state.textEditorPreviewMode = payload.mode
          },
        }
      })
    };
  })