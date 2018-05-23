<template>
  <md-dialog-confirm
      :md-active.sync="showDeletingDialog"
      md-title="Delete the memo?"
      md-content="Once deleted, it can not be restored.<br>Do you really want to delete this?"
      md-confirm-text="Delete"
      md-cancel-text="Cancel"
      @md-cancel="onDeletingCancel"
      @md-confirm="onDeletingConfirm" />
  </md-app-content>
</template>

<script>
import { mapState, mapActions } from 'vuex'


export default {
  name: 'DeleteDialog',
  computed: {
    ...mapState([
      'memos',
      'selectedMemoIndex',
      'loginUser',
      'nowSaving',
    ]),
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
      'deleteMemo',
      'setShowSnackbar',
      'setNowSaving',
      'setShowDeletingDialog',
    ]),

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
  },
}
</script>
