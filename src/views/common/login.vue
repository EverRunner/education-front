<style lang="scss" scope></style>

<template>
  <section class="login" v-loading="isLoginLoading">
    <el-row>
      <Sketch />

      <el-col :xs="24" :sm="24" :md="13" :lg="12" :xl="12">
        <!-- 登录，第一步-帐号选择 -->
        <div class="login-content" v-if="nowStep == 'account'">
          <div class="login-content-title">
            <img src="@/assets/images/login_logo.png" alt="" />
          </div>
          <div class="login-content-register">
            <span>还没有帐号？</span>
            <el-button @click="handleGoTo('REGISTERED')" class="el-button--big"
              >注册</el-button
            >
          </div>
          <div class="login-content-form">
            <h2>登录易北教育</h2>
            <ThirdLogin name="登录" :lat="params.lat" :lng="params.lng" />
            <div class="or"><span>或是</span></div>
            <el-input
              class="el-input--big"
              placeholder="输入手机号 / 邮箱号"
              v-model="params.account"
              clearable
            >
            </el-input>
            <div class="next">
              <el-button
                :loading="isLoading"
                @click="handleNext"
                style="width: 100%;"
                type="primary"
                class="el-button--big"
                >下一步</el-button
              >
            </div>
          </div>
        </div>

        <!-- 登录，第二步-输入密码  -->
        <div class="login-content" v-if="nowStep == 'password'">
          <div class="login-content-title">
            <img src="@/assets/images/login_logo.png" alt="" />
          </div>
          <div class="login-content-register">
            <span>忘记密码？</span>
            <el-button
              @click="
                handleGoTo('FORGETPASSWORD', {
                  account: params.account,
                })
              "
              class="el-button--big"
              >找回密码</el-button
            >
          </div>
          <div class="login-content-form login-content-password">
            <div class="title">
              <span @click="handleBack('account')"
                ><i class="el-icon-arrow-left "></i>返回</span
              >
              <h3>欢迎回来</h3>
            </div>
            <div class="form">
              <el-input
                class="el-input--big"
                placeholder="手机号 / 邮箱号"
                v-model="params.account"
                disabled
              >
              </el-input>
              <el-input
                class="el-input--big"
                placeholder="输入您的密码"
                v-model="params.password"
                :type="isPassword ? 'password' : 'text'"
              >
                <i
                  class="el-icon-view el-input__icon"
                  slot="suffix"
                  @click="isPassword = !isPassword"
                >
                </i>
              </el-input>
            </div>
            <el-checkbox
              class="el-checkbox--big"
              v-model="params.isSavePassword"
              >记住帐号密码</el-checkbox
            >
            <div class="next">
              <el-button
                :loading="isLoading"
                @click="handleLogin"
                style="width: 100%;"
                type="primary"
                class="el-button--big"
                >登 入</el-button
              >
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import Sketch from "./components/Sketch.vue";
import ThirdLogin from "./components/ThirdLogin.vue";
import { getBrowseCategory } from "@utils/tools";
import { getLocation } from "@utils/tools";
import { setTokenExpirationTime } from "@utils/tools";

export default {
  components: { Sketch, ThirdLogin },

  data() {
    return {
      nowStep: "account", // account、password
      isLoading: false,

      activeName: "phone",
      params: {
        account: "",
        password: "",
        code: "",
        isSavePassword: false,
        lat: 0,
        lng: 0,
        address: "",
      },
      imgcode: "",
      isPassword: true,

      redirect: "",

      loginInfo: JSON.parse(localStorage.getItem("loginInfo")) || {},

      dialogVisible: true,

      isLoginLoading: false,
    };
  },

  async created() {
    if (this.$route.query.token) this.isLoginLoading = true;

    //获取-记住密码、帐号
    if (this.loginInfo && this.loginInfo.isSavePassword)
      this.params = this.loginInfo;

    if (this.$route.params.past == 1) {
      this.$alert(
        "1.您登录过期了！</br>2.易北教育课程仅限个人使用，课程内容受到保护！我们的系统侦测到多人同时登入或分享，您的账户将被取消，课程终止！",
        "HTML 片段",
        {
          dangerouslyUseHTMLString: true,
          title: "登出提示",
        }
      );
      // this.$router.push({
      //   name: "OUTLOGIN",
      // });
      // this.$message.error("登录过期，请重新登录！");
    }

    // 获取定位
    const coords = await getLocation();
    if (coords && coords.latitude) {
      this.params.lat = coords.latitude;
      this.params.lng = coords.longitude;
    }
  },

  methods: {
    ...mapMutations(["setUserInfo"]),

    /**
     * 处理下一步
     */
    async handleNext() {
      if (!this.params.account)
        return this.$message.error("请输入手机号或邮箱号！");

      this.isLoading = true;

      const { data: resData } = await this.$post("/validateisaccount", {
        account: this.params.account,
      });

      this.isLoading = false;
      if (!resData.data.status) {
        this.$confirm("您输入的帐号不存在。", "提示", {
          customClass: "el-message-box--big",
          confirmButtonText: "注册新帐号",
          cancelButtonText: "再试试",
          type: "error",
        }).then(() => {
          this.handleGoTo("REGISTERED", {
            account: this.params.account,
          });
        });
        return;
      }

      this.nowStep = "password";
    },

    /**
     * 登录
     */
    async handleLogin() {
      if (!this.params.password) return this.$message.error("请输入密码！");

      // 跳转的连接
      if (this.$route.query.redirect)
        this.redirect = this.$route.query.redirect;

      // 加载状态
      this.isLoading = true;

      //登录设备
      this.params.devicecate = getBrowseCategory();

      //刷新图片验证码
      await this.queryImgCode();

      const { data: resData } = await this.$post("/userlogin", this.params);
      this.isLoading = false;
      //错误返回
      if (!resData.data.status) return;

      this.$message.success("您已成功登录。");

      // this.$confirm("您已成功登录。", "提示", {
      //   customClass: "el-message-box--big",
      //   confirmButtonText: "自动跳转页面中...",
      //   showCancelButton: false,
      //   showClose: false,
      //   dangerouslyUseHTMLString: true,
      //   type: "success",
      //   beforeClose: (action, instance, done) => {},
      // });

      // 帐号禁用
      // if (resData.data.userInfo.status == 0) {
      //   sessionStorage.clear();
      //   return this.$message.error("当前帐号已被禁用！");
      // }

      sessionStorage.setItem("token", resData.data.token);
      sessionStorage.setItem("userInfo", JSON.stringify(resData.data.userInfo));
      setTokenExpirationTime({
        hour: 18,
      });

      // 记住密码
      if (this.params.isSavePassword) {
        delete this.params.code;
        localStorage.setItem("loginInfo", JSON.stringify(this.params));
      } else localStorage.setItem("loginInfo", null);

      // 必须是会员，分类是 6：在学生、10：管理员、22：考试学员、2：考过生
      if (
        resData.data.userInfo.level > 0 &&
        (resData.data.userInfo.category == 6 ||
          resData.data.userInfo.category == 10 ||
          resData.data.userInfo.category == 2 ||
          resData.data.userInfo.category == 22)
      ) {
        this.$router.push({
          // path: this.redirect || "/account",
          path: "/account",
        });
      } else {
        this.$router.push({
          // path: this.redirect || "/course/details",
          path: "/course/details",
        });
      }
    },

    /**
     * 获取图形验证码
     */
    async queryImgCode() {
      const { data: resData } = await this.$get("/getvalidatecode");

      if (!resData.data.status) return;

      this.imgcode = resData.data.img;

      this.params.code = resData.data.v;
    },

    /**
     * 返回
     */
    handleBack(step) {
      this.nowStep = step;
      this.isLoading = false;
    },

    /**
     * 跳转页面
     */
    handleGoTo(name, query = {}) {
      this.$router.push({
        name,
        query,
      });
    },
  },
};
</script>
