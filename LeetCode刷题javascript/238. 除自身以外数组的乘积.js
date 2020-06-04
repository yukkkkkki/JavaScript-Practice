// 给你一个长度为 n 的整数数组 nums， 其中 n > 1， 返回输出数组 output， 其中 output[i] 等于 nums 中除 nums[i] 之外其余各元素的乘积。

// 示例:
// 输入: [1, 2, 3, 4]
// 输出: [24, 12, 8, 6]

// 前缀积 * 后缀积
var productExceptSelf = function (nums) {
  const n = nums.length;
  const res = [];
  res[0] = 1;

  // 左缀积
  for (let i = 1; i < n; i++) {
    res[i] = res[i - 1] * nums[i - 1];
  }
  // console.log(res)

  // 右缀积
  let right = 1;
  for (let i = n - 1; i >= 0; i--) {
    res[i] *= right; // 左边积 乘上 右边积
    right *= nums[i]; // 更新右边积
  }
  return res;
};