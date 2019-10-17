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
            <div class="text-xs-center d-flex align-center">
              <v-tooltip bottom>
                <v-btn icon @click="copyHtmlToClipboard" slot="activator" dark>
                  <v-icon>assignment</v-icon>
                </v-btn>
                <span>Copy HTML to clipboard</span>
              </v-tooltip>
            </div>
          </v-toolbar>

          <v-layout row wrap>
            <v-flex xs12>
              <pre><code class="html">{{html}}
              </code></pre>
            </v-flex>
          </v-layout>
        </v-card>
      </v-dialog>

      <v-dialog v-model="showYaml" width="80%" class="htmlDialog">
        <v-card>
          <v-toolbar dark color="indigo">
            <v-btn icon @click.native="toggleYaml" dark>
              <v-icon>close</v-icon>
            </v-btn>
            <h1>DOCUMENT YAML</h1>
            <v-spacer></v-spacer>
          </v-toolbar>

          <v-layout row wrap>
            <v-flex xs12>
              <div style="padding: 20px 20px;">
                <tree-view
                  :data="yaml"
                  :options="{ maxDepth: 5 }"
                  class="mt-3"
                ></tree-view>
              </div>
            </v-flex>
          </v-layout>
        </v-card>
      </v-dialog>

      <div
        v-if="$browserDetect.isIE"
        class="text-xs-center pt-5 pb-5"
        style="background-color: red; margin-top: 140px;"
      >
        <h1 style="color: white">
          Your browser is out of date.
          <br />In order to use this application, please update to the latest
          <br />
          <a href="https://www.google.com/chrome/" class="browserDetect"
            >Chrome</a
          >,
          <a
            href="https://www.mozilla.org/en-US/firefox/new/"
            class="browserDetect"
            >Firefox</a
          >, or
          <a
            href="https://www.microsoft.com/en-us/windows/microsoft-edge"
            class="browserDetect"
            >Microsoft Edge</a
          >.
        </h1>
      </div>

      <!-- <v-layout
        style="margin-top: 50px; background: #eee; border-bottom: 1px solid #bbb;"
      >
        <v-flex xs6>
          <v-btn
            dark
            outline
            small
            color="blue accent-3"
            class="target"
            @click.prevent="getEntity('mdToClipboard')"
            >MARKDOWN</v-btn
          >
        </v-flex>
        <v-flex xs6>
          <v-btn
            outline
            dark
            small
            color="blue accent-3"
            class="target"
            @click.prevent="getEntity('copyHtml')"
            >WEB PREVIEW</v-btn
          >
        </v-flex>
      </v-layout> -->

      <div
        class="master"
        style="margin-top: 50px; background: #eee; border-bottom: 1px solid #bbb;"
      >
        <v-layout row wrap>
          <v-flex xs12 sm6>
            <textarea id="editor" style="margin-top: -5px;"></textarea>
          </v-flex>
          <v-flex
            xs12
            sm6
            style="margin-top: -0px; padding-right: 0px; padding-left: 5px; "
          >
            <div
              class="markdown-body"
              style="padding-left: 10px; padding-right: 10px; padding-top: 10px;"
              id="viewer-scroll"
            >
              <div v-html="model" :style="getBottomPadding"></div>
            </div>
          </v-flex>
        </v-layout>
      </div>
    </v-content>
  </div>
</template>

<script>
/* eslint-disable no-console */
import config from "@/config";

import { EventBus } from "@/event-bus.js";
import { store } from "@/store";

const { BitlyClient } = require("bitly");
const bitly = new BitlyClient(process.env.VUE_APP_BITLY, {});
let FileSaver = require("file-saver");
let loremIpsum = require("lorem-ipsum");

/* Thanks to: https://github.com/musicbed/mirrormark/blob/master/src/js/mirrormark.js */
const beautify_html = require("js-beautify").html;
let codeMirror = require("codemirror");

let md = require("markdown-it")(config.markdownItOptions)
  .use(require("markdown-it-footnote"))
  .use(require("markdown-it-named-headers"))
  .use(require("markdown-it-emoji"))
  .use(require("markdown-it-attrs"))
  .use(require("@/markdown-it-meta-fork"))
  .use(require("markdown-it-container"))
  .use(require("markdown-it-highlightjs"))
  .use(require("markdown-it-multimd-table"), config.markdownItMultimdTableOptions);

require("codemirror/mode/markdown/markdown");
require("codemirror/addon/edit/closebrackets");

// function makeMarker() {
//   var marker = document.createElement("div");
//   marker.style.color = "#822";
//   marker.innerHTML = "●";
//   return marker;
// }

export default {
  components: {},
  mounted() {
    this.initializeEditor();
    this.initializeEditorEvents();
    this.setInitialText();
    this.initializeComponentEventListeners();
    /**
     * Turn off autosave in dev mopde
     */
    if (process.env.NODE_ENV != "development") {
      this.initializeAutoSave();
    }
  },
  methods: {
    initializeEditor: function() {
      this.editor = codeMirror.fromTextArea(
        document.getElementById("editor"),
        config.codeMirrorOptionsMarkdown
      );
    },
    initializeEditorEvents: function() {
      EventBus.$emit("updateWordCount", this.wordCount);
      this.editorScroll = document.querySelector(".CodeMirror-scroll");
      this.viewerScroll = document.querySelector("#viewer-scroll");
      this.editorScroll.addEventListener("scroll", this.updateViewerScroll);
      this.viewerScroll.addEventListener("scroll", this.updateEditorScroll);
      this.editor.on("change", cm => {
        this.model = md.render(cm.getValue());
        this.line = cm.getCursor(true);
        this.lintMarkdown(cm.getValue());
        this.config.session.markdownInProgress = cm.getValue();
        // cm.setGutterMarker(3, "breakpoints", makeMarker());

        /**
         * Check if YAML delimter ('---') is present. If not, clear YAML.
         * This is necessary since deleting YAML delimiters doesn't delete previously rendered YAML from markdown-it-meta.
         */
        let yamlCheck = this.editor.doc.getLine(0);
        if (yamlCheck === "---") {
          this.yaml = md.meta;
        } else {
          this.yaml = {};
        }
      });

      // this.editor.on("optionChange", cm => {
      //   //console.log("option changed");
      // });
    },
    setInitialText() {
      /* Is there html -> markdown in config.session? */
      if (Object.entries(this.config.session.convertedMarkdown).length != 0) {
        this.editor.getDoc().setValue(this.config.session.convertedMarkdown);
        this.lintMarkdown(this.editor.getValue());
        this.config.session.convertedMarkdown = "";
        return;
      }

      /* Is there markdown-in-progress in config.session? */
      if (Object.entries(this.config.session.markdownInProgress).length != 0) {
        this.editor.getDoc().setValue(this.config.session.markdownInProgress);
        this.lintMarkdown(this.editor.getValue());
        return;
      }

      /* If neither, then first check for localstorage key ... */
      if (config.localStorageKey in localStorage) {
        let markdown = localStorage.getItem(config.localStorageKey);
        this.editor.getDoc().setValue(markdown);
        this.lintMarkdown(this.editor.getValue());
      } else {
        /* ... and if no localstage key, insert generic welcome. */
        let welcomeMarkdown = require(`@/snippets/welcome.md`);
        this.editor.getDoc().setValue(welcomeMarkdown);
        this.lintMarkdown(this.editor.getValue());
      }
    },
    initializeComponentEventListeners() {
      EventBus.$on("entityEvent", action => {
        this.insertEntity(action);
      });
      EventBus.$on("loadMarkdown", content => {
        this.editor.getDoc().setValue(content);
        console.log("Load markdown event: ", content);
      });
      // ping
      EventBus.$on("getMarkdown", () => {
        // pong
        EventBus.$emit("sendMarkdown", this.markdown);
      });
      EventBus.$on("getSnippet", snippet => {
        this.insert(snippet + "\n");
      });

      EventBus.$on("scrollSync", isScrollSynced => {
        this.isScrollSynced = isScrollSynced;
        let status = this.isScrollSynced ? "ON" : "OFF";
        EventBus.$emit("displayStatus", `Scroll sync turned ${status}`);
      });

      EventBus.$on("updateEditorConfig", ({ option, value }) => {
        this.editor.setOption(option, value);
      });

      EventBus.$on("saveMarkdownToLocalStorage", () => {});
    },
    initializeAutoSave() {
      window.setInterval(() => {
        let saveTime = new Date();
        localStorage.setItem(config.localStorageKey, this.markdown);
        console.log("Autosaved to local storage: ", saveTime);
      }, config.autoSaveInterval);
    },
    lintMarkdown(content) {
      const options = {
        strings: {
          content
        },
        config: require(`@/${this.config.lintingRulePath}${
          this.config.lintingDefault
        }`)
      };
      window.markdownlint(options, (err, result) => {
        let lintStatus = {};
        if (!err) {
          if (result.toString().length) {
            console.error("Linting error");
            console.log(result.toString());
            lintStatus.isError = true;
            lintStatus.result = result;
          } else {
            //console.log("No linting errors");
            lintStatus.isError = false;
            lintStatus.result = {};
            lintStatus.result.content = "";
          }
          this.$nextTick(() => {
            EventBus.$emit("lintStatus", lintStatus);
          });
        }
      });
    },
    clear() {
      this.editor.getDoc().setValue("");
      this.model = "";
      this.yaml = {};
      EventBus.$emit("displayStatus", "Document content and metadata cleared.");
    },
    updateViewerScroll() {
      if (this.isScrollSynced) {
        this.editorScrollTop = this.editor.getScrollInfo().top;

        if (this.editorScrollTop > config.scrollOffset) {
          this.viewerScroll.scrollTop =
            this.editorScrollTop + config.scrollOffset;
        } else {
          this.viewerScroll.scrollTop = this.editorScrollTop;
        }
      }
    },
    updateEditorScroll(e) {
      this.viewerScrollTop = e.target.scrollTop;
      return null;
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
          this.insertBefore(config.icjiaImage, 2);
          break;
        case "table":
          this.insertBefore(config.icjiaTable, 2);
          break;
        case "unorderedList":
          this.insertBefore("* ", 2);
          break;
        case "orderedList":
          this.insertBefore("1. ", 2);
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
        case "loremipsum":
          this.insert(this.getLoremIpsumEntity());
          break;
        case "centerText":
          this.insertAfter(config.centerText);
          break;
        case "centerImage":
          this.insertAfter(config.centerImage);
          break;
        case "mdToClipboard":
          this.copyMarkdownToClipboard();
          break;
        case "showHtml":
          this.toggleHtml();
          break;
        case "showYaml":
          this.toggleYaml();
          break;
        case "saveHtml":
          this.saveHtml();
          break;
        case "copyHtml":
          this.copyHtmlToClipboard();
          break;
        case "saveMarkdown":
          this.saveMarkdown();
          break;
        case "clear":
          this.clear();
          break;
        case "shortenLink":
          this.shortenLink();
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
    insertAfter: function(end) {
      let doc = this.editor.getDoc();
      let cursor = doc.getCursor();

      if (doc.somethingSelected()) {
        let selection = doc.getSelection();
        doc.replaceSelection(selection + end);
      } else {
        doc.replaceRange(end, { line: cursor.line, ch: cursor.ch });
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
    toggleYaml: function() {
      this.showYaml = !this.showYaml;
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
      EventBus.$emit("isProcessing", true);
      this.$copyText(this.html).then(
        function() {
          EventBus.$emit("displayStatus", "HTML copied to clipboard.");
          EventBus.$emit("isProcessing", false);
        },
        function() {
          EventBus.$emit(
            "displayStatus",
            "ERROR: HTML not copied to clipboard."
          );
          EventBus.$emit("isProcessing", false);
        }
      );
      this.showHtml = false;
    },
    copyMarkdownToClipboard() {
      EventBus.$emit("isProcessing", true);
      this.$copyText(this.markdown).then(
        function() {
          EventBus.$emit("isProcessing", false);
          EventBus.$emit("displayStatus", "Markdown copied to clipboard.");
        },
        function() {
          EventBus.$emit("isProcessing", false);
          EventBus.$emit(
            "displayStatus",
            "ERROR: Markdown not copied to clipboard."
          );
        }
      );
    },
    getLoremIpsumEntity() {
      return loremIpsum(this.config.loremIpsum) + " ";
    },
    getEntity(action) {
      EventBus.$emit("entityEvent", action);
    },

    async shortenLink() {
      EventBus.$emit("isProcessing", true);
      let doc = this.editor.getDoc();
      let selection = doc.getSelection();
      let result;
      try {
        result = await bitly.shorten(selection);
        doc.replaceSelection(result.url);
        EventBus.$emit("isProcessing", false);
        EventBus.$emit("displayStatus", "Short URL successfully generated");
      } catch (e) {
        EventBus.$emit("isProcessing", false);
        EventBus.$emit("displayStatus", "ERROR: Not a valid URL");
        console.log(e);
      }
    }
  },

  computed: {
    html: function() {
      return beautify_html(`${this.model}`);
    },
    markdown: function() {
      return this.editor.getValue();
    },
    wordCount: function() {
      /**
       * Regex to ignore words in YAML
       *
       * Version 1:
       * /(?<=---)([\s\S]*?)(?=---)/gi
       *
       * Version 2:
       * ---([\s\S]*?)---
       *
       */

      if (this.editor) {
        let str = this.editor.getValue();
        let yamlWordCount = 0;
        if (str.length > 0) {
          let yaml = /---([\s\S]*?)---/gi.exec(str);
          //console.log(yaml);
          if (yaml != null) {
            yamlWordCount = yaml[0].trim().split(" ").length;
            //console.log("YAML word count ", yamlWordCount);
          }
        }

        let wordCount = this.editor.getValue().split(" ").length;
        //console.log(wordCount);
        if (wordCount <= 1) {
          return 0;
        } else {
          return wordCount - yamlWordCount;
        }
      } else {
        return 0;
      }
    },
    scrollOffset: function() {
      let scrollOffset = this.editorScrollTop - this.viewerScrollTop;
      return scrollOffset;
    },
    getBottomPadding: function() {
      return `padding-bottom: ${config.viewerBottomPadding}px`;
    },
    isYaml: function() {
      /**
       * Convert YAML object to boolean
       */
      return !!parseInt(Object.keys(this.yaml).length);
    }
  },
  watch: {
    wordCount() {
      EventBus.$emit("updateWordCount", this.wordCount);
    },
    isYaml() {
      EventBus.$emit("yamlStatus", this.isYaml);
    },
    editor() {}
  },
  data() {
    return {
      model: "",
      dialog: false,
      notifications: false,
      showHtml: false,
      showYaml: false,
      footnote: 1,
      editor: null,
      isHidden: true,
      config: store.config,
      offsetTop: 0,
      scrollElement: null,
      editorScroll: null,
      viewerScroll: null,
      isScrollSynced: true,
      editorScrollTop: null,
      viewerScrollTop: null,
      yaml: {},
      isLintingError: false
    };
  }
};
</script>

<style>
@import url("../../node_modules/codemirror/lib/codemirror.css");

.CodeMirror {
  background: #fff;
  height: 100vh !important;
}

.markdown-body {
  background: #fff;
  overflow-y: auto;
  height: 100vh !important;
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

a.browserDetect {
  color: #333 !important;
}
.lint-error {
  color: #ccc;
}
</style>
