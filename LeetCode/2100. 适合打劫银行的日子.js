/**
 * @param {number[]} security
 * @param {number} time
 * @return {number[]}
 */
// 方法一：动态规划
// 第 i 天适合打劫需满足：第 i 天前连续 time 天警卫数目都是非递增与第 i 天后连续 time 天警卫数目都是非递减
// 只需要预先计算出第 i 天前警卫数目连续非递增的天数，以及第 i 天后警卫数目连续非递减的天数即可判断第 i 天是否适合打劫
// 设第 i 天前警卫数目连续非递增的天数为 left_i，第 i 天后警卫数目连续非递减的天数为 right_i，
// 当第 i 天同时满足 left_i >= time，right >= time，即可认定第 i 天适合打劫
var goodDaysToRobBank = function (security, time) {
  const n = security.length;
  const left = new Array(n).fill(0);
  const right = new Array(n).fill(0);

  for (let i = 1; i < n; i++) {
    if (security[i] <= security[i - 1]) {
      left[i] = left[i - 1] + 1;
    }
    if (security[n - i - 1] <= security[n - i]) {
      right[n - i - 1] = right[n - i] + 1;
    }
  }

  const res = [];
  for (let i = time; i < n - time; i++) {
    if (left[i] >= time && right[i] >= time) {
      res.push(i);
    }
  }
  return res;
};
