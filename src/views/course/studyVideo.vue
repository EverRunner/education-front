<style lang="scss" scope></style>

<template>
  <section>
    <study-head
      :chapteTitle="courseInfo.title"
      :studyProgress="courseProgressStatus"
      :courseId="params.courseId"
      :chapterId="params.chapterId"
      :progressId="params.progressId"
      :nowIndex="0"
      :studyStepList="courseInfo.studyStepList"
    />

    <div class="studys-wp studys-video" v-loading="loading">
      <div class="wp">
        <div class="studys-video-content">
          <iframe
            v-if="courseInfo.videopath"
            :src="courseInfo.videopath"
            width="100%"
            height="100%"
            frameborder="0"
            webkitallowfullscreen
            mozallowfullscreen
            allowfullscreen
            @load="handleIframeLoad"
          ></iframe>
          <p v-else>如果无视频播放，请稍后再试！</p>

          <!-- 视频上方弹出层  -->
          <div class="studys-video-popup" v-if="nextButtonShow">
            <el-button
              @click="nextButtonShow = false"
              class="el-button--big"
              style="width:194px"
              size="medium"
              plain
              >重新观看视频</el-button
            >
            <el-button
              v-if="courseInfo.studystep == '0'"
              @click="handleNextChapter"
              size="medium"
              class="el-button--big"
              style="width:194px"
              type="primary"
              >完成，进入下一章</el-button
            >
            <el-button
              v-else
              @click="handleStudyNext"
              size="medium"
              class="el-button--big"
              style="width:194px"
              type="primary"
              >观看完成，下一步</el-button
            >
          </div>
        </div>
      </div>
    </div>

    <!-- 学习历史记录 -->
    <study-history
      :courseId="params.courseId"
      :chapterId="params.chapterId"
      type="1"
      :key="studyHistoryKey"
    />
  </section>
</template>

<script>
import { INTRO_OPTIONS, PAGE_SIZE } from "@config";
import { adjustmentStepSort } from "@utils/tools";
import { addStudyTime } from "@api/common";
import Swiper from "swiper";
import "swiper/dist/css/swiper.css";
// import Vimeo from "@vimeo/player";
import { reviewCourse } from "@api/common";
import studyHistory from "@comp/studyHistory";
import StudyHead from "./components/StudyHead";

export default {
  components: { studyHistory, StudyHead },

  data() {
    return {
      courseProgressStatus: null, // 当前的进度

      activeName: "video",
      params: {},

      navList: [],

      courseInfo: {
        dcwordsList: [],
        requestPaperList: [],
      },

      loading: true,

      courseProgress: {},

      showContact: false,

      studyTime: null,

      userInfo: JSON.parse(sessionStorage.getItem("userInfo")),

      nextButtonShow: false,

      nextInfo: {},

      studyHistoryKey: Math.random(),
    };
  },

  async created() {
    if (this.$route.query.courseId) {
      this.init(
        this.$route.query.courseId,
        this.$route.query.chapterId,
        this.$route.query.progressId,
        this.$route.query.isInterest,
        this.$route.query.isreview
      );
    }
  },

  watch: {},

  methods: {
    /**
     * 初始化
     */
    async init(courseId, chapterId, progressId, isInterest, isReview) {
      //增加学习总时长
      this.addStudyTimeTimeout();

      if (courseId) {
        this.params.courseId = courseId; //课程id
        this.params.chapterId = chapterId; //章节id
        this.params.progressId = progressId; //总进度id
      }

      await this.queryCourseInfo();

      // 趣味学单词
      if (isInterest) return;

      this.queryCourseProgress();

      // 复习
      if (isReview == 1 && this.courseInfo.isreview == 0)
        await reviewCourse({
          courseid: this.params.courseId,
          chapterid: this.params.chapterId,
          ispay: this.courseInfo.courseObj.type,
          status: 0, // 状态：0：视频学习中  1：视频学习完成 2： 单词中英完成  3：单词英完成  4：单元测试完成（复习完成）
        });
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
      if (!resData.data.status) return;

      let name;
      this.courseInfo = resData.data.data;

      // 学习步骤列表
      this.courseInfo.studyStepList = resData.data.data.studystep
        ? resData.data.data.studystep.split(",")
        : [];

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

      //如果有单词，就增加单词选项
      if (this.courseInfo.dcwordsList.length) {
        this.courseInfo.dcwordsList.forEach((item, index) => {
          if (item.dcwordspaperid && index == 0) {
            this.navList.push({
              id: 2,
              title: "单词练习（中英)",
              type: 1,
            });
            name = "COURSE_STUDY_WORD";
          }

          if (item.dcwordspaperid && index == 1) {
            this.navList.push({
              id: 3,
              title: "单词练习（英)",
              type: 2,
            });
            name = "COURSE_STUDY_WORD_ENGLISH";
          }
        });
      }

      //如果有视频，就增加视频选项
      if (this.courseInfo.videopath) {
        this.navList.push({
          id: 1,
          title: "视频学习",
          type: 0,
        });

        name = null;
      }

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

      this.loading = false;
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

      // 如果只有视频时，并且进度超过视频学习，获取下一节的章节信息
      if (this.courseInfo.studystep == "0" && resData.data.data.status > 0) {
        await this.handleNextProgress(0);
      }

      //判断是否，已经学习过
      if (resData.data.data.status > 0) {
        this.nextButtonShow = true;
      }

      if (resData.data.data.status == -1) {
        this.startsStudyCourse();
        this.handleChapterProgress(0);
        this.handleStudyStatus(0);
      }
    },

    /**
     * 只有视频学习，进入下一章
     */
    handleNextChapter() {
      this.nextButtonShow = false;
      this.studyHistoryKey++;

      this.$router.replace({
        name: "COURSE_STUDY_VIDEO",
        query: {
          courseId: this.nextInfo.nextCourseid,
          chapterId: this.nextInfo.nextChapterid,
          progressId: this.params.progressId,
          isInterest: this.$route.query.isInterest,
          ...(this.courseProgress.status == 4
            ? { isReview: this.$route.query.isreview }
            : {}),
        },
      });
    },

    /**
     * 1-1 开始学习某个课程
     */
    async startsStudyCourse() {
      await this.$post("/course/startstudycourse", {
        progressid: this.params.progressId,
        courseid: this.params.courseId,
      });
    },

    /**
     * 视频播放iframe
     */
    handleIframeLoad() {
      var iframe = document.querySelector("iframe");
      var player = new Vimeo.Player(iframe);

      //视频播放完成，显示'下一步按钮'
      player.on("ended", async () => {
        // 如果本章节只有视频，并且在视频学习中
        if (
          this.courseInfo.studystep == "0" &&
          this.courseProgress.status == 0
        ) {
          await this.handleStudyStatus(4);
          await this.handleNextProgress(1);
          this.nextButtonShow = true;
        } else {
          this.nextButtonShow = true;
        }
      });
    },

    /**
     * 测试成功，重置进度为下一章
     */
    async handleNextProgress(isUpdate) {
      this.loading = true;

      const { data: resData } = await this.$post(
        "/course/getnextcoursechatper",
        {
          progressid: this.params.progressId,
          courseid: this.params.courseId,
          chapterid: this.params.chapterId,
          isupdateprogress: isUpdate, // 是否修改总进度
        }
      );

      this.loading = false;

      if (!resData.data.status) return;

      this.nextInfo = resData.data;
    },

    /**
     * 学习进入下一步
     */
    async handleStudyNext() {
      this.nextButtonShow = false;

      //部分体验权限
      // if (this.userInfo.level <= 0 && this.userInfo.category != 21) {
      //   return (this.showContact = true);
      // }

      //检查下一步的内容
      let status = 1;
      // if (this.courseInfo.requestPaperList[0]) status = 3; //跳测试
      // if (this.courseInfo.dcwordsList[1]) status = 2; // 英
      // if (this.courseInfo.dcwordsList[0]) status = 1; //中英

      // 只有视频的章节
      // if (status == 0) {
      //   return this.$message.error("没有更多了，请返回！");
      // }

      //判断视频学习是否已经完成过
      if (this.courseProgressStatus > 0) {
        this.handleTabsGoTo(status);
      } else {
        const isPass = await this.handleStudyStatus(status);

        if (isPass) this.handleTabsGoTo(status);
      }
    },

    /**
     * 学习状态
     * -1:未开始  0：观看视频中  1：单词中英  2：单词英  3：单元测试中  4：完成  5：单词中英（测试） 6：单词英（测试）
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
     * 修改课程进度状态和信息
     * -1:未开始 0：进行中 1：已完成
     */
    async handleChapterProgress(status) {
      const { data: resData } = await this.$post(
        "/course/updateprogresscoursestatus",
        {
          progressid: this.params.progressId,
          courseid: this.params.courseId,
          currentcoursechapterid: this.params.chapterId,
          status,
        }
      );

      if (!resData.data.status) return;

      // this.handleTabsCut(status);
    },

    /**
     * 导航-跳转页面
     * 0：视频学习中  1：关键词中英  2：关键词英  3：单元测试中  4：完成  5：关键词中英测试   6：关键词英测试
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
    handleGoTo() {
      if (this.userInfo.level == 0)
        this.$router.push({
          name: "COURSE_DETAILS",
        });
      else
        this.$router.push({
          name: "ACCOUNT",
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
    window.clearInterval(this.studyTime); // 停留时间
  },

  beforeRouteUpdate(to, from, next) {
    this.init(
      to.query.courseId,
      to.query.chapterId,
      to.query.progressId,
      to.query.isInterest,
      to.query.isReview
    );
    next();
  },
};
</script>
