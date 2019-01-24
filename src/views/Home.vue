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
      <div style="margin-top: 75px;">
        <v-layout row wrap>
          <v-flex xs12 sm6>
            <textarea id="editor" style="margin-top: -5px;"></textarea>
          </v-flex>
          <v-flex xs12 sm6 style="margin-top: -0px; padding-right: 0px; padding-left: 5px; ">
            <div
              class="markdown-body"
              style="padding-left: 10px; padding-right: 10px; padding-top: 10px;"
            >
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
const FileSaver = require("file-saver");

/* Thanks to: https://github.com/musicbed/mirrormark/blob/master/src/js/mirrormark.js */
const beautify_html = require("js-beautify").html;
let codeMirror = require("codemirror");
let md = require("markdown-it")(config.markdownItOptions)
  .use(require("markdown-it-footnote"))
  .use(require("markdown-it-named-headers"))
  .use(require("markdown-it-emoji"))
  .use(require("markdown-it-attrs"));
require("codemirror/mode/markdown/markdown");
require("codemirror/addon/edit/closebrackets");

export default {
  components: {
    NavMarkdown
  },
  mounted() {
    this.initializeEditor();
    this.initializeEditorEvents();
    this.setInitialText();

    EventBus.$on("entityEvent", action => {
      this.insertEntity(action);
    });
    EventBus.$on("loadMarkdown", content => {
      this.editor.getDoc().setValue(content);
    });

    EventBus.$emit("updateWordCount", this.wordCount);
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
    setInitialText() {
      this.editor.getDoc().setValue(config.templates.welcome);
    },
    clear() {
      this.editor.getDoc().setValue("");
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
          this.insert(`[^1] `);
          this.footnote++;
          break;
        case "table":
          this.insert(`${config.templates.table}`);
          break;
        case "loremipsum":
          this.insert(`${config.templates.loremipsum}`);
          // this.generateLoremIpsum();
          break;
        case "mdToClipboard":
          this.copyMarkdownToClipboard();
          break;
        case "showHtml":
          this.toggleHtml();
          break;
        case "saveHtml":
          this.saveHtml();
          break;
        case "saveMarkdown":
          this.saveMarkdown();
          break;
        case "clear":
          this.clear();
          break;
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
    saveHtml: function() {
      try {
        let blob = new Blob([this.html], { type: "text/plain;charset=utf-8" });
        FileSaver.saveAs(blob, "icjiaMarkdownToHtml.html");
        EventBus.$emit("displayStatus", "HTML successfully saved.");
      } catch (e) {
        EventBus.$emit("displayStatus", "ERROR: HTML not saved.");
      }
    },
    saveMarkdown: function() {
      try {
        let blob = new Blob([this.markdown], {
          type: "text/plain;charset=utf-8"
        });
        FileSaver.saveAs(blob, "icjiaMarkdown.md");
        EventBus.$emit("displayStatus", "Markdown successfully saved.");
      } catch (e) {
        EventBus.$emit("displayStatus", "ERROR: Markdown not saved.");
      }
    },
    closeDialog: function() {
      this.showHtml = false;
    },
    copyHtmlToClipboard() {
      this.$copyText(this.html).then(
        function(e) {
          EventBus.$emit("displayStatus", "HTML copied to clipboard.");
        },
        function(e) {
          EventBus.$emit(
            "displayStatus",
            "ERROR: HTML not copied to clipboard."
          );
        }
      );
    },
    copyMarkdownToClipboard() {
      this.$copyText(this.markdown).then(
        function(e) {
          EventBus.$emit("displayStatus", "Markdown copied to clipboard.");
        },
        function(e) {
          EventBus.$emit(
            "displayStatus",
            "ERROR: Markdown not copied to clipboard."
          );
        }
      );
    },
    generateLoremIpsum() {}
  },

  computed: {
    html: function() {
      return beautify_html(`${this.model}`);
    },
    markdown: function() {
      return this.editor.getValue();
    },
    wordCount: function() {
      if (this.editor) {
        let wordCount = this.editor.getValue().split(" ").length - 1;
        return wordCount;
      } else {
        return 0;
      }
    }
  },
  watch: {
    wordCount() {
      EventBus.$emit("updateWordCount", this.wordCount);
    }
  },
  data() {
    return {
      model: "",
      dialog: false,
      notifications: false,
      showHtml: false,
      footnote: 1,
      editor: null,
      isHidden: true
    };
  }
};
</script>

<style>
@import url("../../node_modules/codemirror/lib/codemirror.css");

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
