import Vue from 'vue';
import Vuex from 'vuex'

import { storiesOf } from '@storybook/vue';
import {
  withKnobs,
  select,
} from '@storybook/addon-knobs'
import Centered from '@storybook/addon-centered'
import store from '~/store'
import Navigation2 from '~/components/Navigation2.vue'


storiesOf('Navigation2', module)
  .addDecorator(Centered)
  .addDecorator(withKnobs)
  .add('default view', () => {
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

