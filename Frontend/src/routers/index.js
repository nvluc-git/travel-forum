import { createRouter, createWebHistory } from "vue-router";
import { useAuthenStore } from "@/stores/authen.store";
import { accountsStore } from "@/stores/accounts.store";
import { authenRoute } from "./authen.router";
import { userRoute } from "./user.router";
const routes = [
  {
    path: "/welcome",
    name: "welcome",
    meta: { title: "Welcome" },
    component: () => import("../views/not-authen/welcome-page.vue"),
  },
  {
    path: "/about",
    name: "about",
    meta: { title: "About" },
    component: () => import("../views/not-authen/about-page.vue"),
  },
  {
    path: "/terms",
    name: "terms",
    meta: { title: "Terms of use" },
    component: () => import("../views/not-authen/terms-use.vue"),
  },
  {
    path: "/policy",
    name: "policy",
    meta: { title: "Privacy policy" },
    component: () => import("../views/not-authen/privacy-policy.vue"),
  },
  ...authenRoute,
  {
    path: "/",
    name: "home",
    meta: { title: "Home", requiresAuth: true },
    component: () => import("../components/general/home-page.vue"),
    redirect: "/posts",
  },
  {
    path: "/posts",
    name: "posts",
    meta: { requiresAuth: true },
    component: () => import("../components/general/posts-page.vue"),
  },
  {
    path: "/questions",
    name: "questions",
    meta: { requiresAuth: true },
    component: () => import("../components/general/questions-page.vue"),
  },
  {
    path: "/services",
    name: "services",
    meta: { requiresAuth: true },
    component: () => import("../components/general/services-page.vue"),
  },
  {
    path: "/detail/:id",
    name: "detail",
    meta: { requiresAuth: true },
    component: () => import("../components/general/detail-page.vue"),
  },
  {
    path: "/personal/:id",
    name: "personal",
    meta: { requiresAuth: true },
    component: () => import("../components/general/personal-page.vue"),
  },
  ...userRoute,

  {
    path: "/admin",
    name: "admin",
    meta: { requiresAuth: true },
    component: () => import("../views/account/admin-page.vue"),
    beforeEnter: (to, from, next) => {
      const useAcc = accountsStore();
      if (useAcc.currentUser.role === "Admin") {
        next();
      } else {
        next({ name: "home" });
      }
    },
  },

  {
    path: "/error",
    name: "error",
    meta: { title: "Error" },
    component: () => import("@/components/notFound/not-found.vue"),
  },
  { path: "/:pathMatch(.*)*", redirect: "/error" },
  { path: "/personal/:pathMatch(.*)*", redirect: "/error" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  const useAuthen = useAuthenStore();
  let array = ["welcome", "sign-in", "sign-up", "forgot-password"];

  if (to.meta.requiresAuth) {
    if (!useAuthen.userToken) {
      next({ name: "welcome" });
    } else {
      next();
    }
  } else {
    if (array.includes(to.name) && useAuthen.userToken) {
      next({ name: "home" });
    } else {
      next();
    }
  }
});

export default router;
