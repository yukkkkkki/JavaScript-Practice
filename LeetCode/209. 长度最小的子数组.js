// 给定一个含有 n 个正整数的数组和一个正整数 s ，找出该数组中满足其和 ≥ s 的长度最小的连续子数组，并返回其长度。如果不存在符合条件的连续子数组，返回 0。

// 示例:
// 输入: s = 7, nums = [2,3,1,2,4,3]
// 输出: 2
// 解释: 子数组 [4,3] 是该条件下的长度最小的连续子数组。

// 方法一 暴力法
// 使用两个for循环
// 一个for循环固定一个数字，比如m，另一个for循环从m的下一个元素开始累加
// 当和大于等于s的时候终止内层循环，顺便记录下最小长度
var minSubArrayLen = function (s, nums) {
  let minLen = Infinity;
  for (let i = 0; i < nums.length; i++) {
    let sum = 0;
    for (let j = i; j < nums.length; j++) {
      sum += nums[j];
      if (sum >= s) {
        minLen = Math.min(minLen, j - i + 1);
        break;
      }
    }
  }
  return minLen === Infinity ? 0 : minLen;
};

// 方法二：滑动窗口 双指针
// 思路：
// 连续子数组可以表示为 [i,j]：从第 i 项到第 j 项
// 如果窗口的 sum >= s ，如果扩张窗口，条件依然满足，但更背离“最小长度”的要求
//     所以选择收缩窗口，i 右移，直到条件不再满足，所以这里是一个循环
//     在循环中，将窗口长度和全局的最小比较
// 如果窗口不再 sum >= s ，此时应该扩张窗口，直到条件重新满足
var minSubArrayLen = function (s, nums) {
  let minLen = Infinity;
  let i = 0;
  let j = 0;
  let sum = 0;

  while (j < nums.length) {
    sum += nums[j];
    while (sum >= s) {
      minLen = Math.min(minLen, j - i + 1);
      sum -= nums[i];
      i++;
    }
    j++;
  }

  return minLen === Infinity ? 0 : minLen;
};
// 时间复杂度：O(n)  空间复杂度：O(1)

var minSubArrayLen = function (s, nums) {
  let res = Infinity;
  let sum = 0;
  for (let i = 0, j = 0; i < nums.length; i++) {
    sum += nums[i];
    while (sum >= s) {
      res = Math.min(ans, i - j + 1);
      sum -= nums[j++];
    }
  }
  return res === Infinity ? 0 : res;
};
