<template>
  <v-card class="mt-1">
    <v-container fluid>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card color="grey lighten-2" class="black--text">
            <v-layout>
              <v-flex xs12>
                <v-card-title primary-title class="settingsHeading">
                  Markdown It Options
                </v-card-title>
                <v-divider></v-divider>
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex xs9>
                <v-card-title class="optionItem secondary-title ">
                  HTML
                </v-card-title>
              </v-flex>
              <v-flex xs3>
                <v-checkbox v-model="isHtmlEnabled"></v-checkbox>
              </v-flex>
            </v-layout>
            <v-layout class="condensedItem">
              <v-flex xs9>
                <v-card-title class="optionItem secondary-title ">
                  BREAKS
                </v-card-title>
              </v-flex>
              <v-flex xs3>
                <v-checkbox v-model="areBreaksEnabled"></v-checkbox>
              </v-flex>
            </v-layout>
            <v-layout class="condensedItem">
              <v-flex xs9>
                <v-card-title class="optionItem secondary-title ">
                  LINKIFY
                </v-card-title>
              </v-flex>
              <v-flex xs3>
                <v-checkbox></v-checkbox>
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
  computed: {
    isHtmlEnabled: {
      get() {
        return store.config.markdownItOptions["html"];
      },
      set(isHtmlEnabled) {
        store.config.markdownItOptions["html"] = isHtmlEnabled;
        const status = isHtmlEnabled ? "ON" : "OFF";
        EventBus.$emit("displayStatus", `Markdown It HTML: ${status}`);
        let optionObj = {};
        optionObj["option"] = "html";
        optionObj["value"] = isHtmlEnabled;
        EventBus.$emit("updateEditorConfig", optionObj);
      }
    },
    areBreaksEnabled: {
      get() {
        return store.config.markdownItOptions["breaks"];
      },
      set(areBreaksEnabled) {
        store.config.markdownItOptions["breaks"] = areBreaksEnabled;
        const status = areBreaksEnabled ? "ON" : "OFF";
        EventBus.$emit("displayStatus", `Markdown It Breaks: ${status}`);
        let optionObj = {};
        optionObj["option"] = "breaks";
        optionObj["value"] = areBreaksEnabled;
        EventBus.$emit("updateEditorConfig", optionObj);
      }
    }
  }
};
</script>

<style>
.condensedItem {
  margin-top: -35px !important;
}

.secondary-title {
  color: #555;
}

.optionItem {
  font-size: 12px !important;
  font-weight: 400;
  color: #333;
}
</style>
