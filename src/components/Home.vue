<template>
  <div id="home">
    <h1 class="app-title">{{app.title}}</h1>
    <p class="app-discription">{{app.discription}}</p>
    <md-content class="content md-elevation-6">
      <div class="content-discription">Login with ...</div>
      <div class="login-button-area">
        <md-button
          class="md-raised md-primary"
          @click="loginWithGoogle"><i class="btn-icon fab fa-google"></i> Google</md-button>
        <md-button
          class="md-raised md-primary"
          @click="loginWithFacebook"><i class="btn-icon fab fa-facebook"></i> Facebook</md-button>
        <md-button
          class="md-raised md-primary"
          @click="loginWithTwitter"><i class="btn-icon fab fa-twitter"></i> Twitter</md-button>
        <md-button
          class="md-raised md-primary"
          @click="loginWithGithub"><i class="btn-icon fab fa-github"></i> GitHub</md-button>
      </div>
    </md-content>
  </div>
</template>

<script>
  export default {
    name: 'home',
    data () {
      return {
        app: {
          title: 'Markdown Mome',
          discription: 'Online markdown memo',
        }
      };
    },
    // 認証失敗時の処理
    methods: {
      loginWithGoogle: function() {
        this.loginWith(new firebase.auth.GoogleAuthProvider());
      },
      loginWithFacebook: function() {
        this.loginWith(new firebase.auth.FacebookAuthProvider());
      },
      loginWithTwitter: function() {
        this.loginWith(new firebase.auth.TwitterAuthProvider());
      },
      loginWithGithub: function() {
        this.loginWith(new firebase.auth.GithubAuthProvider())
      },
      loginWith: function(provider) {
        this.$emit('login-check-start')
        firebase.auth().signInWithPopup(provider)
        .then(function(result) {
          this.$emit('login-check-end')
        })
        .catch(function(error) {
          this.$emit('login-check-end')
          alert('[' + error.code + ']' + error.message);
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
.app-title {
  font-size: 64px;
  margin-top: 64px;
  margin-bottom: 48px;
}

.app-discription {
    margin-bottom: 64px;
    color: #000882;
}

.content {
  max-width: 480px;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  padding: 36px 0;
  border-radius: 2px;
}
.content-discription {
  text-align: left;
  font-size: 36px;
  text-indent: 36px;
  color: #0c2ad0;
  font-weight: 100;
  border-left: 6px solid;
  height: 48px;
  line-height: 48px;
  text-transform: uppercase;
}
.login-button-area {
  margin-top: 24px;
  margin-bottom: 24px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;

  button.md-raised {
    max-width: 360px;
    width: 80%;
    margin: 6px;

    .btn-icon {
      margin-right: 10px;
    }
  }
}

@media (max-width: 586px) {
  .app-title {
    font-size: 36px;
    margin-bottom: 24px;
  }
  .app-discription {
    margin-bottom: 36px;
  }
  .content-discription {
    font-size: 24px;
    line-height: 36px;
    height: 36px;
  }
}
</style>
