import router from "./router";
import store from "./store";
import { entryPageMember, exitPageMember } from "./api/common";
import { getBrowseCategory, sendWebSocket } from "./utils/tools";

let requestId; //访问返回的id

/**
 * 访问记录
 */

router.beforeEach(async (to, from, next) => {
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

  // 分销码
  if (to.query.recommendCode)
    localStorage.setItem("recommendCode", to.query.recommendCode);

  // 访问记录的渠道
  if (!sessionStorage.getItem("visitChannel") && to.query.channel)
    sessionStorage.setItem("visitChannel", to.query.channel);

  // 注册的渠道
  if (!localStorage.getItem("registeredChannel") && to.query.channel)
    localStorage.setItem("registeredChannel", to.query.channel);

  //路由下一步
  next();

  // 5秒发送在线状态
  // if (userInfo) {
  //     const intervalId = setInterval(() => {
  //         const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  //         if (!userInfo || store.state.isWebSocket == 0) {
  //             clearInterval(store.state.isWebSocket);
  //             store.commit("setIsWebSocket", 0);
  //             return;
  //         }
  //         sendWebSocket(userInfo.id, userInfo.username);
  //     }, 10000);
  //     store.commit("setIsWebSocket", intervalId);
  // }

  const category = getBrowseCategory(); //设备类型

  const { data: resData } = await entryPageMember({
    pagename: to.meta.title,
    pageurl: to.path,
    entryuurl: from.path,
    browerinfo: navigator.userAgent, //浏览器信息
    category,
    entryway: to.query.visitType || 0, // 进入方式（0：直接访问  1：短信访问  2：邮箱访问）
    channel: sessionStorage.getItem("visitChannel") || "", // 访问渠道，YouTube：youtube  公众号：mpwx  小红书：xhs  微信学员分享：wxLink  学员分享：studentCode
  });

  if (resData.data.status) return next();

  requestId = resData.data.id;
});

router.afterEach(async (to, from) => {
  // if (requestId && sessionStorage.getItem("userInfo")) {}

  if (requestId) {
    await exitPageMember({
      requestId,
      endurl: from.path,
    });
    requestId = null;
  }
});
