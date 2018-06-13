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
        snackbarText: '',
        showSnackbar: false,
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

  xdescribe('初期表示', () => {
    test('なにも表示されていない', () => {
      expect(wrapper.html()).toBe(undefined)
    })
  })


  describe('スナックバー表示時', () => {

    beforeEach(() => {
      store.dispatch('setShowSnackbar', {
        isShow: true,
        text: 'SampleText'
      })
      jest.runAllTimers()
    })

    test('スナップショット', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })

    xtest('スナックバーが表示されている', () => {
      const $text = wrapper.find('[data-test="snackbar-text"]')
      expect($text.text()).toBe('SampleText')
    })

    describe('閉じるボタンクリック時', () => {
      beforeEach(() => {
        const $closeButton = wrapper.find('[data-test="close-button"]')
        $closeButton.trigger('click')
        jest.runAllTimers()
      })

      test('スナックバーが表示されてない', () => {
        expect(wrapper.html()).toBe(undefined)
        expect(store.state.showSnackbar).toBe(false)
      })

      describe('再度スナックバー表示時', () => {
        beforeEach(() => {
          store.dispatch('setShowSnackbar', {
            isShow: true,
            text: 'NewSampleText'
          })
        })

        test('スナックバーが表示される', () => {
          expect(store.state.showSnackbar).toBe(true)
          const $text = wrapper.find('[data-test="snackbar-text"]')
          expect($text.text()).toBe('NewSampleText')
        })

        describe('4秒後', () => {
          beforeEach(() => {
            jest.advanceTimersByTime(4000)
          })

          test('スナックバーが非表示', () => {
            expect(store.state.showSnackbar).toBe(undefined)
          })
        })

      })
    })
  })
})