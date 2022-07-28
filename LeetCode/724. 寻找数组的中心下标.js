/**
 * @param {number[]} nums
 * @return {number}
 */
// 方法一：前缀和
var pivotIndex = function (nums) {
  const total = nums.reduce((a, b) => a + b);

  let sum = 0;
  for (let i = 0; i < nums.length; i++) {
    if (2 * sum + nums[i] === total) {
      return i;
    }
    sum += nums[i];
  }

  return -1;
};
// 时间复杂度：O(n)，其中 n 为数组的长度。
// 空间复杂度：O(1)
