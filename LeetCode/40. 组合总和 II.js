// 给定一个数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。

// candidates 中的每个数字在每个组合中只能使用一次。

// 说明：
// 所有数字（包括目标数）都是正整数。
// 解集不能包含重复的组合。

// 示例 1:
// 输入: candidates = [10,1,2,7,6,1,5], target = 8,
// 所求解集为:
// [
//   [1, 7],
//   [1, 2, 5],
//   [2, 6],
//   [1, 1, 6]
// ]

// 示例 2:
// 输入: candidates = [2,5,2,1,2], target = 5,
// 所求解集为:
// [
//   [1,2,2],
//   [5]
// ]

// 方法一：回溯
var combinationSum2 = function (candidates, target) {
  const n = candidates.length;
  candidates = candidates.sort((a, b) => a - b);
  const res = [];

  const backTrack = (start, sum, tmpPath) => {
    if (sum === target) {
      // console.log('test:', tmpPath);
      res.push(tmpPath);
      // return;
    }

    for (let i = start; i < n; i++) {
      if (candidates[i] + sum > target) break;
      // 相同数字只允许循环的第一个递归，避免重复
      if (candidates[i] === candidates[i - 1] && i > start) continue;
      tmpPath.push(candidates[i]);
      // console.log('test:', tmpPath);
      backTrack(i + 1, sum + candidates[i], tmpPath.slice());
      tmpPath.pop();
    }
  };

  backTrack(0, 0, []);
  return res;
};

console.log(combinationSum2([10, 1, 2, 7, 6, 1, 5], 8));
