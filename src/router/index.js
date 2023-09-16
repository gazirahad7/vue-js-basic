import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

import UserView from "../views/Users/View.vue";

import User from "../views/Users/User.vue";

import NotFound from "../views/NotFound.vue";

import CreateUser from "../views/Users/CreateUser.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/users",
      name: "users",
      component: UserView,
    },
    {
      path: "/users/create",
      name: "create-user",
      component: CreateUser,
    },
    {
      path: "/users/:id",
      name: "user",
      component: User,
    },
    {
      path: "/:catchAll(.*)",
      component: NotFound,
    },
  ],
});

export default router;
