// 给定三个字符串 s1, s2, s3, 验证 s3 是否是由 s1 和 s2 交错组成的。

// 示例 1:
// 输入: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"
// 输出: true

// 示例 2:
// 输入: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbbaccc"
// 输出: false

// 方法一：DFS回溯
// 初步思路
// s1 和 s2 的字符彼此交错，组成了 s3，并且交错的字符个数是不确定的
// 我们反过来想，s3 就是由 s1 和 s2 的字符组成的，它的每个字符是从二者中挑选的
// s3 的每个字符，有两个选择：从 s1 选、从 s2 选
const isInterleave = (s1, s2, s3) => {
  if (s1.length + s2.length != s3.length) return false;
  const check = (i, j, k) => {
    // 检查ijk开始的子串是否满足题目条件
    if (k == s3.length) return true; // k越过边界，s3扫描完了，返回true
    let isValid = false; // 默认 false
    if (i < s1.length && s1[i] == s3[k]) {
      // i没有越界，且s1[i]和s3[k]相同
      isValid = check(i + 1, j, k + 1); // i k 移动1，递归考察
    }
    if (j < s2.length && s2[j] == s3[k]) {
      // j没有越界，且s2[i]和s3[k]相同
      isValid = isValid || check(i, j + 1, k + 1);
      // 有可能i、j、k指向相同的字符，尝试 i、k 右移，但已经做过了
      // isValid就是check(i + 1, j, k + 1)的结果
      // 如果isValid是true，就不用执行 j、k 右移的递归，如果是false，执行递归
    }
    return isValid; // 如果整个遍历过程都没有返回true，则返回默认的false
  };
  return check(0, 0, 0); // 递归入口
};

// 方法二：DFS + 记忆化
const isInterleave = (s1, s2, s3) => {
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
