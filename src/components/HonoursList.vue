<style lang="scss" scope>
.first {
  border-bottom: 1px solid #dcdfe6;
  th {
    color: #909399 !important;
    font-weight: 500 !important;
  }
}
</style>

<template>
  <div class="honours-list">
    <div class="account-honor">
      <table class="account-honor-list">
        <tr class="first">
          <!-- <th class="one">排名</th> -->
          <th class="one">姓名</th>
          <th class="two">学习天数</th>
          <th class="three">平均用时</th>
          <th class="four">考过日期</th>
        </tr>
        <tr v-for="(item, index) in honorList" :key="index" v-show="index < 10">
          <!-- <td class="one">
            <img v-if="index <= 2" :src="imgList[index]" alt="" />
            <span v-else>{{ index + 1 }}</span>
          </td> -->
          <td @click="handleGoTo(item.id)" class="one">{{ item.username }}</td>
          <td class="two">{{ item.allstudydate || "10" }}天</td>
          <td class="three">
            {{
              Math.floor(
                ((item.allstudytime || 0) / 3600 / (item.allstudydate || 10)) *
                  10
              ) / 10
            }}时/日
          </td>
          <td class="end four">
            {{ item.kaoshidate | formatDate("YYYY-MM-DD") }}
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import img1 from "../assets/images/grb1.png";
import img2 from "../assets/images/grb2.png";
import img3 from "../assets/images/grb3.png";

export default {
  name: "HonoursList",
  components: {},

  props: {},

  data() {
    return {
      imgList: [img1, img2, img3],
      honorList: [],
    };
  },
  watch: {},

  created() {
    this.queryHonorList();
  },

  computed: {},

  methods: {
    /**
     * 荣誉榜
     */
    async queryHonorList() {
      const { data: resData } = await this.$get("/user/getmemberrank", {
        params: {
          category: 2, //考过生为：2
        },
      });

      if (!resData.data.status) return;

      this.honorList = resData.data.dataList;
    },

    /**
     * 跳转
     */
    handleGoTo(memberid) {
      this.$router.push({
        name: "HONOURS_D",
        query: {
          memberid,
        },
      });
    },
  },
};
</script>
