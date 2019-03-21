<template>
  <v-layout row wrap :style="toolbarStyle">
    <v-flex xs12>
      <v-toolbar dark color="indigo" dense>
        <slot name="left"></slot>

        <v-toolbar-title class="white--text"
          ><slot name="title"></slot>
        </v-toolbar-title>

        <v-spacer></v-spacer>
        <slot name="right"></slot>
      </v-toolbar>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: {
    top: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      toolbarStyle: {
        position: "fixed",
        top: this.top,
        width: "100%",
        "z-index": "100"
      }
    };
  }
};
</script>

<style scoped></style>
