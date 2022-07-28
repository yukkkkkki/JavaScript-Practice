/**
 * @param {number[][]} isConnected
 * @return {number}
 */
// 方法一：DFS 深度优先搜索
var findCircleNum = function (isConnected) {
  const n = isConnected.length;
  const visited = new Set();

  const dfs = (i) => {
    for (let j = 0; j < n; j++) {
      if (isConnected[i][j] == 1 && !visited.has(j)) {
        visited.add(j);
        dfs(j);
      }
    }
  };

  let provinces = 0;
  for (let i = 0; i < n; i++) {
    if (!visited.has(i)) {
      dfs(i);
      provinces++;
    }
  }

  return provinces;
};
// 时间复杂度：O(n^2)
// 空间复杂度：O(n)

// 方法一：BFS 广度优先搜索
var findCircleNum = function (isConnected) {
  const n = isConnected.length;
  const visited = new Set();
  let provinces = 0;
  const queue = [];

  for (let i = 0; i < n; i++) {
    if (!visited.has(i)) {
      queue.push(i);

      while (queue.length) {
        const j = queue.shift();
        visited.add(j);
        for (let k = 0; k < n; k++) {
          if (isConnected[j][k] === 1 && !visited.has(k)) {
            queue.push(k);
          }
        }
      }

      provinces++;
    }
  }

  return provinces;
};
// 时间复杂度：O(n^2)
// 空间复杂度：O(n)
