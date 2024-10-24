<style lang="scss" scoped>

</style>

<template>
  <section class="pay-success">
    <div class="wp pay-success-wp">
      <div class="icon">
        <img src="@assets/images/sb.png" alt="" />
      </div>
      <div class="title">很抱歉，支付失败，请您重新支付！</div>
      <div class="btn">
        <el-button @click="handleGoTo" size="medium" type="success"
          >返回到支付页面</el-button
        >
      </div>
    </div>
  </section>
</template>

<script>
import { loadStripe } from "@stripe/stripe-js";

export default {
  components: {},

  data() {
    return {};
  },

  created() {},

  methods: {
    /**
     * 跳转
     */
    async handleGoTo() {
      this.$router.push({
        name: "ACCOUNT_INDEX",
      });
    },
  },
};
</script>
