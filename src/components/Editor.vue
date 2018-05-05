<template>

  <md-app md-waterfall md-mode="fixed-last">
    <md-app-toolbar class="md-primary">
      <div class="md-toolbar-row">
        <div class="md-toolbar-section-start">
          <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
            <md-icon>menu</md-icon>
          </md-button>
          <span class="md-title">Markdown Mome</span>
        </div>

        <div class="md-toolbar-section-end">
          <div class="user-info"><i class="fas fa-user"></i> {{user.displayName}}</div>
          <md-button
            @click="logout"><i class="btn-icon fas fa-sign-out-alt"></i> LOOUT</md-button>
        </div>
      </div>

      <div class="md-toolbar-row">
        <md-tabs class="md-primary" :md-active-tab.sync="activeTab" v-on:md-changed="tabChange">
          <md-tab id="tab-editor" md-icon="mode_edit"></md-tab>
          <md-tab id="tab-editor-and-preview" md-icon="chrome_reader_mode"></md-tab>
          <md-tab id="tab-preview" md-icon="description"></md-tab>
        </md-tabs>
      </div>

    </md-app-toolbar>

    <md-app-drawer md-permanent="full" :md-active.sync="menuVisible">
      <md-toolbar class="md-transparent" md-elevation="0">
        Memo list
      </md-toolbar>
      <md-list>
        <md-list-item
          class="md-list-item-text memo-list-item"
          v-for="(memo, index) in memos"
          :key="index"
          @click="selectMemo(index)"
          :data-selected="index==selectedIndex" >
          <p class="memoTitle">{{displayTitle(memo.markdown)}}</p>
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
      <div class="editor" v-bind:class="activeTab" v-if="memos.length > 1">
        <textarea class="markdown" v-model="memos[selectedIndex].markdown"></textarea>
        <div class="preview markdown-body" v-html="preview()"></div>
      </div>

      <md-button class="md-button md-fab md-raised md-plain delete-button" @click="deleteMemo">
        <i class="btn-icon fas fa-trash-alt"></i>
      </md-button>

      <md-button class="md-button md-fab md-raised md-primary save-button" @click="saveMemos">
        <i class="btn-icon fas fa-save"></i>
      </md-button>

      <md-snackbar :md-position="center" :md-duration="4000" :md-active.sync="showSavedSnackbar" md-persistent>
        <span>Saved the memo</span>
        <md-button class="" @click="showSavedSnackbar = false"><i class="fas fa-times"></i></md-button>
      </md-snackbar>
      <md-snackbar :md-position="center" :md-duration="4000" :md-active.sync="showDeletedSnackbar" md-persistent>
        <span>Deleted the memo</span>
        <md-button class="" @click="showDeletedSnackbar = false"><i class="fas fa-times"></i></md-button>
      </md-snackbar>

    </md-app-content>
  </md-app>

</template>

<script>
import marked from 'marked';
import hljs from 'highlightjs';

export default {
  name: 'editor',
  // 親コンポーネントから渡されるオブジェクト
  props: ['user'],
  data () {
    return {
      activeTab: 'tab-editor-and-preview',
      menuVisible: true,
      showSavedSnackbar: false,
      showDeletedSnackbar: false,
      memos: [{
        markdown: '',
      }],
      selectedIndex: 0,
    }
  },
  created: function() {
    marked.setOptions({
      langPrefix: '',
      highlight: function (code, langAndTitle, callback) {
        const lang = langAndTitle ? langAndTitle.split(':')[0] : '';
        return hljs.highlightAuto(code, [lang]).value;
      }
    });

    firebase
      .database()
      .ref('memos/' + this.user.uid)
      .once('value')
      .then(result => {
        if (result.val()) {
          this.memos = result.val()
        }
      })
  },
  methods: {
    logout: function() {
      firebase.auth().signOut();
    },
    preview: function() {
      return marked(this.memos[this.selectedIndex].markdown)
    },
    displayTitle: function(text) {
      // 最初の行をタイトルとす
      return text.split(/\n/)[0];
    },
    addMemo: function() {
      this.memos.push({
        markdown: '無題のメモ',
      })
    },
    selectMemo: function(index) {
      this.selectedIndex = index;
      this.menuVisible = false; // サイドメニューを閉じる
    },
    deleteMemo: function() {
      this.memos.splice(this.selectedIndex, 1)
      if (this.selectedIndex > 0) {
        this.selectedIndex--;
      }
      this.showDeletedSnackbar = true;
    },
    saveMemos: function() {
      firebase
        .database()
        .ref('memos/' + this.user.uid)
        .set(this.memos)
      this.showSavedSnackbar = true;
    },
    tabChange: function(selectedTab) {
      this.activeTab = selectedTab
    }
  }
}
</script>

<style lang="scss" scoped>

.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
}


.md-app {
  height: 100vh;
}

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

.md-list {
  padding: 0;
}
.memo-list-item {
  border-bottom: 1px solid rgba(#000, .12);

  &:first-child {
    border-top: 1px solid rgba(#000, .12);
  }

  &[data-selected="true"] {
    background: #ecf3f9;
    border-right: 0;
    border-left: 8px solid #0c2ad0;
  }
}


.memoTitle {
  height: 1.2em;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
}

.addMemoBtn {
  margin: 10px;
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
