<template>
  <div id="app">
    <div v-if="!hasCheckedAuth" class="waiting">
      <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
    </div>
    <template v-if="hasCheckedAuth">
      <Home v-if="!isLogin"
        v-on:login-check-start="hasCheckedAuth = false"
        v-on:login-check-end="hasCheckedAuth = true"
        ></Home>
      <Editor v-if="isLogin" :user="userData"></Editor>
    </template>
  </div>
</template>

<script>
import Home from './components/Home.vue';
import Editor from './components/Editor.vue';

export default {
  name: 'app',
  data () {
    return {
      hasCheckedAuth: false,
      isLogin: false,
      userData: null,
    }
  },
  created: function() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.isLogin = true;
        this.userData = user;
      } else {
        this.isLogin = false;
        this.userData = null;
      }

      this.hasCheckedAuth = true;
    })
  },
  components: {
    'Home': Home,
    'Editor': Editor
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
