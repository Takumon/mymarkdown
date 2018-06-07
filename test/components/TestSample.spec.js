import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import TestSample from '../../components/TestSample.vue'


const localVue = createLocalVue()
localVue.use(Vuex)


describe('TestSample.js', () => {
  let wrapper
  let store
  const list = ['Coffee', 'Tea', 'Snicker', 'Mars']

  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        showLoading: false,
      },
      actions: {
        setShowLoading ({ commit }, isShow) {
          return new Promise((resolve, reject) => {
            commit( 'setShowLoading', { isShow })
            resolve()
          })
        },
      },
      mutations: {
        setShowLoading (state, payload) {
          state.showLoading = payload.isShow
        },
      }
    })

    wrapper = shallowMount(TestSample, {
      propsData: { list },
      store,
      localVue
    })
  })

  // test('TestSample.vue スナップショット', () => {
  //   t.snapshot({ html: wrapper.html() })
  // })

  test('TestSample.vue 初期表示 リストが表示される', () => {
    const $items = wrapper.findAll('li').wrappers

    $items.forEach(($item, index) => {
      expect($item.text()).toEqual(list[index])
    })
  })

  test('TestSample.vue 初期表示 ボタンがfalseで表示される', () => {
    const $button = wrapper.find('#toggleLoading')
    expect($button.text()).toEqual('false')
  })

  test('TestSample.vue ボタンクリック後 ボタンがtrueで表示される', () => {
    const $button = wrapper.find('#toggleLoading')
    $button.trigger('click')
    expect($button.text()).toEqual('true')
  })
})
