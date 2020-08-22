// 给定一个数组 nums 和滑动窗口的大小 k，请找出所有滑动窗口里的最大值。
//
// 示例:
// 输入: nums = [1,3,-1,-3,5,3,6,7], 和 k = 3
// 输出: [3,3,5,5,6,7]
// 解释:
//   滑动窗口的位置                最大值
// ---------------               -----
//   [1  3  -1] -3  5  3  6  7       3
// 1 [3  -1  -3] 5  3  6  7       3
// 1  3 [-1  -3  5] 3  6  7       5
// 1  3  -1 [-3  5  3] 6  7       5
// 1  3  -1  -3 [5  3  6] 7       6
// 1  3  -1  -3  5 [3  6  7]      7

// 方法一：暴力求解
var maxSlidingWindow = function(nums, k) {
  let res = [];
  if(nums == [] || k == 0) return res
  for(let i = 0; i <= nums.length - k ; i++){
    let j = i + k;
    res.push(Math.max(...nums.slice(i, j)));
  }
  return res;
};

//方法二：动态规划
// 将数组分成大小相等的块，每个块都可以理解为有两个数组 left 和 right。left 方向从左到右，right 相反。
// left[i]是指块从开始到下标 i 的最大元素，right[j]是指块从开始到下标 j 的最大元素。
// 假设滑动窗口的范围是[i, j]，很容易看出来，滑动窗口中的最大值就是 max(right[i], left[j])。
var maxSlidingWindow = function(nums, k) {
  if(k === 1) return nums;
  const length = nums.length;
  if(!length) return [];

  const left = new Array(length);
  const right = new Array(length);

  left[0] = nums[0];
  right[length - 1] = nums[length - 1];
  for(let i = 1; i < length; i++) {
    if(i % k) {
      left[i] = Math.max(nums[i], left[i - 1]);
    } else {
      left[i] = nums[i];
    }

    let j = length - i - 1;
    if((j + 1) % k) {
      right[j] = Math.max(nums[j], right[j + 1]);
    } else {
      right[j] = nums[j];
    }
  }

  const res = [];
  for(let i = 0; i < length - k + 1; i++){
    res.push(Math.max(right[i], left[i + k - 1]));
  }
  return res;
}

// 方法三：单调栈方法
// 保留一个栈内数字按从大到小排列，如果当前出窗口的是最大值，移出最大值。
// 如果当前数比栈顶数大，依次移出栈顶数据。保留单调栈
var maxSlidingWindow = function(nums, k){
  if(k <= 1) return nums;
  const length = nums.length;
  if(!length) return [];
  let task = [];
  let res = [];

  // 未形成窗口时
  for(let i = 0; i < k; i++){
    while (task.length && task[task.length - 1] < nums[i]){
      task.pop();
    }
    task.push(nums[i]);
  }

  res[0] = task[0];
  for(let i = k; i < nums.length; i++){
    // 当前最大值被出窗口后，判断是否是最大值，是的话移除
    if(task[0] == nums[i - k]) task.shift();
    // 当前数对比栈内数据，小的移出栈，保留单调栈
    while (task.length && task[task.length - 1] < nums[i]){
      task.pop();
    }
    task.push(nums[i]);
    res[i - k + 1] = task[0];
  }
  return res;
}