import test from 'ava'
import { mount } from '@vue/test-utils'
import TestSample from '../../components/TestSample.vue'

let wrapper

const list = ['Coffee', 'Tea', 'Snicker', 'Mars']

test.beforeEach(() => {
  wrapper = mount(TestSample, {
    propsData: { list },
  })
})

test('TestSample.vue スナップショット', (t) => {
  t.snapshot({ html: wrapper.html() })
})

test('TestSample.vue リストを表示', (t) => {
  const $items = wrapper.findAll('li').wrappers

  $items.forEach(($item, index) => {
    t.is($item.text(), list[index])
  })
})