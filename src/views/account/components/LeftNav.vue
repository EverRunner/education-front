<style lang="scss" scope>
@import "../../../theme/color.scss";
.left-nav {
  padding-top: 60px;
  border-right: 1px solid #e4e7ed;
  height: 100%;
  li {
    padding: 18px 0;
    text-align: center;
    cursor: pointer;
    font-weight: 400;
    font-size: 16px;
    color: #303133;
    &.on {
      color: $--color-primary;
    }
  }
}
</style>

<template>
  <ul class="left-nav">
    <li
      :class="{ on: $route.name == 'ACCOUNT_SET' }"
      @click="handleGoTo('ACCOUNT_SET')"
    >
      帐号设置
    </li>
    <li
      :class="{ on: $route.name == 'ACCOUNT_INFO' }"
      @click="handleGoTo('ACCOUNT_INFO')"
    >
      个人资料
    </li>
    <li
      :class="{ on: $route.name == 'ACCOUNT_BUY' }"
      @click="handleGoTo('ACCOUNT_BUY')"
    >
      {{ getUserInfo.level > 0 ? "我的购买" : "课程购买" }}
    </li>
    <li
      :class="{ on: $route.name == 'ACCOUNT_RECOMMEND' }"
      @click="handleGoTo('ACCOUNT_RECOMMEND')"
    >
      推荐朋友
    </li>
  </ul>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "LeftNav",

  props: {},

  data() {
    return {};
  },

  computed: {
    ...mapGetters(["getUserInfo"]),
  },

  created() {},

  methods: {
    /**
     * 跳转
     */
    handleGoTo(name) {
      if (this.$route.name === name) return;

      this.$router.push({
        name,
      });
    },
  },
};
</script>
