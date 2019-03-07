import Vue from "vue";
import config from "@/config";

export const store = Vue.observable({
  config
});

export const mutations = {
  toggleLintingAutoAlert(autoAlert) {
    store.config.lintingAutoAlert = autoAlert;
  }
};
