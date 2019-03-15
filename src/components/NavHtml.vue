<template>
  <v-layout
    row
    wrap
    style="position: fixed; top: 48px; width: 100%; z-index: 100;"
  >
    <v-flex xs12>
      <v-toolbar dense>
        <v-toolbar-title></v-toolbar-title>
        <v-tooltip bottom>
          <v-btn
            small
            dark
            color="blue darken-4"
            slot="activator"
            @click.prevent="prettify"
          >
            FORMAT HTML&nbsp;<v-icon dark>code</v-icon>
          </v-btn>
          <span>{{ config.tooltips["saveMd"].text }}</span>
        </v-tooltip>
        <v-divider class="mx-2" vertical></v-divider>
        <v-tooltip bottom max-width="150">
          <v-switch
            v-model="displayHtmlPreview"
            slot="activator"
            label="HTML Preview"
            class="scrollSync"
            hide-details
          ></v-switch>
          <span>{{ config.tooltips["scrollSync"].text }}</span>
        </v-tooltip>
        <v-divider class="mx-2" vertical></v-divider>

        <v-spacer></v-spacer>
        <v-tooltip bottom>
          <v-btn
            small
            dark
            color="blue darken-4"
            slot="activator"
            @click.prevent="saveMdToFile"
          >
            SAVE MARKDOWN&nbsp;<v-icon dark>save_alt</v-icon>
          </v-btn>
          <span>{{ config.tooltips["saveMd"].text }}</span>
        </v-tooltip>

        <v-tooltip bottom>
          <v-btn
            small
            dark
            color="blue darken-4"
            slot="activator"
            @click.prevent="copyMdToClipboard"
            >COPY MARKDOWN&nbsp;
            <v-icon dark>assignment</v-icon>
          </v-btn>
          <span>{{ config.tooltips["copyMd"].text }}</span>
        </v-tooltip>

        <v-tooltip bottom>
          <v-btn
            small
            slot="activator"
            color="blue darken-4"
            dark
            @click.prevent="sendToEditor"
          >
            SEND MARKDOWN TO EDITOR&nbsp
            <v-icon dark>launch</v-icon>
          </v-btn>

          <span>{{ config.tooltips["exportMdToEditor"].text }}</span>
        </v-tooltip>
      </v-toolbar>
    </v-flex>
  </v-layout>
</template>

<script>
import config from "@/config";
import { EventBus } from "@/event-bus.js";
import { store } from "@/store";

let FileSaver = require("file-saver");
export default {
  name: "NavHtml",
  data() {
    return {
      config: store.config
    };
  },
  methods: {
    getEntity(action) {
      EventBus.$emit("entityEvent", action);
    },
    copyMdToClipboard() {
      EventBus.$emit("copyMdToClipboard");
    },
    saveMdToFile() {
      EventBus.$emit("saveMdToFile");
    },
    sendToEditor() {
      EventBus.$emit("sendToEditor");
    },
    prettify() {
      EventBus.$emit("prettify");
    }
  },
  computed: {
    displayHtmlPreview: {
      get() {
        return store.config.session.displayHtmlPreview;
      },
      set(displayHtmlPreview) {
        store.config.session.displayHtmlPreview = displayHtmlPreview;
        const status = displayHtmlPreview ? "ON" : "OFF";
        EventBus.$emit("displayStatus", `HTML Preview: ${status}`);
      }
    }
  }
};
</script>

<style scoped></style>
