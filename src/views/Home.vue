<template>
  <div class="markdown-page">
    <v-content>
      <v-dialog v-model="showHtml" width="80%" class="htmlDialog">
        <v-card>
          <v-toolbar dark color="indigo">
            <v-btn icon @click.native="toggleHtml" dark>
              <v-icon>close</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn icon @click="copyHtmlToClipboard" dark>
              <v-icon>assignment</v-icon>
            </v-btn>
          </v-toolbar>

          <v-layout row wrap>
            <v-flex xs12>
              <pre><code class="html">{{html}}
              </code></pre>
            </v-flex>
          </v-layout>
        </v-card>
      </v-dialog>
      <nav-markdown></nav-markdown>
      <div style="margin-top: 80px;">
        <v-layout row wrap>
          <v-flex xs12 sm6>
            <textarea id="editor"></textarea>
          </v-flex>
          <v-flex xs12 sm6 style="padding-top: 0px; padding-right: 10px; padding-left: 10px">
            <div class="markdown-body">
              <div v-html="model"></div>
            </div>
          </v-flex>
        </v-layout>
      </div>
    </v-content>
  </div>
</template>

<script>
import config from "@/config";
import NavMarkdown from "@/components/NavMarkdown";
import { EventBus } from "@/event-bus.js";

/* Thanks to: https://github.com/musicbed/mirrormark/blob/master/src/js/mirrormark.js */
const beautify_html = require("js-beautify").html;
let codeMirror = require("codemirror");
let md = require("markdown-it")(config.markdownItOptions)
  .use(require("markdown-it-footnote"))
  .use(require("markdown-it-named-headers"));
require("codemirror/mode/markdown/markdown");
require("codemirror/addon/edit/closebrackets");

export default {
  components: {
    NavMarkdown
  },
  mounted() {
    this.initializeEditor();
    this.initializeEditorEvents();
    EventBus.$on("entityEvent", action => {
      this.insertEntity(action);
    });
  },
  methods: {
    initializeEditor: function() {
      this.editor = codeMirror.fromTextArea(document.getElementById("editor"), {
        lineNumbers: true,
        mode: "markdown",
        tabSize: "2",
        indentWithTabs: true,
        lineWrapping: true
      });
    },
    initializeEditorEvents: function() {
      this.editor.on("change", cm => {
        this.model = md.render(cm.getValue());
        this.line = cm.getCursor(true);
        //let doc = cm.getDoc();
        //let cursor = doc.getCursor();
      });
    },
    insertEntity(action) {
      switch (action) {
        case "header":
          this.insertBefore("# ", 3);
          break;
        case "bold":
          this.insertAround("**", "**");
          break;
        case "italicize":
          this.insertAround("*", "*");
          break;
        case "blockquote":
          this.insertBefore("> ", 2);
          break;
        case "link":
          this.insertAround("[", "](http://)");
          break;
        case "image":
          this.insertBefore("![](http://)", 2);
          break;
        case "unorderedList":
          this.insertBefore("* ", 2);
          break;
        case "orderedList":
          this.insertBefore("1 ", 2);
          break;
        case "code":
          this.insertAround("```\r\n", "\r\n```");
          break;
        case "hr":
          this.insert("---");
          break;
        case "footnote":
          this.insert(`[^${this.footnote}] `);
          this.footnote++;
          break;
        case "table":
          this.insert(`${config.templates.table}`);
          break;
        case "mdToClipboard":
          this.copyMarkdownToClipboard();
          break;
        case "showHtml":
          this.toggleHtml();
          break;
        // case 'reference':
        //   this.insertBefore('\r\n[^1]: ')
        //   break;
        default:
          break;
      }
    },
    insert: function(insertion) {
      let doc = this.editor.getDoc();
      let cursor = doc.getCursor();
      doc.replaceRange(insertion, { line: cursor.line, ch: cursor.ch });
    },
    insertAround: function(start, end) {
      let doc = this.editor.getDoc();
      let cursor = doc.getCursor();

      if (doc.somethingSelected()) {
        let selection = doc.getSelection();
        doc.replaceSelection(start + selection + end);
      } else {
        // If no selection then insert start and end args and set cursor position between the two.
        doc.replaceRange(start + end, { line: cursor.line, ch: cursor.ch });
        doc.setCursor({ line: cursor.line, ch: cursor.ch + start.length });
      }
    },

    insertBefore: function insertBefore(insertion, cursorOffset) {
      let doc = this.editor.getDoc();
      let cursor = doc.getCursor();

      if (doc.somethingSelected()) {
        let selections = doc.listSelections();
        selections.forEach(function(selection) {
          let pos = [selection.head.line, selection.anchor.line].sort();

          for (var i = pos[0]; i <= pos[1]; i++) {
            doc.replaceRange(insertion, { line: i, ch: 0 });
          }

          doc.setCursor({ line: pos[0], ch: cursorOffset || 0 });
        });
      } else {
        doc.replaceRange(insertion, { line: cursor.line, ch: 0 });
        doc.setCursor({ line: cursor.line, ch: cursorOffset || 0 });
      }
    },
    toggleHtml: function() {
      this.showHtml = !this.showHtml;
    },
    closeDialog: function() {
      this.showHtml = false;
    },
    copyHtmlToClipboard() {
      this.$copyText(this.html).then(
        function(e) {
          alert("Copied HTML to clipboard");
        },
        function(e) {
          alert("ERROR: Can not copy to clipboard");
        }
      );
    },
    copyMarkdownToClipboard() {
      this.$copyText(this.markdown).then(
        function(e) {
          alert("Copied markdown to clipboard");
        },
        function(e) {
          alert("ERROR: Can not copy to clipboard");
        }
      );
    }
  },

  computed: {
    html: function() {
      return beautify_html(`${this.model}`);
    },
    markdown: function() {
      return this.editor.getValue();
    }
  },
  data() {
    return {
      model: "",
      dialog: false,
      notifications: false,
      showHtml: false,
      footnote: 1,
      editor: null
    };
  }
};
</script>

<style>
@import url("../../node_modules/codemirror/lib/codemirror.css");
/* @import url("../../node_modules/github-markdown-css/github-markdown.css"); */

.CodeMirror {
  height: 100vh !important;
  background: #fff;
}

.markdown-container {
}

.markdown-body {
  height: 100vh;
  background: #fff;
  overflow-y: auto;
}

#showHtml {
  font-weight: 900;
}

code:after,
code:before,
kbd:after,
kbd:before {
  content: "";
  /* letter-spacing: -1px; */
}

code {
  background-color: #f5f5f5;
  color: #333;
  box-shadow: none;
}

code.html {
  font-size: 14px;
  background: #fff;
  margin-top: 20px;
  padding-left: 20px;
  padding-right: 10px;
  font-weight: 700;
}

.v-dialog {
  margin-top: 54px;
}
</style>
