<style lang="scss" scope></style>

<template>
  <section class="footer" v-if="!isStudy">
    <el-row class="footer-wp">
      <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
        <div class="footer-logo">
          <img src="@assets/images/footer_logo.jpg" alt="" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="{ span: 11, offset: 0 }" :lg="8" :xl="8">
        <div class="footer-addr">
          <p>
            联络号码: (702) 829-7688
            <span>电子邮件: usual.rain3325@fastmail.com</span>
          </p>
          <p>地址: P.O. Box 30613 Las Vegas, NV 89173</p>
        </div>
      </el-col>
      <el-col
        :xs="24"
        :sm="12"
        :md="{ span: 11, offset: 2 }"
        :lg="{ span: 8, offset: 0 }"
        :xl="8"
      >
        <div class="footer-ewm">
          <div class="footer-ewm-text">
            <p>仍有疑问？</p>
            <p>扫码添加<em>张老师微信</em>咨询</p>
          </div>
          <img src="@assets/images/ewm.png" alt="" />
        </div>
      </el-col>
    </el-row>
    <el-row class="footer-copyright">
      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
        <span>©Copyright 2022｜Weilin Chang LLC</span>
        <!-- <span>©Copyright 2022｜易北教育版权所有</span> -->
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
        <div class="footer-copyright-qita">
          <span @click="handleGoto('ARTICLE_DETAILS', 5)"
            >易北教育服务条款・</span
          >
          <span @click="handleGoto('ARTICLE_DETAILS', 4)"
            >易北教育隐私政策</span
          >
        </div>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import { STUDY_ROUTER_LIST } from "@config";

export default {
  name: "YbFooter",
  data() {
    return {
      isStudy: false,
      STUDY_ROUTER_LIST, // 学习路由列表
    };
  },

  created() {
    this.isStudyNav(this.$route.path);
  },

  watch: {
    // 深度监听路由变化
    $route: {
      handler: function(route, oldRoute) {
        this.isStudyNav(route.path);
      },
      deep: true,
    },
  },

  methods: {
    /**
     * 处理下拉菜单事件
     */
    async handleCommand(command) {
      switch (command) {
        //退出登录
        case "loginOut":
          this.$confirm("是否确认退出登录？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "error",
          })
            .then(async () => {
              const { data: resData } = await loginOut();

              this.$router.push({
                name: "LOGIN",
              });
            })
            .catch(() => {});
          break;

        //密码修改
        case "passwordEdit":
          this.$router.push({
            name: "SYSTEM_ADMIN_PASSWORD",
          });
          break;
      }
    },

    /**
     * 显示对应导航栏
     */
    isStudyNav(path) {
      if (STUDY_ROUTER_LIST.includes(path)) {
        this.isStudy = true;
      } else {
        this.isStudy = false;
      }
    },

    /**
     *跳转
     */
    handleGoto(name, id) {
      this.$router.push({
        name,
        query: {
          id,
        },
      });
    },
  },
};
</script>
