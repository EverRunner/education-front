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
            <h1>{{ $route.meta && $route.meta.title }}</h1>
          </div>
          <div class="personage-recommend">
            <h5>
              您还可以推荐其他人来购买我们的课程，购课者可获得 100
              美金的优惠券，直接抵扣学费；您也会获得 88 美金的现金奖励！
            </h5>
            <div class="personage-recommend-copy">
              <el-row :gutter="24">
                <el-col :xs="24" :sm="24" :md="24" :lg="24">
                  <h4 class="title">推荐码</h4>
                  <div class="code">
                    <em>{{ shareCode || "-" }}</em>
                    <el-button
                      :data-clipboard-text="shareCode"
                      @click="handleCopy"
                      class="copy el-button--big"
                      type="primary"
                      round
                      >一键复制</el-button
                    >
                  </div>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="24">
                  <h4 class="title">推荐购买链接</h4>
                  <div class="code">
                    <el-input
                      placeholder="请输入内容"
                      v-model="shareLink"
                      readonly
                      ref="demoInput"
                      class="input-with-select el-input--big"
                    >
                      <el-button
                        slot="append"
                        class="el-button--big"
                        type="primary"
                        icon="el-icon-document-copy"
                        @click="handleCopy2"
                        >复制链接</el-button
                      >
                    </el-input>
                  </div>
                </el-col>
              </el-row>
            </div>

            <div class="personage-recommend-friend">
              <h2>您已成功推荐的朋友：</h2>
              <el-table
                :data="list"
                style="width: 100%"
                empty-text="您尚未成功邀请朋友购买课程！"
              >
                <el-table-column prop="username" label="朋友姓名" sortable>
                </el-table-column>
                <el-table-column prop="creathydate" label="购课日期" sortable>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import Clipboard from "clipboard";
import LeftNav from "./components/LeftNav.vue";
import { SHARE_URL } from "@config";

export default {
  components: {
    LeftNav,
  },

  data() {
    return {
      userInfo: JSON.parse(sessionStorage.getItem("userInfo") || {}),
      shareCode: "",
      shareLink: "",
      list: [],
    };
  },

  created() {
    this.queryList();
  },

  mounted() {
    this.shareCode = this.userInfo.sharecode;
    this.shareLink = `${SHARE_URL}/#/?channel=studentCode&recommendCode=${this.userInfo.sharecode}`;
  },

  methods: {
    /**
     * 处理复制
     */
    handleCopy() {
      if (!this.shareCode)
        return this.$message.error("没有推荐码，快去购买课程吧！");

      let clipboard = new Clipboard(".copy");

      clipboard.on("success", (e) => {
        this.$message.success("推荐码复制成功！");
        // 释放内存
        clipboard.destroy();
      });

      clipboard.on("error", (e) => {
        // 不支持复制
        this.$message.error("浏览器不支付，请手动复制！");
        // 释放内存
        clipboard.destroy();
      });
    },

    /**
     * 处理复制
     */
    handleCopy2() {
      this.$refs.demoInput.select();
      document.execCommand("copy");
      this.$message.success("推荐码复制成功！");
    },

    /**
     * 获取推荐列表
     */
    async queryList() {
      const { data: resData } = await this.$get("/user/getmyfloowmember");
      if (!resData.data.status) return;

      this.list = resData.data.data;
    },
  },
};
</script>
