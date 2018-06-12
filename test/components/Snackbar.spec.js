import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex, { mapState, mapActions } from 'vuex'
import {
  MdSnackbar,
  MdButton,
} from 'vue-material/dist/components'

import TestTargetVue from '../../components/Snackbar.vue'


jest.useFakeTimers();

describe('Snackbar.vue', () => {

  let wrapper
  let store
  beforeEach(() => {
    const localVue = createLocalVue()
    localVue.use(MdSnackbar)
    localVue.use(MdButton)
    localVue.use(Vuex)

    const sysdate = new Date().toString()

    store = new Vuex.Store({
      state: {
        snackbarText: 'SampleText',
        showSnackbar: true,
      },
      actions: {
        setShowSnackbar ({ commit }, { isShow, text}) {
          return new Promise((resolve, reject) => {
            commit( 'setShowSnackbar', { isShow, text })
            resolve()
          })
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

    test('スナックバーが表示されている', () => {
      const $text = wrapper.find('[data-test="snackbar-text"]')
      expect($text.text()).toBe('SampleText')
    })
  })

  describe('閉じるボタンクリック時', () => {
    beforeEach(() => {
      expect(store.state.showSnackbar).toBe(true)
      wrapper.find('[data-test="close-button"]').trigger('click')
      jest.runAllTimers()
    })

    test('スナックバーが表示されてない', () => {
      expect(store.state.showSnackbar).toBe(false)
    })
  })

})
