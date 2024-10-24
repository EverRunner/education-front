<style lang="scss" scoped></style>

<template>
  <section>
    <!-- 考过生分享 -->
    <UserSharePass v-if="isPass" />

    <!-- 在学生分享 -->
    <UserSharePoster :userRadarData="userRadarData" v-else />
  </section>
</template>

<script>
import UserSharePass from "./components/UserSharePass.vue";
import UserSharePoster from "./components/UserSharePoster.vue";

export default {
  components: {
    UserSharePass,
    UserSharePoster,
  },

  props: {
    userRadarData: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },

  data() {
    return {
      isPass: false,
    };
  },

  created() {
    if (this.$route.query.isPass) this.isPass = true;
  },

  computed: {},

  mounted() {},

  methods: {
    /**
     * 获取购买记录
     */
    async queryPayList() {
      const { data: resData } = await this.$get("/user/getmyorderpagelist", {
        params: {
          pageindex: 1,
          pagesize: 100,
          status: 1,
        },
      });
      this.loading = false;
      if (!resData.data.status) return;

      this.payList = resData.data.data.rows;
    },

    /**
     * 跳转页面
     */
    handleGoTo(type) {
      if (type == "pay")
        this.$router.push({
          name: "ORDER_INDEX",
        });
    },
  },
};
</script>
