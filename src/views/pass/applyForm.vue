<style lang="scss" scoped></style>

<template>
  <section class="pass-apply-form" v-loading="loading">
    <div class="wp">
      <div class="pass-apply-form__step">
        <el-steps :active="info.step" align-center>
          <el-step title="订单信息"></el-step>
          <el-step title="电子协议"></el-step>
          <el-step title="支付方式"></el-step>
          <el-step title="填写资料"></el-step>
        </el-steps>
      </div>
      <div class="pass-apply-form__content">
        <div v-if="!loading">
          <!-- 第一步 订单信息 -->
          <OrderInfo v-if="info.step === 0" @step="handleSetps" />

          <!-- 第二步 电子协议 -->
          <ElectronicAgreement
            v-else-if="info.step === 1"
            :info="info"
            @step="handleSetps"
          />

          <!-- 第三步 支付 -->
          <Pay
            v-else-if="info.step === 2 || payStatus == 'succeed'"
            :info="info"
            @step="handleSetps"
          />

          <!-- 第四步 支付 -->
          <LicenseForm
            v-else-if="info.step === 3 || info.step === 4"
            :info="info"
            @step="handleSetps"
            @refreshInfo="queryApplyInfo"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import OrderInfo from "./components/OrderInfo.vue";
import ElectronicAgreement from "./components/ElectronicAgreement.vue";
import Pay from "./components/Pay.vue";
import LicenseForm from "./components/LicenseForm.vue";

export default {
  components: { OrderInfo, ElectronicAgreement, Pay, LicenseForm },

  data() {
    return {
      dialogVisible: false,
      loading: true,
      info: {
        step: 0,
      },
      payStatus: "",
    };
  },

  created() {
    this.queryApplyInfo();
    this.payStatus = this.$route.query.payStatus;
  },

  computed: {
    ...mapGetters(["getUserInfo"]),
  },

  mounted() {},

  methods: {
    /**
     * 跳转页面
     */
    handleGoTo() {
      this.$router.push({
        name: "ORDER_INDEX",
      });
      this.dialogVisible = false;
    },

    /**
     * 获取申请信息
     */
    async queryApplyInfo() {
      const { data: resData } = await this.$get(
        "/user/getmemberapplaylicensedetail",
        {
          params: {
            type: this.$route.query.updata == 1 ? 1 : 0,
          },
        }
      );
      this.loading = false;
      if (!resData.data.status) return;

      if (resData.data.data && resData.data.data.step > 0)
        this.info = resData.data.data;

      // this.info.step = 3; //  测试用

      // 支付成功
      // if (this.info.paytype > 0) this.info.step = 3;

      // 跳到表单详情面
      if (this.info.status == 1)
        this.$router.push({
          name: "PASS_APPLY_LICENSE_RESULT",
          query: {
            updata: this.info.type,
          },
        });
    },

    /**
     * 步骤
     */
    async handleSetps(val) {
      if (val == 1) await this.queryApplyInfo();

      this.info.step = val;

      this.payStatus = "";
    },
  },
};
</script>
