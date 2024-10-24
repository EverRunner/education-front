<style lang="scss" scoped>
.aaa {
  display: none;
}
</style>

<template>
  <section v-if="matchingList.length > 0">
    <div class="studys-wp studys-word-test" v-loading="matchingLoading">
      <div class="studys-word-test__title">
        <ul class="count">
          <li>
            题号<em>{{ matchingTestIndex + 1 }}</em
            >/{{ matchingList.length }}
          </li>
          <li>
            正确<em class="success">{{ matchingCorrectNumber }}</em
            >题
          </li>
          <li>
            错误<em class="error">{{ matchingErrorNumber }}</em
            >题
          </li>
        </ul>
        <p>请选择对应的关键词</p>
        <p>倒计时：{{ letTimes.nowTime || "00:00:00" }}</p>
        <div class="h5" v-html="matchingList[matchingTestIndex].atitle"></div>
      </div>

      <!-- 题目 -->
      <div
        class="studys-word-test__content"
        v-for="item in matchingList[matchingTestIndex].answerList"
        :key="item.id"
      >
        <div
          :class="[
            'item',
            {
              select: item.id == nowSelectWordTestId,
              success: nowSuccessWordTestId && item.id == nowSuccessWordTestId,
              error: item.id == nowErrorWordTestId,
            },
          ]"
          @click="handleClickWord(item.id)"
          v-html="item.title"
        ></div>
        <a class="aaaaa">{{ item.id == matchingList[matchingTestIndex].id }}</a>
      </div>
    </div>

    <!-- 翻卡按钮区 -->
    <div class="studys-word-btns">
      <el-button
        v-if="
          nowSuccessWordTestId && nowSelectWordTestId == nowSuccessWordTestId
        "
        size="medium"
        class="el-button--big"
        type="success"
        @click="handleWordTestNext"
        style="width: 360px;max-width: 90%;"
        >{{
          matchingTestIndex + 1 == matchingList.length
            ? "完成测试"
            : "正确！前往下一题"
        }}</el-button
      >
      <el-button
        v-else-if="nowErrorWordTestId"
        size="medium"
        class="el-button--big"
        type="danger"
        @click="handleWordTestNext"
        style="width: 360px;max-width: 90%;"
      >
        {{
          matchingTestIndex + 1 == matchingList.length
            ? "完成测试"
            : "记住了！前往下一题"
        }}</el-button
      >
      <el-button
        v-if="!nowSuccessWordTestId"
        :disabled="!nowSelectWordTestId"
        size="medium"
        class="el-button--big"
        type="primary"
        @click="handleConfirmAnswer"
        style="width: 360px;max-width: 90%;"
        >送出答案</el-button
      >
    </div>

    <!-- 测试结果 -->
    <el-dialog
      :visible.sync="showMatchingRes"
      width="355px"
      center
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      class="studys-word-test__dialog"
      title=""
    >
      <div class="content">
        <h2>测试结果</h2>
        <ul class="content-title">
          <li>
            总共<em>{{ matchingList.length }}</em
            >题
          </li>
          <li>
            正确<em class="success">{{ matchingCorrectNumber }}</em
            >题
          </li>
          <li>
            正确率<em class="error">{{ passingRate }}</em
            >%
          </li>
        </ul>
        <div class="content-result">
          结果：<em :class="{ success: passingRate >= 90 }">
            {{ passingRate >= 90 ? "已通过" : "未通过" }}
          </em>
        </div>
        <p>正确率大于 90% 可进入测试！</p>
        <div class="content-btns">
          <el-button
            size="medium"
            class="el-button--big"
            type="primary"
            plain
            @click="handleQueryReset"
            v-if="passingRate < 90"
          >
            再试一次</el-button
          >
          <el-button
            size="medium"
            class="el-button--big"
            type="primary"
            v-else
            @click="handleStudyNext"
          >
            进入测试</el-button
          >
        </div>
      </div>
    </el-dialog>
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
      type: [Number, String],
      default: 0,
    },

    chapterId: {
      type: [Number, String],
      default: 0,
    },

    submitType: {
      type: [Number, String],
      default: 4,
    },
  },

  data() {
    return {
      nowSelectWordTestId: null, // 当前选中的单词index
      nowSuccessWordTestId: null, // 当前选中正确的单词index
      nowErrorWordTestId: null, // 当前选中的错误单词index

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
        5: "/course/submitstrainsivetestbeforeword",
      },

      submitTypeTitle: {
        1: "用户错误试题，测试前关键词",
        2: "高频错题，测试前关键词",
        3: "综合试题，测试前关键词",
        4: "章节试题，测试前关键词",
        5: "应变测试，测试前关键词",
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
     * 处理单词点击
     */
    handleClickWord(index) {
      // 选中答案后，禁止点击
      if (this.nowSuccessWordTestId || this.nowErrorWordTestId) return;

      this.nowSelectWordTestId = index;
    },

    /**
     * 关键词（判断对错）
     */
    handleConfirmAnswer() {
      if (!this.nowSelectWordTestId) return;

      // 保存答案
      this.matchingList[
        this.matchingTestIndex
      ].answer = this.nowSelectWordTestId;

      // 获取正确答案
      this.nowSuccessWordTestId = this.matchingList[this.matchingTestIndex].id;

      if (this.nowSelectWordTestId == this.nowSuccessWordTestId) {
        //正确时
        this.matchingCorrectNumber++;
      } else {
        //错误时
        this.matchingErrorNumber++;
        this.nowErrorWordTestId = this.nowSelectWordTestId;
      }
    },

    /**
     * 关键词测试下一步
     */
    handleWordTestNext() {
      // 解出禁用点击
      this.nowSelectWordTestId = null;
      this.nowErrorWordTestId = null;
      this.nowSuccessWordTestId = null;

      if (this.matchingTestIndex < this.matchingList.length - 1) {
        // 进度加1
        ++this.matchingTestIndex;
      } else {
        // 提交测试
        this.handleSubmitMatching(0);
      }
    },

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

      this.$emit("getTestInfo", {
        passingRate: this.passingRate,
      });

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
     * @param totalTime 总测试时长
     */
    handleSetTimer(totalTime = 1000 * 60 * 100) {
      // 测试开始时间
      this.courseTestStartdate = new Date().getTime();

      // 预计结束时间
      this.courseTestEnddate = this.courseTestStartdate + totalTime;
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
        let aa = new Date().getTime();

        // 答题结束时间
        if (aa <= this.courseTestEnddate)
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
    console.log("MatchingWord页面销毁-测试时间", this.interval);
    window.clearInterval(this.interval); //测试时间
  },
};
</script>
