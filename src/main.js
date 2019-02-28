import "@babel/polyfill";
import Vue from "vue";
import "./plugins/axios";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

import VueClipboard from "vue-clipboard2";
Vue.use(VueClipboard);

import browserDetect from "vue-browser-detect-plugin";
Vue.use(browserDetect);

import TreeView from "vue-json-tree-view";
Vue.use(TreeView);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
