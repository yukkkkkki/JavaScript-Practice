// 示例：
// 输入：target = 7, nums = [2,3,1,2,4,3]
// 输出：2
// 解释：子数组 [4,3] 是该条件下的长度最小的子数组。

/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
// 方法一：滑动窗口
// 定义两个指针 start 和 end 分别表示子数组（滑动窗口）的开始位置和结束位置
// 维护变量 sum 存储子数组中的元素和
var minSubArrayLen = function (target, nums) {
  const n = nums.length;
  if (n === 0) return 0;

  let res = Number.MAX_VALUE;
  let start = 0;
  let end = 0;
  let sum = 0;
  while (end < n) {
    sum += nums[end];
    while (sum >= target) {
      // 收缩窗口
      res = Math.min(res, end - start + 1);
      // 减掉 nums[start]
      sum -= nums[start];
      start++;
    }
    end++;
  }
  return res === Number.MAX_VALUE ? 0 : res;
};
// 时间复杂度：O(n)
// 空间复杂度：O(1)
