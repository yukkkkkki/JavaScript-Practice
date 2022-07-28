/**
 * @param {number[]} nums
 * @return {number}
 */
// 方法一：哈希表
var longestConsecutive = function (nums) {
  const set = new Set();
  for (const num of nums) {
    set.add(num);
  }

  let res = 0;

  for (const num of set) {
    if (!set.has(num - 1)) {
      let currNum = num;
      let currStreak = 1;

      while (set.has(currNum + 1)) {
        currNum += 1;
        currStreak += 1;
      }

      res = Math.max(res, currStreak);
    }
  }

  return res;
};
// 时间复杂度：O(n)
// 空间复杂度：O(n)
