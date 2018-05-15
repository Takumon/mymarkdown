<template>
  <div id="app">
    <div v-if="!loading" class="waiting">
      <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
    </div>

      <router-view
        v-on:loading-start="loading = false"
        v-on:loading-end="loading = true"
        ></router-view>
      <Notification></Notification>
  </div>
</template>

<script>
import Home from './components/Home.vue';
import Editor from './components/Editor.vue';
import Notification from './components/Notification.vue';

export default {
  name: 'app',
  data () {
    return {
      loading: false,
      isLogin: false,
    }
  },
  created: function() {
    firebase.auth().onAuthStateChanged(user => {
      this.isLogin = !!user;
      this.loading = true;
    })
  },
  components: {
    'Home': Home,
    'Editor': Editor,
    'Notification': Notification,
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
