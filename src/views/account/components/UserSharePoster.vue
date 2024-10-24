<style lang="scss" scope></style>

<template>
  <section v-loading="loading" style="padding-top:30px">
    <div class="invite">
      <div class="invite-logo">
        <img src="@/assets/images/login_logo.png" alt="" />
      </div>
      <div class="invite-content">
        <div class="invite-content-text">
          <h5>
            我是{{ userInfo.username }}，截至目前，我在易北学习了
            {{ studyTime }}： 学习了
            {{ userRadarData.mine_vediostudy_count }} 个视频课程，做了
            {{ userRadarData.mine_keywordtest_count }}
            次关键词测试，章节测试平均成绩
            {{
              Math.floor(userRadarData.mine_chatpertest_avg * 10000) / 100
            }}%！
          </h5>
          <p>来易北和我一起学习吧！</p>
        </div>
        <div style="min-height: 40vh;">
          <study-radar-statics
            :userRadarData="userRadarData"
            v-if="userRadarData.vedio_mine_duration"
          />
        </div>
        <div class="invite-content-code">
          <p>扫码报名领取 <em>100美金</em> 优惠</p>
          <canvas
            :style="{ width: '90px', height: '90px' }"
            id="canvas"
          ></canvas>
        </div>
      </div>
    </div>
    <div class="invite-btn">
      <el-button @click="handleCreateImage" type="primary" round
        >下载分享图片</el-button
      >
    </div>
  </section>
</template>

<script>
import StudyRadarStatics from "./StudyRadarStatics";
import QRCode from "qrcode";
import html2canvas from "html2canvas";
import { formatSeconds } from "@utils/tools";
import { SHARE_URL } from "@config";

export default {
  name: "UserSharePoster",

  components: {
    StudyRadarStatics,
  },

  props: {},

  data() {
    return {
      userInfo: JSON.parse(sessionStorage.getItem("userInfo") || {}),
      studyTime: "",
      userRadarData: {},
      loading: true,
    };
  },

  computed: {},

  created() {
    this.queryUserRadarStatics();
  },

  mounted() {
    const qrcode = `${SHARE_URL}/#/?channel=studentCode&recommendCode=${this.userInfo.sharecode}`;
    var canvas = document.getElementById("canvas");

    QRCode.toCanvas(canvas, qrcode, { width: 90, height: 90 }, function(error) {
      if (error) console.error(error);
      console.log("success!");
    });

    this.studyTime = formatSeconds(this.userInfo.allstudytime);
  },

  methods: {
    /**
     * 下载图片
     */
    downloadImage(url) {
      const a = document.createElement("a");
      a.href = url;
      a.download = this.userInfo.username + " 分享海报";
      a.click();
    },

    /**
     * 生成截图
     */
    handleCreateImage() {
      let scale = 1;

      // 电脑导出图片有问题，所以放在1.1倍
      if (document.body.clientWidth >= 1200) scale = 1.11;

      return new Promise((resolve, reject) => {
        try {
          const canvas = document.createElement("canvas");
          const canvasBox = document.querySelector(".invite");
          const width = canvasBox.clientWidth;
          const height = canvasBox.clientHeight;
          // 宽高 * 2 并放大 2 倍 是为了防止图片模糊
          canvas.width = width * 2;
          canvas.height = height * 2;
          canvas.style.width = width + "px";
          canvas.style.height = height + "px";
          const context = canvas.getContext("2d");
          context.scale(scale, scale);
          const options = {
            backgroundColor: "#004988",
            canvas: canvas,
            useCORS: true, // 开启跨域配置
          };

          html2canvas(canvasBox, options).then((canvas) => {
            const dataURL = canvas.toDataURL("image/png"); // 图片格式转成base64
            resolve({
              code: "success",
              dataURL,
            });
            this.downloadImage(dataURL);
          });
        } catch (error) {
          reject(error);
        }
      });
    },

    /**
     * 获取当前用户的学习雷达图
     */
    async queryUserRadarStatics() {
      const { data: resData } = await this.$get(
        "/user/getcurrentuserstudyalanydata"
      );
      this.loading = false;
      if (!resData.data.status) return;

      this.userRadarData = resData.data.data[0];
    },
  },
};
</script>
