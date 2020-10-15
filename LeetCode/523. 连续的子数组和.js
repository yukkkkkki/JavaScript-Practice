// 给定一个包含 非负数 的数组和一个目标 整数 k，编写一个函数来判断该数组是否含有连续的子数组，其大小至少为 2，且总和为 k 的倍数，即总和为 n*k，其中 n 也是一个整数。

// 示例 1：
// 输入：[23,2,4,6,7], k = 6
// 输出：True
// 解释：[2,4] 是一个大小为 2 的子数组，并且和为 6。

// 示例 2：
// 输入：[23,2,6,4,7], k = 6
// 输出：True
// 解释：[23,2,6,4,7]是大小为 5 的子数组，并且和为 42。

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
// 方法一：HashMap
var checkSubarraySum = function (nums, k) {
  const map = new Map();
  map.set(0, -1);
  var prefixSum = 0;
  for (let i = 0; i < nums.length; i++) {
    prefixSum += nums[i];
    if (k !== 0) {
      prefixSum = prefixSum % k;
    }
    if (map.has(prefixSum)) {
      if (i - map.get(prefixSum) > 1) {
        return true;
      }
    } else {
      map.set(prefixSum, i);
    }
  }
  return false;
};
