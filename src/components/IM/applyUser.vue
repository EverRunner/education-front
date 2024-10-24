<style lang="scss" scoped>
.im {
  &-add {
    &-title {
      overflow: hidden;
      padding: 15px 20px;
      border-bottom: 1px solid #eee;

      h5 {
        float: left;
        font-size: 17px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 600;
        color: #222222;
        line-height: 35px;
      }
      i {
        float: right;
        font-size: 14px;
        color: #222;
        line-height: 35px;
      }
    }

    &-nav {
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        font-size: 15px;
        color: #999;
        margin: 0 10px;
        padding: 5px;
        cursor: pointer;
        &.on {
          color: #333;
        }
      }
      i {
        height: 10px;
        background: #ddd;
        width: 1px;
      }
    }

    &-content {
      padding: 20px 30px 20px 20px;
    }
    &-more {
      font-size: 12px;
      color: #999;
      text-align: center;
      margin-top: 10vh;
    }
  }

  &-user {
    &-list {
      padding: 0 20px;
      height: 350px;
      overflow-x: auto;
      max-height: 90%;
      margin-top: 15px;
      li {
        display: flex;
        overflow: hidden;
        align-items: center;
        padding-bottom: 12px;
        margin-bottom: 12px;
        width: 100%;
        justify-content: space-between;
        position: relative;
        &::before {
          content: "";
          bottom: 0;
          right: 0;
          left: 60px;
          height: 1px;
          position: absolute;
          background: #f1f1f1;
        }
        .status {
          font-size: 14px;
          color: #666;
          font-weight: 500;
          cursor: pointer;
        }
      }
      &-wp {
        display: flex;
        align-items: center;
      }
      &__thumb {
        width: 50px;
        height: 50px;
        position: relative;
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
      }
      &__content {
        padding: 0 15px 0 10px;
        h5 {
          font-size: 15px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 600;
          color: #222222;
          padding-bottom: 6px;
        }
        p {
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #666666;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        i {
          color: #8590a6;
          font-size: 12px;
          position: absolute;
          top: 50%;
          right: 5px;
          margin-top: -5px;
        }
      }
    }
  }
}
</style>

<template>
  <section class="im-add">
    <div class="im-add-title">
      <h5>申请列表</h5>
      <i class="el-icon-close" @click="handleClose"></i>
    </div>

    <div
      class="im-add-content"
      v-loading="searchLoading"
      element-loading-text="加载中..."
      element-loading-spinner="el-icon-loading"
    >
      <div class="im-add-nav">
        <span
          @click="handleClick('friend')"
          :class="{ on: nowType == 'friend' }"
          >好友申请</span
        >
        <i></i>
        <span @click="handleClick('my')" :class="{ on: nowType == 'my' }"
          >我的申请</span
        >
      </div>

      <!-- 好友申请 -->
      <template v-if="nowType == 'friend'">
        <ul v-if="userList.length > 0" class="im-user-list public-scrollbar">
          <li v-for="item in userList" :key="item.id">
            <div class="im-user-list-wp">
              <div class="im-user-list__thumb">
                <img src="../../assets/images/honours-thumb.png" alt="" />
              </div>
              <div class="im-user-list__content">
                <h5>
                  {{ item.yibei_member && item.yibei_member.username }}
                </h5>
                <p>{{ item.createdAt | formatDate("YYYY-MM-DD") }}</p>
              </div>
            </div>
            <div v-if="item.status == 0">
              <el-button
                @click="setApply(item, 1)"
                type="success"
                size="mini"
                class="btn"
                >同意</el-button
              >
              <el-button
                @click="setApply(item, 2)"
                type="danger"
                size="mini"
                class="btn"
                >拒绝</el-button
              >
            </div>
            <div v-else class="status">{{ status[item.status] }}</div>
          </li>
        </ul>
        <div class="im-add-more" v-else>没有更多~</div>
      </template>

      <!-- 我的申请 -->
      <template v-else>
        <ul v-if="myList.length > 0" class="im-user-list public-scrollbar">
          <li v-for="item in myList" :key="item.id">
            <div class="im-user-list-wp">
              <div class="im-user-list__thumb">
                <img src="../../assets/images/honours-thumb.png" alt="" />
              </div>
              <div class="im-user-list__content">
                <h5>
                  {{ item.yibei_member_be && item.yibei_member_be.username }}
                </h5>
                <p>{{ item.createdAt | formatDate("YYYY-MM-DD") }}</p>
              </div>
            </div>
            <div class="status">{{ status[item.status] }}</div>
          </li>
        </ul>
        <div class="im-add-more" v-else>没有更多~</div>
      </template>
    </div>
  </section>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "IMUserList",
  components: {},

  props: {},

  data() {
    return {
      userList: [],
      myList: [],
      account: "",
      searchLoading: false,

      nowType: "friend",

      status: {
        0: "未处理",
        1: "已同意",
        2: "已拒绝",
      },
    };
  },
  watch: {},

  created() {
    this.queryUserList();
    this.queryMyList();
  },

  mounted() {},

  computed: {},

  methods: {
     ...mapMutations([ "setImShow"]),

    /**
     * 好友申请
     */
    async queryUserList() {
      if (this.account) return this.$message.error("请输入用户帐号！");

      this.searchLoading = true;
      const { data: resData } = await this.$get("/im/searchmyfriendsapplyed");
      this.searchLoading = false;
      if (!resData.data.status) return;

      this.userList = resData.data.data;
    },

    /**
     * 我的申请
     */
    async queryMyList() {
      if (this.account) return this.$message.error("请输入用户帐号！");

      const { data: resData } = await this.$get("/im/searchmyfriendsapply");

      if (!resData.data.status) return;

      this.myList = resData.data.data;
    },

    /**
     * 处理申请
     */
    async setApply(row, status) {
      const { data: resData } = await this.$post("/im/doimfriendapply", {
        id: row.id,
        status,
        remark: status == 1 ? "同意" : "拒绝",
      });

      if (!resData.data.status) return;

      this.$message.success("操作成功！");

      this.queryUserList();
    },

    /**
     * 处理用户点击
     */
    handleClick(type) {
      this.nowType = type;
    },

        /**
     * 处理关闭
     */
    handleClose() {
      this.setImShow(false);
    },
  },
};
</script>
