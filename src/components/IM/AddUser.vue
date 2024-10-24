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
        cursor: pointer;
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
      <h5>添加好友</h5>
      <i class="el-icon-close" @click="handleClose"></i>
    </div>

    <div
      class="im-add-content"
      v-loading="searchLoading"
      element-loading-text="搜索中..."
      element-loading-spinner="el-icon-loading"
    >
      <div>
        <el-input placeholder="请输入用户账号" v-model="account">
          <el-button
            slot="append"
            @click="queryUserList"
            icon="el-icon-search"
          ></el-button>
        </el-input>
      </div>
      <ul v-if="userList.length > 0" class="im-user-list public-scrollbar">
        <li v-for="item in userList" :key="item.id">
          <div class="im-user-list-wp">
            <div class="im-user-list__thumb">
              <img src="../../assets/images/honours-thumb.png" alt="" />
            </div>
            <div class="im-user-list__content">
              <h5>{{ item.username }}</h5>
              <p>{{ item.createdAt | formatDate("YYYY-MM-DD") }}</p>
            </div>
          </div>
          <el-button
            @click="handleAddUser(item)"
            type="success"
            size="mini"
            class="btn"
            :loading="addLoading"
            >添加好友</el-button
          >
        </li>
      </ul>
      <div class="im-add-more" v-else>没有更多~</div>
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
      account: "",
      searchLoading: false,
      addLoading: false,

    };
  },
  watch: {},

  created() {},

  mounted() {},

  computed: {},

  methods: {
    ...mapMutations(["setImShow"]),

    /**
     * 获取好友列表
     */
    async queryUserList() {
      if (!this.account) return this.$message.error("请输入用户帐号！");

      this.searchLoading = true;
      const { data: resData } = await this.$get("/im/searchfriend", {
        params: {
          account: this.account,
        },
      });
      this.searchLoading = false;
      if (!resData.data.status) return;

      this.userList = resData.data.data;
    },

    /**
     * 处理用户点击
     */
    async handleAddUser(row) {
      const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

      if (userInfo.email == row.email || userInfo.email == row.phone)
        return this.$message.error("不能添加自已为好友！");

      this.addLoading = true;

      const { data: resData } = await this.$post("/im/addfriend", {
        account: row.email || row.phone,
      });
      this.addLoading = false;
      if (!resData.data.status) return;

      this.$message.success("添加成功，等待同意！");
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
