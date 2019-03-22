<template>
  <div>
    <v-toolbar-items
      class="hidden-sm-and-down"
      v-for="(tool, index) in toolbarItems"
      :key="index"
    >
      <span v-if="config.buttons[tool]['type'] === 'separator'">
        <v-divider vertical class="mx-2"></v-divider>
      </span>

      <span v-else-if="config.buttons[tool]['type'] === 'component'">
        <component v-bind:is="config.buttons[tool]['name']"></component>
      </span>

      <base-nav-button
        v-else
        :action="config.buttons[tool]['action']"
        :size="config.buttons[tool]['size']"
        :text="config.buttons[tool]['text']"
        :icon="config.buttons[tool]['icon']"
      ></base-nav-button>
    </v-toolbar-items>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { EventBus } from "@/event-bus.js";
import { store } from "@/store";

export default {
  props: {
    toolbarItems: {
      type: Array
    }
  },
  data() {
    return {
      config: store.config
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
