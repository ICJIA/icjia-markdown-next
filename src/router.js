import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/:modeParam",
      name: "modeParam",
      component: Home
    },
    {
      path: "/",
      name: "home",
      component: Home
    },
    // {
    //   path: "/sandbox",
    //   name: "sandbox",

    //   component: () =>
    //     import(/* webpackChunkName: "about" */ "./views/Sandbox.vue")
    // },
    {
      path: "/404",
      name: "error",
      component: () =>
        import(/* webpackChunkName: "error" */ "./views/404.vue"),
      meta: {}
    },
    {
      path: "*",
      redirect: { name: "error" }
    }
  ]
});
