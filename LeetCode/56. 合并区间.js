/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
// 方法一：排序
var merge = function (intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  const res = [];
  let prev = intervals[0];

  for (let i = 1; i < intervals.length; i++) {
    let cur = intervals[i];
    if (prev[1] < cur[0]) {
      res.push(prev);
      prev = cur;
    } else {
      prev[1] = Math.max(prev[1], cur[1]);
    }
  }

  res.push(prev);
  return res;
};
