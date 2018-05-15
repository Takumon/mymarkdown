<template>
  <div>
    <md-dialog-confirm
      :md-active.sync="showDeletingDialog"
      md-title="Delete the memo?"
      md-content="Once deleted, it can not be restored.<br>Do you really want to delete this?"
      md-confirm-text="Delete"
      md-cancel-text="Cancel"
      @md-cancel="setShowDeletingDialog(false)"
      @md-confirm="deleteMemo" />

    <md-snackbar :md-position="center" :md-duration="4000" :md-active.sync="showSavedSnackbar" md-persistent>
      <span>Saved the memo</span>
      <md-button class="" @click="setShowSavedSnackbar(false)"><i class="fas fa-times"></i></md-button>
    </md-snackbar>
    <md-snackbar :md-position="center" :md-duration="4000" :md-active.sync="showDeletedSnackbar" md-persistent>
      <span>Deleted the memo</span>
      <md-button class="" @click="setShowDeletedSnackbar(false)"><i class="fas fa-times"></i></md-button>
    </md-snackbar>
  </div>
</template>


<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'notification',
  data () {
    return {
    }
  },
  computed: {
    showSavedSnackbar: {
      get () {
        return this.$store.state.showSavedSnackbar
      },
      set (isShow) {
        this.setShowSavedSnackbar(isShow)
      }
    },
    showDeletedSnackbar: {
      get () {
        return this.$store.state.showDeletedSnackbar
      },
      set (isShow) {
        this.setShowDeletedSnackbar(isShow)
      }
    },
    showDeletingDialog: {
      get () {
        return this.$store.state.showDeletingDialog
      },
      set (isShow) {
        this.setShowDeletingDialog(isShow)
      }
    }
  },
  created: function() {
  },
  methods: {
    ...mapActions([
      'setShowSavedSnackbar',
      'setShowDeletedSnackbar',
      'setShowDeletingDialog',
    ]),
  }
}
</script>