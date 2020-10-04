// 给定一个未排序的数组，判断这个数组中是否存在长度为 3 的递增子序列。

// 数学表达式如下:

// 如果存在这样的 i, j, k,  且满足 0 ≤ i < j < k ≤ n-1，
// 使得 arr[i] < arr[j] < arr[k] ，返回 true ; 否则返回 false 。
// 说明: 要求算法的时间复杂度为 O(n)，空间复杂度为 O(1) 。

// 示例 1:
// 输入: [1,2,3,4,5]
// 输出: true

// 示例 2:
// 输入: [5,4,3,2,1]
// 输出: false

/**
 * @param {number[]} nums
 * @return {boolean}
 */

// 方法一：动态规划
var increasingTriplet = function (nums) {
  let longest = [],
    count;
  for (let i = 0; i < nums.length; i++) {
    count = 1;
    for (let j = 0; j < longest.length; j++) {
      if (nums[i] > nums[j] && count <= longest[j]) {
        count = longest[j] + 1;
      }
    }
    longest.push(count);
    if (count >= 3) return true;
  }
  return false;
};

// console.log(increasingTriplet([1, 2, 3, 4, 5]));
