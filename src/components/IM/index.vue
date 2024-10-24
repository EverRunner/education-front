<style lang="scss" scoped>
.im {
  position: fixed;
  bottom: calc(10vh + 75px);
  right: 15px;
  z-index: 200;
  &-index {
    background: #ffffff;
    box-shadow: 0px 0px 30px 0px #d4d8dc;
    border-radius: 10px;
    display: flex;
    width: 900px;
    box-sizing: border-box;
    &-user {
      border-right: 1px solid #eee;
      width: 350px;
      box-sizing: border-box;
    }
    &-content {
      width: calc(900px - 350px);
      box-sizing: border-box;
    }
  }
  &-btn {
    width: 60px;
    height: 60px;
    background: #12be6e;
    box-shadow: 0px 0px 30px 0px #d4d8dc;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    right: 15px;
    bottom: 9vh;
    cursor: pointer;
    z-index: 100;
    opacity: 0.9;
    transition: all 0.3s ease;
    &:hover {
      right: 12px;
      opacity: 1;
    }
    i {
      font-size: 24px;
      color: #fff;
    }
    p {
      font-size: 12px;
      color: #fff;
      padding-top: 5px;
    }
  }
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s ease;
}

.slide-fade-enter {
  transform: translateX(900px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateX(900px);
  opacity: 0;
}
</style>

<template>
  <section class="im" v-loading="getImLoading">
    <transition name="slide-fade">
      <div class="im-index" v-if="getImShow">
        <div class="im-index-user">
          <user-list />
        </div>
        <div class="im-index-content">
          <add-user v-if="getImShowAddUser == 'addUser'" />
          <apply-user v-else-if="getImShowAddUser == 'applyUser'" />
          <chat v-else />
        </div>
      </div>
    </transition>

    <transition name="slide-fade">
      <div @click="handleClick" class="im-btn" v-if="!getImShow">
        <i class="el-icon-chat-dot-round"></i>
        <p>聊天</p>
      </div>
    </transition>
  </section>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import Chat from "./Chat";
import UserList from "./UserList";
import AddUser from "./AddUser";
import ApplyUser from "./applyUser";

export default {
  name: "IM",
  components: { Chat, UserList, AddUser, ApplyUser },

  props: {},

  data() {
    return {
      peopleChat: {},
      isShow: true,
    };
  },
  watch: {},

  created() {},

  mounted() {},

  computed: {
    ...mapGetters(["getImShowAddUser", "getImLoading", "getImShow"]),
  },

  methods: {
    ...mapMutations(["setImShow"]),

    handleClick() {
      this.setImShow(!this.getImShow);
    },
  },
};
</script>
