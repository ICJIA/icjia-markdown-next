<template>
  <div>
    <v-toolbar fixed color="indigo" dark dense app style="z-index: 1000">
      <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
      <v-toolbar-title>
        <router-link to="/" class="navTitle">ICJIA Markdown Editor</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <div class="wordCount">Word count: {{wordCount}}&nbsp;&nbsp;&nbsp;&nbsp;</div> -->
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
          Version: {{info.version}}
        </v-btn>
        <span>Find me on Github</span>
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
export default {
  created() {},
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
  },
  methods: {
    getMarkdown() {
      EventBus.$emit("getMarkdown");
    },
    toggleModes() {
      if (this.modeIndex + 1 >= this.modes.length) {
        this.modeIndex = 0;
      } else {
        this.modeIndex = this.modeIndex + 1;
      }

      EventBus.$emit("setMode", this.modes[this.modeIndex]);
    }
  },
  data() {
    return {
      snackbar: false,
      msg: "",
      mode: "standard",
      wordCount: 0,
      info,
      statistics: false,
      markdown: "",
      modes: [],
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
</style>
