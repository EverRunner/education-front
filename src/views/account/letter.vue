<style lang="scss" scoped>
.letter {
  &-wp {
    padding: 30px 0;
  }

  .wp {
    background: #fff;
    padding: 30px 40px 45px 40px;
    box-sizing: border-box;
  }

  &-list {
    min-height: 50vh;
    li {
      display: flex;
      justify-content: space-between;
      padding: 20px 5px;
      border-bottom: 1px solid #eee;
      cursor: pointer;
      p {
        font-size: 14px;
        color: #999;
        display: flex;
        align-items: center;
        width: calc(100% - 90px);
        overflow: hidden;
        em {
          width: calc(100% - 20px);
          overflow: hidden;
          white-space: normal;
          text-overflow: ellipsis;
        }
      }
      span {
        font-size: 14px;
        color: #999;
      }
      &.on {
        span {
          color: #333;
        }
        p {
          color: #333;
          &::before {
            content: "";
            width: 6px;
            height: 6px;
            border-radius: 50%;
            margin-right: 10px;
            background-color: #16c674;
          }
        }
      }
    }
  }
  &-null {
    color: #999;
    text-align: center;
    min-height: 50vh;
    padding-top: 20px;
  }
}
</style>

<template>
  <section class="letter">
    <div class="letter-wp">
      <div class="wp" v-loading="loading">
        <ul class="letter-list" v-if="list.length > 0">
          <li
            v-for="item in list"
            :key="item.id"
            :class="{ on: item.status == 0 }"
            @click="handleGoTo(item)"
          >
            <p>
              <em>{{ item.title }}</em>
            </p>
            <span>{{ item.createdAt | formatDate("YYYY-MM-DD") }}</span>
          </li>
        </ul>
        <div v-else class="letter-null">没有更多站内信~</div>
      </div>
    </div>
  </section>
</template>

<script>
import { PAGE_SIZE } from "@config";

export default {
  components: {},

  data() {
    return {
      params: {
        pageindex: 1,
        pagesize: PAGE_SIZE,
      },
      loading: false,

      list: [],
    };
  },

  created() {
    this.queryList();
  },

  methods: {
    /**
     * 获取站内信列表
     */
    async queryList() {
      this.loading = true;

      const { data: resData } = await this.$get("/user/getmynoticepagelist", {
        params: this.params,
      });

      this.loading = false;

      if (!resData.data.status) return;

      this.list = resData.data.data.rows;
    },

    /**
     * 跳转到站内信详情
     */
    handleGoTo(row) {
      this.$router.push({
        name: "ACCOUNT_LETTER_INFO",
        query: {
          id: row.id,
        },
      });
    },
  },
};
</script>
