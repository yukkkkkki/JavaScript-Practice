// 给你一个整数数组 nums，请你返回其中位数为 偶数 的数字的个数。

// 示例 1：
// 输入：nums = [12,345,2,6,7896]
// 输出：2
// 解释：
// 12 是 2 位数字（位数为偶数）
// 345 是 3 位数字（位数为奇数）
// 2 是 1 位数字（位数为奇数）
// 6 是 1 位数字 位数为奇数）
// 7896 是 4 位数字（位数为偶数）
// 因此只有 12 和 7896 是位数为偶数的数字

// 示例 2：
// 输入：nums = [555,901,482,1771]
// 输出：1
// 解释：
// 只有 1771 是位数为偶数的数字。

/**
 * @param {number[]} nums
 * @return {number}
 */
// 方法一：枚举 + 字符串
var findNumbers = function (nums) {
  let ans = 0;
  for (let item of nums) {
    // console.log(item);
    if (item.toString().length % 2 == 0) {
      ans++;
    }
  }
  return ans;
};

console.log(findNumbers([12, 345, 2, 6, 7896]));
