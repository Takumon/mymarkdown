<template>
<div>
  <ul>
    <li v-for="(item, index) in list" :key="index">
      {{ item }}
    </li>
  </ul>
  <button id="toggleLoading" @click="toggle">{{showLoading}}</button>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'testSample',
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
  computed: {
    ...mapState([
      'showLoading'
    ]),
  },
  methods: {
    ...mapActions([
      'setShowLoading',
    ]),
    toggle() {
      this.setShowLoading(! this.showLoading)
    }
  },
}
</script>