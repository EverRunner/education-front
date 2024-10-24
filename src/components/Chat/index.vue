<style lang="scss" scoped>
.service {
  position: fixed;
  right: 30px;
  bottom: 15%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  z-index: 100;

  // 图标
  &-icon {
    position: relative;
    // animation: shadow 0.5s linear infinite;
    // animation: rotate 0.5s linear infinite;
    cursor: pointer;

    img {
      width: 75px;
      height: 75px;
    }
    i {
      width: 18px;
      height: 18px;
      background: red;
      border-radius: 50%;
      font-size: 12px;
      position: absolute;
      right: 3px;
      top: 10px;
      color: #fff;
      text-align: center;
      line-height: 18px;
    }
  }

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
      padding-bottom: 20px;
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
      // animation: move 1.5s 0s infinite;
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
      .logo {
        display: flex;
        align-items: center;
        h6 {
          font-size: 14px;
          color: #fff;
          font-weight: 400;
          margin: 0 2px 0 10px;
          cursor: pointer;
        }
        i {
          animation: slideRight 0.5s ease-in-out forwards infinite;
        }
      }
    }

    @keyframes slideRight {
      0% {
        transform: translateX(0); /* 初始位置 */
      }
      100% {
        transform: translateX(5px); /* 滑动结束位置，可根据需要调整 */
      }
    }

    &-text {
      height: 50vh;
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
        width: calc(100% - 90px);
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
        margin-left: 15px;
      }
    }
  }

  audio {
    opacity: 0;
    width: 0;
    height: 0;
    z-index: -100;
    position: relative;
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
  margin-top: 0px;
  border: 0;
  padding: 0;
  height: auto;
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
        <div class="logo" @click="handleChageGroup">
          <img src="@assets/images/logo3.png" alt="" />
          <h6>
            {{ !isGroup ? "点击切换群聊" : "点击切换客服" }}
          </h6>
          <i class="el-icon-right"></i>
        </div>
        <i @click="handleChatClose" class="el-icon-close"></i>
      </div>
      <div class="service-content-text" ref="imContentBody">
        <div v-if="$route.name == 'COURSE_DETAILS'" class="service-init-title">
          <img src="@assets/images/service-xls.png" alt="" />
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
        <div
          v-if="$route.name == 'COURSE_DETAILS'"
          class="service-init-content"
        >
          欢迎来到<em>「易北教育-联邦按摩考试辅导课程」</em>
        </div>
        <div v-else class="service-init-content">
          欢迎来到<em>「易北教育学习」</em>
        </div>

        <!-- 详情页 -->
        <div class="item" v-if="$route.name == 'COURSE_DETAILS'">
          <img src="@assets/images/service-icon1.png" alt="" />
          如果您已试听了课程，可以直接<em @click="handleGoto('ORDER_INDEX')"
            >购买完整课程，</em
          >立刻开始学习！
        </div>

        <div
          class="item"
          style="margin-bottom: 15px;"
          v-if="$route.name == 'COURSE_DETAILS'"
        >
          <img src="@assets/images/service-icon3.png" alt="" />
          如果您查看课程规化及试听课程，<em @click="handleGoto('shiting')"
            >请点击这里！</em
          >
        </div>

        <!-- 群发消息 -->
        <ul class="im-content-body public-scrollbar" v-if="isGroup">
          <li
            v-for="item in msgGroupList"
            :key="item.id"
            :class="{ 'my-msg': item.memberid == userInfo.id }"
          >
            <template v-if="item.memberid != userInfo.id">
              <img
                class="im-content-body__thumb"
                src="@assets/images/honours-thumb.png"
                alt=""
              />
              <div class="im-content-body__text">
                <h6>
                  {{
                    item.yibei_member ? item.yibei_member.username : "易北教育"
                  }}
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
        </ul>

        <!-- 客服 -->
        <ul class="im-content-body public-scrollbar" v-else>
          <li
            v-for="item in msgList"
            :key="item.id"
            :class="{ 'my-msg': item.memberid == userInfo.id }"
          >
            <template v-if="item.memberid != userInfo.id">
              <img
                class="im-content-body__thumb"
                src="@assets/images/honours-thumb.png"
                alt=""
              />
              <div class="im-content-body__text">
                <h6>
                  {{
                    item.yibei_member ? item.yibei_member.username : "易北教育"
                  }}
                  {{ item.createdAt | formatDate("MM/DD HH:mm") }}
                </h6>
                <div class="msg" v-html="item.msg"></div>
              </div>
            </template>

            <template v-else>
              <div class="im-content-body__text on">
                <h6>{{ item.createdAt | formatDate("MM/DD HH:mm") }}</h6>
                <div class="msg" v-html="item.msg"></div>
              </div>
              <img
                class="im-content-body__thumb"
                src="@assets/images/honours-thumb.png"
                alt=""
              />
            </template>
          </li>
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
        <el-upload
          action="custom"
          :show-file-list="false"
          :http-request="handleFileUpload"
        >
          <img class="btn" src="@assets/images/service-but2.png" />
        </el-upload>
      </div>
    </div>

    <!-- 消息提示 -->
    <div v-if="iconShow" @click="hanldeIconClick" class="service-icon">
      <img src="@assets/images/service-icon.png" alt="" />
      <i v-if="msgNumber > 0">{{ msgNumber }}</i>
    </div>

    <!-- 音乐 -->
    <audio src="@assets/media/service.mp3" ref="serviceAudio"></audio>
  </div>
</template>

<script>
import axios from "axios";
import { getFriendimMsg } from "@api/im";
import emojis from "@assets/media/emojis.json";
import { v4 as uuidv4 } from "uuid"; // uuid插件
import { FILE_ROOT, IM_WEBSOCKET_URL } from "@config";

// 取消请求
const CancelToken = axios.CancelToken;

export default {
  name: "Chat",
  components: {},

  props: {
    // 1：私聊 2：群聊
    category: {
      type: Number,
      default: 2,
    },
  },

  data() {
    return {
      initShow: false,
      contentShow: true, // false
      iconShow: false,
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
      timeout: 1000 * 20, //1分钟发一次心跳
      timeoutObj: null,
      serverTimeoutObj: null,

      touserId: 2983, // 客服ID

      isGroup: false,
      msgGroupList: [],
      pollingEnabled: false,

      source: CancelToken.source(),
    };
  },
  watch: {},

  async created() {
    // 初始化表情包
    this.handleLoadEmojis();
    this.startPolling();
  },

  mounted() {
    if (sessionStorage.getItem("userInfo"))
      this.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

    if (this.userInfo.id) {
      this.wsUrl = `${IM_WEBSOCKET_URL}/${this.userInfo.id}`;
      // 初始化聊天
      this.createWebSocket(this.wsUrl);
    }

    // 获取聊天消息
    this.queryAnonymityMsg();

    // 滚动监听
    // window.addEventListener("scroll", this.handleScroll, true);
  },

  computed: {},

  methods: {
    /**
     * 获取聊天消息
     */
    async queryAnonymityMsg() {
      // 客服用户id: 2983
      const userId = 2983;

      const { data: resData } = await getFriendimMsg(
        {
          pagesize: 200,
          pageindex: 1,
        },
        userId
      );
      if (!resData.data.status) return;

      this.msgList = resData.data.data.filter((item) => {
        if (item.msg.indexOf('"fromuser"') > -1) {
          const { msg } = JSON.parse(item.msg);
          if (msg) item.msg = msg;
        }

        if (item.msg.indexOf('"status') == -1) return item;
      });

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
      }, 100);
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
     * 创建1个socket连接
     */
    createWebSocket(url) {
      try {
        if ("WebSocket" in window) {
          this.ws = new WebSocket(url);
        }
        this.initEventHandle();
      } catch (e) {
        this.reconnect(url);
        console.log(e);
      }
    },

    /**
     * 初始化事件处理
     */
    initEventHandle() {
      const that = this;

      this.ws.onclose = function() {
        that.reconnect(that.wsUrl);
        console.log("连接关闭!" + new Date().toLocaleString());
      };
      this.ws.onerror = function() {
        that.reconnect(that.wsUrl);
        console.log("连接错误!");
      };
      this.ws.onopen = function() {
        that.heartCheck(); //心跳检测重置
        console.log("连接成功!" + new Date().toLocaleString());
      };

      this.ws.onmessage = function(event) {
        // 如果获取到消息，心跳检测重置
        that.heartCheck(); // 拿到任何消息都说明当前连接是正常

        if (event.data.indexOf("status") >= 0) return;

        //数据已接收
        const { msg, fromuser } = JSON.parse(event.data);

        that.msgList.push({
          createdAt: new Date(),
          frindid: this.frindid,
          id: uuidv4(),
          memberid: fromuser,
          // memberid: that.userInfo.id,
          msg: msg,
          status: 1,
          updatedAt: new Date(),
        });

        // 播放声音
        if (that.$refs.serviceAudio && that.$refs.serviceAudioplay.play) {
          that.$refs.serviceAudio.play();
        }

        that.msgNumber++;

        // 保存历史消息
        that.handleSendMsg(2983, event.data);

        // 内容滑到底部
        that.handleAlignBottom();
      };
    },

    /**
     * 发送消息给 个人
     * 用户id: 2983 是易北客服
     */
    async handleSendMsg(frindid, content) {
      // const { data: resData } = sendMsg({
      //   frindid,
      //   content,
      // });
    },

    /**
     * 重新连接
     */
    reconnect(url) {
      if (this.lockReconnect) return;
      this.lockReconnect = true;
      setTimeout(() => {
        //没连接上会一直重连，设置延迟避免请求过多
        this.createWebSocket(url);
        this.lockReconnect = false;
      }, 2000);
    },

    heartCheck() {
      const self = this;

      clearTimeout(this.timeoutObj);
      clearTimeout(this.serverTimeoutObj);

      this.timeoutObj = setTimeout(function() {
        //这里发送一个心跳，后端收到后，返回一个心跳消息，
        //onmessage拿到返回的心跳就说明连接正常
        self.ws.send("ping");
        self.serverTimeoutObj = setTimeout(function() {
          // 如果超过一定时间还没重置，说明后端主动断开了
          self.ws.close(); //如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
        }, self.timeout);
      }, this.timeout);
    },

    // createWebSocket2() {
    //   const that = this;

    //   if (!("WebSocket" in window)) {
    //     console.log("您的浏览器不支持 WebSocket!");
    //     return;
    //   }

    //   // 打开一个 web socket
    //   this.ws = new WebSocket(`${IM_WEBSOCKET_URL}/${this.userInfo.id}`);

    //   this.ws.onopen = function(e) {
    //     // Web Socket 已连接上，使用 send() 方法发送数据
    //     console.log("onopen", e, that.userInfo.id);
    //   };

    //   this.ws.onmessage = function(evt) {
    //     //数据已接收
    //     const resMsgData = JSON.parse(evt.data);
    //     console.log("onmessage", evt.data);

    //     if (!resMsgData.status) return;

    //     that.msgList.push({
    //       createdAt: new Date(),
    //       frindid: this.frindid,
    //       id: uuidv4(),
    //       memberid: that.userInfo.id,
    //       msg: "当前客服不在线，请您留言或者添加张老师微信！",
    //       status: 1,
    //       updatedAt: new Date(),
    //     });

    //     that.handleAlignBottom();
    //   };
    // },

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
     * 图片上传
     */
    async handleFileUpload(params) {
      // console.log(111, params);
      const file = params.file,
        fileType = file.type,
        isImage = fileType.indexOf("image") != -1,
        isLt2M = file.size / 1024 / 1024 < 2;
      // 这里常规检验，看项目需求而定
      if (!isImage) {
        this.$message.error("只能上传图片格式png、jpg、gif!");
        return;
      }
      if (!isLt2M) {
        this.$message.error("只能上传图片大小小于2M");
        return;
      }
      // 根据后台需求数据格式
      const form = new FormData();
      // 文件对象
      form.append("file", file);
      // 本例子主要要在请求时添加特定属性，所以要用自己方法覆盖默认的action
      // form.append("clientType", "xxx");

      //  图片转base64
      const dataURL = await this.getBase64(file);

      // 添加消息
      this.msgList.push({
        createdAt: new Date(),
        frindid: this.frindid,
        id: uuidv4(),
        memberid: this.userInfo.id || 0,
        msg: `<img src='${dataURL}' />`,
        status: 1,
        updatedAt: new Date(),
      });

      // 内容滑到底部
      this.handleAlignBottom();

      // 上传图片
      const { data: resData } = await this.$post("/uploadhandler/image", form, {
        headers: {
          token: this.token,
        },
      });
      if (!resData.data.status) return;

      // 保存历史消息
      this.handleSendMsg(2983, `<img src='${FILE_ROOT + resData.data.path}' >`);

      // this.queryMsgListNer();
    },

    /**
     *  获取用户点击之后的标签，存放到输入框内
     */
    async handleSubmitMessage() {
      if (!this.content) this.$message.error("发送内容不能为空！");

      const content = this.content;
      this.content = "";

      if (this.isGroup) {
        this.pollingEnabled = false;
        this.source.cancel("操作取消");
        this.msgGroupList.push({
          createdAt: new Date(),
          frindid: null,
          id: uuidv4(),
          memberid: this.userInfo.id,
          msg: content,
          status: 1,
          updatedAt: new Date(),
        });
        this.setGroupMessages(this.userInfo.id, content);
      } else {
        this.msgList.push({
          createdAt: new Date(),
          frindid: null,
          id: uuidv4(),
          memberid: this.userInfo.id,
          msg: content,
          status: 1,
          updatedAt: new Date(),
        });

        // 保存历史消息
        this.handleSendMsg(2983, content);

        const msg2 = JSON.stringify({
          category: this.category, // 1：私聊 2：群聊
          fromuser: this.userInfo.id, // 本人的id
          touser: this.category == 1 ? this.touserId : 0, // 接收用户（群聊不需要）
          msg: content,
        });

        this.ws.send(msg2);
      }

      // 内容滑到底部
      this.handleAlignBottom();

      // 输入框获取焦点
      this.$nextTick((x) => {
        this.$refs.msgContent.focus();
      });
    },

    /**
     * 群聊-发送消息
     */
    async setGroupMessages(frindid, content) {
      await this.$post(
        "/im/sendgroupallmsg",
        {
          frindid: frindid,
          content: content,
        },
        {
          headers: { isLoading: false },
        }
      );

      this.source = CancelToken.source();
      this.startPolling();
    },

    /**
     * 聊天界面关闭
     */
    handleChatClose() {
      this.contentShow = false;
      this.iconShow = true;
    },

    /**
     * 客服和群发切换
     */
    handleChageGroup() {
      this.isGroup = !this.isGroup;
      setTimeout(() => {
        // 内容滑到底部
        this.handleAlignBottom();
      }, 30);
    },

    /**
     * 获取群发消息
     */
    async getMessages(pageindex = 1, pagesize = 200) {
      const { data: resData } = await this.$get("/im/getgroupallmsglistner", {
        params: {
          pageindex: pageindex,
          pagesize: pagesize,
        },
        headers: { isLoading: false },
        cancelToken: this.source.token,
      });
      return resData.data.data.rows;
    },

    /**
     * 轮训获取群发消息
     */
    async fetchMessages() {
      try {
        // 发起请求
        this.msgGroupList = await this.getMessages();

        // 请求成功后，等待2秒再执行下一次请求
        setTimeout(() => {
          if (this.pollingEnabled) {
            this.fetchMessages();
          }
        }, 2000);
      } catch (error) {
        console.error("获取消息出错", error);

        // 错误处理逻辑，这里可以根据实际情况决定是否继续轮询
        // 例如，可以在这里设置一个重试次数，超过后停止轮询
        if (this.pollingEnabled) {
          setTimeout(() => {
            this.fetchMessages();
          }, 2000); // 或者根据错误情况调整重试间隔
        }
      }
    },

    /**
     * 开始轮训
     */
    startPolling() {
      this.pollingEnabled = true;
      this.fetchMessages(); // 启动首次请求
    },

    /**
     * 停止轮训
     */
    stopPolling() {
      this.pollingEnabled = false;
    },
  },

  /**
   * 销毁
   */
  beforeDestroy() {
    if (this.anonymityInterval) window.clearInterval(this.anonymityInterval);
    this.stopPolling();
  },
};
</script>
