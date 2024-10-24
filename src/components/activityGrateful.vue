<style lang="scss" scoped>
.grateful {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;
  max-width: 90%;
  &-wp {
    background-color: #fff;
    padding: 30px 0;
    text-align: center;
    width: 420px;
    max-width: 100%;
    box-sizing: border-box;
    box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    p {
      color: #222222;
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      padding: 30px 0;
    }
    span {
      width: 100px;
      height: 34px;
      line-height: 32px;
      background: #db4040;
      border-radius: 4px;
      color: #ffffff;
      font-size: 14px;
      display: inline-block;
      cursor: pointer;
    }
  }
}
</style>

<template>
  <section>
    <div v-if="show" class="grateful">
      <div class="grateful-wp">
        <img src="@assets/images/msg.gif" alt="" />
        <p>您有一份来自易北教育的感恩节祝福</p>
        <span @click="handleClick">点击查收</span>
      </div>
    </div>
    <!-- 感恩节视频 -->
    <el-dialog
      title="感恩节祝福"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      class="zhongqiu"
    >
      <video
        ref="zhongqiu"
        src="https://www.ybmblex.net/ganenjie20211118.mp4"
        controls="controls"
        autoplay="autoplay"
      ></video>
    </el-dialog>
  </section>
</template>

<script>
export default {
  name: "activityGrateful",

  components: {},

  data() {
    return {
      show: false,

      dialogVisible: false,
    };
  },

  mounted() {
    if (!sessionStorage.getItem("activityGratefulShow")) this.show = true;
  },

  methods: {
    /**
     * 视频关
     */
    handleClose() {
      this.dialogVisible = false;
      this.$refs.zhongqiu.pause();
      sessionStorage.setItem("activityGratefulShow", 1);
    },

    handleClick() {
      this.show = false;
      this.dialogVisible = true;
    },
  },
};
</script>
