<style lang="scss" scoped>
.pass-apply-form {
  background: #fff;
  .page-header {
    position: relative;
    p {
      text-align: center;
      font-weight: 500;
      font-size: 24px;
      line-height: 36px;
      color: #303133;
    }
    .back {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      font-weight: 500;
      font-size: 20px;
      line-height: 30px;
      color: #303133;
      border-right: 1px solid #dcdfe6;
      padding-right: 20px;
      line-height: 1;
      i {
        margin-right: 8px;
        color: #606266;
      }
    }
    &-title {
      font-weight: 500;
      font-size: 18px;
      line-height: 26px;
      padding-bottom: 25px;
      text-align: center;
    }
    &-text {
      font-weight: 400;
      font-size: 16px;
      line-height: 1.65;
      padding: 30px 0;
      text-align: center;
      width: 620px;
      max-width: 96%;
      margin: auto;
    }
  }
}
</style>

<template>
  <section class="pass-apply-form" v-loading="loading">
    <div class="wp">
      <div class="page-header">
        <span class="back" @click="handleGoTo"
          ><i class="el-icon-arrow-left"></i>返回</span
        >
        <p>申请执照</p>
      </div>
      <p class="page-header-text">
        恭喜您，您已成功提交所需资料！如果需要补充或者资料有问题，张老师会微信联系您！接下来请耐心等待！
      </p>
    </div>

    <div class="wp">
      <div class="pass-apply-form__content">
        <h5 class="page-header-title">按摩执照资料快照 {{ info.username }}</h5>
        <LicenseForm v-if="info.username" :info="info" :isAll="true" />
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import LicenseForm from "./components/LicenseForm.vue";

export default {
  components: { LicenseForm },

  data() {
    return {
      loading: true,
      info: {
        step: 0,
      },
    };
  },

  created() {
    this.queryApplyInfo();
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
        name: "ACCOUNT",
      });
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

      if (this.info.status === 0)
        this.$router.push({
          name: "PASS_APPLY_FORM",
          query: {
            type: this.$route.query.updata == 1 ? 1 : 0,
          },
        });
    },

    /**
     * 步骤
     */
    async handleSetps(val) {
      if (val == 1) await this.queryApplyInfo();

      this.info.step = val;
    },
  },
};
</script>
