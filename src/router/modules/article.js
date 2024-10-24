export default [
  {
    path: "/",
    name: "ARTICLE_LIST",
    meta: {
      title: "文章列表",
      icon: "",
      isNav: true,
    },
    component: () => import("@/views/article/details.vue"),
  },
  {
    path: "details",
    name: "ARTICLE_DETAILS",
    meta: {
      title: "文章详情",
      icon: "",
      isNav: true,
    },
    component: () => import("@/views/article/details.vue"),
  },
  {
    path: "explainVideo",
    name: "ARTICLE_EXPLAIN_VIDEO",
    meta: {
      title: "学员常见疑问解答",
      icon: "",
      isNav: true,
    },
    component: () => import("@/views/article/explainVideo.vue"),
  },
];
