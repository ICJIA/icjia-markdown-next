<template>
  <div
    class="wrapper"
    :class="{ markdown: isRenderingMarkdown, html: isRenderingHtml }"
  >
    <div class="box header">
      <nav-primary></nav-primary>
      <nav-secondary></nav-secondary>
    </div>

    <div class="box source">
      <textarea id="editor-source"></textarea>
    </div>
    <div class="box target">
      Rendered HTML here
    </div>

    <div class="box preview" v-if="isRenderingHtml">
      html preview here
    </div>

    <div class="box footer">
      <nav-footer></nav-footer>
    </div>
  </div>
</template>

<script>
/**
 * Custom components
 */

import NavPrimary from "@/components/NavPrimary";
import NavSecondary from "@/components/NavSecondary";
import NavFooter from "@/components/NavFooter";

/**
 * CodeMirror
 */

let codeMirror = require("codemirror");
require("codemirror/mode/markdown/markdown");
require("codemirror/addon/edit/closebrackets");

import config from "@/config";
import { EventBus } from "@/event-bus.js";
import { store } from "@/store";

const md = require("markdown-it")(config.markdownItOptions)
  .use(require("markdown-it-footnote"))
  .use(require("markdown-it-named-headers"))
  .use(require("markdown-it-emoji"))
  .use(require("markdown-it-attrs"))
  .use(require("@/markdown-it-meta-fork"))
  .use(require("markdown-it-container"))
  .use(require("markdown-it-highlightjs"));

// const { BitlyClient } = require("bitly");
// const bitly = new BitlyClient(process.env.VUE_APP_BITLY, {});
// const FileSaver = require("file-saver");
// const loremIpsum = require("lorem-ipsum");
// /* Thanks to: https://github.com/musicbed/mirrormark/blob/master/src/js/mirrormark.js */
// const beautify_html = require("js-beautify").html;

export default {
  components: {
    NavPrimary,
    NavSecondary,
    NavFooter
  },
  mounted() {
    this.initializeEditor();
  },
  methods: {
    initializeEditor: function() {
      this.editor = codeMirror.fromTextArea(
        document.getElementById("editor-source"),
        config.codeMirrorOptionsMarkdown
      );
    }
  },
  computed: {
    isRenderingMarkdown() {
      return this.config.session.renderer === "markdown";
    },
    isRenderingHtml() {
      return this.config.session.renderer === "html";
    }
  },
  data() {
    return {
      config: store.config
    };
  }
};
</script>

<style>
@import url("../../node_modules/codemirror/lib/codemirror.css");

.source {
  grid-area: source;
  background: #fff;
}

.target {
  grid-area: target;
  background: #fff;
}

.preview {
  grid-area: preview;
  background: #eee;
}
.header {
  grid-area: header;
}

.footer {
  grid-area: footer;
}

.header,
.footer {
  background-color: #999;
}

.box {
  /* background-color: #eee; */
  color: #333;
}

.wrapper {
  display: grid;
  grid-gap: 1px;
  background-color: #bbb;
  color: #fff;
  min-height: 99.85vh !important;
  grid-template-rows: fit-content(150px) 1fr 50px;
}

.wrapper.markdown {
  grid-template-areas:
    "header   header"
    "source  target"
    "footer  footer";
  grid-template-columns: minmax(50%, 1fr) minmax(50%, 1fr);
}

.wrapper.html {
  grid-template-areas:
    "header   header header"
    "source  target preview"
    "footer  footer footer";
  grid-template-columns: minmax(33%, 1fr) minmax(33%, 1fr) minmax(33%, 1fr);
}

.CodeMirror {
  background: #fff;
  min-height: 100% !important;
}
</style>
