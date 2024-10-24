<style lang="scss" scoped>
.pay {
  padding: 30px 0;

  &-wp {
    background-color: #fff;
    padding: 30px 5%;
    border-radius: 3px;
    box-sizing: border-box;
  }
  &-account {
    padding-bottom: 40px;
    border-bottom: 1px solid #eee;
    &-top {
      padding-bottom: 30px;
      justify-content: space-between;
      align-items: center;
      h5 {
        font-size: 22px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #222222;
        line-height: 33px;
      }
      span {
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #db4040;
      }
    }
    &-bottom {
      display: flex;
      align-items: center;
      img {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        margin-right: 20px;
      }
      h5 {
        font-size: 18px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #222222;
        padding-bottom: 10px;
      }
      p {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #666666;
      }
    }
  }
  &-course {
    padding: 40px 0;
    border-bottom: 1px solid #eee;
    &-title {
      padding-bottom: 20px;
      font-size: 22px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #222222;
    }
    &-content {
      .info {
        img {
          width: 100%;
          margin-right: 20px;
        }
        h5 {
          font-size: 22px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #222222;
          padding-bottom: 10px;
          padding-top: 15px;
        }
        p {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #666666;
        }
      }
      .price {
        font-size: 48px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #db4040;
        span {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #db4040;
          line-height: 20px;
        }
        em {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #777777;
          text-decoration: line-through;
        }
      }
    }
  }
  &-form {
    padding-top: 20px;
    &-title {
      font-size: 20px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #222222;
      padding-left: 90px;
    }
    h4 {
      padding: 15px 0 30px 90px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #666666;
      line-height: 1.5;
    }
  }

  .share-code {
    display: flex;
    align-items: center;
    &-copy {
      display: flex;
      align-items: center;
      color: #666;
      margin-left: 20px;
      cursor: pointer;
      i {
        margin-right: 2px;
      }
    }
    i {
      cursor: pointer;
      color: #606266;
      font-size: 15px;
      margin-left: 2px;
    }
  }
}
.pay-form-item {
  width: 400px;
  max-width: 100%;
  box-sizing: border-box;
}
</style>

<template>
  <section class="pay">
    <div class="wp pay-wp">
      <!-- 资料单 -->
      <div class="pay-form">
        <div class="pay-form-title">个人资料完善</div>

        <el-form
          :model="formData"
          :rules="rules"
          ref="infoForm"
          label-width="90px"
        >
          <h4>
            在正式开始学习前，请您填写以下个人信息，以便我们在您生日和其它节日向您寄送礼物和贺卡
          </h4>
          <el-form-item class="pay-form-item" label="姓名" prop="username">
            <el-input
              v-model="formData.username"
              placeholder="请输入真实姓名"
              disabled
            ></el-input>
          </el-form-item>

          <el-form-item class="pay-form-item" label="邮箱" prop="email">
            <el-input
              v-model="formData.email"
              placeholder="请输入邮箱"
            ></el-input>
          </el-form-item>

          <el-form-item class="pay-form-item" label="手机号" prop="phone">
            <el-input
              v-model="formData.phone"
              type="number"
              placeholder="请输入手机号"
            ></el-input>
          </el-form-item>

          <el-form-item
            class="pay-form-item"
            label="出生年月"
            prop="birthdayyear"
          >
            <el-input
              v-model="formData.birthdayyear"
              placeholder="请输入出生年月，例：1968-12-20"
            ></el-input>
          </el-form-item>

          <el-form-item class="pay-form-item" label="邮编" prop="youbian">
            <el-input
              v-model="formData.youbian"
              placeholder="请输入邮编"
              type="number"
            ></el-input>
          </el-form-item>

          <el-form-item class="pay-form-item" label="地址" prop="address">
            <el-input
              v-model="formData.address"
              placeholder="请输入真实住址，例如：具体地址，城市，州"
              type="textarea"
              :rows="4"
            ></el-input>
          </el-form-item>

          <el-form-item class="pay-form-item" label="优惠码">
            <div class="share-code">
              <div>{{ shareCode }}</div>
              <el-popover
                title="优惠码"
                placement="top"
                width="220"
                trigger="hover"
              >
                <div class="share-code-text">
                  您还可以推荐其他人来购买我们的课程，购课者可获得
                  <em style="color: #db4040;font-size: 16px;">100美金</em>
                  的优惠券，直接抵扣学费；您也会获得
                  <em style="color: #db4040;font-size: 16px;">88美金</em>
                  的现金奖励！
                </div>
                <i slot="reference" class="el-icon-question"></i>
              </el-popover>
              <div
                class="share-code-copy"
                :data-clipboard-text="shareCode"
                @click="handleCopy"
              >
                <i title="点击复制优惠码" class="el-icon-copy-document"></i>复制
              </div>
            </div>
          </el-form-item>

          <el-form-item class="pay-form-item">
            <el-button @click="handleSubmit" type="success">提 交</el-button>
            <el-button @click="handleGoTo" type="info" plain
              >以后再填</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </section>
</template>

<script>
import {
  passwordValidation,
  emailValidation,
  phoneValidation,
} from "@utils/tools";
import Clipboard from "clipboard";

export default {
  components: {},

  data() {
    //验证手机
    let checkPhone = (rule, value, callback) => {
      if (!phoneValidation(value))
        return callback(new Error("手机号格式不正确！"));
      else callback();
    };

    //验证邮箱
    let checkEmail = (rule, value, callback) => {
      if (!emailValidation(value))
        return callback(new Error("邮箱帐号格式不正确！"));
      else callback();
    };

    return {
      formData: {},

      userInfo: JSON.parse(sessionStorage.getItem("userInfo") || {}),
      shareCode: "-",

      fullscreenLoading: false,

      letTimes: { nowTime: "" },

      rules: {
        username: [
          { required: true, message: "请输入真实姓名", trigger: "blur" },
        ],
        email: [
          {
            required: true,
            // validator: checkEmail,
            message: "请输入正确的邮箱",
            trigger: "blur",
          },
        ],
        phone: [
          {
            required: true,
            validator: checkPhone,
            message: "请输入正确的手机号",
            trigger: "blur",
          },
        ],
        birthdayyear: [
          { required: true, message: "请输入出生年月", trigger: "blur" },
        ],
        youbian: [{ required: true, message: "请输入邮编", trigger: "blur" }],
        address: [{ required: true, message: "请输入地址", trigger: "blur" }],
      },
    };
  },

  created() {},

  mounted() {
    this.formData = {
      username: this.userInfo.username,
      email: this.userInfo.email,
      phone: this.userInfo.phone,
      youbian: this.userInfo.youbian,
      address: this.userInfo.address,
    };

    this.shareCode = this.userInfo.sharecode || "-";
  },

  methods: {
    /**
     * 提交
     */
    handleSubmit() {
      this.$refs["infoForm"].validate((valid) => {
        if (!valid) return false;

        this.$confirm("是否提交个人资料？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(async () => {
            const { data: resData } = await this.$post(
              "/user/updateuserinfo",
              this.formData,
              {
                headers: {
                  isLoading: true,
                },
              }
            );

            if (!resData.data.status) return;

            this.$router.push({
              name: "ACCOUNT_INDEX",
            });

            this.$message.success("提交成功！");
          })
          .catch(() => {});
      });
    },

    /**
     * 获取当前登录用户信息
     */
    async queryUserInfo() {
      const { data: resData } = await this.$get("/user/getloginuserinfo");

      //加载条隐藏
      this.fullscreenLoading = false;

      if (!resData.data.status) return;
      sessionStorage.setItem("userInfo", JSON.stringify(resData.data.userInfo));
    },

    /**
     * 处理跳转
     */
    handleGoTo() {
      this.$router.push({
        name: "ACCOUNT",
      });
    },

    /**
     * 处理复制
     */
    handleCopy() {
      let clipboard = new Clipboard(".share-code-copy");

      clipboard.on("success", (e) => {
        this.$message.success("优惠码复制成功！");
        // 释放内存
        clipboard.destroy();
      });

      clipboard.on("error", (e) => {
        // 不支持复制
        this.$message.error("浏览器不支付，请手动复制！");
        // 释放内存
        clipboard.destroy();
      });
    },
  },
};
</script>
