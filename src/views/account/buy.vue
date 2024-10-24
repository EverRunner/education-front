<style lang="scss" scoped></style>

<template>
  <section class="personage layout">
    <el-row>
      <el-col :xs="0" :sm="4" :md="4" :lg="4" :xl="4">
        <left-nav />
      </el-col>
      <el-col :xs="24" :sm="20" :md="20" :lg="20" :xl="20">
        <div class="personage-datum">
          <div class="personage-datum-title">
            <h1>{{ getUserInfo.level > 0 ? "我的购买" : "课程购买" }}</h1>
          </div>
          <div class="personage-buy" v-loading="loading">
            <!-- 无购买纪录 -->
            <div v-if="payList.length <= 0" class="personage-buy-not border">
              <p>无购买纪录</p>
              <el-button
                class="el-button--big"
                @click="handleGoTo('pay')"
                type="primary"
                round
                >立即购买</el-button
              >
            </div>

            <!-- 有购买纪录 -->
            <div v-else class="personage-buy-have border">
              <h1>联邦按摩辅导课程</h1>
              <ul class="record">
                <li v-for="item in payList" :key="item.id">
                  <p>
                    购买日期：{{ item.year }}年{{ item.month }}月{{
                      item.day
                    }}日（{{ item.category ? "续费" : "第一购买" }}）
                  </p>
                </li>
                <li class="bottom">
                  <div class="record-status">
                    <em :class="{ on: !courseStatus }"
                      >课程状态：{{ courseStatus ? "学习中" : "已到期" }}
                    </em>
                    <el-button
                      class="el-button--big"
                      @click="handleGoTo('pay')"
                      type="primary"
                      round
                      >续费</el-button
                    >
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import LeftNav from "./components/LeftNav.vue";
import { dateDiff } from "@utils/tools";
import { mapGetters } from "vuex";

export default {
  components: {
    LeftNav,
  },

  data() {
    return {
      userInfo: JSON.parse(sessionStorage.getItem("userInfo") || {}),
      payList: [],
      courseStatus: false,
      loading: true,
    };
  },

  created() {
    this.handlecCourseStatus();
    this.queryPayList();
  },

  computed: {
    ...mapGetters(["getUserInfo"]),
  },

  mounted() {},

  methods: {
    /**
     * 获取购买记录
     */
    async queryPayList() {
      const { data: resData } = await this.$get("/user/getmyorderpagelist", {
        params: {
          pageindex: 1,
          pagesize: 100,
          status: 1,
        },
      });
      this.loading = false;
      if (!resData.data.status) return;

      this.payList = resData.data.data.rows;
    },

    /**
     * 跳转页面
     */
    handleGoTo(type) {
      if (type == "pay")
        this.$router.push({
          name: "ORDER_INDEX",
        });
    },

    /**
     * 课程状态，是否过期
     */
    handlecCourseStatus() {
      if (dateDiff(this.userInfo.endhydate, new Date()) > 0) {
        this.courseStatus = true;
      }
    },
  },
};
</script>
