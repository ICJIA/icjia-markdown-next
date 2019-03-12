<template>
  <v-card class="mt-1">
    <v-container fluid grid-list-lg>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card color="grey lighten-2" class="black--text">
            <v-layout>
              <v-flex xs9>
                <v-card-title primary-title class="settingsHeading">
                  Linting Auto Alert
                </v-card-title>
              </v-flex>
              <v-flex xs3>
                <v-switch v-model="isLintingAutoAlertEnabled"></v-switch>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import { store } from "@/store";
import { EventBus } from "@/event-bus.js";
export default {
  data() {
    return {
      settingsWindow: false,
      config: store.config
    };
  },
  computed: {
    // isLintingEnabled: {
    //   get() {
    //     return store.config.isLintingEnabled;
    //   },
    //   set(isLintingEnabled) {
    //     store.config.isLintingEnabled = isLintingEnabled;
    //   }
    // },
    isLintingAutoAlertEnabled: {
      get() {
        return store.config.isLintingAutoAlertEnabled;
      },
      set(isLintingAutoAlertEnabled) {
        store.config.isLintingAutoAlertEnabled = isLintingAutoAlertEnabled;
        const status = isLintingAutoAlertEnabled ? "ON" : "OFF";
        EventBus.$emit("displayStatus", `Linting Auto Alert: ${status}`);
      }
    }
  }
};
</script>

<style scoped></style>
