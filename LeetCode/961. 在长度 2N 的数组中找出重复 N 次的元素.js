/**
 * @param {number[]} nums
 * @return {number}
 */
// 方法一：哈希表
// 对数组进行一次遍历，并使用哈希集合存储已经出现过的元素。如果遍历到了哈希集合中的元素，那么返回该元素作为答案
var repeatedNTimes = function (nums) {
  const found = new Set();
  for (const num of nums) {
    if (found.has(num)) {
      return num;
    }
    found.add(num);
  }
  return -1;
};
// 时间复杂度：O(n)
// 空间复杂度：O(n)
