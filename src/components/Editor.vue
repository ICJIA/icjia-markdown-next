<template>
  <div class="markdown-page">
    <v-content>
      <nav-primary></nav-primary>
      <nav-secondary></nav-secondary>
      <div
        class="master"
        style="margin-top: 100px; background: #fff; border-bottom: 1px solid #bbb;"
      >
        <v-layout row wrap>
          <v-flex xs12 sm6>
            <textarea id="editor"></textarea>
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
              <div
                v-html="config.session.rendered"
                :style="getBottomPadding"
              ></div>
            </div>
          </v-flex>
        </v-layout>
      </div>
    </v-content>
  </div>
</template>

<script>
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

const { BitlyClient } = require("bitly");
const bitly = new BitlyClient(process.env.VUE_APP_BITLY, {});
const FileSaver = require("file-saver");
const loremIpsum = require("lorem-ipsum");
/* Thanks to: https://github.com/musicbed/mirrormark/blob/master/src/js/mirrormark.js */
const beautify_html = require("js-beautify").html;

export default {
  components: {},
  created() {
    this.modes = Object.keys(this.config.modes);

    let modeParam = this.$route.params.modeParam;
    let mode;

    // if (!this.modes.includes(modeParam)) {
    //   this.$router.push("/404");
    // }

    if (modeParam !== undefined && this.modes.includes(modeParam)) {
      mode = modeParam;
    } else {
      mode = this.config.session.mode;
    }
    mode = mode.toLowerCase();
    this.config.session.mode = mode;
    // eslint-disable-next-line no-console
    console.log("Mode: ", this.config.session.mode);
  },
  mounted() {
    this.initializeEditor();
    this.initializeEditorEvents();
    this.setInitialText();
    this.initializeEventListeners();

    /**
     * Turn off autosave in dev mopde
     */
    if (process.env.NODE_ENV != "development") {
      this.initializeAutoSave();
    }
    this.loadStyleSheet(this.config.session.mode);
  },
  methods: {
    initializeEditor: function() {
      this.editor = codeMirror.fromTextArea(
        document.getElementById("editor"),
        config.codeMirrorOptionsMarkdown
      );
      this.editor.setSize(null, "100%");
    },
    initializeEditorEvents: function() {
      EventBus.$emit("updateWordCount", this.wordCount);
      this.editorScroll = document.querySelector(".CodeMirror-scroll");
      this.viewerScroll = document.querySelector("#viewer-scroll");
      this.editorScroll.addEventListener("scroll", this.updateViewerScroll);
      this.viewerScroll.addEventListener("scroll", this.updateEditorScroll);
      this.editor.on("change", cm => {
        let rendered = md.render(cm.getValue());
        this.line = cm.getCursor(true);
        this.lintMarkdown(cm.getValue());
        this.config.session.markdown = cm.getValue();
        this.config.session.rendered = rendered;
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
      // eslint-disable-next-line no-unused-vars
      this.editor.on("optionChange", cm => {
        //console.log("option changed");
      });
    },
    loadStyleSheet(mode) {
      if (this.config.session.currentStyleSheet) {
        //console.log("removing style sheet already loaded");
        document
          .querySelector(
            `link[href$="${this.config.stylesheetStaticPath}${
              this.config.session.currentStyleSheet
            }"]`
          )
          .remove();
      }
      this.config.session.mode = mode;
      let currentStyleSheet = this.stylesheetObj.value;
      //console.log(currentStyleSheet);
      let file = document.createElement("link");
      file.rel = "stylesheet";
      file.href = `${this.config.stylesheetStaticPath}${currentStyleSheet}`;
      document.head.appendChild(file);
      this.config.session.currentStyleSheet = currentStyleSheet;
    },
    setInitialText() {
      /* Is there markdown-in-progress in config.session? */
      if (Object.entries(this.config.session.markdown).length != 0) {
        this.editor.getDoc().setValue(this.config.session.markdown);
        this.lintMarkdown(this.editor.getValue());
        return;
      }
      /* If not, then first check for localstorage key ... */
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
    initializeEventListeners() {
      EventBus.$on("triggerAction", action => {
        this.doAction(action);
      });
      EventBus.$on("loadMarkdown", content => {
        this.editor.getDoc().setValue(content);
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
      EventBus.$on("setMode", mode => {
        this.loadStyleSheet(mode);
      });
    },
    initializeAutoSave() {
      window.setInterval(() => {
        let saveTime = new Date();
        localStorage.setItem(config.localStorageKey, this.markdown);
        // eslint-disable-next-line no-console
        console.log("Autosaved to local storage: ", saveTime);
      }, config.autoSaveInterval);
    },
    lintMarkdown(content) {
      const options = {
        strings: {
          content
        },
        config: require(`@/${this.config.lintingRulePath}${
          this.config.session.lintingRuleset
        }`)
      };
      window.markdownlint(options, (err, result) => {
        let lintStatus = {};
        if (!err) {
          if (result.toString().length) {
            // eslint-disable-next-line no-console
            console.error("Linting error");
            // eslint-disable-next-line no-console
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
    doAction(action) {
      console.log("Do Action: ", action);
    },
    /**
     *
     * CodeMirror actions
     *
     */
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
    }
  },
  computed: {
    stylesheetObj() {
      return this.config.modes[this.config.session.mode]["stylesheet"];
    },
    getBottomPadding: function() {
      return `padding-bottom: ${config.viewerBottomPadding}px`;
    }
  },
  data() {
    return {
      config: store.config,
      rendered: "",
      line: null,
      dialog: false,
      notifications: false,
      showHtml: false,
      showYaml: false,
      footnote: 1,
      editor: null,
      isHidden: true,
      offsetTop: 0,
      scrollElement: null,
      editorScroll: null,
      viewerScroll: null,
      isScrollSynced: true,
      editorScrollTop: null,
      viewerScrollTop: null,
      yaml: {},
      isLintingError: false,
      currentStyleSheet: null
    };
  }
};
</script>

<style>
@import url("../../node_modules/codemirror/lib/codemirror.css");
.CodeMirror {
  background: #fff;
  height: 89vh !important;
}
.markdown-body {
  background: #fff;
  overflow-y: auto;
  height: 89vh !important;
  border-left: 1px solid #eee;
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
