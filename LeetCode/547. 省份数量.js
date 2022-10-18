/**
 * @param {number[][]} isConnected
 * @return {number}
 */
// 方法一：深度优先搜索
var findCircleNum = function (isConnected) {
  const cities = isConnected.length;
  const visited = new Set();
  let provinces = 0;

  const dfs = (i) => {
    for (let j = 0; j < cities; j++) {
      if (isConnected[i][j] === 1 && !visited.has(j)) {
        visited.add(j);
        dfs(j);
      }
    }
  };

  // 遍历所有城市
  for (let i = 0; i < cities; i++) {
    // 对于每个城市，如果该城市尚未被访问过，则从该城市开始深度优先搜索
    if (!visited.has(i)) {
      dfs(i);
      provinces++;
    }
  }

  return provinces;
};
// 时间复杂度：O(n^2)
// 空间复杂度：O(n)

// 方法二：广度优先搜索
var findCircleNum = function (isConnected) {
  const cities = isConnected.length;
  const visited = new Set();

  let provinces = 0;
  const queue = [];

  for (let i = 0; i < cities; i++) {
    if (!visited.has(i)) {
      queue.push(i);

      while (queue.length) {
        const j = queue.shift();
        visited.add(j);

        for (let k = 0; k < cities; k++) {
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
