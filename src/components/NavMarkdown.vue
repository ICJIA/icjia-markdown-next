<template>
  <v-layout row wrap>
    <v-flex xs12 sm6>
      <v-toolbar
        flat
        color="grey lighten-2"
        style="padding-top: 5px; z-index: 100; position: fixed; top: 50px;"
      >
        <div v-for="tool in tools" :key="tool.action" class="hidden-sm-and-down">
          <v-tooltip bottom>
            <v-btn small icon slot="activator" @click.prevent="getEntity(tool.action)">
              <v-icon size="16px">{{tool.icon}}</v-icon>
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
          >Save MD
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
          :items="items"
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
    <!-- <v-spacer></v-spacer> -->
    <!-- <v-select
          :items="items"
          label="Stylesheet"
          v-model="select"
          @change="loadStyleSheet"
          color="indigo"
        ></v-select>

        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <v-tooltip bottom>
          <v-btn
            flat
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
            flat
            small
            color="blue darken-4"
            dark
            slot="activator"
            @click.prevent="getEntity('saveHtml')"
            style="font-size: 12px"
          >Save As HTML
            <v-icon dark right style="font-size: 18px">save_alt</v-icon>
          </v-btn>
          <span>Save As HTML</span>
    </v-tooltip>-->
    <!-- </v-toolbar>
    </v-flex>-->
  </v-layout>
</template>

<script>
import { EventBus } from "@/event-bus.js";
export default {
  mounted() {
    this.loadStyleSheet("blank.css");
  },
  methods: {
    getEntity(action) {
      EventBus.$emit("entityEvent", action);
    },
    loadStyleSheet(e) {
      if (e === "blank.css") {
        try {
          document.querySelector(`link[href$="/css/github.css"]`).remove();
        } catch (e) {
          console.log(e);
        }
        let file = document.createElement("link");
        file.rel = "stylesheet";
        file.href = "/css/blank.css";
        document.head.appendChild(file);
      }

      if (e === "github.css") {
        document.querySelector(`link[href$="/css/blank.css"]`).remove();
        let file = document.createElement("link");
        file.rel = "stylesheet";
        file.href = "/css/github.css";
        document.head.appendChild(file);
      }
      this.currentStyleSheet = e;
    }
  },
  data() {
    return {
      currentStyleSheet: "blank.css",
      items: [
        { text: "No Stylesheet", value: "blank.css" },
        { text: "Github", value: "github.css" }
      ],
      select: { text: "No Stylesheet", value: "blank.css" },
      tools: [
        { name: "header", action: "header", icon: "title", tooltip: "Header" },
        { name: "bold", action: "bold", icon: "format_bold", tooltip: "Bold" },
        {
          name: "italicize",
          action: "italicize",
          icon: "format_italic",
          tooltip: "Italicize"
        },
        {
          name: "blockquote",
          action: "blockquote",
          icon: "format_quote",
          tooltip: "Blockquote"
        },
        { name: "link", action: "link", icon: "link", tooltip: "Link" },
        {
          name: "image",
          action: "image",
          icon: "insert_photo",
          tooltip: "Image"
        },
        {
          name: "unorderedList",
          action: "unorderedList",
          icon: "format_list_bulleted",
          tooltip: "Bulleted List"
        },
        {
          name: "orderedList",
          action: "orderedList",
          icon: "format_list_numbered",
          tooltip: "Numbered List"
        },

        {
          name: "footnote",
          action: "footnote",
          icon: "short_text",
          tooltip: "Footnote"
        },
        {
          name: "table",
          action: "table",
          icon: "table_chart",
          tooltip: "Table"
        },
        {
          name: "loremipsum",
          action: "loremipsum",
          icon: "texture",
          tooltip: "Lorem Ipsum paragraph"
        },
        {
          name: "mdToClipboard",
          action: "mdToClipboard",
          icon: "assignment",
          tooltip: "Copy Markdown to clipboard"
        }
      ],
      renderTools: [
        {
          name: "showHtml",
          action: "showHtml",
          icon: "code",
          tooltip: "Show HTML"
        },
        {
          name: "saveHtml",
          action: "saveHtml",
          icon: "save_alt",
          tooltip: "Save HTML"
        }
      ]
    };
  }
};
</script>

<style>
.v-input {
  max-width: 175px;
}
</style>
