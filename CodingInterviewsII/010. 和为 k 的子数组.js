/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
// 方法一：枚举
var subarraySum = function (nums, k) {
  let count = 0;
  for (let start = 0; start < nums.length; start++) {
    let sum = 0;
    for (let end = start; end >= 0; --end) {
      sum += nums[end];
      if (sum === k) count++;
    }
  }
  return count;
};
// 时间复杂度：O(n^2)
// 空间复杂度：O(1)

// 方法二：前缀和 + 哈希表优化
var subarraySum = function (nums, k) {
  const map = new Map();
  map.set(0, 1);
  let count = 0;
  let pre = 0;

  for (const num of nums) {
    pre += num;
    // 「[j..i] 这个子数组和为 k 」这个条件我们可以转化为 pre[i] - pre[j - 1] === k
    // 故 pre[j - 1] == pre[i] - k
    if (map.has(pre - k)) {
      count += map.get(pre - k);
    }

    map.set(pre, (map.get(pre) || 0) + 1);
  }

  return count;
};
// 时间复杂度：O(n)
// 空间复杂度：O(n)
