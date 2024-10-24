import router from "./router";
import store from "./store";
import NProgress from "nprogress"; // 进度条
import "nprogress/nprogress.css"; // 进度条样式
import { initIM } from "./api/im"; // 进度条样式

import getPageTitle from "@/utils/get-page-title";
import { setTokenExpirationTime } from "@utils/tools";

NProgress.configure({ showSpinner: true }); // NProgress 配置

const whiteList = [
  "/",
  "/login",
  "/activity",
  "/chat",
  "/registered",
  "/forgetPassword",
  "/article/details",
  "/article/details",
  "/course/chapteRother",
  "/blog/",
  "/blog/list",
  "/blog/details",
  "/error/404",
]; // 没有重定向白名单

/**
 * 初始化IM 添加客服
 */
async function initImAddService(to) {
  if (localStorage.getItem("initIm") || whiteList.indexOf(to.path) != -1)
    return;

  // id:2983 易北客服
  const imRes = await initIM(2983);
  if (!imRes.data.data.status) return initImAddService();

  localStorage.setItem("initIm", true);
}

/**
 * 路由前置守位
 */
router.beforeEach(async (to, from, next) => {
  // 设置页面标题
  document.title = getPageTitle(to.meta.title);

  // 开始进度条
  if (to.path != "/chat") NProgress.start();

  //后端带token，访问学员端
  if (to.query.token) {
    sessionStorage.setItem("token", to.query.token);
    setTokenExpirationTime({
      hour: 18,
    });
  }

  // 没有token，去登录
  if (sessionStorage.getItem("token") || whiteList.indexOf(to.path) != -1) {
    initImAddService(to);

    // 如果是微信第三方登录，没有绑定手机号的用户
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    if (userInfo?.openid_wx && !userInfo.phone && to.path != "/bindUser")
      next("/bindUser");

    next();
  } else {
    next(`/login?redirect=${to.path}`);
    NProgress.done();
  }
});

/**
 * 路由后置守位
 */
router.afterEach(() => {
  // 完成进度条
  NProgress.done();
});
