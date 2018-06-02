<template>
  <div id="login">
    <h1 class="app-title">{{app.title}}</h1>
    <p class="app-discription">{{app.discription}}</p>
    <md-content class="content md-elevation-6">
      <div class="content-discription">Login with ...</div>
      <div class="login-button-area">
        <md-button
          class="md-raised md-primary"
          @click="login(LOGIN_PROVIDER.google)"><i class="btn-icon fab fa-google"></i> Google</md-button>
        <md-button
          class="md-raised md-primary"
          @click="login(LOGIN_PROVIDER.facebook)"><i class="btn-icon fab fa-facebook"></i> Facebook</md-button>
        <md-button
          class="md-raised md-primary"
          @click="login(LOGIN_PROVIDER.twitter)"><i class="btn-icon fab fa-twitter"></i> Twitter</md-button>
        <md-button
          class="md-raised md-primary"
          @click="login(LOGIN_PROVIDER.github)"><i class="btn-icon fab fa-github"></i> GitHub</md-button>
      </div>
      <div class="user-count-area">
        Now {{app.userCount}} users.
      </div>
    </md-content>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import axios from 'axios';
import { loginWith, LOGIN_PROVIDER } from '~/plugins/auth'


export default {
  name: 'login',
  data () {
    return {
      LOGIN_PROVIDER: LOGIN_PROVIDER,
      app: {
        title: 'Markdown Mome',
        discription: 'Online markdown memo',
        userCount: null,
      },
    };
  },
  created: function() {
    axios.get('https://us-central1-mymarkdown-233ca.cloudfunctions.net/getUserCount')
      .then(res => {
        this.app.userCount = res.data.count;
      });
  },
  // 認証失敗時の処理
  methods: {
    ...mapActions([
      'setShowLoading',
      'setLoginUser',
      'setShowSnackbar',
    ]),
    login: function(provider) {
      this.setShowLoading(true)

      loginWith(provider)
        .then(result => {
          this.setLoginUser(result.user)
          this.$router.replace('/editor', () => {
            this.setShowLoading(false)
            this.setShowSnackbar({
              isShow: true,
              text: 'Logged in'
            })
          });
        })
        .catch(error => {
          this.setShowLoading(false)
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

.user-count-area {
  color: #7d7d7d;
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
