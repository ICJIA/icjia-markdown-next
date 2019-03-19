<template>
  <v-btn small class="navButton" @click="trigger($props.action)">
    <span
      style="font-size: 10px !important; font-weight: 900; padding-left: 3px; padding-right: 3px;"
      v-if="$props.size === 'lg'"
      >{{ $props.text }}</span
    >
    <v-icon dark style="font-size: 22px !important;">{{ $props.icon }}</v-icon
    >&nbsp;
  </v-btn>
</template>

<script>
import { EventBus } from "@/event-bus.js";
// eslint-disable-next-line no-unused-vars
import { store } from "@/store";
export default {
  mounted() {},
  props: {
    action: {
      type: String,
      default: ""
    },
    icon: {
      type: String,
      default: ""
    },
    text: {
      type: String,
      default: ""
    },
    size: {
      type: String,
      default: ""
    }
  },
  methods: {
    trigger(action) {
      EventBus.$emit("triggerAction", action);
    }
  }
};
</script>

<style scoped></style>
