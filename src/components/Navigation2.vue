<template>
  <div class="md-toolbar-row">
    <md-tabs class="md-primary" :md-active-tab="textEditorPreviewMode" v-on:md-changed="setTextEditorPreviewMode">
      <md-tab id="tab-editor" md-icon="mode_edit"></md-tab>
      <md-tab id="tab-editor-and-preview" md-icon="chrome_reader_mode"></md-tab>
      <md-tab id="tab-preview" md-icon="description"></md-tab>
    </md-tabs>
  </div>
</template>

<script>
import { mapState , mapActions } from 'vuex'

export default {
  name: 'Navigation2',
  computed: {
    textEditorPreviewMode: {
      get () {
        return this.$store.state.textEditorPreviewMode
      },
      set (mode) {
        this.setTextEditorPreviewMode(mode)
      }
    },
  },
  methods: {
    ...mapActions([
      'setTextEditorPreviewMode',
    ]),
  },
}
</script>
