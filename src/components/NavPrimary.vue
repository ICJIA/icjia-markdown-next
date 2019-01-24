<template>
  <div>
    <v-toolbar fixed color="indigo" dark dense app style="z-index: 1000">
      <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
      <v-toolbar-title>ICJIA Markdown Editor</v-toolbar-title>
      <v-spacer></v-spacer>
      Words: {{wordCount}}
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
</style>
