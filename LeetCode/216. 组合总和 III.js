// 找出所有相加之和为 n 的 k 个数的组合。组合中只允许含有 1 - 9 的正整数，并且每种组合中不存在重复的数字。

// 说明：
// 所有数字都是正整数。
// 解集不能包含重复的组合。

// 示例 1:
// 输入: k = 3, n = 7
// 输出: [[1,2,4]]

// 示例 2:
// 输入: k = 3, n = 9
// 输出: [[1,2,6], [1,3,5], [2,3,4]]

// 方法一：回溯
var combinationSum3 = function (k, n) {
  const res = [];

  const backTrack = (tmpPath, start, sum) => {
    if (tmpPath.length === k && sum === 0) {
      res.push(tmpPath);
      return;
    }

    for (let i = start; i <= 9; i++) {
      tmpPath.push(i);
      backTrack(tmpPath.slice(), i + 1, sum - i);
      tmpPath.pop();
    }
  };

  backTrack([], 1, n);
  return res;
};

// console.log(combinationSum3(3, 9));
