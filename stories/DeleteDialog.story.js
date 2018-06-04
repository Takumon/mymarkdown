import Vue from 'vue';
import Vuex, { mapActions, mapState } from 'vuex'

import { storiesOf } from '@storybook/vue';
import Centered from '@storybook/addon-centered'

import store from '~/store'
import DeleteDialog from '~/components/DeleteDialog.vue'


storiesOf('DeleteDialog', module)
  .addDecorator(Centered)
  .add('default view', () => {
    const _isShow = true

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

