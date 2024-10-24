<style lang="scss" scope>
.progress > span {
  position: relative;
  float: left;
  margin: 0 -1px;
  min-width: 30px;
  height: 27px;
  line-height: 16px;
  text-align: right;
  background: #cccccc;
  border: 1px solid;
  border-right: 0px;
  border-color: #bfbfbf #b3b3b3 #9e9e9e;
  border-radius: 6px 0 0 6px;
  background-image: -webkit-linear-gradient(
    top,
    #f0f0f0 0%,
    #dbdbdb 70%,
    #cccccc 100%
  );
  background-image: -moz-linear-gradient(
    top,
    #f0f0f0 0%,
    #dbdbdb 70%,
    #cccccc 100%
  );
  background-image: -o-linear-gradient(
    top,
    #f0f0f0 0%,
    #dbdbdb 70%,
    #cccccc 100%
  );
  background-image: linear-gradient(
    to bottom,
    #f0f0f0 0%,
    #dbdbdb 70%,
    #cccccc 100%
  );
  -webkit-box-shadow: inset 0 1px rgba(255, 255, 255, 0.3),
    0 1px 2px rgba(0, 0, 0, 0.2);
  box-shadow: inset 0 1px rgba(255, 255, 255, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2);
}
.progress > span > span {
  padding-right: 20%;
  font-size: 11px;
  color: #000000;
  margin-top: 4px;
  display: block;
}
.progress > span:before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  height: 18px;

  background: url("~@/assets/images/progress.png") 0 0 repeat-x;
}
.progress .blue {
  background: #5aaadb;
  border-color: #459fd6 #3094d2 #277db2;
  background-image: -webkit-linear-gradient(
    top,
    #aed5ed 0%,
    #7bbbe2 70%,
    #5aaadb 100%
  );
  background-image: -moz-linear-gradient(
    top,
    #aed5ed 0%,
    #7bbbe2 70%,
    #5aaadb 100%
  );
  background-image: -o-linear-gradient(
    top,
    #aed5ed 0%,
    #7bbbe2 70%,
    #5aaadb 100%
  );
  background-image: linear-gradient(
    to bottom,
    #aed5ed 0%,
    #7bbbe2 70%,
    #5aaadb 100%
  );
}

.activity {
  position: relative;
  height: 100vh;
  background: #fff url("~@/assets/images/sy-logo5.png");

  &-result {
    text-align: center;
    i {
      color: #12be6e;
      font-size: 60px;
    }
    h2 {
      font-weight: 500;
      font-size: 16px;
      padding: 16px;
      color: #666;
    }
    h3 {
      font-size: 14px;
      font-weight: 500;
      padding-bottom: 16px;
      color: #666;
    }
    h4 {
      font-size: 14px;
      font-weight: 500;
      color: #666;
      padding-bottom: 20px;
      line-height: 1.5;
      color: #e6a23c;
    }
  }

  &-wp {
    width: 450px;
    max-width: 95%;
    box-sizing: border-box;
    background: #fff;
    border-radius: 20px;
    padding: 25px 25px 30px 25px;
    position: absolute;
    top: 42%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 1px 1px 20px 5px #eee;
    background: #fff url("~@/assets/images/sy-logo5.png");
    &-title {
      text-align: center;
      padding: 20px 0 10px;
      font-size: 22px;
    }
    &-plan {
      height: 27px;
      display: block;
      background: #f3f3f3;
      box-shadow: 1px 1px 5px 0px #b2b2b2;
      border-radius: 6px;
      margin: 20px 2px 30px;
    }
    h6 {
      text-align: center;
      margin-top: -5px;
      color: #999;
      font-weight: 500;
    }
    &-btn {
      padding-top: 20px;
      text-align: center;
      button {
        width: 80%;
      }
    }
    .el-form-item__label {
      font-size: 15px;
      padding-bottom: 0 !important;
    }
    .el-form-item {
      margin-bottom: 15px;
    }
  }
}
</style>

<template>
  <section class="activity">
    <div class="activity-wp">
      <!-- 结果 -->
      <div class="activity-result" v-if="isResult">
        <i class="el-icon-success"></i>
        <h2>我们已经向您的邮箱发送了学习计划表！</h2>
        <h3>祝您早日通过考试！</h3>
        <h4>您还可以在易北官网免费注册账号，<br />获取更多考试资源！</h4>
        <el-button type="primary" @click="handleGoTo">马上去看看！</el-button>
      </div>

      <!-- 表单 -->
      <div v-else>
        <h5 class="activity-wp-title">立即免费获取联邦按摩考试学习计划表</h5>
        <div class="activity-wp-plan">
          <div class="progress">
            <span class="blue" style="width: 75%;">
              <span>即将发送学习计划表</span>
            </span>
          </div>
        </div>
        <el-form
          ref="form"
          :rules="formRules"
          label-position="top"
          :model="formValues"
          size="medium"
        >
          <el-form-item label="请问如何称呼您？" prop="name">
            <el-input
              placeholder="请输入您的姓名"
              v-model="formValues.name"
            ></el-input>
          </el-form-item>
          <el-form-item label="请问您Email邮箱是？" prop="email">
            <el-input
              placeholder="请输入您的邮箱"
              v-model="formValues.email"
            ></el-input>
          </el-form-item>
          <el-form-item size="large">
            <div class="activity-wp-btn">
              <el-button type="primary" @click="handleNext" :loading="isLoading"
                >Yes！给我发送学习计划表!</el-button
              >
            </div>
          </el-form-item>
        </el-form>
        <h6>*我绝不会容忍垃圾邮件，且您可以随时退订*</h6>
      </div>
    </div>
  </section>
</template>

<script>
import { emailValidation } from "@utils/tools";

export default {
  components: {},

  data() {
    // 验证邮箱
    let checkEmail = (rule, value, callback) => {
      if (!emailValidation(value))
        return callback(new Error("邮箱帐号格式不正确！"));
      else callback();
    };

    return {
      isLoading: false,
      isResult: false,
      formRules: {
        name: [{ required: true, message: "请输入您的姓名", trigger: "blur" }],
        email: [{ required: true, validator: checkEmail, trigger: "blur" }],
      },
      formValues: {
        name: "",
        email: "",
      },
    };
  },

  async created() {},

  methods: {
    /**
     * 处理下一步
     */
    handleNext() {
      this.$refs["form"].validate(async (valid) => {
        if (!valid) return false;

        this.isLoading = true;
        const { data: resData, status } = await this.$post(
          "/youtubeEmailGather/add",
          this.formValues
        );
        this.isLoading = false;
        if (!status) return;

        this.isResult = true;
      });
    },

    /**
     * 跳转页面
     */
    handleGoTo() {
      this.$router.push({
        name: "HOME",
      });
    },
  },
};
</script>
