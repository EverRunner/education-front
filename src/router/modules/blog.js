export default [
  {
    path: "/",
    name: "BLOG_LIST",
    meta: {
      title: "博客列表",
      icon: "",
      isNav: true,
    },
    component: () => import("@/views/blog/list.vue"),
  },
  {
    path: "details",
    name: "BLOG_DETAILS",
    meta: {
      title: "博客详情",
      icon: "",
      isNav: true,
    },
    component: () => import("@/views/blog/details.vue"),
  },
];
