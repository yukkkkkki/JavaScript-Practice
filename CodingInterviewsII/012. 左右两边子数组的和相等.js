/**
 * @param {number[]} nums
 * @return {number}
 */
// 方法一：前缀和
var pivotIndex = function (nums) {
  // 数组的全部元素之和
  const total = nums.reduce((prev, curr) => prev + curr, 0);
  let sum = 0;

  for (let i = 0; i < nums.length; i++) {
    // 遍历到第 i 个元素时，其左侧元素之和为 sum
    // 其右侧元素之和为：total - nums[i] - sum
    // 若左侧 === 右侧，则：
    if (2 * sum + nums[i] === total) {
      return i;
    }

    sum += nums[i];
  }

  return -1;
};
// 时间复杂度：O(n)
// 空间复杂度：O(1)
