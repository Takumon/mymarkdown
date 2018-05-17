<template>
  <md-app-toolbar class="md-primary">
    <div class="md-toolbar-row">
      <div class="md-toolbar-section-start">
        <md-button class="md-icon-button" v-if="!showSidebar" @click="setShowSidebar(true)">
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title">Markdown Mome</span>
      </div>

      <div class="md-toolbar-section-end">
        <div class="user-info"><i class="fas fa-user"></i> {{loginUser.displayName}}</div>
        <md-button
          @click="logout"><i class="btn-icon fas fa-sign-out-alt"></i> LOOUT</md-button>
      </div>
    </div>

    <div class="md-toolbar-row">
      <md-tabs class="md-primary" :md-active-tab.sync="textEditorPreviewMode">
        <md-tab id="tab-editor" md-icon="mode_edit"></md-tab>
        <md-tab id="tab-editor-and-preview" md-icon="chrome_reader_mode"></md-tab>
        <md-tab id="tab-preview" md-icon="description"></md-tab>
      </md-tabs>
    </div>

  </md-app-toolbar>
</template>

<script>
import { mapState , mapActions } from 'vuex'

export default {
  name: 'Navigation',
  computed: {
    showSidebar: {
      get () {
        return this.$store.state.showSidebar
      },
      set (isShow) {
        this.setShowSidebar(isShow)
      }
    },
    textEditorPreviewMode: {
      get () {
        return this.$store.state.textEditorPreviewMode
      },
      set (mode) {
        this.setTextEditorPreviewMode(mode)
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

.md-app-toolbar {
  display: flex;

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
    }
  }
}

@media (max-width: 586px) {
  .md-app-toolbar {

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
}

</style>
