<style lang="scss" scoped>
.form {
}
</style>

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
          </div>
          <div class="personage-set">
            <ul>
              <li>
                <div class="left">
                  <span>第三方登录</span>
                  <p
                    :class="{
                      null: !userInfo.unionid_wx && !userInfo.openid_gg,
                    }"
                  >
                    {{
                      userInfo.unionid_wx || userInfo.unionid_wx
                        ? "已经绑定"
                        : ""
                    }}
                    {{ userInfo.unionid_wx && "【微信登录】"
                    }}{{ userInfo.openid_gg && "【谷歌登录】" }}
                    {{
                      !userInfo.unionid_wx && !userInfo.openid_gg
                        ? "未绑定"
                        : ""
                    }}
                  </p>
                </div>
              </li>
              <li>
                <div class="left">
                  <span>邮箱</span>
                  <p :class="{ null: !userInfo.email }">
                    {{ userInfo.email || "未绑定" }}
                  </p>
                </div>
                <el-button
                  class="el-button--big"
                  @click="setEmailDialog = true"
                  type="primary"
                  round
                  >{{ userInfo.email ? "变更" : "绑定" }}
                </el-button>
              </li>
              <li>
                <div class="left">
                  <span>手机</span>
                  <p :class="{ null: !userInfo.phone }">
                    {{ userInfo.phone || "未绑定" }}
                  </p>
                </div>
                <el-button
                  class="el-button--big"
                  @click="setPhoneDialog = true"
                  type="primary"
                  round
                  >{{ userInfo.phone ? "变更" : "绑定" }}</el-button
                >
              </li>
              <li>
                <div class="left">
                  <span>密码</span>
                  <p :class="{ null: !userInfo.password }">
                    {{ userInfo.password ? "＊＊＊＊＊＊＊＊" : "未绑定" }}
                  </p>
                </div>
                <el-button
                  class="el-button--big"
                  @click="setPasswordDialog = true"
                  type="primary"
                  round
                  >{{ userInfo.password ? "变更" : "绑定" }}</el-button
                >
              </li>
            </ul>
          </div>
        </div>
      </el-col>
    </el-row>

    <!-- 变更密码 -->
    <el-dialog
      :visible.sync="setPasswordDialog"
      top="15vh"
      append-to-body
      :close-on-click-modal="false"
      width="420px"
      title="变更密码"
      class="personage-set-dialog"
    >
      <div class="content">
        <!-- 第一步 -->
        <el-input
          v-if="userInfo.password && setPasswordStep == 'old'"
          class="el-input--big"
          placeholder="输入旧密码"
          v-model="setPasswordParams.oldpwd"
        >
        </el-input>

        <!-- 第二步 -->
        <div v-if="setPasswordStep == 'new'">
          <el-input
            class="el-input--big"
            placeholder="输入新密码"
            v-model="setPasswordParams.newpwd"
            type="password"
          >
          </el-input>
          <el-input
            style="margin-top: 24px;"
            class="el-input--big"
            placeholder="重复新密码"
            v-model="setPasswordParams.newpwd2"
            type="password"
          >
          </el-input>
        </div>
      </div>

      <el-button
        v-if="userInfo.password && setPasswordStep == 'old'"
        @click="setPasswordStep = 'new'"
        style="width: 100%; margin-top: 20px;"
        type="primary"
        class="el-button--big"
        >下一步</el-button
      >
      <el-button
        v-else
        style="width: 100%; margin-top: 20px;"
        :loading="loading"
        @click="handleSetPassword"
        type="primary"
        class="el-button--big"
        >提 交</el-button
      >
    </el-dialog>

    <!-- 绑定/变更邮箱 -->
    <el-dialog
      :visible.sync="setEmailDialog"
      top="15vh"
      append-to-body
      :close-on-click-modal="false"
      width="420px"
      title="绑定/变更邮箱"
      class="personage-set-dialog"
    >
      <div class="content">
        <!-- 第一步，填写邮箱 -->
        <el-input
          v-if="setEmailStep == 'account'"
          class="el-input--big"
          placeholder="输入邮箱号"
          v-model="setEmailParams.email"
        >
        </el-input>

        <!-- 第二步，图形验证码 -->
        <div class="personage-set-form" v-if="setEmailStep == 'sendCode'">
          <el-input
            style="margin: 0;"
            class="el-input--big"
            placeholder="邮箱号"
            v-model="setEmailParams.email"
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
            v-model="setEmailParams.imgcode"
          >
          </el-input>
        </div>

        <!-- 第三步-填写验证码 -->
        <div class="personage-set-form" v-if="setEmailStep == 'fillCode'">
          <el-input
            style="margin: 0;"
            class="el-input--big"
            placeholder="邮箱号"
            v-model="setEmailParams.email"
            disabled
          >
          </el-input>
          <div class="code fill">
            <span>没有收到验证码？</span>
            <el-button
              :disabled="showBtn"
              @click="queryEmailCode"
              size="small"
              >{{ codeText }}</el-button
            >
          </div>
          <el-input
            style="margin: 0;"
            class="el-input--big"
            placeholder="输入邮箱验证码"
            v-model="validatecode"
          >
          </el-input>
        </div>
      </div>

      <el-button
        v-if="setEmailStep == 'account' || setEmailStep == 'sendCode'"
        @click="handleNext('email')"
        style="width: 100%; margin-top: 20px;"
        type="primary"
        class="el-button--big"
        >下一步</el-button
      >
      <el-button
        v-else
        style="width: 100%; margin-top: 20px;"
        :loading="loading"
        @click="handleSetEmail"
        type="primary"
        class="el-button--big"
        >提 交</el-button
      >
    </el-dialog>

    <!-- 绑定/变更手机 -->
    <el-dialog
      :visible.sync="setPhoneDialog"
      top="15vh"
      append-to-body
      :close-on-click-modal="false"
      width="420px"
      title="绑定/变更手机"
      class="personage-set-dialog"
    >
      <div class="content">
        <!-- 第一步，填写手机 -->
        <el-input
          v-if="setPhoneStep == 'account'"
          class="el-input--big"
          placeholder="输入手机号"
          v-model="setPhoneParams.phone"
        >
        </el-input>

        <!-- 第二步，图形验证码 -->
        <div class="personage-set-form" v-if="setPhoneStep == 'sendCode'">
          <el-input
            style="margin: 0;"
            class="el-input--big"
            placeholder="手机号"
            v-model="setPhoneParams.phone"
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
            v-model="setPhoneParams.imgcode"
          >
          </el-input>
        </div>

        <!-- 第三步-填写验证码 -->
        <div class="personage-set-form" v-if="setPhoneStep == 'fillCode'">
          <el-input
            style="margin: 0;"
            class="el-input--big"
            placeholder="手机号"
            v-model="setPhoneParams.phone"
            disabled
          >
          </el-input>
          <div class="code fill">
            <span>没有收到验证码？</span>
            <el-button
              :disabled="showBtn"
              @click="queryEmailCode"
              size="small"
              >{{ codeText }}</el-button
            >
          </div>
          <el-input
            style="margin: 0;"
            class="el-input--big"
            placeholder="输入手机验证码"
            v-model="validatecode"
          >
          </el-input>
        </div>
      </div>

      <el-button
        v-if="setPhoneStep == 'account' || setPhoneStep == 'sendCode'"
        @click="handleNext('phone')"
        style="width: 100%; margin-top: 20px;"
        type="primary"
        class="el-button--big"
        >下一步</el-button
      >
      <el-button
        v-else
        style="width: 100%; margin-top: 20px;"
        :loading="loading"
        @click="handleSetPhone"
        type="primary"
        class="el-button--big"
        >提 交</el-button
      >
    </el-dialog>
  </section>
</template>

<script>
import LeftNav from "./components/LeftNav.vue";
import {
  passwordValidation,
  emailValidation,
  phoneValidation,
} from "@utils/tools";

export default {
  components: {
    LeftNav,
  },

  data() {
    return {
      userInfo: JSON.parse(sessionStorage.getItem("userInfo") || {}),
      loading: false,

      setPasswordDialog: false,
      setPasswordParams: {},
      setPasswordStep: "old", // old、new

      setEmailDialog: false,
      setEmailParams: {},
      setEmailStep: "account", // account、sendCode、fillCode

      setPhoneDialog: false,
      setPhoneParams: {},
      setPhoneStep: "account", // account、sendCode、fillCode

      imgcode: "",
      imgcodeVal: "",
      imgCodeLoading: false,

      codeText: "重新寄送",
      showBtn: false,

      validatecode: "",
    };
  },

  created() {
    if (!this.userInfo.password) this.setPasswordStep = "new";
  },

  mounted() {},

  methods: {
    /**
     * 设置密码
     */
    async handleSetPassword() {
      if (!this.setPasswordParams.oldpwd && this.userInfo.password) {
        this.$message.error("请输入旧密码！");
        this.setPasswordStep = "old";
        return;
      }

      if (!passwordValidation(this.setPasswordParams.newpwd))
        return this.$message.error("密码长度为6至16位！");

      if (this.setPasswordParams.newpwd != this.setPasswordParams.newpwd2)
        return this.$message.error("两次密码输入不一致！");

      // 加载状态
      this.loading = true;

      const { data: resData } = await this.$post(
        "/user/changeuserpwd",
        this.setPasswordParams
      );
      this.loading = false;
      //错误返回
      if (!resData.data.status) return;

      // sessionStorage.setItem("userInfo", JSON.stringify(resData.data.userInfo));
      this.setPasswordDialog = false;
      this.setPasswordStep = "old";
      this.$message.success("密码设置成功。");
    },

    /**
     * 设置邮箱号
     */
    async handleSetEmail() {
      // 加载状态
      this.loading = true;

      const { data: resData } = await this.$post(
        "/user/changebindemail",
        this.setEmailParams
      );
      this.loading = false;
      if (!resData.data.status) return;

      this.setEmailDialog = false;
      this.setEmailStep = "account";
      this.$message.success("邮箱设置成功。");
    },

    /**
     * 处理邮件、手机 下一步
     */
    async handleNext(type) {
      // 邮件
      if (type == "email") {
        // 第一步
        if (
          !emailValidation(this.setEmailParams.email) &&
          this.setEmailStep == "account"
        )
          return this.$message.error("邮箱格式不正确！");

        // 第二步
        if (this.setEmailStep == "account") {
          this.queryImgCode();
          this.setEmailStep = "sendCode";
          return;
        }

        if (this.imgcodeVal != this.setEmailParams.imgcode)
          return this.$message.error("图形验证码不正确！");

        // 第三步
        if (this.setEmailStep == "sendCode") {
          this.queryEmailCode();
          this.setEmailStep = "fillCode";
        }
      }

      // 手机
      if (type == "phone") {
        // 第一步
        if (
          !phoneValidation(this.setPhoneParams.phone) &&
          this.setPhoneStep == "account"
        )
          return this.$message.error("手机格式不正确！");

        // 第二步
        if (this.setPhoneStep == "account") {
          this.queryImgCode();
          this.setPhoneStep = "sendCode";
          return;
        }

        if (this.imgcodeVal != this.setPhoneParams.imgcode)
          return this.$message.error("图形验证码不正确！");

        // 第三步
        if (this.setPhoneStep == "sendCode") {
          this.queryPhoneCode();
          this.setPhoneStep = "fillCode";
        }
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
      this.imgcodeVal = resData.data.v;
    },

    /**
     * 设置手机
     */
    async handleSetPhone() {
      // 加载状态
      this.loading = true;

      const { data: resData } = await this.$post(
        "/user/changebindphone",
        this.setPhoneParams
      );
      this.loading = false;
      if (!resData.data.status) return;

      this.setPhoneDialog = false;
      this.setPhoneStep = "account";
      this.$message.success("手机设置成功。");
    },

    /**
     * 获取手机验证码
     */
    async queryPhoneCode() {
      const { data: resData } = await this.$post(
        "/user/sendphonetochangebindphone",
        {
          phone: this.setPhoneParams.phone,
          validatecode: this.setPhoneParams.imgcode,
        },
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
      const { data: resData } = await this.$post(
        "/user/sendemaitochangebindemail",
        {
          email: this.setEmailParams.email,
          validatecode: this.setEmailParams.imgcode,
        },
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
      let time = 60;
      let timer = setInterval(() => {
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
