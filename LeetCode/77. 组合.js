// 给定两个整数 n 和 k，返回 1 ... n 中所有可能的 k 个数的组合。

// 示例:
// 输入: n = 4, k = 2
// 输出:
// [
//   [2,4],
//   [3,4],
//   [2,3],
//   [1,2],
//   [1,3],
//   [1,4],
// ]

// 方法一：回溯
var combine = function (n, k) {
  if (k == 0) return [[]];
  const res = [];

  const backTrack = (start, tmpPath) => {
    if (tmpPath.length === k) {
      res.push(tmpPath.slice());
      return;
    }

    for (let i = start; i <= n; i++) {
      tmpPath.push(i);
      backTrack(i + 1, tmpPath);
      tmpPath.pop();
    }
  };

  backTrack(1, []);
  // console.log(res)
  return res;
};
