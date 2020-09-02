// 无重复字符串的排列组合。编写一种方法，计算某字符串的所有排列组合，字符串每个字符均不相同。

// 示例1:
//  输入：S = "qwe"
//  输出：["qwe", "qew", "wqe", "weq", "ewq", "eqw"]

// 示例2:
//  输入：S = "ab"
//  输出：["ab", "ba"]

// 方法一：回溯
var permutation = function (S) {
  const n = S.length;
  let res = [];
  let tmpPath = '';

  const backTrack = (tmpPath) => {
    if (tmpPath.length === n) {
      res.push(tmpPath);
      return;
    }

    for (let i = 0; i < n; i++) {
      if (tmpPath.indexOf(S[i]) !== -1) continue;
      backTrack(tmpPath + S[i]);
    }
  };
  backTrack(tmpPath);
  return res;
};
