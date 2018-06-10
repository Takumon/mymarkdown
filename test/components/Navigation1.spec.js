import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import {
  MdIcon,
  MdButton,
} from 'vue-material/dist/components'

import TestSample from '../../components/Navigation1.vue'



const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(MdIcon)
localVue.use(MdButton)
localVue.use(Vuex)


describe('Navigation1.vue', () => {
  let mockAuth
  let wrapper
  let store
  let signOutSpy
  let setShowSnackbarSpy
  let routerReplaceSpy

  afterEach(() => {
    signOutSpy.mockReset()
    signOutSpy.mockRestore()
    routerReplaceSpy.mockReset()
    routerReplaceSpy.mockRestore()
    setShowSnackbarSpy.mockReset()
    setShowSnackbarSpy.mockRestore()
  });


  beforeEach(() => {
    const auth = require('../../plugins/auth.js')
    signOutSpy = jest.spyOn(auth, 'signOut')
    signOutSpy.mockImplementationOnce(() => Promise.resolve(true));

    const router = new VueRouter()
    routerReplaceSpy = jest.spyOn(router, 'replace')
    routerReplaceSpy.mockImplementationOnce((arg1, cb) => cb())

    setShowSnackbarSpy = jest.fn(() => Promise.resolve(true))

    store = new Vuex.Store({
      state: {
        loginUser: {
          displayName: 'SampleName'
        },
        showSidebar: true,
        showSnackbar: false,
        fromLogout: false
      },
      actions: {
        setLoginUser({ commit }, loginUser) {
          return new Promise((resolve, reject) => {
            commit( 'setLoginUser' , { loginUser })
            resolve()
          })
        },
        setShowLoading ({ commit }, isShow) {
          return new Promise((resolve, reject) => {
            commit( 'setShowLoading', { isShow })
            resolve()
          })
        },
        setShowSnackbar: setShowSnackbarSpy,
        setFromLogout( { commit }, fromLogout) {
          return new Promise((resolve, reject) => {
            commit( 'setFromLogout', { fromLogout })
            resolve()
          })
        }

      },
      mutations: {
        setLoginUser (state, payload) {
          state.loginUser = payload.loginUser
        },
        setShowSnackbar (state, payload) {
          state.showSnackbar = payload.isShow
          // textを指定してる時のみ更新
          if (payload.text) {
            state.snackbarText = payload.text
          }
        },
        setShowSidebar (state, payload) {
          state.showSidebar = payload.isShow
        },
        setFromLogout (state, payload) {
          state.fromLogout = payload.fromLogout
        },
      }
    })


    wrapper = shallowMount(TestSample, {
      store,
      localVue,
      router,
    })
  })

  describe('初期表示', () => {

    test('スナップショット', () => {
      expect(wrapper).toMatchSnapshot()
    })

    test('ログインユーザ名が表示される', () => {
      const $userInfo = wrapper.find('.user-info')
      expect($userInfo.text()).toContain('SampleName')
    })
  })

  describe('ログアウトボタンクリック時', () => {

    beforeEach(() => {
      expect(signOutSpy).toHaveBeenCalledTimes(0)
      expect(setShowSnackbarSpy).toHaveBeenCalledTimes(0)
      expect(setShowSnackbarSpy).toHaveBeenCalledTimes(0)
      const $logoutButton = wrapper.find('.user-info-area button')
      $logoutButton.trigger('click')
    })

    test('singOutが呼ばれる', () => {
      expect(signOutSpy).toHaveBeenCalledTimes(1)

      expect(routerReplaceSpy).toHaveBeenCalledTimes(1)
      expect(routerReplaceSpy).toHaveBeenNthCalledWith(1,
        '/login',
        expect.any(Function)
      )

      expect(setShowSnackbarSpy).toHaveBeenCalledTimes(1)
      expect(setShowSnackbarSpy).toHaveBeenNthCalledWith(1,
        expect.anything(),
        {
          isShow: true,
          text: 'Logged out'
        },
        undefined // なぜかundefinedを指定しないと成功しない
      )
    })

    test('ログイン画面に遷移する', () => {
      expect(routerReplaceSpy).toHaveBeenCalledTimes(1)
      expect(routerReplaceSpy).toHaveBeenNthCalledWith(1,
        '/login',
        expect.any(Function)
      )
    })

    test('ログアウト完了のスナックバーが表示される', () => {
      expect(setShowSnackbarSpy).toHaveBeenCalledTimes(1)
      expect(setShowSnackbarSpy).toHaveBeenNthCalledWith(1,
        expect.anything(),
        {
          isShow: true,
          text: 'Logged out'
        },
        undefined // なぜかundefinedを指定しないと成功しない
      )
    })
  })
})
