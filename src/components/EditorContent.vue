<template>
  <div>
    <div class="memo-info-area" >
      <md-chips v-model="memo.tags" md-limit="5" md-placeholder="Add Tag..."></md-chips>
    </div>
    <div class="editor" v-bind:class="textEditorPreviewMode" @keyup.ctrl.83="saveMemo">
      <textarea class="markdown" v-model="memo.markdown"></textarea>
      <div class="preview markdown-body" v-html="preview()"></div>
    </div>

    <div class="date-area">
      <div>Updated: {{memo.updated | dateFormat('YYYY/MM/DD HH:mm') }}</div>
      <div>Created: {{memo.created | dateFormat('YYYY/MM/DD HH:mm') }}</div>
    </div>
  </div>
</template>

<script>
import marked from 'marked';
import hljs from 'highlightjs';
import { mapState } from 'vuex'


export default {
  name: 'EditorContent',
  props: ['memo'],
  computed: {
    ...mapState([
      'textEditorPreviewMode',
    ]),
  },
  created: function() {
    marked.setOptions({
      langPrefix: '',
      highlight: function (code, langAndTitle, callback) {
        const lang = langAndTitle ? langAndTitle.split(':')[0] : '';
        return hljs.highlightAuto(code, [lang]).value;
      }
    });
  },

  methods: {
    preview: function() {
      console.log('preview start this.memo = ' + this.memo)
      return marked(this.memo.markdown)
    },
    saveMemo: function() {
      this.$emit('saveMemo')
    },
  },
}
</script>

<style lang="scss" scoped>
.memo-info-area {
  display: flex;

  .md-chips {
    font-size: 0.7em;
  }
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
    font-size: 0.7em;
    background-color: #fff;
    text-align: left;
    border: 1px solid #d6d6d6;
    padding: 12px;
    min-height: 500px;
    transition: width 0.5s;
  }
}


.date-area {
  margin-top: 24px;
  display: flex;
  flex-flow: column;
  div {
    color: gray;
    margin-right: auto;
  }
}

</style>
