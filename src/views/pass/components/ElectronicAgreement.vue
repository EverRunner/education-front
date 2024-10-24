<style lang="scss" scope></style>

<template>
  <section class="electronic-agreement">
    <h5 class="electronic-agreement-title">签署电子协议</h5>
    <ul class="electronic-agreement-content">
      <li>
        <h6>
          本人，<em>{{ getUserInfo.username || "-" }}</em
          >（姓名），特此授权易北教育（<i>https://ybmblex.net</i>）代理申请执照/更新执照以及办理相关文件及手续的一切事宜。我将准确回答所有关于执照申请/执照更新的问题。如果我的回答与事实不符，我将承担一切法律责任和无法顺利获取执照的后果。
        </h6>
        <p>
          I, <em>{{ getUserInfo.username || "-" }}</em
          >, hereby authorize (<i>https://ybmblex.net</i>) to assist all matters
          regarding license application/license renewal and related documents
          and procedures. I will answer all questions regarding license
          application/ license renewal accurately. In the event my answer does
          not match with the authorities, I will bear all legal responsibility
          and the result of being unable to acquire the license.
        </p>
      </li>
      <li>
        <h6>
          您是否在美国收到过刑事罚单？(包括但不限于：无证做工、酒驾、卖淫、行凶、吸毒等)
        </h6>
        <p>
          Have you ever received a criminal ticket in the United States?
          (Including but not limited to: Practice without a license, DUI,
          prostitution, assault, drug)
        </p>
        <div class="radio">
          <el-radio-group v-model="params.iscriminalticketinusa">
            <el-radio :label="1">是 Yes</el-radio>
            <el-radio :label="0">否 No</el-radio>
          </el-radio-group>
        </div>
      </li>
      <li>
        <h6>
          您在美国是否曾经被逮捕？ (被带到执法部门提取指纹)
        </h6>
        <p>
          Have you ever been arrested in the United States (brought to law
          enforcement for fingerprint)
        </p>
        <div class="radio">
          <el-radio-group v-model="params.isarrestinusa">
            <el-radio :label="1">是 Yes</el-radio>
            <el-radio :label="0">否 No</el-radio>
          </el-radio-group>
        </div>
      </li>
      <li>
        <h6>
          您在美国是否曾经被判刑事罪？（没起诉/轻罪/重罪）
        </h6>
        <p>
          Have you ever been convicted of criminal charges (no charge/
          misdemeanor/felony)
        </p>
        <div class="radio">
          <el-radio-group v-model="params.iscriminaloffense">
            <el-radio :label="1">是 Yes</el-radio>
            <el-radio :label="0">否 No</el-radio>
          </el-radio-group>
        </div>
      </li>
    </ul>
    <div class="electronic-agreement-sign">
      <em>签名：{{ signType == 2 ? signContent : "" }}</em>
      <p>Sign：{{ signType == 2 ? signContent : "" }}</p>
      <img v-if="signType == 1" :src="signImage" alt="" />
      <span></span>
      <el-button
        round
        @click="dialogVisible = true"
        :type="signContent || signImage ? 'text' : 'primary'"
        style="width: 140px;"
        >{{
          signContent || signImage ? "重新签名" : "点击签名 Sign"
        }}</el-button
      >
    </div>
    <div class="pass-apply-form__btn">
      <el-button
        round
        @click="handleNext"
        type="primary"
        class="el-button--big"
        style="width: 120px;"
        :loading="loading"
        >下一步</el-button
      >
    </div>

    <el-dialog
      title="签名"
      :visible.sync="dialogVisible"
      width="645px"
      class="pass-apply-dialog"
      :close-on-click-modal="false"
    >
      <div class="electronic-agreement-dialog">
        <div class="mode">
          <span style="margin-right: 15px;">签名方式：</span>
          <el-radio-group v-model="signType" @change="handleSignTypeChange">
            <el-radio :label="1">手写签名</el-radio>
            <el-radio :label="2">打字签名</el-radio>
          </el-radio-group>
        </div>
        <h5 class="hint">
          {{
            signType === 1
              ? "请直接在下方方框中签名。（注：电脑按住鼠标左键移动）"
              : "请以键盘输入您的姓名。"
          }}
        </h5>
        <!-- 签名 -->
        <div class="sign" v-if="signType == 1">
          <vue-esign
            ref="esign"
            :width="800"
            :height="300"
            :isCrop="isCrop"
            :lineWidth="lineWidth"
            :lineColor="lineColor"
            :bgColor.sync="bgColor"
          />
        </div>
        <!-- 输入 -->
        <div class="input" v-else>
          <input
            type="text"
            ref="signInput"
            placeholder="请输入姓名"
            v-model="signContent"
            maxlength="30"
          />
        </div>
      </div>
      <div slot="footer" class="electronic-agreement-dialog__footer">
        <el-button round @click="handleReset">清除重签</el-button>
        <el-button
          round
          type="primary"
          @click="handleGenerate"
          style="width: 104px"
          >提交</el-button
        >
      </div>
    </el-dialog>
  </section>
</template>

<script>
import { uploadFile } from "@api/common";
import { base64ImgtoFile } from "@utils/tools";
import { mapGetters } from "vuex";
import vueEsign from "vue-esign";

export default {
  name: "ElectronicAgreement.vue",

  components: { vueEsign },

  props: {
    info: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },

  data() {
    return {
      params: {
        iscriminalticketinusa: "",
        isarrestinusa: "",
        iscriminaloffense: "",
      },
      dialogVisible: false,
      lineWidth: 6,
      lineColor: "#000000",
      bgColor: "",
      signImage: "",
      isCrop: false,
      signType: 1,
      signContent: "",
      loading: false,
    };
  },

  computed: {
    ...mapGetters(["getUserInfo"]),
  },

  created() {},

  methods: {
    /**
     * 下一步
     */
    async handleNext() {
      if (!this.getUserInfo.username)
        return this.$message({
          message: "请刷新页面，重填！",
          type: "error",
        });

      if (this.params.iscriminalticketinusa === "")
        return this.$message({
          message: "请选择是否收到过刑事罚单",
          type: "error",
        });

      if (this.params.isarrestinusa === "")
        return this.$message({
          message: "请选择是否曾经被逮捕",
          type: "error",
        });

      if (this.params.iscriminaloffense === "")
        return this.$message({
          message: "请选择是否被判刑事罪",
          type: "error",
        });

      if (this.signType == 1 && !this.signImage)
        return this.$message({
          message: "请点击签名",
          type: "error",
        });

      if (this.signType == 2 && !this.signContent)
        return this.$message({
          message: "请点击签名",
          type: "error",
        });

      // 上传签名图
      let signimg = "";
      if (this.signType == 1) {
        this.loading = true;
        const file = base64ImgtoFile(this.signImage); // base64转图片文件
        const { data: signData } = await uploadFile(file); // 上传文件
        if (!signData.data.status) {
          this.loading = false;
          return;
        }
        signimg = signData.data.path;
      }

      // 签署协议
      const { data: resData } = await this.$post(
        "/user/editlicenseelectronicprotocol",
        {
          signimg: this.signType == 1 ? signimg : this.signContent,
          applayid: this.info.id,
          username: this.getUserInfo.username,
          ...this.params,
        }
      );
      this.loading = false;
      if (!resData.data.status) return;

      this.$emit("step", 2);
    },

    /**
     *
     */
    handleSignTypeChange(val) {
      if (val == 2)
        this.$nextTick(() => {
          this.$refs.signInput.focus();
        });
    },

    /**
     * 清空画板
     */
    handleReset() {
      if (this.signType == 1) {
        this.$refs["esign"].reset(); //清空画布
      } else {
        this.signContent = "";
      }
    },

    /**
     * 生成图片
     */
    handleGenerate() {
      if (this.signType == 1) {
        this.$refs["esign"]
          .generate()
          .then((res) => {
            this.signImage = res; // 得到了签字生成的base64图片
            this.dialogVisible = false;
          })
          .catch((err) => {
            //  没有签名，点击生成图片时调用
            this.$message({
              message: "请手写签名",
              type: "error",
            });
            // alert(err); // 画布没有签字时会执行这里 'Not Signned'
          });
      } else {
        if (!this.signContent)
          return this.$message({
            message: "未输入签名",
            type: "error",
          });

        this.dialogVisible = false;
      }
    },
  },
};
</script>
