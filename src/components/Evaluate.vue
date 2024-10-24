<style lang="scss" scoped></style>

<template>
  <div class="evaluate">
    <div class="evaluate-title">
      <h4>课程评价</h4>
      <div class="evaluate-title-score">
        <div class="score">{{ avScore }}<i>分</i></div>
        <div class="number">
          <em>{{ allCount }}人评价</em>
          <el-rate allow-half disabled v-model="avScoreNum"> </el-rate>
        </div>
      </div>
    </div>

    <!-- <div class="evaluate-import">
      <h4>给该课程打分 <el-rate v-model="value2"> </el-rate></h4>
      <textarea name="" id="" rows="5" placeholder="请输入您的评价"></textarea>
      <div class="evaluate-import-btn">
        <el-button type="success" size="medium">发布评价</el-button>
      </div>
    </div> -->

    <ul class="evaluate-list">
      <li v-for="item in list" :key="item.id">
        <div class="evaluate-list-title">
          <img src="@/assets/images/2021021711.png" alt="" />
          <div class="name">
            <h5>{{ item.yibei_member && item.yibei_member.username }}</h5>
            <p>{{ item.createdAt | formatDate("YYYY-MM-DD") }}</p>
          </div>
          <el-rate
            v-model="item.score"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}分"
          >
          </el-rate>
        </div>
        <div class="evaluate-list-time">
          <p>考过时间：{{ item.kaoshidate || "-" }}</p>
          <p>学习时长：{{ item.studytocoursetime || "-" }}</p>
          <p>年龄：{{ item.age || "-" }}岁</p>
          <p>英文水平：{{ item.enlevel || "零" }}</p>
        </div>
        <div class="evaluate-list-text">
          {{ item.content }}
        </div>
        <ul v-if="item.imgarray" class="evaluate-list-images">
          <li v-for="(url, index) in item.imgArr" :key="index">
            <el-image :src="url" :preview-src-list="item.imgArr"> </el-image>
          </li>
        </ul>
      </li>
    </ul>

    <!-- <ul class="evaluate-list">
      <li v-for="item in list" :key="item.id">
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
          我的年龄段：{{ item.agedis }}岁;<br />
          我的英文水平：{{ item.enlevel }};<br />
          我的电脑水平：{{ item.computerlevel }}; <br />
          我每天学习的时间：{{ item.studyeverytime }}; <br />
          我从学习到考试时间：{{ item.studytocoursetime }};<br />
          我参加联邦按摩考试原因：{{ item.studywhy }};<br />
          我通过考试最关键的学习步骤：{{ item.keystep }};<br />
          我想对还在奋战的易北学员们说：{{ item.content }}。
        </div>
        <div class="evaluate-list-date">
          {{ item.createdAt | formatDate("YYYY-MM-DD") }}
        </div>
      </li>
    </ul> -->
  </div>
</template>

<script>
import { formatDateTime, dateDiff } from "@utils/tools";
import { FILE_ROOT } from "@config";

export default {
  name: "Evaluate",
  components: {},

  props: {},

  data() {
    return {
      list: [],
      avScore: "5.0",
      avScoreNum: 5,
      allCount: 0,
      avScoreNum: 0,
      FILE_ROOT,
    };
  },
  watch: {},

  created() {
    this.queryList();
  },

  mounted() {},

  computed: {},

  methods: {
    /**
     * 获取数据
     */
    async queryList() {
      const { data: resData } = await this.$get("/course/getcoursecomment", {
        params: {
          pageindex: 1,
          pagesize: 100,
        },
      });
      if (!resData.data.status) return;

      this.list = resData.data.data.rows.map((item) => {
        // 考试时间
        if (item.yibei_member && item.yibei_member.kaoshidate)
          item.kaoshidate = formatDateTime(
            item.yibei_member.kaoshidate,
            "YYYY-MM-DD"
          );

        // 年龄
        if (
          item.yibei_member &&
          item.yibei_member.birthdaymonth &&
          item.yibei_member.kaoshidate
        )
          if (item.imgarray) {
            const days = dateDiff(
              item.yibei_member.birthdaymonth,
              item.yibei_member.kaoshidate
            );
            item.age = parseInt(days / 365);
          }

        // 图片
        if (item.imgarray) {
          item.imgArr = [];
          item.imgarray.split(",").forEach((url) => {
            item.imgArr.push(FILE_ROOT + url);
          });
        }

        return item;
      });

      this.allCount = resData.data.allCount;
      this.avScore = resData.data.avScore;
      this.avScoreNum = Number(resData.data.avScore);
    },
  },
};
</script>
