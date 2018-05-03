<template>
  <div id="home">
    <h1>{{msg}}</h1>
    <div class="login-button-area">
      <div class="btn-wrapper">
        <md-button
          class="md-raised md-primary"
          @click="loginWithGoogle"><i class="btn-icon fab fa-google"></i> Google アカウントでログイン</md-button>
      </div>
      <div class="btn-wrapper">
        <md-button
          class="md-raised md-primary"
          @click="loginWithFacebook"><i class="btn-icon fab fa-facebook"></i> Facebook アカウントでログイン</md-button>
      </div>
      <div class="btn-wrapper">
        <md-button
          class="md-raised md-primary"
          @click="loginWithTwitter"><i class="btn-icon fab fa-twitter"></i> Twitter アカウントでログイン</md-button>
      </div>
      <div class="btn-wrapper">
        <md-button
          class="md-raised md-primary"
          @click="loginWithGithub"><i class="btn-icon fab fa-github"></i> GitHub アカウントでログイン</md-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'home',
    data () {
      return {
        msg: 'Welcome to MyMarkdown'
      }
    },
    // 認証失敗時の処理
    methods: {
      loginWithGoogle: function() {
        firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider());
      },
      loginWithFacebook: function() {
        firebase.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider());
      },
      loginWithTwitter: function() {
        firebase.auth().signInWithPopup(new firebase.auth.TwitterAuthProvider());
      },
      loginWithGithub: function() {
        firebase.auth().signInWithPopup(new firebase.auth.GithubAuthProvider());
      },
    }
  }
</script>

<style lang="scss" scoped>
.login-button-area {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;

  .btn-wrapper {
    width: 360px;

    button {
      width: 100%;

      .btn-icon {
        margin-right: 10px;
      }
    }
  }
}
</style>
