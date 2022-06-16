/**
 * @param {number[][]} intervals
 * @return {number[]}
 */
// 方法一：二分查找
var findRightInterval = function (intervals) {
  const n = intervals.length;
  const startIntervals = new Array(n).fill(0).map(() => new Array(2).fill(0));
  for (let i = 0; i < n; i++) {
    startIntervals[i][0] = intervals[i][0];
    startIntervals[i][1] = i;
  }
  startIntervals.sort((a, b) => a[0] - b[0]);

  const result = new Array(n).fill(0);

  // 枚举每个区间 i 的右端点 intervals[i][1]
  // 二分查找来找大于等于 intervals[i][1] 的最小值 val 即可
  // 此时区间 i 对应的右侧区间即为右端点 val 对应的索引
  for (let i = 0; i < n; i++) {
    let left = 0;
    let right = n - 1;
    let target = -1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (startIntervals[mid][0] >= intervals[i][1]) {
        target = startIntervals[mid][1];
        right = mid - 1;
      } else left = mid + 1;
    }

    result[i] = target;
  }
  return result;
};
// 时间复杂度：O(nlogn)
// 空间复杂度：O(n)
