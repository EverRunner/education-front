<style lang="scss" scope></style>

<template>
  <el-col class="hidden-sm-and-down" :xs="1" :sm="1" :md="11" :lg="12" :xl="12">
    <div class="login-bg">
      <div class="login-bg-content">
        <img class="logo" src="@/assets/images/login_logo.png" alt="" />
        <h1>
          轻松通过<br />
          按摩联邦考试
        </h1>
        <p class="describe">最权威的华人在线辅导</p>
        <div class="text">
          <img src="@/assets/images/login_user.png" alt="" />
          <div class="text-xx">
            <img src="@/assets/images/login_xx.png" alt="" />
            <p>超过400学员成功通过</p>
          </div>
        </div>
      </div>
    </div>
  </el-col>
</template>

<script>
import { getBrowseCategory } from "@utils/tools";
import { getLocation } from "@utils/tools";

export default {
  name: "Sketch",

  components: {},

  data() {
    return {};
  },

  created() {},

  methods: {},
};
</script>
