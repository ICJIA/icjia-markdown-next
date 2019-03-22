<template>
  <v-layout row wrap :style="toolbarStyle">
    <v-flex xs12>
      <v-toolbar color="grey lighten-2" dense>
        <slot name="left"></slot>

        <v-toolbar-title class="white--text"
          ><slot name="title"></slot>
        </v-toolbar-title>

        <base-toolbar-items :toolbarItems="toolbarItems"></base-toolbar-items>
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
      toolbarItems: ["book"],
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
