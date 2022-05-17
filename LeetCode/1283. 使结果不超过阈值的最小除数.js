/**
 * @param {number[]} nums
 * @param {number} threshold
 * @return {number}
 */
// 方法一：二分查找
var smallestDivisor = function (nums, threshold) {
  let l = 1;
  let r = Math.max(...nums);

  function getRes(d) {
    let res = 0;
    for (let i of nums) {
      res += Math.ceil(i / d);
    }
    return res;
  }

  while (l < r) {
    let mid = Math.floor((l + r) / 2);
    if (getRes(mid) <= threshold) {
      r = mid;
    } else {
      l = mid + 1;
    }
  }

  return l;
};
