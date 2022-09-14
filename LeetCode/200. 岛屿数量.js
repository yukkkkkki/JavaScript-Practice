/**
 * @param {character[][]} grid
 * @return {number}
 */
// 方法一：深度优先遍历 DFS
// 遍历二维数组，
// 同时在搜索过程中，遇到海水(0)节点便停止，遇到陆地(1)节点便标记为海水(0)节点。
var numIslands = function (grid) {
  const n = grid.length;
  const m = grid[0].length;

  const turnZero = (i, j) => {
    // 判断是否超出 grid 边界，并判断是否为 0
    if (
      grid[i] === undefined ||
      grid[i][j] === undefined ||
      grid[i][j] === "0"
    ) {
      return;
    }

    grid[i][j] = "0";

    // 对此节点的上下左右节点继续递归传播，以此实现深度优先遍历
    turnZero(i + 1, j);
    turnZero(i - 1, j);
    turnZero(i, j + 1);
    turnZero(i, j - 1);
  };

  let count = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      // 当节点为陆地(1)时，对当前节点的上下左右四个方向启动 DFS
      // 并将计数器加 1。
      if (grid[i][j] === "1") {
        count++;
        turnZero(i, j);
      }
    }
  }

  return count;
};
// 时间复杂度:o(nm)
// 空间复杂度:o(nm)

// 方法二：广度优先遍历 BFS
var numIslands = function (grid) {
  const n = grid.length;
  const m = grid[0].length;

  const spread = (i, j) => {
    const queue = [[i, j]];
    while (!!queue.length) {
      const [i, j] = queue.pop();
      if (i >= 0 && i < n && j >= 0 && j < m && grid[i][j] === "1") {
        // 遇到陆地(1)节点便标记为海水(0)节点
        grid[i][j] = "0";

        // 迭代搜索队列中的每个结点，直到队列为空
        queue.push([i - 1, j]);
        queue.push([i + 1, j]);
        queue.push([i, j + 1]);
        queue.push([i, j - 1]);
      }
    }
  };

  let count = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      // 当节点为陆地(1)时，启动广度优先遍历搜索
      // 将节点坐标放入队列中，并将计数器加 1
      if (grid[i][j] === "1") {
        spread(i, j);
        count++;
      }
    }
  }
  return count;
};
// 时间复杂度:o(nm)
// 空间复杂度:o(nm)
