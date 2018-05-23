<template>

  <md-app md-waterfall md-mode="fixed">
    <md-app-toolbar class="md-primary">
      <Navigation1></Navigation1>
      <Navigation2></Navigation2>
    </md-app-toolbar>


    <md-app-drawer md-permanent="full" :md-active.sync="showSidebar">
      <Sidebar></Sidebar>
    </md-app-drawer>

    <md-app-content>
      <EditorContent
        v-if="memos[selectedMemoIndex]"
        :memo="memos[selectedMemoIndex]"
        @saveMemo="saveMemos"
        ></EditorContent>

      <md-button v-if="memos.length > 1" class="md-button md-fab md-raised md-plain delete-button" @click="showDeletingDialog = true">
        <i class="btn-icon fas fa-trash-alt"></i>
      </md-button>

      <md-button class="md-button md-fab md-raised md-primary save-button" @click="saveMemos" :disabled="nowSaving">
        <i v-if="!nowSaving" class="btn-icon fas fa-save"></i>
        <i v-if="nowSaving" class="fa fa-spinner fa-pulse fa-2x fa-fw"></i>
      </md-button>

      <md-dialog-confirm
          :md-active.sync="showDeletingDialog"
          md-title="Delete the memo?"
          md-content="Once deleted, it can not be restored.<br>Do you really want to delete this?"
          md-confirm-text="Delete"
          md-cancel-text="Cancel"
          @md-cancel="onDeletingCancel"
          @md-confirm="onDeletingConfirm" />
    </md-app-content>
  </md-app>

</template>

<script>
import { mapState, mapActions } from 'vuex'
import Sidebar from './Sidebar.vue'
import Navigation1 from './Navigation1.vue'
import Navigation2 from './Navigation2.vue'
import EditorContent from './EditorContent.vue'


export default {
  name: 'Editor',
  data () {
    return {
      intervalId: null,
    }
  },
  computed: {
    ...mapState([
      'memos',
      'selectedMemoIndex',
      'loginUser',
      'nowSaving',
    ]),
    showSidebar: {
      get() {
        return this.$store.state.showSidebar
      },
      set (isShow) {
        this.setShowSidebar(isShow)
      }
    },
    showDeletingDialog: {
      get () {
        return this.$store.state.showDeletingDialog
      },
      set (isShow) {
        this.setShowDeletingDialog(isShow)
      }
    },
  },
  created: function() {
    this.setShowLoading(true)

    firebase
      .database()
      .ref('memos/' + this.loginUser.uid)
      .once('value')
      .then(result => {
        if (result.val()) {
          const memos = result.val().map(m => {
            m.tags = JSON.parse(m.tags);
            return m;
          });
          this.setMemos(memos)
        } else {
          // メモが１件もないことを想定していないので
          // 初期登録時はデフォルトで１件追加する
          this.addMemo()
        }
        this.setShowLoading(false)
      })
  },

  // 定期的にメモを保存
  mounted: function() {
    this.intervalId = setInterval(() => {
      this.saveMemos();
    }, 40 * 1000);
  },
  // インスタンス破棄時に定期的保存処理を解除
  beforeDestroy () {
    clearInterval(this.intervalId)
  },


  methods: {
    ...mapActions([
      'setMemos',
      'deleteMemo',
      'setSelectedMemoIndex',
      'updateMemoUpdated',
      'setShowSnackbar',
      'setShowLoading',
      'setShowSidebar',
      'setShowDeletingDialog',
      'setNowSaving',
    ]),
    saveMemos: function() {
      // 保存中の場合は、無駄に処理を走らせないため中断
      if (this.nowSaving) return

      this.setNowSaving(true)

      this.updateMemoUpdated(this.selectedMemoIndex)

      firebase
        .database()
        .ref('memos/' + this.loginUser.uid)
        .set(JSON.parse(JSON.stringify(this.memos)).map(m => { // memosをディープコピーして加工してからDBに保存
          m.tags = JSON.stringify(m.tags)
          return m
        }), error => {
          this.setNowSaving(false)

          if(error) {
            alert("Fial to save memos")
          } else {
            this.setShowSnackbar({
              isShow: true,
              text: 'Saved the memo'
            })
          }
        });
    },

    onDeletingConfirm: function() {
      this.deleteMemo(this.selectedMemoIndex)

      firebase
        .database()
        .ref('memos/' + this.loginUser.uid)
        .set(JSON.parse(JSON.stringify(this.memos)).map(m => { // memosをディープコピーして加工してからDBに保存
          m.tags = JSON.stringify(m.tags);
          return m;
        }), error => {
          if(error) {
            alert("Fial to delete memo");
          } else {
            this.setShowSnackbar({
              isShow: true,
              text: 'Deleted the memo'
            });
          }
        });
    },
    onDeletingCancel: function() {
      this.setShowDeletingDialog(false)
    },
  },
  components: {
    'Sidebar': Sidebar,
    'Navigation1': Navigation1,
    'Navigation2': Navigation2,
    'EditorContent': EditorContent,
  }
}
</script>

<style lang="scss" scoped>


.md-app {
  height: 100vh;
}


.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
  background: #262f3d;
}



.delete-button {
  position: fixed;
  bottom: 98px;
  right: 6px;
}
.save-button {
  position: fixed;
  bottom: 24px;
  right: 6px;
}

.md-app-toolbar {
  display: flex;
}
</style>
