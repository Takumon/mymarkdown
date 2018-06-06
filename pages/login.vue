<template>
  <div id="login">
    <img src="title-login.png">
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
import { mapActions, mapState } from 'vuex'
import axios from 'axios';
import { authInLogin, loginWith, LOGIN_PROVIDER } from '~/plugins/auth'


export default {
  name: 'login',
  asyncData() {
    return axios.get('https://us-central1-mymarkdown-233ca.cloudfunctions.net/getUserCount')
      .then(res => {
        return {
          LOGIN_PROVIDER: LOGIN_PROVIDER,
          app: {
            discription: 'MarkDown Online Memo',
            userCount: res.data.count,
          },
        };
      });
  },
  fetch({ store }) {
    return store.dispatch('setShowLoading', true)
  },
  created: function() {
    authInLogin().then(user => {
      // ログアウト画面からの遷移の場合
      if (this.fromLogout) {
        return this.setFromLogout(false).then(() => {
          return this.setShowLoading(false)
        })
      }

      // リダイレクトログイン未実施の場合
      if (!user) {
        return this.setShowLoading(false)
      }

      // リダイレクトログインの場合
      this.setLoginUser(user).then(() => {
        this.$router.replace('/editor', () => {
          this.setShowSnackbar({
            isShow: true,
            text: 'Logged in'
          })

          // ローディング解除はログイン先の画面初期処理に託す
        });
      })
    })
  },
  computed: {
    ...mapState([
      'fromLogout'
    ])
  },
  // 認証失敗時の処理
  methods: {
    ...mapActions([
      'setShowLoading',
      'setLoginUser',
      'setShowSnackbar',
      'setFromLogout'
    ]),
    login (providor) {
      this.setShowLoading(true).then(() => {
        loginWith(providor)
      })
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
