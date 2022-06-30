/**
 * @param {string} s1
 * @param {string} s2
 * @param {string} s3
 * @return {boolean}
 */
// 方法一：DFS回溯
// s1 和 s2 的字符彼此交错，组成了 s3，并且交错的字符个数是不确定的
// 我们反过来想，s3 就是由 s1 和 s2 的字符组成的，它的每个字符是从二者中挑选的
// s3 的每个字符，有两个选择：从 s1 选、从 s2 选
var isInterleave = function (s1, s2, s3) {
  if (s1.length + s2.length != s3.length) {
    return false;
  }

  // 检查 i, j, k开始的子串是否满足题目条件
  const check = (i, j, k) => {
    // k 越过边界，s3 扫描完了，返回 true
    if (k == s3.length) return true;

    let isValid = false; // 默认 false
    // i 有越界，且 s1[i] 和 s3[k] 相同
    if (i < s1.length && s1[i] == s3[k]) {
      isValid = check(i + 1, j, k + 1);
    }

    // j没有越界，且 s2[i] 和 s3[k] 相同
    if (j < s2.length && s2[j] == s3[k]) {
      isValid = isValid || check(i, j + 1, k + 1);
      // 有可能 i、j、k指向相同的字符，尝试 i、k 右移，但已经做过了
      // isValid 就是 check(i + 1, j, k + 1) 的结果
      // 如果 isValid 是true，就不用执行 j、k 右移的递归，如果是 false，执行递归
    }

    return isValid;
  };

  return check(0, 0, 0); // 递归入口
};

// 方法二：DFS + 记忆化
var isInterleave = function (s1, s2, s3) {
  if (s1.length + s2.length != s3.length) return false;
  const memo = new Array(s1.length + 1);
  for (let i = 0; i < memo.length; i++) {
    memo[i] = new Array(s2.length + 1);
  }

  const check = (i, j, k) => {
    if (memo[i][j] != null) return memo[i][j];
    if (k == s3.length) return (memo[i][j] = true);
    let isValid = false;
    if (i < s1.length && s1[i] == s3[k]) {
      isValid = check(i + 1, j, k + 1);
    }
    if (j < s2.length && s2[j] == s3[k]) {
      isValid = isValid || check(i, j + 1, k + 1);
    }
    return (memo[i][j] = isValid);
  };

  return check(0, 0, 0);
};
