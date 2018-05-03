<template>
  <div class="editor">
    <div class="header">
      <h1 class="screen-title">Markdown Mome</h1>
      <div class="user-info-area">
        <div class="user-info"><i class="fas fa-user"></i> {{user.displayName}}</div>
        <md-button
          @click="logout"><i class="btn-icon fas fa-sign-out-alt"></i> LOOUT</md-button>
      </div>
    </div>
    <div>
      <div class="memoListWrapper">
        <md-list>
          <md-list-item
            class="memoList"
            v-for="(memo, index) in memos"
            :key="index"
            @click="selectMemo(index)"
            :data-selected="index==selectedIndex" >
            <p class="memoTitle">{{displayTitle(memo.markdown)}}</p>
          </md-list-item>
        </md-list>

        <div class="btn-area">
          <div>
            <md-tooltip>Add Memo</md-tooltip>
            <md-button
              class="md-raised md-icon-button addMemoBtn"
              @click="addMemo"><i class="btn-icon fas fa-plus"></i></md-button>
          </div>
          <div>
            <md-tooltip>Delete Selected Memo</md-tooltip>
            <md-button
              class="md-raised md-icon-button deleteMemoBtn"
              v-if="memos.length > 1"
              @click="deleteMemo"><i class="btn-icon fas fa-trash-alt"></i><md-tooltip>Add Memo</md-tooltip></md-button>
          </div>
          <div>
            <md-tooltip>Save Memos</md-tooltip>
            <md-button
              class="md-raised md-icon-button saveMemosBtn"
              @click="saveMemos"><i class="btn-icon fas fa-save"></i></md-button>
          </div>
        </div>

      </div>

      <textarea class="markdown" v-model="memos[selectedIndex].markdown"></textarea>
      <div class="preview markdown-body" v-html="preview()"></div>
    </div>
  </div>
</template>

<script>
import marked from 'marked';

export default {
  name: 'editor',
  // 親コンポーネントから渡されるオブジェクト
  props: ['user'],
  data () {
    return {
      memos: [{
        markdown: '',
      }],
      selectedIndex: 0,
    }
  },
  created: function() {
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
    },
    deleteMemo: function() {
      this.memos.splice(this.selectedIndex, 1)
      if (this.selectedIndex > 0) {
        this.selectedIndex--;
      }
    },
    saveMemos: function() {
      firebase
        .database()
        .ref('memos/' + this.user.uid)
        .set(this.memos)
    },
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  margin-top: 24px;
  margin-bottom: 48px;

  .screen-title {
    text-align: left;
    font-size: 36px;
    text-indent: 12px;
    height: 48px;
    line-height: 48px;
    margin: 0;
    white-space: nowrap;
}


  .user-info-area {
    display: flex;
    justify-content: flex-end;
    align-content: stretch;
    width: 100%;
  }
  .user-info {
    line-height: 48px;
  }

}
.memoListWrapper {
  width: 19%;
  float: left;
}
.md-list {
  padding: 0;
}
.memoList {
  width: 320px;
  max-width: 100%;
  display: inline-block;
  vertical-align: top;
  border: 1px solid rgba(#000, .12);
  margin: -1px 0 0 0;

  &[data-selected="true"] {
    background: #ecf3f9;
    border-right: 0;
    border-left: 6px solid #0c2ad0;
  }
}

.memoTitle {
  height: 1.2em;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
}
.addMemoBtn {
}
.deleteMemoBtn {
}

.markdown {
  outline: 0;
  border: 0;
  float: left;
  width: 40%;
  min-height: 500px;
  border: 1px solid #d6d6d6;
  border-right: 0;
  padding: 12px;
}
.preview {
  background-color: #fff;
  float: left;
  width: 40%;
  text-align: left;
  border: 1px solid #d6d6d6;
  padding: 12px;
  min-height: 500px;
}

.btn-area {
  display: flex;
  margin: 10px;

  .btn-icon {
    font-size: 1.2em;
  }

}

</style>
