import { API } from "@utils/http/api";

const IM = "/im";

/**
 * 初始化IM
 * @param {*} frindid 客服用户的id
 */
export async function initIM(frindid) {
  try {
    return await API.post(IM + "/initim", {
      frindid,
    });
  } catch (error) {
    return error;
  }
}

/**
 * 获取聊天好友列表
 */
export async function getImMyFriendList() {
  try {
    return await API.get(IM + "/getmyfriend");
  } catch (error) {
    return error;
  }
}

/**
 * 判断当前用户是否可以加入所有人群聊
 */
export async function getUserAllChatStatus() {
  try {
    return await API.get(IM + "/getusergroupallvlidate");
  } catch (error) {
    return error;
  }
}

/**
 * 获取和某个好友的聊天记录
 */
export async function getFriendimMsg(
  pages = {
    pagesize: 10,
    pageindex: 1,
  },
  frindid
) {
  try {
    return await API.get(IM + "/getfriendimmsg", {
      params: { ...pages, frindid },
    });
  } catch (error) {
    return error;
  }
}

/**
 * 发送消息给某个好友
 * @param {*} frindid 客服用户的id
 */
export async function sendMsg(params) {
  try {
    return await API.post(IM + "/sendmsg", params);
  } catch (error) {
    return error;
  }
}
