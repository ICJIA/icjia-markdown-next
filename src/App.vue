<template>
  <v-app id="markdown-app">
    <nav-primary v-if="navPrimary"></nav-primary>
    <nav-markdown v-if="navMarkdown"></nav-markdown>

    <nav-html v-if="navHtml"></nav-html>
    <router-view />
    <settings-window v-if="navMarkdown"></settings-window>
    <lint-window v-if="navMarkdown"></lint-window>
  </v-app>
</template>

<script>
import LintWindow from "@/components/LintWindow";
import SettingsWindow from "@/components/SettingsWindow";
import NavPrimary from "@/components/NavPrimary";
import NavMarkdown from "@/components/NavMarkdown";
import NavHtml from "@/components/NavHtml";

export default {
  components: {
    NavPrimary,
    NavMarkdown,
    NavHtml,
    LintWindow,
    SettingsWindow
  },
  mounted() {},
  data() {
    return {};
  },
  computed: {
    navMarkdown() {
      return this.$route.meta.navMarkdown;
    },
    navPrimary() {
      return this.$route.meta.navPrimary;
    },
    navHtml() {
      return this.$route.meta.navHtml;
    }
  }
};
</script>

<style lang="scss">
.theme--light.application {
  background: #ddd;
}
</style>
