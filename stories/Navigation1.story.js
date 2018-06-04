import Vue from 'vue';
import Vuex from 'vuex'

import { storiesOf } from '@storybook/vue';
import { withNotes } from '@storybook/addon-notes'
import Centered from '@storybook/addon-centered'

import store from '~/store'


import Navigation1 from '~/components/Navigation1.vue'

storiesOf('Navigation1', module)
  .addDecorator(Centered)
  .add('default view', () => {
    const _loginUser = {
      displayName: 'SampleUserName'
    };

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
          showSidebar: false,
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
