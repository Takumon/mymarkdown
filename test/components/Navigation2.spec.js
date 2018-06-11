import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import {
  MdIcon,
  MdButton,
  MdTabs,
} from 'vue-material/dist/components'

import TestTargetVue from '../../components/Navigation2.vue'

jest.useFakeTimers();

describe('Navigation2.vue', () => {
  let wrapper
  let store

  beforeEach(() => {
    const localVue = createLocalVue()
    localVue.use(MdIcon)
    localVue.use(MdButton)
    localVue.use(MdTabs)
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

    wrapper = shallowMount(TestTargetVue, {
      store,
      localVue,
    })
    jest.runAllTimers()
  })

  describe('初期表示', () => {

    test('スナップショット', () => {
      expect(wrapper).toMatchSnapshot()
    })

    test('編集かつプレビューモードが有効', () => {
      expect(store.state.textEditorPreviewMode).toEqual('tab-editor-and-preview')

      const $editorAndPrevieweTabButton = wrapper.find('[mdicon="chrome_reader_mode"]')
      expect($editorAndPrevieweTabButton.classes()).toContain('md-active')
    })
  })

  describe('プレビュータブクリック時', () => {
    beforeEach(() => {
      const $previewTabButton = wrapper.find('[mdicon="description"]')
      $previewTabButton.trigger('click')
    })

    test('プレビューモードが有効', () => {
      const $previewTabButton = wrapper.find('[mdicon="description"]')
      expect($previewTabButton.classes()).toContain('md-active')
      expect(store.state.textEditorPreviewMode).toEqual('tab-preview')
    })
  })

  describe('エディタータブクリック時', () => {
    beforeEach(() => {
      const $editorTabButton = wrapper.find('[mdicon="mode_edit"]')
      $editorTabButton.trigger('click')
    })

    test('エディターモードが有効', () => {
      const $editorTabButton = wrapper.find('[mdicon="mode_edit"]')
      expect($editorTabButton.classes()).toContain('md-active')
      expect(store.state.textEditorPreviewMode).toEqual('tab-editor')
    })
  })

})
