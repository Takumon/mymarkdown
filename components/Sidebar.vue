<template>
  <div id="sidebar">
    <md-toolbar class="md-transparent memo-list-title" md-elevation="0">
      Memo list
    </md-toolbar>
    <md-list>
      <md-list-item
        class="md-list-item-text memo-list-item"
        v-for="(memo, index) in memos"
        :key="index"
        @click="selectMemo(index)"
        :data-selected="index==selectedMemoIndex" >
        <p class="memo-title">{{displayTitle(memo.markdown)}}</p>
      </md-list-item>
    </md-list>

    <div>
      <md-tooltip>Add Memo</md-tooltip>
      <md-button
        data-test="add-memo-button"
        class="md-raised md-icon-button addMemoBtn"
        @click="addMemo"><i class="btn-icon fas fa-plus"></i></md-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import MemoController from '~/components/common/MemoController.vue';


export default {
  name: 'Sidebar',
  mixins: [ MemoController ],
  computed: {
    ...mapState([
      'memos',
      'selectedMemoIndex',
    ]),
  },

  methods: {
    ...mapActions([
      'setSelectedMemoIndex',
      'setShowSidebar',
    ]),
    displayTitle: function(text) {
      // 最初の行をタイトルとす
      return text.split(/\n/)[0];
    },
    selectMemo: function(index) {
      // 表示するメモを変更する前に、現在選択中のメモの更新日を更新してDBに保存する
      this.saveMemos()
      .then(() => this.setSelectedMemoIndex(index))
      .then(() => this.setShowSidebar(false))
    },
  },
}
</script>

<style lang="scss" scoped>

#sidebar {
  .memo-list-title {
    color: white;
    font-weight: 600;
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
}

</style>
