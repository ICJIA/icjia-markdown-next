<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-toolbar flat color="grey lighten-2" style="z-index: 100; position: fixed; top: 50px;">
        <div v-for="tool in tools" :key="tool.action">
          <v-tooltip bottom>
            <v-btn small icon slot="activator" @click.prevent="getEntity(tool.action)">
              <v-icon size="20px">{{tool.icon}}</v-icon>
            </v-btn>
            <span>{{tool.tooltip}}</span>
          </v-tooltip>
        </div>
        <v-spacer></v-spacer>
        <div v-for="tool in renderTools" :key="tool.action">
          <v-tooltip bottom>
            <v-btn icon slot="activator" @click.prevent="getEntity(tool.action)">
              <v-icon size="20px">{{tool.icon}}</v-icon>
            </v-btn>
            <span>{{tool.tooltip}}</span>
          </v-tooltip>
        </div>
      </v-toolbar>
    </v-flex>
  </v-layout>
</template>

<script>
import { EventBus } from "@/event-bus.js";
export default {
  methods: {
    getEntity(action) {
      console.log(action);
      EventBus.$emit("entityEvent", action);
    }
  },
  data() {
    return {
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
          name: "mdToClipboard",
          action: "mdToClipboard",
          icon: "assignment",
          tooltip: "Copy Markdown to clipboard"
        }

        // {
        //   name: "frontmatter",
        //   action: "frontmatter",
        //   icon: "fa fa-database"
        // },
        // {
        //   name: "mdToClipboard",
        //   action: "mdToClipboard",
        //   icon: "fa fa-clipboard"
        // }
        // { name: "ref", action: "reference", icon: "reference", text: 'ref', showName: true },
      ],
      renderTools: [
        {
          name: "showHtml",
          action: "showHtml",
          icon: "code",
          tooltip: "Show HTML"
        }
      ]
    };
  }
};
</script>

<style scoped>
</style>