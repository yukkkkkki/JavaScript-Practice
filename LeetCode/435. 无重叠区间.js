// 给定一个区间的集合，找到需要移除区间的最小数量，使剩余区间互不重叠。

// 注意:
// 可以认为区间的终点总是大于它的起点。
// 区间 [1,2] 和 [2,3] 的边界相互“接触”，但没有相互重叠。

// 示例 1:
// 输入: [ [1,2], [2,3], [3,4], [1,3] ]
// 输出: 1
// 解释: 移除 [1,3] 后，剩下的区间没有重叠。

// 示例 2:
// 输入: [ [1,2], [1,2], [1,2] ]
// 输出: 2
// 解释: 你需要移除两个 [1,2] 来使剩下的区间没有重叠。

// 示例 3:
// 输入: [ [1,2], [2,3] ]
// 输出: 0
// 解释: 你不需要移除任何区间，因为它们已经是无重叠的了。

/**
 * @param {number[][]} intervals
 * @return {number}
 */
// 方法一：动态规划
var eraseOverlapIntervals = function (intervals) {
  if (!intervals.length) return 0;
  intervals.sort((a, b) => a[0] - b[0]);
  const n = intervals.length;
  const f = new Array(n).fill(1);
  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (intervals[j][1] <= intervals[i][0]) {
        f[i] = Math.max(f[i], f[j] + 1);
      }
    }
  }
  return n - Math.max(...f);
};
// 时间复杂度：O(n^2); 空间复杂度：O(n)

// 方法二：贪心算法
var eraseOverlapIntervals = function (intervals) {
  if (!intervals.length) return 0;
  intervals.sort((a, b) => a[1] - b[1]);
  const n = intervals.length;
  let right = intervals[0][1];
  let ans = 1;
  for (let i = 1; i < n; ++i) {
    if (intervals[i][0] >= right) {
      ++ans;
      right = intervals[i][1];
    }
  }
  return n - ans;
};
// 时间复杂度：O(nlogn); 空间复杂度：O(n)
