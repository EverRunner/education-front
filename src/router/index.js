import Vue from "vue";
import VueRouter from "vue-router";
import home from "../views/common/home";
import login from "../views/common/login";
// import im from "../views/common/im";
// import bbs from "../views/common/bbs";
// import registered from "../views/common/registered";
// import forgetPassword from "../views/common/forgetPassword";
// import bindUser from "../views/common/bindUser";
import layout from "../views/layout";
import account from "./modules/account";
import course from "./modules/course";
import order from "./modules/order";
import article from "./modules/article";
import pass from "./modules/pass";
import blog from "./modules/blog";
// import ACTIVITY from "../views/common/activity";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "HOME",
    meta: {
      index: 0,
      title: "主页",
    },
    component: layout,
    redirect: {
      name: "HOME_INDEX",
    },
    children: [
      {
        path: "/",
        name: "HOME_INDEX",
        meta: {
          title: "首页",
        },
        component: home,
      },
    ],
  },

  {
    path: "/registered",
    name: "REGISTERED",
    meta: {
      index: 2,
      title: "注册",
      isNav: false,
    },
    // component: registered,
    component: () => import("@/views/common/registered"),
  },

  {
    path: "/login",
    name: "LOGIN",
    meta: {
      index: 1,
      title: "登录",
      isNav: false,
    },
    component: login,
  },

  {
    path: "/activity",
    name: "ACTIVITY",
    meta: {
      index: 1,
      title: "考试计划活动",
      isNav: false,
    },
    // component: ACTIVITY,
    component: () => import("@/views/common/activity"),
  },

  // 绑定用户
  {
    path: "/bindUser",
    name: "BIND_USER",
    meta: {
      index: 1,
      title: "绑定用户",
      isNav: false,
    },
    // component: bindUser,
    component: () => import("@/views/common/bindUser"),
  },

  // IM 测试
  {
    path: "/im",
    name: "IM",
    meta: {
      index: 1,
      title: "即时聊天",
      isNav: false,
    },
    // component: im,
    component: () => import("@/views/common/im"),
  },

  // 在线客服
  {
    path: "/chat",
    name: "CHAT",
    meta: {
      index: 1,
      title: "在线客服",
      isNav: false,
    },
    // component: im,
    component: () => import("@/views/common/chat"),
  },

  // bbs
  {
    path: "/bbs",
    name: "BBS",
    meta: {
      index: 1,
      title: "论坛",
      isNav: false,
    },
    // component: bbs,
    component: () => import("@/views/common/bbs"),
  },

  {
    path: "/forgetPassword",
    name: "FORGETPASSWORD",
    meta: {
      index: 1,
      title: "忘记密码",
      isNav: false,
    },
    // component: forgetPassword,
    component: () => import("@/views/common/forgetPassword"),
  },

  //个人中心
  {
    path: "/account",
    name: "ACCOUNT",
    meta: {
      title: "我的主页",
      isNav: true,
    },
    component: layout,
    redirect: {
      name: "ACCOUNT_INDEX",
    },
    children: account,
  },

  //课程详情
  {
    path: "/course",
    name: "COURSE",
    meta: {
      title: "课程中心",
      isNav: true,
    },
    component: layout,
    redirect: {
      name: "ACCOUNT_INDEX",
    },
    children: course,
  },

  //订单中心
  {
    path: "/order",
    name: "ORDER",
    meta: {
      title: "课程订单",
      isNav: true,
    },
    component: layout,
    redirect: {
      name: "ORDER_INDEX",
    },
    children: order,
  },

  // 文章列表
  {
    path: "/article",
    name: "ARTICLE",
    meta: {
      title: "文章",
      isNav: true,
    },
    component: layout,
    redirect: {
      name: "ARTICLE_LIST",
    },
    children: article,
  },

  // blog
  {
    path: "/blog",
    name: "BLOG",
    meta: {
      title: "博客",
      isNav: true,
    },
    component: layout,
    redirect: {
      name: "BLOG_LIST",
    },
    children: blog,
  },

  // 考过生衍生服务
  {
    path: "/pass",
    name: "PASS",
    meta: {
      title: "文章",
      isNav: true,
    },
    component: layout,
    redirect: {
      name: "PASS_APPLY",
    },
    children: pass,
  },

  // 考过生详情
  {
    path: "/honours",
    name: "HONOURS",
    meta: {
      title: "荣誉",
      isNav: true,
    },
    component: layout,
    redirect: {
      name: "HONOURS_D",
    },
    children: [
      {
        path: "honoursD",
        name: "HONOURS_D",
        meta: {
          title: "考过生详情",
          icon: "",
          isNav: true,
        },
        component: () => import("@/views/common/honoursD.vue"),
      },
    ],
  },

  //错误页面
  {
    path: "/error",
    name: "ERROR",
    meta: {
      title: "错误页面",
      icon: "",
      isNav: false,
    },
    component: { template: `<router-view/>` },
    redirect: {
      name: "ERROR_404",
    },
    children: [
      {
        path: "404",
        name: "ERROR_404",
        meta: {
          title: "404",
          icon: "",
          isNav: false,
        },
        component: () => import("@/views/common/404.vue"),
      },
    ],
  },

  //未找到路由
  {
    path: "*",
    name: "PULL",
    meta: {
      title: "未找到路由",
      icon: "",
      isNav: false,
    },
    redirect: {
      name: "ERROR_404",
    },
    hidden: true,
  },
];

const router = new VueRouter({
  scrollBehavior() {
    // 将滚动条位置恢复到最顶部
    return { x: 0, y: 0 };
  },
  routes,
});

export default router;
