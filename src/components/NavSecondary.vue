<template>
  <v-layout
    row
    wrap
    style="position: fixed; top: 48px; width: 100%; z-index: 100;"
  >
    <v-flex xs12>
      <v-toolbar color="grey lighten-2" dense>
        <v-toolbar-items
          class="hidden-sm-and-down"
          v-for="(tool, index) in markdownButtons"
          :key="index"
        >
          <span v-if="config.buttons[tool]['type'] === 'separator'">
            <v-divider vertical class="mx-2"></v-divider>
          </span>

          <span v-else-if="config.buttons[tool]['type'] === 'component'">
            <component v-bind:is="config.buttons[tool]['name']"></component>
          </span>

          <nav-button
            v-else
            :action="config.buttons[tool]['action']"
            :size="config.buttons[tool]['size']"
            :text="config.buttons[tool]['text']"
            :icon="config.buttons[tool]['icon']"
          ></nav-button>
        </v-toolbar-items>
        <v-spacer></v-spacer>
        HTML Buttons here
      </v-toolbar>
    </v-flex>
  </v-layout>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { EventBus } from "@/event-bus.js";
import { store } from "@/store";
import { buildButtons } from "@/helpers";
import Snippets from "@/components/Snippets";
import NavButton from "@/components/NavButton";

export default {
  components: {
    Snippets,
    NavButton
  },

  mounted() {
    this.buildButtons();
  },
  methods: {
    buildButtons(mode = "standard") {
      this.markdownButtons = buildButtons(
        this.config.modes[mode]["markdownButtons"]
      );
    }
  },
  data() {
    return {
      config: store.config,
      markdownButtons: null
    };
  },
  computed: {
    mode() {
      return this.config.session.mode;
    }
  },
  watch: {
    mode(newValue, oldValue) {
      console.log(oldValue, newValue);
      this.buildButtons(newValue);
    }
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
