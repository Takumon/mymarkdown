<template>
  <div class="md-toolbar-row">
    <div class="md-toolbar-section-start">
      <md-button v-if="!showSidebar" class="md-icon-button" @click="setShowSidebar(true)">
        <md-icon>menu</md-icon>
      </md-button>
      <span class="md-title">Markdown Mome</span>
    </div>

    <div class="md-toolbar-section-end user-info-area">
      <div class="user-info"><i class="fas fa-user"></i> {{loginUser.displayName}}</div>
      <md-button
        @click="logout"><i class="btn-icon fas fa-sign-out-alt"></i> LOOUT</md-button>
    </div>
  </div>
</template>

<script>
import { mapState , mapActions } from 'vuex'

export default {
  name: 'Navigation1',
  computed: {
    showSidebar: {
      get () {
        return this.$store.state.showSidebar
      },
      set (isShow) {
        this.setShowSidebar(isShow)
      }
    },
    ...mapState([
      'loginUser'
    ]),
  },
  methods: {
    ...mapActions([
      'setShowSidebar',
      'setShowSnackbar',
    ]),
    logout: function() {
      firebase.auth().signOut();
      this.$router.replace('/login', () => {
        this.setShowSnackbar({
          isShow: true,
          text: 'Logged out'
        })
      });
    },
  },
}
</script>

<style lang="scss" scoped>
.md-title {
  white-space: nowrap;
}

.user-info-area {
  display: flex;
  justify-content: flex-end;
  align-content: stretch;
  margin-left: auto;

  .user-info {
    line-height: 48px;
    white-space: nowrap;
  }
}

@media (max-width: 586px) {
  .md-title {
    font-size: 12px;
    font-weight: 600;
  }
  .user-info {
    font-size: 12px;
  }
  button {
    font-size: 12px;
  }
}

</style>
