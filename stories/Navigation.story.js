import Vue from 'vue';
import Vuex from 'vuex'
import { storiesOf } from '@storybook/vue';
import { withNotes } from '@storybook/addon-notes'
import {
  withKnobs,
  select,
} from '@storybook/addon-knobs'
import Centered from '@storybook/addon-centered'
import store from '~/store'

import Navigation1 from '~/components/Navigation1.vue'
import Navigation2 from '~/components/Navigation2.vue'

storiesOf('Navigation', module)
  .addDecorator(Centered)
  .add('default view', () => {
    const _loginUser = {
      displayName: 'SampleUserName'
    };
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
          showSidebar: false,
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
