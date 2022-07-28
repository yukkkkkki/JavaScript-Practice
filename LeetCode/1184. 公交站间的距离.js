/**
 * @param {number[]} distance
 * @param {number} start
 * @param {number} destination
 * @return {number}
 */
// 方法一：一次遍历
var distanceBetweenBusStops = function (distance, start, destination) {
  if (start > destination) {
    const temp = start;
    start = destination;
    destination = temp;
  }

  let sum1 = 0;
  let sum2 = 0;
  for (let i = 0; i < distance.length; i++) {
    if (i >= start && i < destination) {
      sum1 += distance[i];
    } else {
      sum2 += distance[i];
    }
  }

  return Math.min(sum1, sum2);
};
// 时间复杂度：O(n)
// 空间复杂度：O(1)
