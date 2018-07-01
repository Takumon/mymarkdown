import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex, { mapState, mapActions } from 'vuex'
import vuescroll from 'vue-scroll'
import {
  MdChips,
} from 'vue-material/dist/components'

import TestTargetVue from '../../components/EditorContent.vue'

jest.useFakeTimers()

describe('EditContent.vue', () => {
  let wrapper
  let store
  beforeEach(() => {
    const localVue = createLocalVue()
    localVue.use(MdChips)
    localVue.use(vuescroll)
    localVue.use(Vuex)

    store = new Vuex.Store({
      state: {
        textEditorPreviewMode: 'tab-editor-and-preview',
      },
      actions: {
        setTextEditorPreviewMode ({ commit }, mode) {
          return new Promise((resolve, reject) => {
            commit( 'setTextEditorPreviewMode', { mode } )
            resolve()
          })
        },
      },
      mutations: {
        setTextEditorPreviewMode (state, payload) {
          state.textEditorPreviewMode = payload.mode
        },
      }
    })

    const sysdate = new Date(2018,1,1,12,0)
    const memo = {
      markdown: '# マークダウン形式のメモ' + `
* 結構
* たくさん
* めもる
* [ ] チェックボックスその１
* [x] チェックボックスその２

\`\`\`
public static void main(String[] args) {
  System.out.println("Test!");
}
\`\`\`


\`\`\`Java
public static void main(String[] args) {
  System.out.println("Test!");
}
\`\`\`
`,
      tags: ['Java', 'JavaScript'],
      created: sysdate,
      updated: sysdate,
    }

    wrapper = shallowMount(TestTargetVue, {
      store,
      localVue,
      propsData: { memo },
    })
    jest.runAllTimers()
  })

  describe('初期表示', () => {
    test('スナップショット', () => {
      expect(wrapper.html().replace(/"md-chips-[^"]+"/, '"md-chips-tempid"')).toMatchSnapshot()
    })
  })

  describe('タブモードをプレビューにした時', () => {
    beforeEach(() => {
      store.dispatch('setTextEditorPreviewMode', 'tab-preview')
      jest.runAllTimers()
    })

    test('編集部分は表示されていなくて、プレビュー部分が表示されている、', () => {
      const editorContent = wrapper.find('[data-test="editor-content"]')
      expect(editorContent.classes()).toContain('tab-preview')
    })
  })

  describe('タブモードをエディターにした時', () => {
    beforeEach(() => {
      store.dispatch('setTextEditorPreviewMode', 'tab-editor')
      jest.runAllTimers()
    })

    test('編集部分は表示されていて、プレビュー部分が表示されていない', () => {
      const editorContent = wrapper.find('[data-test="editor-content"]')
      expect(editorContent.classes()).toContain('tab-editor')
    })
  })

  describe('キーアップ時', () => {
    beforeEach(() => {
      const editor = wrapper.find('[data-test="editor"]')
      editor.trigger('keyup', {
        ctrlKey: true,
        witch: 83,
        keyCode: 83
      })
      jest.runAllTimers()
    })

    test('saveMemoイベントが発行されている', () => {
      expect(wrapper.emitted('saveMemo')).toBeTruthy()
    })
  })





})