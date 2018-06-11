import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import {
  MdToolbar,
  MdList,
  MdButton,
  MdTooltip
} from 'vue-material/dist/components'

import TestTargetVue from '../../components/Sidebar.vue'



describe('Sidebar.vue', () => {

  let wrapper
  let store
  beforeEach(() => {
    const localVue = createLocalVue()
    localVue.use(MdToolbar)
    localVue.use(MdList)
    localVue.use(MdButton)
    localVue.use(MdTooltip)
    localVue.use(Vuex)

    const sysdate = new Date().toString()

    store = new Vuex.Store({
      state: {
        memos: [
          {
            markdown: '# メモその１' + `
              * 結構
              * たくさん
              * めもる
            `,
            tags: ['Java', 'JavaScript'],
            created: sysdate,
            updated: sysdate,
          },
          {
            markdown: '# メモその2' + `
              * memo
            `,
            tags: [],
            created: sysdate,
            updated: sysdate,
          }
        ],
        selectedMemoIndex: 0,
        showSidebar: false,
      },
      actions: {
        setMemos ( { commit}, memos) {
          return new Promise((resolve, reject) => {
            commit('setMemos', { memos })
            resolve()
          })
        },
        addMemo ( { commit }, memo = {}) {
          return new Promise((resolve, reject) => {
            commit('addMemo', { memo })
            resolve()
          })
        },
        setSelectedMemoIndex( { commit }, selectedMemoIndex) {
          return new Promise((resolve, reject) => {
            commit( 'setSelectedMemoIndex', { selectedMemoIndex })
            resolve()
          })
        },
        setShowSidebar ({ commit }, isShow ) {
          return new Promise((resolve, reject) => {
            commit( 'setShowSidebar', { isShow })
            resolve()
          })
        },


      },
      mutations: {
        setMemos (state, payload) {
          state.memos = payload.memos
        },
        addMemo (state, payload) {
          const sysdate = new Date().toString()
          payload.memo.markdown = payload.memo.markdown || '無題のメモ'
          payload.memo.tags = payload.memo.tags || []
          payload.memo.created = payload.memo.created || sysdate
          payload.memo.updated = payload.memo.updated || sysdate

          state.memos.push(payload.memo)
        },
        setSelectedMemoIndex(state, payload) {
          state.selectedMemoIndex = payload.selectedMemoIndex
        },
        setShowSidebar (state, payload) {
          state.showSidebar = payload.isShow
        },
      }
    })

    wrapper = shallowMount(TestTargetVue, {
      store,
      localVue,
    })
  })

  describe('初期表示', () => {

    test('スナップショット', () => {
      expect(wrapper).toMatchSnapshot()
    })

  })
})
