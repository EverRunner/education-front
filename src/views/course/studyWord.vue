<style lang="scss" scope></style>

<template>
  <section>
    <study-head
      :chapteTitle="courseInfo.title"
      :studyProgress="courseProgressStatus"
      :courseId="params.courseId"
      :chapterId="params.chapterId"
      :progressId="params.progressId"
      :nowIndex="1"
    />

    <div class="studys-wp studys-word" v-loading="loading">
      <!-- 翻卡内容 -->
      <div class="studys-word-content">
        <div class="paging">
          <em>{{ courselWordIndex }}</em>
          <span>/{{ courseWordList[0].length }}</span>
        </div>
        <div class="studys-word-swiper">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide swiper-no-swiping"
              v-for="item in courseWordList[0]"
              :key="item.id"
            >
              <ul class="word">
                <li class="word-front" :class="{ front: item.playFlip }">
                  <!-- 正面-翻译播放按钮 -->
                  <div class="word-vector word-vector--front">
                    <i v-if="audioPaly" class="el-icon-loading"></i>
                    <span v-else @click="handlePlayAudio"></span>
                  </div>
                  <!-- 正面-单词 -->
                  <div class="word-front-text" v-html="item.atitle"></div>
                </li>
                <li class="word-back" :class="{ back: item.playFlip }">
                  <!-- 反面-翻译播放按钮 -->
                  <div class="word-vector word-vector--back">
                    <i v-if="audioPaly" class="el-icon-loading"></i>
                    <span v-else @click="handlePlayAudio"></span>
                  </div>
                  <!-- 反面-单词 -->
                  <div class="word-back-text" v-html="item.btitle"></div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- 翻卡按钮区 -->
      <div class="studys-word-btns">
        <el-button
          :disabled="courselWordIndex <= 1"
          size="medium"
          class="el-button--big"
          @click="handleSwiperBtnClick('prev')"
          ><i class="el-icon-arrow-left"></i>上一个</el-button
        >
        <el-button
          size="medium"
          class="el-button--big"
          type="primary"
          @click="handleWordOverturn(0)"
          ><i class="el-icon-refresh-right"></i> 翻面</el-button
        >
        <el-button
          :disabled="lockWordNext"
          size="medium"
          class="el-button--big"
          @click="handleSwiperBtnClick('next')"
          >{{
            courselWordIndex >= courseWordList[0].length
              ? "学习完成"
              : "下一个"
          }}<i
            v-if="courselWordIndex < courseWordList[0].length"
            class="el-icon-arrow-right"
          ></i
        ></el-button>
      </div>

      <!-- 关闭翻译提示 -->
      <el-dialog
        :visible.sync="translateVisible"
        width="350px"
        center
        class="studys-word-translate"
      >
        <div class="content">
          <img src="@/assets/images/studys-word-translate.jpg" alt="" />
          <p>
            请您不要开启谷歌翻译，否则系统可能出现错误，您可能无法看到英文关键词或者英文测试题。
          </p>
          <el-button
            size="medium"
            class="el-button--big"
            type="primary"
            @click="handleTranslatClose"
            >知道了</el-button
          >
          <div class="content-checkbox">
            <el-checkbox v-model="translateChecked">不再显示</el-checkbox>
          </div>
        </div>
      </el-dialog>
    </div>

    <!-- 学习历史记录 -->
    <study-history
      :courseId="params.courseId"
      :chapterId="params.chapterId"
      type="2"
    />

    <!-- 单词播放器 -->
    <audio
      ref="audio"
      style="opacity: 0;display: none;"
      autoplay
      :src="audioSrc"
    >
      您的浏览器不支持 audio 标签。
    </audio>
  </section>
</template>

<script>
import { INTRO_OPTIONS, PAGE_SIZE } from "@config";
import { adjustmentStepSort, formatDateTime } from "@utils/tools";
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
      // 关闭翻译弹窗
      translateVisible: false,
      translateChecked: false,

      courseWordList: [[], []],
      courselWordIndex: 1, // 当前单词的index
      courselWordProgress: 1,

      lockWordNext: true, // 锁住当前的‘下一步’按钮

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
      matchingList: [],
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
    // 翻译提示是否展开
    if (!localStorage.getItem("translat")) this.translateVisible = true;

    //增加学习总时长
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
     * 翻译提示关闭
     */
    async handleTranslatClose() {
      if (this.translateChecked) localStorage.setItem("translat", true);
      this.translateVisible = false;
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

      // 判断是否学习过,学习过直接跳转到 中英测试
      // if (resData.data.data.status > 1) this.handleTabsGoTo(5);
    },

    /**
     * 学习进入下一步
     */
    async handleStudyNext() {
      // 判断视频学习是否已经完成过，此顺序为使用adjustmentStepSort调整过
      if (this.courseProgressStatus > 1) {
        this.handleTabsGoTo(5);
      } else {
        // 更新进度到=> 关键词（中英）测试
        const isPass = await this.handleStudyStatus(5);
        if (isPass) this.handleTabsGoTo(5);
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

      setTimeout(() => {
        this.handleSwiperInit(0);
      }, 100);

      this.loading = false;
    },

    /**
     * 关键词发音
     */
    async handlePlayAudio() {
      let text,
        reg = /<\/?.+?\/?>/g, //排除html标签
        reg2 = /[^a-zA-Z]/g; //获取英文

      if (this.audioPaly) return;

      this.audioPaly = true;

      //判断是那一面
      if (
        this.courseWordList &&
        this.courseWordList[0][this.courselWordIndex - 1] &&
        this.courseWordList[0][this.courselWordIndex - 1].playFlip
      )
        text = this.courseWordList[0][this.courselWordIndex - 1].btitle
          .replace(reg, "")
          .replace(reg2, " ")
          .replace(/nbsp/gi, "");
      else
        text = this.courseWordList[0][this.courselWordIndex - 1].atitle
          .replace(reg, "")
          .replace(reg2, " ")
          .replace(/nbsp/gi, "");

      const { data: resData } = await this.$get("/course/transvoicespeed", {
        params: {
          text,
        },
      });
      if (!resData.data.status) {
        this.audioPaly = false;
        return;
      }

      this.audioSrc = FILE_ROOT + resData.data.path;

      this.$refs.audio.play();

      // 音频文件加载有延时，等待1秒钟
      setTimeout(() => {
        this.audioPaly = false;
      }, 1000);
    },

    /**
     * 处理单词翻转
     */
    handleWordOverturn(key) {
      const index = this.courselWordIndex - 1;

      this.courseWordList[key][index].playFlip = !this.courseWordList[key][
        index
      ].playFlip;
      this.courseWordList[key][index].isPlay = false;

      // 解锁swiper 向右滑动
      this.wordSwiper.unlockSwipeToNext();

      // 解锁下一步的按钮
      this.lockWordNext = false;

      this.courseWordList = [...this.courseWordList];
    },

    /**
     * 初始单词的swiper
     */
    handleSwiperInit(index) {
      this.wordSwiper = new Swiper(".studys-word-swiper", {
        noSwiping: true,
        // 当前slide开始过渡到另一个slide时执行
        onSlideChangeStart: (swiper) => {
          this.courselWordIndex = swiper.activeIndex + 1;

          if (this.courseWordList[index][swiper.activeIndex].isPlay) {
            // 锁定Swiper的向右或下滑动
            this.wordSwiper.lockSwipeToNext();

            // 锁定下一步的按钮
            this.lockWordNext = true;
          }
        },
      });

      // 锁定Swiper的向右或下滑动
      this.wordSwiper.lockSwipeToNext();
    },

    /**
     * 单词的swiper上一步
     */
    handleSwiperBtnClick(type) {
      if (type == "prev") {
        // 向前滑动时，先解锁
        if (this.courselWordIndex > 0) {
          this.courselWordIndex - 1;
          // 解锁Swiper的向右或下滑动
          this.wordSwiper.unlockSwipeToNext();
          // 解锁下一步的按钮
          this.lockWordNext = false;
        }
        this.wordSwiper.slidePrev();
      } else {
        this.wordSwiper.slideNext();

        // 进入最后一个，学习完成了
        if (
          this.lockWordNext == false &&
          this.courseWordList[0].length == this.courselWordIndex
        )
          this.handleStudyNext();
      }
    },

    /**
     * swiper 切换到第一页
     */
    handleSwiperFirst() {
      //  this.wordSwiper
      this.courselWordIndex = 1;

      //重置所有浏览
      this.courseWordList[0].forEach((a) => (a.isPlay = true));

      // this.wordSwiper.slideTo(0, 1000, false);

      setTimeout(() => {
        this.handleSwiperInit(0);
      }, 100);
    },

    /**
     * 导航-跳转页面
     *   0：视频学习中  1：关键词中英  2：关键词英  3：单元测试中  4：完成  5：关键词中英测试   6：关键词英测试
     */
    async handleTabsGoTo(type) {
      let name;

      switch (type) {
        case 0:
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
