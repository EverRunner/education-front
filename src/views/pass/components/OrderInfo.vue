<style lang="scss" scope></style>

<template>
  <section class="order-info">
    <h5 class="order-info-time">
      请在2小时内完成支付，倒计时：{{ letTimes.nowTime || "01:59:59" }}
    </h5>
    <ul class="order-info-content">
      <li style="padding: 25px 0;border-bottom: 1px solid #EBEEF5;">
        <span>购买账号</span>
        <p>{{ getUserInfo.username || "-" }}</p>
      </li>
      <li>
        <span>购买內容</span>
        <p>{{ $route.query.updata == 1 ? "按摩执照更新 " : "按摩执照申请" }}</p>
      </li>
      <li>
        <span>內容价格</span>
        <em>$265.00</em>
      </li>
    </ul>
    <div class="order-info-hint">
      注意：购买后不支持退款、转让，请确认开课时间或有效期后再提交订单
    </div>
    <div class="pass-apply-form__btn">
      <el-button
        round
        @click="handleNext"
        :disabled="getUserInfo.username ? false : true"
        type="primary"
        class="el-button--big"
        style="width: 130px;"
        :loading="loading"
        >确认信息</el-button
      >
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "OrderInfo",

  props: {},

  data() {
    return { letTimes: { nowTime: "" }, loading: false };
  },

  computed: {
    ...mapGetters(["getUserInfo"]),
  },

  created() {
    this.countDown(2 * 60 * 60 - 2);
  },

  methods: {
    /**
     * 申请执照，跳转页面
     */
    async handleNext() {
      this.loading = true;
      const { data: resData } = await this.$post(
        "/user/applaylicenseformember",
        {
          type: this.$route.query.updata == 1 ? 1 : 0,
        }
      );
      setTimeout(() => {
        this.loading = false;
      }, 3000);
      if (!resData.data.status) return;

      this.$emit("step", 1);
    },

    /**
     * 倒计时
     */
    countDown(times) {
      const _this = this;

      if (this.timer) window.clearInterval(this.timer);

      this.timer = setInterval(function() {
        _this.courseOldTime = times; //已经过去的时间

        let day = 0,
          hour = 0,
          minute = 0,
          second = 0; // 时间默认值
        if (times > 0) {
          day = Math.floor(times / (60 * 60 * 24));
          hour = Math.floor(times / (60 * 60)) - day * 24;
          minute = Math.floor(times / 60) - day * 24 * 60 - hour * 60;
          second =
            Math.floor(times) -
            day * 24 * 60 * 60 -
            hour * 60 * 60 -
            minute * 60;
        } else {
          window.clearInterval(_this.timer);
        }
        if (day <= 9) day = "0" + day;
        if (hour <= 9) hour = "0" + hour;
        if (minute <= 9) minute = "0" + minute;
        if (second <= 9) second = "0" + second;

        _this.$set(
          _this.letTimes,
          "nowTime",
          `${day !== "00" ? `${day}天` : ""}${hour}:${minute}:${second}`
        );
        times--;
      }, 1000);

      if (times <= 0) {
        _this.$set(_this.letTimes, "nowTime", "");
        window.clearInterval(_this.timer);
      }
    },
  },

  /**
   * 销毁的钩子
   */
  destroyed() {
    if (this.timer) window.clearInterval(this.timer);
  },
};
</script>
