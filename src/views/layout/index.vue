<style lang="scss" scope></style>

<template>
  <section class="main">
    <yb-header v-if="$route.name != 'HOME_INDEX'"></yb-header>

    <div class="main-body">
      <router-view />
    </div>

    <yb-footer v-if="$route.name != 'HOME_INDEX'"></yb-footer>
  </section>
</template>

<script>
import YbHeader from "./components/YbHeader";
import YbFooter from "./components/YbFooter";

export default {
  components: {
    YbHeader,
    YbFooter,
  },

  data() {
    return {
      breadcrumb: [],
    };
  },

  created() {
    this.getBreadcrumb(this.$router.options.routes, this.$route);
  },

  watch: {
    $route(to, from) {
      this.breadcrumb = [];
      this.getBreadcrumb(this.$router.options.routes, this.$route);
    },
  },

  methods: {
    /**
     * 面包屑
     */
    getBreadcrumb(routes, route) {
      routes.forEach((item) => {
        if (
          route.meta.parent == item.name ||
          route.name.indexOf(item.name) != -1
        ) {
          this.breadcrumb.push(item);
        }
        if (item.children) this.getBreadcrumb(item.children, route);
      });
    },
  },
};
</script>
