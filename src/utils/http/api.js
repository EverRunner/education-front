/**
 * axios 封装
 */
import axios from "axios";
import { API_ROOT, REQUEST_TIMEOUT } from "../../config";
import router from "../../router";
import { Message, MessageBox, Loading } from "element-ui";
import { refreshUserToken } from "@utils/tools";
let loadingInstance;

// axios.defaults.headers.post["Content-Type"] =
//   "application/x-www-form-urlencoded";
//实例axios
export const API = axios.create({
  baseURL: API_ROOT,
  timeout: REQUEST_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
  // transformRequest: [
  //   function(data, config) {
  //     return Qs.stringify(data);
  //   }
  // ]
});

/**
 * 添加请求拦截器
 */
API.interceptors.request.use(
  function(config) {
    if (config.headers.isLoading) loadingInstance = Loading.service();

    if (sessionStorage.getItem("token"))
      config.headers.token = sessionStorage.getItem("token");

    return config;
  },
  function(error) {
    // 对请求错误做些什么
    Message.error("请求错误，请稍后重试！");
    return Promise.reject(error);
  }
);

/**
 * 添加响应拦截器
 */
API.interceptors.response.use(
  function(response) {
    if (loadingInstance) {
      loadingInstance.close();
      loadingInstance = null;
    }

    switch (response.data.code) {
      case 200:
        // 刷新token，还有问题 未完成
        // if (
        //   router?.history?.current?.name != "REGISTERED" &&
        //   router?.history?.current?.name != "LOGIN" &&
        //   router?.history?.current?.name != "HOME_INDEX" &&
        //   router?.history?.current?.name != "ARTICLE_DETAILS"
        // ) {
        //   refreshUserToken();
        // }

        if (response.config.responseType === "blob") {
          return handleResponse(response);
        } else if (response.data.data.status) {
          return response;
        } else {
          if (response.data.data.err)
            messageError(response.config.method, response.data.data.err);
          return response;
        }

      case 401:
        messageError(response.config.method, "未登录!");
        break;

      case 500:
        messageError(response.config.method, "网络错误，请刷新页面重试!");
        break;

      default:
        messageError(response.config.method, "网络错误，请刷新页面！");
    }
  },

  function(error) {
    if (loadingInstance) {
      loadingInstance.close();
      loadingInstance = null;
    }

    // 对响应错误做点什么
    if (error.message.includes("timeout")) {
      // 判断请求异常信息中是否含有超时timeout字符串
      Message.error("网络超时，请重试！");
    }

    //登录过期
    if (error.response.status == 401) {
      sessionStorage.clear();
      router.replace({
        name: "LOGIN",
        params: {
          past: 1,
        },
      });
    } else {
      // Message.error("网络不佳，请重试！");
    }

    return Promise.reject(error);
  }
);

/**
 * 处理响应的二进字数据
 * @param {*} response
 */
function handleResponse(response) {
  if (response.config.responseType === "blob") {
    const responseBody = response.data;
    const fileName = "comico_" + new Date().getTime() + ".xlsx";
    try {
      const blob = new Blob([responseBody]);
      if ("download" in document.createElement("a")) {
        // 非IE下载
        const elink = document.createElement("a");
        elink.download = fileName;
        elink.style.display = "none";
        elink.href = URL.createObjectURL(blob); //创建下载
        document.body.appendChild(elink);
        elink.click();
        URL.revokeObjectURL(elink.href); // 释放URL 对象
        document.body.removeChild(elink);
      } else {
        // IE10+下载
        navigator.msSaveBlob(blob, fileName);
      }
    } catch (e) {}
  }
}

/**
 * 错误消息提示
 * @param {string} reqType 请求类型
 * @param {string} msg 提示内容
 */
function messageError(reqType, msg = "网络超时，请重试！") {
  if (reqType === "get") Message.error(msg);

  if (reqType === "post")
    MessageBox.confirm(msg, "提示", {
      customClass: "el-message-box--big",
      confirmButtonText: "再试试",
      showCancelButton: false,
      type: "error",
    });
}
