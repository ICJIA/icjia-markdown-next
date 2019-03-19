<template>
  <v-toolbar color="grey lighten-4" dense>
    <v-toolbar-items
      class="hidden-sm-and-down"
      v-for="(btn, index) in btns"
      :key="index"
    >
      <span v-if="btn === '|'">
        <v-divider vertical class="mx-2"></v-divider>
      </span>
      <v-btn small v-else class="navButton">
        <span style="font-size: 10px !important;"
          >{{ buttons[btn]["text"] }}&nbsp;</span
        >
        <v-icon dark style="font-size: 22px !important;">{{
          buttons[btn]["icon"]
        }}</v-icon>
      </v-btn>
    </v-toolbar-items>

    <v-spacer></v-spacer>
    <v-divider vertical></v-divider>
  </v-toolbar>
</template>

<script>
import { EventBus } from "@/event-bus.js";
import { store } from "@/store";
function isEmpty(s) {
  return s === null || s === undefined ? true : /^[\s\xa0]*$/.test(s);
}
export default {
  mounted() {
    this.buildToolbar();
  },
  methods: {
    buildToolbar() {
      let btns = this.toolbar
        .toLowerCase()
        .split(/(\s)/)
        .filter(function(w) {
          return !isEmpty(w);
        });
      this.btns = btns;
    }
  },
  data() {
    return {
      config: store.config,
      toolbar: "book assessment | announcement book | ",
      btns: [],

      buttons: {
        announcement: {
          text: "Button 1",
          icon: "announcement",
          type: "sm",
          event: "announcement"
        },

        assessment: {
          text: "Button 2",
          icon: "assessment",
          type: "sm",
          event: "assessment"
        },
        book: {
          text: "Button 3",
          icon: "book",
          type: "lg",
          event: "book"
        },
        "|": {}
      }
    };
  }
};
</script>

<style scoped>
.v-btn.navButton {
  min-width: 40px;
  margin: 3px;
  padding: 3px;
  max-height: 35px;
}

.v-toolbar__items {
  height: inherit;
  margin: 3px;
}
</style>
