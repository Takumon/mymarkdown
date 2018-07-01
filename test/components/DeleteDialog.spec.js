import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex, { mapState, mapActions } from 'vuex'
import VueMaterial from 'vue-material'
import TestTargetVue from '../../components/DeleteDialog.vue'


jest.useFakeTimers();

describe('DeleteDialog.vue', () => {

  let wrapper
  let store
  let deleteMemoSpy

  afterEach(() => {
    deleteMemoSpy.mockReset()
    deleteMemoSpy.mockRestore()
  })

  beforeEach(() => {
    const localVue = createLocalVue()

    localVue.use(VueMaterial)
    localVue.use(Vuex)

    deleteMemoSpy = jest.fn(() => Promise.resolve(true))

    store = new Vuex.Store({
      state: {
        showDeletingDialog: true,
      },
      actions: {
        setShowDeletingDialog ( { commit }, isShow) {
          return new Promise((resolve, reject) => {
            commit( 'setShowDeletingDialog', { isShow })
            resolve()
          })
        },
      },
      mutations: {
        setShowDeletingDialog (state, payload) {
          state.showDeletingDialog = payload.isShow
        },
      }
    })

    wrapper = mount(TestTargetVue, {
      store,
      localVue,
      mixins: [{
        methods: {
          deleteMemo: deleteMemoSpy
        }
      }],
      attachToDocument: true
    })
    jest.runAllTimers()
  })

  describe('初期表示', () => {

    test('スナップショット', () => {
      const $dialog = wrapper.find('[data-test="delete-dialog"]')
      expect($dialog).toMatchSnapshot()
    })

    test('ダイアログが表示される', () => {
      expect(store.state.showDeletingDialog).toBe(true)
      const $dialogTitle = wrapper.find('[data-test="delete-dialog"] .md-title')
      expect($dialogTitle.isVisible()).toBe(true)
    })
  })

  describe('キャンセルボタンクリック時', () => {
    beforeEach(() => {
      const $cancelButton = wrapper.findAll('[data-test="delete-dialog"] button').at(0)
      expect($cancelButton.text()).toBe('Cancel')
      $cancelButton.trigger('click')
      jest.runAllTimers()
    })

    test('ダイアログが非表示', () => {
      store.dispatch('setShowDeletingDialog', false)
    })
  })

  describe('削除ボタンクリック時', () => {
    beforeEach(() => {
      expect(deleteMemoSpy).toHaveBeenCalledTimes(0)
      const $cancelButton = wrapper.findAll('[data-test="delete-dialog"] button').at(1)
      expect($cancelButton.text()).toBe('Delete')
      $cancelButton.trigger('click')
      jest.runAllTimers()
    })

    test('削除処理が呼ばれている', () => {
      expect(deleteMemoSpy).toHaveBeenCalledTimes(1)
    })

    test('ダイアログが非表示', () => {
      expect(store.state.showDeletingDialog).toBe(false)
    })

  })

})
