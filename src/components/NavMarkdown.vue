<template>
  <v-layout row wrap>
    <v-flex xs12 sm6>
      <v-toolbar
        flat
        color="grey lighten-2"
        style="padding-top: 5px; z-index: 100; position: fixed; top: 50px;"
      >
        <div
          v-for="tool in config.tools"
          :key="tool.action"
          class="hidden-sm-and-down"
          style="margin-left: -5px"
        >
          <v-tooltip bottom>
            <v-btn small icon slot="activator" @click.prevent="getEntity(tool.action)">
              <v-icon size="20px">{{tool.icon}}</v-icon>
            </v-btn>
            <span>{{tool.tooltip}}</span>
          </v-tooltip>
        </div>

        <v-tooltip bottom>
          <v-btn
            small
            dark
            color="blue darken-4"
            slot="activator"
            @click.prevent="getEntity('saveMarkdown')"
            style="font-size: 10px; font-weight: 900"
          >Save
            <v-icon dark right style="font-size: 14px; font-weight: 900">save_alt</v-icon>
          </v-btn>
          <span>Save As Markdown</span>
        </v-tooltip>

        <v-dialog v-model="dialog" persistent max-width="290">
          <v-btn
            small
            slot="activator"
            color="blue darken-4"
            dark
            style="font-size: 10px; font-weight: 900"
          >Load
            <v-icon dark right style="font-size: 14px; font-weight: 900">cloud_upload</v-icon>
          </v-btn>
          <v-card class="text-xs-center">
            <v-card-title class="headline">Load Markdown File</v-card-title>
            <v-card-text>Load a previously saved .md file</v-card-text>
            <input type="file" class="custom-file-input" id="fileInput">
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" flat @click="dialog=false">Cancel</v-btn>
              <v-btn color="green darken-1" flat @click="loadMarkdown">Load file</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-tooltip bottom>
          <v-menu
            offset-y
            nudge-left="100"
            transition="slide-x-transition"
            style="z-index: 150;"
            slot="activator"
          >
            <v-btn icon slot="activator">
              <v-icon>more_vert</v-icon>
            </v-btn>
            <v-list>
              <v-list-tile v-for="(sample, index) in samples" :key="index" class="sampleTitle">
                <v-list-tile-title v-on:click="loadSample(sample.body)">{{sample.title}}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
          <span>Load markdown samples</span>
        </v-tooltip>
      </v-toolbar>
    </v-flex>
    <v-flex xs6 class="hidden-sm-and-down">
      <v-toolbar
        flat
        color="grey lighten-2"
        style="padding-top: 5px; z-index: 100; position: fixed; top: 50px;"
      >
        <v-select
          :items="config.stylesheets"
          label="Stylesheet"
          v-model="select"
          @change="loadStyleSheet"
          color="indigo"
        ></v-select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <v-tooltip bottom>
          <v-btn
            small
            color="blue darken-4"
            dark
            slot="activator"
            @click.prevent="getEntity('showHtml')"
            style="font-size: 10px; font-weight: 900"
          >Show HTML
            <v-icon dark right style="font-size: 14px;font-weight: 900">code</v-icon>
          </v-btn>
          <span>Show HTML</span>
        </v-tooltip>
        <v-tooltip bottom>
          <v-btn
            small
            color="blue darken-4"
            dark
            slot="activator"
            @click.prevent="getEntity('saveHtml')"
            style="font-size: 10px; font-weight: 900"
          >Save HTML
            <v-icon dark right style="font-size: 14px; font-weight: 900">save_alt</v-icon>
          </v-btn>
          <span>Save As HTML</span>
        </v-tooltip>
      </v-toolbar>
    </v-flex>
  </v-layout>
</template>

<script>
function clearFileInput(ctrl) {
  try {
    ctrl.value = null;
  } catch (ex) {}
  if (ctrl.value) {
    ctrl.parentNode.replaceChild(ctrl.cloneNode(true), ctrl);
  }
}
import { samples } from "@/samples";
import { EventBus } from "@/event-bus.js";
import config from "@/config";
export default {
  mounted() {
    this.loadStyleSheet("default.css");
  },
  methods: {
    getEntity(action) {
      EventBus.$emit("entityEvent", action);
    },
    loadStyleSheet(e) {
      if (this.currentStyleSheet) {
        document
          .querySelector(`link[href$="/css/${this.currentStyleSheet}"]`)
          .remove();
      }
      let file = document.createElement("link");
      file.rel = "stylesheet";
      file.href = `/css/${e}`;
      document.head.appendChild(file);
      this.currentStyleSheet = e;
    },
    loadSample(markdown) {
      EventBus.$emit("loadMarkdown", markdown);
    },
    loadMarkdown() {
      let fileInput = document.getElementById("fileInput");
      //let markdownDiv = document.getElementById("markdown");
      let file = fileInput.files[0];
      let fileTitle = file.name;
      fileTitle = fileTitle.replace(/\.[^/.]+$/, "");

      let reader = new FileReader();
      //Filereader: https://developer.mozilla.org/en-US/docs/Web/API/FileReader
      reader.onload = function(e) {
        EventBus.$emit("loadMarkdown", reader.result);
        EventBus.$emit("displayStatus", "File loaded.");
      };
      reader.readAsText(file);
      this.dialog = false;
      clearFileInput(document.getElementById("fileInput"));
    }
  },
  data() {
    return {
      currentStyleSheet: null,
      select: { text: "Default", value: "default.css" },
      config,
      samples,
      dialog: false
    };
  }
};
</script>
    };
  }
};
</script>

<style>
.v-input {
  max-width: 175px;
}

.v-btn--icon.v-btn--small {
  width: 20px !important;
}

.sampleTitle:hover {
  cursor: pointer;
  color: blue;
}
</style>
