import Vue from 'vue';
import Vuex, { mapActions, mapState } from 'vuex'

import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/vue';
import Centered from '@storybook/addon-centered'

import store from '~/store'
import EditorContent from '~/components/EditorContent.vue'
import Navigation2 from '~/components/Navigation2'


storiesOf('EditorContent-Navigator2', module)
  .addDecorator(Centered)
  .add('some text', () => {
    const sysdate = new Date().toString()
    const _memos = [{
        markdown: '# メモその１' + `
  * 結構
  * たくさん
  * めもる`,
        tags: ['Java', 'JavaScript'],
        created: sysdate,
        updated: sysdate,
    }]
    const _selectedMemoIndex = 0
    const _tabMode = 'tab-editor-and-preview';

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