import { API } from "@utils/http/api";

/**
 * 文件上传
 * @param {*} params
 */
export async function uploadFile(file) {
  try {
    const formData = new FormData();
    formData.append("file", file, file.name);

    return await API.post("/uploadhandler/image", formData, {
      transformRequest: [
        function(data) {
          return data;
        },
      ],
    });
  } catch (error) {
    return error;
  }
}

/**
 * 访问记录-进入
 * @param {*} params
 */
export async function entryPageMember(params) {
  try {
    return await API.post("/global/creatmemberviewenntry", params);
  } catch (error) {
    return error;
  }
}

/**
 * 访问记录-进出
 * @param {*} params
 */
export async function exitPageMember(params) {
  try {
    return await API.post("/global/creatmemberviewend", params);
  } catch (error) {
    return error;
  }
}

/**
 * 增加学习总时长
 * @param {*} limit  增加的时长描述，可以不传，默认为10（秒）
 */
export async function addStudyTime(limit = 10) {
  try {
    return await API.post("/user/addallstudytime", { limit });
  } catch (error) {
    return error;
  }
}

/**
 * 创建或者修改复习状态
 * @param {object} limit  params
 */
export async function reviewCourse(params) {
  try {
    return await API.post("/course/reviewcourse", params);
  } catch (error) {
    return error;
  }
}

/**
 * 统计（付费、考过、用时）
 */
export async function getStatisNormal() {
  try {
    return await API.get("/global/getstaticsnormal");
  } catch (error) {
    return error;
  }
}

/**
 * 更新当前用户学习关键词的日期
 */
export async function updateWordTime() {
  try {
    return await API.post("/user/updatestudyworddate");
  } catch (error) {
    return error;
  }
}

/**
 *  获取用户信息
 */
export async function getUserInfo() {
  try {
    return await API.get("/user/getloginuserinfo");
  } catch (error) {
    return error;
  }
}

/**
 *  获取微信公众号JS-SDK配置信息
 */
export async function getJssdkConfig() {
  try {
    return await API.get("/user/getjssdkparams");
  } catch (error) {
    return error;
  }
}

/**
 * 刷新toke
 */
export async function refreshToken() {
  try {
    return await API.post("/user/refreshtoken");
  } catch (error) {
    return error;
  }
}
