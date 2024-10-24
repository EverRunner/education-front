<style lang="scss" scope>
@import "../../../theme/color.scss";

.button-border--blue {
  border-color: $--color-primary !important;
  color: $--color-primary !important;
}
</style>

<template>
  <section>
    <!-- 课程学习部分 -->
    <div class="studys-header">
      <img
        class="studys-header-logo"
        src="@/assets/images/login_logo.png"
        alt=""
      />
      <div class="studys-header-title hidden-xs-only">
        <h5>{{ chapteTitle }}</h5>
        <el-dropdown
          class="dropdown"
          size="medium"
          split-button
          @command="handleTabsGoTo"
          v-if="courseId"
        >
          <h6 v-if="isFinal || isOnlyTopic">
            步骤1 - 章节测试
          </h6>
          <h6 v-else>
            步骤{{ nowIndex + 1 }} -
            {{ STUDY_CHAPTER_STEP[nowIndex] }}
          </h6>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="(value, index) in studyStepList"
              :key="index"
              :command="index + 1"
              :disabled="
                isFinal || isOnlyTopic
                  ? studyProgress < 6 ||
                    ($route.query.isReviewWordTest == 1 && handleIsTest())
                  : studyProgress < index + 1
              "
            >
              <p>
                步骤{{ index + 1 }} - {{ titleObj[value] }}
                <i v-if="studyProgress < index + 1" class="el-icon-lock"></i>
              </p>
            </el-dropdown-item>
            <!-- <el-dropdown-item
              v-if="isFinal || isOnlyTopic"
              :command="6"
              :disabled="studyProgress < 6"
            >
              <p>
                步骤1 - 章节测试
                <i v-if="studyProgress < 6" class="el-icon-lock"></i>
              </p>
            </el-dropdown-item>
            <template v-else>
              <el-dropdown-item :command="1" :disabled="studyProgress < 1">
                <p>
                  步骤1 - 视频课程
                  <i v-if="studyProgress < 1" class="el-icon-lock"></i>
                </p>
              </el-dropdown-item>
              <el-dropdown-item :command="2" :disabled="studyProgress < 2">
                <p>
                  步骤2 - 中英文关键词卡
                  <i v-if="studyProgress < 2" class="el-icon-lock"></i>
                </p>
              </el-dropdown-item>
              <el-dropdown-item :command="3" :disabled="studyProgress < 3">
                <p>
                  步骤3 - 中英文关键词测试
                  <i v-if="studyProgress < 3" class="el-icon-lock"></i>
                </p>
              </el-dropdown-item>
              <el-dropdown-item :command="4" :disabled="studyProgress < 4">
                <p>
                  步骤4 - 英文关键词卡
                  <i v-if="studyProgress < 4" class="el-icon-lock"></i>
                </p>
              </el-dropdown-item>
              <el-dropdown-item :command="5" :disabled="studyProgress < 5">
                <p>
                  步骤5 - 英文关键词测试
                  <i v-if="studyProgress < 5" class="el-icon-lock"></i>
                </p>
              </el-dropdown-item>
              <el-dropdown-item
                :command="6"
                :disabled="
                  studyProgress < 6 ||
                    ($route.query.isReviewWordTest == 1 && handleIsTest())
                "
              >
                <p>
                  步骤6 - 章节测试
                  <i v-if="studyProgress < 6" class="el-icon-lock"></i>
                </p>
              </el-dropdown-item>
            </template> -->
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="studys-header-close" @click="centerDialogVisible = true">
        <i class="el-icon-close hidden-sm-and-down"></i>
        <span class="hidden-md-and-up">退出</span>
      </div>
    </div>

    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="470px"
      center
      class="studys-header-dialog"
    >
      <div class="content">
        <span>确定要退出当前学习吗？</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="danger" @click="handleOutStudy">退 出</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
import { STUDY_CHAPTER_STEP } from "@config";

export default {
  name: "StudyHead",

  props: {
    // 章节标题
    chapteTitle: {
      type: String,
      default: "-",
    },

    // 学习进度
    studyProgress: {
      type: [Number, String],
      default: -1,
    },

    // 步骤列表
    studyStepList: {
      type: Array,
      default: () => {
        return [];
      },
    },

    // 当前位置
    nowIndex: {
      type: [Number, String],
      default: 0,
    },

    // 课程id
    courseId: {
      type: [Number, String],
      default: 0,
    },

    // 章节id
    chapterId: {
      type: [Number, String],
      default: 0,
    },

    // 进度id
    progressId: {
      type: [Number, String],
      default: 0,
    },

    // 是否为 Final
    isFinal: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      routes: [],
      STUDY_CHAPTER_STEP,
      centerDialogVisible: false,

      isOnlyTopic: 0,
      titleObj: {
        "0": "视频课程",
        "1": "中英文关键词卡",
        "2": "中英文关键词测试",
        "3": "英文关键词卡",
        "4": "英文关键词测试",
        "5": "章节测试",
      },
    };
  },

  computed: {},

  created() {
    if (this.chapteTitle.indexOf("只有题目") >= 0) this.isOnlyTopic = 1;
  },

  methods: {
    /**
     * 退出学习
     */
    handleOutStudy() {
      this.centerDialogVisible = false;
      this.$router.go(-1);
    },

    /**
     * 是否可以测试
     * 复习时，必须通过【英文关键词测试】后，才能单元测试
     */
    handleIsTest() {
      const reviewIdList = sessionStorage.getItem("reviewIdList") || "";

      return reviewIdList.indexOf(this.chapterId) == -1;
    },

    /**
     * 导航-跳转页面
     *   0：视频学习中  1：关键词中英  2：关键词英  3：单元测试中  4：完成  5：关键词中英测试   6：关键词英测试
     */
    async handleTabsGoTo(type) {
      const index = type - 1;

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

      if (this.$route.name == name) return;

      this.$router.replace({
        name,
        query: {
          courseId: this.courseId,
          chapterId: this.chapterId,
          progressId: this.progressId,
          isReviewWordTest: this.$route.query.isReviewWordTest,
        },
      });
    },
  },

  // 离开守卫：通过路由规则，离开该组件时被调用
  beforeRouteLeave(to, from, next) {},
};
</script>
