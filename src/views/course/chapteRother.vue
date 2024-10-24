<style lang="scss" scope></style>

<template>
  <section class="chapter">
    <div class="wp">
      <div class="chapter-title">
        <span @click="$router.go(-1)"
          ><i class="el-icon-arrow-left"></i> 返回</span
        >
        <h5>{{ courseTypeObj[courseType] }}</h5>
      </div>
      <div class="chapter-list" v-loading="chapterLoading">
        <!-- 趣味学单词/教程视频列表/知识点总结文章列表/解答视频列表 -->
        <div
          class="chapter-next"
          v-for="item in articleList"
          :key="item.id"
          v-show="articleList.length > 0"
        >
          <div class="chapter-next-title">
            <!-- <el-progress
              type="circle"
              :percentage="0"
              :color="progressCustomColor"
              :width="42"
              :stroke-width="3"
            ></el-progress> -->
            <h5>{{ item.title }}</h5>
          </div>

          <!-- 知识点总结 -->
          <div>
            <el-button
              v-if="courseType == 'knowledge'"
              class="btn-study"
              size="medium"
              type="primary"
              plain
              @click="handleDownload(item)"
              >下载</el-button
            >
            <el-button
              class="btn-study"
              size="medium"
              type="primary"
              @click="handleGoToArticle(item)"
              >学习</el-button
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  components: {},

  data() {
    return {
      progressCustomColor: "#004988",
      progressCustomColorPass: "#ffffff",

      id: 0,
      courseType: "interest",
      courseTypeObj: {
        interest: "趣味学单词",
        FAQ: "学员常见问题解答",
        course: "教程系列",
        knowledge: "知识点总结",
        vocabulary: "必考专业词汇汇总（磨耳朵版）",
        newCourse: "易北新课程视频抢先看",
      },
      chapterList: [],
      chapterLoading: true,

      articleList: [],
      userProgress: {}, // 当前进度
    };
  },

  async created() {
    if (this.$route.query.id) this.id = this.$route.query.id;
    if (this.$route.query.type) this.courseType = this.$route.query.type;
    this.queryArticleList();
  },

  watch: {},

  mounted() {},

  methods: {
    /**
     * 获取用户学习进度（付费的）
     * （0：试听进度，1：付费进度）默认是1：付费进度
     */
    async queryUserProgress() {
      let resData = await this.$get("/course/getuserprogress", {
        params: {
          type: 1,
        },
      });
      if (!resData.data.data.status) return;

      this.userProgress = resData.data.data.progress;
    },
    /**
     * 获取课程列表
     */
    async queryCourseList() {
      const { data: resData } = await this.$get(
        "/course/getcoursechapterlist",
        {
          params: { courseid: this.id },
        }
      );
      this.chapterLoading = false;
      if (!resData.data.status) return;

      this.chapterList = resData.data.dataList;
    },

    /**
     * 获取文章列表
     */
    async queryArticleList() {
      const { data: resData } = await this.$get("/content/getcontentpagelist", {
        params: { category: this.id },
      });
      this.chapterLoading = false;
      if (!resData.data.status) return;

      this.articleList = resData.data.data.rows;
    },

    /**
     * 跳转到趣味学单词
     */
    handleGoToArticle(row) {
      switch (this.courseType) {
        case "knowledge":
          this.$router.push({
            name: "ARTICLE_DETAILS",
            query: {
              id: row.id,
              courseType: this.courseType,
            },
          });
          break;

        default:
          this.$router.push({
            name: "ARTICLE_EXPLAIN_VIDEO",
            query: {
              id: row.id,
              courseType: this.courseType,
            },
          });
          break;
      }
    },

    /**
     * 处理知识点下载
     */
    handleDownload(row) {
      if (!row.description) return;

      window.open(row.description);
    },
  },
};
</script>
