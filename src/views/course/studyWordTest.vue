<style lang="scss" scope></style>

<template>
  <section v-loading="matchingLoading">
    <study-head
      :chapteTitle="courseInfo.title"
      :studyProgress="courseProgressStatus"
      :courseId="params.courseId"
      :chapterId="params.chapterId"
      :progressId="params.progressId"
      :nowIndex="2"
    />

    <div class="studys-wp studys-word-test" v-loading="loading">
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
        <p>正确率大于 90% 可通过测试！</p>
        <p>
          已做错 <em>{{ matchingRrrorCount }}</em> 次
        </p>
        <div class="content-btns">
          <!-- 第一种，学习过的情况 -->
          <!-- <template v-if="courseProgressStatus > 1">
            <el-button
              size="medium"
              class="el-button--big"
              type="primary"
              plain
              @click="handleQueryReset"
            >
              再试一次</el-button
            >
            <el-button
              size="medium"
              class="el-button--big"
              type="primary"
              @click="handleStudyNext(2)"
            >
              前往下一步骤</el-button
            >
          </template> -->

          <!--  第二种，没有学习过的情况 -->
          <template>
            <!-- 通过时 -->
            <template v-if="passingRate >= 90">
              <el-button
                size="medium"
                class="el-button--big"
                type="primary"
                plain
                @click="handleQueryReset"
              >
                再试一次</el-button
              >
              <el-button
                size="medium"
                class="el-button--big"
                type="primary"
                @click="handleStudyNext(2)"
              >
                前往下一步骤</el-button
              >
            </template>
            <!-- 错一次 -->
            <template v-else-if="matchingRrrorCount == 1">
              <el-button
                size="medium"
                class="el-button--big"
                type="primary"
                plain
                @click="handleQueryReset"
              >
                再试一次</el-button
              >
              <el-button
                size="medium"
                class="el-button--big"
                type="primary"
                @click="handleTabsGoTo(0)"
              >
                重学视频</el-button
              >
            </template>

            <!-- 错两次 -->
            <template v-else-if="matchingRrrorCount == 2">
              <el-button
                size="medium"
                class="el-button--big"
                type="primary"
                plain
                @click="handleTabsGoTo(1)"
              >
                重学关键词</el-button
              >
              <el-button
                size="medium"
                class="el-button--big"
                type="primary"
                @click="handleTabsGoTo(0)"
              >
                重学视频</el-button
              ></template
            >

            <!-- 错三次 -->
            <template v-else-if="matchingRrrorCount == 3">
              <el-button
                size="medium"
                class="el-button--big"
                type="primary"
                @click="handleTabsGoTo(0)"
                >重学视频</el-button
              >
            </template>
          </template>
        </div>
      </div>
    </el-dialog>

    <!-- 学习历史记录 -->
    <study-history
      :courseId="params.courseId"
      :chapterId="params.chapterId"
      type="3"
      ref="studyHistoryRef"
    />
  </section>
</template>

<script>
import { INTRO_OPTIONS, PAGE_SIZE } from "@config";
import {
  adjustmentStepSort,
  getRandom,
  formatDateTime,
  checkContain,
} from "@utils/tools";
import { addStudyTime, updateWordTime } from "@api/common";
import { FILE_ROOT } from "@config";
import Swiper from "swiper";
import "swiper/dist/css/swiper.css";
import { reviewCourse } from "@api/common";
import studyHistory from "@comp/studyHistory";
import StudyHead from "./components/StudyHead";

export default {
  components: { studyHistory, StudyHead },

  data() {
    return {
      courseWordList: [[], []],
      courselWordIndex: 1, // 当前单词的index
      courselWordProgress: 1,

      nowSelectWordTestId: null, // 当前选中的单词index
      nowSuccessWordTestId: null, // 当前选中正确的单词index
      nowErrorWordTestId: null, // 当前选中的错误单词index

      courseProgressStatus: null, // 当前的进度

      activeName: "video",
      params: {},
      playFlip: false,

      navList: [],

      autoplay: false,

      letTimes: { nowTime: "" },
      timer: 0,

      courseInfo: {
        dcwordsList: [],
        requestPaperList: [],
      },

      loading: true,

      wordBtuShow: false,
      wordNextBtuShow: false,
      wordBtuStoreShow: false,

      courseProgress: {},

      userInfo: JSON.parse(sessionStorage.getItem("userInfo")),

      matchingIndex: null,
      matchingShow: false,
      matchingList: [{}],
      matchingSelect: { firstId: "", secondId: "" },
      matchingFirstIndex: null,
      matchingSecondIndex: null,
      showMatchingRes: false, //配对结果显示
      matchingTime: 0,
      matchingRes: {},
      matchingRanking: "",
      matchingRank: "",
      matchingRrrorCount: 0,
      matchingTimeInterval: null,
      pages: {
        pageindex: 1,
        pagesize: 20,
      },
      matchingCount: 0,
      matchingPage: 0,
      matchingLoading: false,
      matchingResidue: [],
      matchingTestIndex: 0,
      passingRate: 0,
      answerErrorShow: false,
      radioDisabled: false,
      matchingListCorrect: "",
      matchingListError: "",
      matchingCorrectNumber: 0,
      matchingErrorNumber: 0,

      wordSwiper: null,

      studyTime: null,

      audioSrc: "",
      audioPaly: false,

      startTime: formatDateTime(new Date(), "YYYY-MM-DD HH:mm:ss"),
    };
  },

  async created() {
    // 增加学习总时长
    this.addStudyTimeTimeout();

    if (this.$route.query.courseId) {
      this.params.courseId = this.$route.query.courseId; //课程id
      this.params.chapterId = this.$route.query.chapterId; //章节id
      this.params.progressId = this.$route.query.progressId; //总进度id
    }

    await this.queryCourseInfo();

    this.queryCourseProgress();

    // 0：中英文单词  1：英文单词
    this.queryCourseWordList(0);

    // 复习
    if (this.$route.query.isReview == 1 && this.courseInfo.isreview == 0)
      await reviewCourse({
        courseid: this.params.courseId,
        chapterid: this.params.chapterId,
        ispay: this.courseInfo.courseObj.type,
        status: 1, // 状态：0：视频学习中  1：视频学习完成 2： 单词中英完成  3：单词英完成  4：单元测试完成（复习完成）
      });
  },

  watch: {},

  mounted() {},

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

      // 获取正确答案
      this.nowSuccessWordTestId = this.matchingList[this.matchingTestIndex].id;

      if (
        this.nowSelectWordTestId == this.matchingList[this.matchingTestIndex].id
      ) {
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
        this.handleSubmitMatching();
      }
    },

    /**
     * 查询课程详情
     */
    async queryCourseInfo() {
      this.loading = true;

      const { data: resData } = await this.$get(
        "/course/getcoursechapterdatabyid",
        {
          params: {
            id: this.params.chapterId,
          },
        }
      );

      this.loading = false;

      if (!resData.data.status) return;

      let name;

      this.courseInfo = resData.data.data;

      if (this.courseInfo.dcwordsList.length >= 1) return;

      //如果有测试，就增加测试选项
      if (this.courseInfo.requestPaperList.length)
        this.courseInfo.requestPaperList.forEach((item, index) => {
          if (index == 0) {
            this.navList.push({
              id: 4,
              title: "单元测试",
              type: 3,
            });
            name = "COURSE_STUDY_TEST";
          }
        });

      if (this.courseInfo.dcwordsList.length == 2)
        name = "COURSE_STUDY_WORD_ENGLISH";

      //如果没有视频、单词，就跳到单元测试
      if (name)
        this.$router.replace({
          name,
          query: {
            courseId: this.params.courseId,
            chapterId: this.params.chapterId,
            progressId: this.params.progressId,
            isReview: this.$route.query.isReview || "",
          },
        });
    },

    /**
     * 获取课程学习进度
     */
    async queryCourseProgress() {
      const { data: resData } = await this.$get(
        "/course/getcurrentchapterprogress",
        {
          params: {
            progressid: this.params.progressId,
            courseid: this.params.courseId,
            chapterid: this.params.chapterId,
          },
        }
      );
      if (!resData.data.status) return;

      this.$set(this, "courseProgress", resData.data.data);

      // 调整步骤顺序
      this.courseProgressStatus = adjustmentStepSort(
        this.courseProgress.status
      );

      //判断是否，是否学习过
      if (resData.data.data.status > 1) {
        this.wordBtuShow = true;
        this.wordNextBtuShow = true;
      }
    },

    /**
     * 学习进入下一步
     *  -1:未开始  0：视频学习中  1：关键词中英  2：关键词英  3：单元测试中  4：完成  5：关键词中英测试   6：关键词英测试
     */
    async handleStudyNext() {
      // 判断视频学习是否已经完成过，此顺序为使用adjustmentStepSort调整过
      if (this.courseProgressStatus > 2) {
        this.handleTabsGoTo(2);
      } else {
        // 更新进度到=> 关键词中英测试
        const isPass = await this.handleStudyStatus(2);
        if (isPass) this.handleTabsGoTo(2);
      }
    },

    /**
     * 学习状态
     * -1:未开始  0：视频学习中  1：关键词中英  2：关键词英  3：单元测试中  4：完成  5：关键词中英测试   6：关键词英测试
     */
    async handleStudyStatus(status) {
      const { data: resData } = await this.$post(
        "/course/updateprogresscoursechapterstatus",
        {
          progressid: this.params.progressId,
          courseid: this.params.courseId,
          chapterid: this.params.chapterId,
          status,
        },
        {
          headers: {
            isLoading: true,
          },
        }
      );

      if (!resData.data.status) return false;

      return true;
    },

    /**
     * 获取关键词列表
     */
    async queryCourseWordList(index) {
      if (!this.courseInfo.dcwordsList)
        return this.$message.error("没有关键词，可直接跳过关键词学习！");

      this.loading = true;

      const { data: resData } = await this.$get(
        "/course/getnewdcwordpaperconstlist",
        {
          params: {
            paperid: this.courseInfo.dcwordsList[index].dcwordspaperid,
          },
        }
      );

      if (!resData.data.status) return;

      resData.data.data.forEach((item) => {
        item.playFlip = false;
        item.isPlay = true;
      });

      this.$set(
        this.courseWordList,
        0,
        resData.data.data.map((a) => {
          a.answer = null;
          return a;
        })
      );

      // 直接开始单词测试
      // if (this.$route.query.isWordTest == 1) this.handleQueryClick(0);

      this.loading = false;

      // 开始单词测试
      this.handleQueryClick(0);
    },

    /**
     * 点击-获取匹配列表
     */
    handleQueryClick(index) {
      this.matchingIndex = index;
      this.handleQueryReset();
      // this.handleStudyStatus(5);
    },

    /**
     * 获取匹配列表
     */
    handleQueryPair() {
      if (this.courseWordList[this.matchingIndex].length <= 0)
        return this.$message.error("关键词数量不足，请刷新重试！");

      this.matchingShow = true;
      this.matchingList = [];
      this.matchingTime = 0; //计时显示
      window.clearInterval(this.matchingTimeInterval); //清空匹配计时器

      //原来关键词数据
      let wordList = [...this.courseWordList[this.matchingIndex]];

      //随机生成答案列表
      wordList.forEach((item) => {
        item.answer = null;
        let answerList = [
          {
            id: item.id,
            title: item.btitle,
          },
        ];

        // 去掉重复的选项
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
      this.startTime = formatDateTime(new Date(), "YYYY-MM-DD HH:mm:ss");

      this.handleQueryPair();
    },

    /**
     * 处理关键词-配对提交
     */
    async handleSubmitMatching() {
      this.matchingLoading = true;

      // 更新学习关键词的日期
      updateWordTime();

      // 测试结束时间
      const endTime = formatDateTime(new Date(), "YYYY-MM-DD HH:mm:ss");

      this.passingRate =
        Math.floor(
          (this.matchingCorrectNumber / this.matchingList.length) * 10000
        ) / 100;

      // 向访问记录中添加“测试得分”和“测试完成时间”
      this.$refs.studyHistoryRef.setStudyConst(this.passingRate, endTime);

      const { data: resData } = await this.$post("/course/subwordstestres", {
        category: 0, //中英
        courseid: this.params.courseId,
        chapterid: this.params.chapterId,
        usetime: this.matchingTime, //答题时间，单位秒
        correctcount: this.matchingCorrectNumber, //正确题数
        errorcount: this.matchingErrorNumber, //错误题数
        alldcwordscount: this.matchingList.length, // 总题数
        rightlv: this.passingRate, // 正确率
        startdate: this.startTime, //测试开始时间
        enddate: endTime, //测试结束时间
        progressid: this.params.progressId,
      });

      this.matchingLoading = false;

      if (!resData.data.status) return;

      this.matchingRank = resData.data.rank;
      this.matchingRrrorCount = resData.data.errorCount;

      await this.handleMatchingRanking();
      this.showMatchingRes = true;

      //正确率大于90%可以下一步
      if (this.passingRate >= 90) this.wordNextBtuShow = true;

      // 在关键词(中英文)学习时
      if (this.courseProgressStatus <= 1 && this.matchingRrrorCount == 3) {
        this.$message.error("您已做错3次啦，系统自动跳返回到视频学习！");
        setTimeout(() => {
          this.handleTabsGoTo(0);
        }, 1000);
      }
    },

    /**
     * 处理关键词-配对排行榜
     */
    async handleMatchingRanking() {
      const { data: resData } = await this.$get("/course/getwordranklist", {
        params: {
          category: 0, //中英
          courseid: this.params.courseId,
          chapterid: this.params.chapterId,
          ...this.pages,
        },
        headers: {
          isLoading: true,
        },
      });

      if (!resData.data.status) return;

      this.showMatchingRes = true;

      this.matchingRanking = resData.data.data.rows;

      this.matchingCount = resData.data.data.count;

      this.matchingPage = Math.ceil(this.matchingCount / this.pages.pagesize);
    },

    /**
     * 配对排行榜 - 下一页
     */
    handleMatchingNext() {
      if (this.pages.pageindex < this.matchingPage) this.pages.pageindex++;
      this.handleMatchingRanking();
    },

    /**
     *配对排行榜 - 上一页
     */
    handleMatchingPrev() {
      if (this.pages.pageindex > 0) this.pages.pageindex--;
      this.handleMatchingRanking();
    },

    /**
     * 导航-跳转页面
     *   0：视频学习中  1：关键词中英  2：关键词英  3：单元测试中  4：完成  5：关键词中英测试   6：关键词英测试
     */
    async handleTabsGoTo(type) {
      let name;

      switch (type) {
        case 0:
          // 重学视频
          if (this.courseProgressStatus <= 1) await this.handleStudyStatus(0);
          name = "COURSE_STUDY_VIDEO";
          break;

        case 1:
          name = "COURSE_STUDY_WORD";
          break;

        case 2:
          name = "COURSE_STUDY_WORD_ENGLISH";
          break;

        case 3:
          name = "COURSE_STUDY_TEST";
          break;

        case 5:
          name = "COURSE_STUDY_WORD_TEST";
          break;

        case 6:
          name = "COURSE_STUDY_WORD_ENGLISH_TEST";
          break;
      }

      if (this.$route.name == name) return;

      this.$router.replace({
        name,
        query: {
          courseId: this.params.courseId,
          chapterId: this.params.chapterId,
          progressId: this.params.progressId,
          isReview: this.$route.query.isReview || "",
        },
      });
    },

    /**
     * 跳转页面
     */
    handleGoTo(name) {
      this.$router.push({
        name,
      });
    },

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
  destroyed() {
    window.clearInterval(this.studyTime); //停留时间
  },
};
</script>
