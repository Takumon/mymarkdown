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

    <md-app-content v-if="memos[selectedIndex]">
      <div class="memo-info-area" >
        <md-chips v-model="memos[selectedIndex].tags" md-limit="5" md-placeholder="Add Tag..."></md-chips>
      </div>
      <div class="editor" v-bind:class="textEditorPreviewMode" @keyup.ctrl.83="saveMemos">
        <textarea class="markdown" v-model="memos[selectedIndex].markdown"></textarea>
        <div class="preview markdown-body" v-html="preview()"></div>
      </div>

      <div class="date-area">
        <div>Updated: {{memos[selectedIndex].updated | dateFormat('YYYY/MM/DD HH:mm') }}</div>
        <div>Created: {{memos[selectedIndex].created | dateFormat('YYYY/MM/DD HH:mm') }}</div>
      </div>


      <md-button v-if="memos.length > 1" class="md-button md-fab md-raised md-plain delete-button" @click="showDeletingDialog = true">
        <i class="btn-icon fas fa-trash-alt"></i>
      </md-button>

      <md-button class="md-button md-fab md-raised md-primary save-button" @click="saveMemos">
        <i class="btn-icon fas fa-save"></i>
      </md-button>
    </md-app-content>
    <md-dialog-confirm
        :md-active.sync="showDeletingDialog"
        md-title="Delete the memo?"
        md-content="Once deleted, it can not be restored.<br>Do you really want to delete this?"
        md-confirm-text="Delete"
        md-cancel-text="Cancel"
        @md-cancel="onDeletingCancel"
        @md-confirm="onDeletingConfirm" />
  </md-app>

</template>

<script>
import marked from 'marked';
import hljs from 'highlightjs';
import { mapState, mapActions } from 'vuex'
import Navigation1 from './Navigation1.vue'
import Navigation2 from './Navigation2.vue'


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
      'textEditorPreviewMode',
      'loginUser',
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
    marked.setOptions({
      langPrefix: '',
      highlight: function (code, langAndTitle, callback) {
        const lang = langAndTitle ? langAndTitle.split(':')[0] : '';
        return hljs.highlightAuto(code, [lang]).value;
      }
    });

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
    ]),
    preview: function() {
      return marked(this.memos[this.selectedIndex].markdown)
    },
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
      this.memos[this.selectedIndex].updated = new Date().toString();
      firebase
        .database()
        .ref('memos/' + this.loginUser.uid)
        .set(JSON.parse(JSON.stringify(this.memos)).map(m => { // memosをディープコピーして加工してからDBに保存
          m.tags = JSON.stringify(m.tags);
          return m;
        }), error => {
          if(error) {
            alert("Fial to save memos");
          } else {
            this.setShowSnackbar({
              isShow: true,
              text: 'Saved the memo'
            });
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




.memo-info-area {
  display: flex;

  .md-chips {
    font-size: 0.7em;
  }
}

.editor {
  display: flex;

  &.tab-editor {
    .markdown {
      width: 100%;
      border: 1px solid #d6d6d6;
    }
    .preview {
      display: none;
    }
  }

  &.tab-editor-and-preview {
    .markdown {
      width: 50%;
    }
    .preview {
      width: 50%;
    }
  }

  &.tab-preview {
    .markdown {
      display: none;
    }
    .preview {
      width: 100%;
    }
  }

  .markdown {
    outline: 0;
    border: 0;
    min-height: 500px;
    border: 1px solid #d6d6d6;
    border-right: 0;
    padding: 12px;
    transition: width 0.5s;
  }
  .preview {
    font-size: 0.7em;
    background-color: #fff;
    text-align: left;
    border: 1px solid #d6d6d6;
    padding: 12px;
    min-height: 500px;
    transition: width 0.5s;
  }
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

.date-area {
  margin-top: 24px;
  display: flex;
  flex-flow: column;
  div {
    color: gray;
    margin-right: auto;
  }
}

.md-app-toolbar {
  display: flex;
}
</style>
