<template>
  <v-app id="markdown-app">
    <nav-primary></nav-primary>
    <nav-markdown v-if="showTools"></nav-markdown>
    <router-view />
    <settings-window v-if="showTools"></settings-window>
    <lint-window v-if="showTools"></lint-window>
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
  mounted() {},
  data() {
    return {};
  },
  computed: {
    showTools() {
      return this.$route.meta.showTools;
    }
  }
};
</script>

<style lang="scss">
.theme--light.application {
  background: #ddd;
}
</style>
