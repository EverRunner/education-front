<style lang="scss" scope></style>

<template>
  <section class="details" v-loading="loading">
    <div class="wp">
      <!-- 联邦按摩辅导课程 -->
      <div class="account-title">
        <img
          src="@/assets/images/hoem-xulaoshi.png"
          class="hidden-md-and-down"
          alt=""
        />
        <h1>联邦按摩辅导课程</h1>
        <p>
          {{ statistics.paycount || "-" }}人学过
          <el-rate
            v-model="avScore"
            disabled
            style="margin: 0 4px 0 8px;"
          ></el-rate>
          {{ avScore }}分
          <em @click="handleGoToRenew">{{
            userInfo.level >= 1 ? "立即续费" : "立即购买"
          }}</em>
        </p>
      </div>

      <!-- 倒计时 -->
      <div class="details-time">
        <el-row :gutter="24">
          <el-col class="details-time-count" :xs="24" :sm="24" :md="8" :lg="8">
            <div class="text">早鸟倒数</div>
            <ul class="time">
              <li>
                <span>{{ letTimes.day }}</span
                ><em>天</em>
              </li>
              <li>
                <span>{{ letTimes.hour }}</span
                ><em>时</em>
              </li>
              <li>
                <span>{{ letTimes.minute }}</span
                ><em>分</em>
              </li>
              <li>
                <span>{{ letTimes.second }}</span
                ><em>秒</em>
              </li>
            </ul>
          </el-col>
          <el-col class="details-time-price" :xs="24" :sm="24" :md="8" :lg="8">
            <p>
              {{ userInfo.level >= 1 ? "课程续费" : "课程售价"
              }}<em class="on"
                >${{ userInfo.level >= 1 ? "399.00" : "1999.00" }}</em
              >
            </p>
            <p>
              早鸟特惠<em
                >${{ userInfo.level >= 1 ? "200.00" : "1199.00" }}
              </em>
            </p>
          </el-col>
          <el-col class="details-time-btn" :xs="24" :sm="24" :md="8" :lg="8">
            <el-button
              @click="handleGoToRenew"
              style="width: 65%;"
              type="danger"
              class="el-button--big"
              >{{ userInfo.level >= 1 ? "立即续费" : "立即购买" }}</el-button
            >
          </el-col>
        </el-row>
      </div>

      <!-- 主要内容 -->
      <div class="details-content">
        <el-row :gutter="24">
          <el-col :xs="24" :sm="24" :md="16" :lg="16">
            <!-- PDF下载 -->
            <div class="details-content-pdf">
              <h2>精美 PDF 辅助教材</h2>
              <div class="list">
                <h5><i class="el-icon-document"></i>知识点总结</h5>
                <el-button
                  type="danger"
                  @click="handleGoTorother('knowledge', 12)"
                  >下载</el-button
                >
              </div>
            </div>
            <!-- 试听课程 -->
            <div class="details-content-audition" v-loading="freeCoureLoading">
              <h2>试听课程</h2>
              <ul class="chapter-list-step">
                <li>
                  <div class="title">
                    <span>步骤1</span>
                    <h5>解剖学简介</h5>
                    <p>观看视频</p>
                  </div>
                  <div class="btn">
                    <div class="btn-loading" v-if="freeLoading">
                      <i class="el-icon-loading"></i>
                    </div>
                    <div
                      class="btn-info"
                      v-else-if="freeCourseTwo.lastVideotime"
                    >
                      <i class="el-icon-success"></i>
                      <div class="btn-info-text">
                        <p>
                          {{
                            freeCourseTwo.lastVideotime
                              | formatDate("YYYY-MM-DD")
                          }}
                          已完成
                        </p>
                      </div>
                    </div>
                    <el-button
                      v-if="stepFlag > 0"
                      class="btn-review"
                      size="medium"
                      @click="handleGoToStudy(0, 'review', 86)"
                      >复习</el-button
                    >
                    <el-button
                      v-else
                      class="btn-study"
                      size="medium"
                      type="warning"
                      @click="handleGoToStudy(0, '', 86)"
                      >学习</el-button
                    >
                  </div>
                </li>
                <li>
                  <div class="title">
                    <span>步骤2</span>
                    <h5>躯干骨骼</h5>
                    <p>观看视频</p>
                  </div>
                  <div class="btn">
                    <div class="btn-loading" v-if="freeLoading">
                      <i class="el-icon-loading"></i>
                    </div>
                    <div
                      class="btn-info"
                      v-else-if="freeCourse.lastVideotime && stepFlag > 0"
                    >
                      <i class="el-icon-success"></i>
                      <div class="btn-info-text">
                        <p>
                          {{
                            freeCourse.lastVideotime | formatDate("YYYY-MM-DD")
                          }}
                          已完成
                        </p>
                      </div>
                    </div>
                    <el-button
                      v-if="
                        stepFlag > 0 &&
                          freeUserProgress.currentcoursechapterid == 96
                      "
                      class="btn-review"
                      size="medium"
                      @click="handleGoToStudy(0, 'review')"
                      >复习</el-button
                    >
                    <el-button
                      v-else-if="
                        stepFlag == 0 &&
                          freeUserProgress.currentcoursechapterid == 96
                      "
                      class="btn-study"
                      size="medium"
                      type="warning"
                      @click="handleGoToStudy(0)"
                      >学习</el-button
                    >
                    <div v-else class="btn-icon" @click="handleLockHint">
                      <i class="el-icon-lock btn-icon"></i>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="title">
                    <span>步骤3</span>
                    <h5>中英文关键词卡</h5>
                    <p>翻卡学习</p>
                  </div>
                  <div class="btn">
                    <div class="btn-loading" v-if="freeLoading">
                      <i class="el-icon-loading"></i>
                    </div>
                    <div
                      class="btn-info"
                      v-if="freeCourse.keyword_study_chen && stepFlag > 1"
                    >
                      <i class="el-icon-success"></i>
                      <div class="btn-info-text">
                        <p>
                          {{
                            freeCourse.keyword_study_chen
                              | formatDate("YYYY-MM-DD")
                          }}
                          已完成
                        </p>
                      </div>
                    </div>
                    <el-button
                      v-if="
                        stepFlag > 1 &&
                          freeUserProgress.currentcoursechapterid == 96
                      "
                      class="btn-review"
                      size="medium"
                      @click="handleGoToStudy(1, 'review')"
                      >复习</el-button
                    >
                    <el-button
                      v-else-if="
                        stepFlag == 1 &&
                          freeUserProgress.currentcoursechapterid == 96
                      "
                      class="btn-study"
                      size="medium"
                      type="warning"
                      @click="handleGoToStudy(1)"
                      >学习</el-button
                    >
                    <div v-else class="btn-icon" @click="handleLockHint">
                      <i class="el-icon-lock btn-icon"></i>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="title">
                    <span>步骤4</span>
                    <h5>中英文关键词测试</h5>
                    <p>达成90%正确率解锁下一步</p>
                  </div>
                  <div class="btn">
                    <div class="btn-loading" v-if="freeLoading">
                      <i class="el-icon-loading"></i>
                    </div>
                    <div
                      class="btn-info"
                      v-if="freeCourse.keyword_test_score_chen && stepFlag > 2"
                    >
                      <i
                        :class="
                          freeCourse.keyword_test_score_chen >= 90
                            ? 'el-icon-success'
                            : 'el-icon-error'
                        "
                      ></i>
                      <div class="btn-info-text">
                        <p>
                          {{
                            freeCourse.keyword_test_chen
                              | formatDate("YYYY-MM-DD")
                          }}
                          {{
                            freeCourse.keyword_test_score_chen >= 90
                              ? "已通过"
                              : "未通过"
                          }}
                        </p>
                        <p>
                          上次分数：
                          {{ freeCourse.keyword_test_score_chen }}%
                        </p>
                      </div>
                    </div>
                    <el-button
                      v-if="
                        stepFlag > 2 &&
                          freeUserProgress.currentcoursechapterid == 96
                      "
                      class="btn-review"
                      size="medium"
                      @click="handleGoToStudy(2, 'review')"
                      >复习</el-button
                    >
                    <el-button
                      v-else-if="
                        stepFlag == 2 &&
                          freeUserProgress.currentcoursechapterid == 96
                      "
                      class="btn-study"
                      size="medium"
                      type="warning"
                      @click="handleGoToStudy(2)"
                      >学习</el-button
                    >
                    <div v-else class="btn-icon" @click="handleLockHint">
                      <i class="el-icon-lock btn-icon"></i>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="title">
                    <span>步骤5</span>
                    <h5>英文关键词卡</h5>
                    <p>翻卡学习</p>
                  </div>
                  <div class="btn">
                    <div class="btn-loading" v-if="freeLoading">
                      <i class="el-icon-loading"></i>
                    </div>
                    <div
                      class="btn-info"
                      v-if="freeCourse.keyword_study_en && stepFlag > 3"
                    >
                      <i class="el-icon-success"></i>
                      <div class="btn-info-text">
                        <p>
                          {{
                            freeCourse.keyword_study_en
                              | formatDate("YYYY-MM-DD")
                          }}
                          已完成
                        </p>
                      </div>
                    </div>
                    <el-button
                      v-if="
                        stepFlag > 3 &&
                          freeUserProgress.currentcoursechapterid == 96
                      "
                      class="btn-review"
                      size="medium"
                      @click="handleGoToStudy(3, 'review')"
                      >复习</el-button
                    >
                    <el-button
                      v-else-if="
                        stepFlag == 3 &&
                          freeUserProgress.currentcoursechapterid == 96
                      "
                      class="btn-study"
                      size="medium"
                      type="warning"
                      @click="handleGoToStudy(3)"
                      >学习</el-button
                    >
                    <div v-else class="btn-icon" @click="handleLockHint">
                      <i class="el-icon-lock btn-icon"></i>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="title">
                    <span>步骤6</span>
                    <h5>英文关键词测试</h5>
                    <p>达成90%正确率完成关键词学习</p>
                  </div>
                  <div class="btn">
                    <div class="btn-loading" v-if="freeLoading">
                      <i class="el-icon-loading"></i>
                    </div>
                    <div
                      class="btn-info"
                      v-if="freeCourse.keyword_test_en && stepFlag > 4"
                    >
                      <i
                        :class="
                          freeCourse.keyword_test_score_en >= 90
                            ? 'el-icon-success'
                            : 'el-icon-error'
                        "
                      ></i>
                      <div class="btn-info-text">
                        <p>
                          {{
                            freeCourse.keyword_test_en
                              | formatDate("YYYY-MM-DD")
                          }}
                          {{
                            freeCourse.keyword_test_score_en >= 90
                              ? "已通过"
                              : "未通过"
                          }}
                        </p>
                        <p>
                          上次分数：
                          {{ freeCourse.keyword_test_score_en }}%
                        </p>
                      </div>
                    </div>
                    <el-button
                      v-if="
                        stepFlag > 4 &&
                          freeUserProgress.currentcoursechapterid == 96
                      "
                      class="btn-review"
                      size="medium"
                      @click="handleGoToStudy(4, 'review')"
                      >复习</el-button
                    >
                    <el-button
                      v-else-if="
                        stepFlag == 4 &&
                          freeUserProgress.currentcoursechapterid == 96
                      "
                      class="btn-study"
                      size="medium"
                      type="warning"
                      @click="handleGoToStudy(4)"
                      >学习</el-button
                    >
                    <div v-else class="btn-icon" @click="handleLockHint">
                      <i class="el-icon-lock btn-icon"></i>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="title">
                    <span>步骤7</span>
                    <h5>章节测试</h5>
                    <p>达成90%正确率完成本章节</p>
                  </div>
                  <div class="btn">
                    <div class="btn-loading" v-if="freeLoading">
                      <i class="el-icon-loading"></i>
                    </div>
                    <div
                      class="btn-info"
                      v-if="freeCourse.uni_test_score_en && stepFlag > 5"
                    >
                      <i
                        :class="
                          freeCourse.uni_test_score_en >= 90
                            ? 'el-icon-success'
                            : 'el-icon-error'
                        "
                      ></i>
                      <div class="btn-info-text">
                        <p>
                          {{
                            freeCourse.uni_test_en | formatDate("YYYY-MM-DD")
                          }}
                          {{
                            freeCourse.uni_test_score_en >= 90
                              ? "已通过"
                              : "未通过"
                          }}
                        </p>
                        <p>
                          上次分数：
                          {{ freeCourse.uni_test_score_en }}%
                        </p>
                      </div>
                    </div>

                    <el-button
                      v-if="
                        stepFlag > 5 &&
                          handleIsTest({
                            id: 96,
                          }) &&
                          freeUserProgress.currentcoursechapterid == 96
                      "
                      class="btn-review"
                      size="medium"
                      @click="handleGoToStudy(5, 'review')"
                      >复习</el-button
                    >
                    <el-button
                      v-else-if="
                        stepFlag == 5 &&
                          freeUserProgress.currentcoursechapterid == 96
                      "
                      class="btn-study"
                      size="medium"
                      type="warning"
                      @click="handleGoToStudy(5)"
                      >学习</el-button
                    >
                    <div v-else class="btn-icon" @click="handleLockHint">
                      <i class="el-icon-lock btn-icon"></i>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <!-- 课程表 -->
            <div class="account-content-left">
              <course-tabs
                v-if="courseList.length > 0 && freeUserProgress.id"
                :courseArray="courseList"
                :userProgress="freeUserProgress"
              />
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8" :lg="8">
            <div class="details-content-xls">
              <div class="thumb">
                <img src="@assets/images/details-xls.png" alt="" />
              </div>
              <h5>张老师</h5>
              <p>
                张老师自2018年底接触联邦考试辅导行业以来，从小白开始入手，在如何快速掌握题意、背诵关键词方面拥有丰富的经验。因为授课诙谐幽默，善于激发学员的学习兴趣，并且认真负责，及时而耐心地解答学员的问题，深受学员的爱戴和信任。
              </p>
            </div>
            <div
              v-for="item in evaluateList"
              :key="item.id"
              class="details-content-evaluate"
              v-loading="evaluateLoading"
            >
              <el-rate v-model="item.score" disabled></el-rate>
              <h4>
                {{ item.content }}
              </h4>
              <h5>{{ item.yibei_member && item.yibei_member.username }}</h5>
              <h6>{{ item.kaoshidate || "-" }}</h6>
              <p>
                总学习时长：
                {{ item.yibei_member && item.yibei_member.logincount }}天
              </p>
              <p>
                每天学习时长：
                {{
                  Math.floor(
                    ((item.yibei_member.allstudytime || 0) /
                      3600 /
                      (item.yibei_member.logincount || 10)) *
                      10
                  ) / 10
                }}时
              </p>
              <p>年龄：{{ item.agedis ? item.agedis + "岁" : "保密" }}</p>
              <p>英文水平：{{ item.enlevel }}</p>
              <div class="pages">
                <el-pagination
                  small
                  background
                  layout="prev, pager, next"
                  :total="total"
                  @current-change="handleCurrentChange"
                  :current-page="pages.pageindex"
                  :page-size="pages.pagesize"
                >
                </el-pagination>
              </div>
            </div>
            <div class="details-content-banner" @click="handleGoToRenew">
              <img src="@assets/images/details-banner.png" alt="" />
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 客服弹窗 -->
    <!-- <chat :category="1" /> -->
  </section>
</template>

<script>
import { INTRO_OPTIONS } from "@config";
import CourseTabs from "../account/components/CourseTabs.vue";
import Evaluate from "@comp/Evaluate";
import Chat from "@comp/Chat";
import { getStatisNormal } from "@api/common";
import { formatDateTime, adjustmentStepSort } from "@utils/tools";

export default {
  components: {
    Evaluate,
    Chat,
    CourseTabs,
  },

  data() {
    return {
      activeName: "study",
      params: {},

      userInfo: {},

      showContact: false,

      loading: false,

      courseList: [],
      courseFreeList: [], // 免费课程
      courseInterestList: [], // 趣味背单词
      userProgress: {},
      freeUserProgress: {},

      timer: null,
      leftme: 0,
      letTimes: { day: 0, hour: 0, minute: 0, second: 0 },

      isPast: false,

      videoVisible: false,

      reviewList: [],
      reviewShow: false,
      dialogVisible: false,

      explainList: [],

      guideList: [],

      knowledgeList: [],

      statistics: {},

      freeLoading: true,
      freeCoureLoading: true,
      freeCourse: {},

      freeCourseTwo: {},

      evaluateLoading: true,
      pages: {
        pageindex: 1,
        pagesize: 1,
      },
      total: 0,
      evaluateList: [], // 评价列表
      avScore: 5,

      stepFlag: 0, // 当前学习步骤

      intervalIndex: null,
    };
  },

  created() {
    this.queryStatisNormal();
    this.queryUserChapterStudy();
    this.queryUserChapterStudyTwo();
    this.queryEvaluateList();
  },

  watch: {
    "$store.getters.getGuideShow"(newVal, oldVal) {
      if (newVal) this.openNoviceGuide();
    },
  },

  async mounted() {
    this.queryUserProgress(0);

    this.getLeftMinge();

    await this.queryUserInfo();

    this.handleVideoShow();

    // 是付会员时，判断会员是否过期
    if (this.userInfo.level >= 1) this.queryUserProgress(1);

    // 30秒延时请求
    if (this.userInfo.level < 1 || this.userInfo.category != 6)
      this.intervalIndex = setInterval(() => {
        this.queryUserInfo();
      }, 1000 * 30);
  },

  methods: {
    /**
     * tab 切换
     */
    handleTabs(val) {
      this.activeName = val;
    },

    /**
     * 打开新手引导
     */
    async openNoviceGuide() {
      this.$nextTick(() => {
        this.$intro()
          .onbeforeexit(() => {
            this.$store.commit("setGuideShow", false);

            // return confirm("确认要退出新手引导吗？");
          })
          .setOptions(INTRO_OPTIONS)
          .start();
      });
    },

    /**
     * 获取课程列表
     */
    async queryCourseList() {
      let isStudy = true; //是否学习过

      const { data: resData } = await this.$get("/course/getcoursechaptertree");

      this.loading = false;

      if (!resData.data.status) return;

      this.courseList = resData.data.dataList;
    },

    /**
     * 获取评价列表
     */
    async queryEvaluateList() {
      this.evaluateLoading = true;

      const { data: resData } = await this.$get("/course/getcoursecomment", {
        params: this.pages,
      });
      this.evaluateLoading = false;
      if (!resData.data.status) return;

      this.avScore = Number(resData.data.avScore);
      this.total = resData.data.allCount;
      this.evaluateList = resData.data.data.rows.map((item) => {
        // 格式化学习天数
        if (item.studytocoursetime) {
          const dayNum = item.studytocoursetime.replace("天", "0");
          item.dayNum = Number(dayNum).toFixed(1);
        }

        // 格式化考过日期
        if (item.yibei_member && item.yibei_member.kaoshidate)
          item.kaoshidate = formatDateTime(
            item.yibei_member.kaoshidate,
            "YYYY-MM-DD"
          );

        return item;
      });
    },

    /**
     * 获取用户复习列表
     */
    async queryReviewCourse(courseid, chapterid) {
      const { data: resData } = await this.$get(
        "/course/getmemberreviewcourse",
        {
          params: {
            ispay: 0,
          },
        }
      );

      if (!resData.data.status) return;

      this.reviewList = resData.data.dataList;
    },

    /**
     * 获取用户学习进度（试听进度）
     * （0：试听进度，1：付费进度）默认是1：付费进度
     */
    async queryUserProgress(type) {
      this.loading = true;
      this.freeCoureLoading = true;

      let resData = await this.$get("/course/getuserprogress", {
        params: {
          type,
        },
      });

      this.freeCoureLoading = false;

      // 会员过期
      if (type == 1) {
        if (!resData.data.data.status) {
          this.isPast = true;
          // this.$message.error("学员过期，请及时续费！");
        }
        return;
      }

      //用户没有学习进度
      if (!resData.data.data.isprogress) return this.creatUserProgress();

      if (type == 0) {
        this.freeUserProgress = resData.data.data.progress;

        // chapterid 86 是体验章节，大于86 、96的 都不是体验课程（可能是写入的错误进度）
        if (
          this.freeUserProgress.status == 1 ||
          this.freeUserProgress.currentcoursechapterid > 96
        )
          this.stepFlag = 6;
        else this.stepFlag = adjustmentStepSort(this.freeUserProgress.stepflag);
      } else {
        this.userProgress = resData.data.data.progress;
      }

      this.queryCourseList();
    },

    /**
     * 创建学习进度（试听的）
     */
    async creatUserProgress() {
      const { data: resData } = await this.$post("/course/creatcoursetrystart");

      if (!resData.data.status) return;

      this.queryUserProgress(0);
    },

    /**
     * 获取当前用户章节学习最近详细记录（体验课1）
     */
    async queryUserChapterStudy() {
      let resData = await this.$get("/user/getmemberchapterdetaillog", {
        params: {
          chapterid: 96, //  免费课程进度（课程id：12 章节id：86、96 是体验课程）
        },
      });
      if (!resData.data.data.status) return;
      this.freeLoading = false;
      let result = resData.data.data.data[0];

      if (!result) result = {};

      this.freeCourse = {
        lastVideotime: result.lastVideotime, // 最后一次视频学习时间
        keyword_study_chen: result.keyword_study_chen, // 中英文关键词卡最近一次完成时间
        keyword_test_chen: result.keyword_test_chen, // 中英文关键词测试最近一次完成时间
        keyword_test_score_chen: result.keyword_test_score_chen
          ? (result.keyword_test_score_chen * 100).toFixed(1)
          : "", // 中英文关键词测试最近一次完成得分
        keyword_study_en: result.keyword_study_en, // 英文关键词学习最近一次完成时间
        keyword_test_en: result.keyword_test_en, // 英文关键词测试最近一次完成完成时间
        keyword_test_score_en: result.keyword_test_score_en
          ? (result.keyword_test_score_en * 100).toFixed(1)
          : "", // 英文关键词测试最近一次完成得分
        uni_test_en: result.uni_test_en, // 章节测试的最近一次完成时间
        uni_test_score_en: result.uni_test_score_en
          ? (result.uni_test_score_en * 100).toFixed(1)
          : "", // 章节测试的最近一次完成得分
      };

      // 深度设置值
      this.$forceUpdate();
    },

    /**
     * 获取当前用户章节学习最近详细记录（体验课二）
     */
    async queryUserChapterStudyTwo() {
      let resData = await this.$get("/user/getmemberchapterdetaillog", {
        params: {
          chapterid: 86, //  免费课程进度（课程id：12 章节id：86、96 是体验课程）
        },
      });
      if (!resData.data.data.status) return;
      this.freeLoading = false;
      let result = resData.data.data.data[0];

      if (!result) result = {};

      this.freeCourseTwo = {
        lastVideotime: result.lastVideotime, // 最后一次视频学习时间
      };

      // 深度设置值
      this.$forceUpdate();
    },

    /**
     * 跳转到学习页面
     */
    handleGoToStudy(index, isReview, chapterId) {
      let name;

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
          courseId: 12, // 免费课程进度（课程id：12 章节id：86、96 是体验课程）
          chapterId: chapterId || 96,
          progressId: this.freeUserProgress.id,
          isReview,
          isReviewWordTest: isReview == "review" ? 1 : 0,
        },
      });
    },

    /**
     * 获取当前登录用户信息
     */
    async queryUserInfo() {
      const { data: resData } = await this.$get("/user/getloginuserinfo");

      this.loading = false;

      if (!resData.data.status) return;

      this.userInfo = resData.data.userInfo;

      sessionStorage.setItem("userInfo", JSON.stringify(this.userInfo));

      //是付费会员并在学中，跳转到个人中心
      if (this.userInfo.level >= 1 && this.userInfo.category == 6) {
        // 清除定时器
        if (this.intervalIndex) {
          window.clearInterval(this.intervalIndex);
          this.intervalIndex = null;
        }

        this.$confirm("您已购买课程，是否跳转到学习中心？", "提示", {
          confirmButtonText: "立即前往",
          cancelButtonText: "取消",
          type: "success",
        })
          .then(() => {
            this.$router.push({
              name: "ACCOUNT",
            });
          })
          .catch(() => {});
      }
    },

    /**
     * 跳转页面
     */
    handleGoTo(type) {
      // if (this.$intro()) this.$intro().exit();

      if (type == "pay")
        this.$router.push({
          name: "ORDER_INDEX",
        });
    },

    /**
     * 获取倒计时和名额
     */
    async getLeftMinge() {
      const { data: resData } = await this.$get("/global/getleftminge");

      if (!resData.data.status) return;

      this.leftme = resData.data.leftme;

      this.countDown(resData.data.lefttime * 24 * 60 * 60);
    },

    /**
     * 锁住的课程提示
     */
    handleLockHint() {
      if (this.freeUserProgress.status == 1)
        this.$alert(
          "复习时，请先通过步骤5 英文关键词测试",
          "抱歉！您无法复习此内容",
          {
            confirmButtonText: "了解",
            callback: (action) => {},
          }
        );
      else
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
     * 视频教程显示
     */
    handleVideoShow() {
      if (this.userInfo.level == 0 && !localStorage.getItem("detailsVideo"))
        this.videoVisible = true;
    },

    /**
     * 视频教程隐藏
     */
    handleVideohide() {
      localStorage.setItem("detailsVideo", true);
      this.videoVisible = false;
    },

    /**
     * 跳转到辅助学习资源
     */
    handleGoTorother(type, id) {
      this.$router.push({
        name: "COURSE_CHAPTER_ROTHER",
        query: {
          type,
          id,
        },
      });
    },

    /**
     * 跳转到文章
     */
    handleGoToExplain(row) {
      this.$router.push({
        name: "ARTICLE_EXPLAIN_VIDEO",
        query: {
          id: row.id,
        },
      });
    },

    /**
     * 获取统计数据
     */
    async queryStatisNormal() {
      const { data: resData } = await getStatisNormal();
      if (!resData.data.status) return;

      this.statistics = resData.data.data;
    },

    /**
     * 跳转到续费页面
     */
    handleGoToRenew() {
      this.$router.push({
        name: "ORDER_INDEX",
      });
    },

    /**
     * pageindex 改变时会触发
     */
    handleCurrentChange(val) {
      this.pages.pageindex = val;
      this.queryEvaluateList();
    },

    /**
     * 是否可以测试（必须通过 英文关键词测试 后，才能单元测试）
     */
    handleIsTest(row) {
      const reviewIdList = sessionStorage.getItem("reviewIdList") || "";

      return reviewIdList.indexOf(row.id) > -1;
    },

    /**
     * 提示信息
     */
    handleIsTestHint() {
      this.$alert("请先通过步骤5 英文关键词测试", "抱歉！您无法复习此内容", {
        confirmButtonText: "了解",
        callback: (action) => {},
      });
    },

    /**
     * 课程倒计时
     */
    countDown(times) {
      const _this = this;

      this.timer = setInterval(function() {
        _this.courseOldTime = times; //已经过去的时间

        let day = 0,
          hour = 0,
          minute = 0,
          second = 0; // 时间默认值
        if (times > 0) {
          day = Math.floor(times / (60 * 60 * 24));
          hour = Math.floor(times / (60 * 60)) - day * 24;
          minute = Math.floor(times / 60) - day * 24 * 60 - hour * 60;
          second =
            Math.floor(times) -
            day * 24 * 60 * 60 -
            hour * 60 * 60 -
            minute * 60;
        } else {
          window.clearInterval(_this.timer);
        }
        if (day <= 9) day = "0" + day;
        if (hour <= 9) hour = "0" + hour;
        if (minute <= 9) minute = "0" + minute;
        if (second <= 9) second = "0" + second;

        _this.$set(_this.letTimes, "day", day !== "00" ? day : "");
        _this.$set(_this.letTimes, "hour", hour);
        _this.$set(_this.letTimes, "minute", minute);
        _this.$set(_this.letTimes, "second", second);

        times--;
      }, 1000);

      if (times <= 0) {
        _this.$set(_this.letTimes, "nowTime", "");
        window.clearInterval(_this.timer);
      }
    },
  },

  // 离开页面的钩子
  beforeRouteLeave(to, from, next) {
    if (this.intervalIndex) {
      window.clearInterval(this.intervalIndex);
      this.intervalIndex = null;
    }

    if (this.timer) {
      this.timer = null;
      window.clearInterval(this.timer);
    }

    next();
  },
};
</script>
