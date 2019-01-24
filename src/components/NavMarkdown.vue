<template>
  <v-layout row wrap>
    <v-flex xs12 sm6>
      <v-toolbar
        flat
        color="grey lighten-2"
        style="padding-top: 5px; z-index: 100; position: fixed; top: 48px;"
      >
        <div v-for="tool in config.tools" :key="tool.action" class="hidden-sm-and-down">
          <v-tooltip bottom>
            <v-btn small icon slot="activator" @click.prevent="getEntity(tool.action)">
              <v-icon size="20px">{{tool.icon}}</v-icon>
            </v-btn>
            <span>{{tool.tooltip}}</span>
          </v-tooltip>
        </div>
        <v-tooltip bottom>
          <v-btn
            small
            dark
            color="blue darken-4"
            slot="activator"
            @click.prevent="getEntity('saveMarkdown')"
            style="font-size: 12px"
          >Save
            <v-icon dark right style="font-size: 18px">save_alt</v-icon>
          </v-btn>
          <span>Save As Markdown</span>
        </v-tooltip>
      </v-toolbar>
    </v-flex>
    <v-flex xs6 class="hidden-sm-and-down">
      <v-toolbar
        flat
        color="grey lighten-2"
        style="padding-top: 5px; z-index: 100; position: fixed; top: 50px;"
      >
        <v-select
          :items="config.stylesheets"
          label="Stylesheet"
          v-model="select"
          @change="loadStyleSheet"
          color="indigo"
        ></v-select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <v-tooltip bottom>
          <v-btn
            small
            color="blue darken-4"
            dark
            slot="activator"
            @click.prevent="getEntity('showHtml')"
            style="font-size: 11px"
          >Show HTML
            <v-icon dark right style="font-size: 18px">code</v-icon>
          </v-btn>
          <span>Show HTML</span>
        </v-tooltip>
        <v-tooltip bottom>
          <v-btn
            small
            color="blue darken-4"
            dark
            slot="activator"
            @click.prevent="getEntity('saveHtml')"
            style="font-size: 12px"
          >Save HTML
            <v-icon dark right style="font-size: 18px">save_alt</v-icon>
          </v-btn>
          <span>Save As HTML</span>
        </v-tooltip>
      </v-toolbar>
    </v-flex>
  </v-layout>
</template>

<script>
import { EventBus } from "@/event-bus.js";
import config from "@/config";
export default {
  mounted() {
    this.loadStyleSheet("default.css");
  },
  methods: {
    getEntity(action) {
      EventBus.$emit("entityEvent", action);
    },
    loadStyleSheet(e) {
      if (this.currentStyleSheet) {
        document
          .querySelector(`link[href$="/css/${this.currentStyleSheet}"]`)
          .remove();
      }
      let file = document.createElement("link");
      file.rel = "stylesheet";
      file.href = `/css/${e}`;
      document.head.appendChild(file);
      this.currentStyleSheet = e;
    }
  },
  data() {
    return {
      currentStyleSheet: null,
      select: { text: "Default", value: "default.css" },
      config
    };
  }
};
</script>

<style>
.v-input {
  max-width: 175px;
}

.v-btn--icon.v-btn--small {
  width: 20px !important;
}
</style>
