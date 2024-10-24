<style lang="scss" scope>
.test-results {
  &::before {
    content: "";
    height: 30px;
    display: block;
  }
  &::after {
    content: "";
    height: 40px;
    display: block;
  }
  .wp {
    background: #fff url("../../assets/images/sy-logo6.png");
  }
  &-wp {
    box-sizing: border-box;
  }
  &-info {
    padding: 60px 50px 40px;

    border-bottom: 1px solid #eee;
    h5 {
      font-size: 20px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 600;
      color: #222222;
      padding-bottom: 25px;
      em {
        font-size: 16px;
        color: #666;
      }
      i {
        font-size: 16px;
        &.pass {
          color: #16c674;
        }
        &.error {
          color: #db4040;
        }
      }
    }
    .title {
      display: flex;
      align-items: flex-end;
      padding-bottom: 25px;
      font-size: 20px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #222222;
      span {
        font-size: 30px;
        color: #16c674;
        line-height: 1;
        margin: 0 3px;
      }
      em {
        font-size: 30px;
        color: #222222;
        line-height: 1;
        margin: 0 3px 0 1px;
      }
    }
    .timing {
      display: flex;
      align-items: flex-end;
      padding-bottom: 25px;
      font-size: 20px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #222222;

      span {
        font-size: 30px;
        color: #222222;
        line-height: 1;
      }
    }
    .btn {
      padding-top: 25px;
    }
  }

  &-list {
    padding: 40px 5%;
    box-sizing: border-box;

    .el-radio-group {
      display: block;
    }
    .el-radio__label {
      font-size: 16px;
    }
    .el-radio__input.is-checked .el-radio__inner {
      background-color: #16c674;
      border-color: #16c674;
    }
    .el-radio__input.is-checked + .el-radio__label {
      color: #16c674;
    }

    .topic {
      &-title {
        font-size: 18px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #222222;
        line-height: 28px;
        padding: 30px 0 20px;
        display: flex;
        position: relative;
        p {
          font-size: 20px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #222222;
        }
      }
      &-answer {
        &-item {
          font-size: 18px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #222;
          min-height: 36px;
          line-height: 36px;
          margin: 12px 0;
          padding-left: 5px;
          margin-bottom: 5px;
          &.error {
            .el-radio__input.is-checked .el-radio__inner {
              background-color: #db4040 !important;
              border-color: #db4040 !important;
            }
            .el-radio__input.is-checked + .el-radio__label {
              color: #db4040 !important;
            }
            .el-radio__label {
              color: #db4040 !important;
            }
          }
          &.yes {
            .el-radio__label {
              color: #16c674 !important;
            }
          }
          &.correct {
            border: 1px solid #16c674;
          }
        }
      }
      &-parsing {
        height: 59px;
        line-height: 59px;
        margin-top: 15px;
        background: #f6f6f6;
        padding: 0 30px;
        font-size: 20px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 600;
        color: #16c674;
        &.error {
          color: #db4040;
        }
      }
    }
  }
}

.el-radio-group {
  width: 100%;
  .el-radio {
    display: flex;
    align-items: center;
    line-height: 1.4;
  }
}
</style>

<template>
  <section class="test-results" v-loading="loading">
    <div class="wp">
      <div class="test-results-wp">
        <div class="test-results-info">
          <h5>
            {{ STUDY_TYPE[type] }}
            <i
              v-if="$route.query.progressStatus < 4"
              :class="info.status == 1 ? 'pass' : 'error'"
            >
              （{{ hintText }}）
            </i>
            <em>（大于90分，才能通过哟！）</em>
          </h5>
          <div class="title">
            总共<em>{{ info.allrequestcount }}</em
            >道题目，你答对了<span>{{ info.correctcount }}</span
            >道
          </div>
          <div class="timing">
            状态：
            <span class="">{{ info.status == 1 ? "通过" : "未通过" }}</span>
          </div>
          <div class="timing">
            用时：
            <span>{{ testTime }}</span>
          </div>
          <div class="timing">
            得分：
            <span>{{ info.score }}分</span>
          </div>
          <div class="btn">
            <el-button @click="queryTestList" type="success" plain
              >查看题目</el-button
            >

            <el-button @click="handleGoTo('ACCOUNT')" type="success" plain
              >返回我的主页</el-button
            >
          </div>
        </div>
      </div>

      <div v-if="testListShow" class="test-results-list">
        <div class="topic" v-for="(item, index) in testList" :key="index">
          <div class="topic-title">
            {{ index + 1 }}、
            <div v-html="item.atitle"></div>
          </div>
          <div class="topic-answer">
            <el-radio-group v-model="item.answer">
              <div
                v-for="(son, key) in item.answerList"
                :key="key"
                :class="[
                  'topic-answer-item',
                  { correct: item.status == 2 && son.iscorrectoption == 1 },
                  { error: item.status == 2 && son.id == item.answer },
                  {
                    yes: son.iscorrectoption == 1 && son.id == item.answer,
                  },
                ]"
              >
                <el-radio :label="son.id">
                  <div class="answer-item-radio">
                    <div v-html="son.title"></div>
                  </div>
                </el-radio>
              </div>
            </el-radio-group>
          </div>

          <div
            :class="[
              'topic-parsing',
              {
                error: item.status == 2,
              },
            ]"
          >
            {{ item.status == 2 ? "错误" : "正确" }}
          </div>
        </div>

        <!-- <div style="padding-top: 35px">
          <el-button
            v-if="info.score < 100 && testListShow"
            @click="handleEorroGoto"
            plain
            type="danger"
            >请点进这里，进入错题练习</el-button
          >
        </div> -->
      </div>
    </div>
  </section>
</template>

<script>
import { STUDY_TYPE } from "@config";

export default {
  components: {},

  data() {
    return {
      params: {
        id: 1,
      },
      info: {
        constList: [],
      },

      testList: [],
      testListShow: false,
      pages: {
        pageindex: 1,
        pagesize: 300,
      },
      testTime: "00:00:00",

      nextInfo: {},

      hintText: "",

      navList: "",
      loading: false,

      goto: 3,

      type: 0,

      STUDY_TYPE,
    };
  },

  created() {
    // 1:我的错题  2.系统易错题库  3.综合测试
    if (this.$route.query.type) this.type = this.$route.query.type;

    //记录id
    if (this.$route.query.id) this.params.id = this.$route.query.id;

    this.queryInfo();
  },

  methods: {
    /**
     * 获取测试信息
     */
    async queryInfo() {
      this.info = this.$route.query;

      this.handleTestTime(
        (new Date(this.info.enddate).getTime() -
          new Date(this.info.startdate).getTime()) /
          1000
      );
    },

    /**
     * 获取答题列表
     */
    async queryTestList() {
      this.loading = true;
      this.testListShow = true;

      const { data: resData } = await this.$get(
        "/course/getsubmitcqkeytestlist",
        {
          params: {
            ordercode: this.info.ordercode,
          },
        }
      );
      this.loading = false;
      if (!resData.data.status) return;

      if (resData.data.data.length <= 0)
        return this.$message.error("暂无答题记录");

      // 获取json串数据
      const list = JSON.parse(resData.data.data[0].jonstring);

      this.testList = list.map((item) => {
        // 默认为错误的状态
        item.status = 2;

        // 检查该题是否做正确了
        item.answerList.forEach((son) => {
          if (son.iscorrectoption && item.answer == son.id) item.status = 1;
        });

        return item;
      });
    },

    /**
     * 处理时间
     */
    handleTestTime(times) {
      let day = 0,
        hour = 0,
        minute = 0,
        second = 0; // 时间默认值

      day = Math.floor(times / (60 * 60 * 24));
      hour = Math.floor(times / (60 * 60)) - day * 24;
      minute = Math.floor(times / 60) - day * 24 * 60 - hour * 60;
      second =
        Math.floor(times) - day * 24 * 60 * 60 - hour * 60 * 60 - minute * 60;

      if (day <= 9) day = "0" + day;
      if (hour <= 9) hour = "0" + hour;
      if (minute <= 9) minute = "0" + minute;
      if (second <= 9) second = "0" + second;

      this.testTime = `${hour}:${minute}:${second}`;
    },

    /**
     * 跳转页面-学习页
     */
    handleGoTo(name) {
      this.$router.push({
        name,
        query: {
          type: this.type,
        },
      });
    },
  },
};
</script>
