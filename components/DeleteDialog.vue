<template>
  <md-dialog-confirm
      data-test="delete-dialog"
      :md-active.sync="showDeletingDialog"
      md-title="Delete the memo?"
      md-content="Once deleted, it can not be restored.<br>Do you really want to delete this?"
      md-confirm-text="Delete"
      md-cancel-text="Cancel"
      @md-confirm="deleteMemo" />
</template>

<script>
import { mapState, mapActions } from 'vuex'
import MemoController from '~/components/common/MemoController.vue';


export default {
  name: 'DeleteDialog',
  mixins: [ MemoController ],
  computed: {
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
      'setShowDeletingDialog',
    ]),
  },
}
</script>
