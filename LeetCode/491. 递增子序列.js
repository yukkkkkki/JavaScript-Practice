// 给定一个整型数组, 你的任务是找到所有该数组的递增子序列，递增子序列的长度至少是2。

// 示例:

// 输入: [4, 6, 7, 7]
// 输出: [[4, 6], [4, 7], [4, 6, 7], [4, 6, 7, 7], [6, 7], [6, 7, 7], [7,7], [4,7,7]]

// 方法一：DFS递归回溯
// 递归函数：在从 start 指针开始的子数组中选合适的数推入 path。path 也作为参数。在递归过程中，不断选数字入 path
// 结束递归：start 指针到达边界，没有数字可选了，结束递归
var findSubsequences = function (nums) {
  const n = nums.length;
  const res = [];
  const set = new Set();

  const backTrack = (start, tmpPath) => {
    if (tmpPath.length >= 2) {
      const str = tmpPath.join(','); // 转成字符串，存入set
      // 避免重复的子序列进入res
      if (!set.has(str)) {
        res.push(tmpPath.slice()); // 推入一份拷贝，path还要继续用
        set.add(str);
      }
    }

    for (let i = start; i < n; i++) {
      const prev = tmpPath[tmpPath.length - 1];
      const cur = nums[i];
      if (tmpPath.length == 0 || prev <= cur) {
        tmpPath.push(cur); // 选择当前的数字
        backTrack(i + 1, tmpPath); // 继续往下递归
        tmpPath.pop(); // 撤销选择当前数字，选择别的数字
      }
    }
  };
  backTrack(0, []);
  return res;
};
// 优化：不用额外空间的去重
var findSubsequences = function (nums) {
  const res = [];
  const len = nums.length;

  const dfs = (start, path) => {
    if (start === len) {
      if (path.length >= 2) {
        res.push(path.slice());
        return;
      }
    }
    path.push(nums[start]);
    for (let i = start + 1; i <= len; i++) {
      const prev = nums[start];
      const cur = nums[i];
      if (i < len && cur == prev) {
        dfs(i, path);
        break;
      } else if (i == len || prev < cur) {
        dfs(i, path);
      }
    }
    path.pop();
  };
  for (let i = 0; i < len; i++) {
    dfs(i, []);
  }
  return res;
};
