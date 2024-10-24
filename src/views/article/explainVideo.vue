<style lang="scss" scope>
.el-radio-group {
  width: 100%;
  .el-radio {
    display: flex;
    align-items: center;
    line-height: 1.4;
  }
}

.popup {
  &-content {
    border-radius: 5px;
    text-align: center;
    p {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #222222;
    }
    h5 {
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #222222;
      padding: 15px 0 25px;
    }
  }
}

.study-wp .instructions {
  font-size: 16px;
  color: #666;
  line-height: 2;
  padding-top: 10px;
  text-align: center;
}
</style>

<template>
  <section class="study">
    <!-- 学习进度 -->
    <div
      class="study-nav"
      v-intro="
        '1.这里是本小节的学习进度，如果是已学习过的，就可以直接点击，未学习过，则不可点击！！'
      "
      data-title="新手引导"
      data-position="bottom"
      v-intro-step="1"
    >
      <!-- <ul v-if="navList.length > 1">
        <li
          v-for="(item, index) in navList"
          :key="index"
          :class="{
            on: index <= courseProgress.status,
            pass: index < courseProgress.status,
          }"
          @click="handleNavClick(item.type)"
        >
          <div class="study-nav-bg">
            <div class="icon-wp">
              <div class="icon">
                <i
                  v-if="index < courseProgress.status"
                  class="el-icon-check"
                ></i>
                <em v-else>{{ index + 1 }}</em>
              </div>
            </div>
            <span>{{ item.title }}</span>
          </div>
        </li>
      </ul> -->
    </div>

    <div class="wp">
      <div
        class="study-wp"
        v-intro="'2.这里是学习的主要窗口'"
        data-title="新手引导"
        data-position="top"
        v-intro-step="2"
      >
        <div class="study-tabs" v-loading="loading">
          <!-- 视频学习 -->
          <div class="study-tabs-item">
            <div class="study-video">
              <div class="study-video-title">
                <h4>{{ info.title }}</h4>
              </div>

              <div
                class="study-video-content"
                v-intro="'3.这里的视频观看区域！'"
                data-title="新手引导"
                data-position="top"
                v-intro-step="3"
              >
                <!-- <iframe
                  v-if="info.videopath"
                  :src="info.videopath"
                  width="100%"
                  frameborder="0"
                  allow="autoplay; fullscreen"
                  allowfullscreen
                ></iframe> -->

                <iframe
                  v-if="info.description"
                  :src="info.description"
                  width="100%"
                  height="100%"
                  frameborder="0"
                  webkitallowfullscreen
                  mozallowfullscreen
                  allowfullscreen
                  @load="handleIframeLoad"
                ></iframe>

                <p v-else>如果无视频播放，请稍后再试！</p>
              </div>

              <p class="instructions" v-if="courseType == 'newCourse'">
                由于视频制作非常的不容易并且需要花很多时间。<br />
                因此先开放已制作好的视频来帮助学员更快的理解并通过考试。<br />
                请持续关注并提供新课程内容的意见。 <br />
                谢谢!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  components: {},

  data() {
    return {
      info: {},
      loading: true,
      courseType: "",
    };
  },

  computed: {
    ...mapGetters(["getUserInfo"]),
  },

  async created() {
    if (this.$route.query.id) this.queryInfo(this.$route.query.id);
    if (this.$route.query.courseType)
      this.courseType = this.$route.query.courseType;
  },

  mounted() {},

  methods: {
    /**
     * 获取文章内容
     */
    async queryInfo(id) {
      const { data: resData } = await this.$get("/content/getcontentdatabyid", {
        params: {
          id,
        },
      });
      this.loading = false;
      if (!resData.data.status) return;

      if (resData.data.data.category == 13) {
        // 如果分类为13的文章，只有会员才能看
        if (this.getUserInfo.level == 1) this.info = resData.data.data;
      } else {
        this.info = resData.data.data;
      }
    },

    /**
     * 视频播放iframe
     */
    handleIframeLoad() {},
  },
};
</script>
