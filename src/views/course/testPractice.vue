<style lang="scss" scoped>
.item-option {
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
    .el-radio__input.is-checked .el-radio__inner {
      background-color: #16c674 !important;
      border-color: #16c674 !important;
    }
    .el-radio__input.is-checked + .el-radio__label {
      color: #16c674 !important;
    }
    .el-radio__label {
      color: #16c674 !important;
    }
  }

  &.correct {
    border: 2px solid #16c674;
  }
}
.studys-word-btns {
  position: relative;
  background: transparent;
  box-shadow: none;
  border: 0;
}
h2 {
  text-align: center;
  font-size: 20px;
  color: #3c3c3c;
  letter-spacing: 2px;
}
</style>

<template>
  <section class="studys-wp studys-test" v-loading="loading">
    <div class="studys-test-title">
      <h2>错题练习</h2>
      <div class="studys-test-title__times">
        <ul class="index">
          <li style="margin-bottom: 5px;">
            题号<span
              ><em> {{ courseTestIndex + 1 }}</em
              >/{{ testList.length }}</span
            >
          </li>
        </ul>
      </div>
      <div
        class="studys-test-title__content"
        v-html="testList[courseTestIndex].title"
      ></div>
    </div>
    <div class="studys-test-answer">
      <el-radio-group v-model="testList[courseTestIndex].answer">
        <div
          v-for="(item, index) in testList[courseTestIndex]
            .yibei_requestion_const_option"
          :key="item.id"
          class="item"
        >
          <span class="item-letter"
            >{{ String.fromCharCode(65 + index) }}.</span
          >
          <div
            class="item-option"
            :class="[
              {
                select: testList[courseTestIndex].answer == item.id,
              },
              {
                correct:
                  testList[courseTestIndex].answer && item.iscorrectoption == 1,
              },
              {
                error:
                  testList[courseTestIndex].answer &&
                  item.id == testList[courseTestIndex].answer,
              },
              {
                yes:
                  testList[courseTestIndex].answer &&
                  item.iscorrectoption == 1 &&
                  item.id == testList[courseTestIndex].answer,
              },
            ]"
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
          courseTestIndex >= testList.length - 1
            ? "错题练习完毕，" + buttonText
            : "下一题"
        }}</el-button
      >
    </div>
  </section>
</template>

<script>
export default {
  components: {},

  data() {
    return {
      params: {},
      info: {
        constList: [],
      },

      testList: [{}],
      courseTestIndex: 0,
      courseTestProgress: 0,
      testListShow: false,
      pages: {
        pageindex: 1,
        pagesize: 300,
      },

      nextInfo: {},

      buttonText: "重新做测试",
      gotoUrl: "COURSE_STUDY_TEST",
    };
  },

  created() {
    if (this.$route.query.id) {
      this.params = this.$route.query;
    }

    if (this.$route.query.goto != null) {
      switch (Number(this.$route.query.goto)) {
        case 0:
          this.gotoUrl = "COURSE_STUDY_VIDEO";
          this.buttonText = "重新学习视频";
          break;

        case 1:
          this.gotoUrl = "COURSE_STUDY_WORD";
          this.buttonText = "重新练习单词";
          break;

        case 3:
          this.gotoUrl = "COURSE_STUDY_TEST";
          this.buttonText = "重新做测试";
          break;
      }
    }

    if (this.$route.query.backIndex == 1) {
      this.gotoUrl = "ACCOUNT_INDEX";
      this.buttonText = "返回我的主页";
    }

    this.queryTestList();
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
     * 获取答题列表
     */
    async queryTestList() {
      this.loading = true;
      this.testListShow = true;

      const { data: resData } = await this.$get(
        "/course/geterrorrequestconst",
        {
          params: {
            chapterrequestid: this.params.id,
            pageindex: 1,
            pagesize: 100,
          },
        }
      );

      this.loading = false;

      if (!resData.data.status) return;

      //修改数据
      const list = resData.data.data.rows.map((item) => {
        item.answerItem = item.yibei_requestion_const_option.find(
          (a) => a.iscorrectoption == 1
        );
        item.answer = "";
        // item.memberanswser = Number(item.memberanswser);
        return item;
      });

      //过滤空标题、无答案的题
      this.testList = list.filter((item) => {
        if (item.title && item.yibei_requestion_const_option.length > 0)
          return item;
      });
    },

    /**
     * 下一步
     */
    handleTestNext() {
      if (this.testList[this.courseTestIndex].answer == null)
        return this.$message.error("请选择答案！");

      if (this.courseTestIndex < this.testList.length - 1) {
        this.courseTestIndex++;

        //进度条
        this.calculateSchedule();
      } else {
        this.handleGoTo(); //提交
      }
    },

    /**
     *  计算进度条(测试)
     */
    calculateSchedule() {
      this.courseTestProgress =
        Math.floor(((this.courseTestIndex + 1) / this.testList.length) * 1000) /
        10;
    },

    /**
     * 跳转页面
     */
    handleGoTo() {
      this.$confirm(`是否${this.buttonText}`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$router.replace({
            name: this.gotoUrl,
            query: {
              courseId: this.params.courseId,
              chapterId: this.params.chapterId,
              progressId: this.params.progressId,
            },
          });
        })
        .catch(() => {});
    },
  },

  /**
   * 页面销毁
   */
  destroyed() {
    // 禁用右键
    document.oncontextmenu = new Function("event.returnValue=true");

    // 禁用选择
    document.onselectstart = new Function("event.returnValue=true");
  },
};
</script>
