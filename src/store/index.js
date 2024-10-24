import Vue from "vue";
import Vuex from "vuex";
import { getImMyFriendList, getUserAllChatStatus } from "@api/im";
import { getUserInfo } from "@api/common";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    guideShow: false,
    isWebSocket: 0,

    // im即时聊天
    isChatFor: false,
    imTimer: 0,
    imNowUser: {},
    imShowAddUser: "addUser",
    imUserList: [],
    imShow: true,

    imLoading: false,

    userInfo: {}, // 用户信息
  },

  getters: {
    getGuideShow(state) {
      return state.guideShow;
    },

    getIsWebSocket(state) {
      return state.isWebSocket;
    },

    getImNowUser(state) {
      return state.imNowUser;
    },

    getImShowAddUser(state) {
      return state.imShowAddUser;
    },

    getImTimer(state) {
      return state.imTimer;
    },

    getImUserList(state) {
      return state.imUserList;
    },

    getImShow(state) {
      return state.imShow;
    },

    getImLoading(state) {
      return state.imLoading;
    },

    getUserInfo(state) {
      return state.userInfo;
    },
  },

  mutations: {
    setGuideShow(state, status) {
      state.guideShow = status;
    },

    setIsWebSocket(state, isWebSocket) {
      state.isWebSocket = isWebSocket;
    },

    setIsChatFor(state, isChatFor) {
      state.isChatFor = isChatFor;
    },

    setImNowUser(state, user) {
      state.imNowUser = user;
    },

    setImShowAddUser(state, imShowAddUser) {
      state.imShowAddUser = imShowAddUser;
    },

    setImTimer(state, imTimer) {
      state.imTimer = imTimer;
    },

    setImUserList(state, list) {
      state.imUserList = list;
    },

    setImShow(state, imShow) {
      state.imShow = imShow;
    },

    setImLoading(state, imLoading) {
      state.imLoading = imLoading;
    },

    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
  },

  actions: {
    // 获取im用户列表
    async actionsImUserList({ commit }) {
      const { data: chatData } = await getUserAllChatStatus();
      if (!chatData.data.status) return;

      const { data: resData } = await getImMyFriendList();
      if (!resData.data.status) return;

      // 获取用户列表，并判断是否可以加入群聊
      if (chatData.data.canJoin == 1) {
        resData.data.data.unshift({
          createdAt: "",
          email: "",
          frindid: -1,
          id: 0,
          memberid: 0,
          msg: "",
          msgid: 0,
          msgstatus: 0,
          online: 1,
          phone: null,
          status: 1,
          updatedAt: "",
          username: "易北学习交流群",
        });
      }

      commit("setImUserList", resData.data.data);
    },

    // 用户信息
    async actionsUserInfo({ commit }) {
      const { data: resData } = await getUserInfo();
      if (!resData.data.status) return;

      sessionStorage.setItem("userInfo", JSON.stringify(resData.data.userInfo));
      commit("setUserInfo", resData.data.userInfo);
    },
  },

  modules: {},
});
