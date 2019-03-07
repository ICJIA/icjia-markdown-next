<template>
  <v-app id="markdown-app">
    <nav-primary></nav-primary>

    <router-view />
    <lint-window></lint-window>
  </v-app>
</template>

<script>
import LintWindow from "@/components/LintWindow";
import NavPrimary from "@/components/NavPrimary";
export default {
  components: {
    NavPrimary,
    LintWindow
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss">
.theme--light.application {
  background: #ccc;
}
</style>
