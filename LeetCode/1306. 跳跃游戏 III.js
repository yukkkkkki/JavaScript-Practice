/**
 * @param {number[]} arr
 * @param {number} start
 * @return {boolean}
 */
// 方法一：广度优先搜索
var canReach = function (arr, start) {
  if (arr[start] === 0) return true;

  const n = arr.length;
  const used = [];
  const queue = [start];
  used[start] = true;

  while (queue.length) {
    let u = queue.shift();

    // 跳到 u + arr[u]
    if (u + arr[u] < n && !used[u + arr[u]]) {
      if (arr[u + arr[u]] === 0) {
        return true;
      }

      queue.push(u + arr[u]);
      used[u + arr[u]] = true;
    }

    // 跳到 u - arr[u]
    if (u - arr[u] >= 0 && !used[u - arr[u]]) {
      if (arr[u - arr[u]] === 0) {
        return true;
      }

      queue.push(u - arr[u]);
      used[u - arr[u]] = true;
    }
  }

  return false;
};
// 时间复杂度：O(n)
// 空间复杂度：O(n)
