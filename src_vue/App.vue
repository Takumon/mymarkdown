<template>
  <div id="app">
    <Navigation></Navigation>
    <div v-if="showLoading" class="waiting">
      <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
    </div>

    <router-view></router-view>
    <Snackbar></Snackbar>
  </div>
</template>

<script>
import Login from './components/Login.vue';
import Editor from './components/Editor.vue';
import Snackbar from './components/Snackbar.vue';
import { mapState } from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapState([
      'showLoading',
    ])
  },
  methods: mapState([
    'setLoginUser'
  ]),
  created: function() {
    firebase.auth().onAuthStateChanged(user => {
      this.setLoginUser(true)
    })
  },
  components: {
    'Login': Login,
    'Editor': Editor,
    'Snackbar': Snackbar,
  },
}
</script>

<style lang="scss">
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
