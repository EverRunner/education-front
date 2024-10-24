<style lang="scss" scope></style>

<template>
  <section class="login">
    <el-row>
      <Sketch />

      <el-col :xs="24" :sm="24" :md="13" :lg="12" :xl="12">
        <!-- 注册，第一步-发送验证码 -->
        <div class="login-content" v-if="nowStep == 'sendCode'">
          <div class="login-content-title">
            <img src="@/assets/images/login_logo.png" alt="" />
          </div>

          <div class="login-content-form login-content-password">
            <div class="title">
              <span @click="$router.go(-1)"
                ><i class="el-icon-arrow-left "></i>返回</span
              >
              <h3>找回密码</h3>
            </div>
            <div class="form">
              <el-input
                style="margin: 0;"
                class="el-input--big"
                placeholder="手机号 / 邮箱号"
                v-model="params.account"
                clearable
              >
              </el-input>
              <div class="code">
                <div v-html="imgcode"></div>
                <el-button
                  :loading="imgCodeLoading"
                  @click="queryImgCode"
                  size="small"
                  >重新整理</el-button
                >
              </div>
              <el-input
                style="margin: 0;"
                class="el-input--big"
                placeholder="输入图片验证码"
                v-model="params.validatecode"
                maxlength="4"
              >
              </el-input>
            </div>
            <div class="next">
              <el-button
                :loading="isLoading"
                @click="handleNext('sendCode')"
                style="width: 100%;"
                type="primary"
                class="el-button--big"
                >下一步</el-button
              >
            </div>
          </div>
        </div>

        <!-- 注册，第二步-填写验证码 -->
        <div class="login-content" v-if="nowStep == 'fillCode'">
          <div class="login-content-title">
            <img src="@/assets/images/login_logo.png" alt="" />
          </div>
          <div class="login-content-form login-content-password">
            <div class="title">
              <span @click="nowStep = 'sendCode'"
                ><i class="el-icon-arrow-left "></i>返回</span
              >
              <h3>验证码已寄送</h3>
            </div>
            <div class="form">
              <el-input
                style="margin: 0;"
                class="el-input--big"
                placeholder="手机号 / 邮箱号"
                v-model="params.account"
                disabled
              >
              </el-input>
              <div class="code fill">
                <span>没有收到验证码？</span>
                <el-button
                  :disabled="showBtn"
                  @click="handleSendCode"
                  size="small"
                  >{{ codeText }}</el-button
                >
              </div>
              <el-input
                style="margin: 0;"
                class="el-input--big"
                placeholder="输入帐号验证码"
                v-model="params.findpwdcode"
              >
              </el-input>
            </div>

            <div class="next">
              <el-button
                :loading="isLoading"
                @click="handleNext('fillCode')"
                style="width: 100%;"
                type="primary"
                class="el-button--big"
                >验证帐号</el-button
              >
            </div>
          </div>
        </div>

        <!-- 注册，第三步-设置密码 -->
        <div class="login-content" v-if="nowStep == 'password'">
          <div class="login-content-title">
            <img src="@/assets/images/login_logo.png" alt="" />
          </div>
          <div class="login-content-form login-content-password">
            <div class="title">
              <span @click="nowStep = 'fillCode'"
                ><i class="el-icon-arrow-left "></i>返回</span
              >
              <h3>重设您的密码</h3>
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
                style="margin: 0;"
                class="el-input--big"
                placeholder="设定您的密码"
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
            <div class="next">
              <el-button
                @click="handleRetrieve"
                style="width: 100%;"
                type="primary"
                class="el-button--big"
                >提交</el-button
              >
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import Sketch from "./components/Sketch.vue";
import { passwordValidation } from "@utils/tools";

export default {
  components: { Sketch },

  data() {
    return {
      nowStep: "sendCode", // sendCode、fillCode、password
      isLoading: false,

      params: {
        account: "",
        password: "",
      },

      activeName: "",

      imgcode: "",
      imgCodeLoading: true,

      codeText: "重新寄送",
      showBtn: false,

      isPassword: true,

      loading: true,

      timer: null,
    };
  },

  async created() {
    if (this.$route.query.account)
      this.params.account = this.$route.query.account;

    await this.queryAccount();
    setTimeout(() => {
      this.queryImgCode();
    }, 500);
  },

  methods: {
    /**
     * 验证帐号
     */
    async queryAccount() {
      const { data: resData } = await this.$post("/validateisaccount", {
        account: this.params.account,
      });
    },

    /**
     * 处理下一步
     */
    async handleNext(name) {
      this.isLoading = true;

      switch (name) {
        case "sendCode":
          this.isLoading = false;
          if (this.params.validatecode != this.params.imgcode) {
            this.$confirm("您输入的图片验证码错误。", "提示", {
              customClass: "el-message-box--big",
              confirmButtonText: "再试试",
              showCancelButton: false,
              type: "error",
            });
            return;
          }

          this.isLoading = false;

          // 发送验证码
          const resData = await this.handleSendCode();
          if (resData == true) {
            this.queryImgCode();
            this.params.validatecode = "";
            return;
          }

          this.nowStep = "fillCode";
          break;

        case "fillCode":
          const { data: resCodeData } = await this.$post("/validatevalicode", {
            validatecode: this.params.findpwdcode,
            codeaccount: this.params.account,
          });
          this.isLoading = false;
          if (!resCodeData.data.status) return;

          this.nowStep = "password";
          break;

        default:
          break;
      }
    },

    /**
     * 找回密码
     */
    async handleRetrieve() {
      if (!this.params.account) return this.$message.error("请输入帐号！");

      if (this.activeName == "phone" && !this.params.findpwdcode)
        return this.$message.error("请输入手机短信验证码！");

      if (this.activeName == "email" && !this.params.findpwdcode)
        return this.$message.error("请输入邮箱验证码！");

      if (!passwordValidation(this.params.password))
        return this.$message.error("密码长度为6至16位！");

      const { data: resData } = await this.$post(
        "/user/updateuserpassword",
        this.params,
        {
          headers: {
            isLoading: true,
          },
        }
      );

      if (!resData.data.status) return;

      this.$message.success("找回成功，已跳往登录页面！");

      this.$router.push({
        name: "LOGIN",
      });
    },

    /**
     * 发送验证码
     */
    async handleSendCode() {
      if (this.params.account.indexOf("@") != -1) {
        return await this.queryEmailCode();
      } else {
        return await this.queryPhoneCode();
      }
    },

    /**
     * 获取图形验证码
     */
    async queryImgCode() {
      this.imgCodeLoading = true;

      const { data: resData } = await this.$get("/getvalidatecode");

      this.imgCodeLoading = false;

      if (!resData.data.status) return;

      this.imgcode = resData.data.img;

      // 自动生成验证码
      this.params.imgcode = resData.data.v;
    },

    /**
     * 获取手机验证码
     */
    async queryPhoneCode() {
      this.activeName = "phone";

      if (!this.params.account) return this.$message.error("请输入手机号");
      if (!this.params.validatecode)
        return this.$message.error("请输入图形验证码");

      const { data: resData } = await this.$post(
        "/user/sendfindpwdphonecode",
        {
          ...this.params,
          phone: this.params.account,
        },
        {
          headers: {
            isLoading: true,
          },
        }
      );

      if (!resData.data.status) return true;

      this.countdownCode();

      this.$message.success("验证码已发送，请在手机上查看！");
    },

    /**
     * 获取邮箱验证码
     */
    async queryEmailCode() {
      this.activeName = "email";

      if (!this.params.account) return this.$message.error("请输入邮箱号");
      if (!this.params.validatecode)
        return this.$message.error("请输入图形验证码");

      const { data: resData } = await this.$post(
        "/user/sendfindpwdemailcode",
        {
          ...this.params,
          email: this.params.account,
        },
        {
          headers: {
            isLoading: true,
          },
        }
      );

      if (!resData.data.status) return true;

      this.countdownCode();

      this.$message.success("验证码已发送，请打开邮箱查看！");
    },

    /**
     * 验证码倒计时
     */
    countdownCode() {
      var time = 60;
      var timer = setInterval(() => {
        time--;

        this.codeText = `重新寄送 (${time}s)`;
        this.showBtn = true; // time==0 时，倒计时结束，清除定时器

        if (time == 0) {
          clearInterval(timer);

          this.codeText = "重新寄送";
          this.showBtn = false;
        }
      }, 1000);
    },
  },
};
</script>
