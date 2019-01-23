<template>
  <v-app id="markdown-app">
    <nav-primary></nav-primary>
    <router-view/>
  </v-app>
</template>

<script>
import NavPrimary from "@/components/NavPrimary";
export default {
  components: {
    NavPrimary
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
