<style lang="scss" scoped>
::v-deep {
  ul,
  li,
  dd,
  dl {
    list-style-type: initial;
    margin: auto;
    padding: revert;
  }
  .blog-details-content img {
    max-width: 100%;
  }
  a {
    text-decoration: none;
  }
}
</style>

<template>
  <section class="blog">
    <div class="blog-wp">
      <div class="blog-details" v-loading="loading">
        <div style="height: 500px" v-if="loading"></div>
        <div class="blog-details-title">
          <h2>{{ info.title }}</h2>
          <h5>
            <em>易北教育</em> · 更新于{{
              info.createdAt | formatDate("YYYY年MM月DD日")
            }}
          </h5>
        </div>

        <div class="blog-details-content" v-html="info.content"></div>
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

      document.title = resData.data.data.title + " - " + "易北教育";
      document.description = resData.data.data.description;

      this.info =  resData.data.data;
    },
  },
};
</script>
