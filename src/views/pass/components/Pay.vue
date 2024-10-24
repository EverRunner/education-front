<style lang="scss" scope></style>

<template>
  <section>
    <!-- 支付结果 -->
    <div class="pass-pay-result" v-if="$route.query.payStatus == 'succeed'">
      <div class="content">
        <img class="icon" src="@assets/images/pass-pay-icon.png" alt="" />
        <h5 class="hidden-sm-and-down">
          恭喜您成功购买我们的执照申请服务！<br />
          接下来，您只需要按要求填写资料就可以啦！
        </h5>
        <h5 class="hidden-md-and-up">
          恭喜您成功购买我们的执照申请服务！接下来，您只需要按要求填写资料就可以啦！
        </h5>
        <p>如果您还有其他疑问，可以微信咨询张老师！</p>
        <img class="ewm" src="@assets/images/ewm.png" alt="" />
      </div>
      <div class="pass-apply-form__btn">
        <el-button
          round
          @click="handleGoto"
          :disabled="getUserInfo.username ? false : true"
          plain
          class="el-button--big"
          style="width: 130px;"
          >稍后填写</el-button
        >
        <el-button
          round
          @click="handleNext"
          :disabled="getUserInfo.username ? false : true"
          type="primary"
          class="el-button--big"
          style="width: 130px;"
          >立即填写</el-button
        >
      </div>
    </div>

    <!-- 主要内容 -->
    <div class="pass-pay" v-else>
      <h5 class="pass-pay-title">选择支付方式</h5>
      <el-radio-group v-model="payType" class="pass-pay-content">
        <el-row :gutter="24">
          <el-col :xs="24" :sm="12" :md="12" :lg="12">
            <div
              class="item"
              :class="{ on: payType == 'card' }"
              @click="handleClick('card')"
            >
              <el-radio label="card">银行卡支付</el-radio>
              <img src="@assets/images/pass-pay-yh.png" alt="" />
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12">
            <div
              class="item"
              :class="{ on: payType == 'wx' }"
              @click="handleClick('wx')"
            >
              <el-radio label="wx">微信支付</el-radio>
              <img src="@assets/images/pass-pay-wx.png" alt="" />
            </div>
          </el-col>
        </el-row>
      </el-radio-group>

      <div class="pass-apply-form__btn">
        <el-button
          round
          @click="handlePay"
          type="primary"
          class="el-button--big"
          style="width: 120px;"
          :loading="loading"
          >下一步</el-button
        >
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import { loadStripe } from "@stripe/stripe-js";
import { PAY_KEY } from "@config";

export default {
  name: "OrderInfo",

  props: {
    info: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },

  data() {
    return { payType: "card", loading: false };
  },

  computed: {
    ...mapGetters(["getUserInfo"]),
  },

  created() {},

  methods: {
    /**
     * 支付，跳转页面
     */
    async handlePay() {
      this.loading = true;
      const { data: resData } = await this.$post("/user/createlicensepay", {
        applayid: this.info.id,
      });
      this.loading = false;
      if (!resData.data.status) return;

      this.loading = true;
      const stripe = await loadStripe(PAY_KEY);

      this.$message({
        showClose: false,
        type: "success",
        duration: 30 * 1000,
        dangerouslyUseHTMLString: true,
        message:
          "<span>请等待，支付面页跳转中...<span> <i class='el-icon-loading'></i> ",
      });

      stripe.redirectToCheckout({
        sessionId: resData.data.paysessionid,
      });
      this.loading = false;
    },

    /**
     * 下一步
     */
    handleNext() {
      this.$emit("step", 3);
    },

    /**
     * 跳转
     */
    handleGoto() {
      this.$router.push({
        name: "ACCOUNT",
      });
    },

    /**
     * 支付方式
     */
    handleClick(type) {
      this.payType = type;
    },
  },
};
</script>
