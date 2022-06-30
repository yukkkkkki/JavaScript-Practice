/**
 * @param {number[]} nums
 * @return {number}
 */
// 方法一：哈希表
var singleNumber = function (nums) {
  const map = new Map();
  for (const num of nums) {
    map.set(num, (map.get(num) || 0) + 1);
  }

  let res = 0;
  for (const [num, occ] of map.entries()) {
    if (occ === 1) {
      res = num;
      break;
    }
  }

  return res;
};
// 时间复杂度：O(n)
// 空间复杂度：O(n)
