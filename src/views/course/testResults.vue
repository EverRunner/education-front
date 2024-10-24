<style lang="scss" scoped>
.topic {
  &-title {
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #222222;
    line-height: 28px;
    padding: 30px 0 20px;
    display: flex;
    position: relative;
    p {
      font-size: 20px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #222222;
    }
  }
  &-answer {
    &-item {
      font-size: 18px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #222;
      min-height: 36px;
      line-height: 36px;
      margin: 12px 0;
      padding-left: 5px;
      margin-bottom: 5px;
      &.error {
        .el-radio__input.is-checked .el-radio__inner {
          background-color: #db4040 !important;
          border-color: #db4040 !important;
        }
        .el-radio__input.is-checked + .el-radio__label {
          color: #db4040 !important;
        }
        .el-radio__label {
          color: #db4040 !important;
        }
      }
      &.yes {
        .el-radio__label {
          color: #16c674 !important;
        }
      }
      &.correct {
        border: 1px solid #16c674;
      }
    }
  }
  &-parsing {
    margin-top: 15px;
    background: #f6f6f6;
    padding: 15px 30px;
    font-size: 20px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    line-height: 1.5;
    color: #16c674;
    p {
      font-weight: 500;
      padding-top: 5px;
      white-space: pre-wrap;
    }
    &.error {
      color: #db4040;
    }
  }
}
</style>

<template>
  <section>
    <!-- :courseId="params.courseId" -->
    <study-head
      :chapteTitle="$route.query.chapteTitle"
      :studyProgress="6"
      :chapterId="params.chapterId"
      :progressId="params.progressId"
      :nowIndex="5"
    />

    <div class="studys-wp studys-results">
      <div class="studys-results-title" v-loading="infoLoading">
        <h1>测试结果</h1>
        <div class="studys-results-head">
          <div class="text">
            <h5>
              结果：<em :class="{ error: info.status != 1 }">{{
                info.status == 1 ? "通过" : "未通过"
              }}</em>
            </h5>
            <p>（{{ hintText }}）</p>
            <ul class="text-info">
              <li>
                用时<em>{{ testTime }}</em>
              </li>
              <li>
                总共 <em>{{ info.allrequestcount }}</em
                >题
              </li>
              <li>
                正确<em class="success">{{ info.correctcount }}</em
                >题
              </li>
              <li>
                得分<em class="error">{{ info.score }}</em
                >分
              </li>
            </ul>
          </div>

          <div class="btns">
            <div class="btns-reset" v-if="$route.query.toView == 1">
              <el-button
                size="medium"
                class="el-button--big"
                type="primary"
                @click="$router.go(-1)"
                >返回首页</el-button
              >
              <p>-</p>
            </div>
            <template v-else>
              <div
                class="btns-pass"
                v-if="
                  info.status == 1 ||
                    ($route.query.lefttestcount == 0 &&
                      $route.query.isFinal == 1)
                "
              >
                <el-button
                  size="medium"
                  class="el-button--big"
                  type="primary"
                  plain
                  @click="handleGoTo('COURSE_STUDY_TEST')"
                  >重新测试</el-button
                >
                <el-button
                  size="medium"
                  class="el-button--big"
                  type="primary"
                  @click="handleNextGoTo"
                  >进入下一节</el-button
                >
              </div>
              <div class="btns-reset" v-else>
                <template
                  v-if="navList.indexOf(1) == -1 || navList.indexOf(2) == -1"
                >
                  <el-button
                    v-if="$route.query.lefttestcount == 0"
                    size="medium"
                    class="el-button--big"
                    type="primary"
                    @click="$router.go(-1)"
                    >返回章节学习</el-button
                  >
                  <el-button
                    v-else
                    size="medium"
                    class="el-button--big"
                    type="primary"
                    @click="handleGoTo('COURSE_STUDY_TEST')"
                    >重新测试</el-button
                  >
                </template>
                <template v-else>
                  <el-button
                    v-if="$route.query.lefttestcount == 0"
                    size="medium"
                    class="el-button--big"
                    type="primary"
                    @click="handleGoTo('COURSE_STUDY_VIDEO')"
                    >重新学习视频</el-button
                  >
                  <el-button
                    v-if="$route.query.lefttestcount == 1"
                    size="medium"
                    class="el-button--big"
                    type="primary"
                    @click="handleGoTo('COURSE_STUDY_WORD')"
                    >重新学习关键词</el-button
                  >
                  <el-button
                    v-if="$route.query.lefttestcount == 2"
                    size="medium"
                    class="el-button--big"
                    type="primary"
                    @click="handleGoTo('COURSE_STUDY_TEST')"
                    >重新测试</el-button
                  >
                </template>
                <p>（剩余 {{ $route.query.lefttestcount }} 次机会）</p>
              </div>
            </template>
          </div>
        </div>
      </div>

      <!-- 题目 -->
      <div
        class="studys-results-list"
        v-loading="testListLoading"
        ref="resultsList"
      >
        <div class="item" v-for="(item, index) in testList" :key="index">
          <div class="item-index">
            {{ (pages.pageindex - 1) * PAGE_SIZE + index + 1 }}.
            <i
              :class="{
                'el-icon-error': item.status == 2,
                'el-icon-success': item.status == 1,
              }"
            ></i>
          </div>

          <div class="item-content" v-html="item.title"></div>
          <div class="item-answer">
            <el-radio-group v-model="item.memberanswser" disabled>
              <div
                v-for="(son, key) in item.yibei_requestion_const_option"
                :key="key"
                class="item-answer-topic"
              >
                <span class="item-answer-letter"
                  >{{ String.fromCharCode(65 + key) }}.</span
                >
                <div
                  :class="[
                    'item-answer-option',
                    { select: item.status == 2 && son.iscorrectoption == 1 },
                    { error: item.status == 2 && son.id == item.memberanswser },
                    {
                      yes:
                        son.iscorrectoption == 1 &&
                        son.id == item.memberanswser,
                    },
                  ]"
                >
                  <el-radio :label="son.id">{{ son.content }}</el-radio>
                </div>
              </div>
            </el-radio-group>
          </div>
          <div
            v-if="
              item.yibei_requestion_const &&
                item.yibei_requestion_const.answeranalysis
            "
            :class="[
              'topic-parsing',
              {
                error: item.status == 2,
              },
            ]"
          >
            <p>解析：{{ item.yibei_requestion_const.answeranalysis }}</p>
          </div>
        </div>
      </div>

      <div class="pagination-algin" v-if="total > testList.length">
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

      <div style="padding-bottom: 50px;text-align: center;">
        <el-button
          v-if="info.score < 100 && testList.length > 0"
          @click="handleEorroGoto"
          plain
          type="danger"
          >请点进这里，可进入错题练习</el-button
        >
      </div>
    </div>
  </section>
</template>

<script>
import StudyHead from "./components/StudyHead";
import "@/utils/directives";
import watermark from "watermark-dom";

export default {
  components: { StudyHead },

  data() {
    return {
      params: {},

      infoLoading: true,
      info: {
        constList: [],
      },

      testList: [],
      testListLoading: true,
      PAGE_SIZE: 30,
      pages: {
        pageindex: 1,
        pagesize: 30,
      },
      total: 0,
      testTime: "00:00:00",

      nextInfo: {},

      hintText: "",

      navList: "",

      goto: 3,

      showResetTest: false,
    };
  },

  async created() {
    if (this.$route.query.progressId) {
      this.params.progressId = this.$route.query.progressId; //测试题id
      this.params.courseId = this.$route.query.courseId; //总进度id
      this.params.chapterId = this.$route.query.chapterId; //总进度id
      this.params.requestPaperId = this.$route.query.requestPaperId; //总进度id
      this.navList = this.$route.query.navList;
    }

    if (this.$route.query.rank) {
      // 还有0次机会
      if (this.$route.query.lefttestcount == 0) {
        // 有无视频内容时
        if (this.navList.indexOf(1) > -1) {
          this.hintText = "很抱歉，您三次没有通过单元测试，请重新学习视频！";
          this.goto = 0; //视频
        } else {
          this.hintText = `很抱歉，您三次没有通过单元测试（Final），建议您重新学习整个章节！`;
          this.goto = null; //测试
          this.$alert(
            "啊哦，第三次测试又挂喽！<br/>我们一起找找原因吧!<br/>首先答题的时候，<br/>是否能判断考点，<br/>也就是问题问什么？<br/><br/>如果看不懂题，<br/>那么就是关键词找不到，<br/>请多看单词卡，<br/>并且在关键词练习时，<br/>一定要思考它们围绕什么样的知识点，<br/>找到关键词就能判断考点！<br/>如果能够读懂题意，<br/>但是不知道怎么判断，<br/>那么就是知识点没有掌握住，<br/>请再多看一下视频课程，<br/>或是直接询问张老师，<br/>明白了原理，才能够记住，<br/>并且灵活运用！<br/>千万不要死记硬背反反复复刷题闯关，<br/>答对和学会，<br/>是两个完全不同的概念，<br/>大家一定要学会思考提问，<br/>学会考题，<br/>才能顺利通过考试！",
            "三次未通过Final测试",
            {
              dangerouslyUseHTMLString: true,
              customClass: "results-final-alert",
              confirmButtonText: "了解",
              callback: (action) => {},
            }
          );
        }
      }

      // 还有1次机会
      if (this.$route.query.lefttestcount == 1) {
        // 有无视频关键字时
        if (this.navList.indexOf(2) > -1) {
          this.hintText = "很抱歉，您两次没有通过单元测试，请重新学习关键词！";
          this.goto = 1; //单词
        } else {
          this.hintText = `很抱歉，您两次没有通过单元测试（Final），请继续努力！`;
          this.goto = null; //测试
          this.showResetTest = true;
        }
      }

      // 还有2次机会，重新测试
      if (this.$route.query.lefttestcount == 2) {
        this.showResetTest = true;
        this.hintText = `很抱歉，得分大于${this.$route.query.score}分，才能进入下一章节学习，请继续努力！`;
        this.goto = 3; //测试
      }
    }

    if (this.$route.query.requestId) {
      this.queryTestInfo();
    } else {
      await this.queryInfo();

      // 课程id和章节id都有时，代表从测试过来的，并且通过了; 或都是final测试三次未通过
      if (
        (this.$route.query.courseId &&
          this.params.chapterId &&
          this.info.status == 1) ||
        (this.$route.query.lefttestcount == 0 && this.$route.query.isFinal == 1)
      )
        this.handleNextProgress();
    }
  },

  mounted() {
    this.queryTestList();

    this.$nextTick(() => {
      // 禁用右键
      document.oncontextmenu = new Function("event.returnValue=false");
      // 禁用选择
      document.onselectstart = new Function("event.returnValue=false");
    });
  },

  methods: {
    /**
     * 获取测试信息
     */
    async queryInfo() {
      this.infoLoading = true;

      const { data: resData } = await this.$get("/course/getrequestreslut", {
        params: {
          progressid: this.params.progressId,
          requestpaperid: this.params.requestPaperId,
        },
      });
      this.infoLoading = false;
      if (!resData.data.status) return;

      this.info = resData.data.data;

      if (this.info.status == 1) this.hintText = "恭喜您，已通过单测试";

      this.handleTestTime(
        (new Date(this.info.enddate).getTime() -
          new Date(this.info.startdate).getTime()) /
          1000
      );
    },

    /**
     * 获取测试信息-直接看记录的-首页跳过来的
     */
    async queryTestInfo() {
      this.infoLoading = true;

      const { data: resData } = await this.$get(
        "/course/getrequestreslutbyrequestid",
        {
          params: {
            requestid: this.$route.query.requestId,
          },
        }
      );
      this.infoLoading = false;

      if (!resData.data.status) return;

      this.info = resData.data.data;

      this.handleTestTime(
        (new Date(this.info.enddate).getTime() -
          new Date(this.info.startdate).getTime()) /
          1000
      );
    },

    /**
     * 获取答题列表
     */
    async queryTestList() {
      this.testListLoading = true;

      // 直接看记录的 - 首页跳过来的
      const { data: resData } = await this.$get(
        "/course/getquestresbyrequestid",
        {
          params: {
            requestid:
              this.$route.query.requestId || this.$route.query.testRequestId,
            ...this.pages,
          },
        }
      );
      this.testListLoading = false;

      if (!resData.data.status) return;

      this.total = resData.data.data.count;

      //修改数据
      const list = resData.data.data.rows.map((item) => {
        item.memberanswser = Number(item.memberanswser);
        return item;
      });

      //过滤空标题、无答案的题
      this.testList = list.filter((item) => {
        if (item.title && item.yibei_requestion_const_option.length > 0)
          return item;
      });

      // 添加水印
      setTimeout(() => {
        const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
        if (userInfo)
          watermark.load({
            monitor: false,
            watermark_parent_node: this.$refs.resultsList, //水印总体的id
            watermark_txt: userInfo.username,
            watermark_alpha: 0.1,
            watermark_fontsize: "14px",
            watermark_x_space: 100, //水印x轴间隔
            watermark_y_space: 100,
            watermark_rows: 3, //水印行数
            watermark_cols: 5,
          });
      }, 10);

      // 测试过来的
      // const { data: resData } = await this.$get(
      //   "/course/getrequesttestconstpagelist",
      //   {
      //     params: {
      //       progressid: this.params.progressId,
      //       requestpaperid: this.params.requestPaperId,
      //       ...this.pages,
      //     },
      //   }
      // );

      // this.loading = false;

      // if (!resData.data.status) return;

      // this.testList = resData.data.data.constList.map((item) => {
      //   item.memberanswser = Number(item.memberanswser);
      //   return item;
      // });
    },

    /**
     * 错题测试
     */
    handleEorroGoto() {
      // if (this.$route.query.progressStatus >= 4) this.goto = 3;

      this.$router.replace({
        name: "COURSE_TEST_PRACTICE",
        query: {
          id: this.info.id,
          courseId: this.params.courseId,
          chapterId: this.params.chapterId,
          progressId: this.params.progressId,
          goto: this.goto,
          backIndex: this.$route.query.requestId ? 1 : 0, //返回首页
        },
      });
    },

    /**
     * 第一次测试成功，重置进度为下一章
     */
    async handleNextProgress() {
      this.infoLoading = true;

      const { data: resData } = await this.$post(
        "/course/getnextcoursechatper",
        {
          progressid: this.params.progressId,
          courseid: this.params.courseId,
          chapterid: this.params.chapterId,
          isupdateprogress: 0,
        }
      );
      this.infoLoading = false;
      if (!resData.data.status) return;

      this.nextInfo = resData.data;

      if (this.nextInfo.nextCourseid == 0 && this.nextInfo.nextChapterid == 0)
        return this.$message.success("恭喜您，你已经学习所有课程啦！");
    },

    /**
     * 跳转页面
     */
    handleNextGoTo() {
      // courseId ：12 为体验课程
      if (this.params.courseId == 12)
        return this.$msgbox.confirm(
          "你真是太棒了，成功学完了体验课程！趁热打铁，马上开启正式课程，攻破联邦考试吧！",
          "提示",
          {
            customClass: "el-message-box--big",
            confirmButtonText: "关闭",
            showCancelButton: false,
            type: "success",
          }
        );

      if (this.nextInfo.nextCourseid == 0 && this.nextInfo.nextChapterid == 0)
        return this.$message.success("恭喜您，你已经学习所有课程啦！");

      this.$router.replace({
        name: "COURSE_STUDY_VIDEO",
        query: {
          courseId: this.nextInfo.nextCourseid,
          chapterId: this.nextInfo.nextChapterid,
          progressId: this.params.progressId,
        },
      });
    },

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

      this.testTime = `${hour}:${minute}:${second}`;
    },

    /**
     * 跳转页面-学习页
     */
    handleGoTo(name) {
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
     * pageSize 改变时会触发
     */
    handleSizeChange(val) {
      this.pages.pagesize = val;
      this.pages.pageindex = 1;
      this.queryTestList();
    },

    /**
     * pageindex 改变时会触发
     */
    handleCurrentChange(val) {
      this.pages.pageindex = val;
      this.queryTestList();
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
};
</script>
