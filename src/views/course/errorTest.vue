<style lang="scss" scoped>
.studys-word-btns {
  position: relative;
  background: transparent;
  box-shadow: none;
  border: 0;
}
</style>

<template>
  <section class="study">
    <!-- 1.测前-单词匹配 -->
    <div class="matching-word" v-if="isShowWord" v-loading="loading">
      <matching-word
        :courseWordList="matchingList"
        :submitType="type"
        :chapterId="params.chapterId"
        @pass="handleWordPass"
        @getTestInfo="handleTestScore"
        ref="matching"
      />
      <!-- 学习历史记录 -->
      <study-history
        key="1"
        v-if="matchingList.length > 0 && isShowWord && loading == false"
        courseId="0"
        chapterId="0"
        :type="studyType"
        ref="studyHistoryRef"
      />
    </div>

    <!-- 2.测试 -->
    <div class="studys-wp studys-test" v-loading="loading" v-else>
      <div class="studys-test-title">
        <div class="studys-test-title__times">
          <ul class="index">
            <li style="margin-bottom: 5px;">
              题号<span
                ><em> {{ courseTestIndex + 1 }}</em
                >/{{ courseTestList.length }}</span
              >
            </li>
            <li>
              测试剩余时间<em> {{ letTimes.nowTime || "00:00:00" }}</em>
            </li>
          </ul>
        </div>
        <div
          class="studys-test-title__content"
          v-html="courseTestList[courseTestIndex].title"
        ></div>
      </div>
      <div class="studys-test-answer">
        <el-radio-group v-model="courseTestList[courseTestIndex].answer">
          <div
            class="item"
            v-for="(item, index) in courseTestList[courseTestIndex].options"
            :key="item.id"
          >
            <span class="item-letter"
              >{{ String.fromCharCode(65 + index) }}.</span
            >
            <div
              class="item-option"
              :class="{
                select: courseTestList[courseTestIndex].answer == item.id,
              }"
            >
              <el-radio :label="item.id"
                >{{ item.content }}
                <a class="aaaaa">-{{ item.iscorrectoption }}</a></el-radio
              >
            </div>
          </div>
        </el-radio-group>
      </div>
      <!--按钮区 -->
      <div class="studys-word-btns">
        <el-button
          size="medium"
          style="width: 360px;max-width: 90%;"
          class="el-button--big"
          type="primary"
          :disabled="loading"
          @click="handleTestNext"
          >{{
            courseTestIndex >= courseTestList.length - 1 ? "完成测试" : "下一题"
          }}</el-button
        >
      </div>

      <!-- 学习历史记录 -->
      <study-history
        key="2"
        v-if="courseTestList.length > 0 && !isShowWord && loading == false"
        courseId="0"
        chapterId="0"
        :type="studyTestType"
        ref="studyHistoryRef2"
      />
    </div>
  </section>
</template>

<script>
import { INTRO_OPTIONS, PAGE_SIZE, ERROR_RANDOM_TOPIC } from "@config";
import axios from "axios";
import { accAdd, setTimer } from "@utils/tools";
import { addStudyTime } from "@api/common";
import MatchingWord from "@comp/MatchingWord";
import studyHistory from "@comp/studyHistory";

// 取消请求
const CancelToken = axios.CancelToken;

export default {
  components: {
    MatchingWord,
    studyHistory,
  },

  data() {
    return {
      activeName: "video",
      params: {},
      playFlip: false,

      navList: [],
      navListSrt: "",

      autoplay: false,

      letTimes: { nowTime: "" },
      interval: 0,

      courseInfo: {
        title: "-",
      },

      loading: true,

      courseTestList: [
        [
          {
            answer: null,
            yibei_requestion_const: {},
            yibei_requestion_const_option: [],
          },
        ],
      ],
      courseTestIndex: 0,
      courseTestProgress: 0,
      courseTestInfo: {},
      courseTestStartdate: 0,
      courseTestEnddate: 0,
      courseTestGuide: 0,

      courseProgress: {},

      userInfo: JSON.parse(sessionStorage.getItem("userInfo")),

      studyTime: null,

      courseTestTime: 60 * 60 * 1000,

      type: 1,

      submitUrl: {
        1: "/course/submiterrorrequesttest",
        2: "/course/submitallerrorrequesttest",
        3: "/course/submitcomprehensivetest",
      },

      titleObj: {
        1: "我的错题测试",
        2: "学员高频错题测试",
        3: "综合测试",
      },

      matchingList: [],
      isShowWord: false,

      studyTestType: 0,
      studyType: 0,

      source: CancelToken.source(),
    };
  },

  async created() {
    switch (Number(this.type)) {
      case 1:
        this.studyType = 8;
        this.studyTestType = 9;
        break;

      case 2:
        this.studyType = 10;
        this.studyTestType = 11;
        break;

      case 3:
        this.studyType = 12;
        this.studyTestType = 13;
        break;
    }

    //增加学习总时长
    this.addStudyTimeTimeout();

    if (this.$route.query.type) this.type = this.$route.query.type;

    switch (Number(this.type)) {
      case 1:
        this.queryErrorTestList();
        break;

      case 2:
        this.queryFrequencyTestList();
        break;

      case 3:
        this.queryCompleteTestList();
        break;
    }
  },

  watch: {},

  mounted() {
    switch (Number(this.type)) {
      case 1:
        this.studyType = 8;
        this.studyTestType = 9;
        break;

      case 2:
        this.studyType = 10;
        this.studyTestType = 11;
        break;

      case 3:
        this.studyType = 12;
        this.studyTestType = 13;
        break;
    }

    this.$nextTick(() => {
      // 禁用右键
      document.oncontextmenu = new Function("event.returnValue=false");
      // 禁用选择
      document.onselectstart = new Function("event.returnValue=false");
    });
  },

  methods: {
    /**
     * 获取错误测试题列表
     */
    async queryErrorTestList() {
      this.loading = true;

      const { data: resData } = await this.$get("/course/geterrorrequesttest", {
        params: {
          randomCount: ERROR_RANDOM_TOPIC,
        },
        cancelToken: this.source.token,
      });

      if (!resData.data.status) return;

      // 单词匹配
      resData.data.data.forEach((item) => {
        if (
          item.yibei_newdcword_paper_const &&
          item.yibei_newdcword_paper_const.length > 0 &&
          item.yibei_newdcword_paper_const[0].yibei_newdcword_paper_const
        )
          this.matchingList.push({
            ...item.yibei_newdcword_paper_const[0].yibei_newdcword_paper_const,
            chapterTitle: item.title,
          });
      });

      // 测试前，做先做关键词测试
      if (this.matchingList.length > 0) {
        this.isShowWord = true;
        this.$alert("您需要答对 90% 关键词，才能做试题！", {
          confirmButtonText: "确定",
          title: "提示",
          callback: (action) => {
            this.$refs.matching.handleSetTimer();
          },
        });
      } else {
        this.handleSetTimer();
      }

      //修改数据
      const list = resData.data.data.map((item) => {
        return {
          title:
            item.yibei_requestion_const && item.yibei_requestion_const.content,
          options: item.yibei_requestion_const_option,
          answer: null,
          id: item.id,
          requestid: item.requestid,
          category:
            item.yibei_requestion_const && item.yibei_requestion_const.category,
          chapter: item.yibei_course_chapter && item.yibei_course_chapter.title, //小节名
        };
      });

      //过滤空标题、无答案的题
      const filterList = list.filter((item) => {
        if (item.title && item.options.length > 0) return item;
      });

      //设置元素值
      this.$set(this, "courseTestList", filterList);

      this.calculateSchedule(0, "test");

      this.loading = false;

      // this.matchingList.length = 2;
      // this.courseTestList.length = 3;
    },

    /**
     * 处理计时器
     */
    handleSetTimer() {
      // 测试开始时间
      this.courseTestStartdate = new Date().getTime();
      // 预计结束时间
      this.courseTestEnddate = this.courseTestStartdate + this.courseTestTime;

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

        this.$alert("很遗憾，答题已超时，请重新测试。", {
          confirmButtonText: "确定",
          title: "提示",
          callback: (action) => {
            this.testSubmit(0);
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

    /**
     * 学员高频错题测试
     */
    async queryFrequencyTestList() {
      this.loading = true;

      const { data: resData } = await this.$get("/course/getallerrorlist", {
        params: {
          randomCount: ERROR_RANDOM_TOPIC,
        },
        cancelToken: this.source.token,
      });

      if (!resData.data.status) return;

      // 单词匹配
      resData.data.data.forEach((item) => {
        if (
          item.yibei_newdcword_paper_const &&
          item.yibei_newdcword_paper_const.length > 0 &&
          item.yibei_newdcword_paper_const[0].yibei_newdcword_paper_const
        )
          this.matchingList.push({
            ...item.yibei_newdcword_paper_const[0].yibei_newdcword_paper_const,
            chapterTitle: item.title,
          });
      });

      // 测试前，做先做关键词测试
      if (this.matchingList.length > 0) {
        this.isShowWord = true;
        this.$alert("您需要答对 90% 关键词，才能做试题！", {
          confirmButtonText: "确定",
          title: "提示",
          callback: (action) => {
            this.$refs.matching.handleSetTimer();
          },
        });
      } else {
        this.handleSetTimer();
      }

      // 处理计时器
      // this.handleSetTimer();
      // this.countDown(this.courseTestTime);

      //修改数据
      const list = resData.data.data.map((item) => {
        return {
          title: item.content,
          options: item.yibei_requestion_const_option,
          answer: null,
          id: item.id,
          requestid: item.requestid,
          category: item.category,
          chapter: item.title, //小节名
        };
      });

      //过滤空标题、无答案的题
      const filterList = list.filter((item) => {
        if (item.title && item.options.length > 0) return item;
      });

      //设置元素值
      this.$set(this, "courseTestList", filterList);

      this.courseTestStartdate = new Date().getTime();

      this.calculateSchedule(0, "test");

      this.loading = false;
    },

    /**
     * 获取综合测试题列表
     */
    async queryCompleteTestList() {
      this.loading = true;

      const { data: resData } = await this.$get(
        "/course/getcomprehensivetest",
        {
          params: {
            randomCount: ERROR_RANDOM_TOPIC,
          },
          cancelToken: this.source.token,
        }
      );

      if (!resData.data.status) return;

      // 单词匹配
      resData.data.data.forEach((item) => {
        if (
          item.yibei_newdcword_paper_const &&
          item.yibei_newdcword_paper_const.length > 0 &&
          item.yibei_newdcword_paper_const[0].yibei_newdcword_paper_const
        )
          this.matchingList.push({
            ...item.yibei_newdcword_paper_const[0].yibei_newdcword_paper_const,
            chapterTitle: item.title,
          });
      });

      // 测试前，做先做关键词测试
      if (this.matchingList.length > 0) {
        this.isShowWord = true;
        this.$alert("您需要答对 90% 关键词，才能做试题！", {
          confirmButtonText: "确定",
          title: "提示",
          callback: (action) => {
            this.$refs.matching.handleSetTimer();
          },
        });
      } else {
        this.handleSetTimer();
      }

      // 处理计时器
      // this.handleSetTimer();
      // this.countDown(this.courseTestTime);

      const list = resData.data.data.map((item) => {
        return {
          title: item.content,
          options: item.yibei_requestion_const_option,
          answer: null,
          id: item.id,
          requestid: item.requestid,
          category: item.category,
          chapter: item.title, //小节名
        };
      });

      //过滤空标题、无答案的题
      const filterList = list.filter((item) => {
        if (item.title && item.options.length > 0) return item;
      });

      //设置元素值
      this.$set(this, "courseTestList", filterList);

      this.courseTestStartdate = new Date().getTime();

      this.calculateSchedule(0, "test");

      this.loading = false;
    },

    /**
     * 单元测试下一步
     */
    handleTestNext() {
      if (this.courseTestList[this.courseTestIndex].answer == null)
        return this.$message.error("请选择答案！");

      if (this.courseTestIndex < this.courseTestList.length - 1) {
        ++this.courseTestIndex;

        //进度条
        this.calculateSchedule(0, "test");
      } else {
        this.handleTestSubmit(0); //提交
      }
    },

    /**
     * 单元测试提交
     */
    handleTestSubmit(index) {
      this.$confirm("是否提交本次测试", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        this.testSubmit(index);
      });
    },

    /**
     * 提交测试
     */
    async testSubmit(index) {
      // let enddate = this.courseTestEnddate || new Date().getTime(); //答题提交
      let enddate = new Date().getTime(); //答题提交

      let correctcount = 0; //正确数量

      //所有题
      let requestList = this.courseTestList.map((item) => {
        let row = item.options.find(
          (a) => a.id == item.answer && a.iscorrectoption == 1
        );

        //正确数量
        if (row) correctcount++;

        return {
          requestid: item.requestid || item.id,
          title: item.title,
          category: item.category,
          memberanswser: item.answer,
          status: row ? 1 : 2, //1：正确 2：错误
        };
      });

      let score = Math.floor((correctcount / requestList.length) * 100); //得分

      // 向访问记录中添加“测试得分”和“测试完成时间”
      this.$refs.studyHistoryRef2.setStudyConst(score, new Date());

      let params = {
        correctcount,
        errorcount: requestList.length - correctcount,
        score,
        startdate: this.courseTestStartdate,
        enddate,
        status: score >= 0.9 * 100 ? 1 : 2, // 1：测试通过 2：测试不通过
        requestList,
      };

      const { data: resData } = await this.$post(
        this.submitUrl[this.type],
        params,
        {
          headers: {
            isLoading: true,
          },
        }
      );

      if (!resData.data.status) return;

      this.$router.replace({
        name: "ERROR_TEST_DETAILS",
        query: {
          id: resData.data.data.id,
          type: this.type, // 1:我的错题  2.系统易错题库  3.综合测试
        },
      });
    },

    /**
     *  计算进度条(单词、测试)
     */
    calculateSchedule(index, type) {
      this.courseInfo.title = this.courseTestList[this.courseTestIndex].chapter;
      this.courseTestProgress =
        Math.floor(
          ((this.courseTestIndex + 1) / this.courseTestList.length) * 10000
        ) / 100;
    },

    /**
     * 获取当前登录用户信息
     */
    async queryUserInfo() {
      const { data: resData } = await this.$get("/user/getloginuserinfo");

      if (!resData.data.status) return;
      sessionStorage.setItem("userInfo", JSON.stringify(resData.data.userInfo));
    },

    /**
     * 获取关键词的测试信息
     */
    handleTestScore(obj) {
      // 向访问记录中添加“测试得分”和“测试完成时间”
      this.$refs.studyHistoryRef.setStudyConst(obj.passingRate, new Date());
    },

    /**
     * 处理通过关键词
     */
    handleWordPass() {
      this.isShowWord = false;
      // 处理计时器

      if (this.courseInfo.isfinal == 1) {
        this.$alert("请尽量在三次以内通过Final测试！", {
          confirmButtonText: "确定",
          title: "提示",
          callback: (action) => {
            this.handleSetTimer();
          },
        });
      } else {
        this.handleSetTimer();
      }
    },

    /**
     * 倒计时
     */
    // countDown(times) {
    //   const _this = this;

    //   if (this.timer) window.clearInterval(this.timer);

    //   this.timer = setInterval(function() {
    //     _this.courseOldTime = times; //已经过去的时间

    //     let day = 0,
    //       hour = 0,
    //       minute = 0,
    //       second = 0; // 时间默认值
    //     if (times > 0) {
    //       day = Math.floor(times / (60 * 60 * 24));
    //       hour = Math.floor(times / (60 * 60)) - day * 24;
    //       minute = Math.floor(times / 60) - day * 24 * 60 - hour * 60;
    //       second =
    //         Math.floor(times) -
    //         day * 24 * 60 * 60 -
    //         hour * 60 * 60 -
    //         minute * 60;
    //     } else {
    //       window.clearInterval(_this.timer);

    //       _this.courseTestEnddate = new Date().getTime(); // 答题结束时间

    //       _this.$alert("很遗憾，答题已超时，请重新测试", {
    //         confirmButtonText: "确定",
    //         title: "提示",
    //         callback: (action) => {
    //           _this.testSubmit();
    //         },
    //       });
    //     }
    //     if (day <= 9) day = "0" + day;
    //     if (hour <= 9) hour = "0" + hour;
    //     if (minute <= 9) minute = "0" + minute;
    //     if (second <= 9) second = "0" + second;

    //     _this.$set(
    //       _this.letTimes,
    //       "nowTime",
    //       `${day !== "00" ? `${day}天:` : ""}${hour}:${minute}:${second}`
    //     );
    //     times--;
    //   }, 1000);

    //   if (times <= 0) {
    //     _this.$set(_this.letTimes, "nowTime", "");
    //     window.clearInterval(_this.timer);
    //   }
    // },

    /**
     * 增加学习总时长
     */
    addStudyTimeTimeout() {
      this.studyTime = setInterval(async () => {
        await addStudyTime();
      }, 10000);
    },
  },

  /**
   * 页面销毁
   */
  beforeDestroy() {
    console.log("页面销毁", this.interval);
    window.clearInterval(this.interval); //测试时间
    window.clearInterval(this.studyTime); //停留时间

    // 禁用右键
    document.oncontextmenu = new Function("event.returnValue=true");

    // 禁用选择
    document.onselectstart = new Function("event.returnValue=true");

    // 取消请求
    this.source.cancel("取消请求");
  },
};
</script>
