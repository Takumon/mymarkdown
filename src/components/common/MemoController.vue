<script>
import { mapState, mapActions } from 'vuex'


// Memoを保存更新削除するための共通コンポーネント
export default {
  name: 'MemoController',
  computed: {
    ...mapState([
      'memos',
      'selectedMemoIndex',
      'loginUser',
      'nowSaving',
    ]),
  },

  methods: {
    ...mapActions({
      'store_addMemo': 'addMemo',
      'store_setMemos': 'setMemos',
      'store_deleteMemo': 'deleteMemo',
      'store_updateMemoUpdated': 'updateMemoUpdated',
      'store_setShowSnackbar': 'setShowSnackbar',
      'store_setShowLoading': 'setShowLoading',
      'store_setNowSaving': 'setNowSaving',
    }),

    // DBからメモを取得し、ストアに設定
    getMemosFromDBAndSetStore: function() {
      this.store_setShowLoading(true)

      firebase
        .database()
        .ref('memos/' + this.loginUser.uid)
        .once('value')
        .then(result => {
          if (result.val()) {
            const _memos = result.val().map(m => {
              m.tags = JSON.parse(m.tags);
              return m;
            });
            this.store_setMemos(_memos)
          } else {
            // メモが１件もないことを想定していないので
            // 初期登録時はデフォルトで１件追加する
            this.store_addMemo()
          }
          this.store_setShowLoading(false)
        })
    },
    addMemo: function() {
      return this.store_addMemo()
    },
    // ストアのメモをDBに保存する
    saveMemosToDB: function ({ successMsg, errorMsg } ) {
      this.store_setNowSaving(true)

      firebase
        .database()
        .ref('memos/' + this.loginUser.uid)
        .set(JSON.parse(JSON.stringify(this.memos)).map(m => { // memosをディープコピーして加工してからDBに保存
          m.tags = JSON.stringify(m.tags)
          return m
        }), error => {
          this.store_setNowSaving(false)

          if(error) {
            alert(errorMsg)
          } else {
            this.store_setShowSnackbar({
              isShow: true,
              text: successMsg
            })
          }
        });
    },

    // ストアの選択中Memoの更新日を更新して、DB保存
    saveMemos: function() {
      // 保存中の場合は、無駄に処理を走らせないため中断
      if (this.nowSaving) return
      this.store_setNowSaving(true)

      this.store_updateMemoUpdated(this.selectedMemoIndex)
      this.saveMemosToDB({
        successMsg: 'Saved the memo',
        errorMsg: 'Fial to save memos'
      })
    },

    // ストアの選択中Memoを削除して、DB保存
    deleteMemo: function() {
      this.store_deleteMemo(this.selectedMemoIndex)
      this.saveMemosToDB({
        successMsg: 'Deleted the memo',
        errorMsg: 'Fial to delete memo'
      })
    },
  }
}
</script>