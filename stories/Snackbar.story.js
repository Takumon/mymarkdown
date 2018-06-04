import Vue from 'vue';
import Vuex, { mapActions, mapState } from 'vuex'

import { storiesOf } from '@storybook/vue';
import Centered from '@storybook/addon-centered'

import store from '~/store'
import Snackbar from '~/components/Snackbar.vue'

storiesOf('Snackbar', module)
  .addDecorator(Centered)
  .add('opened', () => {
    const isShow = true
    const text = 'SampleText'

    return {
      components: { Snackbar },
      template: `
          <Snackbar />
      `,
      store: new Vuex.Store({
        state: {
          showSnackbar: isShow,
          snackbarText: text,
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
  })
  .add('closed', () => {
    const isShow = false
    const text = ''

    return {
      components: { Snackbar },
      template: `
        <div>
          <md-button class="md-icon-button md-raised" @click="setShowSnackbar({isShow: true, text: 'SampleText'})">
            <i class="fas fa-arrow-alt-circle-up"></i>
          </md-button>
          <Snackbar />
        </div>
      `,
      methods: {
        ...mapActions([
          'setShowSnackbar'
        ])
      },
      store: new Vuex.Store({
        state: {
          showSnackbar: isShow,
          snackbarText: text,
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
  })

