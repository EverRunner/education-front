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
    ::v-deep {
      .el-radio__label {
        font-size: 20px !important;
      }
    }
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
        .span {
          font-size: 48px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #db4040;
        }
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
    padding-top: 40px;
    &-title {
      padding-bottom: 20px;
      font-size: 22px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #222222;
    }
    h4 {
      padding: 12px 0 20px;
    }
  }

  .article-content {
    height: 59vh;
    overflow-y: auto;
    /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
    &::-webkit-scrollbar {
      width: 6px;
      height: 6px;
      background-color: #f1f1f1;
    }
    /*定义滚动条轨道 内阴影+圆角*/
    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 2px rgba(144, 147, 153, 0.3);
      border-radius: 10px;
      background-color: #f1f1f1;
    }
    /*定义滑块 内阴影+圆角*/
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 2px rgba(144, 147, 153, 0.3);
      background-color: #c1c1c1;
    }
    img {
      max-width: 100%;
    }
  }
}

::v-deep .pay-course-discounts {
  display: flex;
  align-items: center;
  .el-input {
    width: 220px;
  }
  em {
    color: #00d58a;
    font-size: 14px;
    margin-left: 15px;
    display: flex;
    align-items: center;
    &::before {
      content: "";
      width: 5px;
      height: 5px;
      background: #00d58a;
      margin-right: 8px;
      border-radius: 50%;
    }
    &.error {
      color: #db4040;
      &::before {
        background: #db4040;
      }
    }
  }
}

.renew {
  @media only screen and (min-width: 768px) {
    ::v-deep {
      .el-dialog {
        width: 500px !important;
      }
    }
  }
  ::v-deep {
    .el-dialog__body {
      padding-top: 15px;
    }
  }
  &-hiit {
    color: #db4040;
    font-size: 16px;
    padding-bottom: 30px;
    line-height: 1.8;
  }
  &-upload {
    width: 100%;
    ::v-deep {
      .el-upload {
        width: 100%;
      }
      .upload-file-content {
        width: 100%;
        height: 260px;
      }
      .img {
        width: 100%;
        height: auto;
        max-height: 260px;
        min-height: 180px;
      }
    }
  }
}
</style>

<template>
  <section class="pay" v-loading="loading">
    <div class="wp pay-wp">
      <!-- 支付帐号信息 -->
      <div class="pay-account">
        <el-row class="pay-account-top">
          <el-col :xs="24" :sm="12" :md="12" :lg="12" tag="h5"
            >确认订单信息</el-col
          >
          <el-col :xs="24" :sm="12" :md="12" :lg="12" tag="span"
            >请在2小时内完成支付，倒计时：{{ letTimes.nowTime || "01:59:59" }}
          </el-col>
        </el-row>
        <div class="pay-account-bottom">
          <img src="../../assets/images/2021021711.png" alt="" />
          <div class="info">
            <h5>购买账号：{{ userInfo.username }}</h5>
            <p @click="handleWxPay">
              注意：购买后不支持退款、转让，请确认开课时间或有效期后再提交订单
            </p>
          </div>
        </div>
      </div>

      <!-- 优惠 -->
      <div class="pay-course" v-if="!isPast">
        <div class="pay-course-title">优惠码</div>
        <div class="pay-course-content">
          <div class="pay-course-discounts">
            <el-input
              v-model="discounts"
              maxlength="4"
              placeholder="请输入4位优惠码，立减$100"
              size="medium"
            ></el-input>
            <el-button
              @click="validateDiscounts"
              style="margin-left: 10px"
              size="medium"
              type="primary"
              >使用优惠</el-button
            >
            <em v-if="discountsText" :class="{ error: discountsValidError }">{{
              discountsText
            }}</em>
          </div>
        </div>
      </div>

      <!-- 购买课程 -->
      <div class="pay-course">
        <div class="pay-course-title">
          {{ isPast ? "续费课程" : "购买课程" }}
        </div>
        <div class="pay-course-content">
          <div class="info">
            <div>
              <img src="@/assets/images/xls.png" alt="" />
            </div>
            <div>
              <h5>联邦按摩考试辅导课程</h5>
              <p>有效期{{ isPast ? 60 : 120 }}天</p>
            </div>
          </div>
          <div class="price">
            <span>$</span>
            <span class="span" v-if="isPast">200.00</span>
            <count-to
              v-else
              class="span"
              :startVal="PAY_PRICE"
              :endVal="price"
              :duration="1000"
            ></count-to>
            <em>${{ isPast ? "399.00" : "1999.00" }}</em>
          </div>
        </div>
      </div>

      <div v-if="isPast" style="color: #db4040;font-size:16px;padding-top:30px">
        {{
          `温馨提示：您已续费${userInfo.hasPayElseCount || 0}次，剩余${
            userInfo.payelsecount > 0 ? userInfo.payelsecount : 0
          }次，续费次数使用完毕后，必须提供“预约考试证明”才可以再次续费！`
        }}
      </div>

      <!-- 支付方式 -->
      <div class="pay-course">
        <div class="pay-course-title">支付方式</div>
        <el-radio-group v-model="payType">
          <el-radio label="credit_pay">银行信用卡支付</el-radio>
          <!-- <el-radio label="wechat_pay">微信支付</el-radio> -->
        </el-radio-group>
      </div>

      <div class="pay-course-btn" style="padding-top: 40px">
        <el-button @click="$router.go(-1)">放弃优惠</el-button>
        <el-button @click="countdownPay" type="primary">立即支付</el-button>
      </div>

      <!-- 购买表单 -->
      <!-- <div class="pay-form">
        <div class="pay-form-title">确认支付信息</div>

        <el-form
          :model="formData"
          :rules="rules"
          ref="ruleForm"
          label-width="90px"
          class="demo-ruleForm"
        >
          <h4>第一步：填写个人信息</h4>
          <el-form-item style="width: 400px" label="您的姓名" prop="username">
            <el-input
              v-model="formData.username"
              placeholder="请输入真实姓名"
            ></el-input>
          </el-form-item>

          <el-form-item style="width: 400px" label="您的年龄" prop="age">
            <el-input
              v-model="formData.age"
              placeholder="请输入年龄"
            ></el-input>
          </el-form-item>

          <el-form-item style="width: 400px" label="您的电话" prop="phone">
            <el-input
              v-model="formData.phone"
              placeholder="请输入电话号码"
            ></el-input>
          </el-form-item>

          <el-form-item style="width: 400px" label="您的地址" prop="address">
            <el-input
              v-model="formData.address"
              placeholder="请输入真实住址"
            ></el-input>
          </el-form-item>

          <h4 style="padding-top: 40px">第二步：填写信用卡信息</h4>

          <el-form-item style="width: 400px" label="信用卡号" prop="cardnumber">
            <el-input
              v-model="formData.cardnumber"
              placeholder="请输入信用卡号"
            ></el-input>
          </el-form-item>

          <el-form-item style="width: 400px" label="安全码" prop="safenumber">
            <el-input
              v-model="formData.safenumber"
              placeholder="请输入安全码"
            ></el-input>
          </el-form-item>

          <el-form-item style="width: 400px" label="过期月份" prop="endmonth">
            <el-date-picker
              style="width: 310px"
              v-model="formData.endmonth"
              type="month"
              placeholder="选择过期月份"
            >
            </el-date-picker>
          </el-form-item>

          <el-form-item style="width: 400px" label="过期年份" prop="endyear">
            <el-date-picker
              style="width: 310px"
              v-model="formData.endyear"
              type="year"
              placeholder="选择过期年份"
            >
            </el-date-picker>
          </el-form-item>

          <el-form-item style="padding-top: 50px">
            <el-button @click="handleSubmit" type="primary">提交支付</el-button>
          </el-form-item>
        </el-form>
      </div> -->
    </div>

    <!-- 协议 -->
    <el-dialog
      title="易北教育服务条款"
      top="10vh"
      width="85%"
      :visible.sync="dialogVisible"
      @close="clearCountdownPay"
    >
      <div class="article-content" v-html="articleInfo.content"></div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          :loading="submitLoading"
          type="primary"
          :disabled="isDisabled"
          @click="handleSubmit"
          >同意并支付{{
            buttonCountDown ? `（${buttonCountDown}）` : ""
          }}</el-button
        >
      </div>
    </el-dialog>

    <!-- 续费提醒 -->
    <el-dialog
      title="续费提醒"
      width="95%"
      top="10vh"
      :visible.sync="renewShow"
      class="renew"
    >
      <p class="renew-hiit">
        {{
          `温馨提示：您已续费${userInfo.hasPayElseCount || 0}次，剩余${
            userInfo.payelsecount > 0 ? userInfo.payelsecount : 0
          }次，必须提供“预约考试证明”截图或照片，等待审核通过后，才可以续费！`
        }}
      </p>
      <UploadFile
        class="renew-upload"
        title="预约考试证明"
        :img="renewImg"
        name="renewImg"
        @getImage="handleGetImage"
      />
      <div slot="footer" class="dialog-footer">
        <el-button @click="renewShow = false">取消</el-button>
        <el-button
          type="primary"
          :loading="renewLoading"
          @click="handleRenewSubmit"
          >提交</el-button
        >
      </div>
    </el-dialog>

    <!-- 续费提醒视频 -->
    <el-dialog
      title="续费提醒"
      top="10vh"
      width="85%"
      :visible.sync="isPastDialog"
    >
      <div class="article-content">
        <iframe
          src="https://player.vimeo.com/video/662468147?h=bf353abadd"
          width="100%"
          height="100%"
          frameborder="0"
          webkitallowfullscreen
          mozallowfullscreen
          allowfullscreen
        ></iframe>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isPastDialog = false">再想想</el-button>
        <el-button type="primary" @click="isPastDialog = false"
          >确认续费</el-button
        >
      </div>
    </el-dialog>
  </section>
</template>

<script>
import { loadStripe } from "@stripe/stripe-js";
import { PAY_KEY, PAY_PRICE } from "@config";
import countTo from "vue-count-to";
import { getLocation } from "@utils/tools";
import UploadFile from "@/components/UploadFile.vue";

export default {
  components: {
    countTo,
    UploadFile,
  },

  data() {
    return {
      formData: {},

      userInfo: {},

      letTimes: { nowTime: "" },

      price: PAY_PRICE,
      PAY_PRICE,

      dialogVisible: false,
      articleInfo: {},
      isDisabled: true,
      buttonCountDown: 10,
      buttonCountDownTimer: null,

      discountsText: "",
      discounts: "",
      discountsValidError: false,

      isPast: false,
      isPastDialog: false,

      loading: true,
      submitLoading: false,

      lat: 0,
      lng: 0,

      payType: "credit_pay", // 信用卡支付：credit_pay   微信支付：wechat_pay

      rules: {
        username: [
          { required: true, message: "请输入真实姓名", trigger: "blur" },
        ],
        age: [{ required: true, message: "请输入年龄", trigger: "blur" }],
        phone: [{ required: true, message: "请输入电话", trigger: "blur" }],
        address: [{ required: true, message: "请输入地址", trigger: "blur" }],
        cardnumber: [
          { required: true, message: "请输入信用卡号", trigger: "blur" },
        ],
        safenumber: [
          { required: true, message: "请输入安全码", trigger: "blur" },
        ],
        endmonth: [
          { required: true, message: "请选择过期月份", trigger: "blur" },
        ],
        endyear: [
          { required: true, message: "请选择过期年份", trigger: "blur" },
        ],
        paychannel: [
          { required: true, message: "请选择支付机构", trigger: "blur" },
        ],
      },

      renewShow: false,
      renewImg: "",
      renewLoading: false,
    };
  },

  async created() {
    this.countDown(2 * 60 * 60 - 2);

    this.queryArticleInfo();

    this.handleLocation();

    await this.queryUserInfo();

    //是付会员时，判断会员是否过期
    if (this.userInfo.level >= 1) {
      this.isPast = true;
      this.isPastDialog = true;
    }
    this.consentAgreement();
    // this.queryUserProgress(1);
  },

  methods: {
    /**
     * 提交
     */
    async handleSubmit() {
      // 暂停支付
      // this.$alert(
      //   "支付功能目前处于暂时无法使用的状态，给您带来的不便我们深感抱歉。为了尽快解决您的问题，建议您联系张老师，微信号：ybmblex",
      //   "温馨提示",
      //   {
      //     confirmButtonText: "了解",
      //     callback: (action) => {},
      //   }
      // );

      if (this.payType === "credit_pay") {
        this.handleCreditPay();
      } else {
        this.handleWxPay();
      }
    },

    /**
     * 微信支付
     */
    async handleWxPay() {
      this.loading = true;
      this.submitLoading = true;

      const { data: resData } = await this.$post("/order/creatwxpaytest", {
        amount: 8000,
      });
      if (!resData.data.status) {
        this.loading = false;
        this.submitLoading = false;
        return;
      }

      // 支付实例化
      const stripe = await loadStripe(PAY_KEY);

      // 支付回调
      const resPay = await stripe.confirmWechatPayPayment(
        resData.data.client_secret,
        {
          payment_method_options: {
            wechat_pay: {
              client: "web",
            },
          },
        }
      );
      if (resPay.status != "succeeded") {
        this.$message.error("支付失败，请稍后重试！");
        this.loading = false;
        this.submitLoading = false;
        return;
      }
    },

    /**
     * 银行信用卡支付
     */
    async handleCreditPay() {
      this.submitLoading = true;

      if (this.isPast) {
        //续费
        const { data: resData } = await this.$post("/order/createxfpay", {
          headers: {
            isLoading: true,
          },
        });
        if (!resData.data.status) {
          this.submitLoading = false;
          return;
        }

        const stripe = await loadStripe(PAY_KEY);

        this.$message({
          showClose: false,
          type: "success",
          duration: 30 * 1000,
          dangerouslyUseHTMLString: true,
          message:
            "<span>请等待，支付面页跳转中...<span> <i class='el-icon-loading'></i> ",
        });

        stripe.redirectToCheckout({
          sessionId: resData.data.paysessionid,
        });
      } else {
        //开通
        const { data: resData } = await this.$post(
          "/order/createpay",
          {
            sharecode: this.discounts,
          },
          {
            headers: {
              isLoading: true,
            },
          }
        );
        if (!resData.data.status) {
          this.submitLoading = false;
          return;
        }

        this.consentAgreement();

        const stripe = await loadStripe(PAY_KEY);

        this.$message({
          showClose: false,
          type: "success",
          duration: 30 * 1000,
          dangerouslyUseHTMLString: true,
          message:
            "<span>请等待，支付面页跳转中...<span> <i class='el-icon-loading'></i> ",
        });

        stripe.redirectToCheckout({
          sessionId: resData.data.paysessionid,
        });
      }

      // this.$refs.ruleForm.validate(async (valid) => {
      //   if (!valid) return;

      //   // const { data: resData } = await this.$post("/order/createpay", this.params, {
      //   //   headers: {
      //   //     isLoading: true,
      //   //   },
      //   // });

      //   const { data: resData } = await this.$post(
      //     "/order/createpay",
      //     this.params
      //   );

      //   if (!resData.data.status) return;

      //   this.$message.success("恭喜您，已支付成功！");

      //   this.queryUserInfo();
      // });
    },

    /**
     * 获取定位
     */
    async handleLocation() {
      const coords = await getLocation();
      if (coords && coords.latitude) {
        this.lat = coords.latitude;
        this.lng = coords.longitude;
      }
    },

    /**
     * 确认同意协议书
     */
    consentAgreement() {
      this.$post("/user/creatuserapplyty", {
        category: this.isPast ? "RENEWAL" : "BUY", // 续费：RENEWAL 购买：BUY
        lat: this.lat,
        lng: this.lng,
      });
    },

    /**
     * 验证码
     */
    async validateDiscounts() {
      const { data: resData } = await this.$get("/order/validatesharecode", {
        params: {
          sharecode: this.discounts,
        },
      });

      if (resData.data.status) {
        this.discountsText = "优惠码有效";
        this.discountsValidError = false;
        this.price = PAY_PRICE - 100;
        return;
      } else {
        this.discountsValidError = true;
        this.discountsText = "优惠码无效";
        this.price = PAY_PRICE;
      }
    },

    /**
     * 获取用户学习进度（试听进度）
     * （0：试听进度，1：付费进度）默认是1：付费进度
     */
    async queryUserProgress(type) {
      this.loading = true;

      let resData = await this.$get("/course/getuserprogress", {
        params: {
          type,
        },
      });

      //会员过期
      if (!resData.data.data.status) {
        this.isPast = true;
        // this.$message.error("学员过期，请及时续费！");
      }
    },

    /**
     * 获取文章内容-协议
     */
    async queryArticleInfo() {
      this.loading = true;

      const { data: resData } = await this.$get("/content/getcontentdatabyid", {
        params: {
          id: 5,
        },
      });

      if (!resData.data.status) return;

      this.articleInfo = resData.data.data;
    },

    /**
     * 获取当前登录用户信息
     */
    async queryUserInfo() {
      const { data: resData } = await this.$get("/user/getloginuserinfo");
      //加载条隐藏
      this.loading = false;
      if (!resData.data.status) return;

      this.userInfo = resData.data.userInfo;

      // 自动获取优惠码（先从个人信息里面获取，然后再看本地缓存里有没有）
      if (this.userInfo.tuijiancode) {
        this.discounts = this.userInfo.tuijiancode;
      } else if (localStorage.getItem("recommendCode")) {
        this.discounts = localStorage.getItem("recommendCode");
      }

      sessionStorage.setItem("userInfo", JSON.stringify(this.userInfo));

      // this.$router.push({
      //   name: "ACCOUNT",
      // });
    },

    /**
     * 支付倒计时
     */
    countdownPay() {
      // 续约次数不足
      if (this.userInfo.payelsecount <= 0) {
        this.renewShow = true;
        return;
      }

      this.dialogVisible = true;
      this.buttonCountDown = 10;

      this.buttonCountDownTimer = setInterval(() => {
        this.buttonCountDown--;

        if (this.buttonCountDown == 0) {
          this.isDisabled = false;
          clearInterval(this.buttonCountDownTimer);
        }
      }, 1000);
    },

    /**
     * 支付倒计时-取消
     */
    clearCountdownPay() {
      this.isDisabled = true;
      clearInterval(this.buttonCountDownTimer);
    },

    /**
     * 支付倒计时-取消
     */
    clearCountdownPay() {
      this.isDisabled = true;
      clearInterval(this.buttonCountDownTimer);
    },

    /**
     * 处理续费审核
     */
    handleRenewSubmit() {
      if (!this.renewImg) this.$message.error("请上传预约考试证明！");

      this.$confirm("确认是否提交？")
        .then(async (_) => {
          this.renewLoading = true;

          const { data: resData } = await this.$post("/user/xfcountapplay", {
            idcardimg: this.renewImg,
          });
          this.renewLoading = false;
          if (!resData.data.status) return;

          this.$message({
            message: "提交成功，请等待张老师审核！",
            type: "success",
            duration: 10000,
          });
          this.renewShow = false;
        })
        .catch((_) => {});
    },

    /**
     * 申请执照，跳转页面
     */
    async handleGetImage(reset, index) {
      this.renewImg = reset.url;
      this.$forceUpdate();
    },

    /**
     * 倒计时
     */
    countDown(times) {
      const _this = this;

      if (this.timer) window.clearInterval(this.timer);

      this.timer = setInterval(function() {
        _this.courseOldTime = times; //已经过去的时间

        let day = 0,
          hour = 0,
          minute = 0,
          second = 0; // 时间默认值
        if (times > 0) {
          day = Math.floor(times / (60 * 60 * 24));
          hour = Math.floor(times / (60 * 60)) - day * 24;
          minute = Math.floor(times / 60) - day * 24 * 60 - hour * 60;
          second =
            Math.floor(times) -
            day * 24 * 60 * 60 -
            hour * 60 * 60 -
            minute * 60;
        } else {
          window.clearInterval(_this.timer);
        }
        if (day <= 9) day = "0" + day;
        if (hour <= 9) hour = "0" + hour;
        if (minute <= 9) minute = "0" + minute;
        if (second <= 9) second = "0" + second;

        _this.$set(
          _this.letTimes,
          "nowTime",
          `${day !== "00" ? `${day}天` : ""}${hour}:${minute}:${second}`
        );
        times--;
      }, 1000);

      if (times <= 0) {
        _this.$set(_this.letTimes, "nowTime", "");
        window.clearInterval(_this.timer);
      }
    },
  },

  // 离开页面的钩子
  beforeRouteLeave(to, from, next) {
    window.clearInterval(this.timer);
    next();
  },
};
</script>
