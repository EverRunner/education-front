<style lang="scss" scoped></style>

<template>
  <section class="pass-apply">
    <div class="wp">
      <h2 class="pass-apply-title">申请执照</h2>
      <el-row>
        <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="10">
          <div class="pass-apply-img">
            <img
              class="hidden-sm-and-down"
              src="@/assets/images/pass-apply-pc.png"
              alt=""
            />
            <img
              class="hidden-md-and-up"
              src="@/assets/images/pass-apply-phone.png"
              style="margin-bottom: 20px;"
              alt=""
            />
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14">
          <div class="pass-apply-license">
            <p>恭喜您成功通过了联邦按摩考试，顺利拿到 Pass 纸！</p>
            <p>接下来，您就可以申请按摩执照了，具体步骤如下：</p>
            <br />
            <p>第一步：前往您所在州的州政府按摩局官网，按要求填写申请表</p>
            <br />
            <p>第二步：各个州的要求会有细微的不同，但通常都会要求您提供：</p>
            <p>
              - 小时证书和学校成绩单（由学校直接发送至各州政府或者密封成绩单)
            </p>
            <p>- 驾照和社会安全号码</p>
            <p>- CPR 证书（急救培训证书）</p>
            <p>- 指纹</p>
            <p>- 保险</p>
            <p>- 州法</p>
            <p>
              按要求填写申请表，并递交材料后，您就可以等待按摩执照的寄送了。
            </p>
            <p>顺利的话，一般4-6周就可以收到。</p>
            <br />
            <p>
              如果您无法自己申请或者需要我们帮您申请，可以购买我们的执照申请服务：
            </p>
          </div>
          <div class="pass-apply-license__btn">
            <el-button
              style="width:250px;"
              type="primary"
              class="el-button--big"
              @click="dialogVisible = true"
              >帮我申请</el-button
            >
          </div>
        </el-col>
      </el-row>
    </div>
    <el-dialog
      title="执照申请服务"
      :visible.sync="dialogVisible"
      width="96%"
      class="pass-apply-dialog"
    >
      <div class="text">
        <p>付费服务说明：</p>
        <p>
          如果您无法自己更新执照，或者需要我们帮您更新执照，可以购买我们的执照更新服务。
        </p>
        <p>我们的执照更新服务单次费用为 $265 美金。</p>
        <p>
          付款成功后，您需要签署一份电子协议，授权给我们，并提供相应的资料。我们会为您处理接下来的执照更新事宜。
        </p>
      </div>
      <div class="btn">
        <el-button
          style="width: 100%;"
          @click="handleGoTo"
          type="primary"
          class="el-button--big"
          :loading="loading"
          >我了解情况，需要购买服务</el-button
        >
        <el-button
          style="width: 100%;margin:15px 0 0 0 ;"
          class="el-button--big"
          >我不需要执照更新服务</el-button
        >
      </div>
    </el-dialog>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  components: {},

  data() {
    return {
      dialogVisible: false,
      loading: false,
    };
  },

  created() {},

  computed: {
    ...mapGetters(["getUserInfo"]),
  },

  mounted() {},

  methods: {
    /**
     * 申请执照，跳转页面
     */
    handleGoTo() {
      this.dialogVisible = false;
      this.$router.push({
        name: "PASS_APPLY_FORM",
        query: {
          updata: this.$route.query.updata == 1 ? 1 : 0,
        },
      });
    },
  },
};
</script>
