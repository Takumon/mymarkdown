<template>
  <div id="app">
    <div v-if="showLoading" class="waiting">
      <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
    </div>

    <nuxt/>
    <Snackbar></Snackbar>
  </div>
</template>

<script>
import Snackbar from '~/components/Snackbar.vue';
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState([
      'showLoading',
    ])
  },
  components: {
    'Snackbar': Snackbar,
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.waiting {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

h1, h2 {
  font-weight: normal;
}

a {
  color: #42b983;
}
</style>
