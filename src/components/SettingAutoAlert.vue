<template>
  <div class="mt-4 pl-2 pr-2">
    <v-card>
      <!-- <v-layout style="background: #ddd;">
                <v-card-title
                  style="font-weight: 900; text-transform: uppercase;"
                  >LINTING</v-card-title
                >
                <v-spacer></v-spacer>
                <v-switch v-model="isLintingEnabled"></v-switch>
              </v-layout> -->
      <v-layout style="background: #ddd;">
        <v-card-title
          style="font-weight: 700; text-transform: uppercase; font-size: 12px;"
          >LINTING AUTO ALERT</v-card-title
        >
        <v-spacer></v-spacer>
        <v-switch v-model="isLintingAutoAlertEnabled"></v-switch>
      </v-layout>
    </v-card>
  </div>
</template>

<script>
import { store } from "@/store";
export default {
  data() {
    return {
      settingsWindow: false,
      config: store.config
    };
  },
  computed: {
    isLintingEnabled: {
      get() {
        return store.config.isLintingEnabled;
      },
      set(isLintingEnabled) {
        store.config.isLintingEnabled = isLintingEnabled;
      }
    },
    isLintingAutoAlertEnabled: {
      get() {
        return store.config.isLintingAutoAlertEnabled;
      },
      set(isLintingAutoAlertEnabled) {
        store.config.isLintingAutoAlertEnabled = isLintingAutoAlertEnabled;
      }
    }
  }
};
</script>

<style scoped></style>
