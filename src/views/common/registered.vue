<style lang="scss" scoped>
.article {
  &-wp {
    padding: 30px 0;
  }
  &-title {
    padding-bottom: 30px;
    font-size: 28px;
    color: #333;
  }
  &-content {
    img {
      max-width: 100%;
    }
  }
  .wp {
    background: #fff;
    padding: 40px;
  }
}
</style>

<template>
  <section class="login">
    <el-row>
      <Sketch />

      <el-col :xs="24" :sm="24" :md="13" :lg="12" :xl="12">
        <!-- 注册，第一步-帐号 -->
        <div class="login-content" v-if="nowStep == 'account'">
          <div class="login-content-title">
            <img src="@/assets/images/login_logo.png" alt="" />
          </div>
          <div class="login-content-register">
            <span>已经有帐号？</span>
            <el-button @click="handleGoTo('LOGIN')" class="el-button--big"
              >登录</el-button
            >
          </div>
          <div class="login-content-form">
            <h2>注册新帐号</h2>
            <ThirdLogin name="注册" :lat="lat" :lng="lng" />
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
                @click="handleNext('account')"
                style="width: 100%;"
                type="primary"
                class="el-button--big"
                >下一步</el-button
              >
            </div>
          </div>
        </div>

        <!-- 注册，第二步-发送验证码 -->
        <div class="login-content" v-if="nowStep == 'sendCode'">
          <div class="login-content-title">
            <img src="@/assets/images/login_logo.png" alt="" />
          </div>

          <div class="login-content-form login-content-password">
            <div class="title">
              <span @click="handleBack('account')"
                ><i class="el-icon-arrow-left "></i>返回</span
              >
              <h3>验证您的帐号</h3>
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

        <!-- 注册，第三步-填写验证码 -->
        <div class="login-content" v-if="nowStep == 'fillCode'">
          <div class="login-content-title">
            <img src="@/assets/images/login_logo.png" alt="" />
          </div>
          <div class="login-content-form login-content-password">
            <div class="title">
              <span @click="nowStep = 'account'"
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
                v-model="validatecode"
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

        <!-- 注册，第四步-设置密码 -->
        <div class="login-content" v-if="nowStep == 'password'">
          <div class="login-content-title">
            <img src="@/assets/images/login_logo.png" alt="" />
          </div>
          <div class="login-content-form login-content-password">
            <div class="title">
              <span @click="nowStep = 'account'"
                ><i class="el-icon-arrow-left "></i>返回</span
              >
              <h3>最后一步！</h3>
            </div>
            <div class="form">
              <el-input
                class="el-input--big"
                placeholder="输入您的姓名"
                v-model="params.username"
              >
              </el-input>
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
              <div class="login-agreement">
                <el-checkbox class="el-checkbox--big" v-model="agree"
                  >同意</el-checkbox
                >
                <span class="link" @click="dialogVisible = true"
                  >《易北教育隐私政策》</span
                >
              </div>
            </div>
            <div class="next">
              <el-button
                :loading="isLoading"
                @click="handleRegistered"
                style="width: 100%;"
                type="primary"
                class="el-button--big"
                :disabled="!agree"
                >提交注册</el-button
              >
            </div>
          </div>
        </div>
      </el-col>
    </el-row>

    <!-- 隐私政策 -->
    <el-dialog
      :title="articleInfo.title"
      :visible.sync="dialogVisible"
      width="85%"
    >
      <div class="article-content" v-html="articleInfo.content"></div>
    </el-dialog>
  </section>
</template>

<script>
import Sketch from "./components/Sketch.vue";
import ThirdLogin from "./components/ThirdLogin.vue";
import {
  passwordValidation,
  emailValidation,
  phoneValidation,
} from "@utils/tools";
import { getLocation } from "@utils/tools";
import { setTokenExpirationTime } from "@utils/tools";

export default {
  components: { Sketch, ThirdLogin },

  data() {
    return {
      nowStep: "account", // account、sendCode、fillCode、password
      isLoading: false,

      activeName: "",

      params: {
        account: "",
        password: "",
      },
      imgcode: "",
      imgCodeLoading: false,

      codeText: "重新寄送",
      showBtn: false,

      validatecode: null,

      isPassword: true,

      agreementShow: false,
      privacyShow: false,

      agree: true,
      articleInfo: {},
      dialogVisible: false,
      lat: 0,
      lng: 0,
    };
  },

  watch: {},

  async created() {
    this.queryArticleInfo();

    // 帐号
    if (this.$route.query.account)
      this.params.account = this.$route.query.account;

    // 分销码
    if (localStorage.getItem("recommendCode"))
      this.params.tuijiancode = localStorage.getItem("recommendCode");

    // 注册渠道信息
    if (localStorage.getItem("registeredChannel"))
      this.params.channel = localStorage.getItem("registeredChannel");

    // 获取定位
    const coords = await getLocation();
    if (coords && coords.latitude) {
      this.lat = coords.latitude;
      this.lng = coords.longitude;
    }
  },

  methods: {
    /**
     * 处理下一步
     */
    async handleNext(name) {
      if (!this.params.account)
        return this.$message.error("请输入手机号、邮箱号！");

      this.isLoading = true;

      switch (name) {
        case "account":
          const { data: resData } = await this.$post("/validateisaccount", {
            account: this.params.account,
          });

          this.isLoading = false;
          if (!resData.data.status) {
            this.queryImgCode();
            this.nowStep = "sendCode";
            return;
          }

          this.$confirm("该帐号已被注册了！", "提示", {
            customClass: "el-message-box--big",
            confirmButtonText: "更换帐号，再试试",
            showCancelButton: false,
            type: "error",
          });
          break;

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

          // 发送验证码
          this.handleSendCode();

          this.nowStep = "fillCode";
          break;

        case "fillCode":
          const { data: resCodeData } = await this.$post("/validatevalicode", {
            validatecode: this.validatecode,
            codeaccount: this.params.account,
          });
          this.isLoading = false;
          if (!resCodeData.data.status) return;

          this.nowStep = "password";

        default:
          break;
      }
    },

    /**
     * 发送验证码
     */
    handleSendCode() {
      if (this.params.account.indexOf("@") != -1) {
        this.queryEmailCode();
      } else {
        this.queryPhoneCode();
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
      this.params.phone = this.params.account;
      this.activeName = "phone";

      if (!phoneValidation(this.params.phone))
        return this.$message.error("手机号格式不正确！");

      const { data: resData } = await this.$post(
        "/user/sendvalidatetophone",
        this.params,
        {
          headers: {
            isLoading: true,
          },
        }
      );

      if (!resData.data.status) return;

      this.countdownCode();
    },

    /**
     * 获取邮箱验证码
     */
    async queryEmailCode() {
      this.params.email = this.params.account;
      this.activeName = "email";

      if (!emailValidation(this.params.email))
        return this.$message.error("邮箱帐号格式不正确！");

      const { data: resData } = await this.$post(
        "/user/sendvalidatetoemail",
        this.params,
        {
          headers: {
            isLoading: true,
          },
        }
      );

      if (!resData.data.status) return;

      this.countdownCode();
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

    /**
     * 注册
     */
    async handleRegistered() {
      if (!this.params.username) return this.$message.error("请输入您的姓名！");

      //验证手机
      if (this.activeName == "phone") {
        this.params.phonecode = this.validatecode;

        if (!phoneValidation(this.params.phone))
          return this.$message.error("手机号格式不正确！");

        if (!this.params.phonecode)
          return this.$message.error("请输入手机验证码！");
      }

      //验证邮箱
      if (this.activeName == "email") {
        this.params.emailcode = this.validatecode;

        if (!emailValidation(this.params.email))
          return this.$message.error("邮箱帐号格式不正确！");
        if (!this.params.emailcode)
          return this.$message.error("请输入邮箱验证码！");
      }

      if (!passwordValidation(this.params.password))
        return this.$message.error("密码长度为6至16位！");

      //注册
      if (this.activeName == "phone") {
        const { data: resData } = await this.$post(
          "/user/registerphone",
          this.params,
          {
            headers: {
              isLoading: true,
            },
          }
        );

        // 手机注册失败时
        if (!resData.data.status) {
          return this.queryImgCode();
        }

        sessionStorage.setItem("token", resData.data.token);
        setTokenExpirationTime({
          hour: 18,
        });
        sessionStorage.setItem(
          "userInfo",
          JSON.stringify(resData.data.userInfo)
        );

        this.$message.success("手机注册成功，已自动登录！");

        this.$router.push({
          name: "COURSE_DETAILS",
        });
      } else {
        const { data: resData } = await this.$post(
          "/user/registeremail",
          this.params,
          {
            headers: {
              isLoading: true,
            },
          }
        );

        // 邮箱注册失败时
        if (!resData.data.status) {
          return this.queryImgCode();
        }

        sessionStorage.setItem("token", resData.data.token);
        sessionStorage.setItem(
          "userInfo",
          JSON.stringify(resData.data.userInfo)
        );
        setTokenExpirationTime({
          hour: 18,
        });

        this.$message.success("邮箱注册成功，已自动登录！");

        this.$router.push({
          name: "COURSE_DETAILS",
        });
      }
    },

    /**
     * 获取文章内容 （隐私政策 id：4 ）
     */
    async queryArticleInfo() {
      const { data: resData } = await this.$get("/content/getcontentdatabyid", {
        params: {
          id: 4,
        },
      });
      if (!resData.data.status) return;

      this.articleInfo = resData.data.data;
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
    handleGoTo() {
      this.$router.push({
        name: "LOGIN",
      });
    },
  },
};
</script>
