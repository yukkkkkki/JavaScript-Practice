/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
// 方法一：降序排序 + 穿插插入
var wiggleSort = function (nums) {
  let copyNums = nums.slice();
  copyNums.sort((a, b) => b - a);
  let n = 0;
  for (let i = 1; i < nums.length; i += 2) {
    // 依次把排序好的大的数放在奇数位
    nums[i] = copyNums[n++];
  }
  for (let i = 0; i < nums.length; i += 2) {
    // 依次把排序好的小的数放在偶数位
    nums[i] = copyNums[n++];
  }
};
