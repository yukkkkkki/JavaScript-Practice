/**
 * @param {string} s
 * @return {string[][]}
 */
// 方法一：回溯 + 动态规划预处理
var partition = function (s) {
  const n = s.length;
  const f = new Array(n).fill(0).map(() => new Array(n).fill(true));
  const ret = [];
  const path = [];

  const dfs = (i) => {
    if (i === n) {
      ret.push(path.slice());
      return;
    }
    for (let j = i; j < n; ++j) {
      if (f[i][j]) {
        path.push(s.slice(i, j + 1));
        dfs(j + 1);
        path.pop();
      }
    }
  };

  for (let i = n - 1; i >= 0; --i) {
    for (let j = i + 1; j < n; ++j) {
      f[i][j] = s[i] === s[j] && f[i + 1][j - 1];
    }
  }
  dfs(0);
  return ret;
};
// 时间复杂度：O(n·2^n)
// 空间复杂度：O(n^2)

// 方法二：回溯 + 记忆化搜索
var partition = function (s) {
  const n = s.length;
  const res = [];
  const path = [];
  const f = new Array(n).fill(0).map(() => new Array(n).fill(0));

  const dfs = (i) => {
    if (i === n) {
      res.push(path.slice());
      return;
    }
    for (let j = i; j < n; j++) {
      if (isPalindrome(i, j) === 1) {
        path.push(s.slice(i, j + 1));
        dfs(j + 1);
        path.pop();
      }
    }
  };

  const isPalindrome = (i, j) => {
    if (f[i][j] !== 0) return f[i][j];

    if (i >= j) {
      f[i][j] = 1;
    } else if (s[i] === s[j]) {
      f[i][j] = isPalindrome(i + 1, j - 1);
    } else {
      f[i][j] = -1;
    }

    return f[i][j];
  };

  dfs(0);
  return res;
};
// 时间复杂度：O(n·2^n)
// 空间复杂度：O(n^2)
