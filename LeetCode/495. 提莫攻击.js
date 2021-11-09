/**
 * @param {number[]} timeSeries
 * @param {number} duration
 * @return {number}
 */
// 方法一：单次扫描
var findPoisonedDuration = function (timeSeries, duration) {
  let res = 0;
  let expired = 0; // 未中毒的起始时间
  for (let i = 0; i < timeSeries.length; i++) {
    if (timeSeries[i] >= expired) {
      // 若处于未中毒状态
      res += duration;
    } else {
      // 若处于中毒状态
      res += timeSeries[i] + duration - expired;
    }
    // 更新本次中毒结束时间expired
    expired = timeSeries[i] + duration;
  }
  return res;
};

// 时间复杂度：o(n)
// 空间复杂度：o(1)
