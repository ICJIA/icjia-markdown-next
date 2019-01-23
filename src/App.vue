<template>
  <v-app id="inspire">
    <v-navigation-drawer fixed v-model="drawer" app style="z-index: 101">
      <div class="options">
        <div>options</div>
      </div>
      <v-expansion-panel focusable>
        <v-expansion-panel-content v-for="(item,i) in 5" :key="i">
          <div slot="header">Item</div>
          <v-card>
            <v-card-text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
              magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat.
            </v-card-text>
          </v-card>
          <v-card>
            <v-card-text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
              magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat.
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-navigation-drawer>
    <v-toolbar color="indigo" dark dense fixed app style="z-index: 100">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>ICJIA Markdown Editor</v-toolbar-title>
    </v-toolbar>

    <router-view/>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: false
  }),
  props: {
    source: String
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.options {
  height: 48px;
  background: #f5f5f5;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 900;
}
</style>
