// 给定一个整数数组 A，如果它是有效的山脉数组就返回 true，否则返回 false。

// 让我们回顾一下，如果 A 满足下述条件，那么它是一个山脉数组：

// A.length >= 3
// 在 0 < i < A.length - 1 条件下，存在 i 使得：
// A[0] < A[1] < ... A[i-1] < A[i]
// A[i] > A[i+1] > ... > A[A.length - 1]
//
// 示例 1：
// 输入：[2,1]
// 输出：false

// 示例 2：
// 输入：[3,5,5]
// 输出：false

// 示例 3：
// 输入：[0,3,2,1]
// 输出：true

/**
 * @param {number[]} A
 * @return {boolean}
 */
// 方法一：线性扫描
// 思路：
// 从数组最左侧向右扫描，直到找到第一个不满足 A[i] < A[i + 1] 的下标 i，即数组的最高点
// 如果 i = 0或者不存在这样的 i（即整个数组都是单调递增的），那么就返回 false
// 否则从 i 开始继续向右扫描，判断接下来的的下标 j 是否都满足 A[j] > A[j + 1]，若都满足就返回 true
// 否则返回 false
var validMountainArray = function (A) {
  const n = A.length;
  let i = 0;
  // 递增扫描
  while (i + 1 < n && A[i] < A[i + 1]) {
    i++;
  }
  // 最高点不能是数组的第一个位置或最后一个位置
  if (i == 0 || i == n - 1) return false;
  // 递减扫描
  while (i + 1 < n && A[i] > A[i + 1]) {
    i++;
  }
  return i === n - 1;
};

// console.log(validMountainArray([0, 3, 2, 1, 4]));
