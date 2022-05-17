/**
 * @param {number[]} dist
 * @param {number} hour
 * @return {number}
 */
// 方法一：二分查找
// 由于时速必须为正整数，因此二分下界为 1，上界考虑 hours 为两位小数
// 因此对于最后一段路程，最小时限为 0.01，最高时速要求为 dist[i] / 0.01 ≤ 10^7，同时为二分时速的上界
// 在二分过程中，假设当前时速为 mid，计算对应时速下到达终点的时间 t，并与 hour 比较以判断能否按时到达

// 假设 dist 长度为 n，考虑第 i 段花费的时间：
//   对于前 n−1 段，需要加上等待通向下一个地点的火车的时间，因此花费的时间为 ⌈dist[i] / mid⌉
//   而对于最后一段，花费的时间为 dist[n − 1] / mid
// 显然，前 n − 1 段至少需要 n - 1 时间完成，同时最后一段的花费时间必定为正数

// 故，if hour ≤ n−1，那么显然无法完成 -> 返回 −1
// 而只要 hour > n − 1，那么一定存在符合要求的时速
var minSpeedOnTime = function (dist, hour) {
  const n = dist.length;

  // 判断当前时速是否满足时限
  const check = (speed) => {
    let t = 0;
    for (let i = 0; i < n; i++) {
      // t += dist[i] - 1;
      if (i == n - 1) {
        t += dist[i] / speed;
      } else {
        t += Math.ceil(dist[i] / speed);
      }
    }

    return t <= hour;
  };

  let max = 10 ** 9; // dist最大为这个

  // 二分
  let l = 1;
  let r = 10 ** 9 + 1;
  while (l < r) {
    let mid = (l + r) >> 1;
    if (check(mid)) {
      r = mid;
    } else {
      l = mid + 1;
    }
  }

  return l >= max ? -1 : l;
};
// 时间复杂度：O(nlogC)
// 空间复杂度：O(1)
