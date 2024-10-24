/** ***************************正式环境************************************/
export const API_ROOT = "/clientapi";

/** ****************************测试环境***********************************/
// export const API_ROOT = "http://clientapi.lvelbe.net/clientapi";

// 生产环境和测试环境
export const debug = process.env.NODE_ENV !== "production";

// 系统标题
export const TITLE = "易北联邦按摩师考试辅导";

// 设置请求的超时时间   单位毫秒
export const REQUEST_TIMEOUT = 300000;

// 文件服务器
// export const FILE_ROOT = "http://47.114.151.82:8088/";
export const FILE_ROOT = "https://ybmblex.net/";

// 第三方登录域名
export const EXTERNAL_LOGIN = "https://ybmblex.net/";

// 分享域名
export const SHARE_URL = "https://ybmblex.net";

// 一页显示的条目
export const PAGE_SIZE = 15;

// 支付key
// export const PAY_KEY = "pk_test_weV6nqRB5Hr2gxjahLy7s1Fl00iQOmaF4X"; //  测试
export const PAY_KEY = "pk_live_lcYNEH0pHHpVFCqYXI8sNVbT00YOKtyx9C"; //  正式

// 支付价格
export const PAY_PRICE = 1199; //  正式

// 综合测试、错误测试 随机题数
export const ERROR_RANDOM_TOPIC = 100;

// WebSocket 地址
export const WEBSOCKET_URL =
  process.env.NODE_ENV === "production"
    ? "wss://socket.ybmblex.net" //正式
    : // : "ws://54.183.226.51:18090"; //测试
      "wss://socket.ybmblex.net"; //测试

// 即时聊天 WebSocket 地址
export const IM_WEBSOCKET_URL =
  process.env.NODE_ENV === "production"
    ? "wss://socket.ybmblex.net" //正式
    : "ws://54.183.226.51:18090"; //测试

// intro配置
export const INTRO_OPTIONS = {
  prevLabel: "&larr;上一步",
  nextLabel: "下一步&rarr;",
  // skipLabel: "跳过",
  doneLabel: "完成",
  hintButtonLabel: "知道了",
  showProgress: true,
  exitOnOverlayClick: false,
  disableInteraction: true, //禁用元素交互
  overlayOpacity: 0.8,
  scrollTo: "tooltip",
  showStepNumbers: true, //是否在红色圆圈中显示步骤编号
  // keyboardNavigation:true,  //是否使用键盘导航
  // scrollToElement:true,  //如果它在视口之外，则自动滚动到突出显示的元素
  // position: 'top',
};

// 用户详情，学习进度记录类型
export const STUDY_TYPE = {
  0: "章节测试",
  1: "关键词测试（中英）",
  2: "关键词测试（英）",
  3: "章节测试前（关键词）",
  4: "我的错题测试",
  5: "综合模拟测试",
  6: "高频模拟测试",
  7: "我的错题测前（关键词）",
  8: "综合模拟测前（关键词）",
  9: "高频模拟测前（关键词）",
  10: "应变测试前（关键词）",
  11: "应变测试",
};

// 用户学习步骤
export const STUDY_CHAPTER_STEP = {
  0: "视频课程",
  1: "中英文关键词卡",
  2: "中英文关键词测试",
  3: "英文关键词卡",
  4: "英文关键词测试",
  5: "章节测试",
};

// 学习路由列表
export const STUDY_ROUTER_LIST = [
  "/course/studyVideo", // 视频学习
  "/course/studyWord", // 关键词（中英）学习
  "/course/studyWordTest", // 关键词（中英）测试
  "/course/studyWordEnglish", // 关键词（英）学习
  "/course/studyWordEnglishTest", // 关键词（英）测试
  "/course/studyTest", // 单元测试
  "/course/testResults", // 单元测试结果
];

// 美国所有州名
export const AMERICA_STATE_LIST = [
  "亚拉巴马州",
  "阿拉斯加州",
  "亚利桑那州",
  "阿肯色州",
  "加利福尼亚州",
  "科罗拉多州",
  "康涅狄格州",
  "特拉华州",
  "佛罗里达州",
  "佐治亚州",
  "夏威夷州",
  "爱达荷州",
  "伊利诺伊州",
  "印第安纳州",
  "内华达州",
  "新罕布什尔州",
  "新泽西州",
  "新墨西哥州",
  "纽约州",
  "北卡罗莱纳州",
  "北达科他州",
  "俄亥俄州",
  "俄克拉何马州",
  "俄勒冈州",
  "宾夕法尼亚州",
  "罗得岛州",
  "南卡罗来纳州",
  "南达科他州",
  "田纳西州",
  "得克萨斯州",
  "犹他州",
  "佛蒙特州",
  "弗吉尼亚州",
  "华盛顿州",
  "西弗吉尼亚州",
  "威斯康星州",
  "怀俄明州",
  "爱荷华州",
  "堪萨斯州",
  "肯塔基州",
  "路易斯安那州",
  "缅因州",
  "马里兰州",
  "马萨诸塞州",
  "密歇根州",
  "明尼苏达州",
  "密西西比州",
  "密苏里州",
  "蒙大拿州",
  "内布拉斯加州",
];
