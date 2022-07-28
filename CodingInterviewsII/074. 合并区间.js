/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
// 方法一：排序
var merge = function (intervals) {
  intervals.sort((a, b) => a[0] - b[0]);

  const merged = [];
  for (let i = 0; i < intervals.length; i++) {
    let L = intervals[i][0];
    let R = intervals[i][1];

    if (merged.length === 0 || merged[merged.length - 1][1] < L) {
      merged.push([L, R]);
    } else {
      merged[merged.length - 1][1] = Math.max(merged[merged.length - 1][1], R);
    }
  }

  return merged;
};
// 时间复杂度：O(nlogn)
// 空间复杂度：O(logn)
