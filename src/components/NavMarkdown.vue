<template>
  <v-layout row wrap>
    <v-flex xs12 sm6>
      <v-toolbar
        flat
        color="grey lighten-2"
        style="padding-top: 5px; z-index: 100; position: fixed; top: 50px; margin-left: -10px"
      >
      
          <div
          v-for="tool in visibleTools"
          :key="tool.action"
          class="hidden-sm-and-down"
          style="margin-left: -3px"
         
        >

          <v-tooltip bottom>
            <v-btn small icon slot="activator" @click.prevent="getEntity(tool.action)">
              <v-icon size="20px">{{tool.icon}}</v-icon>
            </v-btn>
            <span>{{tool.tooltip}}</span>
          </v-tooltip>
        </div>

       
        <v-tooltip bottom>
          <v-menu
            offset-y
            nudge-left="100"
            transition="slide-x-transition"
            style="z-index: 150;"
            slot="activator"
          >
            <v-btn icon slot="activator" style="margin-left: -5px">
              <v-icon>more_vert</v-icon>
            </v-btn>
            <v-list>

               <v-list-tile v-for="(tool, index) in remainingTools" :key="index">
                <v-list-tile-title>
                  
                  <v-icon style="width: 35px;">{{tool.icon}}</v-icon>
                  &nbsp;&nbsp;{{tool.tooltip}}</v-list-tile-title>
               
              </v-list-tile>

            </v-list>
           
           
          </v-menu>
          <span>Additional {{this.mode | capitalize }} Tools</span>
        </v-tooltip>
        <!-- </span> -->


        
      

        <v-tooltip bottom>
          <v-btn
            small
            dark
            color="blue darken-4"
            slot="activator"
            @click.prevent="getEntity('saveMarkdown')"
            style="font-size: 10px; font-weight: 900"
          >Save MD
            <v-icon dark right style="font-size: 14px; font-weight: 900">save_alt</v-icon>
          </v-btn>
          <span>Save markdown (.md) file</span>
        </v-tooltip>

        <v-tooltip bottom>
          <v-dialog v-model="dialog" persistent max-width="290" slot="activator">
            <v-btn
              small
              slot="activator"
              color="blue darken-4"
              dark
              style="font-size: 10px; font-weight: 900"
            >Load MD
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
          <span>Load markdown (.md) file</span>
        </v-tooltip>

          <v-tooltip bottom>
          <v-btn
            small
            dark
            color="blue darken-4"
            slot="activator"
             @click.prevent="getEntity('mdToClipboard')"
            style="font-size: 10px; font-weight: 900"
          >Copy MD
            <v-icon dark right style="font-size: 14px; font-weight: 900">assignment</v-icon>
          </v-btn>
          <span>Copy Markdown to Clipboard</span>
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
          v-model="stylesheetSelection"
          @change="loadStyleSheet"
          color="indigo"
          item-text="display"
        ></v-select>
        &nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;
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
        &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
       
       
       
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        
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
import { samples } from "@/samples";
import { EventBus } from "@/event-bus.js";
import config from "@/config";
import { capitalize } from "@/filters";
import snippets from "@/snippets";
export default {
  created() {
    this.modes = Object.keys(config.modes);

    let modeParam = this.$route.params.modeParam;
    let mode;
    if (modeParam !== undefined && this.modes.includes(modeParam)) {
      mode = modeParam;
    } else {
      mode = config.defaultMode;
    }
    this.mode = mode.toLowerCase();

    // console.dir(JSON.stringify(config.defaultStylesheet));
    // console.dir(JSON.stringify(this.stylesheetObj));
    this.stylesheetSelection = this.stylesheetObj;
    this.loadStyleSheet(this.stylesheetObj.value);
  },
  filters: {
    capitalize
  },
  mounted() {
    //
    EventBus.$emit("setMode", this.mode);
    EventBus.$on("setMode", mode => {
      this.mode = mode;
      this.stylesheetSelection = this.stylesheetObj;
      this.loadStyleSheet(this.stylesheetObj.value);
    });
  },
  methods: {
    getEntity(action) {
      EventBus.$emit("entityEvent", action);
    },

    loadStyleSheet(e) {
      //console.log("Load style sheet: ", e);
      if (this.currentStyleSheet) {
        document
          .querySelector(
            `link[href$="${config.stylesheetStaticPath}${
              this.currentStyleSheet
            }"]`
          )
          .remove();
      }
      let file = document.createElement("link");
      file.rel = "stylesheet";
      file.href = `${config.stylesheetStaticPath}${e}`;
      document.head.appendChild(file);
      this.currentStyleSheet = e;
    },
    loadSample(markdown) {
      EventBus.$emit("loadMarkdown", markdown);
    },
    insertSnippet(markdown) {
      EventBus.$emit("insertSnippet", markdown);
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
      reader.onload = function(e) {
        EventBus.$emit("loadMarkdown", reader.result);
        EventBus.$emit("displayStatus", "File loaded.");
      };
      reader.readAsText(file);
      this.dialog = false;
      clearFileInput(document.getElementById("fileInput"));
    },
    selectMode(mode) {
      this.mode = mode;
      EventBus.$emit("setMode", this.mode);
    }
  },
  computed: {
    getModeIcon() {
      let icon = config.modes[this.mode]["icon"];
      return icon;
    },
    visibleTools() {
      return config.modes[this.mode].tools.slice(0, config.maxVisibleTools);
    },
    remainingTools() {
      return config.modes[this.mode].tools.slice(
        config.modes[this.mode].tools.length - 3
      );
    },
    stylesheetObj() {
      const stylesheet = config.stylesheets.filter(s => {
        if (s.text === this.mode) return s;
      });

      return stylesheet[0];
    }
  },
  data() {
    return {
      currentStyleSheet: null,
      stylesheetSelection: null,
      config,
      samples,
      dialog: false,
      capitalize,
      snippets,
      modes: [],
      mode: "",
      modeIndex: null,
      test: []
    };
  }
};
</script>


<style>
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
</style>
