<template>

  <md-app v-if="!showLoading" md-waterfall md-mode="fixed">
    <md-app-toolbar class="md-primary">
      <Navigation1 />
      <Navigation2 />
    </md-app-toolbar>


    <md-app-drawer md-permanent="full" :md-active.sync="showSidebar">
      <Sidebar />
    </md-app-drawer>

    <md-app-content>
      <md-progress-spinner v-if="!memos[selectedMemoIndex]" md-mode="indeterminate"></md-progress-spinner>

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

      <DeleteDialog />
    </md-app-content>
  </md-app>

</template>

<script>
import { mapState, mapActions } from 'vuex'
import Sidebar from '~/components/Sidebar.vue'
import DeleteDialog from '~/components/DeleteDialog.vue'
import Navigation1 from '~/components/Navigation1.vue'
import Navigation2 from '~/components/Navigation2.vue'
import EditorContent from '~/components/EditorContent.vue'
import MemoController from '~/components/common/MemoController.vue';


export default {
  name: 'editor',
  mixins: [ MemoController ],
  data () {
    return {
      intervalId: null,
    }
  },
  created () {
    // ログイン画面からの遷移の場合はローディングアイコンが表示あれた状態なので、非表示を設定する
    this.setShowLoading(false).then(() => {
      this.getMemosFromDBAndSetStore()
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


  computed: {
    ...mapState([
      'selectedMemoIndex',
      'showLoading',
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
  methods: {
    ...mapActions([
      'setSelectedMemoIndex',
      'setShowSidebar',
      'setShowDeletingDialog',
      'setShowLoading'
    ]),
  },
  components: {
    'Sidebar': Sidebar,
    'Navigation1': Navigation1,
    'Navigation2': Navigation2,
    'EditorContent': EditorContent,
    'DeleteDialog': DeleteDialog,
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
