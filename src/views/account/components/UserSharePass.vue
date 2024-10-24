<style lang="scss" scope></style>

<template>
  <section v-loading="loading" style="padding-top:30px">
    <div class="invite">
      <div class="invite-logo">
        <img src="@/assets/images/login_logo.png" alt="" />
      </div>
      <div class="invite-pass">
        <h5 class="invite-pass-title">我在易北成功通过了<br />联邦考试！</h5>
        <ul class="pass-user-step">
          <li>
            <div class="icon"><i class="el-icon-success"></i></div>
            <div class="text">
              <p>{{ historyData.studyStartDateTime | formatDate }}</p>
              <h5>您注册了易北账户，开始试听课程</h5>
            </div>
          </li>
          <li>
            <div class="icon"><i class="el-icon-success"></i></div>
            <div class="text">
              <p>{{ historyData.creathydate | formatDate }}</p>
              <h5>您正式加入易北，开启了学习之旅</h5>
            </div>
          </li>
          <li>
            <div class="icon"><i class="el-icon-success"></i></div>
            <div class="text">
              <p>{{ historyData.firstCourseDateTime | formatDate }}</p>
              <h5>您看完了第一节课程，并完成了测试</h5>
            </div>
          </li>
          <li>
            <div class="icon"><i class="el-icon-success"></i></div>
            <div class="text">
              <p>{{ historyData.joinDateTime | formatDate }}</p>
              <h5>
                这一天，您学习了{{
                  Math.floor(
                    ((historyData.studyMaxTimes || 0) / 60 / 60) * 10
                  ) / 10
                }}个小时，凌晨还在努力奋斗
              </h5>
            </div>
          </li>
          <li>
            <div class="icon"><i class="el-icon-success"></i></div>
            <div class="text">
              <p>{{ historyData.lastTestDateTime | formatDate }}</p>
              <h5>
                您完成了最后一套考前测验，通过率{{
                  Math.floor((historyData.correctpercent || 0) * 100 * 10) / 10
                }}%
              </h5>
            </div>
          </li>
          <li>
            <div class="icon"><i class="el-icon-success"></i></div>
            <div class="text">
              <p>{{ userInfo.endhydate | formatDate }}</p>
              <h5>您迈入了考场</h5>
            </div>
          </li>
        </ul>
        <div class="statistics">
          总共学习了 <em>125</em> 小时，从报名到考试花了 <em>62</em> 天！
        </div>
        <div class="code">
          <h5>来易北教育和我<br />一起学习联邦吧！</h5>
          <ul>
            <li>
              <canvas
                :style="{ width: '90px', height: '90px' }"
                id="canvas"
              ></canvas>
              <p>扫码报名领取<br /><em>100美金</em>优惠</p>
            </li>
            <li>
              <img src="@/assets/images/ewm.png" alt="" />
              <p>
                扫码添加<br />
                <em class="on">张老师微信咨询</em>
              </p>
            </li>
          </ul>
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
import QRCode from "qrcode";
import html2canvas from "html2canvas";
import { formatSeconds } from "@utils/tools";
import { SHARE_URL } from "@config";

export default {
  name: "UserSharePoster",

  components: {},

  props: {},

  data() {
    return {
      userInfo: JSON.parse(sessionStorage.getItem("userInfo") || {}),
      studyTime: "",
      historyData: {},
      loading: true,
    };
  },

  computed: {},

  created() {
    this.queryHistoryData();
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
     * 获取用户学习历史
     */
    async queryHistoryData() {
      const { data: resData } = await this.$get("/user/gethistorydata");
      this.loading = false;
      if (!resData.data.status) return;

      this.historyData = resData.data.data;
    },
  },
};
</script>
