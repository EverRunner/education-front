<style lang="scss" scope></style>

<template>
  <section class="chapter ">
    <div class="wp">
      <div class="chapter-title">
        <span class="hidden-xs-only" @click="$router.go(-1)"
          ><i class="el-icon-arrow-left "></i> 返回</span
        >
        <h5>{{ courseName }}</h5>
      </div>
      <div class="chapter-list" v-loading="chapterLoading">
        <el-collapse v-model="collapseActive" @change="handleCollapseChange">
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
              <li
                v-for="(stepItem, stepIndex) in item.studyStepList"
                :key="stepIndex"
              >
                <template v-if="stepItem == 0">
                  <div class="title">
                    <span>步骤{{ stepIndex + 1 }}</span>
                    <h5>视频课程</h5>
                    <p>观看视频</p>
                  </div>
                  <div class="btn">
                    <div class="btn-loading" v-if="item.loading">
                      <i class="el-icon-loading"></i>
                    </div>
                    <div class="btn-info" v-else-if="item.lastVideotime">
                      <i class="el-icon-success"></i>
                      <div class="btn-info-text">
                        <p>
                          {{ item.lastVideotime | formatDate("YYYY-MM-DD") }}
                          已完成
                        </p>
                      </div>
                    </div>
                    <el-button
                      v-if="item.progress == 100 || item.stepflag > 0"
                      class="btn-review"
                      size="medium"
                      @click="handleGoToStudy(item, 0, 'review')"
                      >复习</el-button
                    >
                    <el-button
                      v-else-if="item.progress > 0 && item.stepflag == 0"
                      class="btn-study"
                      size="medium"
                      type="primary"
                      @click="handleGoToStudy(item, 0)"
                      >学习</el-button
                    >
                    <div v-else class="btn-icon" @click="handleLockHint">
                      <i class="el-icon-lock btn-icon"></i>
                    </div>
                  </div>
                </template>

                <template v-if="stepItem == 1">
                  <div class="title">
                    <span>步骤{{ stepIndex + 1 }}</span>
                    <h5>中英文关键词卡</h5>
                    <p>翻卡学习</p>
                  </div>
                  <div class="btn">
                    <div class="btn-loading" v-if="item.loading">
                      <i class="el-icon-loading"></i>
                    </div>
                    <div class="btn-info" v-if="item.keyword_study_chen">
                      <i class="el-icon-success"></i>
                      <div class="btn-info-text">
                        <p>
                          {{
                            item.keyword_study_chen | formatDate("YYYY-MM-DD")
                          }}
                          已完成
                        </p>
                      </div>
                    </div>
                    <el-button
                      v-if="item.progress == 100 || item.stepflag > 1"
                      class="btn-review"
                      size="medium"
                      @click="handleGoToStudy(item, 1, 'review')"
                      >复习</el-button
                    >
                    <el-button
                      v-else-if="item.progress > 0 && item.stepflag == 1"
                      class="btn-study"
                      size="medium"
                      type="primary"
                      @click="handleGoToStudy(item, 1)"
                      >学习</el-button
                    >
                    <div v-else class="btn-icon" @click="handleLockHint">
                      <i class="el-icon-lock btn-icon"></i>
                    </div></div
                ></template>

                <template v-if="stepItem == 2"
                  ><div class="title">
                    <span>步骤{{ stepIndex + 1 }}</span>
                    <h5>中英文关键词测试</h5>
                    <p>达成90%正确率解锁下一步</p>
                  </div>
                  <div class="btn">
                    <div class="btn-loading" v-if="item.loading">
                      <i class="el-icon-loading"></i>
                    </div>
                    <div class="btn-info" v-if="item.keyword_test_score_chen">
                      <i
                        :class="
                          item.keyword_test_score_chen >= 90
                            ? 'el-icon-success'
                            : 'el-icon-error'
                        "
                      ></i>
                      <div class="btn-info-text">
                        <p>
                          {{
                            item.keyword_test_chen | formatDate("YYYY-MM-DD")
                          }}
                          {{
                            item.keyword_test_score_chen >= 90
                              ? "已通过"
                              : "未通过"
                          }}
                        </p>
                        <p>
                          上次分数：
                          {{ item.keyword_test_score_chen }}%
                        </p>
                      </div>
                    </div>
                    <el-button
                      v-if="item.progress == 100 || item.stepflag > 2"
                      class="btn-review"
                      size="medium"
                      @click="handleGoToStudy(item, 2, 'review')"
                      >复习</el-button
                    >
                    <el-button
                      v-else-if="item.progress > 0 && item.stepflag == 2"
                      class="btn-study"
                      size="medium"
                      type="primary"
                      @click="handleGoToStudy(item, 2)"
                      >学习</el-button
                    >
                    <div v-else class="btn-icon" @click="handleLockHint">
                      <i class="el-icon-lock btn-icon"></i>
                    </div></div
                ></template>

                <template v-if="stepItem == 3">
                  <div class="title">
                    <span>步骤{{ stepIndex + 1 }}</span>
                    <h5>英文关键词卡</h5>
                    <p>翻卡学习</p>
                  </div>
                  <div class="btn">
                    <div class="btn-loading" v-if="item.loading">
                      <i class="el-icon-loading"></i>
                    </div>
                    <div class="btn-info" v-if="item.keyword_study_en">
                      <i class="el-icon-success"></i>
                      <div class="btn-info-text">
                        <p>
                          {{ item.keyword_study_en | formatDate("YYYY-MM-DD") }}
                          已完成
                        </p>
                      </div>
                    </div>
                    <el-button
                      v-if="item.progress == 100 || item.stepflag > 3"
                      class="btn-review"
                      size="medium"
                      @click="handleGoToStudy(item, 3, 'review')"
                      >复习</el-button
                    >
                    <el-button
                      v-else-if="item.progress > 0 && item.stepflag == 3"
                      class="btn-study"
                      size="medium"
                      type="primary"
                      @click="handleGoToStudy(item, 3)"
                      >学习</el-button
                    >
                    <div v-else class="btn-icon" @click="handleLockHint">
                      <i class="el-icon-lock btn-icon"></i>
                    </div></div
                ></template>

                <template v-if="stepItem == 4"
                  ><div class="title">
                    <span>步骤{{ stepIndex + 1 }}</span>
                    <h5>英文关键词测试</h5>
                    <p>达成90%正确率完成关键词学习</p>
                  </div>
                  <div class="btn">
                    <div class="btn-loading" v-if="item.loading">
                      <i class="el-icon-loading"></i>
                    </div>
                    <div class="btn-info" v-if="item.keyword_test_score_en">
                      <i
                        :class="
                          item.keyword_test_score_en >= 90
                            ? 'el-icon-success'
                            : 'el-icon-error'
                        "
                      ></i>
                      <div class="btn-info-text">
                        <p>
                          {{ item.keyword_test_en | formatDate("YYYY-MM-DD") }}
                          {{
                            item.keyword_test_score_en >= 90
                              ? "已通过"
                              : "未通过"
                          }}
                        </p>
                        <p>
                          上次分数：
                          {{ item.keyword_test_score_en }}%
                        </p>
                      </div>
                    </div>
                    <el-button
                      v-if="item.progress == 100 || item.stepflag > 4"
                      class="btn-review"
                      size="medium"
                      @click="handleGoToStudy(item, 4, 'review')"
                      >复习</el-button
                    >
                    <el-button
                      v-else-if="item.progress > 0 && item.stepflag == 4"
                      class="btn-study"
                      size="medium"
                      type="primary"
                      @click="handleGoToStudy(item, 4)"
                      >学习</el-button
                    >
                    <div v-else class="btn-icon" @click="handleLockHint">
                      <i class="el-icon-lock btn-icon"></i>
                    </div></div
                ></template>

                <template v-if="stepItem == 5">
                  <div class="title">
                    <span>步骤{{ stepIndex + 1 }}</span>
                    <h5>章节测试</h5>
                    <p>达成90%正确率完成本章节</p>
                  </div>

                  <div class="btn" v-if="item.isfinal == 1">
                    <div class="btn-loading" v-if="item.loading">
                      <i class="el-icon-loading"></i>
                    </div>
                    <el-button
                      v-if="item.progress == 100"
                      class="btn-review"
                      size="medium"
                      @click="handleGoToStudy(item, 5, 'review')"
                      >复习</el-button
                    >
                    <el-button
                      v-else-if="item.progress > 0"
                      class="btn-study"
                      size="medium"
                      type="primary"
                      @click="handleGoToStudy(item, 5)"
                      >学习</el-button
                    >
                    <div v-else class="btn-icon" @click="handleLockHint">
                      <i class="el-icon-lock btn-icon"></i>
                    </div>
                  </div>
                  <div class="btn" v-else>
                    <div class="btn-loading" v-if="item.loading">
                      <i class="el-icon-loading"></i>
                    </div>
                    <div
                      class="btn-info"
                      v-if="
                        item.uni_test_en &&
                          (item.progress == 100 ||
                            (item.progress > 0 && item.stepflag > 5))
                      "
                    >
                      <i
                        :class="
                          item.uni_test_score_en >= 90
                            ? 'el-icon-success'
                            : 'el-icon-error'
                        "
                      ></i>
                      <div class="btn-info-text">
                        <p>
                          {{ item.uni_test_en | formatDate("YYYY-MM-DD") }}
                          {{
                            item.uni_test_score_en >= 90 ? "已通过" : "未通过"
                          }}
                        </p>
                        <p>
                          上次分数：
                          {{ item.uni_test_score_en }}%
                        </p>
                      </div>
                    </div>
                    <el-button
                      v-if="item.progress == 100 && handleIsTest(item)"
                      class="btn-review"
                      size="medium"
                      @click="handleGoToStudy(item, 5, 'review')"
                      >复习</el-button
                    >
                    <div
                      v-else-if="item.progress == 100"
                      class="btn-icon"
                      @click="handleIsTestHint"
                    >
                      <i class="el-icon-lock btn-icon"></i>
                    </div>
                    <el-button
                      v-else-if="item.progress > 0 && item.stepflag == 5"
                      class="btn-study"
                      size="medium"
                      type="primary"
                      @click="handleGoToStudy(item, 5)"
                      >学习</el-button
                    >
                    <div v-else class="btn-icon" @click="handleLockHint">
                      <i class="el-icon-lock btn-icon"></i>
                    </div>
                  </div>
                </template>
              </li>
            </ul>
          </el-collapse-item>
        </el-collapse>
      </div>

      <!-- 已完成当前课程，下一个课程 -->
      <!-- <div class="chapter-divider">
        <el-divider>已完成「新增测试题」</el-divider>
      </div>
      <div class="chapter-next-course">下一个课程：</div>
      <div class="chapter-next">
        <div class="chapter-next-title">
          <el-progress
            type="circle"
            :percentage="0"
            :color="progressCustomColor"
            :width="42"
            :stroke-width="3"
          ></el-progress>
          <h5>测前评估</h5>
        </div>
        <el-button class="btn-study" size="medium" type="primary"
          >学习</el-button
        >
      </div> -->
    </div>
  </section>
</template>

<script>
import { adjustmentStepSort } from "@utils/tools";

export default {
  components: {},

  data() {
    return {
      progressCustomColor: "#004988",
      progressCustomColorPass: "#ffffff",

      courseId: 0,
      courseName: "-",
      chapterList: [],
      chapterLoading: true,

      collapseActive: "", // 章节折叠
      userProgress: {}, // 当前进度
    };
  },

  async created() {
    if (this.$route.query.courseId) this.courseId = this.$route.query.courseId;
    if (this.$route.query.courseName)
      this.courseName = this.$route.query.courseName;

    // 同时返回数据
    await this.queryUserProgress();
    await this.queryChapterList();
    this.queryUserChapterStudy(this.collapseActive);
  },

  watch: {},

  mounted() {},

  methods: {
    /**
     * 获取章节列表
     */
    async queryChapterList() {
      const { data: resData } = await this.$get(
        "/course/getcoursechapterlist",
        {
          params: { courseid: this.courseId },
        }
      );
      this.chapterLoading = false;
      if (!resData.data.status) return;

      let nowIsStudy = 1; // 当前是否学习过
      this.chapterList = resData.data.dataList.map((item) => {
        // 获取当前章节下的学习步骤列表
        item.studyStepList = item.studystep ? item.studystep.split(",") : [];

        // 进度百分比 // 100 除以 步骤长度 ，约等于 14.28。  共有6+1个步骤
        // const percentPercent = (100 / (item.studyStepList.length + 1)).toFixed(
        //   1
        // );

        // 查找当前课程
        if (item.id === this.userProgress.currentcoursechapterid) {
          const stepflag = adjustmentStepSort(this.userProgress.stepflag);
          nowIsStudy = 0;
          // 进度百分比 // 100 除以 步骤长度 ，约等于 14.28。  共有6+1个步骤
          item.progress = Math.round((stepflag || 1) * 14.28);
          item.stepflag = stepflag;
        }

        // 已经学课程
        if (
          this.userProgress.status == 1 ||
          (nowIsStudy && this.courseId <= this.userProgress.currentcourseid)
        ) {
          item.progress = 100;
          item.stepflag = adjustmentStepSort(6);
        }

        // 课程名字中包含（只有题目）的，也只有测试，所以他和章节终章一样
        if (item.title.indexOf("只有题目") >= 0) item.isfinal = 1;

        return item;
      });
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
      if (!resData.data.data.status) return;

      this.userProgress = resData.data.data.progress;
      this.collapseActive = this.userProgress.currentcoursechapterid;
    },

    /**
     * 获取当前用户章节学习最近详细记录
     */
    async queryUserChapterStudy(chapterid) {
      let resData = await this.$get("/user/getmemberchapterdetaillog", {
        params: {
          chapterid,
        },
      });
      if (!resData.data.data.status) return;
      let result = resData.data.data.data[0];

      if (!result) result = {};

      this.chapterList.forEach((item) => {
        if (item.id == chapterid) {
          item.loading = false; // 取消加载

          item.lastVideotime = result.lastVideotime; // 最后一次视频学习时间

          item.keyword_study_chen = result.keyword_study_chen; // 中英文关键词卡最近一次完成时间
          item.keyword_test_chen = result.keyword_test_chen; // 中英文关键词测试最近一次完成时间
          if (result.keyword_test_score_chen)
            item.keyword_test_score_chen = (
              result.keyword_test_score_chen * 100
            ).toFixed(1); // 中英文关键词测试最近一次完成得分

          item.keyword_study_en = result.keyword_study_en; // 英文关键词学习最近一次完成时间
          item.keyword_test_en = result.keyword_test_en; // 英文关键词测试最近一次完成完成时间
          if (result.keyword_test_score_en)
            item.keyword_test_score_en = (
              result.keyword_test_score_en * 100
            ).toFixed(1); // 英文关键词测试最近一次完成得分

          item.uni_test_en = result.uni_test_en; // 章节测试的最近一次完成时间
          if (result.uni_test_score_en)
            item.uni_test_score_en = (result.uni_test_score_en * 100).toFixed(
              1
            ); // 章节测试的最近一次完成得分
        }
      });

      // 深度设置值
      this.$forceUpdate();
    },

    /**
     * 是否可以测试（必须通过 英文关键词测试 后，才能单元测试）
     */
    handleIsTest(row) {
      const reviewIdList = sessionStorage.getItem("reviewIdList") || "";

      return reviewIdList.indexOf(row.id) > -1;
    },

    /**
     * 提示 信息
     */
    handleIsTestHint() {
      this.$alert(
        "复习时，请先通过步骤5 英文关键词测试",
        "抱歉！您无法复习此内容",
        {
          confirmButtonText: "了解",
          callback: (action) => {},
        }
      );
    },

    /**
     * 跳转到学习页面
     */
    handleGoToStudy(row, index, isReview) {
      let name, isWordTest;

      switch (index) {
        case 0:
          name = "COURSE_STUDY_VIDEO";
          break;

        case 1:
          name = "COURSE_STUDY_WORD";
          break;

        case 2:
          name = "COURSE_STUDY_WORD_TEST";

          break;

        case 3:
          name = "COURSE_STUDY_WORD_ENGLISH";
          break;

        case 4:
          name = "COURSE_STUDY_WORD_ENGLISH_TEST";

          break;

        case 5:
          name = "COURSE_STUDY_TEST";
          break;

        default:
          name = "COURSE_STUDY_VIDEO";
          break;
      }

      this.$router.push({
        name,
        query: {
          courseId: this.courseId,
          chapterId: row.id,
          progressId: this.userProgress.id,
          isReviewWordTest: isReview == "review" ? 1 : 0,
        },
      });
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
     * 锁住的课程提示
     */
    handleCollapseChange(ids) {
      if (!ids) return;

      this.chapterList.forEach((item) => {
        if (
          ids.indexOf(item.id) != -1 &&
          !item.lastVideotime &&
          !item.uni_test_en &&
          item.id <= this.userProgress.currentcoursechapterid
        ) {
          item.loading = true;
          this.queryUserChapterStudy(item.id);
        }
      });

      // 深度设置值
      this.$forceUpdate();
    },
  },
};
</script>
