<template>
  <div>
    <v-toolbar fixed color="indigo" dark dense app style="z-index: 1000">
      <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
      <v-toolbar-title>ICJIA Markdown Editor</v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="wordCount">Word count: {{wordCount}}&nbsp;&nbsp;&nbsp;&nbsp;</div>
      <v-tooltip bottom open-delay="400">
        <v-btn
          slot="activator"
          color="white"
          style="font-size: 10px"
          flat
          small
          href="https://github.com/ICJIA/icjia-markdown-next/blob/master/CHANGELOG.md"
          target="_blank"
        >
          <v-icon size="10px">fab fa-github</v-icon>
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
import { EventBus } from "@/event-bus.js";
export default {
  mounted() {
    EventBus.$on("displayStatus", msg => {
      this.msg = msg;
      this.snackbar = true;
    });
    EventBus.$on("updateWordCount", count => {
      console.log("wordcount");
      this.wordCount = count;
    });
  },
  data() {
    return {
      snackbar: false,
      msg: "",
      wordCount: 0,
      info
    };
  }
};
</script>

<style scoped>
.wordCount {
  font-weight: 900;
  text-transform: uppercase;
  font-size: 12px;
}
</style>
