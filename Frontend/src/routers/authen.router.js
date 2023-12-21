export const authenRoute = [
  {
    path: "/sign-in",
    name: "sign-in",
    meta: { title: "Sign in" },
    component: () => import("../views/authen/sign-in.vue"),
  },
  {
    path: "/sign-up",
    name: "sign-up",
    meta: { title: "Sign up" },
    component: () => import("../views/authen/sign-up.vue"),
  },
  {
    path: "/verify-email/:token",
    name: "verify-email",
    meta: { title: "Verify email address" },
    component: () => import("../views/authen/verify-emai.vue"),
  },
  {
    path: "/forgot-password/:token",
    name: "forgot-password",
    meta: { title: "Forgot password" },
    component: () => import("../views/authen/forgot-password.vue"),
  },
];
