<template>
  <div class="markdown-page">
    <v-content>
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

      <v-layout
        style="margin-top: 50px; background: #eee; border-bottom: 1px solid #bbb;"
      >
        <v-flex xs12 :sm6="!displayHtmlPreview" :sm4="displayHtmlPreview">
          <v-btn dark small color="blue accent-3" class="target"
            >RAW HTML</v-btn
          >
        </v-flex>
        <v-flex v-if="displayHtmlPreview" xs12 :sm4="displayHtmlPreview">
          <v-btn dark small color="blue accent-3" class="target">PREVIEW</v-btn>
        </v-flex>
        <v-flex xs12 :sm6="!displayHtmlPreview" :sm4="displayHtmlPreview">
          <v-btn dark small color="blue accent-3" class="target"
            >MARKDOWN</v-btn
          >
        </v-flex>
      </v-layout>

      <div class="master">
        <v-layout row wrap>
          <v-flex xs12 :sm6="!displayHtmlPreview" :sm4="displayHtmlPreview">
            <textarea id="editor" style="margin-top: -5px;"></textarea>
          </v-flex>
          <v-flex
            v-if="displayHtmlPreview"
            xs12
            :sm4="displayHtmlPreview"
            style="margin-top: -0px; padding-right: 0px; padding-left: 5px; "
          >
            <div
              class="rendered-body"
              style="padding-left: 10px; padding-right: 10px; padding-top: 10px;"
              id="viewer-scroll"
            >
              <div :style="getBottomPadding" v-html="html"></div>
            </div>
          </v-flex>
          <v-flex
            xs12
            :sm6="!displayHtmlPreview"
            :sm4="displayHtmlPreview"
            style="margin-top: -0px; padding-right: 0px; padding-left: 5px; "
          >
            <div
              class="markdown-body"
              style="padding-left: 10px; padding-right: 10px; padding-top: 10px; background: #eee;"
              id="viewer-scroll"
            >
              <div :style="getBottomPadding">
                <pre class="markdown">{{ model }}</pre>
              </div>
            </div>
          </v-flex>
        </v-layout>
      </div>
    </v-content>
  </div>
</template>

<script>
import config from "@/config";
import { EventBus } from "@/event-bus.js";
import { store } from "@/store";

let FileSaver = require("file-saver");

const beautify_html = require("js-beautify").html;
const codeMirror = require("codemirror");

require("codemirror/mode/markdown/markdown");
require("codemirror/addon/edit/closebrackets");

let md = require("markdown-it")(config.markdownItOptions)
  .use(require("markdown-it-footnote"))
  .use(require("markdown-it-named-headers"))
  .use(require("markdown-it-emoji"))
  .use(require("markdown-it-attrs"))
  .use(require("@/markdown-it-meta-fork"))
  .use(require("markdown-it-container"))
  .use(require("markdown-it-highlightjs"));

const turndownService = new TurndownService({ headingStyle: "atx" });

export default {
  data() {
    return {
      model: "",
      html: "",
      config: store.config
    };
  },
  mounted() {
    this.initializeEditor();
    this.editor.getDoc().setValue("<h1>Paste HTML here</h1>");
    this.initializeEditorEvents();
    this.initializeToolbarEvents();

    //console.log(this.displayHtmlPreview);
  },
  methods: {
    initializeEditor: function() {
      this.editor = codeMirror.fromTextArea(
        document.getElementById("editor"),
        this.config.codeMirrorOptionsHtml
      );
    },

    initializeEditorEvents: function() {
      this.editor.on("change", cm => {
        //this.model = md.render(cm.getValue());
        // this.line = cm.getCursor(true);
        // this.lintMarkdown(cm.getValue());
        this.model = turndownService.turndown(cm.getValue());
        this.html = md.render(this.model);

        //console.log(turndownService.turndown(cm.getValue()));
        //console.log(this.model);
      });
    },
    initializeToolbarEvents() {
      EventBus.$on("copyMdToClipboard", () => {
        console.log("Content to copy: ", this.model);
        EventBus.$emit("isProcessing", true);
        this.$copyText(this.model).then(
          function(e) {
            EventBus.$emit("displayStatus", "Markdown copied to clipboard.");
            EventBus.$emit("isProcessing", false);
          },
          function(e) {
            EventBus.$emit(
              "displayStatus",
              "ERROR: Markdown not copied to clipboard."
            );
            EventBus.$emit("isProcessing", false);
          }
        );
        // this.showHtml = false;
      });

      EventBus.$on("saveMdToFile", () => {
        console.log("saving to File");
        try {
          let blob = new Blob([this.model], {
            type: "text/plain;charset=utf-8"
          });
          FileSaver.saveAs(blob, "icjiaMarkdown--convertedFromHtmlL.md");
          EventBus.$emit("displayStatus", "Markdown successfully saved.");
        } catch (e) {
          EventBus.$emit("displayStatus", "ERROR: Markdown not saved.");
        }
      });

      EventBus.$on("sendToEditor", () => {
        //console.log("send to editor: ", this.config.session.convertedMarkdown);
        EventBus.$emit(
          "displayStatus",
          "Converted Markdown successfully imported."
        );
        this.config.session.convertedMarkdown = this.model;
        this.$router.push("/");
      });
    }
  },
  computed: {
    getBottomPadding: function() {
      return `padding-bottom: ${this.config.viewerBottomPadding}px`;
    },
    markdownResults() {
      return JSON.stringify(this.model);
    },
    displayHtmlPreview() {
      return this.config.session.displayHtmlPreview;
    }
  },
  watch: {}
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

/* .v-btn.target {
  max-width: 20px;
  margin: 1px;
  font-size: 10px;
  margin: -1px 0px 0px 0px;
}

.v-btn.target .v-btn__content {
  color: #000 !important;
} */

pre.markdown {
  background-color: #eee !important;
  padding: 0 !important;
  margin: 0 !important;
  white-space: pre-wrap !important;
  word-wrap: break-word !important;
}
</style>
