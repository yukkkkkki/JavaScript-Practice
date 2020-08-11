// 给定一个二维的矩阵，包含 'X' 和 'O'（字母 O）。

// 找到所有被 'X' 围绕的区域，并将这些区域里所有的 'O' 用 'X' 填充。

// 示例:
// X X X X
// X O O X
// X X O X
// X O X X

// 运行你的函数后，矩阵变为：
// X X X X
// X X X X
// X X X X
// X O X X

// 解释:
// 被围绕的区间不会存在于边界上，换句话说，任何边界上的 'O' 都不会被填充为 'X'。 任何不在边界上，或不与边界上的 'O' 相连的 'O' 最终都会被填充为 'X'。如果两个元素在水平或垂直方向相邻，则称它们是“相连”的。

// 方法一：DFS
// 判断是否为岛屿比较困难，但找出非岛屿比较简单——凡是与边界有联系的 O，标记为 NO，表示非岛屿。这个找的过程可以用 DFS 或 BFS
var solve = function (board) {
  const m = board.length;
  if (m == 0) return;
  const n = board[0].length;

  const dfs = (x, y) => {
    if (x < 0 || x === m || y < 0 || y === n || board[x][y] != "O") {
      return;
    }
    if (board[x][y] == "O") board[x][y] = "A"; // 遇到O，染为A
    dfs(x + 1, y);
    dfs(x - 1, y);
    dfs(x, y + 1);
    dfs(x, y - 1);
  };

  // 外层 O 设置为 A，意思是不能染成X
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (i == 0 || i == m - 1 || j == 0 || j == n - 1) {
        if (board[i][j] == "O") dfs(i, j); // 从最外层的O，开始DFS
      }
    }
  }
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] === "A") board[i][j] = "O";
      else if (board[i][j] === "O") board[i][j] = "X";
    }
  }
};

// 方法二：BFS
// 维护一个队列，入列就标记为NO，做标记本身就代表该节点被访问了，不用单独弄个visited的map记录访问过的节点，就能避免点的重复入列。
const solve = (board) => {
  const m = board.length;
  if (m == 0) return [];
  const n = board[0].length;
  const dirs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  const bfs = (i, j) => {
    const queue = [[i, j]];
    board[i][j] = "NO"; // 入列的“root”染色一下
    while (queue.length) {
      const [curI, curJ] = queue.shift(); // 获取出列节点的i、j坐标
      for (const [dx, dy] of dirs) {
        // 四个方向
        const x = curI + dx; // 求出新坐标
        const y = curJ + dy;
        if (x < 0 || x == m || y < 0 || y == n) continue; // 越界了就忽略
        if (board[x][y] == "O") {
          // 是O，染色成XO
          board[x][y] = "NO";
          queue.push([x, y]); // 染色成XO的节点入列
        }
      }
    }
  };
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (i == 0 || i == m - 1 || j == 0 || j == n - 1) {
        if (board[i][j] == "O") bfs(i, j); // 从最外层的O，开始BFS
      }
    }
  }
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] === "NO") board[i][j] = "O";
      else if (board[i][j] === "O") board[i][j] = "X";
    }
  }
};
