<template>
  <v-toolbar color="grey lighten-2" dense>
    <v-toolbar-items
      class="hidden-sm-and-down"
      v-for="(btn, index) in btns"
      :key="index"
    >
      <span v-if="btn === '|'">
        <v-divider vertical class="mx-2"></v-divider>
      </span>

      <span v-else-if="btn === 'vert'">
        <v-btn icon @click="trigger(buttons[btn]['action'])">
          <v-icon>more_vert</v-icon>
        </v-btn>
      </span>

      <v-btn
        small
        v-else
        class="navButton"
        @click="trigger(buttons[btn]['action'])"
      >
        <span
          style="font-size: 10px !important; font-weight: 900; padding-left: 3px; padding-right: 3px;"
          v-if="buttons[btn]['size'] === 'lg'"
          >{{ buttons[btn]["text"] }}</span
        >
        <v-icon dark style="font-size: 22px !important;">{{
          buttons[btn]["icon"]
        }}</v-icon
        >&nbsp;
      </v-btn>
    </v-toolbar-items>
    <!-- <v-btn icon>
      <v-icon>more_vert</v-icon>
    </v-btn> -->
  </v-toolbar>
</template>

<script>
import { EventBus } from "@/event-bus.js";
import { store } from "@/store";
function isEmpty(s) {
  return s === null || s === undefined ? true : /^[\s\xa0]*$/.test(s);
}
function buildButtons(buttons) {
  let btns = buttons
    .toLowerCase()
    .split(/(\s)/)
    .filter(function(w) {
      return !isEmpty(w);
    });
  return btns;
}
export default {
  mounted() {
    this.btns = buildButtons(this.markdownButtons);
  },
  methods: {
    trigger(action) {
      EventBus.$emit("triggerAction", action);
    }
  },
  data() {
    return {
      config: store.config,
      markdownButtons:
        "announcement assessment announcement assessment announcement assessment announcement assessment vert | book book book ",
      btns: [],

      buttons: {
        announcement: {
          text: "Button 1",
          icon: "announcement",
          size: "sm",
          action: "announcement"
        },

        assessment: {
          text: "Button 2",
          icon: "assessment",
          size: "sm",
          action: "assessment"
        },
        book: {
          text: "Button 3",
          icon: "book",
          size: "lg",
          action: "book"
        },
        "|": {},
        vert: {
          action: "snippets"
        }
      }
    };
  }
};
</script>

<style scoped>
.v-btn.navButton {
  min-width: 40px;

  padding: 3px !important;
  max-height: 35px;
}

.v-toolbar__items {
  height: inherit;
  padding: 2px;
}
</style>
