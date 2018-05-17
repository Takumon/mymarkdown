<template>

  <md-app md-waterfall md-mode="fixed-last">
    <md-app-toolbar class="md-primary">
      <Navigation1></Navigation1>
      <Navigation2></Navigation2>
    </md-app-toolbar>


    <md-app-drawer md-permanent="full" :md-active.sync="showSidebar">
      <md-toolbar class="md-transparent memo-list-title" md-elevation="0">
        Memo list
      </md-toolbar>
      <md-list>
        <md-list-item
          class="md-list-item-text memo-list-item"
          v-for="(memo, index) in memos"
          :key="index"
          @click="selectMemo(index)"
          :data-selected="index==selectedIndex" >
          <p class="memo-title">{{displayTitle(memo.markdown)}}</p>
        </md-list-item>
      </md-list>

      <div>
        <md-tooltip>Add Memo</md-tooltip>
        <md-button
          class="md-raised md-icon-button addMemoBtn"
          @click="addMemo"><i class="btn-icon fas fa-plus"></i></md-button>
      </div>

    </md-app-drawer>

    <md-app-content>
      <EditorContent
        v-if="memos[selectedIndex]"
        :memo="memos[selectedIndex]"
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
import Navigation1 from './Navigation1.vue'
import Navigation2 from './Navigation2.vue'
import EditorContent from './EditorContent.vue'


export default {
  name: 'Editor',
  data () {
    return {
      memos: [],
      selectedIndex: 0,
      intervalId: null,
    }
  },
  computed: {
    ...mapState([
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
          this.memos = result.val().map(m => {
            m.tags = JSON.parse(m.tags);
            return m;
          });
        } else {
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
      'setShowSnackbar',
      'setShowLoading',
      'setShowSidebar',
      'setShowDeletingDialog',
      'setNowSaving',
    ]),
    displayTitle: function(text) {
      // 最初の行をタイトルとす
      return text.split(/\n/)[0];
    },
    addMemo: function() {
      const sysdate = new Date().toString();
      this.memos.push({
        markdown: '無題のメモ',
        tags: [],
        updated: sysdate,
        created: sysdate,
      })
    },
    selectMemo: function(index) {
      this.saveMemos();
      this.selectedIndex = index;
      this.setShowSidebar(false);
    },
    deleteMemo: function() {
      this.setShowDeletingDialog(true);
    },
    saveMemos: function() {
      if (this.nowSaving) return

      this.setNowSaving(true)
      this.memos[this.selectedIndex].updated = new Date().toString()
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
      this.memos.splice(this.selectedIndex, 1)
      if (this.selectedIndex > 0) {
        this.selectedIndex--;
      }
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

  .memo-list-title {
    color: white;
    font-weight: 600;
  }
}


.md-list {
  padding: 0;

  .memo-list-item {
    position: relative;
    background-color: #19212b;
    border-bottom: 1px solid #404854;

    &:hover {
      background: #262f3d;
    }

    &:first-child {
      border-top: 1px solid #404854;
    }

    &[data-selected="true"] {
      background: rgba(0,0,0,0.87);

      &:before {
        display: block;
        content: '';
        position: absolute;
        left: 0px;
        top: 0px;
        height: 100%;
        width: 8px;
        background: #4fc3f8;
      }

      .memo-title {
        color: #4fc3f8;
      }
    }

    .memo-title {
      color: rgb(187, 189, 192);
      height: 1.2em;
      margin: 0;
      white-space: nowrap;
      overflow: hidden;
    }
  }
}
.addMemoBtn {
  margin: 10px;
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
