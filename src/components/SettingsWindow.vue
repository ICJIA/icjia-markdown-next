<template>
  <div>
    <v-navigation-drawer
      v-model="settingsWindow"
      absolute
      temporary
      :clipped="false"
      width="320"
      style="z-index: 5000 !important; background: #eee"
      disable-resize-watcher
    >
      <v-toolbar dense color="indigo accent-2" dark>
        <!-- <v-icon class="close-icon" @click="toggleSettingsWindow">close</v-icon> -->
        <v-toolbar-title style="font-size: 18px">APP SETTINGS</v-toolbar-title>

        <v-spacer></v-spacer>
        <v-btn icon @click="toggleSettingsWindow">
          <v-icon>chevron_left</v-icon>
        </v-btn>
      </v-toolbar>
      <auto-alert></auto-alert>
      <!-- <markdown-it></markdown-it> -->
    </v-navigation-drawer>
  </div>
</template>

<script>
import { EventBus } from "@/event-bus.js";
import { store } from "@/store";
import AutoAlert from "@/components/SettingAutoAlert";

export default {
  components: {
    AutoAlert
  },
  data() {
    return {
      settingsWindow: false,
      config: store.config
    };
  },
  mounted() {
    EventBus.$on("toggleSettingsWindow", () => {
      this.settingsWindow = !this.settingsWindow;
    });
  },
  methods: {
    toggleSettingsWindow() {
      EventBus.$emit("toggleSettingsWindow");
    }
  }
};
</script>

<style>
.lint.heading {
  color: #555;
  margin-bottom: 5px;
  margin-top: 15px;
  text-transform: uppercase;
  font-weight: 900;
}

.lint.text {
  margin-left: 10px;
  color: #666;
}

.close-icon:hover {
  color: #aaa;
}

.settingsHeading {
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
}
</style>
