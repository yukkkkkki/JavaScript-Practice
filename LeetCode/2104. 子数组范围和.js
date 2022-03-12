/**
 * @param {number[]} nums
 * @return {number}
 */
// 方法一：遍历子数组
// 首先枚举子数组的左边界 i，然后枚举子数组的右边界 j，且 i ≤ j
// 在枚举 j 的过程中可以迭代地计算子数组 [i,j] 的最小值 minVal 与最大值 maxVal
// 然后将范围值 maxVal−minVal 加到总范围和
var subArrayRanges = function (nums) {
  const n = nums.length;
  let res = 0;
  for (let i = 0; i < n; i++) {
    let minVal = Number.MAX_VALUE;
    let maxVal = -Number.MAX_VALUE;
    for (let j = i; j < n; j++) {
      minVal = Math.min(minVal, nums[i]);
      maxVal = Math.max(maxVal, nums[j]);
      res += maxVal - minVal;
    }
  }
  return res;
};
// 时间复杂度：O(n^2)
// 空调复杂度：O(1)
