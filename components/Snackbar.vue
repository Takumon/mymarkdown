<template>
  <md-snackbar :md-position="center" :md-duration="4000" :md-active.sync="showSnackbar" md-persistent>
    <span data-test="snackbar-text">{{snackbarText}}</span>
    <md-button data-test="close-button" @click="setShowSnackbar({ isShow: false})"><i class="fas fa-times"></i></md-button>
  </md-snackbar>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'Snackbar',
  computed: {
    ...mapState([
      'snackbarText',
    ]),
    showSnackbar: {
      get () {
        return this.$store.state.showSnackbar
      },
      set (isShow) {
        this.setShowSnackbar(isShow)
      }
    }
  },
  methods: {
    ...mapActions([
      'setShowSnackbar',
    ])
  }
}
</script>