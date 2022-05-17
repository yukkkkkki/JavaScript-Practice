/**
 * @param {number[]} nums nums 的所有整数都在范围 [1, n] 内
 * @return {number[]}
 */
// 方法一：使用正负号做标记
// 给 nums[i] 加上「负号」表示数 i + 1 已经出现过一次
// 当遍历到位置 i 时，考虑 nums[nums[i] − 1] 的正负性
//   是正数 -> nums[i] 还没有出现过，nums[nums[i] − 1] 标记负号
//   是负数 -> nums[i] 出现过
var findDuplicates = function (nums) {
  const n = nums.length;
  const result = [];

  for (let i = 0; i < n; i++) {
    const x = Math.abs(nums[i]);
    if (nums[x - 1] > 0) {
      nums[x - 1] = -nums[x - 1];
    } else {
      result.push(x);
    }
  }

  return result;
};
console.log(findDuplicates([4, 3, 2, 7, 8, 2, 3, 1]));
// 时间复杂度： O(n)
// 空间复杂度： O(1)
