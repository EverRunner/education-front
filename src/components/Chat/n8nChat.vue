<style lang="scss" scoped>
body {
  padding: 0;
  margin: 0;
}
.service {
  max-width: 100%;
  max-height: 100%;

  // 初始化弹窗
  &-init {
    background-color: #fff;
    box-shadow: 0px 3px 5px rgba(14, 31, 53, 0.12);
    box-shadow: 0px 6px 9px rgba(14, 31, 53, 0.2);
    box-shadow: 0px 10px 20px rgba(14, 31, 53, 0.12);
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 10px;
    cursor: pointer;
    width: 380px;
    box-sizing: border-box;

    &-title {
      display: flex;
      align-items: center;
      font-size: 13px;
      img {
        height: 33px;
        width: 33px;
        border-radius: 50%;
        overflow: hidden;
      }
      em {
        color: #1d4d8d;
        margin: 0 10px;
      }
      span {
        color: #707070;
      }
    }
    &-content {
      font-size: 15px;
      color: #1e2e3d;
      padding-top: 20px;
      display: flex;
      align-items: center;
      flex-wrap: wrap;

      img {
        height: 17px;
        margin-left: 10px;
      }
      em {
        font-weight: bold;
      }
    }

    &-more {
      text-align: center;
      padding-top: 15px;
      color: #004d92;
      animation: move 1.5s 0s infinite;
    }
  }

  // 主要聊天界面
  &-content {
    background: #fff;
    width: 380px;
    max-width: 100%;
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 0px 10px 20px rgba(14, 31, 53, 0.12);
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid #e5e5e5;

    &-head {
      background-image: url("../../assets/images/service-head-bg.png");
      background-position: center;
      background-size: cover;
      padding: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      img {
        height: 30px;
      }
      i {
        font-size: 16px;
        color: #fff;
        cursor: pointer;
      }
    }

    &-text {
      height: 350px;
      overflow-y: auto;
      width: calc(100% - 40px);
      margin: auto;
      border: 0.3px solid rgba(166, 166, 166, 0.35);
      border-top: 0;
      border-bottom-right-radius: 12px;
      border-bottom-left-radius: 12px;
      padding: 20px 10px;
      box-sizing: border-box;

      .item {
        color: #1e2e3d;
        font-size: 14px;
        padding-top: 20px;
        // display: flex;
        // align-items: center;
        // flex-flow: wrap;
        letter-spacing: 1px;
        line-height: 1.6;
        img {
          height: 15px;
          margin-right: 1px;
        }
        em {
          color: #1d4d8d;
          font-weight: bold;
          // cursor: pointer;
        }
      }
    }
    &-input {
      width: calc(100% - 40px);
      height: 36px;
      margin: 10px auto;
      background-color: #f4f4fb;
      border-radius: 10px;
      display: flex;
      align-items: center;

      .textarea {
        border: 0;
        width: calc(100% - 110px);
        height: 36px;
        line-height: 36px;
        padding: 0 10px;
        font-size: 14px;
        background-color: #f4f4fb;
        border-radius: 10px;
        box-sizing: border-box;
        outline: none;
      }

      .btn {
        width: 24px;
        cursor: pointer;
        margin: 0 10px 0 10px;
      }
      .send-btn {
        font-size: 14px;
        width: 60px;
        background: #1165aa;
        color: #fff;
        height: 24px;
        line-height: 24px;
        text-align: center;
        border-radius: 15px;
        cursor: pointer;
      }
    }
  }

  audio {
    opacity: 0;
  }
}

.browBox {
  height: 109px;
  overflow-y: scroll;
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      cursor: pointer;
      width: 10%;
      padding: 2px 0 3px;
      font-size: 16px;
      list-style: none;
      text-align: center;
      border-radius: 2px;
      transition: all 0.3s ease;
      &:hover {
        background: #e6e6e6;
      }
    }
  }
}

.im-content-body {
  margin-top: 20px;
  border: 0;
  padding: 0;
  height: auto;
  overflow: hidden;

  .loading-msg {
    margin: 0;
    justify-content: center;
    font-size: 12px;
    color: #767676;
    &::after {
      content: "...";
      display: inline-block;
      opacity: 1;
      animation: typing 1s infinite;
    }
  }
}

@keyframes typing {
  0% {
    content: "...";
    opacity: 1;
  }
  30% {
    content: ".";
    opacity: 1;
  }
  60% {
    content: "..";
    opacity: 1;
  }
  100% {
    content: "...";
    opacity: 1;
  }
}

// 手机端
@media only screen and (max-width: 768px) {
  .service {
    right: 5px;
    bottom: 10%;
    left: 5px;
  }
}

// 动画1
@keyframes shadow {
  0%,
  100% {
    transform: scaleX(1);
  }
  50% {
    transform: scaleX(1.2);
  }
}

// 动画2
@keyframes rotate {
  0% {
    transform: translateY(0);
  }
  25% {
    transform: translateY(10px);
  }
  50% {
    transform: translateY(20px) scale(1.1, 0.9);
  }
  75% {
    ransform: translateY(10px);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes move {
  0%,
  65% {
    transform: rotate(0deg);
  }
  70% {
    transform: rotate(5deg);
  }
  75% {
    transform: rotate(-5deg);
  }
  80% {
    transform: rotate(5deg);
  }
  85% {
    -webkit-transform: rotate(-5deg);
    transform: rotate(-5deg);
  }
  90% {
    transform: rotate(5deg);
  }
  95% {
    transform: rotate(-5deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
</style>
<template>
  <div class="service">
    <!-- 主要聊天界面 -->
    <div v-if="contentShow" class="service-content">
      <div class="service-content-head">
        <img src="@assets/images/logo3.png" alt="" />
      </div>
      <div class="service-content-text" ref="imContentBody">
        <div class="service-init-title">
          <img src="@assets/images/details-xls.png" alt="" />
          <em>张老师</em>
          <span>来自易北教育</span>
        </div>
        <div class="service-init-content">
          Hello
          <span v-if="userInfo && userInfo.username"
            >，{{ userInfo.username }}</span
          >
          !
          <img src="@assets/images/service-hy.png" alt="" />
        </div>
        <div class="service-init-content">
          欢迎来到<em>「易北教育-联邦按摩考试辅导课程」</em>
        </div>

        <!-- 详情页 -->
        <div class="item" v-if="$route.name == 'COURSE_DETAILS'">
          <img src="@assets/images/service-icon1.png" alt="" />
          如果您已试听了课程，可以直接<em @click="handleGoto('ORDER_INDEX')"
            >购买完整课程，</em
          >立刻开始学习！
        </div>

        <!-- 主页 -->
        <div class="item">
          <img src="@assets/images/service-icon1.png" alt="" />
          如果您是首次来到我们的网站，可以先用<em
            @click="handleGoto('REGISTERED')"
            >手机号</em
          >或<em @click="handleGoto('REGISTERED')">邮箱地址</em>注册账号;
        </div>

        <!-- 详情页 -->
        <div class="item" v-if="$route.name == 'COURSE_DETAILS'">
          <img src="@assets/images/service-icon3.png" alt="" />
          如果您查看课程规化及试听课程，<em @click="handleGoto('shiting')"
            >请点击这里！</em
          >
        </div>

        <!-- 主页 -->
        <div class="item">
          <img src="@assets/images/service-icon3.png" alt="" />
          如果您已经注册账号，请直接<em @click="handleGoto('LOGIN')">登录</em
          >登录后可以「免费领取7天试听课程」；
        </div>

        <!-- 主页 -->
        <div class="item">
          <img src="@assets/images/service-icon5.png" alt="" />
          如果您对我们的课程满意，可以登入您注册的帐户<em
            @click="handleGoto('COURSE')"
            >完成购课</em
          >开始学习！
        </div>

        <div class="item">
          <img
            src="@assets/images/service-icon4.png"
            alt=""
          />如果您已经购买课程，可以添加张老师微信：<em>ybmblex</em>
          ，加入微信学习群！
        </div>

        <!-- 主页 -->

        <div class="item">
          <img
            src="@assets/images/service-icon4.png"
            alt=""
          />您有任何问题可以在下方直接留言！
        </div>

        <ul class="im-content-body public-scrollbar">
          <li
            v-for="item in msgList"
            :key="item.id"
            :class="{ 'my-msg': item.memberid != anonymityInfo.id }"
          >
            <template v-if="item.memberid == anonymityInfo.id">
              <img
                class="im-content-body__thumb"
                src="@assets/images/honours-thumb2.jpg"
                alt=""
              />
              <div class="im-content-body__text">
                <h6>
                  {{ item.yibei_member && item.yibei_member.username }}
                  {{ item.createdAt | formatDate("MM-DD HH:mm") }}
                </h6>
                <div class="msg" v-html="item.msg"></div>
              </div>
            </template>

            <template v-else>
              <div class="im-content-body__text on">
                <h6>{{ item.createdAt | formatDate }}</h6>
                <div class="msg" v-html="item.msg"></div>
              </div>
              <img
                class="im-content-body__thumb"
                src="@assets/images/honours-thumb.png"
                alt=""
              />
            </template>
          </li>
          <li v-show="loading" class="loading-msg">客服回复中</li>
        </ul>
      </div>
      <div class="service-content-input">
        <input
          class="textarea"
          ref="msgContent"
          placeholder="输入消息"
          @keyup.enter="handleSubmitMessage"
          v-model="content"
        />
        <el-popover
          placement="top"
          title=""
          width="375"
          height="700"
          trigger="click"
          v-model="emojiShow"
        >
          <img
            class="btn"
            src="@assets/images/service-but1.png"
            slot="reference"
          />
          <div class="browBox">
            <ul>
              <li
                v-for="(item, index) in faceList"
                :key="index"
                @click="handleGetBrow(index)"
              >
                {{ item }}
              </li>
            </ul>
          </div>
        </el-popover>
        <span class="send-btn" @click="handleSubmitMessage">发送</span>
      </div>
    </div>

    <!-- 音乐 -->
    <audio src="@assets/media/service.mp3" ref="serviceAudio"></audio>
  </div>
</template>

<script>
import axios from "axios";
import emojis from "@assets/media/emojis.json";
import { v4 as uuidv4 } from "uuid"; // uuid插件

export default {
  name: "Chat",
  components: {},

  props: {
    // 1：私聊 2：群聊
    category: {
      type: Number,
      default: 1,
    },
  },

  data() {
    return {
      initShow: false,
      contentShow: true, // false
      iconShow: true,
      msgNumber: 0,
      userInfo: {},
      token: "",
      msgList: [], // 消息列表
      content: "", // 聊天输入内容
      emojiShow: false, // 表情框是否展示
      faceList: [], // 表情列表
      getBrowString: "", // 表情文本
      emojis, // 表情数据
      frindid: 1, //  易北客服ID
      anonymityInterval: 0,

      lockReconnect: false, // 避免ws重复连接
      ws: null, //  判断当前浏览器是否支持WebSocket,
      wsUrl: "",
      timeout: 1000 * 60, //1分钟发一次心跳
      timeoutObj: null,
      serverTimeoutObj: null,

      touserId: 2983, // 客服ID

      anonymityInfo: {},
      loading: false,
    };
  },
  watch: {},

  async created() {
    // 初始化表情包
    this.handleLoadEmojis();
  },

  mounted() {
    this.handleUserInfo();

    // 获取聊天消息
    this.queryAnonymityMsg();
  },

  computed: {},

  methods: {
    handleUserInfo() {
      let charUserInfo = {};

      if (localStorage.getItem("charUserInfo")) {
        try {
          charUserInfo = JSON.parse(localStorage.getItem("charUserInfo"));
        } catch (error) {
          console.log("localStorage charUserInfo json 出错");
        }
      } else {
        charUserInfo = { username: "访客", id: "ybmbelx-" + uuidv4() };
        localStorage.setItem("charUserInfo", JSON.stringify(charUserInfo));
      }

      this.userInfo = charUserInfo;
    },

    /**
     * 获取聊天消息
     */
    async queryAnonymityMsg() {
      if (localStorage.getItem("charMsgList")) {
        try {
          this.msgList = JSON.parse(localStorage.getItem("charMsgList"));
        } catch (error) {
          console.log("localStorage msgList json 出错");
        }
      }
      setTimeout(() => {
        // 内容滑到底部
        this.handleAlignBottom();
      }, 10);
    },

    /**
     * 图标点击
     */
    hanldeIconClick() {
      this.iconShow = false;
      this.contentShow = true;
      setTimeout(() => {
        // 内容滑到底部
        this.handleAlignBottom();
      }, 10);
    },

    /**
     * 监听滚动条
     */
    handleScroll() {
      if (this.iconShow) return;

      this.iconShow = true;

      this.$refs.serviceAudio.play();
    },

    /**
     * 处理底部对齐
     */
    handleAlignBottom() {
      if (!this.contentShow) return;

      this.$nextTick(() => {
        var h = this.$refs.imContentBody.scrollHeight;
        this.$refs.imContentBody.scrollTop = h;
      });
    },

    /**
     * 加载表情，存放到表情列表中
     */
    handleLoadEmojis() {
      for (let i in this.emojis) {
        this.faceList.push(this.emojis[i].char);
      }
    },

    /**
     *  获取用户点击之后的标签，存放到输入框内
     */
    handleGetBrow(index) {
      for (let i in this.faceList) {
        if (index == i) {
          this.getBrowString = this.faceList[index];
          this.content += this.getBrowString;
        }
      }
      this.emojiShow = false;
    },

    getBase64(file) {
      return new Promise((resolve, reject) => {
        let reader = new FileReader();
        let fileResult = "";
        reader.readAsDataURL(file);
        //开始转
        reader.onload = function() {
          fileResult = reader.result;
        };
        //转 失败
        reader.onerror = function(error) {
          reject(error);
        };
        //转 结束  咱就 resolve 出去
        reader.onloadend = function() {
          resolve(fileResult);
        };
      });
    },

    /**
     *  获取用户点击之后的标签，存放到输入框内
     */
    async handleSubmitMessage() {
      if (!this.content) this.$message.error("发送内容不能为空！");

      const content = this.content;

      // 缓存消息
      this.saveHistoryMsg({
        msg: content,
        memberid: this.userInfo.id,
      });

      this.content = "";

      // 输入框获取焦点
      this.$nextTick(() => {
        this.$refs.msgContent.focus();
      });

      this.loading = true;
      const { data: receiveData, code } = await this.n8nSendMsg({
        sessionId: this.userInfo.id,
        chatInput: content,
        assistant_id: "asst_NkvxM7tYheVVCMGpdjycByr0",
      });
      this.loading = false;
      if (!code) return;

      // 缓存消息
      this.saveHistoryMsg({ msg: receiveData.content[0].text.value });
    },

    /**
     * 保留历史消息
     */
    saveHistoryMsg({ msg, memberid }) {
      this.msgList.push({
        createdAt: new Date(),
        frindid: null,
        id: uuidv4(),
        msg: msg,
        status: 1,
        updatedAt: new Date(),
        memberid,
      });

      // 内容滑到底部
      this.handleAlignBottom();

      localStorage.setItem("charMsgList", JSON.stringify(this.msgList));
    },

    /**
     * 聊天界面关闭
     */
    handleChatClose() {
      this.contentShow = false;
      this.iconShow = true;
    },

    /**
     * n8n客服 发送消息
     */
    async n8nSendMsg(data) {
      try {
        const response = await axios.post(
          "https://n8n-production-0d41.up.railway.app/webhook/2a7472c4-d727-4619-bef6-76ee41f31cd0",
          data,
          {
            headers: {
              "Content-Type": "application/json", // 根据需要设置请求头
              Authorization: "Bearer CCCB1D6262AF691C",
            },
          }
        );
        return {
          code: 1,
          data: response.data,
        };
      } catch (error) {
        console.error("Error:", error);
        return {
          code: 0,
          error,
        };
      }
    },
  },

  /**
   * 销毁
   */
  beforeDestroy() {},
};
</script>
