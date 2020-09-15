// 数组nums包含从0到n的所有整数，但其中缺了一个。请编写代码找出那个缺失的整数。你有办法在O(n)时间内完成吗？

// 注意：本题相对书上原题稍作改动

// 示例 1：
// 输入：[3,0,1]
// 输出：2

// 示例 2：
// 输入：[9,6,4,2,3,5,7,0,1]
// 输出：8

/**
 * @param {number[]} nums
 * @return {number}
 */
// 思路
// 1 求出给的数组的和
// 2 求出没有缺失数组的和
// 3 缺失的数 = 数组的最大的数 - （两个数组之和）的差值
var missingNumber = function (nums) {
  let originSum = ((0 + nums.length) * (nums.length + 1)) / 2;
  let actualSum = 0;
  nums.forEach((i) => (actualSum += i));
  return originSum - actualSum;
};
