<template>
  <v-tooltip bottom max-width="200">
    <v-menu transition="slide-y-transition" bottom slot="activator">
      <v-btn
        slot="activator"
        small
        depressed
        color="indigo accent-2"
        dark
        style="font-size: 10px; font-weight: 900"
      >
        Mode:&nbsp;{{ config.session.mode }}
      </v-btn>
      <v-list>
        <v-list-tile
          v-for="(m, i) in Object.keys(config.modes)"
          :key="i"
          @click="selectMode(m)"
        >
          <v-list-tile-title>
            {{ config.modes[m].display }}
            <span v-if="m === config.session.mode">
              <v-icon right>check_circle</v-icon>
            </span></v-list-tile-title
          >
        </v-list-tile>
      </v-list>
    </v-menu>
    <span v-html="config.modes[config.session.mode]['tooltip']"></span>
  </v-tooltip>
</template>

<script>
import { EventBus } from "@/event-bus.js";
// eslint-disable-next-line no-unused-vars
import { store } from "@/store";
export default {
  mounted() {
    //this.modes = Object.keys(this.config.modes);
  },
  methods: {
    selectMode(mode) {
      EventBus.$emit("setMode", mode);
    }
  },
  data() {
    return {
      config: store.config,
      modes: null
    };
  },
  computed: {}
};
</script>

<style scoped></style>
