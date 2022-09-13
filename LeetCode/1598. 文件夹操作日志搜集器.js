/**
 * @param {string[]} logs
 * @return {number}
 */
// 方法一：直接模拟
var minOperations = function (logs) {
  let depth = 0;
  for (const log of logs) {
    if ("./" === log) {
      continue;
    } else if ("../" === log) {
      if (depth > 0) depth--;
    } else {
      depth++;
    }
  }
  return depth;
};
// 时间复杂度：O(n)
// 空间复杂度：O(1)
