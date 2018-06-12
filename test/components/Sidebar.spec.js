import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex, { mapState, mapActions } from 'vuex'
import {
  MdToolbar,
  MdList,
  MdButton,
  MdTooltip
} from 'vue-material/dist/components'

import TestTargetVue from '../../components/Sidebar.vue'


jest.useFakeTimers();

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
            markdown: '# マークダウン形式のメモ' + `
              * 結構
              * たくさん
              * めもる
            `,
            tags: ['Java', 'JavaScript'],
            created: sysdate,
            updated: sysdate,
          },
          {
            markdown: '# ソースコードを含むメモ' + `
              \`\`\`Java
              public static void main(String[] args) {
                System.out.print("Hello!");
              }
              \`\`\`
            `,
            tags: [],
            created: sysdate,
            updated: sysdate,
          },
          {
            markdown: '',
            tags: ['空文字のメモ'],
            created: sysdate,
            updated: sysdate,
          },
          {
            markdown: '' + `
              * 1行目が空文字のメモ
            `,
            tags: [],
            created: sysdate,
            updated: sysdate,
          },
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
          payload.memo.markdown = payload.memo.markdown || '# 無題のメモ'
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
      mixins: [{
        methods: {
          // ストアの選択中Memoの更新日を更新して、DB保存
          saveMemos: () => Promise.resolve(true)
        }
      }]
    })
    jest.runAllTimers()
  })

  describe('初期表示', () => {

    test('スナップショット', () => {
      expect(wrapper).toMatchSnapshot()
    })

    test('メモの1行目がタイトルに表示される', () => {
      const $titles = wrapper.findAll('.memo-title')
      expect($titles.length).toBe(4)
      expect($titles.at(0).text()).toBe('# マークダウン形式のメモ')
      expect($titles.at(1).text()).toBe('# ソースコードを含むメモ')
      expect($titles.at(2).text()).toBe('')
      expect($titles.at(3).text()).toBe('')
    })

    test('1番目のメモが選択済になっている', () => {
      expect(store.state.selectedMemoIndex).toBe(0)
      const $listItems = wrapper.findAll('.memo-list-item')
      expect($listItems.at(0).attributes()['data-selected']).toBe('true')
    })
  })

  describe('2番目メモ選択時', () => {
    beforeEach(() => {
      const $secondlistItem = wrapper.findAll('.memo-list-item').at(1)
      $secondlistItem.trigger('click')
      jest.runAllTimers()
    })

    test('2番目のメモが選択済になっている', () => {
      expect(store.state.selectedMemoIndex).toBe(1)
      const $listItems = wrapper.findAll('.memo-list-item')
      expect($listItems.at(1).attributes()['data-selected']).toBe('true')
    })
  })

  describe('最後のメモ選択時', () => {
    beforeEach(() => {
      const $secondlistItem = wrapper.findAll('.memo-list-item').at(3)
      $secondlistItem.trigger('click')
      jest.runAllTimers()
    })

    test('最後のメモが選択済になっている', () => {
      expect(store.state.selectedMemoIndex).toBe(3)
      const $listItems = wrapper.findAll('.memo-list-item')
      expect($listItems.at(3).attributes()['data-selected']).toBe('true')
    })
  })

  describe('メモ追加ボタンクリック時', () => {
    beforeEach(() => {
      wrapper.find('[data-test="add-memo-button"]').trigger('click')
    })
    test('選択中メモはそのまま', () => {
      expect(store.state.selectedMemoIndex).toBe(0)
    })

    test('メモが１件追加されているべき', () => {
      const $titles = wrapper.findAll('.memo-title')
      expect($titles.length).toBe(5)
      expect($titles.at(4).text()).toBe('# 無題のメモ')
    })
  })
})
