<style lang="scss" scope>
.bind {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba($color: #000000, $alpha: 0.5);
  &-user {
    background-color: #fff;
    width: 800px;
    max-width: 90%;
    position: absolute;
    top: 49%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 40px 20px;
    box-sizing: border-box;
    text-align: center;
    .el-input--big,
    .el-button--big {
      width: 340px;
      max-width: 100%;
      display: block;
      margin: auto;
    }
    h1 {
      font-size: 32px;
      font-weight: 500;
      color: #303133;
      padding: 30px 0 10px;
    }
    h5 {
      font-size: 18px;
      font-weight: 500;
      color: #303133;
      line-height: 1.5;
    }
    .form {
      padding: 40px 0 4%;
    }
  }
}

// 手机屏幕以上
@media only screen and (min-width: 768px) {
  .bind {
    &-user {
      top: 46%;
      h1 {
        font-size: 34px;
      }
    }
  }
}
</style>

<template>
  <section class="bind">
    <div class="bind-user">
      <h5>您已成功登入易北教育</h5>
      <h1>立即绑定备用帐号</h1>
      <h5>绑定后才能在手机网页登入，把易北教育带着走！</h5>

      <div class="form">
        <el-input
          class="el-input--big"
          placeholder="输入真实姓名"
          v-model="params.username"
        >
        </el-input>
        <el-input
          style="margin-top: 15px;"
          class="el-input--big"
          placeholder="输入您的手机号"
          v-model="params.phone"
        >
        </el-input>
        <div class="code fill" style="margin-top: 15px;">
          <span>没有收到验证码？</span>
          <el-button
            :loading="phoneCodeLoading"
            :disabled="showBtn"
            @click="queryPhoneCode"
            size="small"
            >{{ codeText }}</el-button
          >
        </div>
        <el-input
          style="margin-top: 15px;"
          class="el-input--big"
          placeholder="输入手机验证码"
          v-model="params.validatecode"
        >
        </el-input>
        <el-button
          style="margin-top: 24px;"
          :loading="isLoading"
          @click="handleBindUser"
          type="primary"
          class="el-button--big"
          >立即绑定</el-button
        >
      </div>
    </div>
  </section>
</template>

<script>
import { phoneValidation } from "@utils/tools";
import { setTokenExpirationTime } from "@utils/tools";

export default {
  components: {},

  data() {
    return {
      params: {
        username: "",
        phone: "",
        validatecode: "",
      },
      imgcode: "",
      isLoading: false,

      codeText: "获取验证码",
      showBtn: false,

      userInfo: JSON.parse(sessionStorage.getItem("userInfo") || {}),

      imgcode: "",

      isShowLoading: false,
      phoneCodeLoading: false,
    };
  },

  async created() {},

  methods: {
    /**
     * 获取手机验证码
     */
    async queryPhoneCode() {
      if (!phoneValidation(this.params.phone))
        return this.$message.error("手机号格式不正确！");

      this.phoneCodeLoading = true;

      await this.queryImgCode();

      const { data: resData } = await this.$post(
        "/user/sendbindphoneandusernamecode",
        {
          phone: this.params.phone,
          validatecode: this.imgcode,
        }
      );
      this.phoneCodeLoading = false;
      if (!resData.data.status) return;

      this.countdownCode();
    },

    /**
     * 获取图形验证码
     */
    async queryImgCode() {
      const { data: resData } = await this.$get("/getvalidatecode");

      if (!resData.data.status) {
        this.phoneCodeLoading = false;
        return;
      }

      // 自动生成验证码
      this.imgcode = resData.data.v;
    },

    /**
     * 获取当前登录用户信息
     */
    async queryUserInfo() {
      const { data: resData } = await this.$get("/user/getloginuserinfo");
      this.isLoading = false;
      if (!resData.data.status) return;
      sessionStorage.setItem("userInfo", JSON.stringify(resData.data.userInfo));
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
     * 绑定用户姓名和手机号
     */
    async handleBindUser() {
      if (!this.params.username) return this.$message.error("请输入真实姓名！");

      if (!phoneValidation(this.params.phone))
        return this.$message.error("手机号格式不正确！");

      if (!this.params.validatecode)
        return this.$message.error("请输入手机验证码！");

      this.isLoading = true;

      const { data: resData } = await this.$post(
        "/user/bindusernameandphone",
        this.params
      );
      this.isLoading = false;
      if (!resData.data.status) return;

      this.$message.success("您已绑定成功，页面跳转中...");

      // 如果有新的token ，重新设置token
      if (resData.data.token) {
        sessionStorage.setItem("token", resData.data.token);
        setTokenExpirationTime({
          hour: 18,
        });
      }

      await this.queryUserInfo();

      // 必须是会员，分类是 在学生、管理员
      if (
        this.userInfo.level > 0 &&
        (this.userInfo.category == 6 ||
          this.userInfo.category == 10 ||
          this.userInfo.category == 2 ||
          this.userInfo.category == 22)
      ) {
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
