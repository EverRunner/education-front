<style lang="scss" scope></style>

<template>
  <div class="tabs">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="课程表" name="course">
        <ul class="course" v-loading="loading">
          <li v-for="item in courseList" :key="item.id">
            <div class="course-title">
              <el-progress
                type="circle"
                :percentage="item.progress"
                :color="courseCustomColor"
                :width="42"
                :stroke-width="3"
              ></el-progress>
              <p>{{ item.title }}</p>
            </div>
            <template v-if="isFree">
              <el-button
                v-if="item.progress === 100"
                plain
                class="course-review"
                size="medium"
                @click="handleGoToChapter(item)"
                >复习</el-button
              >
              <template v-else>
                <el-button
                  v-if="item.progress > 0 || item < 100"
                  type="primary"
                  class="course-study"
                  size="medium"
                  @click="handleGoToChapter(item)"
                  >学习</el-button
                >
                <el-button
                  v-else
                  type="info"
                  plain
                  class="course-examine"
                  size="medium"
                  @click="handleGoToChapter(item)"
                  >查看</el-button
                >
              </template>
            </template>
            <div v-else class="btn-icon" @click="handleLockHint">
              <i class="el-icon-lock btn-icon"></i>
            </div>
          </li>
          <li v-for="item in courseListTest" :key="item.id">
            <div class="course-title">
              <el-progress
                type="circle"
                :percentage="item.progress"
                :color="courseCustomColor"
                :width="42"
                :stroke-width="3"
              ></el-progress>
              <p>{{ item.title }}</p>
            </div>
            <template v-if="isFree">
              <el-button
                v-if="item.progress === 100"
                plain
                class="course-review"
                size="medium"
                @click="handleGoToChapter(item)"
                >复习</el-button
              >
              <template v-else>
                <el-button
                  v-if="item.progress > 0 || item.progress < 100"
                  type="primary"
                  class="course-study"
                  size="medium"
                  @click="handleGoToChapter(item)"
                  >学习</el-button
                >
                <el-button
                  v-else
                  type="info"
                  plain
                  class="course-examine"
                  size="medium"
                  @click="handleGoToChapter(item)"
                  >查看</el-button
                >
              </template>
            </template>
            <div v-else class="btn-icon" @click="handleLockHint">
              <i class="el-icon-lock btn-icon"></i>
            </div>
          </li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="辅助学习资源" name="explain">
        <ul class="course">
          <li>
            <div class="course-title">
              <p>趣味学单词</p>
            </div>
            <el-button
              type="primary"
              class="course-study"
              @click="handleGoTorother('interest', 16)"
              >学习</el-button
            >
          </li>
          <li>
            <div class="course-title">
              <p>学员常见问题解答</p>
            </div>
            <el-button
              type="primary"
              class="course-study"
              @click="handleGoTorother('FAQ', 10)"
              >查看</el-button
            >
          </li>
          <li>
            <div class="course-title">
              <p>教程系列</p>
            </div>
            <el-button
              type="primary"
              class="course-study"
              @click="handleGoTorother('course', 11)"
              >查看</el-button
            >
          </li>
          <li>
            <div class="course-title">
              <p>知识点总结</p>
            </div>
            <el-button
              type="primary"
              class="course-study"
              @click="handleGoTorother('knowledge', 12)"
              >查看</el-button
            >
          </li>
          <li v-if="getUserInfo.level == 1">
            <div class="course-title">
              <p>必考专业词汇汇总（磨耳朵版）</p>
            </div>
            <el-button
              type="primary"
              class="course-study"
              @click="handleGoTorother('vocabulary', 13)"
              >查看</el-button
            >
          </li>
          <li v-if="getUserInfo.level == 1">
            <div class="course-title">
              <p>易北新课程视频抢先看</p>
            </div>
            <el-button
              type="primary"
              class="course-study"
              @click="handleGoTorother('newCourse', 15)"
              >查看</el-button
            >
          </li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="我的学习报告" name="discuss" v-if="isFree">
        <div class="account-timeline" v-loading="timelineLoading">
          <el-timeline>
            <el-timeline-item
              v-for="(item, index) in studyLogList"
              :key="index"
              :timestamp="
                item.chapterid > 0
                  ? item.chapterName
                  : item.chapterid == -1
                  ? '应变测试'
                  : '综合测试'
              "
              placement="top"
            >
              <el-card>
                <div class="account-timeline-item">
                  <!-- <h4>{{ item.chapterName }}</h4> -->
                  <div
                    v-for="(son, key) in item.courseChapterList"
                    :key="key"
                    class="row"
                    v-show="son.remark || son.remarkObj"
                  >
                    <span v-if="son.remarkObj">
                      {{
                        STUDY_TYPE[son.remarkObj.type] || "章节测试完成"
                      }}，正确{{ son.remarkObj.correctcount }}道题，错误{{
                        son.remarkObj.errorcount
                      }}道题，得分{{
                        Math.floor(
                          (son.remarkObj.correctcount /
                            son.remarkObj.allcount) *
                            100
                        )
                      }}%</span
                    >
                    <span v-else>{{ son.remark }}</span>
                    ，状态：<em
                      v-if="son.remarkObj"
                      :class="{
                        finish: son.remarkObj.status == 1,
                        error: son.remarkObj.status == 2,
                      }"
                      >{{ son.remarkObj.status == 1 ? "通过" : "未通过" }}</em
                    >
                    <em v-else class="finish">{{ son.status }}</em
                    >，时间：
                    <p class="time">
                      {{ son.createdAt | formatDate }}
                    </p>
                    <span
                      v-if="son.remarkObj && son.remarkObj.isShow"
                      @click="handleTestResults(son)"
                      class="to-view"
                      >答题记录<i class="el-icon-arrow-right"></i
                    ></span>
                  </div>
                </div>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </div>
        <div
          class="pagination-algin"
          style="padding-bottom: 20px;"
          v-if="total > studyLogList.length"
        >
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pages.pageindex"
            :page-sizes="[PAGE_SIZE, 30, 50, 100, 200]"
            :page-size="pages.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="光荣榜" name="honor">
        <honours-list />
      </el-tab-pane>
      <el-tab-pane label="常见问题" name="issue">
        <ul class="account-problem-list">
          <li>
            <span>Q1：如何听课？</span>
            <p>
              电脑端，任意浏览器搜索“易北教育”，进入易北官网，使用您注册的账号和密码，即可登陆学习
            </p>
          </li>
          <li>
            <span>Q2：如何加入班级群？</span>
            <p>
              购买课程后，扫码添加张老师微信(ybmblex)，备注用户名，申请加入学习群
            </p>
          </li>
          <li>
            <span>Q3：课程是否可以回看？</span>
            <p>
              本课程支持有效期内无限次观看，没有学懂的地方您可以反复学习。
            </p>
          </li>
        </ul></el-tab-pane
      >
    </el-tabs>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { formatDateTime } from "@utils/tools";
import HonoursList from "@comp/HonoursList";
import { PAGE_SIZE, STUDY_TYPE } from "@config";

export default {
  name: "CourseTabs",

  components: {
    HonoursList,
  },

  props: {
    // 课程列表
    courseArray: {
      type: Array,
      default: () => {
        return [];
      },
    },
    // 用户学习进度
    userProgress: {
      type: Object,
      default: () => {
        return {};
      },
    },
    // 是否免费的
    isFree: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      courseCustomColor: "#004988",

      loading: true,

      courseList: [],
      activeName: "course",

      studyLogList: [],
      timelineLoading: false,

      pages: {
        pageindex: 1,
        pagesize: 30,
      },
      total: 0,

      STUDY_TYPE,
      PAGE_SIZE,

      courseListTest: [
        {
          id: "test",
          title: "综合测评",
        },
        {
          id: "strainTest",
          title: "应变测试",
        },
      ],
    };
  },

  computed: {
    ...mapGetters(["getUserInfo"]),
  },

  created() {
    this.initData();

    if (this.isFree) this.queryUserStudyLog();
  },

  methods: {
    /**
     * 初始数据
     */
    initData() {
      let nowIsStudy = 1; // 当前是否学习过
      let sumStudyChapter = 0; // 已学习的章节数
      let chapterAll = 0; // 章节总数
      let isStudy = true; // 是否学习过

      this.courseList = this.courseArray.filter((item) => {
        // 查找当前课程
        if (item.id === this.userProgress.currentcourseid) {
          nowIsStudy = 0;
          item.progress = this.handleChapterProgress(
            item.yibei_course_chapter,
            this.userProgress.currentcoursechapterid
          );

          // 步骤4 代表已经完成
          if (item.progress == 100 && this.userProgress.stepflag != 4)
            item.progress = 96;

          // 全部学习完成
          if (this.userProgress.status == 1) {
            item.progress = 100;
          }
        }

        // 计算总学习进度，type 1 为付费课程
        if (
          item.yibei_course_chapter &&
          item.type == 1 &&
          this.userProgress.status != 1
        )
          item.yibei_course_chapter.map((son) => {
            chapterAll++; // 总数

            if (son.id == this.userProgress.currentcoursechapterid)
              isStudy = false;

            if (isStudy) sumStudyChapter++; // 已学
          });

        // 已经学课程
        if (nowIsStudy) {
          item.progress = 100;
        }

        // 付费课程
        if (item.type > 0) return item;
      });

      this.loading = false;

      // 全部学习完成时候
      if (this.userProgress.status == 1) {
        this.$emit("getFinishChapter", 100); // 总进度
        this.queryAllTest(); // 综合测试的进度
      } else {
        // 总进度
        this.$emit(
          "getFinishChapter",
          Math.floor((sumStudyChapter / chapterAll || 0.1) * 10000) / 100
        );
      }
    },

    /**
     * 查找章节的进度
     */
    handleChapterProgress(list, id) {
      if (!list) return;

      // 总数
      const allCount = list.length;
      // 初始值
      let index = 1;

      for (let i = 0; i < allCount; i++) {
        if (list[i].id == id) return Math.trunc((index / allCount) * 100);
        index++;
      }
    },

    /**
     * 跳转到课程的章节列表
     */
    handleGoToChapter(row) {
      switch (row.id) {
        case "test":
          this.$router.push({
            name: "COURSE_CHAPTER_TEST",
          });
          break;

        case "strainTest":
          this.$router.push({
            name: "COURSE_CHAPTER_STRAIN_TEST",
          });
          break;

        default:
          this.$router.push({
            name: "COURSE_CHAPTER",
            query: {
              courseId: row.id,
              courseName: row.title,
            },
          });
      }
    },

    /**
     * 获取当前用户学习记录
     */
    async queryUserStudyLog() {
      this.timelineLoading = true;

      const { data: resData } = await this.$get("/user/getmemberstudylogs", {
        params: this.pages,
      });
      this.timelineLoading = false;
      if (!resData.data.status) return;

      this.total = resData.data.count;

      //格式化remark
      this.studyLogList = resData.data.dataList.map((item) => {
        if (item.courseChapterList)
          item.courseChapterList.map((son) => {
            if (son.remark.length > 40) {
              son.remarkObj = JSON.parse(son.remark);

              // 章节测试-答题记录显示
              if (son.remarkObj && son.remarkObj.type == 0) {
                son.remarkObj.isShow = 1;
              }

              // 其他测试及关键词-答题记录显示
              // 3:章节测前（关键词）  4:我错题测试  5:综合测试  6:高频测试
              // 7:我错题测前（关键词） 8:综合测前（关键词） 9:高频测前（关键词）
              if (
                son.remarkObj &&
                (son.remarkObj.type == 3 ||
                  son.remarkObj.type == 4 ||
                  son.remarkObj.type == 5 ||
                  son.remarkObj.type == 6 ||
                  son.remarkObj.type == 7 ||
                  son.remarkObj.type == 8 ||
                  son.remarkObj.type == 9 ||
                  son.remarkObj.type == 10 ||
                  son.remarkObj.type == 11)
              ) {
                // 时间：1630944000000  2021-9-7后的才有答题id
                if (
                  new Date(formatDateTime(son.createdAt)).getTime() >
                  1630944000000
                ) {
                  son.remarkObj.isShow = 1;
                }
              }
            }
            return son;
          });
        return item;
      });
    },

    /**
     * 锁住的课程提示
     */
    handleLockHint() {
      this.$confirm("您暂未购买课程，请购买后再回来学习此内容。", "抱歉！", {
        confirmButtonText: "去购买",
        cancelButtonText: "了解",
        type: "warning",
      }).then(() => {
        this.$router.push({
          name: "ORDER_INDEX",
        });
      });
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
     * 跳转到测试结果
     * 0:章节测试  3:章节测前（关键词）  4:我错题测试  5:综合测试  6:高频测试
     * 7:我错题测前（关键词） 8:综合测前（关键词） 9:高频测前（关键词）
     */
    handleTestResults(row) {
      const type = row.remarkObj.type;

      if (type == 0) {
        this.$router.push({
          name: "COURSE_TEST_RESULTS",
          query: {
            requestId: row.remarkObj.requestid,
            progressId: this.userProgress.id,
            progressStatus: 100,
            toView: 1,
          },
        });
      } else if (type == 4 || type == 5 || type == 6 || type == 11) {
        // 错误、综合练习、应变
        let errorType = 1;
        if (type == 4) errorType = 1;
        if (type == 5) errorType = 3;
        if (type == 6) errorType = 2;
        if (type == 11) errorType = 5;

        this.$router.push({
          name: "ERROR_TEST_DETAILS",
          query: {
            id: row.remarkObj.requestid,
            type: errorType,
            isIndex: 1,
          },
        });
      } else {
        // 得分
        const score = Math.floor(
          (row.remarkObj.correctcount / row.remarkObj.allcount) * 100
        );

        this.$router.push({
          name: "WORD_TEST_DETAILS",
          query: {
            type: row.remarkObj.type,
            status: row.remarkObj.status,
            startdate: row.remarkObj.startdate,
            enddate: row.remarkObj.enddate,
            ordercode: row.remarkObj.ordercode,
            allrequestcount: row.remarkObj.allcount,
            correctcount: row.remarkObj.correctcount,
            score,
          },
        });
      }
    },

    /**
     * 获取单元测试的总进度
     */
    async queryAllTest() {
      const resData = await this.$get("/user/getmembercttestdetaillog");
      if (!resData.data.data.status) return;

      let result = resData.data.data.data[0];
      if (!result) result = {};

      let progress = 0; // 综合测评进度
      let strainProgress = 0; // 应变测试进度

      // 我的错题
      if (result.error_testbeforekeyword_time) progress += 16.6;
      if (result.error_test_score) progress += 16.6;
      // if (Math.floor(result.error_test_score * 1000) / 10 > 90)
      //   progress += 16.6;

      // 高频错题
      if (result.gaoping_testbeforekeyword_time) progress += 16.6;
      if (result.gaoping_testbeforeword_score) progress += 16.6;
      // if (Math.floor(result.gaoping_testbeforeword_score * 1000) / 10 > 90)
      //   progress += 16.6;

      // 综合题
      if (result.zonghe_testbeforekeyword_time) progress += 16.6;
      if (result.zonghe_testbeforeword_score) progress += 16.6;
      // if (Math.floor(result.zonghe_testbeforeword_score * 1000) / 10 > 90)
      //   progress += 16.6;

      this.courseListTest[0].progress = Math.round(progress);

      // 如果没有做过单元测试，写入 默认为1%的进度
      if (progress == 0) this.courseListTest[0].progress = 1;

      // 应变测试
      if (result.strain_testbeforekeyword_time) strainProgress += 50;
      if (result.strain_testbeforeword_score) strainProgress += 50;
      // if (Math.floor(result.strain_testbeforeword_score * 1000) / 10 > 90)
      //   progress += 16.6;

      this.courseListTest[1].progress = strainProgress;

      // 应变测试没有进度时， 如果综合测试的题做完了，应变测试 写入默认为1%的进度
      if (this.courseListTest[0].progress >= 99.9 && strainProgress == 0)
        this.courseListTest[1].progress = 1;

      this.$forceUpdate();
    },

    /**
     * pageSize 改变时会触发
     */
    handleSizeChange(val) {
      this.pages.pagesize = val;
      this.pages.pageindex = 1;
      this.queryUserStudyLog();
    },

    /**
     * pageindex 改变时会触发
     */
    handleCurrentChange(val) {
      this.pages.pageindex = val;
      this.queryUserStudyLog();
    },

    /**
     * tabs 切换
     */
    handleClick(tab, event) {
      // console.log(tab, event);
    },
  },
};
</script>
