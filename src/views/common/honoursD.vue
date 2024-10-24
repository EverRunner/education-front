<style lang="scss" scope>
.honours {
  background: #f6f6f6;
  padding: 25px 0;
  &-user {
    display: flex;
    align-items: center;
    background: #fff;
    padding: 4%;
    &-thumb {
      width: 200px;
      img {
        max-width: 100%;
      }
    }
    &-content {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      padding-left: 5%;

      li {
        width: 33.33%;
        padding: 2.5% 0;
      }
    }
  }
  .evaluate {
    padding: 4%;
    background: #fff url(../../assets/images/sy-logo6.png);
    min-height: 50vh;
    margin-top: 20px;
    &-title {
      font-size: 20px;
    }
    &-list {
      padding-left: 0;
      li {
        border: 0;
      }
      &-contetn {
        line-height: 1.8;
      }
    }
  }
}
</style>

<template>
  <section class="honours">
    <div class="wp">
      <div class="honours-user">
        <div class="honours-user-thumb">
          <img src="@assets/images/honours-thumb.png" alt="" />
        </div>
        <ul class="honours-user-content">
          <li>Name：{{ userInfo.username }}</li>
          <li>加入时间：{{ userInfo.createdAt | formatDate("YYYY-MM-DD") }}</li>
          <li>
            考试时间：{{ userInfo.kaoshidate | formatDate("YYYY-MM-DD") }}
          </li>
          <li>学习总长：{{ userInfo.allstudyDay || 0 }}小时</li>
          <li>平均每日学习：{{ userInfo.avgTime || 0 }}小时</li>
          <li>学习总天数：{{ userInfo.allstudydate || 0 }}天</li>
        </ul>
      </div>

      <div class="evaluate">
        <!-- <div class="evaluate-title">
        <h4>课程评价</h4>
        <div class="evaluate-title-score">
          <div class="score">{{ avScore }}<i>分</i></div>
          <div class="number">
            <em>{{ allCount }}人评价</em>
            <el-rate allow-half disabled v-model="avScoreNum"> </el-rate>
          </div>
        </div>
      </div> -->

        <!-- <div class="evaluate-import">
      <h4>给该课程打分 <el-rate v-model="value2"> </el-rate></h4>
      <textarea name="" id="" rows="5" placeholder="请输入您的评价"></textarea>
      <div class="evaluate-import-btn">
        <el-button type="success" size="medium">发布评价</el-button>
      </div>
    </div> -->
        <div class="evaluate-title">课程评价</div>
        <ul class="evaluate-list">
          <li v-for="item in commentList" :key="item.id">
            <div class="evaluate-list-head">
              <div class="thumb">
                <img src="@/assets/images/2021021711.png" alt="" />
              </div>
              <span class="name">{{
                item.yibei_member && item.yibei_member.username
              }}</span>
              <el-rate
                v-model="item.score"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}分"
              >
              </el-rate>
            </div>
            <div class="evaluate-list-contetn">
              我的年龄段：{{ item.agedis ? item.agedis + "岁" : "保密" }};<br />
              我的英文水平：{{ item.enlevel || "-" }};<br />
              我的电脑水平：{{ item.computerlevel || "-" }}; <br />
              我每天学习的时间：{{ item.studyeverytime }}; <br />
              我从学习到考试时间：{{
                Number(item.studytocoursetime.replace(/天/g, "")).toFixed(2)
              }}天;<br />
              我参加联邦按摩考试原因：{{ item.studywhy || "-" }};<br />
              我通过考试最关键的学习步骤：{{ item.keystep || "-" }};<br />
              我想对还在奋战的易北学员们说：{{ item.content || "-" }}<br />
            </div>
            <div class="evaluate-list-date">
              {{ item.createdAt | formatDate("YYYY-MM-DD") }}
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import { getBrowseCategory } from "@utils/tools";
import { getLocation } from "@utils/tools";

export default {
  components: {},

  data() {
    return {
      userInfo: {},
      commentList: [],
    };
  },

  async created() {
    this.queryInfo(this.$route.query.memberid);
  },

  methods: {
    /**
     * 获取图形验证码
     */
    async queryInfo(memberid) {
      const { data: resData } = await this.$get("/user/getmemberinfo", {
        params: {
          memberid,
        },
        headers: {
          isLoading: true,
        },
      });
      if (!resData.data.status) return;

      this.commentList = resData.data.commentList;
      this.userInfo = resData.data.userInfo;

      // 学习总长
      this.userInfo.allstudyDay =
        Math.floor(((this.userInfo.allstudytime || 0) / 60 / 60) * 100) / 100;

      // 平均每日学习
      this.userInfo.avgTime =
        Math.floor(
          (this.userInfo.allstudyDay / this.userInfo.allstudydate) * 100
        ) / 100;
    },
  },
};
</script>
