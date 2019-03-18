<template>
  <div class="markdown-page">
    <div class="wrapper">
      <div class="box header">
        <v-toolbar dark color="indigo" dense>
          <v-toolbar-side-icon></v-toolbar-side-icon>

          <v-toolbar-title class="white--text">Toolbar 1</v-toolbar-title>

          <v-spacer></v-spacer>
        </v-toolbar>
        <v-toolbar dark color="grey" dense>
          <v-toolbar-side-icon></v-toolbar-side-icon>

          <v-toolbar-title class="white--text">Toolbar 2</v-toolbar-title>

          <v-spacer></v-spacer>
        </v-toolbar>
      </div>
      <div class="box source">Source</div>
      <div class="box target">
        Target
        <br />
      </div>

      <div class="box footer">
        <v-footer height="auto" color="indigo">
          <v-layout justify-center row wrap>
            <v-flex
              indigo
              darken-2
              py-3
              text-xs-center
              white--text
              xs12
              style="font-size: 12px;"
            >
              &copy;2019 —
              <strong>Illinois Criminal Justice Information Authority</strong>
            </v-flex>
          </v-layout>
        </v-footer>
      </div>
    </div>
  </div>
</template>

<script>
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
  .use(require("markdown-it-highlightjs"));

require("codemirror/mode/markdown/markdown");
require("codemirror/addon/edit/closebrackets");

export default {
  components: {},
  mounted() {},
  methods: {},

  computed: {},
  data() {
    return {};
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

.header {
  grid-area: header;
}

.footer {
  grid-area: footer;
}

.wrapper {
  display: grid;
  grid-gap: 1px;
  grid-template-areas:
    "header  header  header header"
    "source source target target"
    "footer  footer  footer footer";
  background-color: #aaa;
  color: #fff;
  min-height: 99.85vh !important;
  grid-template-rows: fit-content(150px) 1fr 50px;
}

.box {
  /* background-color: #eee; */
  color: #333;
}

.header,
.footer {
  background-color: #999;
}
</style>
