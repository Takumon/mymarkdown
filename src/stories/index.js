import Vue from 'vue';
import Vuex from 'vuex'

import { storiesOf } from '@storybook/vue';
import { linkTo } from '@storybook/addon-links'
import { withNotes } from '@storybook/addon-notes'
import {
  withKnobs,
  text,
  color,
  boolean,
  select,
} from '@storybook/addon-knobs'
import Centered from '@storybook/addon-centered'

import store from '../store'


import Navigation2 from '../components/Navigation2.vue'
import Snackbar from '../components/Snackbar.vue'

storiesOf('Snackbar', module)
  .addDecorator(Centered)
  .addDecorator(withKnobs)
  .add('with some Addons', () => {
    const _isShow = boolean('isShow', true)
    const _text = text('text', 'SampleText')
    return {
      components: { Snackbar },
      template: `
          <Snackbar></Snackbar>
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


storiesOf('Navigation2', module)
  .addDecorator(Centered)
  .addDecorator(withKnobs)
  .add('with some Addons', () => {
    const _tabMode = select('isShow', {
      'tab-editor' :'tab-editor',
      'tab-editor-and-preview': 'tab-editor-and-preview',
      'tab-preview': 'tab-preview',
    }, 'tab-editor-and-preview');

    return {
      components: { Navigation2 },
      template: `
        <Navigation2></Navigation2>
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

