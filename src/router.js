import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: { navPrimary: true, navMarkdown: true, navHtml: false }
    },
    {
      path: "/support",
      name: "support",
      component: () =>
        import(/* webpackChunkName: "error" */ "./views/Support.vue"),
      meta: { navPrimary: true, navMarkdown: false, navHtml: false }
    },
    {
      path: "/html",
      name: "html",
      component: () =>
        import(/* webpackChunkName: "error" */ "./views/HtmlToMarkdown.vue"),
      meta: { navPrimary: true, navMarkdown: false, navHtml: true }
    },

    {
      path: "/404",
      name: "error",
      component: () =>
        import(/* webpackChunkName: "error" */ "./views/404.vue"),
      meta: { navPrimary: true, navMarkdown: false, navHtml: false }
    },
    {
      path: "/:modeParam",
      name: "modeParam",
      component: Home,
      meta: { navPrimary: true, navMarkdown: true, navHtml: false }
    },

    {
      path: "*",
      redirect: { name: "error" }
    }
  ]
});
