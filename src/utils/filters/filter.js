import { formatDateTime, formatImg, formatCurrency, toChinesNum } from "@utils/tools";

/**
 * 图片地址格式化
 * @param {*} rawImg 图片地址
 */
export const formatImage = (rawImg) => {
    return formatImg(rawImg);
};

/**
 * 日期时间过滤
 * @param {*} dateTime 日期时间
 * @param {*} forma  格式
 * @returns {string}
 */
export const formatDate = (dateTime, format) => {
    return formatDateTime(dateTime, format);
};

/**
 * 格式化货币，保留2位小数
 * @param num 数值(Number或者String)
 * @return 金额格式的字符串,如'1,234,567.45'
 * @type String
 */
export const formatMoney = (dateTime, format) => {
    return formatCurrency(dateTime, format);
};


/**
 * 阿拉伯数字转化为中文数字
 * @param {number} num 
 */
export const chinesNum = (num) => {
    return toChinesNum(num);
};