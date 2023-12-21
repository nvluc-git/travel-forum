export const userRoute = [
  {
    path: "/management",
    name: "management",
    meta: { title: "management", requiresAuth: true },
    component: () => import("../views/account/user-page.vue"),
    children: [
      {
        path: "content",
        name: "content",
        meta: { title: "Content management" },
        component: () => import("../components/user/content-mgt.vue"),
      },
      {
        path: "account",
        name: "account",
        meta: { title: "Account Management" },
        component: () => import("../components/user/account-mgt.vue"),
      },
    ],
  },
];
