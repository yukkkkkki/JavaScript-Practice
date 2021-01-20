// 给定一个整型数组，在数组中找出由三个数组成的最大乘积，并输出这个乘积。

// 示例 1:
// 输入: [1,2,3]
// 输出: 6

// 示例 2:
// 输入: [1,2,3,4]
// 输出: 24

// 注意:
// 给定的整型数组长度范围是[3,104]，数组中所有的元素范围是[-1000, 1000]。
// 输入的数组中任意三个数的乘积不会超出32位有符号整数的范围。
/**
 * @param {number[]} nums
 * @return {number}
 */
// 方法一：排序
// 在给数组排序后，分别求出三个最大正数的乘积，以及两个最小负数与最大正数的乘积，二者之间的最大值即为所求答案
var maximumProduct = function (nums) {
  nums.sort((a, b) => a - b);
  const n = nums.length;
  return Math.max(
    nums[0] * nums[1] * nums[n - 1],
    nums[n - 1] * nums[n - 2] * nums[n - 3]
  );
};
// 时间复杂度：O(Nlog N)；空间复杂度：O(log N)

// 方法二：线性扫描
var maximumProduct = function (nums) {
  // 最小的和第二小的
  let min1 = Number.MAX_SAFE_INTEGER,
    min2 = Number.MAX_SAFE_INTEGER;
  // 最大的、第二大的和第三大的
  let max1 = -Number.MAX_SAFE_INTEGER,
    max2 = -Number.MAX_SAFE_INTEGER,
    max3 = -Number.MAX_SAFE_INTEGER;

  for (const x of nums) {
    if (x < min1) {
      min2 = min1;
      min1 = x;
    } else if (x < min2) {
      min2 = x;
    }

    if (x > max1) {
      max3 = max2;
      max2 = max1;
      max1 = x;
    } else if (x > max2) {
      max3 = max2;
      max2 = x;
    } else if (x > max3) {
      max3 = x;
    }
  }

  return Math.max(min1 * min2 * max1, max1 * max2 * max3);
};
// 时间复杂度：O(N)；空间复杂度：O(1)
