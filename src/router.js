import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: { showTools: true }
    },
    {
      path: "/support",
      name: "support",
      component: () =>
        import(/* webpackChunkName: "error" */ "./views/Support.vue"),
      meta: { showTools: false }
    },
    {
      path: "/404",
      name: "error",
      component: () =>
        import(/* webpackChunkName: "error" */ "./views/404.vue"),
      meta: { showTools: false }
    },
    {
      path: "/:modeParam",
      name: "modeParam",
      component: Home,
      meta: { showTools: true }
    },

    {
      path: "*",
      redirect: { name: "error" }
    }
  ]
});
