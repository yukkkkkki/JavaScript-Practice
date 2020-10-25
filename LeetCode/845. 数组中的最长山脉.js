// 我们把数组 A 中符合下列属性的任意连续子数组 B 称为 “山脉”：

// B.length >= 3
// 存在 0 < i < B.length - 1 使得 B[0] < B[1] < ... B[i-1] < B[i] > B[i+1] > ... > B[B.length - 1]
// （注意：B 可以是 A 的任意子数组，包括整个数组 A。）

// 给出一个整数数组 A，返回最长 “山脉” 的长度。

// 如果不含有 “山脉” 则返回 0。

// 示例 1：
// 输入：[2,1,4,7,3,2,5]
// 输出：5
// 解释：最长的 “山脉” 是 [1,4,7,3,2]，长度为 5。

// 示例 2：
// 输入：[2,2,2]
// 输出：0
// 解释：不含 “山脉”。

/**
 * @param {number[]} A
 * @return {number}
 */

// 方法一：枚举山顶
// 思路：动态规划
// 用 left[i] 表示 A[i] 向左侧最多可以扩展的元素数目,若A[i - 1] < A[i]，则A[i] 可以向左扩展到A[i - 1]，再扩展left[i]个元素
//   left[i] = left[i - 1] + 1;
//   若 A[i - 1] >= A[i]，则 left[i] = 0;
//   especially，当 i = 0，left[0] = 0;
// 用right[i] 表示 A[i] 向右侧最多可以扩展的元素数目
// right = right[i + 1] + 1, A[i] > A[i + 1]
//       = 0, A[i] <= A[i + 1] 或 i = n - 1;
var longestMountain = function (A) {
  const n = A.length;
  if (n == 0) return 0;
  let left = new Array(n);
  left[0] = 0;
  for (let i = 1; i < n; ++i) {
    left[i] = A[i - 1] < A[i] ? left[i - 1] + 1 : 0;
  }
  let right = new Array(n);
  for (let i = n - 1; i >= 0; i--) {
    right[i] = A[i + 1] < A[i] ? right[i + 1] + 1 : 0;
  }
  let res = 0;
  // 枚举山顶
  for (let i = 0; i < n; ++i) {
    if (left[i] > 0 && right[i] > 0) {
      res = Math.max(res, left[i] + right[i] + 1);
    }
  }
  return res;
};
// 时间复杂度：O(n)；空间复杂度：O(n)

// 方法二：枚举山脚
// 思路：双指针
// 一个指针枚举左侧山脚，另一个指针不断向右移动到右侧山脚
// left 指向左侧山脚，初始值 = 0
//   首先需要保证 left + 2 < n，其次要保证 A[left] < A[left + 1]
// right 指向右侧山脚，初始值 = left + 1，不断向右移动，直到不满足 A[right] < A[right + 1]
//   若 right = n - 1，无法形成山脉
//   否则，right可能指向山顶。 A[right] > A[right + 1]，则是山顶
// 若 right 指向山顶，向右移动right，直到 A[right] > A[right + 1],此时right指向右侧山脚
//
var longestMountain = function (A) {
  const n = A.length;
  let res = 0;
  let left = 0;
  while (left + 2 < n) {
    let right = left + 1;
    if (A[left] < A[left + 1]) {
      while (right + 1 < n && A[right] < A[right + 1]) {
        ++right;
      }
      if (right < n - 1 && A[right] > A[right + 1]) {
        while (right + 1 < n && A[right] > A[right + 1]) {
          ++right;
        }
        res = Math.max(res, right - left + 1);
      } else {
        ++right;
      }
    }
    left = right;
  }
  return res;
};
// 时间复杂度：O(n)；空间复杂度：O(1)
console.log(longestMountain([0, 1, 2, 3, 4, 5, 4, 3, 2, 1, 0]));
