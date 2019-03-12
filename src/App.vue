<template>
  <v-app id="markdown-app">
    <nav-primary></nav-primary>
    <nav-markdown></nav-markdown>
    <router-view />
    <settings-window></settings-window>

    <lint-window></lint-window>
  </v-app>
</template>

<script>
import LintWindow from "@/components/LintWindow";
import SettingsWindow from "@/components/SettingsWindow";
import NavPrimary from "@/components/NavPrimary";
import NavMarkdown from "@/components/NavMarkdown";

export default {
  components: {
    NavPrimary,
    NavMarkdown,
    LintWindow,
    SettingsWindow
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
