/**
 * @param {number[]} nums
 * @return {number}
 */
// 方法一：二分查找
var specialArray = function (nums) {
  // 先递减排序
  nums.sort((a, b) => b - a);

  let left = 1;
  let right = nums.length;

  while (left <= right) {
    let x = Math.floor((left + right) / 2);
    // 判断二分的 mid 是否符合条件，即前 x 个大于等于 x，第 x + 1 个小于 x
    if (nums[x - 1] >= x) {
      // 前 x 个 >= x, 第 x + 1 个 < x
      if (x === nums.length || nums[x] < x) {
        return x;
      } else {
        // >= x 的个数超过 x , 则往大了找 x，更新 left
        left = x + 1;
      }
    } else {
      // >= x 的个数小于 x , 则往小了找 x，更新 right
      right = x - 1;
    }
  }
  return -1;
};
