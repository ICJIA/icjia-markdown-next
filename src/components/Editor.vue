<template>
  <div class="wrapper markdown">
    <div class="box header">
      <nav-primary></nav-primary>
      <nav-secondary></nav-secondary>
    </div>

    <div class="box source">
      <textarea id="editor-source"></textarea>
    </div>
    <div
      class="box target markdown-body"
      id="viewer-scroll"
      v-html="target"
    ></div>
  </div>
</template>

<script>
/**
 * Custom components
 */

import NavPrimary from "@/components/NavPrimary";
import NavSecondary from "@/components/NavSecondary";

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
  components: {
    NavPrimary,
    NavSecondary
  },
  created() {
    this.modes = Object.keys(this.config.modes);

    let modeParam = this.$route.params.modeParam;
    let mode;

    if (modeParam !== undefined && this.modes.includes(modeParam)) {
      mode = modeParam;
    } else {
      mode = this.config.session.mode;
    }
    mode = mode.toLowerCase();
    this.config.session.mode = mode;
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
  },
  methods: {
    initializeEditor: function() {
      this.editor = codeMirror.fromTextArea(
        document.getElementById("editor-source"),
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
        this.target = md.render(cm.getValue());
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
      this.editor.on("optionChange", cm => {
        //console.log("option changed");
      });
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
    initializeEventListeners() {
      EventBus.$on("triggerAction", action => {
        console.log("Action: ", action);
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
    }
  },
  computed: {},
  data() {
    return {
      config: store.config,
      target: ""
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
  padding: 10px;
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
  min-height: 99.8vh !important;
  grid-template-rows: fit-content(150px) 1fr;
}

.wrapper.markdown {
  grid-template-areas:
    "header   header"
    "source  target"
    "footer  footer";
  grid-template-columns: minmax(50%, 1fr) minmax(50%, 1fr);
}

.CodeMirror {
  background: #fff;
  min-height: 100% !important;
}
</style>
