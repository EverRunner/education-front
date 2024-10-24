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
    animation: shadow 0.5s linear infinite;
    animation: rotate 0.5s linear infinite;
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
          cursor: pointer;
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
    <!-- 初始化弹窗 -->
    <div @click="hanldeInitClick" v-if="initShow" class="service-init">
      <div class="service-init-title">
        <img src="@assets/images/details-xls.png" alt="" />
        <em>张老师</em>
        <span>来自易北教育</span>
      </div>
      <div class="service-init-content">
        Hello <span></span> !
        <img src="@assets/images/service-hy.png" alt="" />
      </div>
      <div class="service-init-content">
        欢迎来到<em>「易北教育-联邦按摩考试辅导课程」</em>
      </div>
      <div class="service-init-more">（点击查看更多）</div>
    </div>

    <!-- 主要聊天界面 -->
    <div v-if="contentShow" class="service-content">
      <div class="service-content-head">
        <img src="@assets/images/logo3.png" alt="" />
        <i @click="contentShow = false" class="el-icon-close"></i>
      </div>
      <div class="service-content-text" ref="imContentBody">
        <div class="service-init-title">
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
        <div class="item" v-if="$route.name == 'HOME_INDEX'">
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
        <div class="item" v-if="$route.name == 'HOME_INDEX'">
          <img src="@assets/images/service-icon3.png" alt="" />
          如果您已经注册账号，请直接<em @click="handleGoto('LOGIN')">登录</em
          >登录后可以「免费领取7天试听课程」；
        </div>

        <!-- 主页 -->
        <div class="item" v-if="$route.name == 'HOME_INDEX'">
          <img src="@assets/images/service-icon5.png" alt="" />
          如果您已试听了课程，可以直接<em @click="handleGoto('COURSE')"
            >购买完整课程，</em
          >立刻开始学习！
        </div>

        <div class="item">
          <img
            src="@assets/images/service-icon4.png"
            alt=""
          />如果您已经购买课程，可以添加张老师微信：<em>ybmblex</em>
          ，加入微信学习群！
        </div>
        <ul class="im-content-body public-scrollbar">
          <li
            v-for="item in msgList"
            :key="item.id"
            :class="{ 'my-msg': item.memberid == anonymityInfo.id }"
          >
            <template v-if="item.memberid != anonymityInfo.id">
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
        </ul>
      </div>
      <div class="service-content-input">
        <textarea
          class="textarea"
          ref="msgContent"
          placeholder="输入消息"
          @keyup.enter="handleSubmitMessage"
          v-model="content"
          cols="1"
        >
        </textarea>
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
      <i>{{ msgNumber }}</i>
    </div>

    <!-- 音乐 -->
    <audio src="@assets/media/service.mp3" ref="serviceAudio"></audio>
  </div>
</template>

<script>
import {
  anonymityLogin,
  creatYoukeMember,
  sendYoukeMsg,
  getYoukeMsg,
  readYoukeMsg,
} from "@api/service";
import emojis from "@assets/media/emojis.json";
import { v4 as uuidv4 } from "uuid"; // uuid插件
import { FILE_ROOT, IM_WEBSOCKET_URL } from "@config";

export default {
  name: "Service",
  components: {},

  props: {},

  data() {
    return {
      initShow: false,
      contentShow: false, // false
      iconShow: false,
      msgNumber: 1,
      anonymityInfo: {},
      token: "",
      msgList: [], // 消息列表
      content: "", // 聊天输入内容
      emojiShow: false, // 表情框是否展示
      faceList: [], // 表情列表
      getBrowString: "", // 表情文本
      emojis, // 表情数据
      frindid: 1, //  易北客服ID
      anonymityInterval: 0,
      userInfo: {},
    };
  },
  watch: {},

  async created() {
    // 初始化表情包
    this.handleLoadEmojis();

    // 匿名登录
    // await this.anonymityLogin();

    // 获取游客信息
    await this.queryAnonymityInfo();

    this.queryAnonymityMsg();
    this.anonymityInterval = setInterval(() => {
      this.queryAnonymityMsg();
    }, 5000);
  },

  mounted() {
    if (sessionStorage.getItem("userInfo"))
      this.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

    // 滚动监听
    window.addEventListener("scroll", this.handleScroll, true);
  },

  computed: {},

  methods: {
    /**
     * 匿名登录
     */
    async anonymityLogin() {
      if (sessionStorage.getItem("anonymityToken")) return;

      const { data: resData } = await anonymityLogin();
      if (!resData.data.status) return;

      sessionStorage.setItem("anonymityToken", resData.data.token);
    },

    /**
     * 获取游客信息
     */
    async queryAnonymityInfo() {
      // 获取缓存的用户
      this.anonymityInfo = JSON.parse(localStorage.getItem("anonymityInfo"));

      if (this.anonymityInfo && this.anonymityInfo.id) return;

      const { data: resData } = await creatYoukeMember();
      if (!resData.data.status) return;

      localStorage.setItem("anonymityInfo", JSON.stringify(resData.data.data));
    },

    /**
     * 获取聊天消息
     */
    async queryAnonymityMsg() {
      if (!this.anonymityInfo || !this.anonymityInfo.id) return;

      const { data: resData } = await getYoukeMsg({
        lasmsgid: 0,
        youkeid: this.anonymityInfo.id,
      });
      if (!resData.data.status) return;

      this.msgList = resData.data.data;
    },

    /**
     * 初始弹出
     */
    hanldeInitClick() {
      this.initShow = false;
      this.contentShow = true;
    },

    /**
     * 图标点击
     */
    hanldeIconClick() {
      if (this.contentShow) return (this.contentShow = false);
      if (this.initShow) return (this.initShow = false);

      if (localStorage.getItem("serviceFirst") == "first") {
        this.contentShow = true;
      } else {
        this.initShow = true;
        localStorage.setItem("serviceFirst", "first");
      }
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
     * 监听滚动条
     */
    handleGoto(name) {
      if (name == "shiting") {
        this.contentShow = false;
        this.$emit("handleCall", "course");
        return;
      }

      this.$router.push({ name });
    },

    /**
     * 处理底部对齐
     */
    handleAlignBottom() {
      this.$nextTick(() => {
        var h = this.$refs.imContentBody.scrollHeight;
        this.$refs.imContentBody.scrollTop = h;
      });
    },

    /**
     * 创建1个socket连接
     * @returns success
     */
    createWebSocket() {
      const that = this;

      if (!("WebSocket" in window)) {
        console.log("您的浏览器不支持 WebSocket!");
        return;
      }

      // 打开一个 web socket
      this.ws = new WebSocket(`${IM_WEBSOCKET_URL}/${this.anonymityInfo.id}`);

      this.ws.onopen = function(e) {
        // Web Socket 已连接上，使用 send() 方法发送数据
        console.log("onopen", e, that.anonymityInfo.id);
      };

      this.ws.onmessage = function(evt) {
        //数据已接收
        const resMsgData = JSON.parse(evt.data);
        console.log("onmessage", evt.data);

        if (resMsgData.status) return;

        that.msgList.push({
          createdAt: new Date(),
          frindid: this.frindid,
          id: uuidv4(),
          memberid: that.anonymityInfo.id,
          msg: "当前客服不在线，请您留言或者添加张老师微信！",
          status: 1,
          updatedAt: new Date(),
        });

        that.handleAlignBottom();
      };
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
        memberid: this.anonymityInfo.id || 0,
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

      // 发送消息
      const { data: resData2 } = await this.$post(
        "/im/sendmsg",
        {
          frindid: this.frindid,
          content: `<img src='${FILE_ROOT + resData.data.path}' >`,
        },
        {
          headers: {
            token: this.token,
          },
        }
      );
      if (!resData2.data.status) return;

      // this.queryMsgListNer();
    },

    /**
     *  获取用户点击之后的标签，存放到输入框内
     */
    async handleSubmitMessage() {
      if (!this.content) return this.$message.error("发送内容不能为空！");

      const content = this.content;

      this.msgList.push({
        createdAt: new Date(),
        frindid: this.frindid,
        id: uuidv4(),
        memberid: this.anonymityInfo.id || 0,
        msg: this.content,
        status: 1,
        updatedAt: new Date(),
      });

      this.content = "";

      // 内容滑到底部
      this.handleAlignBottom();

      // 输入框获取焦点
      this.$nextTick((x) => {
        this.$refs.msgContent.focus();
      });

      const { data: resData } = await sendYoukeMsg({
        youkeid: this.anonymityInfo.id || 0,
        content,
      });
      if (!resData.data.status) return;
    },
  },

  /**
   * 销毁
   */
  beforeDestroy() {
    if (this.anonymityInterval) window.clearInterval(this.anonymityInterval);
  },
};
</script>
