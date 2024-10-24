<style lang="scss" scoped></style>

<template>
  <section class="blog">
    <div class="blog-wp" v-loading="loading">
      <div style="height: 500px" v-if="loading"></div>
      <div
        v-for="(item, index) in blogList"
        :key="item.id"
        class="blog-list"
        :class="{ no: blogList.length - 1 == index }"
      >
        <div class="blog-list-title">
          <h2 @click="handleGoto(item.id)">{{ item.title }}</h2>
          <h5>
            易北教育 · 更新于{{ item.createdAt | formatDate("YYYY年MM月DD日") }}
          </h5>
          <img
            @click="handleGoto(item.id)"
            :src="FILE_ROOT + item.thumb"
            alt=""
          />
        </div>
        <div class="blog-list-introduce">
          <p v-for="(text, key) in item.descriptionList" :key="key">
            {{ text }}
          </p>
        </div>
        <div class="blog-list-footer">
          <p class="num">
            <span>{{ item.sort }}</span
            >阅读量
          </p>
          <em @click="handleGoto(item.id)" class="btn">继续阅读</em>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { FILE_ROOT } from "@config";

export default {
  components: {},

  data() {
    return {
      params: {},
      loading: false,
      blogList: [],
      FILE_ROOT,
    };
  },

  created() {
    this.queryBlogList();
  },

  methods: {
    /**
     * 获取博客列表
     */
    async queryBlogList() {
      this.loading = true;
      const { data: resData } = await this.$get("/content/getcontentpagelist", {
        params: { category: 14 },
      });
      this.loading = false;
      if (!resData.data.status) return;

      this.blogList = resData.data.data.rows.map((item) => {
        if (item.description)
          item.descriptionList = item.description.split("\n");
        else item.descriptionList = [];
        return item;
      });
    },

    /**
     * 跳转页面
     */
    handleGoto(id) {
      this.$router.push({
        name: "BLOG_DETAILS",
        query: { id },
      });
    },
  },
};
</script>
