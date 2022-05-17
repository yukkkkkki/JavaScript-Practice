/**
 * @param {number[]} nums
 * @param {number} maxOperations
 * @return {number}
 */
// 方法一：二分查找
var minimumSize = function (nums, maxOperations) {
  let l = 0;
  let r = 0;
  // 计算二分查找上边界 r
  for (let n of nums) {
    r = Math.max(n, r);
  }
  // 注意二分边界条件
  while (l + 1 < r) {
    let mid = Math.floor(l + (r - l) / 2);
    let tmp = 0;
    for (let n of nums) {
      tmp += Math.floor((n - 1) / mid);
    }
    if (tmp <= maxOperations) {
      // 当前没有用完操作次数，说明还可以进一步降低最终的最小取值，向下调整上边
      r = mid;
    } else {
      // 当前用完了操作次数，说明当前最小取值无法满足条件，向上调整下边界
      l = mid;
    }
  }
  return r;
};
