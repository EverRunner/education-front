import { FILE_ROOT, WEBSOCKET_URL } from "@config";
import dayjs from "dayjs";
import { refreshToken } from "@/api/common";

/**
 * 图片地址格式化
 * @param {*} rawImg 图片地址
 */

export function formatImg(rawImg) {
  if (rawImg) return FILE_ROOT + rawImg;
  else return "";
}

/**
 * 日期时间格式化
 * @param {*} dateTime 日期时间
 * @param {*} forma  格式类型
 * @returns {string}
 */
export function formatDateTime(dateTime, forma = "YYYY-MM-DD HH:mm") {
  if (!dateTime) return "-";

  return dayjs(dateTime).format(forma);
}

/**
 * 计算两个日期之间的天数
 * @param dateString1  开始日期 yyyy-MM-dd
 * @param dateString2  结束日期 yyyy-MM-dd
 * @returns {number} 如果日期相同 返回一天 开始日期大于结束日期，返回0
 */
export function daysBetween(dateString1, dateString2) {
  var startDate = Date.parse(dateString1);
  var endDate = Date.parse(dateString2);
  if (startDate > endDate) {
    return 0;
  }
  if (startDate == endDate) {
    return 1;
  }
  var days = (endDate - startDate) / (1 * 24 * 60 * 60 * 1000);
  return days;
}

/**
 * [dateAddDays 从某个日期增加n天后的日期]
 * @param  {[string]} dateStr  [日期字符串]
 * @param  {[int]} dayCount [增加的天数]
 * @return {[string]}[增加n天后的日期字符串]
 */
export function dateAddDays(dateStr, dayCount) {
  var tempDate = new Date(dateStr.replace(/-/g, "/")); //把日期字符串转换成日期格式
  var resultDate = new Date((tempDate / 1000 + 86400 * dayCount) * 1000); //增加n天后的日期
  var resultDateStr =
    resultDate.getFullYear() +
    "年" +
    (resultDate.getMonth() + 1) +
    "月" +
    resultDate.getDate() +
    "日"; //将日期转化为字符串格式
  return resultDateStr;
}

/**
 * 生成字母选项（ABCD...）
 * @param {*} num 数字从0开始
 */
export function creationLetter(num) {
  const ascii = num + 65;

  if (!isNaN(num) && ascii < 65 && ascii >= 91) return "-";
  return String.fromCharCode(ascii);
}

/**
 * 格式化货币，保留2位小数
 * @param num 数值(Number或者String)
 * @return 金额格式的字符串,如'1,234,567.45'
 * @type String
 */
export function formatCurrency(num) {
  if (!num) return 0;

  num = num.toString().replace(/\$|\,/g, "");
  if (isNaN(num)) {
    num = "0";
  }

  let sign = num == (num = Math.abs(num)); //数字是否为正负数  Math.abs() 返回参数的绝对值
  num = Math.floor(num * 100 + 0.50000000001); //返回小于等于num*100+0.50000000001的最大整数:
  let cents = num % 100; //小数位数
  num = Math.floor(num / 100).toString(); //整数位数
  if (cents < 10) {
    cents = "0" + cents; //小数位补0
  }
  for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
    // 货币，三位数字一间隔
    num =
      num.substring(0, num.length - (4 * i + 3)) +
      "," +
      num.substring(num.length - (4 * i + 3));
  }
  return (sign ? "" : "-") + num + "." + cents;
}

/**
 * 邮箱格式验证
 * @param {*} email 邮箱号
 */
export function emailValidation(email) {
  // var reg = /^[\da-z]+([\-\.\_]?[\da-z]+)*@[\da-z]+([\-\.]?[\da-z]+)*(\.[a-z]{2,})+$/i;

  var reg = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$");

  if (reg.test(email)) return true;
  else return false;
}

/**
 * 美国手机号
 * @param {*} phone 手机号
 */
export function phoneValidation(phone) {
  var reg = /^\d{10}$/;

  if (reg.test(phone)) return true;
  else return false;
}

/**
 * 验证密码
 * @param {*} phone 密码
 */
export function passwordValidation(password) {
  var reg = /^[a-zA-Z0-9_-]{6,15}$/;

  if (reg.test(password)) return true;
  else return false;
}

/**
 *加法函数，用来得到精确的加法结果
 * @param {*} arg1 数字
 * @param {*} arg2 数字
 */
export function accAdd(arg1, arg2) {
  var r1, r2, m, c;
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  c = Math.abs(r1 - r2);
  m = Math.pow(10, Math.max(r1, r2));
  if (c > 0) {
    var cm = Math.pow(10, c);
    if (r1 > r2) {
      arg1 = Number(arg1.toString().replace(".", ""));
      arg2 = Number(arg2.toString().replace(".", "")) * cm;
    } else {
      arg1 = Number(arg1.toString().replace(".", "")) * cm;
      arg2 = Number(arg2.toString().replace(".", ""));
    }
  } else {
    arg1 = Number(arg1.toString().replace(".", ""));
    arg2 = Number(arg2.toString().replace(".", ""));
  }
  return (arg1 + arg2) / m;
}

/**
 * 获取浏览设备类型
 * @returns  1：电脑  2：手机 3：平板
 */
export function getBrowseCategory() {
  let os = (() => {
    let ua = navigator.userAgent,
      isWindowsPhone = /(?:Windows Phone)/.test(ua),
      isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
      isAndroid = /(?:Android)/.test(ua),
      isFireFox = /(?:Firefox)/.test(ua),
      isChrome = /(?:Chrome|CriOS)/.test(ua),
      isTablet =
        /(?:iPad|PlayBook)/.test(ua) ||
        (isAndroid && !/(?:Mobile)/.test(ua)) ||
        (isFireFox && /(?:Tablet)/.test(ua)),
      isPhone = /(?:iPhone)/.test(ua) && !isTablet,
      isPc = !isPhone && !isAndroid && !isSymbian;
    return {
      isTablet: isTablet,
      isPhone: isPhone,
      isAndroid: isAndroid,
      isPc: isPc,
    };
  })();

  if (os.isAndroid || os.isPhone) {
    return 2; //2：手机
  } else if (os.isTablet) {
    return 3; //3：平板
  } else if (os.isPc) {
    return 1; //1：电脑
  }
}

/**
 * WebSocket发送消息
 * @returns success
 */
export function sendWebSocket(userid, username) {
  if (!("WebSocket" in window)) {
    console.log("您的浏览器不支持 WebSocket!");
    return;
  }

  // 打开一个 web socket
  let ws = new WebSocket(WEBSOCKET_URL);

  ws.onopen = function() {
    // Web Socket 已连接上，使用 send() 方法发送数据
    ws.send(
      JSON.stringify({
        userid,
        username,
      })
    );
  };

  ws.onmessage = function(evt) {
    //数据已接收
    console.log(evt.data);
  };

  ws.onclose = function() {
    // 关闭 websocket
    console.log("关闭 websocket");
  };
}

/**
 * 指定范围内的随机整数
 */
export function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 获取两个日期时间之间的持续时间
 * @param startTime
 * @param dateString2
 * @returns {number}
 */
export function dateDiff(endTime, startTime) {
  if (!endTime || !startTime) return 0;

  const diffNumber = dayjs(dayjs(endTime).format("YYYYMMDD")).diff(
    dayjs(dayjs(startTime).format("YYYYMMDD")),
    "days"
  );

  return diffNumber;
}

/**
 * 不足十位自动补0函数
 * @param num  数字
 */
function fillZero(num) {
  if (Number(num) < 10) return "0" + num;
  else return num;
}

/**
 * 计时器
 * @param endTime  结束时戳
 * @callback  getIntervalInfo 获取定时器信息
 * @callback  getCallback 获取时间函数
 * @callback  finishCallback 结束时间函数
 * @returns {number}
 */
export function setTimer(
  endTime,
  getIntervalInfo,
  getCallback,
  finishCallback
) {
  const interval = setInterval(() => {
    const nowTime = new Date().getTime(); // 当前时间
    const times = Math.round((endTime - nowTime) / 1000);

    // 现在时间大于结束时间
    if (times <= 0) {
      window.clearInterval(interval); // 清空定时器
      getCallback({ day: "00", hour: "00", minute: "00", second: "00" });
      finishCallback();
      return;
    }

    // 时间默认值
    const day = fillZero(Math.floor(times / (60 * 60 * 24))),
      hour = fillZero(Math.floor(times / (60 * 60)) - day * 24),
      minute = fillZero(Math.floor(times / 60) - day * 24 * 60 - hour * 60),
      second = fillZero(
        Math.floor(times) - day * 24 * 60 * 60 - hour * 60 * 60 - minute * 60
      );

    getCallback({ day, hour, minute, second }, interval);
  }, 1000);

  // 获取定时器信息
  getIntervalInfo(interval);
}

/**
 * 用循环的方式清除所有的 定时器
 * @count 最后的那个定时器index
 */
export function removeInterval(count) {
  if (!count) return;

  console.log("循环清除定时器，执行次数：", count);
  for (let i = 1; i <= count; i++) {
    window.clearInterval(i);
  }
}

/**
 * 获取当前定位经纬度
 */
export function getLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function(position) {
          console.log("定位成功：", position);
          resolve(position.coords);
        },
        function(error) {
          resolve(false);
          console.log("定位错误：", error);
        }
      );
    } else {
      resolve(false);
      console.log("不支持定位");
    }
  });
}

/**
 * 阿拉伯数字转化为中文数字
 * @param num
 */
export function toChinesNum(num) {
  var AA = new Array(
    "零",
    "一",
    "二",
    "三",
    "四",
    "五",
    "六",
    "七",
    "八",
    "九",
    "十"
  );
  var BB = new Array("", "十", "百", "仟", "萬", "億", "点", "");
  var a = ("" + num).replace(/(^0*)/g, "").split("."),
    k = 0,
    re = "";
  for (var i = a[0].length - 1; i >= 0; i--) {
    switch (k) {
      case 0:
        re = BB[7] + re;
        break;
      case 4:
        if (!new RegExp("0{4}//d{" + (a[0].length - i - 1) + "}$").test(a[0]))
          re = BB[4] + re;
        break;
      case 8:
        re = BB[5] + re;
        BB[7] = BB[5];
        k = 0;
        break;
    }
    if (k % 4 == 2 && a[0].charAt(i + 2) != 0 && a[0].charAt(i + 1) == 0)
      re = AA[0] + re;
    if (a[0].charAt(i) != 0) re = AA[a[0].charAt(i)] + BB[k % 4] + re;
    k++;
  }

  if (a.length > 1) {
    // 加上小数部分(如果有小数部分)
    re += BB[6];
    for (var i = 0; i < a[1].length; i++) re += AA[a[1].charAt(i)];
  }
  if (re == "一十") re = "十";
  if (re.match(/^一/) && re.length == 3) re = re.replace("一", "");
  return re;
}

/**
 * 是否在微信浏览器中
 */
export function isWeiXin() {
  // window.navigator.userAgent 属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
  const ua = window.navigator.userAgent.toLowerCase();

  // 匹配ua中是否含有MicroMessenger字符串
  if (ua.indexOf("micromessenger") !== -1) {
    return true;
  } else {
    return false;
  }
}

/**
 * 调整 步骤顺序
 */
export function adjustmentStepSort(step = 0) {
  // 真实的step为：
  // "-1": "未开始",
  //  0: "视频课程",
  //  1: "中英文关键词卡",
  //  2: "英文关键词卡",
  //  3: "章节测试",
  //  4: "已完成此章节",
  //  5: "中英文关键词测试",
  //  6: "英文关键词测试",

  // 虚拟的step为：
  //  0: "视频课程",
  //  1: "中英文关键词卡",
  //  2: "中英文关键词测试",
  //  3: "英文关键词卡",
  //  4: "英文关键词测试",
  //  5: "章节测试",

  switch (step) {
    case 0:
      return 0;

    case 1:
      return 1;

    case 2:
      return 3;

    case 3:
      return 5;

    case 4:
      return 6;

    case 5:
      return 2;

    case 6:
      return 4;

    default:
      return 0;
  }
}

/**
 * 调整 步骤顺序（反向）
 */
export function adjustmentStepSortReverse(step = 0) {
  // 真实的step为：
  // "-1": "未开始",
  //  0: "视频课程",
  //  1: "中英文关键词卡",
  //  2: "英文关键词卡",
  //  3: "章节测试",
  //  4: "已完成此章节",
  //  5: "中英文关键词测试",
  //  6: "英文关键词测试",

  // 虚拟的step为：
  //  0: "视频课程",
  //  1: "中英文关键词卡",
  //  2: "中英文关键词测试",
  //  3: "英文关键词卡",
  //  4: "英文关键词测试",
  //  5: "章节测试",

  switch (step) {
    case 0:
      return 0;

    case 1:
      return 1;

    case 3:
      return 2;

    case 5:
      return 3;

    case 6:
      return 4;

    case 2:
      return 5;

    case 4:
      return 6;

    default:
      return 0;
  }
}

/**
 * 把秒数转化为天、时、分、秒
 * 参数value是秒数
 */
export function formatSeconds(value) {
  var secondTime = parseInt(value); // 秒
  var minuteTime = 0; // 分
  var hourTime = 0; // 小时
  var dayTime = 0; // 天
  var result = "";
  if (value < 60) {
    result = secondTime + "秒";
  } else {
    if (secondTime >= 60) {
      // 如果秒数大于60，将秒数转换成整数
      // 获取分钟，除以60取整数，得到整数分钟
      minuteTime = parseInt(secondTime / 60);
      // 获取秒数，秒数取佘，得到整数秒数
      secondTime = parseInt(secondTime % 60);
      // 如果分钟大于60，将分钟转换成小时
      if (minuteTime >= 60) {
        // 获取小时，获取分钟除以60，得到整数小时
        hourTime = parseInt(minuteTime / 60);
        // 获取小时后取佘的分，获取分钟除以60取佘的分
        minuteTime = parseInt(minuteTime % 60);
        if (hourTime >= 24) {
          // 获取天数， 获取小时除以24，得到整数天
          dayTime = parseInt(hourTime / 24);
          // 获取小时后取余小时，获取分钟除以24取余的分；
          hourTime = parseInt(hourTime % 24);
        }
      }
    }
    // if (secondTime > 0) {
    //   secondTime = parseInt(secondTime) >= 10 ? secondTime : "0" + secondTime;
    //   result = "" + secondTime + "秒";
    // }
    if (minuteTime > 0) {
      minuteTime = parseInt(minuteTime) >= 10 ? minuteTime : "0" + minuteTime;
      result = "" + minuteTime + "分" + result;
    }
    if (hourTime > 0) {
      result = "" + parseInt(hourTime) + "小时" + result;
    }
    if (dayTime > 0) {
      result = "" + parseInt(dayTime) + "天" + result;
    }
  }
  return result;
}

/**
 * dase64数据转为文件
 */
export function base64ImgtoFile(dataurl, filename = "file") {
  const arr = dataurl.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const suffix = mime.split("/")[1];
  const bstr = atob(arr[1]);

  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], `${filename}.${suffix}`, {
    type: mime,
  });
}

/**
 *  设置token过期时间
 * @param {Number} hour 小时
 */
export function setTokenExpirationTime({ hour }) {
  const currentTimeStamp = Date.now();
  const addedTimeStamp = currentTimeStamp + hour * 60 * 60 * 1000;

  sessionStorage.setItem("tokenExpirationTime", addedTimeStamp);
}

/**
 * 刷新新用户token
 * 相差10个小时就刷新token
 */
export async function refreshUserToken() {
  // 当前token
  const toekn = sessionStorage.getItem("token");

  // 当前时间
  const currentTime = new Date().getTime();

  // 当前token的时间
  const tokenExpirationTime = Number(
    sessionStorage.getItem("tokenExpirationTime") ?? "0"
  );

  // 当前时间与token的时间差
  const timeDifference = tokenExpirationTime - currentTime;

  // 8个小时
  const tenHoursInMilliseconds = 8 * 60 * 60 * 1000;

  if (!toekn || !tokenExpirationTime || timeDifference > tenHoursInMilliseconds)
    return;

  const { data: resData } = await refreshToken();

  // console.log(111, resData);
  if (!resData.data.status) return;

  // 新token
  sessionStorage.setItem("token", resData.token);
  setTokenExpirationTime({
    hour: 18,
  });
}

/**
 * 去掉HTML标签、去掉空格、去掉-、去掉\n
 * @param str
 */
export function replaceLabel(str = "") {
  // 标签中不能包含标签实现过滤HTML标签
  var reg = /<\/?[^>]+(>|$)/g;
  str = str.replace(reg, ""); // 替换HTML标签
  str = str.replace(/&nbsp;/gi, ""); // 替换HTML空格
  str = str.replace(/\s+/g, ""); // 替换所有空格
  str = str.replace(/\r\n/g, ""); // 替换\r\n
  str = str.replace(/\n/g, ""); // 替换\n
  str = str.replace(/-/g, ""); // 替换-
  str = str.replace(/[\u4e00-\u9fa5]/g, ""); // 过滤掉所有中文
  str = str.toLowerCase(); //转为小写
  return str;
}

/**
 * 判断两个字符串，是否存在包含关系
 * 1. the 开头，"Sympathetic nervous system 交感神经系统"  ==  "the sympathetic nervous system 交感神经系统"
 * 2. 大小写， "Span"  == "span"
 * 3. x单字，"Spleen 脾脏"  == "Spleen 脾"
 */
export function checkContain(strA, strB) {
  const str1 = replaceLabel(strA);
  const str2 = replaceLabel(strB);

  if (str1.includes(str2) || str2.includes(str1)) {
    return true;
  }
  return false;
}
