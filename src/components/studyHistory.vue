<style lang="scss" scoped></style>

<template>
  <section></section>
</template>

<script>
export default {
  name: "studyHistory",

  props: {
    courseId: [String, Number],

    chapterId: [String, Number],

    type: [String, Number],
  },

  components: {},

  data() {
    return {
      timeoutId: 0, // 延时器id
      studyConstId: null, // 学习历史id
    };
  },

  mounted() {
    // 超过20秒才执行 添加记录
    this.timeoutId = setTimeout(() => {
      this.addStudyConst();
    }, 20 * 1000);
  },

  methods: {
    /**
     * 学习历史
     * 1:视频  2:记单词（中英） 3:记单词（中英）测试   4:记单词（英）  5：记单词（中英）测试   6:单元测试   7.单元测试前关键词
     * 8:我的错题（测前单词） 9:我的错题测试   10:高频错题（测前单词）  11:高频错题测试  12:综合题（测前单词）  13:综合题测试  14:应变测试（测前单词）  15:应变测试
     */
    async addStudyConst() {
      const { data: resData } = await this.$post(
        "/user/creatstudyconst",
        {
          courseid: this.courseId,
          chapterid: this.chapterId,
          category: this.type, // 类型
        },
        {
          headers: {
            isLoading: false,
          },
        }
      );
      if (!resData.data.status) return;

      this.studyConstId = resData.data.id;
    },

    /**
     * 更新学习历史
     */
    setStudyConst(testscore = null, testfinishtime = null) {
      if (!this.studyConstId) return;

      this.$post(
        "/user/updatestudyconst",
        {
          studyid: this.studyConstId,
          testscore,
          testfinishtime,
        },
        {
          headers: {
            isLoading: false,
          },
        }
      );
    },
  },

  /**
   * 页面销毁
   */
  destroyed() {
    this.setStudyConst();
    clearTimeout(this.timeoutId); // 清空延时器
  },
};
</script>
