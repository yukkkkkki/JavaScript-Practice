/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
// 方法一：单调栈方法
// 保留一个栈内数字按从大到小排列，如果当前出窗口的是最大值，移出最大值。
// 如果当前数比栈顶数大，依次移出栈顶数据。保留单调栈
var maxSlidingWindow = function (nums, k) {
  if (k <= 1) return nums;
  if (!nums.length) return [];
  const n = nums.length;

  let task = [];
  let res = [];

  // 未形成窗口时
  for (let i = 0; i < k; i++) {
    while (task.length && task[task.length - 1] < nums[i]) {
      task.pop();
    }
    task.push(nums[i]);
  }

  res[0] = task[0];
  for (let i = k; i < nums.length; i++) {
    // 当前最大值被出窗口后，判断是否是最大值，是的话移除
    if (task[0] == nums[i - k]) {
      task.shift();
    }

    // 当前数对比栈内数据，小的移出栈，保留单调栈
    while (task.length && task[task.length - 1] < nums[i]) {
      task.pop();
    }

    task.push(nums[i]);
    res[i - k + 1] = task[0];
  }

  return res;
};

// 方法二：单调队列
var maxSlidingWindow = function (nums, k) {
  const n = nums.length;
  
};
// 时间复杂度：O(n)
// 空间复杂度：O(k)
