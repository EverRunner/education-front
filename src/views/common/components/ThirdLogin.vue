<style lang="scss" scope>
.third {
  position: relative;
  overflow: hidden;
  &-dialog {
    text-align: center;
    h3 {
      font-size: 22px;
      color: #303133;
      font-weight: 500;
      padding-bottom: 20px;
    }
    h6 {
      font-size: 16px;
      color: #303133;
      padding-top: 12px;
      font-weight: 500;
    }
    h1 {
      font-size: 36px;
      color: #303133;
      padding: 30px 0 25px;
      font-weight: 500;
    }
    &-qita {
      padding: 50px 0;
      font-size: 14px;
      color: #303133;
      em {
        border-bottom: 1px solid #303133;
        padding: 1px;
      }
    }
  }

  #google-login-button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    opacity: 0;
  }
  .google-signin-button {
    cursor: default;
  }
}
</style>

<template>
  <div>
    <div class="third">
      <el-button
        @click="handleWxLogin"
        class="el-button--big"
        :loading="loading"
      >
        <img src="@/assets/images/login_wx.png" alt="" />使用微信{{
          name
        }}</el-button
      >
    </div>
    <div class="third">
      <el-button class="el-button--big google-signin-button" :loading="loading">
        <img src="@/assets/images/login_google.png" alt="" />使用谷歌{{
          name
        }}</el-button
      >
      <div id="google-login-button"></div>
    </div>

    <!-- 手机微信弹框 -->
    <el-dialog
      :visible.sync="dialogVisible"
      top="11vh"
      append-to-body
      :close-on-click-modal="false"
      width="90%"
    >
      <div class="third-dialog">
        <h3>抱歉！当前浏览器不支持微信登入</h3>
        <h6>1. 在手机微信中打开链接登入</h6>
        <h6>2. 您可以通过电脑、平板设备登入</h6>
        <h6>3. 通过备用帐号登入</h6>
        <h1>备用帐号登入</h1>
        <div>
          <el-input
            class="el-input--big"
            placeholder="输入真实姓名"
            v-model="params.account"
          >
          </el-input>
          <el-input
            style="margin-top: 12px;"
            class="el-input--big"
            placeholder="输入手机号"
            v-model="params.password"
            type="password"
          >
          </el-input>
          <el-button
            :loading="isLoading"
            @click="handleLogin"
            style="width: 100%; margin-top: 20px;"
            type="primary"
            class="el-button--big"
            >登 入</el-button
          >
        </div>
        <p class="third-dialog-qita">
          没有备用帐号？请<em @click="dialogVisible = false">选择其他方式</em
          >登入
        </p>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import jsonwebtoken from "jsonwebtoken";
import { EXTERNAL_LOGIN } from "@config";
import { getBrowseCategory } from "@utils/tools";
import { isWeiXin } from "@utils/tools";
import { mapActions } from "vuex";
import { setTokenExpirationTime } from "@utils/tools";

export default {
  name: "ThirdLogin",

  props: {
    name: {
      type: String,
      default: "登录",
    },

    lat: {
      type: Number | String,
      default: 0,
    },

    lng: {
      type: Number | String,
      default: 0,
    },
  },

  data() {
    return {
      googleClientId:
        "622594925353-ljrgdl2kkg940r4h1hqkg0sdv7k9mf6q.apps.googleusercontent.com", // 谷歌客户端ID
      loading: false,
      dialogVisible: false,

      params: {
        account: "",
        password: "",
        code: "",
        isSavePassword: false,
        address: "",
        devicecate: 0,
      },
      imgcode: "",
      isLoading: false,

      channel: localStorage.getItem("registeredChannel") || "", // 注册渠道
      recommendCode: localStorage.getItem("recommendCode") || "", // 分销码
    };
  },

  async created() {
    // 登录设备设备类型 1：电脑  2：手机 3：平板
    this.params.devicecate = getBrowseCategory();

    if (this.$route.query.token && this.$route.query.type == "wx") {
      // 跳转
      this.handleGoTo(
        this.$route.query.token,
        this.$route.query.level,
        this.$route.query.category
      );
    }
  },

  mounted() {
    const script = document.createElement("script");

    if (!window.google) {
      script.src = "https://accounts.google.com/gsi/client"; // 加载客户端库
      script.async = true;
      script.onload = () => this.initializeGoogleSignIn(this.googleClientId);
      document.head.appendChild(script);
    } else {
      this.initializeGoogleSignIn(this.googleClientId);
    }
  },

  methods: {
    ...mapActions(["actionsUserInfo"]),

    /**
     * Google登录 回调
     */
    async handleGoogleSignIn(response) {
      try {
        this.loading = true;
        const { data: resData } = await this.$post("/gglogin", {
          ...response,
          channel: this.channel,
          tuijiancode: this.recommendCode,
        });
        this.loading = false;

        if (!resData.data.status) return;

        if (resData.data.userInfo)
          sessionStorage.setItem(
            "userInfo",
            JSON.stringify(resData.data.userInfo)
          );

        // 跳转
        this.handleGoTo(
          resData.data.token,
          resData.data.userInfo?.level,
          resData.data.userInfo?.category
        );
      } catch (error) {
        this.loading = false;

        this.$confirm("谷歌登录出错，请稍后重试！", "提示", {
          customClass: "el-message-box--big",
          confirmButtonText: "稍后重试",
          showCancelButton: false,
          type: "error",
        });
      }
    },

    /**
     * 处理Google登录取消
     */
    handleGoogleSignInCancel() {
      // 处理Google登录取消
      console.log("Google登录被取消");
    },

    initializeGoogleSignIn(client_id) {
      window.google.accounts.id.initialize({
        client_id,
        cancel_on_tap_outside: true, // 控制是否在提示之外进行点击时取消提示(关闭一键登录弹窗)，默认true
        auto_select: false, // 开启自动登录功能，默认false
        callback: this.handleGoogleSignIn, // 验证成功回调
        cancel: this.handleGoogleSignInCancel,
      });
      // 渲染“使用 Google 帐号登录”按钮
      window.google.accounts.id.renderButton(
        document.getElementById("google-login-button"),
        {
          theme: "outline",
          size: "large",
          text: "login_with",
          shape: "rectangular",
          width: 400,
          locale: "zh_CN",
        }
      );
      // 启用一键登录提示(弹窗)功能
      window.google.accounts.id.prompt();
    },

    /**
     * 谷歌登录成功
     */
    async OnGoogleAuthSuccess(idToken) {
      // const googleLogin = jsonwebtoken.decode(idToken); // 解析idToken
      // try {
      //   const { data: resData } = await this.$post("/gglogin", {
      //     openid: googleLogin.sub,
      //     username: googleLogin.name,
      //     email: googleLogin.email,
      //     avatar: googleLogin.picture,
      //     channel: this.channel,
      //     tuijiancode: this.recommendCode,
      //   });
      //   this.loading = false;
      //   if (!resData.data.status) return;
      //   if (resData.data.userInfo)
      //     sessionStorage.setItem(
      //       "userInfo",
      //       JSON.stringify(resData.data.userInfo)
      //     );
      //   // 跳转
      //   this.handleGoTo(
      //     resData.data.token,
      //     resData.data.userInfo?.level,
      //     resData.data.userInfo?.category
      //   );
      // } catch (error) {
      //   this.loading = false;
      //   this.$confirm("谷歌登录出错，请稍后重试！", "提示", {
      //     customClass: "el-message-box--big",
      //     confirmButtonText: "稍后重试",
      //     showCancelButton: false,
      //     type: "error",
      //   });
      // }
    },

    /**
     * 谷歌登录报错
     */
    OnGoogleAuthFail(res) {
      this.loading = false;

      // this.$confirm(`谷歌登录出错：${res.error}，请稍后重试！`, "提示", {
      //   customClass: "el-message-box--big",
      //   confirmButtonText: "稍后重试",
      //   showCancelButton: false,
      //   type: "error",
      // });
    },

    /**
     * 第三方-微信登录
     */
    async handleWxLogin() {
      // console.log("微信登录", this.lat, this.lng);

      // 微信浏览器中
      if (isWeiXin()) {
        window.location.href = `${EXTERNAL_LOGIN}authorize?devicecate=${this.params.devicecate}&lat=${this.lat}&lng=${this.lng}&channel=${this.channel}&tuijiancode=${this.recommendCode}`;
        return;
      }

      // 是否为手机
      if (this.params.devicecate == 2) {
        this.dialogVisible = true;
      } else {
        this.loading = true;
        window.location.href = `${EXTERNAL_LOGIN}open/pc/authorize/wxredirect?devicecate=${this.params.devicecate}&lat=${this.lat}&lng=${this.lng}&channel=${this.channel}&tuijiancode=${this.recommendCode}`;
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
     * 登录
     */
    async handleLogin() {
      if (!this.params.password) return this.$message.error("请输入密码！");

      // 跳转的连接
      if (this.$route.query.redirect)
        this.redirect = this.$route.query.redirect;

      // 加载状态
      this.isLoading = true;

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
      setTokenExpirationTime({
        hour: 18,
      });
      sessionStorage.setItem("userInfo", JSON.stringify(resData.data.userInfo));
      this.actionsUserInfo();

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
     * 获取当前登录用户信息
     */
    async queryUserInfo() {
      const { data: resData } = await this.$get("/user/getloginuserinfo", {
        headers: {
          isLoading: true,
        },
      });

      if (!resData.data.status) return;
      sessionStorage.setItem("userInfo", JSON.stringify(resData.data.userInfo));
      this.actionsUserInfo();
    },

    /**
     * 跳转页面
     */
    async handleGoTo(token, level, category) {
      // 设置token
      sessionStorage.setItem("token", token);
      setTokenExpirationTime({
        hour: 18,
      });

      await this.queryUserInfo();

      // 必须是会员，分类是 在学生、管理员
      if (level > 0 && (category == 6 || category == 10 || category == 22)) {
        this.$router.push({
          path: "/account",
        });
      } else {
        this.$router.push({
          path: "/course/details",
        });
      }
    },
  },
};
</script>
