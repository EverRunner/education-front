import wx from "weixin-js-sdk";
import { getJssdkConfig } from "@/api/common";

/**
 * 配置jssdk
 */
const wxJssdk = async (locationHref) => {
  const url = window.location.href.split("?")[0];

  const { data: resData } = await getJssdkConfig(url);
  if (!resData) return;

  wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: resData.data.data.appId, // 必填，公众号的唯一标识
    timestamp: resData.data.data.timestamp, // 必填，生成签名的时间戳
    nonceStr: resData.data.data.nonceStr, // 必填，生成签名的随机串
    signature: resData.data.data.signature, // 必填，生成签名的随机串
    jsApiList: resData.data.data.jsApiList, // 必填，需要使用的JS接口列表
  });
};

/**
 * 微信支付
 */
const wxPay = async (params) => {
  await wxJssdk();
  return new Promise((resolve, reject) => {
    wx.ready(function() {
      wx.chooseWXPay({
        timestamp: params.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写
        nonceStr: params.nonceStr, // 支付签名随机串，不长于 32 位
        package: params.package, // 统一支付接口返回的prepay_id参数值
        signType: params.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
        paySign: params.paySign, // 支付签名
        success: function(res) {
          resolve(res);
        },
        fail: function(err) {
          reject(err);
        },
      });
    });
  });
};

/**
 * 获取地理位置
 */
const wxGetLocation = async (params) => {
  await wxJssdk();
  return new Promise((resolve, reject) => {
    wx.ready(function() {
      wx.getLocation({
        type: "wgs84", // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success: function(res) {
          console.log(res, "获取地址经纬度");
          resolve(res);
        },
      });
    });
  });
};

/**
 * 查看地理位置
 */
const wxCheckLocation = async (params) => {
  await wxJssdk();
  return new Promise((resolve, reject) => {
    wx.ready(function() {
      wx.openLocation({
        latitude: params.latitude, // 纬度，浮点数，范围为90 ~ -90
        longitude: params.longitude, // 经度，浮点数，范围为180 ~ -180。
        name: params.name, // 位置名
        address: "测试地址", // 地址详情说明
        scale: 20, // 地图缩放级别,整型值,范围从1~28。默认为最大
        infoUrl: "", // 在查看位置界面底部显示的超链接,可点击跳转
        success: function(res) {
          resolve(res);
        },
      });
    });
  });
};

/**
 * 分享给朋友
 */
const wxUpdateAppMessageShareData = async (params) => {
  return new Promise((resolve, reject) => {
    wx.ready(function() {
      // wx.updateAppMessageShareData({
      wx.onMenuShareAppMessage({
        title: params.title, // 分享标题
        desc: params.desc, // 分享描述
        link: params.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: params.imgUrl, // 分享图标
        type: "link",
        success: function() {
          // 成功时的回调
          // alert("成功分享给朋友")
          resolve(res);
        },
      });
    });
  });
};

/**
 * 分享到朋友圈
 */
const wxUpdateTimelineShareData = async (params) => {
  return new Promise((resolve, reject) => {
    wx.ready(function() {
      // wx.updateTimelineShareData({
      wx.onMenuShareTimeline({
        title: params.title, // 分享标题
        link: params.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: params.imgUrl, // 分享图标
        type: "link",
        success: function() {
          // 成功时的回调
          // alert("成功分享到朋友圈")
          resolve(res);
        },
      });
    });
  });
};

export {
  wxJssdk,
  wxPay,
  wxGetLocation,
  wxCheckLocation,
  wxUpdateAppMessageShareData,
  wxUpdateTimelineShareData,
};
