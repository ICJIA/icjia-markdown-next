<template>
  <v-toolbar color="grey lighten-2" dense>
    <v-toolbar-items
      class="hidden-sm-and-down"
      v-for="(tool, index) in toolbar"
      :key="index"
    >
      <span v-if="tool === '|'">
        <v-divider vertical class="mx-2"></v-divider>
      </span>

      <span v-else-if="tool === 'snippets'">
        <component v-bind:is="config.buttons[tool]['component']"></component>
      </span>

      <nav-button
        v-else
        :action="config.buttons[tool]['action']"
        :size="config.buttons[tool]['size']"
        :text="config.buttons[tool]['text']"
        :icon="config.buttons[tool]['icon']"
      ></nav-button>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import { EventBus } from "@/event-bus.js";
import { store } from "@/store";
import { isEmpty, buildButtons } from "@/helpers";
import Snippets from "@/components/Snippets";
import NavButton from "@/components/NavButton";

export default {
  components: {
    Snippets,
    NavButton
  },
  props: {
    mode: {
      type: String,
      default: "standard"
    }
  },
  mounted() {
    this.toolbar = buildButtons(
      this.config.modes[this.$props.mode]["markdownButtons"]
    );
  },
  methods: {},
  data() {
    return {
      config: store.config,
      toolbar: null,
      markdownButtons:
        "announcement assessment announcement assessment announcement assessment announcement assessment snippets | book book book |"
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
