/**
 * @param {string} str
 * @return {number}
 */
// 方法一：正则匹配
// 第一步，使用正则提取满足条件的字符， /^(-|\+)?\d+/g ， (-|\+)? 表示第一位是-或+或都不是， \d+ 表示匹配多个数字
// 第二步，判断目标是否超过 Int 整形最大值或最小值
var strToInt = function (str) {
  const result = str.trim().match(/^(-|\+)?\d+/g);
  return result
    ? Math.max(
        Math.min(Number(result[0]), Math.pow(2, 31) - 1),
        -Math.pow(2, 31)
      )
    : 0;
};

// 正则匹配方法2
var strToInt = function (str) {
  const result = str.trim().match(/^(-|\+)?\d+/g);
  if (result >= Math.pow(2, 31)) {
    return Math.pow(2, 31) - 1;
  } else if (result <= Math.pow(-2, 31)) {
    return Math.pow(-2, 31);
  } else {
    return result;
  }
};

// 方法二：逐个判断
// 1.去除字符串之中的空格
// 2.通过执行 parseInt 判断是否为数字，不是数字返回 0 ，是数组继续解析
// 3.判断目标是否超过 Int 整形最大值或最小值
var strToInt = function (str) {
  const news = str.trim();
  if (parseInt(news)) {
    return returnNum(parseInt(news));
  } else {
    return 0;
  }
};

const returnNum = (num) => {
  if (num >= -Math.pow(2, 31) && num <= Math.pow(2, 31) - 1) {
    return num;
  } else {
    return num > 0 ? Math.pow(2, 31) - 1 : -Math.pow(2, 31);
  }
};

// 方法三
var strToInt = function (str) {
  str = str.trim();
  let res = parseInt(str);
  if (isNaN(res)) return 0;
  let minValue = Math.pow(-2, 31);
  let maxValue = Math.pow(2, 31) - 1;
  if (res < minValue) return minValue;
  if (res > maxValue) return maxValue;
  return res;
};
