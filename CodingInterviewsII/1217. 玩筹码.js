/**
 * @param {number[]} position
 * @return {number}
 */
// 方法一：贪心
var minCostToMoveChips = function (position) {
  let even = 0;
  let odd = 0;
  for (const pos of position) {
    // pos 为奇数
    if ((pos & 1) !== 0) {
      odd++;
    } else {
      even++;
    }
  }
  return Math.min(odd, even);
};
// 时间复杂度：O(n)
// 空间复杂度：O(1)
