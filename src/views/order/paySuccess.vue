<style lang="scss" scoped></style>

<template>
  <section class="pay-success" v-loading="loading">
    <div class="wp pay-success-wp">
      <div class="icon">
        <img src="@assets/images/cg.png" alt="" />
      </div>
      <div class="title" v-if="userInfo.address">
        欢迎您加入易北社区，马上开始学习吧！
      </div>
      <div class="title" v-else>
        恭喜您成功购买了易北联邦辅导课程！<br />在正式开始学习之前，请先完善您的个人信息，方便我们为您提供更好的服务！
      </div>

      <div class="btn">
        <el-button
          v-if="userInfo.address"
          @click="handleGoTo('ACCOUNT_INDEX')"
          size="medium"
          type="success"
          >跳转到，我的主页</el-button
        >
        <el-button
          v-else
          @click="handleGoTo('ACCOUNT_RESOURCE')"
          size="medium"
          type="success"
          >跳转到，完善个人资料</el-button
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
    return {
      userInfo: {},
      loading: false,
    };
  },

  created() {
    this.queryUserInfo();
  },

  methods: {
    /**
     * 跳转
     */
    async handleGoTo(name) {
      this.$router.push({
        name,
      });
    },

    /**
     * 获取用户信息
     */
    async queryUserInfo(tab, event) {
      this.loading = true;

      const { data: resData } = await this.$get("/user/getloginuserinfo");

      this.loading = false;

      if (!resData.data.status) return;

      this.userInfo = resData.data.userInfo;

      sessionStorage.setItem("userInfo", JSON.stringify(resData.data.userInfo));
    },
  },
};
</script>
