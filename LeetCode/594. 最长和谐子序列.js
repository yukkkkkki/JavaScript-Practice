/**
 * @param {number[]} nums
 * @return {number}
 */
// 方法一：枚举
var findLHS = function (nums) {
  nums.sort((a, b) => a - b);
  let begin = 0;
  let result = 0;
  for (let end = 0; end < nums.length; end++) {
    while (nums[end] - nums[begin] > 1) {
      begin++;
    }
    if (nums[end] - nums[begin] === 1) {
      res = Math.max(result, end - begin + 1);
    }
  }
  return result;
};
// 时间复杂度：O(NlogN)
// 空间复杂度：O(1)

// 方法二：哈希表
var findLHS = function (nums) {
  const map = new Map();
  let result = 0;

  for (const num of nums) {
    map.set(num, (map.get(num) || 0) + 1);
  }

  for (const key of map.keys()) {
    if (map.has(key + 1)) {
      result = Math.max(result, map.get(key) + map.get(key + 1));
    }
  }
  return res;
};
// 时间复杂度：O(n)
// 空间复杂度：O(n)
