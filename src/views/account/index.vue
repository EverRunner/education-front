<style lang="scss" scope></style>

<template>
  <section>
    <img src="@/assets/images/1665366829187.jpg" alt="" style="display:none;" />

    <!-- （考过生）界面 -->
    <pass-user v-if="getUserInfo.category == 2" />

    <!-- （在学生）界面 -->
    <div v-else class="account">
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
            课程到期日：{{
              (userInfo.endhydate || "") | formatDate("YYYY年M月DD日")
            }}<em @click="handleGoToRenew">立即续费</em>
          </p>
        </div>

        <!-- 主要内容 -->
        <el-row class="account-content" :gutter="24">
          <el-col :xs="24" :sm="24" :md="16" :lg="16">
            <div class="account-content-left">
              <div class="continue">
                <h4>上次学到</h4>
                <div v-loading="progressLoading">
                  <h5>
                    {{
                      (userProgress.yibei_course_chapter &&
                        userProgress.yibei_course_chapter.title) ||
                        "-"
                    }}
                  </h5>
                  <div class="continue-step">
                    <p>
                      步驟{{ adjustmentStepSort(userProgress.stepflag) + 1 }}
                      {{ STUDY_CHAPTER_STEP[userProgress.stepflag || 0] }}
                    </p>
                    <el-button type="warning" @click="handleContinueGoTo"
                      >继续学习</el-button
                    >
                  </div>
                </div>
              </div>
              <course-tabs
                v-if="courseList.length > 0 && userProgress.id"
                :courseArray="courseList"
                :userProgress="userProgress"
                :isFree="true"
                @getFinishChapter="handleFinishChapter"
              />
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8" :lg="8">
            <div class="account-content-right">
              <div class="predict" v-loading="userInfoLoading">
                <h5>预计完成时间</h5>
                <h2>{{ this.forecastTime }}</h2>
              </div>
              <div class="study" v-loading="userInfoLoading">
                <h5>学习数据</h5>
                <h6>已完成 {{ hasStudyFv }}%</h6>
                <el-progress
                  :percentage="hasStudyFv"
                  :color="studyCustomColor"
                ></el-progress>
                <ul class="study-time">
                  <li>
                    <p>总学习时长</p>
                    <span
                      ><em>{{
                        Math.trunc((userInfo.allstudytime || 0) / 60 / 60)
                      }}</em
                      >小时</span
                    >
                  </li>
                  <li>
                    <p>总学习天数</p>
                    <span
                      ><em>{{ dayNnumber }}</em
                      >天</span
                    >
                  </li>
                </ul>
              </div>
              <div class="week" v-loading="weekStaticsLoading">
                <div class="week-title">
                  <h5>本周学习</h5>
                  <div class="week-title-up">
                    <i
                      v-if="userWeekStudyStatics.todaystudytime >= 0"
                      class="el-icon-caret-top"
                    ></i>
                    <i v-else class="el-icon-caret-bottom"></i>
                    比上周{{
                      userWeekStudyStatics.todaystudytime >= 0 ? "上升" : "下降"
                    }}
                    {{ userWeekStudyStatics.todaystudytime }}%
                  </div>
                </div>
                <ul class="study-time">
                  <li>
                    <p>本周学习时长</p>
                    <span
                      ><em>{{
                        (
                          (userWeekStudyStatics.currentweekstudytime || 0) /
                          60 /
                          60
                        ).toFixed(1)
                      }}</em
                      >小时</span
                    >
                  </li>
                  <li>
                    <p>今日学习时长</p>
                    <span
                      ><em>{{
                        (
                          (userWeekStudyStatics.todaystudytime || 0) /
                          60 /
                          60
                        ).toFixed(1)
                      }}</em
                      >小时</span
                    >
                  </li>
                </ul>
                <div ref="weekChart" class="week-chart"></div>
                <ul class="week-legend">
                  <li><i></i><span>本周</span></li>
                  <li><i class="last"></i><span>上周</span></li>
                  <li><i class="average"></i><span>考过学员平均</span></li>
                </ul>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>

      <!-- 亲爱的用户，提示弹窗 -->
      <el-dialog
        class="account-dear"
        top="12vh"
        :visible.sync="dialogDear"
        width="960px"
        :before-close="handleDearClose"
        :close-on-click-modal="false"
      >
        <el-row class="account-dear-content" :gutter="24">
          <el-col class="left" :xs="24" :sm="24" :md="24" :lg="12">
            <h3>Dear {{ userInfo.username || "学员" }},</h3>
            <h5>
              距离您上次登入学习已有
              {{ lastLoginTime }}。以下是您目前为止的学习情况分析：
            </h5>
            <ul class="left-study">
              <!-- 超过5天没有登录的 返回的是小时 -->
              <li v-if="studySuggestList.length > 0">
                <p>
                  根据我们的数据分析结果，如果您想顺利通过联邦考试，您的
                  <!-- <em
                    style="font-weight: bold;"
                    v-for="(item, index) in studySuggestList"
                    :key="index"
                    >【{{ item[0] }}】成绩还需提升{{ item[2] }}%】{{
                      index >= studySuggestList.length - 1 ? "" : "、"
                    }}
                  </em> -->
                  <em
                    style="font-weight: bold;"
                    v-for="(item, index) in studySuggestList"
                    :key="index"
                    >【{{ item[0] }}】{{
                      item[2] > 5
                        ? "需要加强关键词的记忆和多练习关键词"
                        : "需要加强关键词的记忆"
                    }}】{{ index >= studySuggestList.length - 1 ? "" : "、" }}
                  </em>
                </p>
              </li>
              <!-- 超过5天没有登录的 返回的是小时 -->
              <li v-if="disLastLoginTimes >= 5 * 24">
                <p>
                  您已经5天没有登系统学习了，<br />再忙也要抽出时间来学习哦！
                </p>
                <p>每天一点点的进步，都可以带您通往成功之路！</p>
              </li>
              <li
                v-else-if="
                  lastLoginStudy.keywordChEnTestTimes +
                    lastLoginStudy.keywordEnTestTimes >
                    lastLoginStudy.videoStudyTimes
                "
              >
                <p>我们注意到您花了很多时间在关键词测试上，不要心急！</p>
                <p>
                  如果您发现测试总是无法通过，<br />不妨多花些时间看看视频课程，<br />真正学懂知识点，<br />做起题来就会更轻松啦！
                </p>
                <p>
                  视频课程听不懂的地方，<br />可以随时微信咨询张老师或者在学习群里跟大家讨论哦！
                </p>
              </li>
              <!-- 注： 判断 学员平均"单元测试"低于 90%的，且 测试次数大于"考过生"的下平均测试次数 -->
              <li
                v-else-if="
                  lastLoginStudy.unitTestAvg < 0.9 &&
                    lastLoginStudy.mykgAvg > lastLoginStudy.kgskgAvg
                "
              >
                <p>我们注意到您花了很多时间在关键词测试上，不要心急！</p>
                <p>
                  如果您发现测试总是无法通过，<br />不妨多花些时间看看视频课程，<br />真正学懂知识点，<br />做起题来就会更轻松啦！
                </p>
                <p>
                  视频课程听不懂的地方，<br />可以随时微信咨询张老师或者在学习群里跟大家讨论哦！
                </p>
              </li>
              <!-- 注：判断 视频学习时间 大于   单词（中英）的学习时间 + 单词（中英）的测试时间+单词（英）的学习时间 + 单词（英）的测试时间+单无测试的时间，且测试的通过率在 90%以下的 -->
              <li
                v-else-if="
                  userRadarData.vedio_mine_duration >
                    userRadarData.entest_mine_duration +
                      userRadarData.chentest_mine_duration +
                      userRadarData.chaptertest_mine_duration &&
                    lastLoginStudy.unitTestAvg < 0.9
                "
              >
                <p>
                  我们注意到您花了很多时间来看视频课程，<br />是对视频课程有什么疑问吗？
                </p>
                <p>
                  如果有疑问的话，<br />可以随时微信咨询张老师或者在学习群里跟大家讨论哦！
                </p>
                <p>
                  看完视频一定要去做题，检验自己哪里没有学懂，这样学习才能更高效哦！
                </p>
              </li>
              <li v-else>
                <p>
                  您上次登录花了{{
                    lastLoginStudy.videoStudyTimes > 1
                      ? lastLoginStudy.videoStudyTimes + "个小时"
                      : Math.floor(lastLoginStudy.videoStudyTimes * 60 * 100) /
                          100 +
                        "分钟"
                  }}学习视频课程，{{
                    lastLoginStudy.keywordChEnTestTimes +
                      lastLoginStudy.keywordEnTestTimes >
                    1
                      ? lastLoginStudy.keywordChEnTestTimes +
                        lastLoginStudy.keywordEnTestTimes +
                        "个小时"
                      : Math.floor(
                          (lastLoginStudy.keywordChEnTestTimes +
                            lastLoginStudy.keywordEnTestTimes) *
                            60 *
                            100
                        ) /
                          100 +
                        "分钟"
                  }}关键词测试，{{
                    lastLoginStudy.unitTestTimes > 1
                      ? lastLoginStudy.unitTestTimes + "个小时"
                      : Math.floor(lastLoginStudy.unitTestTimes * 60 * 100) /
                          100 +
                        "分钟"
                  }}单元测试，太棒了！
                </p>
                <p
                  v-if="
                    lastLoginStudy.keywordEnTestTimes >
                      lastLoginStudy.keyworden_test_times
                  "
                >
                  如果您能在关键词上花更多的时间就更好了！
                </p>
              </li>
            </ul>
            <div class="hidden-lg-and-up">
              <study-radar-statics :userRadarData="userRadarData" />
            </div>
            <div class="left-bnts">
              <el-tooltip
                class="item"
                effect="dark"
                placement="top"
                :value="dialogDearTooltip"
              >
                <div slot="content">
                  <p style="line-height: 1.6;">
                    邀请朋友购课，获得<br />$88 美金的现金奖励！
                  </p>
                </div>
                <el-button
                  type="primary"
                  class="el-button--big"
                  plain
                  @click="handleUserShare"
                  >分享到朋友圈</el-button
                >
              </el-tooltip>

              <el-button
                type="primary"
                class="el-button--big"
                @click="handleDearClose"
                >马上继续学习</el-button
              >
            </div>
          </el-col>
          <el-col
            class="right hidden-md-and-down"
            :xs="24"
            :sm="24"
            :md="24"
            :lg="12"
          >
            <study-radar-statics :userRadarData="userRadarData" />
          </el-col>
        </el-row>
      </el-dialog>

      <!-- 分享海报 -->
      <!-- <div class="account-dear-share">
        <UserSharePoster
          v-if="userRadarData.vedio_allavg_duration"
          :userRadarData="userRadarData"
          ref="userShare"
        />
      </div> -->

      <!-- 客服弹窗 -->
      <chat :category="1" />
    </div>

    <!-- 协议 -->
    <el-dialog
      title="易北教育服务条款"
      top="5vh"
      width="85%"
      :visible.sync="articleVisible"
      :close-on-click-modal="false"
      :show-close="false"
    >
      <div
        class="article-content"
        style="height:70vh;overflow-y:auto;"
        v-html="articleInfo.content"
      ></div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="articleVisible = false" disabled>取 消</el-button>
        <el-button
          :loading="submitLoading"
          type="primary"
          :disabled="buttonCountDown > 0"
          @click="consentAgreement"
          >同意服务条款{{
            buttonCountDown ? `（${buttonCountDown}）` : ""
          }}</el-button
        >
      </div>
    </el-dialog>

    <!-- 节日 -->
    <Festival
      :key="1"
      :showDialog="festivalShow"
      @closeDialog="handleFestivalClose"
      :info="festivalInfo"
    />
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import { INTRO_OPTIONS, PAGE_SIZE } from "@config";
import CourseTabs from "./components/CourseTabs";
import Festival from "./components/Festival";
import StudyRadarStatics from "./components/StudyRadarStatics";
import PassUser from "./components/PassUser";
// import activityGrateful from "@comp/activityGrateful";
import { formatDateTime, formatSeconds, dateDiff } from "@utils/tools";
import { getStatisNormal } from "@api/common";
import Chat from "@comp/Chat";
import * as echarts from "echarts";
import dayjs from "dayjs";
import { getLocation } from "@utils/tools";
import { adjustmentStepSort, adjustmentStepSortReverse } from "@utils/tools";

export default {
  components: {
    Chat,
    CourseTabs,
    Festival,
    StudyRadarStatics,
    PassUser,
    // activityGrateful,
  },

  data() {
    return {
      studyCustomColor: "#FFB800", // 学习进度
      studyPercentage: 50,

      params: {},

      PAGE_SIZE,

      courseList: [],

      otherPages: {
        pageindex: 1,
        pagesize: 50,
      },

      userProgress: {
        yibei_course: {},
        yibei_course_chapter: {},
      },
      progressLoading: true,

      dayNnumber: 0,

      userInfo: JSON.parse(sessionStorage.getItem("userInfo")),

      allChapter: 0,
      alreadyChapter: 0,

      allStudyTime: 0,

      nowTitle: "第一章-解剖与机能",
      nowSecondTitle: "第一节",

      vipLogNumber: 0,

      errorLoading: false,
      errorLogList: [],

      heightRrrorLoading: false,
      heightRrrorLogList: [],

      completeLoading: false,
      completeLogList: [],

      STUDY_CHAPTER_STEP: {
        "-1": "未开始",
        0: "视频课程",
        1: "中英文关键词卡",
        2: "英文关键词卡",
        3: "章节测试",
        4: "已完成此章节",
        5: "中英文关键词测试",
        6: "英文关键词测试",
      },

      dialogVisible: false,

      gotoCourseId: "",
      gotoChapterId: "",

      reviewList: [], // 复习的列表
      reviewMore: true, // 可以复习更多的课程
      reviewShow: false,

      statistics: {},

      finalStudyList: [],

      courseInterestList: [], // 趣味背单词

      guideList: [],

      knowledgeList: [],

      isSubscribeExam: false, // 是否已预约考试
      remarkSubscribeExam: "",

      forecastTime: "-", // 预测学习完成的日期
      forecastTimeLoading: true,

      predictPass: 0, // 通过考试的机率

      hasStudyCourseFv: 0, // 当前课程进度
      hasStudyFv: 0, // 总学习进度
      userInfoLoading: true,

      userWeekStudyStatics: {
        currentWeekData: [], // 本周学习时长集合
        lastWeekData: [], // 上周学习时长集合
        sysAvgData: [], // 系统平均学习时长集合
        currentweekstudytime: 0, // 本周学习时长
        todaystudytime: 0, // 今天学习时长
      },
      weekStaticsLoading: true,

      studyTimeAvg: 0,

      dialogDear: false, // 再次弹窗
      dialogDearTooltip: false,

      lastLoginTime: "-", // 上次登录的时间
      disLastLoginTimes: 0,
      userRadarData: {},

      lastLoginStudy: {}, // 上次登录的学习情况

      festivalShow: false, // 节日显示

      articleInfo: {},
      articleVisible: false,
      lat: 0,
      lng: 0,
      buttonCountDown: 10,
      submitLoading: false,

      studySuggestList: [], // 学习建议

      festivalInfo: {}, // 节日信息
    };
  },

  watch: {
    // "$store.getters.getGuideShow"(newVal, oldVal) {
    //   if (newVal) this.openNoviceGuide();
    // },
  },

  computed: {
    ...mapGetters(["getUserInfo"]),
  },

  async created() {
    // this.queryErrorTestLog();
    // this.queryAllErrorTestLog();
    // this.queryCompleteTestLog();
  },

  mounted: async function() {
    this.queryFestival();

    await this.queryUserInfo();

    // 如果是考过生不执行接口
    if (this.userInfo.category == 2) return;

    // 获取用户同意书
    this.queryConsentInfo();

    this.queryStatisNormal();
    this.queryVipLog();

    await this.queryUserProgress();

    this.queryCourseList();

    // this.queryForecastTime();
    this.queryUserWeekStudyStatics();

    // 本次登录是否已经弹出过
    if (!sessionStorage.getItem("isUserRadarStatics")) {
      Promise.all([
        this.querylastloginstudyconst(),
        this.queryUserRadarStatics(),
      ])
        .then((res) => {
          this.dialogDear = true;
          setTimeout(() => {
            this.dialogDearTooltip = true;
          }, 500);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },

  methods: {
    adjustmentStepSort,

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
      const { data: resData } = await this.$get("/course/getcoursechaptertree");
      if (!resData.data.status) return;

      this.courseList = resData.data.dataList;

      // 判断学员是否全部学习完成
      if (this.userProgress.status == 1)
        this.courseList.map((item) => {
          item.progress = 100;
        });

      // 已学习天数
      // this.dayNnumber = this.getUserInfo.logincount;
      this.dayNnumber = this.getUserInfo.allstudydate || 0;
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
      this.progressLoading = false;
      //会员过期
      if (!resData.data.data.status)
        return this.$router.replace({
          name: "COURSE_DETAILS",
        });
      //用户没有学习进度
      if (!resData.data.data.isprogress) return this.creatUserProgress();

      this.userProgress = resData.data.data.progress;

      // 继续学习调整跳转
      const studyStep =
        this.userProgress.yibei_course_chapter.studystep.split(",") || [];
      const stepIndex = adjustmentStepSortReverse(this.userProgress.stepflag);
      if (studyStep.indexOf(stepIndex.toString()) == -1) {
        this.userProgress.stepflag = adjustmentStepSortReverse(
          Number(studyStep[0])
        );
      }

      // 所有课程学习完成，预测考试通过率
      // if (this.userProgress.status == 1) this.queryPredictPass();
    },

    /**
     * 创建学习进度（付费的）
     */
    async creatUserProgress() {
      const { data: resData } = await this.$post("/course/creatcoursestart");

      if (!resData.data.status) return;

      this.queryUserProgress();
    },

    /**
     * 获取当前用户的本周学习统计数据
     */
    async queryUserWeekStudyStatics() {
      const { data: resData } = await this.$get(
        "/user/getmemberweekstudystatics"
      );
      this.weekStaticsLoading = false;
      if (!resData.data.status) return;

      this.userWeekStudyStatics = resData.data.data;

      // 图表
      const weekChart = this.$refs.weekChart;

      if (!weekChart) return;

      const myChart = echarts.init(weekChart);
      const option = {
        tooltip: {
          trigger: "axis",
          formatter: function(params) {
            //params[0].name表示x轴数据
            let str = "周" + params[0].name + "<br/>";
            //params是数组格式
            for (let item of params) {
              //设置浮层图形的样式跟随图中展示的颜色
              str +=
                "<span style='display:inline-block;width:12px;height:12px;border-radius:50%;margin-right: 7px;background-color:" +
                item.color +
                ";'></span>" +
                item.seriesName +
                " : " +
                Math.floor((item.value / 60 / 60) * 100) / 100 +
                "小时" +
                "<br/>";
            }
            return str;
          },
        },
        // legend: {
        //   data: ["本周", "上周", "系统平均"],
        // },
        grid: {
          left: "10px",
          right: "10px",
          bottom: "40px",
          top: "30px",
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["一", "二", "三", "四", "五", "六", "七"],
          offset: 10,
        },
        yAxis: {
          type: "value",
          axisTick: {
            show: false, // 不显示坐标轴刻度线
          },
          axisLine: {
            show: false, // 不显示坐标轴线
          },
          axisLabel: {
            show: false, // 不显示坐标轴上的文字
          },
          splitLine: {
            show: true, // 不显示网格线
            lineStyle: {
              type: "dashed", //虚线
            },
          },
        },
        series: [
          {
            name: "本周",
            type: "line",
            symbol: "circle",
            symbolSize: 11,
            itemStyle: {
              normal: {
                color: "#FFB800",

                lineStyle: {
                  color: "#FFB800",
                },
              },
            },
            data: this.userWeekStudyStatics.currentWeekData,
          },
          {
            name: "上周",
            type: "line",
            symbol: "circle",
            symbolSize: 11,
            itemStyle: {
              normal: {
                color: "#DCDFE6",
                lineStyle: {
                  color: "#DCDFE6",
                },
              },
            },
            data: this.userWeekStudyStatics.lastWeekData,
          },
          {
            name: "考过学员平均",
            type: "line",
            symbol: "circle",
            symbolSize: 11,
            itemStyle: {
              normal: {
                color: "#004988",
                lineStyle: {
                  color: "#004988",
                },
              },
            },
            // data: this.userWeekStudyStatics.sysAvgData,
            data: [
              this.userWeekStudyStatics.sysavg,
              this.userWeekStudyStatics.sysavg,
              this.userWeekStudyStatics.sysavg,
              this.userWeekStudyStatics.sysavg,
              this.userWeekStudyStatics.sysavg,
              this.userWeekStudyStatics.sysavg,
              this.userWeekStudyStatics.sysavg,
            ],
          },
        ],
      };
      myChart.setOption(option);
    },

    /**
     * 获取课程学习进度
     */
    async queryCourseProgress(courseid, chapterid) {
      const { data: resData } = await this.$get(
        "/course/getcurrentchapterprogress",
        {
          params: {
            progressid: this.userProgress.id,
            courseid,
            chapterid,
          },
          headers: {
            isLoading: true,
          },
        }
      );

      if (!resData.data.status) return;

      return resData.data.data;
    },

    /**
     * 获取会员开通记录
     */
    async queryVipLog(courseid, chapterid) {
      const { data: resData } = await this.$get("/user/getmemberviplogs", {
        params: {
          category: 2,
        },
      });

      if (!resData.data.status) return;

      //求和
      this.vipLogNumber = resData.data.data.reduce(
        (sum, e) => sum + Number(e.datecount || 0),
        0
      );
    },

    /**
     * 获取我的错题测试报告
     */
    async queryErrorTestLog() {
      this.errorLoading = true;

      const { data: resData } = await this.$get(
        "/course/getmembererrorrequesttest",
        {
          params: this.otherPages,
        }
      );

      this.errorLoading = false;

      if (!resData.data.status) return;

      //计算测试时间
      this.errorLogList = resData.data.data.rows.map((item) => {
        item.testTime = this.handleTestTime(
          (new Date(item.enddate).getTime() -
            new Date(item.startdate).getTime()) /
            1000
        );

        // 测试前-关键词
        if (item.remark) {
          item.remarkObj = JSON.parse(item.remark);
          item.remarkObj.testTime = this.handleTestTime(
            (new Date(item.remarkObj.enddate).getTime() -
              new Date(item.remarkObj.startdate).getTime()) /
              1000
          );
        }

        return item;
      });
    },

    /**
     * 获取高频错题测试报告
     */
    async queryAllErrorTestLog() {
      this.heightRrrorLoading = true;

      const { data: resData } = await this.$get(
        "/course/getmemberallerrorrequesttest",
        {
          params: this.otherPages,
        }
      );

      this.heightRrrorLoading = false;

      if (!resData.data.status) return;

      //计算测试时间
      this.heightRrrorLogList = resData.data.data.rows.map((item) => {
        item.testTime = this.handleTestTime(
          (new Date(item.enddate).getTime() -
            new Date(item.startdate).getTime()) /
            1000
        );

        // 测试前-关键词
        if (item.remark) {
          item.remarkObj = JSON.parse(item.remark);
          item.remarkObj.testTime = this.handleTestTime(
            (new Date(item.remarkObj.enddate).getTime() -
              new Date(item.remarkObj.startdate).getTime()) /
              1000
          );
        }

        return item;
      });
    },

    /**
     * 获取综合测试记录
     */
    async queryCompleteTestLog(courseid, chapterid) {
      this.completeLoading = true;

      const { data: resData } = await this.$get(
        "/course/getmembercomprehensivetest",
        {
          params: this.otherPages,
        }
      );

      this.completeLoading = false;

      if (!resData.data.status) return;

      //计算测试时间
      this.completeLogList = resData.data.data.rows.map((item) => {
        item.testTime = this.handleTestTime(
          (new Date(item.enddate).getTime() -
            new Date(item.startdate).getTime()) /
            1000
        );

        // 测试前-关键词
        if (item.remark) {
          item.remarkObj = JSON.parse(item.remark);
          item.remarkObj.testTime = this.handleTestTime(
            (new Date(item.remarkObj.enddate).getTime() -
              new Date(item.remarkObj.startdate).getTime()) /
              1000
          );
        }

        return item;
      });
    },

    /**
     * 获取用户复习列表
     */
    async queryReviewCourse(courseid, chapterid) {
      const { data: resData } = await this.$get(
        "/course/getmemberreviewcourse"
      );

      if (!resData.data.status) return;

      this.reviewList = resData.data.dataList;
    },

    /**
     * 快速学习
     */
    handleContinueGoTo() {
      this.handleCourseGoTo(
        this.userProgress.currentcourseid,
        this.userProgress.currentcoursechapterid
      );
    },

    /**
     * 计算已经完成的数据
     */
    handleFinishChapter(val) {
      this.hasStudyFv = val || 0;
    },

    /**
     * 课程跳转页面
     */
    async handleCourseGoTo(courseId, chapterId, isReview, reviewMore) {
      // // 是否可以学习新增课程及以下的内容
      // if (reviewMore == 1 && !this.reviewMore) {
      //   return (this.reviewShow = true);
      // }

      // // 是否为复习
      // if (!isReview) {
      //   this.dialogVisible = true;

      //   this.gotoCourseId = courseId;
      //   this.gotoChapterId = chapterId;

      //   return;
      // }

      // const resData = await this.queryCourseProgress(courseId, chapterId);

      this.handleGoToStudy(courseId, chapterId, this.userProgress.stepflag);
    },

    /**
     * 复习跳转
     */
    handleGoToReview(status, isReview = "") {
      this.handleGoToStudy(
        this.gotoCourseId,
        this.gotoChapterId,
        status,
        isReview
      );
      this.dialogVisible = false;
    },

    /**
     * 复习跳转2
     */
    handleGoToReview2(status, isReview = "") {
      // 查询复习的内容
      let review = this.reviewList.find((a) => a.status < 4);

      this.handleGoToStudy(review.courseid, review.chapterid, status, isReview);
      this.reviewShow = false;
    },

    /**
     * 跳转到学习页面
     */
    handleGoToStudy(courseId, chapterId, status, isReview) {
      let name;

      switch (status) {
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

        default:
          name = "COURSE_STUDY_VIDEO"; // -1、0、4 未学习、视频步骤、已学完成
      }

      this.$router.push({
        name,
        query: {
          courseId,
          chapterId,
          progressId: this.userProgress.id,
          isReview,
        },
      });
    },

    /**
     * 跳转到趣味学单词
     */
    handleGoToInterest(courseId, chapterId) {
      this.$router.push({
        name: "COURSE_STUDY_VIDEO",
        query: {
          courseId,
          chapterId,
          progressId: this.userProgress.id,
          isInterest: 1,
        },
      });
    },

    /**
     * 获取用户信息
     */
    async queryUserInfo() {
      const { data: resData } = await this.$get("/user/getloginuserinfo");
      this.userInfoLoading = false;
      if (!resData.data.status) return;

      this.userInfo = resData.data.userInfo;
      this.studyTimeAvg = resData.data.studytimeavg; // 平均每天学习的时间

      sessionStorage.setItem("userInfo", JSON.stringify(resData.data.userInfo));

      // 如果是考过生不执行接口
      if (this.userInfo.category == 2) return;

      // 预计完成时间
      if (this.userInfo.aiycwctime == 0) {
        this.forecastTime = "已完成";
      } else {
        // 计算预计的天数
        const expectedDay = Math.ceil(
          this.userInfo.aiycwctime / this.studyTimeAvg
        );

        this.forecastTime = dayjs()
          .add(expectedDay || 0, "day")
          .format("YYYY-MM-DD");
      }

      this.allStudyTime =
        Math.floor((this.userInfo.allstudytime / 60 / 60) * 100) / 100;

      // 提前一周 提示续费
      if (
        dateDiff(this.userInfo.endhydate, new Date()) <= 7 &&
        !sessionStorage.getItem("renew")
      )
        this.$confirm(
          `您的会员在${formatDateTime(
            this.userInfo.endhydate,
            "YYYY-MM-DD"
          )}过期，请及时续费！`,
          "提示",
          {
            confirmButtonText: "立即续费",
            cancelButtonText: "下次再续",
            type: "warning",
          }
        )
          .then(() => {
            this.handleGoToRenew();
          })
          .catch(() => {
            sessionStorage.setItem("renew", true);
          });

      // 学习建议列表
      if (this.userInfo.degreecontent) {
        const fieldList = [
          "关键词测试（中英）",
          "关键词测试（英）",
          "单元测试",
          "我的错题（测前单词）",
          "我的错题",
          "高频错题（测前单词）",
          "高频错题",
          "综合测试（测前单词）",
          "综合测试",
        ];
        try {
          this.studySuggestList = JSON.parse(
            this.userInfo.degreecontent
          ).filter((item) => {
            const title = fieldList.find((son) => {
              if (item[0].includes(son)) return item;
            });

            if (item[1] == 1 && title) {
              item[0] = title;
              item[2] = Math.abs(Math.floor(item[2] * 1000) / 10);
              return item;
            }
          });
        } catch (error) {
          console.log("获取学习建议异常！");
        }
      }
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
     * 获取用户三次final不过的记录列表
     */
    // async queryFinalStudyList() {
    //   const { data: resData } = await this.$get(
    //     "/course/getuserthreefinalerror"
    //   );
    //   if (!resData.data.status) return;

    //   this.finalStudyList = resData.data.dataList;

    //   // 没有重置章节时，才能学习 新增、综合测试等
    //   if (this.finalStudyList.length > 0) {
    //     this.reviewMore = false;
    //   }
    // },

    /**
     * 处理时间
     */
    handleTestTime(times) {
      let day = 0,
        hour = 0,
        minute = 0,
        second = 0; // 时间默认值

      day = Math.floor(times / (60 * 60 * 24));
      hour = Math.floor(times / (60 * 60)) - day * 24;
      minute = Math.floor(times / 60) - day * 24 * 60 - hour * 60;
      second =
        Math.floor(times) - day * 24 * 60 * 60 - hour * 60 * 60 - minute * 60;

      if (day <= 9) day = "0" + day;
      if (hour <= 9) hour = "0" + hour;
      if (minute <= 9) minute = "0" + minute;
      if (second <= 9) second = "0" + second;

      return `${hour}:${minute}:${second}`;
    },

    /**
     * 课程单击
     */
    handleCourseClick() {
      this.$message.error("完成前面的学习，才能开启这一节的学习！");
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
     * 处理预约考试
     */
    async handleSubscribeExam() {
      if (!this.remarkSubscribeExam)
        return this.$message.error("请填写预约考试说明");

      const { data: resData } = await this.$post(
        "/user/updateusercategoryandremark",
        {
          remark: this.remarkSubscribeExam,
        }
      );
      if (!resData.data.status) return;

      this.$message.success("提交成功！");
    },

    /**
     * 预测学习完成的时间
     */
    async queryForecastTime() {
      const { data: resData } = await this.$get("/user/getmemberycstudytime");
      this.forecastTimeLoading = false;
      if (!resData.data.status) return;

      const time = JSON.parse(resData.data.times);
      // const second =

      this.forecastTime = Math.trunc(time.remaining_lr_time / 60 / 60);
    },

    /**
     * 预测通过考试的机率
     */
    async queryPredictPass() {
      const { data: resData } = await this.$get("/user/getmemberpredictpass");
      if (!resData.data.status) return;

      // const predict = JSON.parse(resData.data.times);

      // this.predictPass = predict.passProb.toFixed(2) * 100;

      // if (this.predictPass > 0)
      //   this.$message({
      //     message:
      //       "系统智能预测：您通过考试的机率为：" + this.predictPass + "%",
      //     type: "success",
      //     duration: 10 * 1000,
      //   });
    },

    /**
     * 获取当前用户的学习雷达图
     */
    async queryUserRadarStatics() {
      const { data: resData } = await this.$get(
        "/user/getcurrentuserstudyalanydata"
      );
      this.weekStaticsLoading = false;
      if (!resData.data.status) return;

      this.userRadarData = resData.data.data[0];
      this.disLastLoginTimes = resData.data.disLastLoginTimes;
      this.lastLoginTime = formatSeconds(
        resData.data.disLastLoginTimes * 60 * 60
      );
    },

    /**
     * 获取用户上一次学习的记录情况
     */
    async querylastloginstudyconst() {
      const { data: resData } = await this.$get(
        "/user/getuserlastloginstudyconst"
      );
      if (!resData.data.status) return;
      const studyData = resData.data.data.studyData;

      this.lastLoginStudy = {
        videoStudyTimes:
          Math.floor(((studyData.video_study_times || 0) / 60 / 60) * 100) /
          100,
        keywordChEnTestTimes:
          Math.floor(
            ((studyData.keywordchen_test_times || 0) / 60 / 60) * 100
          ) / 100,
        keywordEnTestTimes:
          Math.floor(((studyData.keyworden_test_times || 0) / 60 / 60) * 100) /
          100,
        unitTestTimes:
          Math.floor(((studyData.unit_test_times || 0) / 60 / 60) * 100) / 100,
        unitTestAvg: resData.data.data.unitTestAvg,
        kgskgAvg: resData.data.data.kgskgAvg,
        mykgAvg: resData.data.data.mykgAvg,
      };
    },

    /**
     * 关闭节日祝福
     */
    handleFestivalClose() {
      this.festivalShow = false;
    },

    /**
     * 获取用户同意书
     */
    async queryConsentInfo() {
      this.loading = true;

      const { data: resData } = await this.$get("/user/getapplylistty", {
        params: {
          pageindex: 1,
          pagesize: 1,
        },
      });

      if (!resData.data.status || resData.data.data.count > 0) return;

      this.articleVisible = true;

      await this.queryArticleInfo();
      this.handleLocation();
      this.countdownPay();
    },

    /**
     * 获取文章内容-协议
     */
    async queryArticleInfo() {
      this.loading = true;

      const { data: resData } = await this.$get("/content/getcontentdatabyid", {
        params: {
          id: 5,
        },
      });

      if (!resData.data.status) return;

      this.articleInfo = resData.data.data;
    },

    /**
     * 确认同意协议书
     */
    consentAgreement() {
      this.$post("/user/creatuserapplyty", {
        category: "BUY", // 续费：RENEWAL 购买：BUY
        lat: this.lat,
        lng: this.lng,
      });
      this.articleVisible = false;
    },

    /**
     * 获取定位
     */
    async handleLocation() {
      try {
        const coords = await getLocation();
        if (coords && coords.latitude) {
          this.lat = coords.latitude;
          this.lng = coords.longitude;
        }
      } catch (error) {
        this.lat = 0;
        this.lng = 0;
      }
    },

    /**
     * 支付倒计时
     */
    countdownPay() {
      this.buttonCountDown = 10;

      this.buttonCountDownTimer = setInterval(() => {
        this.buttonCountDown--;

        if (this.buttonCountDown == 0) {
          this.isDisabled = false;
          clearInterval(this.buttonCountDownTimer);
        }
      }, 1000);
    },

    /**
     * 处理弹框回调关闭
     */
    handleDearClose() {
      this.dialogDear = false;
      this.dialogDearTooltip = false;

      sessionStorage.setItem("isUserRadarStatics", true);
    },

    /**
     * 生成分享海报
     */
    handleUserShare() {
      this.$router.push({
        name: "ACCOUNT_SHARE",
      });
      // this.$refs.userShare.handleCreateImage();
    },

    /**
     * 获取节日
     */
    async queryFestival() {
      const { data: resData } = await this.$get(
        "/global/getcurrentholidaysetting"
      );
      if (!resData.data.status) return;

      if (resData.data.data && resData.data.data[0]) {
        this.festivalInfo = resData.data.data[0];
        this.festivalShow = true;
      }
    },
  },
};
</script>
