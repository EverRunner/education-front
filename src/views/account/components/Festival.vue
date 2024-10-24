<style lang="scss" scope>
.festival {
  .el-dialog {
    max-width: 98%;
    margin-top: 12vh !important;
  }
  .el-dialog__body {
    padding: 5px 20px 20px;
  }
  &-content {
    min-height: 30vh;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 100%;
      min-height: 100px;
    }
  }

  @media only screen and (min-width: 992px) {
    margin-top: 7vh !important;
  }

  @media only screen and (min-width: 1200px) {
    .el-dialog {
      margin-top: 5vh !important;
      width: 1000px;
    }
  }
}
</style>

<template>
  <!-- 节日 -->
  <div>
    <el-dialog
      class="festival"
      :visible.sync="showDialog"
      width="1000px"
      :before-close="handleDearClose"
      :title="(info.hlname || '节日') + '祝福'"
      :close-on-click-modal="false"
    >
      <div class="festival-content">
        <el-image :src="FILE_ROOT + info.hlcontent">
          <div slot="placeholder">
            祝福加载中，请您稍等<span class="dot">...</span>
          </div>
          <div slot="error" style="color:#f56c6c;">
            加载失败，请刷新重试！
          </div>
        </el-image>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { FILE_ROOT } from "@config";

export default {
  name: "Festival",

  props: {
    showDialog: {
      type: Boolean,
      default: false,
    },

    info: {
      type: Object,
      default() {
        return {};
      },
    },
  },

  data() {
    return {
      FILE_ROOT: "https://admin.ybmblex.net/",
    };
  },

  computed: {},

  created() {},

  methods: {
    /**
     * 处理弹框回调关闭
     */
    handleDearClose() {
      this.$emit("closeDialog", false);
    },
  },
};
</script>
