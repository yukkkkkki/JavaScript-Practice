/**
 * @param {number[]} startTime
 * @param {number[]} endTime
 * @param {number} queryTime
 * @return {number}
 */
// 方法一：枚举
var busyStudent = function (startTime, endTime, queryTime) {
  const n = startTime.length;
  let ans = 0;
  for (let i = 0; i < n; i++) {
    if (startTime[i] <= queryTime && endTime[i] >= queryTime) {
      ans++;
    }
  }
  return ans;
};
// 时间复杂度：O(n)
// 空间复杂度：O(1)

// 方法二：二分查找
var busyStudent = function (startTime, endTime, queryTime) {
  startTime.sort((a, b) => a - b);
  endTime.sort((a, b) => a - b);
  const lessStart = upperbound(startTime, 0, startTime.length - 1, queryTime);
  const lessEnd = lowerbound(endTime, 0, endTime.length - 1, queryTime);
  return lessEnd - lessStart;
};
const upperbound = (arr, l, r, target) => {
  let res = r + 1;
  while (l <= r) {
    const mid = l + ((r - l) >> 1);
    if (arr[mid] > target) {
      res = mid;
      r = mid - 1;
    } else {
      l = mid + 1;
    }
  }
  return res;
};
const lowerbound = (arr, l, r, target) => {
  let res = r + 1;
  while (l <= r) {
    let mid = l + ((r - l) >> 1);
    if (arr[mid] >= target) {
      res = mid;
      r = mid - 1;
    } else {
      l = mid + 1;
    }
  }
  return res;
};
// 时间复杂度：O(nlogn)
// 空间复杂度：O(logn)
