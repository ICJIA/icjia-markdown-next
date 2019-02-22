<template>
  <div>
    <v-toolbar fixed color="indigo" dark dense app style="z-index: 1000">
      <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
      <v-toolbar-title>
        <router-link to="/" class="navTitle"><span style="font-weight: 400;">ICJIA</span>&nbsp;<span style="font-weight: 900;">MARKDOWN EDITOR</span></router-link>
      </v-toolbar-title>
      &nbsp;&nbsp;&nbsp;&nbsp;
      

    
     <v-tooltip bottom max-width="200">
          
        <v-menu
      transition="slide-y-transition"
      bottom
      slot="activator"
    >
     
      <v-btn
        slot="activator"
        small
        depressed
            color="indigo accent-2"
            dark
            style="font-size: 10px; font-weight: 900"
      >
        Mode:&nbsp;{{mode}}<v-icon dark right style="font-size: 14px; font-weight: 900">{{getModeIcon}}</v-icon>
      </v-btn>
      <v-list>
        <v-list-tile
          v-for="(m, i) in modes"
          :key="i"
           @click="selectMode(m)"
         >
         
          <v-list-tile-title>
           
            
            
            {{ config.modes[m].display}} <span v-if="m === mode"> <v-icon right>check_circle</v-icon> </span></v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
     <span v-html='config.modes[this.mode]["description"]'></span>
        </v-tooltip>
      <v-spacer></v-spacer>
      
     
      <v-tooltip bottom>
        <v-dialog v-model="statistics" max-width="500" slot="activator">
          <v-btn
            slot="activator"
            flat
            style="font-size: 12px; font-weight: 900;"
            dark
            small
            v-on:click="getMarkdown"
          >
            <v-icon size="28px">insert_chart</v-icon>
            &nbsp;
            Word count: {{wordCount}}
          </v-btn>
          <v-card>
            <v-card-title class="headline">Text Statistics</v-card-title>
            <v-card-text>
              <h1>Text statistics here</h1>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn color="green darken-1" flat @click="statistics = false">CLOSE</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <span>Show Text Statistics</span>
      </v-tooltip>

       
     

     

      <v-tooltip bottom open-delay="400">
        <v-btn
          slot="activator"
          style="font-size: 12px; color: #ccc;"
          flat
          small
          href="https://github.com/ICJIA/icjia-markdown-next/blob/master/CHANGELOG.md"
          target="_blank"
        >
          <v-icon size="16px">fab fa-github</v-icon>
          &nbsp;
          {{info.version}}
        </v-btn>
        <span>Find me on Github</span>
      </v-tooltip>

      <v-tooltip bottom open-delay="400">
        <v-btn
          slot="activator"
          style="font-size: 12px; color: #ccc;"
          flat
          small
          href="https://legacy-markdown.icjia.cloud/"
          target="_blank"
        >Launch Legacy Editor
          <v-icon right size="16px">launch</v-icon>
         
        </v-btn>
        <span>Access the legacy ICJIA Markdown Editor</span>
      </v-tooltip>


      

    </v-toolbar>
    <v-snackbar v-model="snackbar" top>
      {{ msg }}
      <v-btn color="red" flat @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
const info = require("../../package.json");
import config from "@/config";
import { EventBus } from "@/event-bus.js";
import { capitalize } from "@/filters";
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
  },
  mounted() {
    EventBus.$on("displayStatus", msg => {
      this.msg = msg;
      this.snackbar = true;
    });
    EventBus.$on("updateWordCount", count => {
      this.wordCount = count;
    });
    EventBus.$on("sendMarkdown", markdown => {
      this.markdown = markdown;
    });
    EventBus.$on("setMode", mode => {
      this.mode = mode;
      //console.log(mode);
    });
  },
  filters: {
    capitalize
  },
  methods: {
    getMarkdown() {
      EventBus.$emit("getMarkdown");
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
    getModeColor() {
      let color = config.modes[this.mode]["color"];
      return `color: ${color}`;
    }
  },
  data() {
    return {
      snackbar: false,
      config,
      msg: "",
      wordCount: 0,
      info,
      statistics: false,
      markdown: "",
      modes: [],
      mode: "",
      modeIndex: 0
    };
  }
};
</script>

<style scoped>
a.navTitle {
  color: #fff;
  text-decoration: none;
}

a.navTitle:hover {
  color: #ddd;
  cursor: pointer;
}
.wordCount {
  font-weight: 900;
  text-transform: uppercase;
  font-size: 12px;
}

.mode {
  text-transform: uppercase;
  font-weight: 900;
  font-size: 11px;
  width: 140px;
  text-align: center;
  padding-bottom: -10px;
  border: 1px solid #ccc;
  padding-right: 3px;
  padding-left: 3px;
  padding-top: 2px;
  padding-bottom: 2px;
}
</style>
