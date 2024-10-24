<style lang="scss" scoped>
.bbs {
  padding: 60px;
}
</style>

<template>
  <section class="bbs">
    <el-button @click="handleGoto" type="danger"
      >论坛测试链接（请点击）</el-button
    >
  </section>
</template>

<script>
export default {
  components: {},

  methods: {
    handleGoto() {
      // window.location.href = `http://54.176.196.122:8099/?token=${sessionStorage.getItem(
      //   "token"
      // )}`;

      window.location.href = `http://192.168.2.115:8099/?token=${sessionStorage.getItem(
        "token"
      )}`;
    },
  },
};
</script>
