/**
 * @param {string} s
 * @return {number}
 */
// 方法一：动态规划
var countSubstrings = function (s) {
  const n = s.length;
  const dp = new Array(n).fill(0).map(() => new Array(n).fill(false));

  let res = 0;
  for (let i = 0; i < n; i++) {
    for (let j = i; j >= 0; j--) {
      if (s[i] === s[j]) {
        if (i - j <= 1) {
          //  i 和 j 的差距不大于 1，只要两个元素相等就是回文
          dp[i][j] = true;
        } else {
          // 除了判断头尾意外还需要判断中间部分是否回文
          dp[i][j] = dp[i - 1][j + 1];
        }
      }

      res += dp[i][j] ? 1 : 0;
    }
  }

  return res;
};

// 方法二：中心拓展
var countSubstrings = function (s) {
  const n = s.length;
  let res = 0;

  for (let i = 0; i < 2 * n - 1; i++) {
    let l = i / 2;
    let r = i / 2 + (i % 2);
    while (l >= 0 && r < n && s.charAt(l) === s.charAt(r)) {
      --l;
      ++r;
      res++;
    }
  }

  return res;
};
// 时间复杂度：O(n^2)
// 空间复杂度：O(1)
