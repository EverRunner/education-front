<style lang="scss" scoped></style>

<template>
  <section class="personage layout">
    <el-row>
      <el-col :xs="0" :sm="4" :md="4" :lg="4" :xl="4">
        <left-nav />
      </el-col>
      <el-col :xs="24" :sm="20" :md="20" :lg="20" :xl="20">
        <div class="personage-datum">
          <div class="personage-datum-title">
            <h1>{{ $route.meta && $route.meta.title }}</h1>
            <el-button
              class="el-button--big"
              @click="handleGoTo('ACCOUNT_RESOURCE')"
              type="primary"
              round
              >变更</el-button
            >
          </div>
          <ul class="personage-info">
            <li>
              <span><i>*</i>姓名</span>
              <p :class="{ null: !userInfo.username }">
                {{ userInfo.username || "无" }}
              </p>
            </li>
            <li>
              <span>性别</span>
              <p :class="{ null: !userInfo.sex }">
                {{ userInfo.sex == 1 ? "男性" : "女性" }}
              </p>
            </li>
            <li>
              <span>生日</span>
              <p :class="{ null: !userInfo.birthdayyear }">
                <template v-if="userInfo.birthdayyear">{{
                  userInfo.birthdayyear | formatDate("YYYY-MM-DD")
                }}</template>
                <template v-else>无</template>
              </p>
            </li>
            <li>
              <span>邮编</span>
              <p :class="{ null: !userInfo.youbian }">
                {{ userInfo.youbian || "无" }}
              </p>
            </li>
            <li>
              <span>地址</span>
              <p :class="{ null: !userInfo.address }">
                {{ userInfo.address || "无" }}
              </p>
            </li>
          </ul>
        </div>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import LeftNav from "./components/LeftNav.vue";

export default {
  components: {
    LeftNav,
  },

  data() {
    return {
      userInfo: JSON.parse(sessionStorage.getItem("userInfo") || {}),
    };
  },

  created() {
    this.queryUserInfo();
  },

  mounted() {},

  methods: {
    /**
     * 获取当前登录用户信息
     */
    async queryUserInfo() {
      const { data: resData } = await this.$get("/user/getloginuserinfo");
      if (!resData.data.status) return;

      sessionStorage.setItem("userInfo", JSON.stringify(resData.data.userInfo));
    },

    /**
     * 跳转
     */
    handleGoTo(name) {
      if (this.$route.name === name) return;

      this.$router.push({
        name,
      });
    },
  },
};
</script>
