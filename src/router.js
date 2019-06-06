import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Create from "./views/Create.vue";
import Show from "./views/Show.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "*",
      redirect: "/home"
    },
    {
      path: "/home",
      name: "home",
      component: Home,
      props: true,
    },
    {
      path: "/create",
      name: "create",
      component: Create,
      props: true,
    },
    {
      path: "/show/:id",
      name: "show",
      component: Show,
      props: true
    },
  ]
});
