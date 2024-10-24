<style lang="scss">
@import "../src/assets/style/public";
@import "../src/assets/style/media";
</style>

<template>
  <div id="app">
    <!-- <transition name="fade-transform" mode="out-in">
   </transition> -->

    <router-view />
  </div>
</template>

<script>
import {
  wxJssdk,
  wxUpdateAppMessageShareData,
  wxUpdateTimelineShareData,
} from "@/utils/tools/wxJssdk";

export default {
  mounted() {
    this.handleWxShare();
  },

  methods: {
    /**
     * 处理微信分享朋友、朋友圈
     */
    async handleWxShare() {
      await wxJssdk(); // 配置jssdk

      // 分享给朋友
      wxUpdateAppMessageShareData({
        title: "易北联邦按摩辅导",
        desc:
          "全美考试通过率最高的联邦按摩在线辅导，专门针对英文 0 基础的华人按摩师",
        link: "https://ybmblex.net/#/?channel=wxLink",
        imgUrl: "https://ybmblex.net/logo.jpg",
      });

      // 分享到朋友圈
      wxUpdateTimelineShareData({
        title: "易北联邦按摩辅导",
        link: "https://ybmblex.net/#/?channel=wxLink",
        imgUrl: "https://ybmblex.net/logo.jpg",
      });
    },
  },
};
</script>
