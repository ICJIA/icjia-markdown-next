<template>
  <v-app id="markdown-app">
   
    <nav-primary></nav-primary>
 <settings-window></settings-window>
    <router-view />
    <lint-window></lint-window>
    
  </v-app>
</template>

<script>
import LintWindow from "@/components/LintWindow";
import SettingsWindow from "@/components/SettingsWindow";
import NavPrimary from "@/components/NavPrimary";
export default {
  components: {
    NavPrimary,
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
