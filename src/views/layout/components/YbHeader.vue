<style lang="scss" scope>
@import "../../../theme/color.scss";

.button-border--blue {
  border-color: $--color-primary !important;
  color: $--color-primary !important;
}
</style>

<template>
  <section>
    <!-- 网站通用头部 -->
    <div class="header" v-if="!isStudy">
      <div class="header-content">
        <img
          class="header-content-logo"
          @click="handleGoTo('HOME')"
          src="@assets/images/header_logo.jpg"
          alt=""
        />

        <!-- pc菜单 -->
        <ul class="header-content-nav hidden-sm-and-down">
          <li
            v-if="getUserInfo && getUserInfo.id"
            :class="{ on: $route.name == 'HOME_INDEX' }"
            @click="handleGoTo('HOME_INDEX')"
          >
            主页
          </li>
          <li
            v-if="getUserInfo.level > 0"
            @click="handleGoTo('ACCOUNT_INDEX')"
            :class="{ on: $route.name == 'ACCOUNT_INDEX' }"
          >
            我的课程
          </li>
          <li
            v-else-if="getUserInfo.id"
            @click="handleGoTo('COURSE_DETAILS')"
            :class="{ on: $route.name == 'COURSE_DETAILS' }"
          >
            联邦辅导课程
          </li>
        </ul>

        <!-- pc菜单按钮 -->
        <div
          class="header-content-btn hidden-sm-and-down"
          v-if="getUserInfo && getUserInfo.id"
        >
          <img v-if="getUserInfo.avatar" :src="getUserInfo.avatar" alt="" />
          <img v-else src="@/assets/images/head_menu_avatar.svg" alt="" />
          <el-dropdown trigger="click" class="header-content-dropdown">
            <span class="link">
              <em>{{ getUserInfo.username || "用户名" }}</em
              ><i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu class="header-content-menu">
              <ul>
                <li
                  @click="handleGoTo('ACCOUNT_SET')"
                  :class="{ on: $route.name == 'ACCOUNT_SET' }"
                >
                  <el-dropdown-item>帐号设置</el-dropdown-item>
                </li>
                <li
                  @click="handleGoTo('ACCOUNT_INFO')"
                  class=" border"
                  :class="{ on: $route.name == 'ACCOUNT_INFO' }"
                >
                  <el-dropdown-item>个人资料</el-dropdown-item>
                </li>
                <li
                  @click="handleGoTo('ACCOUNT_BUY')"
                  :class="{ on: $route.name == 'ACCOUNT_BUY' }"
                >
                  <el-dropdown-item>
                    {{ getUserInfo.level > 0 ? "我的购买" : "课程购买" }}
                  </el-dropdown-item>
                </li>
                <li
                  @click="handleGoTo('ACCOUNT_RECOMMEND')"
                  class="border"
                  :class="{ on: $route.name == 'ACCOUNT_RECOMMEND' }"
                >
                  <el-dropdown-item>推荐朋友</el-dropdown-item>
                </li>
                <li @click="handleOutLogin">
                  <el-dropdown-item>退出登录</el-dropdown-item>
                </li>
              </ul>
            </el-dropdown-menu>
          </el-dropdown>
        </div>

        <!-- 登录、注册  -->
        <div
          class="header-content-login"
          v-if="!getUserInfo || !getUserInfo.id"
        >
          <el-button
            @click="handleGoTo('LOGIN')"
            class="el-button--big button-border--blue"
            round
            >登入</el-button
          >
          <el-button
            @click="handleGoTo('REGISTERED')"
            type="primary"
            class="el-button--big"
            round
            >注册</el-button
          >
        </div>

        <!-- 手机菜单按钮 -->
        <div
          v-if="getUserInfo && getUserInfo.id"
          class="header-content-phone--btn hidden-md-and-up"
          @click="drawer = true"
        >
          <img src="@/assets/images/head_menu_icon.svg" alt="" />菜单
        </div>
      </div>

      <!-- 手机菜单栏 -->
      <el-drawer
        v-if="getUserInfo && getUserInfo.id"
        title="菜单"
        :visible.sync="drawer"
        direction="rtl"
        :before-close="handleClose"
        :modal-append-to-body="false"
        size="80%"
        class="header-content-phone--drawer hidden-md-and-up"
      >
        <ul class="header-content-phone--menu">
          <li @click="handleGoTo('HOME_INDEX')">主页</li>
          <li @click="handleGoTo('ACCOUNT_INDEX')">我的课程</li>
          <li>
            <el-collapse
              class="header-content-phone--collapse"
              v-model="activeNames"
            >
              <el-collapse-item
                :title="getUserInfo.username || '用户名'"
                name="1"
              >
                <dl>
                  <dd
                    @click="handleGoTo('ACCOUNT_SET')"
                    :class="{ on: $route.name == 'ACCOUNT_SET' }"
                  >
                    帐号设置
                  </dd>
                  <dd
                    @click="handleGoTo('ACCOUNT_INFO')"
                    class="border"
                    :class="{ on: $route.name == 'ACCOUNT_INFO' }"
                  >
                    个人资料
                  </dd>
                  <dd
                    @click="handleGoTo('ACCOUNT_BUY')"
                    class="top"
                    :class="{ on: $route.name == 'ACCOUNT_BUY' }"
                  >
                    {{ getUserInfo.level > 0 ? "我的购买" : "课程购买" }}
                  </dd>
                  <dd
                    @click="handleGoTo('ACCOUNT_RECOMMEND')"
                    class="border"
                    :class="{ on: $route.name == 'ACCOUNT_RECOMMEND' }"
                  >
                    推荐朋友
                  </dd>
                  <dd class="top" @click="handleOutLogin">退出登录</dd>
                </dl>
              </el-collapse-item>
            </el-collapse>
          </li>
        </ul>
      </el-drawer>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import { STUDY_ROUTER_LIST } from "@config";

export default {
  name: "YbHeader",
  data() {
    return {
      routes: [],
      defaultActive: "",

      info: {},

      noticeUnread: 0,

      drawer: false, // 手机菜单栏
      activeNames: ["1"],

      isStudy: false,
      STUDY_ROUTER_LIST, // 学习路由列表
    };
  },

  computed: {
    ...mapGetters(["getUserInfo"]),
  },

  created() {
    this.isStudyNav(this.$route.path);

    if (sessionStorage.getItem("token")) {
      this.actionsUserInfo();
      this.queryNoticeUnread();
    } else if (sessionStorage.getItem("userInfo")) {
      this.setUserInfo(JSON.parse(sessionStorage.getItem("userInfo")));
    }
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
    ...mapMutations(["setUserInfo"]),
    ...mapActions(["actionsUserInfo"]),

    /**
     * 手机菜单栏 关闭
     */
    handleClose() {
      this.drawer = false;
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
     * 获取前端所有路由
     */
    getFrontRouter() {
      this.$router.options.routes.forEach((item) => {
        let route = [];

        if (item.meta.isNav) {
          route.push(item);

          item.children.forEach((son) => {
            if (!route.children) route.children = [];
            route.children.push(son);
          });

          this.routes.push(route);
        }
      });
    },

    /**
     * 获取站内信未读的
     */
    async queryNoticeUnread() {
      this.loading = true;

      const { data: resData } = await this.$get("/user/getmynoticeunread");

      if (!resData.data.status) return;

      if (resData.data.data.count > 9) this.noticeUnread = "9+";
      else this.noticeUnread = resData.data.data.count;
    },

    /**
     * 退出登录
     */
    handleOutLogin() {
      this.$confirm("是否退出登录？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          //登出
          await this.$get("/user/loginout", {
            headers: {
              isLoading: true,
            },
          });

          this.$router.push({
            name: "LOGIN",
          });

          sessionStorage.clear();

          this.$message({
            type: "success",
            message: "已成功退出登录!",
          });
        })
        .catch(() => {});
    },

    /**
     * 规则显示/隐藏
     */
    handleGuide() {
      this.$store.commit("setGuideShow", !this.$store.getters.getGuideShow);
    },

    /**
     * 菜单单击
     */
    handleCommand(command) {
      if (command == "outLogin") this.handleOutLogin();
      else this.handleGuide();
    },

    /**
     * 跳转到站内信
     */
    handleGoToLetter() {
      this.$router.push({
        name: "ACCOUNT_LETTER",
      });
    },

    /**
     * 处理跳转
     */
    handleGoTo(name) {
      this.showMenu = false;
      this.drawer = false;

      if (name == this.$route.name) return;

      this.$router.push({
        name,
      });
    },
  },
};
</script>
