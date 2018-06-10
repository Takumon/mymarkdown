<template>
<div>
  <ul>
    <li v-for="(item, index) in list" :key="index">
      {{ item }}
    </li>
  </ul>
  <md-button>Default</md-button>
  <button id="toggleLoading" @click="toggle">{{showLoading}}</button>
  <md-button class="md-primary" @click="showSnackbar = !showSnackbar">{{showSnackbar}}</md-button>

  <md-snackbar :md-position="center" :md-duration="Infinity" :md-active="showSnackbar" md-persistent>
    <span>Sample!</span>
    <md-button class="md-primary" @click="showSnackbar = false">Retry</md-button>
  </md-snackbar>
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
  data: function() {
    return {
      showSnackbar: true
    }
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