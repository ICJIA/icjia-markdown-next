import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {}
    },

    {
      path: "/404",
      name: "error",
      component: () =>
        import(/* webpackChunkName: "error" */ "./views/404.vue"),
      meta: {}
    },
    {
      path: "/:modeParam",
      name: "modeParam",
      component: Home,
      meta: {}
    },

    {
      path: "*",
      redirect: { name: "error" }
    }
  ]
});
