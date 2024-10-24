<style lang="scss" scope>
.final {
  max-width: 650px;
  .red {
    color: #db4040;
  }
  &-dialog {
    .el-dialog {
      width: 35%;
    }
  }
  &-title {
    font-size: 16px;
    color: #333;
    font-weight: 500;
    line-height: 1.6;
    em {
      color: #000;
      font-weight: 600;
      font-size: 18px;
    }
  }
  &-list {
    padding-top: 20px;
    li {
      display: flex;
      justify-content: space-between;
      text-align: center;
      span {
        font-size: 15px;
        width: 50%;
        padding: 10px 0;
      }
    }
  }
}
</style>

<template>
  <section>
    <study-head
      v-if="courseInfo.title"
      :chapteTitle="courseInfo.title"
      :studyProgress="courseProgressStatus"
      :courseId="params.courseId"
      :chapterId="params.chapterId"
      :progressId="params.progressId"
      :nowIndex="5"
      :isFinal="courseInfo.isfinal"
    />

    <!-- Final测前 单词测试-->
    <template v-if="isShowWord">
      <matching-word
        :courseWordList="matchingList"
        :courseId="params.courseId"
        :chapterId="params.chapterId"
        @pass="handleWordPass"
        @getTestInfo="handleTestScore"
        ref="matching"
      />
      <!-- 学习历史记录 7:单元测试前关键词记录  -->
      <study-history
        key="1"
        v-if="matchingList.length > 0 && isShowWord && loading == false"
        :courseId="params.courseId"
        :chapterId="params.chapterId"
        type="7"
        ref="studyHistoryRef"
      />
    </template>

    <div class="studys-wp studys-test" v-loading="loading" v-else>
      <div class="studys-test-title">
        <div class="studys-test-title__times">
          <ul class="index">
            <li style="margin-bottom: 5px;">
              题号<span
                ><em> {{ courseTestIndex + 1 }}</em
                >/{{ courseTestList[0].length }}</span
              >
            </li>
            <li>
              测试剩余时间<em>{{ letTimes.nowTime || "00:00:00" }}</em>
            </li>
          </ul>
        </div>
        <div
          class="studys-test-title__content"
          v-html="courseTestList[0][courseTestIndex].title"
        ></div>
      </div>
      <div class="studys-test-answer">
        <el-radio-group v-model="courseTestList[0][courseTestIndex].answer">
          <div
            class="item"
            v-for="(item, index) in courseTestList[0][courseTestIndex].options"
            :key="item.id"
          >
            <span class="item-letter"
              >{{ String.fromCharCode(65 + index) }}.</span
            >
            <div
              class="item-option"
              :class="{
                select: courseTestList[0][courseTestIndex].answer == item.id,
              }"
            >
              <el-radio :label="item.id"
                >{{ item.content }}
                <a class="aaaaa">-{{ item.iscorrectoption }}</a></el-radio
              >
            </div>
          </div>
        </el-radio-group>
      </div>
      <!--按钮区 -->
      <div class="studys-word-btns">
        <el-button
          size="medium"
          style="width: 360px;max-width: 90%;"
          class="el-button--big"
          type="primary"
          :disabled="loading"
          @click="handleTestNext"
          >{{
            courseTestIndex >= courseTestList[0].length - 1
              ? "完成测试"
              : "下一题"
          }}</el-button
        >
      </div>

      <!-- 学习历史记录 6：单元测试 -->
      <study-history
        key="2"
        v-if="courseTestList.length > 0 && !isShowWord && loading == false"
        :courseId="params.courseId"
        :chapterId="params.chapterId"
        type="6"
        ref="studyHistoryRef2"
      />
    </div>

    <!-- Final 测试提示 -->
    <el-dialog
      title="提示"
      :visible.sync="finalTestShow"
      :before-close="handleFinalClose"
      class="final-dialog"
      center
    >
      <div class="final">
        <h5 class="final-title">
          请尽量在三次以内通过Final测试！您还剩余
          <em>{{ finalTestNum }}</em> 次机会！
        </h5>
        <!-- <ul class="final-list" v-if="finalTestList.length > 0">
          <li>
            <span>时间</span>
            <span>状态</span>
          </li>
          <li v-for="(item, index) in finalTestList" :key="index">
            <span>{{ item.createdAt | formatDate }}</span>
            <span class="red">未通过</span>
          </li>
        </ul> -->
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleFinalClose">关闭</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import axios from "axios";
import { adjustmentStepSort, setTimer, removeInterval } from "@utils/tools";
import { addStudyTime, reviewCourse } from "@api/common";
import MatchingWord from "@comp/MatchingWord";
import studyHistory from "@comp/studyHistory";
import StudyHead from "./components/StudyHead";
import watermark from "watermark-dom";

// 取消请求
const CancelToken = axios.CancelToken;

export default {
  components: {
    MatchingWord,
    studyHistory,
    StudyHead,
  },

  data() {
    return {
      courseProgressStatus: null, // 当前的进度

      activeName: "video",
      params: {},
      playFlip: false,

      navList: [],
      navListSrt: "",

      autoplay: false,

      letTimes: { nowTime: "" },
      interval: null,

      courseInfo: {
        dcwordsList: [],
        requestPaperList: [],
      },

      loading: true,

      courseTestList: [
        [
          {
            answer: null,
            yibei_requestion_const: {},
            yibei_requestion_const_option: [],
          },
        ],
      ],
      courseTestIndex: 0,
      courseTestProgress: 0,
      courseTestInfo: {},
      courseTestStartdate: 0,
      courseTestEnddate: 0,
      courseTestGuide: 0,

      courseProgress: {},

      userInfo: JSON.parse(sessionStorage.getItem("userInfo")),

      studyTime: null,

      courseTestTime: 15 * 60 * 1000,

      matchingList: [],
      isShowWord: false,
      isWordStudy: false,

      finalTestNum: 0,
      finalTestShow: false,
      finalTestList: [],

      source: CancelToken.source(),

      userProgress: {},
    };
  },

  async created() {
    //增加学习总时长
    this.addStudyTimeTimeout();

    if (this.$route.query.courseId) {
      this.params.courseId = this.$route.query.courseId; //课程id
      this.params.chapterId = this.$route.query.chapterId; //章节id
      this.params.progressId = this.$route.query.progressId; //总进度id
    }

    this.queryWordIsStudy();

    await this.queryFinalTestNum();
    await this.queryCourseInfo();

    this.queryCourseProgress();

    this.queryCourseTestInfo(0);

    this.queryUserProgress();

    // 复习
    if (this.$route.query.isReview == 1 && this.courseInfo.isreview == 0)
      await reviewCourse({
        courseid: this.params.courseId,
        chapterid: this.params.chapterId,
        ispay: this.courseInfo.courseObj.type,
        status: 3, // 状态：0：视频学习中  1：视频学习完成 2： 单词中英完成  3：单词英完成  4：单元测试完成（复习完成）
      });
  },

  watch: {
    "$store.getters.getGuideShow"(newVal, oldVal) {
      if (newVal) this.openNoviceGuide();
    },
  },

  mounted() {
    this.$nextTick(() => {
      // 禁用右键
      document.oncontextmenu = new Function("event.returnValue=false");
      // 禁用选择
      document.onselectstart = new Function("event.returnValue=false");
    });
  },

  methods: {
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

      this.courseInfo = resData.data.data;

      //如果有视频，就增加视频选项
      if (this.courseInfo.videopath)
        this.navList.push({
          id: 1,
          title: "视频学习",
          type: 0,
        });

      //如果有单词，就增加单词选项
      if (this.courseInfo.dcwordsList.length)
        this.courseInfo.dcwordsList.forEach((item, index) => {
          if (index == 0)
            this.navList.push({
              id: 2,
              title: "单词练习（中英)",
              type: 1,
            });
          if (index == 1)
            this.navList.push({
              id: 3,
              title: "单词练习（英)",
              type: 2,
            });
        });

      //如果有测试，就增加测试选项
      if (this.courseInfo.requestPaperList.length)
        this.courseInfo.requestPaperList.forEach((item, index) => {
          if (index == 0)
            this.navList.push({
              id: 4,
              title: "单元测试",
              type: 3,
            });
        });

      this.navListSrt = this.navList.map((a) => a.id).join(",");
      // this.loading = false;
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
        this.courseProgress?.status || 0
      );

      // 复习时是否能测试
      this.handleIsTest();
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
     * 将进度重置到某一课程的第一章
     */
    async handleResetProgressCourse() {
      // 总学习进度中的课程id 大于 当前课程id时，直接return
      if (this.userProgress.currentcourseid > this.params.courseId) {
        return;
      }

      this.$post("/course/resetprogresstocourse", {
        progressid: this.params.progressId,
        courseid: this.params.courseId,
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
    },

    /**
     * 获取测试信息
     */
    async queryCourseTestInfo(index) {
      const { data: resData } = await this.$get("/course/getrequestpaper", {
        params: {
          paperid: this.courseInfo.requestPaperList[index].requestpaperid,
        },
        cancelToken: this.source.token,
      });

      if (!resData.data.status) return;

      this.courseTestInfo = resData.data.data;

      this.queryCourseTestList(index);
    },

    /**
     * 获取测试题列表
     */
    async queryCourseTestList(index) {
      if (!this.courseInfo.requestPaperList)
        return this.$message.error("没有测试！");

      this.loading = true;
      const { data: resData } = await this.$get("/course/getcoursetestlist", {
        params: {
          requestpaperid: this.courseInfo.requestPaperList[index]
            .requestpaperid,
        },
        cancelToken: this.source.token,
      });

      if (!resData.data.status) return;

      // 获取测试时间
      if (this.courseTestInfo.timelimit)
        this.courseTestTime = this.courseTestInfo.timelimit * 60 * 1000;

      // 单词匹配
      resData.data.dataList.forEach((item) => {
        if (
          item.yibei_newdcword_paper_const.length > 0 &&
          item.yibei_newdcword_paper_const[0]["yibei_newdcword_paper_const.id"]
        ) {
          // this.matchingList.push({
          //   atitle:
          //     item.yibei_newdcword_paper_const[0][
          //       "yibei_newdcword_paper_const.atitle"
          //     ],
          //   btitle:
          //     item.yibei_newdcword_paper_const[0][
          //       "yibei_newdcword_paper_const.btitle"
          //     ],
          //   id:
          //     item.yibei_newdcword_paper_const[0][
          //       "yibei_newdcword_paper_const.id"
          //     ],
          //   chapterTitle:
          //     item.yibei_requestion_const && item.yibei_requestion_const.title,
          // });
          this.matchingList.push({
            ...item.yibei_newdcword_paper_const[0].yibei_newdcword_paper_const,
            chapterTitle:
              item.yibei_requestion_const && item.yibei_requestion_const.title,
          });
        }
      });

      // 测试前，做先做关键词测试
      if (
        this.courseInfo.isbindword == 1 &&
        this.isWordStudy &&
        this.matchingList.length > 0
      ) {
        this.isShowWord = true;
        this.$alert("您需要答对 90% 关键词，才能做试题！", {
          confirmButtonText: "确定",
          title: "提示",
          callback: (action) => {
            this.$refs.matching.handleSetTimer();
          },
        });
      } else {
        if (this.courseInfo.isfinal == 1) {
          this.finalTestShow = true;
        } else {
          this.handleSetTimer(2);
        }
      }

      //获取修改的列表
      const list = resData.data.dataList.map((item) => {
        return {
          title:
            item.yibei_requestion_const && item.yibei_requestion_const.content,
          //选项随机
          options:
            item.yibei_requestion_const_option &&
            item.yibei_requestion_const_option.sort(() => {
              return Math.random() - 0.5;
            }),
          answer: null,
          id: item.id,
          requestid: item.requestionid,
          category:
            item.yibei_requestion_const && item.yibei_requestion_const.category,
        };
      });

      //过滤空标题、无答案的题
      const filterList = list.filter((item) => {
        if (item.title && item.options.length > 0) return item;
      });

      // 设置元素值
      this.$set(this.courseTestList, index, filterList);

      this.loading = false;

      // this.matchingList.length = 2;
      // this.courseTestList[0].length = 3;

      // 添加水印
      const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      if (userInfo)
        watermark.load({
          monitor: false,
          watermark_txt: userInfo.username,
          watermark_alpha: 0.1,
          watermark_fontsize: "14px",
          watermark_x_space: 100, //水印x轴间隔
          watermark_y_space: 100,
          watermark_rows: 3, //水印行数
          watermark_cols: 5,
        });
    },

    /**
     * 处理计时器
     */
    async handleSetTimer() {
      // 测试开始时间
      this.courseTestStartdate = new Date().getTime();

      // 预计结束时间
      this.courseTestEnddate = this.courseTestStartdate + this.courseTestTime;

      // 获取定时器信息
      const getIntervalInfo = (interval) => {
        this.interval = interval; // 定时器的id
      };

      // 获取时间回调
      const getTimeCall = (timeObj) => {
        const { hour, minute, second } = timeObj;
        this.letTimes.nowTime = `${hour}:${minute}:${second}`;
      };

      // 计时器完成回调
      const finishTimeCall = () => {
        // 答题结束时间
        if (new Date().getTime() <= this.courseTestEnddate)
          this.courseTestEnddate = new Date().getTime();

        this.$alert("很遗憾，答题已超时，请重新测试！", {
          confirmButtonText: "确定",
          title: "提示",
          callback: (action) => {
            this.testSubmit(0);
          },
        });
      };

      await setTimer(
        this.courseTestEnddate,
        getIntervalInfo,
        getTimeCall,
        finishTimeCall
      );
    },

    /**
     * Final 提示关闭
     */
    handleFinalClose() {
      this.finalTestShow = false;
      this.handleSetTimer();
    },

    /**
     * 获取Final章节的关键词是否己学习过
     */
    async queryWordIsStudy() {
      const { data: resData } = await this.$get("/user/getcoursechatperother", {
        params: {
          courseid: this.params.courseId || 0,
          chapterid: this.params.chapterId || 0,
        },
      });
      if (!resData.data.status) return 0;

      this.isWordStudy = resData.data.count == 0 ? true : false;
    },

    /**
     * 删除Final章节的关键词是否己学习过
     */
    handleWordDelStudy() {
      this.$post("/user/deletecoursechatperother", {
        courseid: this.params.courseId || 0,
        chapterid: this.params.chapterId || 0,
      });
    },

    /**
     * 设置Final章节的关键词是否己学习过
     */
    async setWordIsStudy() {
      this.$post("/user/creatcoursechatperother", {
        courseid: this.params.courseId || 0,
        chapterid: this.params.chapterId || 0,
      });
    },

    /**
     * 单元测试下一步
     */
    handleTestNext() {
      if (this.courseTestList[0][this.courseTestIndex].answer == null)
        return this.$message.error("请选择答案！");

      if (this.courseTestIndex < this.courseTestList[0].length - 1) {
        ++this.courseTestIndex;
      } else {
        this.handleTestSubmit(0); //提交
      }
    },

    /**
     * 单元测试提交
     */
    handleTestSubmit(index) {
      this.$confirm("是否提交本次测试", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        this.testSubmit(index);

        // 删除中文单词测试通过的id
        const oldData = sessionStorage.getItem("reviewIdList") || "";
        if (oldData) {
          const newData = oldData
            .split(",")
            .filter((id) => id != this.params.chapterId);

          if (newData)
            sessionStorage.setItem("reviewIdList", newData.join(","));
          else sessionStorage.setItem("reviewIdList", "");
        }
      });
    },

    /**
     * 获取关键词的测试信息
     */
    handleTestScore(obj) {
      // 向访问记录中添加“测试得分”和“测试完成时间”
      this.$refs.studyHistoryRef.setStudyConst(obj.passingRate, new Date());
    },

    /**
     * 提交测试
     */
    async testSubmit(index) {
      // this.params.loading = true;

      // 答题提交时间
      if (new Date().getTime() <= this.courseTestEnddate)
        this.courseTestEnddate = new Date().getTime();

      let correctcount = 0; //正确数量

      //所有题
      let requestList = this.courseTestList[0].map((item) => {
        let row = item.options.find(
          (a) => a.id == item.answer && a.iscorrectoption == 1
        );

        //正确数量
        if (row) correctcount++;

        return {
          requestid: item.requestid,
          title: item.title,
          category: item.category,
          memberanswser: item.answer,
          status: row ? 1 : 2, //1：正确 2：错误
        };
      });

      let score = Math.floor(
        (correctcount / this.courseTestList[0].length) * 100
      ); //得分

      // 向访问记录中添加“测试得分”和“测试完成时间”
      this.$refs.studyHistoryRef2.setStudyConst(score, new Date());

      let params = {
        progressid: this.params.progressId,
        courseid: this.params.courseId,
        chapterid: this.params.chapterId,
        requestpaperid: this.courseInfo.requestPaperList[index].requestpaperid,
        correctcount,
        errorcount: this.courseTestList[0].length - correctcount,
        score,
        startdate: this.courseTestStartdate,
        enddate: this.courseTestEnddate,
        status: score >= this.courseTestInfo.qualifiedproportion * 100 ? 1 : 2, // 1：测试通过 2：测试不通过
        requestList,
      };

      // 复习通过时
      if (
        params.status == 1 &&
        this.$route.query.isReview == 1 &&
        this.courseInfo.isreview == 0
      ) {
        reviewCourse({
          courseid: this.params.courseId,
          chapterid: this.params.chapterId,
          status: 4, // 状态：0：视频学习中  1：视频学习完成 2： 单词中英完成  3：单词英完成  4：单元测试完成（复习完成）
        });
      }

      const { data: resData } = await this.$post(
        "/course/submitrequestall",
        {
          ...params,
          isfinal: this.courseInfo.isfinal,
        },
        {
          headers: {
            isLoading: true,
          },
        }
      );

      if (!resData.data.status) return;

      // 删除关键词记录
      this.handleWordDelStudy();

      if (params.status == 1) {
        // 学习通过
        await this.handleStudyPass();
        // this.handleResetStudyDel();
      } else {
        //答错2次，进度跳到单词

        if (
          resData.data.lefttestcount == 1 &&
          this.navListSrt.indexOf(2) > -1
        ) {
          this.handleStudyStatus(1);
        }

        //答错3次，进度跳到视频
        if (
          resData.data.lefttestcount == 0 &&
          this.navListSrt.indexOf(1) > -1
        ) {
          this.handleStudyStatus(0);
        }

        //答错3次，并且是final章节
        // if (resData.data.lefttestcount == 0 && this.courseInfo.isfinal == 1) {
        //   this.handleResetStudy();
        //   this.handleResetProgressCourse();
        // }
        if (resData.data.lefttestcount == 0 && this.courseInfo.isfinal == 1) {
          // 三次final章节不过，写记录
          await this.handleThreeNoPassFinal();
          // 学习通过
          await this.handleStudyPass();
        }
      }

      // 清除所有定时器
      removeInterval(this.interval);

      this.$router.replace({
        name: "COURSE_TEST_RESULTS",
        query: {
          progressId: this.params.progressId,
          courseId: this.params.courseId,
          chapterId: this.params.chapterId,
          requestPaperId: this.courseInfo.requestPaperList[index]
            .requestpaperid,
          lefttestcount: resData.data.lefttestcount, //剩余机会
          rank: resData.data.rank, //排名
          isthreeerrorcount: resData.data.isthreeerrorcount,
          progressStatus: this.courseProgress?.status || 0, //判断此章节是否已经学习过
          navList: this.navListSrt, //判断这个流程有不有 视频、单词、测试
          score: Number(this.courseTestInfo.qualifiedproportion * 100),
          testRequestId: resData.data.requestid,
          isReview: this.$route.query.isReview || "",
          chapteTitle: this.courseInfo.title,
          isFinal: this.courseInfo.isfinal,
        },
      });
    },

    /**
     * 处理学习通过
     */
    async handleStudyPass() {
      this.loading = true;

      // 测试通过
      await this.handleStudyStatus(4);

      // 将学习进度移动到下一章节，后台接口去判断是否下移，这里在通过时调用就行了
      this.handleNextProgress();

      // 修改本节课程状态为完成
      this.handleChapterProgress(1);

      this.loading = false;
    },

    /**
     * 学习状态
     * -1:未开始  0：视频学习中  1：单词中英  2：单词英  3：单元测试中  4：完成
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
     * 获取章节的机会次数
     */
    async queryFinalTestNum() {
      const { data: resData } = await this.$get("/course/getsubmitcount", {
        params: {
          progressid: this.params.progressId,
          courseid: this.params.courseId,
          chapterid: this.params.chapterId,
        },
      });
      if (!resData.data.status) return;

      this.finalTestNum = resData.data.lefttestcount;
      this.finalTestList = resData.data.testList;
    },

    /**
     * 返回视频
     */
    handleBackVideo() {
      this.$confirm("您是否要返回视频学习?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.handleTabsGoTo(0);
        })
        .catch(() => {});
    },

    /**
     * 三次final不过，写记录
     */
    async handleThreeNoPassFinal() {
      this.loading = true;
      const { data: resData } = await this.$post(
        "/course/threeprogresstocourse",
        {
          progressid: this.params.progressId,
          courseid: this.params.courseId,
          chapterid: this.params.chapterId,
        }
      );
      this.loading = false;
      if (!resData.data.status) return false;
    },

    /**
     * 重置本章学习-三次flnal不过写记录
     */
    async handleResetStudy() {
      const { data: resData } = await this.$post(
        "/course/createthreefinalerror",
        {
          courseid: this.params.courseId,
          chapterid: this.params.chapterId,
        }
      );

      if (!resData.data.status) return false;

      this.$message.error({
        message:
          "您第三次测试失败，说明您没有很好地掌握本章节，系统即将自动返回，重新学习整个章节！请记住，学习没有捷径！",
        duration: 20000,
      });
    },

    /**
     * 移除三次flnal不过记录
     */
    async handleResetStudyDel() {
      const { data: resData } = await this.$post(
        "/course/refundthreefinalerror",
        {
          courseid: this.params.courseId,
          chapterid: this.params.chapterId,
        }
      );
    },

    /**
     * 测试成功，重置进度为下一章
     */
    async handleNextProgress() {
      this.loading = true;

      const { data: resData } = await this.$post(
        "/course/getnextcoursechatper",
        {
          progressid: this.params.progressId,
          courseid: this.params.courseId,
          chapterid: this.params.chapterId,
          isupdateprogress: 1, // 是否修改总进度
        }
      );

      this.loading = false;

      if (!resData.data.status) return;

      // this.nextInfo = resData.data;
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
     * 处理通过关键词
     */
    handleWordPass() {
      this.isShowWord = false;

      // 写入单词学习记录
      this.setWordIsStudy();

      if (this.courseInfo.isfinal == 1) {
        this.finalTestShow = true;
      } else {
        // 处理计时器
        this.handleSetTimer(4);
      }
    },

    /**
     * 跳转页面
     */
    // handleGoTo(name) {
    //   this.$router.push({
    //     name,
    //   });
    // },

    /**
     * 增加学习总时长
     */
    addStudyTimeTimeout() {
      this.studyTime = setInterval(async () => {
        await addStudyTime();
      }, 10000);
    },

    /**
     * 是否可以测试
     * 复习时，必须通过【英文关键词测试】后，才能单元测试
     */
    handleIsTest() {
      const reviewIdList = sessionStorage.getItem("reviewIdList") || "";

      // 课程名字中包含（只有题目）的，也只有测试，所以他和章节终章一样
      if (
        this.courseInfo.isfinal == 1 ||
        this.courseInfo.title.indexOf("只有题目") >= 0
      )
        return;

      if (
        (this.$route.query.isReviewWordTest == 1 ||
          this.courseProgress.status == 4) &&
        reviewIdList.indexOf(this.params.chapterId) == -1
      ) {
        this.$message.error(
          "复习时，必须先通过【步骤5 英文关键词测试】,才能单元测试!"
        );
        this.$router.replace({
          name: "COURSE_STUDY_WORD_ENGLISH_TEST",
          query: {
            courseId: this.params.courseId,
            chapterId: this.params.chapterId,
            progressId: this.params.progressId,
            isReviewWordTest: this.$route.query.isReviewWordTest,
          },
        });
      }
    },
  },

  /**
   * 页面销毁
   */
  destroyed() {
    // 移出水印
    watermark.remove();

    // 禁用右键
    document.oncontextmenu = new Function("event.returnValue=true");

    // 禁用选择
    document.onselectstart = new Function("event.returnValue=true");
  },

  beforeDestroy() {
    // 取消请求
    this.source.cancel("取消请求");

    // 清除所有定时器
    removeInterval(this.interval || this.studyTime);
  },
};
</script>
