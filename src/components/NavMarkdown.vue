<template>
  <v-layout
    row
    wrap
    style="position: fixed; top: 48px; width: 100%; z-index: 100;"
  >
    <v-flex xs12>
      <v-toolbar dense>
        <div
          v-for="tool in visibleTools"
          :key="tool.action"
          class="hidden-sm-and-down"
        >
          <v-tooltip bottom>
            <v-btn
              class="navButton"
              slot="activator"
              @click.prevent="getEntity(tool.action)"
            >
              <v-icon>{{ tool.icon }}</v-icon>
            </v-btn>
            <span>{{ tool.tooltip }}</span>
          </v-tooltip>
        </div>

        <v-tooltip bottom>
          <v-menu
            offset-y
            transition="slide-x-transition"
            style="z-index: 150;"
            slot="activator"
          >
            <v-btn icon slot="activator">
              <v-icon>more_vert</v-icon>
            </v-btn>
            <v-list dense>
              <v-list-tile
                v-for="(tool, index) in remainingTools"
                :key="index"
                class="moreEntitites"
              >
                <v-list-tile-title
                  v-on:click="getEntity(tool.action)"
                  style="font-size: 12px;"
                >
                  <v-icon style="width: 35px; font-size: 16px; color: #111">{{
                    tool.icon
                  }}</v-icon>
                  &nbsp;&nbsp;{{ tool.tooltip }}</v-list-tile-title
                >
              </v-list-tile>
              <div v-if="config.displaySnippets">
                <v-subheader
                  class="grey--text text--darken-4"
                  style="font-size: 12px;"
                  >Markdown Snippets & Examples</v-subheader
                >

                <v-list-tile
                  v-for="snippet in config.snippets"
                  :key="snippet.filename"
                  class="moreEntitites"
                >
                  <v-list-tile-title
                    v-on:click="getSnippet(snippet.filename)"
                    style="font-size: 12px;"
                  >
                    <v-icon style="width: 35px; font-size: 16px;"
                      >subject</v-icon
                    >
                    &nbsp;&nbsp;{{ snippet.name }}</v-list-tile-title
                  >
                </v-list-tile>
              </div>

              <div v-if="config.displayUtilities">
                <v-subheader
                  class="grey--text text--darken-4"
                  style="font-size: 12px;"
                  >Utilities</v-subheader
                >

                <v-list-tile class="moreEntitites">
                  <v-list-tile-title
                    style="font-size: 12px;"
                    v-on:click="htmlToMarkdown"
                  >
                    <v-icon style="width: 35px; font-size: 16px;">code</v-icon>
                    &nbsp;&nbsp;Convert HTML to Markdown</v-list-tile-title
                  >
                </v-list-tile>
              </div>

              <div v-if="config.displayExternalResources">
                <v-subheader
                  class="grey--text text--darken-4"
                  style="font-size: 12px;"
                  >External Resources</v-subheader
                >

                <v-list-tile
                  v-for="resource in config.externalResources"
                  :key="resource.url"
                  class="moreEntitites"
                >
                  <v-list-tile-title
                    v-on:click="gotoExternalResource(resource.url)"
                    style="font-size: 12px;"
                  >
                    <v-icon style="width: 35px; font-size: 16px;"
                      >open_in_new</v-icon
                    >
                    &nbsp;&nbsp;{{ resource.name }}</v-list-tile-title
                  >
                </v-list-tile>
              </div>
            </v-list>
          </v-menu>
          <span>Snippets & External Resources</span>
        </v-tooltip>

        <v-divider class="mx-2" vertical></v-divider>

        <v-tooltip bottom>
          <v-btn
            class="navButton"
            dark
            color="blue darken-4"
            slot="activator"
            @click.prevent="getEntity('saveMarkdown')"
          >
            <v-icon dark>save_alt</v-icon>
          </v-btn>
          <span>{{ config.tooltips["saveMd"].text }}</span>
        </v-tooltip>

        <v-tooltip bottom>
          <v-dialog
            v-model="dialog"
            persistent
            max-width="290"
            slot="activator"
          >
            <v-btn
              class="navButton"
              slot="activator"
              color="blue darken-4"
              dark
            >
              <v-icon dark>cloud_upload</v-icon>
            </v-btn>
            <v-card class="text-xs-center">
              <v-card-title class="headline">Load Markdown File</v-card-title>
              <v-card-text>Load a previously saved .md file</v-card-text>
              <input type="file" class="custom-file-input" id="fileInput" />
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" flat @click="dialog = false"
                  >Cancel</v-btn
                >
                <v-btn color="green darken-1" flat @click="loadMarkdown"
                  >Load file</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
          <span>{{ config.tooltips["loadMd"].text }}</span>
        </v-tooltip>

        <v-tooltip bottom>
          <v-btn
            dark
            color="blue darken-4"
            slot="activator"
            @click.prevent="getEntity('mdToClipboard')"
            class="navButton"
          >
            <v-icon dark>assignment</v-icon>
          </v-btn>
          <span>{{ config.tooltips["copyMd"].text }}</span>
        </v-tooltip>

        <v-divider class="mx-2" vertical></v-divider>

        <v-tooltip bottom max-width="200">
          <v-btn
            class="navButton"
            :dark="isYaml"
            :disabled="!isYaml"
            color="teal darken-2"
            slot="activator"
            @click.prevent="getEntity('showYaml')"
          >
            <v-icon dark>power</v-icon>
          </v-btn>
          <span v-html="config.tooltips['showYaml'].text"></span>
        </v-tooltip>

        <!-- <v-divider class="mx-2" vertical></v-divider>

        <v-tooltip bottom max-width="200">
          <v-btn
            dark
            class="navButton"
            color="blue-grey lighten-1"
            slot="activator"
            @click.prevent="htmlToMarkdown"
          >
            <v-icon dark>code</v-icon>
          </v-btn>
          <span v-html="config.tooltips['htmlToMarkdown'].text"></span>
        </v-tooltip> -->

        <v-spacer></v-spacer>
        <v-select
          :items="config.stylesheets"
          label="Stylesheet"
          v-model="stylesheetSelection"
          @change="loadStyleSheet"
          color="indigo"
          item-text="display"
          v-if="config.allowManualStyleSelection"
        ></v-select>
        &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
        <v-tooltip bottom>
          <v-btn
            small
            color="blue darken-4"
            dark
            slot="activator"
            @click.prevent="getEntity('saveHtml')"
            style="font-size: 10px; font-weight: 900"
            v-if="config.allowSaveAsHtml"
            >Save HTML
            <v-icon dark right style="font-size: 14px; font-weight: 900"
              >save_alt</v-icon
            >
          </v-btn>
          <span>{{ config.tooltips["saveHtml"].text }}</span>
        </v-tooltip>
        <v-tooltip bottom>
          <v-btn
            small
            color="blue darken-4"
            dark
            slot="activator"
            @click.prevent="getEntity('showHtml')"
            style="font-size: 10px; font-weight: 900"
            >Show HTML
            <v-icon dark right style="font-size: 14px;font-weight: 900"
              >code</v-icon
            >
          </v-btn>
          <span>{{ config.tooltips["showHtml"].text }}</span>
        </v-tooltip>
        <v-tooltip bottom>
          <v-btn
            small
            dark
            color="blue darken-4"
            slot="activator"
            @click.prevent="getEntity('copyHtml')"
            style="font-size: 10px; font-weight: 900"
            >Copy HTML
            <v-icon dark right style="font-size: 14px; font-weight: 900"
              >assignment</v-icon
            >
          </v-btn>
          <span>{{ config.tooltips["copyHtml"].text }}</span>
        </v-tooltip>
        <v-divider class="mx-2" vertical></v-divider>

        <v-tooltip bottom max-width="150">
          <v-switch
            v-model="isScrollSynced"
            slot="activator"
            label="Scroll Sync"
            class="scrollSync"
            hide-details
          ></v-switch>
          <span>{{ config.tooltips["scrollSync"].text }}</span>
        </v-tooltip>
      </v-toolbar>
    </v-flex>
  </v-layout>
</template>

<script>
function clearFileInput(ctrl) {
  try {
    ctrl.value = null;
  } catch (e) {
    // eslint-disable-next-line
    console.log(e);
  }
  if (ctrl.value) {
    ctrl.parentNode.replaceChild(ctrl.cloneNode(true), ctrl);
  }
}

import { EventBus } from "@/event-bus.js";
// import config from "@/config";
import { capitalize } from "@/filters";
import { store } from "@/store";

export default {
  name: "NavMarkdown",
  created() {
    this.modes = Object.keys(this.config.modes);
    if (Object.entries(this.config.session.mode).length === 0) {
      let modeParam = this.$route.params.modeParam;
      let mode;
      if (modeParam !== undefined && this.modes.includes(modeParam)) {
        mode = modeParam;
      } else {
        mode = this.config.defaultMode;
      }
      this.mode = mode.toLowerCase();
    } else {
      this.mode = this.config.session.mode;
    }

    this.stylesheetSelection = this.stylesheetObj;
    this.loadStyleSheet(this.stylesheetObj.value);
  },
  filters: {
    capitalize
  },
  mounted() {
    //
    //EventBus.$emit("setMode", this.mode);
    EventBus.$on("yamlStatus", isYaml => {
      this.isYaml = isYaml;
      // console.log(this.isYaml);
    });

    EventBus.$on("setMode", mode => {
      this.mode = mode;
      this.config.session.mode = mode;
      this.stylesheetSelection = this.stylesheetObj;
      this.loadStyleSheet(this.stylesheetObj.value);
    });
  },
  methods: {
    getEntity(action) {
      EventBus.$emit("entityEvent", action);
    },
    htmlToMarkdown() {
      EventBus.$emit("saveMarkdownToLocalStorage");
      this.$router.push("/html");
    },

    loadStyleSheet(e) {
      //console.log("Load style sheet: ", e);
      if (this.currentStyleSheet) {
        document
          .querySelector(
            `link[href$="${this.config.stylesheetStaticPath}${
              this.currentStyleSheet
            }"]`
          )
          .remove();
      }
      let file = document.createElement("link");
      file.rel = "stylesheet";
      file.href = `${this.config.stylesheetStaticPath}${e}`;
      document.head.appendChild(file);
      this.currentStyleSheet = e;
    },
    loadSample(markdown) {
      EventBus.$emit("loadMarkdown", markdown);
    },
    getSnippet(filename) {
      let markdown = require(`@/snippets/${filename}`);
      EventBus.$emit("getSnippet", markdown);
    },
    loadMarkdown() {
      let fileInput = document.getElementById("fileInput");
      //let markdownDiv = document.getElementById("markdown");
      let file = fileInput.files[0];
      // eslint-disable-next-line
      let fileTitle = file.name;
      fileTitle = fileTitle.replace(/\.[^/.]+$/, "");

      let reader = new FileReader();
      //Filereader: https://developer.mozilla.org/en-US/docs/Web/API/FileReader
      // eslint-disable-next-line
      reader.onload = function(e) {
        EventBus.$emit("loadMarkdown", reader.result);
        EventBus.$emit("displayStatus", "File loaded.");
      };
      reader.readAsText(file);
      this.dialog = false;
      clearFileInput(document.getElementById("fileInput"));
    },

    gotoExternalResource(url) {
      window.open(url, "_blank");
    }
  },
  computed: {
    getModeIcon() {
      let icon = this.config.modes[this.mode]["icon"];
      return icon;
    },
    visibleTools() {
      return this.config.modes[this.mode].tools.slice(
        0,
        this.config.maxVisibleTools
      );
    },
    remainingTools() {
      return this.config.modes[this.mode].tools.slice(
        this.config.maxVisibleTools
      );
    },
    stylesheetObj() {
      const stylesheet = this.config.stylesheets.filter(s => {
        if (s.text === this.mode) return s;
      });

      return stylesheet[0];
    }
  },
  watch: {
    isScrollSynced() {
      //console.log(this.isScrollSynced);
      EventBus.$emit("scrollSync", this.isScrollSynced);
    }
  },
  data() {
    return {
      currentStyleSheet: null,
      stylesheetSelection: null,
      config: store.config,
      dialog: false,
      capitalize,
      isYaml: false,
      modes: [],
      mode: "",
      modeIndex: null,
      test: [],
      isScrollSynced: true
    };
  }
};
</script>

<style>
.v-btn.navButton {
  min-width: 30px;
  margin: 1px;
  padding: 0;
}

.v-input {
  max-width: 125px;
}
.v-btn--icon.v-btn--small {
  width: 20px !important;
}
.sampleTitle:hover {
  cursor: pointer;
  color: blue;
}
.scrollSync .v-label {
  font-size: 9px;
  font-weight: 900;
  text-transform: uppercase;
  color: #222;
}
.moreEntitites:hover {
  cursor: pointer;
  color: blue;
}
</style>
