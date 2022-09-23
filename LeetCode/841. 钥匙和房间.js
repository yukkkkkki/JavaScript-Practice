// 示例 1：
// 输入: [[1],[2],[3],[]]
// 输出: true
// 解释:
// 我们从 0 号房间开始，拿到钥匙 1。
// 之后我们去 1 号房间，拿到钥匙 2。
// 然后我们去 2 号房间，拿到钥匙 3。
// 最后我们去了 3 号房间。
// 由于我们能够进入每个房间，我们返回 true。
/**
 * @param {number[][]} rooms
 * @return {boolean}
 */
// 方法一：DFS
var canVisitAllRooms = function (rooms) {
  const visited = new Set();

  const dfs = (curRoom) => {
    visited.add(curRoom);
    const nextRooms = rooms[curRoom];

    for (let i = 0; i < nextRooms.length; i++) {
      const next = nextRooms[i];
      if (!visited.has(next)) dfs(next);
    }
  };

  dfs(0);
  return visited.size === rooms.length;
};
// 时间复杂度：O(n + m)
// 空间复杂度：O(n)
canVisitAllRooms([[1], [2], [3], []]);

// 方法二：BFS
var canVisitAllRooms = function (rooms) {
  const visited = new Set();
  visited.add(0);

  const queue = [0];
  while (queue.length) {
    const nextRooms = rooms[queue.shift()];

    for (let i = 0; i < nextRooms.length; i++) {
      const next = nextRooms[i];
      if (!visited.has(next)) {
        queue.push(next);
        visited.add(next);
      }
    }
  }

  return visited.size === rooms.length;
};
// 时间复杂度：O(n + m)
// 空间复杂度：O(n)
