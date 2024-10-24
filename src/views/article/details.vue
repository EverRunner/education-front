<style lang="scss" scoped>
.article {
  &-wp {
    padding: 30px 0;
    box-sizing: border-box;
  }
  &-title {
    padding-bottom: 30px;
    font-size: 28px;
    color: #333;
  }

  .wp {
    background: #fff;
    padding: 40px;
    box-sizing: border-box;
  }
}
</style>

<template>
  <section class="article">
    <div class="article-wp">
      <div class="wp" v-loading="loading">
        <div class="article-title">{{ info.title }}</div>

        <div class="article-content" v-html="info.content"></div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  components: {},

  data() {
    return {
      params: {},
      loading: false,

      info: {},
    };
  },

  created() {
    if (this.$route.query.id) {
      this.params.id = this.$route.query.id;
      this.queryInfo();
    }
  },

  methods: {
    /**
     * 获取文章内容
     */
    async queryInfo() {
      this.loading = true;

      const { data: resData } = await this.$get("/content/getcontentdatabyid", {
        params: {
          id: this.params.id,
        },
      });

      this.loading = false;

      if (!resData.data.status) return;

      this.info =  resData.data.data;
    },
  },
};
</script>
