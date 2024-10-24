<style lang="scss" scope></style>

<template>
  <section class="chapter ">
    <div class="wp">
      <div class="chapter-title">
        <span @click="$router.go(-1)"
          ><i class="el-icon-arrow-left"></i> 返回</span
        >
        <h5>应变测试</h5>
      </div>
      <div class="chapter-list" v-loading="chapterLoading">
        <el-collapse v-model="collapseActive" @change="handleChange">
          <el-collapse-item
            :class="[
              'chapter-list-item',
              { pass: item.progress == 100 },
              { now: item.progress > 0 && item.progress < 100 },
            ]"
            v-for="item in chapterList"
            :key="item.id"
            :name="item.id"
          >
            <template slot="title">
              <div class="chapter-list-title">
                <el-progress
                  type="circle"
                  :percentage="item.progress"
                  :color="
                    item.progress > 0
                      ? progressCustomColorPass
                      : progressCustomColor
                  "
                  :width="42"
                  :stroke-width="3"
                ></el-progress>
                <h5>{{ item.title }}</h5>
              </div>
            </template>
            <ul class="chapter-list-step">
              <li>
                <div class="title">
                  <span>步骤1</span>
                  <h5>英文关键词测试</h5>
                  <p>达成90%正确率完成关键词学习</p>
                </div>
                <div class="btn">
                  <div
                    class="btn-info"
                    v-if="item.word_time && item.progress == 100"
                  >
                    <!-- <i
                      :class="
                        item.word_time >= 90
                          ? 'el-icon-success'
                          : 'el-icon-error'
                      "
                    ></i> -->
                    <i class="el-icon-success"></i>
                    <div class="btn-info-text">
                      <p>
                        {{ item.word_time | formatDate("YYYY-MM-DD") }}
                        <!-- {{
                          item.keyword_test_score_chen >= 90
                            ? "已通过"
                            : "未通过"
                        }} -->
                      </p>
                      <!-- <p>
                        上次分数：
                        {{ item.keyword_test_score_chen }}%
                      </p> -->
                    </div>
                  </div>
                  <el-button
                    v-if="item.progress == 100"
                    class="btn-review"
                    size="medium"
                    @click="handleGoTo(item.id, 'review')"
                    >复习</el-button
                  >
                  <el-button
                    v-else-if="item.progress > 0"
                    class="btn-study"
                    size="medium"
                    type="primary"
                    @click="handleGoTo(item.id)"
                    >学习</el-button
                  >
                  <div v-else class="btn-icon" @click="handleLockHint">
                    <i class="el-icon-lock btn-icon"></i>
                  </div>
                </div>
              </li>
              <li>
                <div class="title">
                  <span>步骤2</span>
                  <h5>章节测试</h5>
                  <p>达成90%正确率完成本章节</p>
                </div>
                <div class="btn">
                  <div
                    class="btn-info"
                    v-if="item.test_time && item.progress >= 50"
                  >
                    <i
                      :class="
                        item.test_score >= 90
                          ? 'el-icon-success'
                          : 'el-icon-error'
                      "
                    ></i>
                    <div class="btn-info-text">
                      <p>
                        {{ item.test_time | formatDate("YYYY-MM-DD") }}
                        {{ item.test_score >= 90 ? "已通过" : "未通过" }}
                      </p>
                      <p>
                        上次分数：
                        {{ item.test_score }}%
                      </p>
                    </div>
                  </div>
                  <el-button
                    v-if="item.progress == 100"
                    class="btn-review"
                    size="medium"
                    @click="handleGoTo(item.id)"
                    >复习</el-button
                  >
                  <el-button
                    v-else-if="item.progress >= 50"
                    class="btn-study"
                    size="medium"
                    type="primary"
                    @click="handleGoTo(item.id)"
                    >学习</el-button
                  >
                  <div v-else class="btn-icon" @click="handleLockHint">
                    <i class="el-icon-lock btn-icon"></i>
                  </div>
                </div>
              </li>
            </ul>
          </el-collapse-item>
        </el-collapse>
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

      courseId: 0,
      courseName: "-",
      chapterList: [{ title: "应变测试（100道/次）", id: 1 }],
      chapterLoading: true,

      collapseActive: [1], // 章节折叠
      userProgress: {}, // 当前进度
    };
  },

  async created() {
    // 同时返回数据
    await this.queryUserProgress();

    this.handleList();
  },

  watch: {},

  mounted() {},

  methods: {
    handleList() {
      if (this.userProgress.status == 1) {
        this.chapterList.forEach((item) => {
          item.progress = 0;
        });

        this.queryUserChapterStudy();
      }

      // 深度设置值
      this.$forceUpdate();
    },

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
      this.chapterLoading = false;
      if (!resData.data.data.status) return;

      this.userProgress = resData.data.data.progress;
    },

    /**
     * 锁住的课程提示
     */
    handleLockHint() {
      this.$alert(
        "您暂未学习完成前面的课程，请完成后再回来学习此内容。",
        "抱歉！您无法学习此内容",
        {
          confirmButtonText: "了解",
          callback: (action) => {},
        }
      );
    },

    /**
     * 获取当前用户章节学习最近详细记录
     */
    async queryUserChapterStudy() {
      let resData = await this.$get("/user/getmembercttestdetaillog");
      if (!resData.data.data.status) return;

      let result = resData.data.data.data[0];
      if (!result) result = {};

      this.chapterList.forEach((item) => {
        item.word_time = result.strain_testbeforekeyword_time;
        item.test_time = result.strain_testbeforeword_time;

        if (result.strain_testbeforeword_score)
          item.test_score =
            Math.floor(result.strain_testbeforeword_score * 1000) / 10;

        // 如果没有做过单元测试，写入 默认为1%的进度
        if (!result.strain_testbeforekeyword_time) item.progress = 1;

        // 有单词的时间，说明已经完成了50%
        if (item.word_time) item.progress = 50;

        // 测试成绩大于90%，说明已经通过了
        if (item.test_score > 90) item.progress = 100;
      });

      // 深度设置值
      this.$forceUpdate();

      // console.log(1111, this.chapterList);
    },

    /**
     * 跳转
     */
    handleGoTo(type) {
      // 未完成全部学习
      if (this.userProgress.status != 1)
        return this.$message.error("所有章节学习完成后，才能测试！");

      // 未复习完成
      // if (!this.reviewMore) return (this.reviewShow = true);

      // 1:我的错题  2.高频易错题库  3.综合测试
      this.$router.push({
        name: "COURSE_STRAIN_TEST",
      });
    },

    handleChange() {},
  },
};
</script>
