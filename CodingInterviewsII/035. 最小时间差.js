/**
 * @param {string[]} timePoints
 * @return {number}
 */
// 方法一：排序
// 排序后遍历一遍 timePoints 即可得到最小时间差
var findMinDifference = function (timePoints) {
  timePoints.sort();

  let res = Number.MAX_VALUE;
  let t0Minutes = getMinutes(timePoints[0]);
  let preMinutes = t0Minutes;

  for (let i = 1; i < timePoints.length; i++) {
    const minutes = getMinutes(timePoints[i]);
    // 相邻时间的时间差
    res = Math.min(res, minutes - preMinutes);
    preMinutes = minutes;
  }
  // 首尾时间的时间差
  res = Math.min(res, t0Minutes + 1440 - preMinutes);
  return res;
};

const getMinutes = (t) => {
  return (
    ((t[0].charCodeAt() - '0'.charCodeAt()) * 10 +
      (t[1].charCodeAt() - '0'.charCodeAt())) *
      60 +
    (t[3].charCodeAt() - '0'.charCodeAt()) * 10 +
    (t[4].charCodeAt() - '0'.charCodeAt())
  );
};
// 时间复杂度：O(nlogn)
// 空间复杂度：O(n)
