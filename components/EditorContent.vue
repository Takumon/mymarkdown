<template>
  <div>
    <div class="memo-info-area" >
      <md-chips v-model="memo.tags" md-limit="5" md-placeholder="Add Tag..."></md-chips>
    </div>
    <div data-test="editor-content" class="editor" v-bind:class="textEditorPreviewMode" @keyup.ctrl.83="saveMemo">
      <textarea data-test="editor" v-scroll="onScroll" class="markdown" v-model="memo.markdown"></textarea>
      <div data-test="preview" id="preview" class="preview markdown-body" v-html="preview()"></div>
    </div>

    <div class="characters">Characters {{memo.markdown.length}}</div>

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
      gfm: true,
      breaks: true,
      langPrefix: '',
      highlight: function (code, langAndTitle, callback) {
        const lang = langAndTitle ? langAndTitle.split(':')[0] : '';
        return hljs.highlightAuto(code, [lang]).value;
      }
    });
  },

  methods: {
    onScroll($event, { scrollTop })　{
      const scrollAreaHight = $event.srcElement.scrollHeight - $event.srcElement.clientHeight;
      const ratio = ($event.srcElement.scrollTop / scrollAreaHight);

      const target = this.$el.querySelector('#preview');
      target.scrollTop = (target.scrollHeight - target.clientHeight) * ratio;
  	},
    preview() {
      var html =  marked(this.memo.markdown)
      return this.renderCheckbox(html)
    },
    renderCheckbox(html) {
      return html
              .replace(/\[x\]/g, '<input type="checkbox" checked="checked">')
              .replace(/\[ \]/g, '<input type="checkbox">')
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

  .markdown,
  .preview {
    overflow: scroll;
    height: 60vh;
    padding: 12px;
    transition: width 0.5s;
    border: 1px solid #d6d6d6;
  }

  .markdown {
    outline: 0;
    border-right: 0;
  }
  .preview {
    font-size: 0.7em;
    background-color: #fff;
    text-align: left;
  }
}

.characters {
  color: gray;
  display: flex;
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
