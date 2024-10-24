import { API } from "@utils/http/api";

// 匿名token（临时的）
const ANONYMITY_TOKEN = sessionStorage.getItem("anonymityToken");

/**
 * 匿名登录
 */
export async function anonymityLogin() {
  try {
    return await API.post("/userloginnm");
  } catch (error) {
    return error;
  }
}

/**
 * 游客登录
 */
export async function creatYoukeMember() {
  try {
    return await API.post(
      "/creatyoukemember",
      {},
      {
        headers: {
          token: ANONYMITY_TOKEN,
        },
      }
    );
  } catch (error) {
    return error;
  }
}

/**
 * 游客给客服发送消息
 */
export async function sendYoukeMsg(params) {
  try {
    return await API.post("/sendyoukemsg", params, {
      headers: {
        token: ANONYMITY_TOKEN,
      },
    });
  } catch (error) {
    return error;
  }
}

/**
 * 游客获取自己的聊天消息
 */
export async function getYoukeMsg(params) {
  try {
    return await API.get(
      "/getyoukemsg",
      {
        params,
      },
      {
        headers: {
          token: ANONYMITY_TOKEN,
        },
      }
    );
  } catch (error) {
    return error;
  }
}

/**
 * 游客标记消息为已读
 */
export async function readYoukeMsg() {
  try {
    return await API.post(
      "/readyoukemsg",
      {},
      {
        headers: {
          token: ANONYMITY_TOKEN,
        },
      }
    );
  } catch (error) {
    return error;
  }
}
