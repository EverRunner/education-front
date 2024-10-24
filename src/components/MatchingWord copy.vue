<style lang="scss" scoped>
.matching {
  .el-radio-group {
    width: 100%;
    .el-radio {
      display: flex;
      align-items: center;
      line-height: 1.4;
    }
  }
  &-left {
    &-back {
      font-size: 18px;
      color: #222;
      span {
        color: #12be6e;
      }
    }
  }
}

.matchingres {
  width: 600px;
  h6 {
    padding-bottom: 0;
  }
  h3 {
    color: #16c674;
    font-weight: bold;
  }

  &-title {
    font-size: 14px;
    font-weight: 400;
    color: #666666;
    text-align: center;
    margin: 15px 0;
  }
  &-content {
    margin: 2%;
    padding: 15px;
    max-height: 40vh;
    overflow-y: auto;

    /* 设置滚动条的样式 */
    &::-webkit-scrollbar {
      width: 7px;
      background-color: #ddd;
    }

    /* 滚动槽 */
    &::-webkit-scrollbar-track {
      border-radius: 8px;
    }

    /* 滚动条滑块 */
    &::-webkit-scrollbar-thumb {
      border-radius: 8px;
      background: #7f7f7f;
    }

    li {
      border-bottom: 1px dashed #eee;
      background: #ffffff;
      box-shadow: 0px 0px 10px 0px rgba(212, 216, 220, 0.4);
      border-radius: 10px;
      margin-bottom: 20px;
      padding: 0 15px 15px;
    }
    h1 {
      font-size: 14px;
      font-weight: 400;
      color: #666666;
      padding-top: 15px;
    }
    &-word {
      font-size: 18px;
      font-weight: 400;
      color: #222222;
      padding-top: 15px;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
    }
  }
}
</style>

<template>
  <section v-if="matchingList.length > 0">
    <!-- 匹配 -->
    <div class="matching" v-loading="matchingLoading">
      <div class="wp">
        <!-- 错误答案 -->
        <transition name="slide-fade">
          <div v-if="answerErrorShow" class="matching-answer-error">
            <h5>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                viewBox="0 0 64 64"
              >
                <circle fill="#FDCA47" cx="32" cy="32" r="30"></circle>
                <path
                  fill="#F9B700"
                  d="M51.654 9.346A29.869 29.869 0 0 1 59 29c0 16.569-13.432 30-30 30a29.871 29.871 0 0 1-19.654-7.345C14.846 57.99 22.952 62 32 62c16.568 0 30-13.431 30-30 0-9.047-4.012-17.152-10.346-22.654z"
                ></path>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  fill="#FFE8BB"
                  d="M6.418 20.5C5.302 24.242 13 11 25 6.084c5.834-2.391-13.832-1.5-18.582 14.416z"
                ></path>
                <circle
                  fill="#302C3B"
                  cx="42.387"
                  cy="24.677"
                  r="4.999"
                ></circle>
                <path
                  fill="#302C3B"
                  d="M18.867 23.748a5 5 0 1 0 1.735 9.849 5 5 0 0 0-1.735-9.849zm25.389 17.236c-6.754-1.632-16.871-.215-21.526 6.138-.834 1.137-.022 2.335 1.144 1.559 4.455-2.965 13.092-4.799 19.311-3.322 2.375.564 3.557-3.748 1.071-4.375z"
                ></path></svg
              ><span>你需要学习这个！</span>
            </h5>
            <div class="content">
              <div class="item">
                <h6>题目</h6>
                <div
                  v-html="matchingList[matchingTestIndex].atitle"
                  class="item-text"
                ></div>
              </div>
              <div class="item">
                <h6 class="correct">正确选项</h6>
                <div v-html="matchingListCorrect" class="item-text"></div>
              </div>
              <div class="item">
                <h6 class="error">您的选项</h6>
                <div v-html="matchingListError" class="item-text"></div>
              </div>
            </div>
            <div class="btn">
              <el-button @click="handleErrorTestNext" type="success"
                >记住了，下一个</el-button
              >
            </div>
          </div>
        </transition>

        <div class="matching-left">
          <div class="matching-left-back">
            <h5 class="matching-left-title">关键词测试</h5>

            <ul class="matching-nav">
              <li>
                <span>
                  {{
                    matchingList.length -
                      matchingCorrectNumber -
                      matchingErrorNumber
                  }}</span
                >
                <p>剩余</p>
              </li>
              <li>
                <i class="el-icon-arrow-right"></i>
              </li>
              <li>
                <span class="correct">{{ matchingCorrectNumber }}</span>
                <p>正确</p>
              </li>
              <li>
                <i class="el-icon-arrow-right"></i>
              </li>
              <li>
                <span class="error">{{ matchingErrorNumber }}</span>
                <p>错误</p>
              </li>
            </ul>

            <div class="back">
              倒计时：<span> {{ letTimes.nowTime || "01:40:00" }}</span>
            </div>
          </div>
        </div>
        <div class="matching-right">
          <h5 class="matching-right-hint">
            请您不要开启谷歌翻译，否则系统可能出现错误，您可能无法看到英文关键词或者英文测试题。
          </h5>
          <div class="study-tabs">
            <!--测试 -->
            <div class="study-tabs-item">
              <div class="study-practice">
                <div class="study-practice-topic">
                  <div class="title">
                    {{ matchingTestIndex + 1 }}.
                    <div v-html="matchingList[matchingTestIndex].atitle"></div>
                  </div>
                  <div class="answer">
                    <el-radio-group
                      v-model="matchingList[matchingTestIndex].answer"
                      @change="handleRadiochange"
                      :disabled="radioDisabled"
                    >
                      <div
                        class="answer-item"
                        v-for="item in matchingList[matchingTestIndex]
                          .answerList"
                        :key="item.id"
                      >
                        <el-radio :label="item.id">
                          <div class="answer-item-radio">
                            <div v-html="item.title"></div>
                            <em
                              v-if="
                                item.id == matchingList[matchingTestIndex].id &&
                                  item.id ==
                                    matchingList[matchingTestIndex].answer
                              "
                              class="correct"
                              >😊回答正确啦！</em
                            >
                            <a class="show-answer">
                              -
                              {{
                                item.id == matchingList[matchingTestIndex].id
                                  ? 1
                                  : 0
                              }}</a
                            >
                          </div>
                        </el-radio>
                      </div>
                    </el-radio-group>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 配对结果弹出 -->
    <div class="matchingresbg" v-if="showMatchingRes"></div>
    <div class="matchingres" v-if="showMatchingRes">
      <h5>
        {{
          passingRate >= 90
            ? "恭喜您，通过关键词测试！"
            : "oops! 您没有通过关键词测试！"
        }}
      </h5>
      <h6 v-if="passingRate < 90">（正确率大于90%可进入测试！）</h6>
      <h3>正确率：{{ this.passingRate }}%</h3>
      <div class="matchingres-title" v-if="errorWordList.length > 0">
        错误关键词报告
      </div>
      <ul class="matchingres-content">
        <li v-for="item in errorWordList" :key="item.id">
          <div class="matchingres-content-word">
            A面：
            <div v-html="item.atitle"></div>
          </div>
          <div class="matchingres-content-word">
            B面：
            <div v-html="item.btitle"></div>
          </div>
          <h1>来源：{{ item.chapterTitle }}</h1>
        </li>
      </ul>
      <div class="matchingres-btn">
        <el-button
          v-if="passingRate < 90"
          plain
          @click="handleQueryReset"
          type="success"
          >再试一次</el-button
        >
        <el-button v-else type="success" @click="handleStudyNext"
          >进入测试</el-button
        >
      </div>
    </div>
  </section>
</template>

<script>
import {
  getRandom,
  formatDateTime,
  checkContain,
  setTimer,
} from "@utils/tools";

export default {
  name: "Evaluate",
  components: {},

  props: {
    courseWordList: {
      type: Array,
      default: () => {
        return [];
      },
    },

    courseId: {
      type: Number,
      default: 0,
    },

    chapterId: {
      type: Number,
      default: 0,
    },

    submitType: {
      type: [Number, String],
      default: 4,
    },
  },

  data() {
    return {
      matchingList: [],
      showMatchingRes: false, //配对结果显示
      matchingRanking: "",
      matchingRank: "",
      matchingRrrorCount: 0,
      matchingPage: 0,
      matchingLoading: false,
      matchingTestIndex: 0,
      passingRate: 0,
      answerErrorShow: false,
      radioDisabled: false,
      matchingListCorrect: "",
      matchingListError: "",
      matchingCorrectNumber: 0,
      matchingErrorNumber: 0,
      startTime: formatDateTime(new Date(), "YYYY-MM-DD HH:mm:ss"),

      submitUrl: {
        1: "/course/submitusreerrortestbeforeword",
        2: "/course/submitalltesttestbeforeword",
        3: "/course/submitcomprehensivetestbeforeword",
        4: "/course/submittestbeforeword",
      },

      submitTypeTitle: {
        1: "用户错误试题，测试前关键词",
        2: "高频错题，测试前关键词",
        3: "综合试题，测试前关键词",
        4: "章节试题，测试前关键词",
      },

      errorWordList: [],

      interval: 0,
      letTimes: { nowTime: "" },
    };
  },

  watch: {
    courseWordList: function(newVal, oldVal) {
      if (newVal && newVal.length > 0) this.handleQueryPair();
    },
  },

  mounted() {
    this.handleQueryPair();
  },

  computed: {},

  methods: {
    /**
     * 获取匹配列表
     */
    handleQueryPair() {
      if (this.courseWordList.length <= 0)
        return this.$message.error("关键词数量不足，请刷新重试！");

      this.matchingShow = true;
      this.matchingList = [];

      //原来关键词数据
      let wordList = [...this.courseWordList];

      //随机生成答案列表
      wordList.forEach((item) => {
        item.answer = null;
        let answerList = [
          {
            id: item.id,
            title: item.btitle,
            iscorrectoption: 1,
          },
        ];

        //去掉重复的选项
        wordList.forEach(() => {
          const row = wordList[getRandom(0, wordList.length - 1)];

          // 去掉多余的符号，再比较
          if (
            answerList.find((a) => checkContain(a.title, row.btitle)) ||
            answerList.length >= 4
          )
            return;

          answerList.push({
            id: row.id,
            title: row.btitle,
          });
        });

        //答案随机排序
        item.answerList = answerList.sort(() => {
          return Math.random() - 0.5;
        });
      });

      //题目随机排序
      this.matchingList = wordList.sort(() => {
        return Math.random() - 0.5;
      });

      //倒序出现
      // if (Math.random() >= 0.5) wordList.reverse();
    },

    /**
     * 关键词（判断对错）
     */
    handleRadiochange() {
      //禁用点击
      this.radioDisabled = true;

      if (
        this.matchingList[this.matchingTestIndex].answer ==
        this.matchingList[this.matchingTestIndex].id
      ) {
        //正确时

        this.matchingCorrectNumber++;

        setTimeout(() => {
          this.handleTestNext();
        }, 1000);
      } else {
        //错误时（获取正确和用户的答案）

        // 错误的关键词列表
        this.errorWordList.push(this.matchingList[this.matchingTestIndex]);

        this.matchingErrorNumber++;

        this.matchingList[this.matchingTestIndex].answerList.forEach((item) => {
          if (item.id == this.matchingList[this.matchingTestIndex].id)
            this.matchingListCorrect = item.title;

          if (item.id == this.matchingList[this.matchingTestIndex].answer)
            this.matchingListError = item.title;
        });

        this.answerErrorShow = true;
      }
    },

    /**
     * 关键词错误时，下一步
     */
    handleErrorTestNext() {
      this.answerErrorShow = false;
      this.handleTestNext();
    },

    /**
     * 关键词测试下一步
     */
    handleTestNext() {
      //取消禁用点击
      this.radioDisabled = false;

      if (this.matchingTestIndex < this.matchingList.length - 1) {
        ++this.matchingTestIndex;

        //进度条
        // this.calculateSchedule(0, "test");
      } else {
        this.handleSubmitMatching(0); // 提交
        window.clearInterval(this.interval); // 清空测试时间
      }
    },

    /**
     * 处理关键词-重玩
     */
    handleQueryReset() {
      this.showMatchingRes = false;
      this.matchingTestIndex = 0;
      this.matchingTime = 0;
      this.matchingCorrectNumber = 0;
      this.matchingErrorNumber = 0;
      this.errorWordList = [];
      this.startTime = formatDateTime(new Date(), "YYYY-MM-DD HH:mm:ss");

      this.handleQueryPair();
      this.handleSetTimer();
    },

    /**
     * 处理关键词-配对提交
     */
    async handleSubmitMatching() {
      // 测试结束时间
      const endTime = formatDateTime(new Date(), "YYYY-MM-DD HH:mm:ss");

      // 清除测试时间
      window.clearInterval(this.interval);

      // 整列表数据
      const matchingList = this.matchingList.map((item) => {
        return {
          answer: item.answer,
          atitle: item.atitle,
          btitle: item.btitle,
          answerList: item.answerList,
        };
      });

      this.matchingLoading = true;

      this.passingRate =
        Math.floor(
          (this.matchingCorrectNumber / this.matchingList.length) * 10000
        ) / 100;

      // 保存测试记录
      const { data: wordTestRes } = await this.$post(
        "/course/submitcqkeytest",
        {
          title: this.submitTypeTitle[this.submitType],
          jonstring: JSON.stringify(matchingList),
        }
      );
      if (!wordTestRes.data.status) return;

      // 写入学习记录中
      const { data: resData } = await this.$post(
        this.submitUrl[this.submitType],
        {
          category: 3, //测试前单词
          courseid: this.courseId,
          ordercode: wordTestRes.data.ordercode,
          chapterid: this.chapterId,
          usetime: this.matchingTime, //答题时间，单位秒
          correctcount: this.matchingCorrectNumber, //正确题数
          errorcount: this.matchingErrorNumber, //错误题数
          alldcwordscount: this.matchingList.length, // 总题数
          rightlv: this.passingRate, // 正确率
          startdate: this.startTime, //测试开始时间
          enddate: endTime, //测试结束时间
        }
      );
      this.matchingLoading = false;
      if (!resData.data.status) return;

      this.showMatchingRes = true;
    },

    /**
     * 通过
     */
    handleStudyNext() {
      this.$emit("pass");
    },

    /**
     * 处理计时器
     */
    handleSetTimer() {
      // 测试开始时间
      this.courseTestStartdate = new Date().getTime();
      // 预计结束时间
      this.courseTestEnddate = this.courseTestStartdate + 1000 * 60 * 100;
      // this.courseTestEnddate = this.courseTestStartdate + 5000;

      // 获取定时器信息
      const getIntervalInfo = (interval) => {
        this.interval = interval; // 定时器的id
      };

      // 获取时间回调
      const getTimeCall = (timeObj) => {
        const { hour, minute, second } = timeObj;
        this.letTimes.nowTime = `${hour}:${minute}:${second}`;
      };

      // 计时器完成回调
      const finishTimeCall = () => {
        // 答题结束时间
        if (new Date().getTime() <= this.courseTestEnddate)
          this.courseTestEnddate = new Date().getTime();

        this.$alert("很遗憾，测前关键字已超时，请重试！", {
          confirmButtonText: "确定",
          title: "提示",
          callback: (action) => {
            this.handleSubmitMatching();
          },
        });
      };

      setTimer(
        this.courseTestEnddate,
        getIntervalInfo,
        getTimeCall,
        finishTimeCall
      );
    },
  },

  /**
   * 页面销毁
   */
  destroyed() {
    console.log("页面销毁-测试时间", this.interval);
    window.clearInterval(this.interval); //测试时间
  },
};
</script>
