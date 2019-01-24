<template>
  <div>
    <v-toolbar fixed color="indigo" dark dense app style="z-index: 1000">
      <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
      <v-toolbar-title>ICJIA Markdown Editor</v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="wordCount">Word count: {{wordCount}}</div>
    </v-toolbar>
    <v-snackbar v-model="snackbar" top>
      {{ msg }}
      <v-btn color="red" flat @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
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
      wordCount: 0
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
