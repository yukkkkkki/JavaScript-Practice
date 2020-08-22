// 给两个整数数组 A 和 B ，返回两个数组中公共的、长度最长的子数组的长度。

// 示例：
// 输入：
// A: [1,2,3,2,1]
// B: [3,2,1,4,7]
// 输出：3
// 解释：
// 长度最长的公共子数组是 [3, 2, 1]。

// 方法一：动态规划
// dp[i][j] ： 长度为 i ，以 A[i-1] 为末尾的序列，和长度为 j，以 B[j-1] 为末尾的序列，二者的最大公共后缀序列长度（该公共序列以A[i-1]（B[j-1]）为末尾项）
//     如果 A[i-1] != B[j-1] ， dp[i][j] = 0
//     如果 A[i-1] == B[j-1] ， dp[i][j] = dp[i-1][j-1] + 1
// base case：如果 i==0 || j==0 ，即其中一个长度为0，空子数组，没有公共长度，dp[i][j] = 0
var findLength = function (A, B) {
  const m = A.length;
  const n = B.length;
  // const dp = new Array(m + 1);
  // for (let i = 0; i <= m; i++) {
  //   dp[i] = new Array(n + 1).fill(0);
  // }
  const dp = Array.from(new Array(m + 1), () => new Array(n + 1).fill(0));
  let res = 0;
  for (let i = 0; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (A[i - 1] == B[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      }
      res = Math.max(dp[i][j], res);
    }
  }
  return res;
};
// 时间复杂度 O(n^2)，即 O(n * m)。 空间复杂度 O(n * m)

// 动态规划降维
// dp[i][j] 只依赖于上一行，上一列，对角线的值，所以我们从右上角开始计算
var findLength = function (A, B) {
  const m = A.length;
  const n = B.length;
  const dp = new Array(n + 1).fill(0);
  let res = 0;
  for (let i = 1; i <= m; i++) {
    for (let j = n; j >= 1; j--) {
      if (A[i - 1] == B[j - 1]) {
        dp[j] = dp[j - 1] + 1;
      } else {
        dp[j] = 0;
      }
      res = Math.max(dp[j], res);
    }
  }
  return res;
};

// 方法二：滑动窗口
// 对齐的方式有两类：
// 第一类为 A 不变，B 的首元素与 A 中的某个元素对齐；
// 第二类为 B 不变，A 的首元素与 B 中的某个元素对齐。对于每一种对齐方式，我们计算它们相对位置相同的重复子数组即可。
var findLength = function (A, B) {
  let Alen = A.length;
  let Blen = B.length;
  let result = 0;
  for (let i = 1; i < Alen + Blen; i++) {
    if (result >= Alen + Blen - i) {
      return result;
    }
    let len = Math.min(i, Alen, Blen, Alen + Blen - i);
    result = Math.max(maxLength(A, B, Alen - i, i - Alen, len), result);
  }
  return result;
};

var maxLength = function (A, B, addA, addB, len) {
  addA = addA > 0 ? addA : 0;
  addB = addB > 0 ? addB : 0;
  let result = 0;
  let k = 0;
  for (let i = 0; i < len && k + len - i > result; i++) {
    if (A[i + addA] == B[i + addB]) {
      k++;
    } else {
      k = 0;
    }
    result = Math.max(result, k);
  }
  return result;
};
