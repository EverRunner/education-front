<style lang="scss" scoped>
.notice {
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  background-color: #fdf6ec;
  color: #ffa61f;
  padding: 8px 16px;
  box-sizing: border-box;
  border-radius: 4px;
  &-icon {
    &-hit {
      color: #ffa61f;
    }
    &-close {
      color: #c0c4cc;
      font-size: 12px;
    }
  }
  &-list {
    overflow: hidden;
    position: relative;
    width: calc(100% - 50px);
    p {
      color: #ffa61f;
      font-size: 13px;
      line-height: 18px;
      box-sizing: border-box;
    }
  }
}
</style>

<template>
  <div class="notice" v-if="show">
    <i class="el-icon-message-solid notice-icon-hit"></i>
    <div class="notice-list">
      <div class="swiper-wrapper">
        <div v-for="item in list" :key="item.id" class="swiper-slide">
          <p>{{ item.content }}</p>
        </div>
      </div>
    </div>
    <i class="el-icon-close notice-icon-close"></i>
  </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.css";

export default {
  name: "Notice",
  components: {},

  props: {},

  data() {
    return {
      list: [],
      show: true,
    };
  },
  watch: {},

  created() {
    if (sessionStorage.getItem("token")) this.queryList();
  },

  mounted() {},

  computed: {},

  methods: {
    /**
     * 获取数据
     */
    async queryList() {
      const { data: resData } = await this.$get("/content/getmycontentnotice", {
        params: {
          pageindex: 1,
          pagesize: 100,
        },
      });

      if (!resData.data.status) return;

      this.list = resData.data.data.rows;

      this.$nextTick(() => {
        this.initSwiper();
      });

      // setTimeout(() => {

      // }, 100);
    },

    /**
     * 初始swiper
     */
    initSwiper() {
      new Swiper(".notice-list", {
        loop: true,
        // direction: "vertical",
        autoplay: 5000,
        autoplayDisableOnInteraction: true,
      });
    },
  },
};
</script>
