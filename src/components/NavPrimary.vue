<template>
  <v-layout
    row
    wrap
    style="position: fixed; top: 0; width: 100%; z-index: 100;"
  >
    <v-flex xs12>
      <v-toolbar dark color="indigo" dense>
        <v-toolbar-side-icon></v-toolbar-side-icon>

        <v-toolbar-title class="white--text"
          >ICJIA Markdown Editor</v-toolbar-title
        >
        &nbsp;<mode-select></mode-select>
        <v-spacer></v-spacer>
      </v-toolbar>
    </v-flex>
  </v-layout>
</template>

<script>
import ModeSelect from "@/components/ModeSelect";
export default {
  components: {
    ModeSelect
  }
};
</script>

<style scoped></style>
