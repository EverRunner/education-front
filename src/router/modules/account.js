export default [
  {
    path: "/",
    name: "ACCOUNT_INDEX",
    meta: {
      title: "我的主页",
      icon: "",
      isNav: true,
    },
    component: () => import("@/views/account/index.vue"),
  },

  {
    path: "resource",
    name: "ACCOUNT_RESOURCE",
    meta: {
      title: "个人资料完善",
      icon: "",
      isNav: true,
    },
    component: () => import("@/views/account/resource.vue"),
  },

  {
    path: "info",
    name: "ACCOUNT_INFO",
    meta: {
      title: "个人资料",
      icon: "",
      isNav: true,
    },
    component: () => import("@/views/account/info.vue"),
  },

  {
    path: "letter",
    name: "ACCOUNT_LETTER",
    meta: {
      title: "站内信",
      icon: "",
      isNav: true,
    },
    component: () => import("@/views/account/letter.vue"),
  },

  {
    path: "letterInfo",
    name: "ACCOUNT_LETTER_INFO",
    meta: {
      title: "站内信详情",
      icon: "",
      isNav: true,
    },
    component: () => import("@/views/account/letterInfo.vue"),
  },

  {
    path: "recommend",
    name: "ACCOUNT_RECOMMEND",
    meta: {
      title: "推荐朋友",
      icon: "",
      isNav: true,
    },
    component: () => import("@/views/account/recommend.vue"),
  },

  {
    path: "buy",
    name: "ACCOUNT_BUY",
    meta: {
      title: "我的购买",
      icon: "",
      isNav: true,
    },
    component: () => import("@/views/account/buy.vue"),
  },

  {
    path: "set",
    name: "ACCOUNT_SET",
    meta: {
      title: "帐号设置",
      icon: "",
      isNav: true,
    },
    component: () => import("@/views/account/set.vue"),
  },

  {
    path: "share",
    name: "ACCOUNT_SHARE",
    meta: {
      title: "分享邀请",
      icon: "",
      isNav: true,
    },
    component: () => import("@/views/account/share.vue"),
  },
];
