<style lang="scss" scope>
.evaluate {
  padding: 20px 0;
  .wp {
    background-color: #b2eaff;
    max-width: 750px;
  }
  img {
    max-width: 100%;
  }
  &-head {
    h1 {
      padding: 60px 20px 30px;
      font-size: 30px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #004d92;
      text-align: center;
    }
    h5 {
      font-size: 22px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #004d92;
      line-height: 1.7;
      padding: 0 20px 20px;
    }
  }
  &-content {
    &-item {
      background: #fff;
      margin-top: 20px;
      padding: 20px 20px 1px 20px;
      .el-checkbox,
      .el-radio {
        display: flex;
        align-items: center;
        padding-bottom: 15px;
      }

      .el-radio__inner {
        width: 18px;
        height: 18px;
      }
      .el-checkbox__inner {
        width: 16px;
        height: 16px;
      }
      .el-checkbox__label,
      .el-radio__label {
        font-size: 18px !important;
      }
      h5 {
        font-size: 18px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #222222;
        padding-bottom: 20px;
        line-height: 1.5;
      }
    }
  }
  &-radio-inline {
    display: flex;
    flex-wrap: wrap;
    li {
      width: 25%;
    }
  }

  &-foot {
    p {
      font-size: 16px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #666666;
      line-height: 1.7;
      padding: 0 20px 20px 20px;
      background-color: #fff;
    }

    &-btn {
      text-align: center;
      padding: 20px 0;
      button {
        background: #004d92;
        border-radius: 50px;
        font-size: 22px;
        font-family: PingFangSC-Semibold, PingFang SC;
        color: #ffffff;
        padding: 10px 0;
        margin: 10px 0;
        outline: none;
        width: 50%;
        border: 0;
      }
    }
  }
}
</style>

<template>
  <section class="evaluate">
    <div class="wp">
      <div class="evaluate-head">
        <img src="@assets/images/evaluate-head.png" alt="" />
        <h1>易北明星学员回访调查</h1>
        <h5>
          亲爱的{{
            userInfo.username
          }}，恭喜您成功拿到Pass纸！一路走来，您的付出与坚持，我们都看在眼里。所谓一分耕耘一分收获，现在，您终于得到了应有的回报。我们理解您此刻激动的心情，也想听听您的故事，花两分钟时间来跟我们分享一下吧！
        </h5>
      </div>

      <el-form
        class="evaluate-content"
        :model="params"
        :rules="rules"
        ref="evaluate"
      >
        <div class="evaluate-content-item">
          <h5>1.您的年龄段处于：</h5>
          <el-form-item prop="agedis">
            <el-radio-group v-model="params.agedis">
              <el-radio label="0-20" value="0-20"></el-radio>
              <el-radio label="20-40" value="20-40"></el-radio>
              <el-radio label="40-60" value="40-60"></el-radio>
              <el-radio label="60+" value="60+"></el-radio>
            </el-radio-group>
          </el-form-item>
        </div>

        <div class="evaluate-content-item">
          <h5>2.您的英文水平如何？</h5>
          <el-form-item prop="enlevel">
            <el-radio-group v-model="params.enlevel">
              <el-radio
                label="完全零基础，简单的口语交流都无法进行"
                value="完全零基础，简单的口语交流都无法进行"
              ></el-radio>
              <el-radio
                label="可以进行简单的口语交流，但无法读写"
                value="可以进行简单的口语交流，但无法读写"
              ></el-radio>
              <el-radio
                label="可以进行简单的读写"
                value="可以进行简单的读写"
              ></el-radio>
              <el-radio
                label="非常精通，听说读写毫无障碍"
                value="非常精通，听说读写毫无障碍"
              ></el-radio>
            </el-radio-group>
          </el-form-item>
        </div>

        <div class="evaluate-content-item">
          <h5>3.您的电脑水平如何？</h5>
          <el-form-item prop="computerlevel">
            <el-radio-group v-model="params.computerlevel">
              <el-radio
                label="零基础，完全不会使用电脑"
                value="零基础，完全不会使用电脑"
              ></el-radio>
              <el-radio
                label="会一些简单的电脑操作"
                value="会一些简单的电脑操作"
              ></el-radio>
              <el-radio
                label="电脑操作非常熟练"
                value="电脑操作非常熟练"
              ></el-radio>
            </el-radio-group>
          </el-form-item>
        </div>

        <div class="evaluate-content-item">
          <h5>4.您每天花在学习上的时间？</h5>
          <el-form-item prop="studyeverytime">
            <el-radio-group v-model="params.studyeverytime">
              <el-radio label="1小时以内" value="1小时以内"></el-radio>
              <el-radio label="1-2小时" value="1-2小时"></el-radio>
              <el-radio label="2-3小时" value="2-3小时"></el-radio>
              <el-radio label="3-4小时" value="3-4小时"></el-radio>
              <el-radio label="4小时以上" value="4小时以上"></el-radio>
            </el-radio-group>
          </el-form-item>
        </div>

        <div class="evaluate-content-item">
          <h5>5.从开始学习到参加考试，您花了多长时间？</h5>
          <el-form-item prop="studytocoursetime">
            <el-radio-group v-model="params.studytocoursetime">
              <el-radio label="1个月不到" value="1个月不到"></el-radio>
              <el-radio label="2个月不到" value="2个月不到"></el-radio>
              <el-radio label="3个月不到" value="3个月不到"></el-radio>
              <el-radio label="3个月以上" value="3个月以上"></el-radio>
              <el-radio label="一年以上" value="一年以上"></el-radio>
            </el-radio-group>
          </el-form-item>
        </div>

        <div class="evaluate-content-item">
          <h5>6.您为什么要参加联邦按摩考试？（多选）</h5>
          <el-form-item prop="studyWhy">
            <el-checkbox-group v-model="studyWhy">
              <el-checkbox label="合法从事按摩工作"></el-checkbox>
              <el-checkbox label="获取更高的薪水和更好的待遇"></el-checkbox>
              <el-checkbox label="不让同行看不起"></el-checkbox>
              <el-checkbox label="为自己开店做准备"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </div>

        <div class="evaluate-content-item">
          <h5>7.对您来说，顺利通过考试最关键的学习步骤是？</h5>
          <el-form-item prop="keystep">
            <el-radio-group v-model="params.keystep">
              <el-radio label="视频讲解" value="视频讲解"></el-radio>
              <el-radio label="关键词背诵" value="关键词背诵"></el-radio>
              <el-radio label="模拟测验" value="模拟测验"></el-radio>
              <el-radio label="错题集" value="错题集"></el-radio>
              <el-radio label="其它" value="其它"></el-radio>
            </el-radio-group>
          </el-form-item>
        </div>

        <div class="evaluate-content-item">
          <h5>8.1-5分，您愿意给易北教育和张老师打多少分？</h5>
          <el-form-item prop="score">
            <el-radio-group v-model="params.score">
              <ul class="evaluate-radio-inline">
                <li><el-radio label="1" :value="1"></el-radio></li>
                <li><el-radio label="2" :value="2"></el-radio></li>
                <li><el-radio label="3" :value="3"></el-radio></li>
                <li><el-radio label="4" :value="4"></el-radio></li>
                <li><el-radio label="5" :value="5"></el-radio></li>
              </ul>
            </el-radio-group>
          </el-form-item>
        </div>

        <div class="evaluate-content-item">
          <h5>9.您是否愿意向朋友或同事推荐易北教育课程和张老师？</h5>
          <el-form-item prop="istotuijian">
            <el-radio-group v-model="params.istotuijian">
              <el-radio label="愿意" value="愿意"></el-radio>
              <el-radio label="不愿意" value="不愿意"></el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
        <div class="evaluate-content-item">
          <h5>10.您想对还在奋战的易北学员们说些什么呢？</h5>
          <el-form-item prop="content">
            <el-input
              type="textarea"
              :rows="5"
              placeholder="请输入内容"
              v-model="params.content"
            >
            </el-input>
          </el-form-item>
        </div>

        <div class="evaluate-foot">
          <p>
            感谢您的分享！一日易北人，终身易北魂！虽然您已经完成了联邦考试课程，但是易北作为一个温暖的大家庭，希望在未来也可以与您同行！再次恭喜您迈入人生新阶段！
          </p>

          <div class="evaluate-foot-btn">
            <button @click="handleSubmit">提 交</button>
          </div>

          <div><img src="@assets/images/evaluate-foot.png" alt="" /></div>
        </div>
      </el-form>
    </div>
  </section>
</template>

<script>
import { INTRO_OPTIONS, PAGE_SIZE } from "@config";

export default {
  components: {},

  data() {
    return {
      params: {
        courseid: 0,
        score: 0,
      },
      studyWhy: [],
      userInfo: JSON.parse(sessionStorage.getItem("userInfo")),

      rules: {
        agedis: [
          { required: true, message: "请选择您的年龄段", trigger: "change" },
        ],
        enlevel: [
          { required: true, message: "请选择您的英文水平", trigger: "change" },
        ],
        computerlevel: [
          { required: true, message: "请选择您的电脑水平", trigger: "change" },
        ],
        studyeverytime: [
          {
            required: true,
            message: "请选择您每天花在学习上的时间",
            trigger: "change",
          },
        ],
        studytocoursetime: [
          {
            required: true,
            message: "请选择学习到考试，花的时间",
            trigger: "change",
          },
        ],

        score: [
          {
            required: true,
            message: "请给易北教育和张老师打分",
            trigger: "change",
          },
        ],
        istotuijian: [
          {
            required: true,
            message: "请选择是否愿意推荐易北课程",
            trigger: "change",
          },
        ],
        content: [
          {
            required: true,
            message: "请输入对学员说些什么",
            trigger: "change",
          },
        ],
      },
    };
  },

  async created() {},

  methods: {
    /**
     * 提交评价
     */
    handleSubmit() {
      this.$refs.evaluate.validate(async (valid) => {
        if (!valid) return false;

        this.params.studywhy = this.studyWhy.join("，");

        if (!this.params.studywhy) {
          this.$message.error("请选择，您为什么要参加联邦按摩考试？");
          return false;
        }

        this.$confirm("是否提交？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(async () => {
            const { data: resData } = await this.$post(
              "/course/savesubcomment",
              this.params
            );

            if (!resData.data.status) return;

            this.$message.success("提交成功，感谢您的支持！");

            this.$router.push({
              name: "COURSE_DETAILS",
            });
          })
          .catch(() => {});
      });
    },
  },
};
</script>
