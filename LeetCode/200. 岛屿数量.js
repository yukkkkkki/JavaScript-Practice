// 给你一个由 '1'（陆地）和 '0'（水）组成的的二维网格，请你计算网格中岛屿的数量。

// 岛屿总是被水包围，并且每座岛屿只能由水平方向或竖直方向上相邻的陆地连接形成。

// 此外，你可以假设该网格的四条边均被水包围。

// 示例 1:
// 输入:
// 11110
// 11010
// 11000
// 00000
// 输出: 1

// 示例 2:
// 输入:
// 11000
// 11000
// 00100
// 00011
// 输出: 3
// 解释: 每座岛屿只能由水平和/或竖直方向上相邻的陆地连接而成。

// 方法一 深度优先遍历
// 思路
// 遍历二维数组，当节点为陆地(1)时，对当前节点的上下左右四个方向启动深度优先遍历搜索，并将计数器加 1。
// 同时在搜索过程中，遇到海水(0)节点便停止，遇到陆地(1)节点便标记为海水(0)节点。
// 详解
// 1. 定义岛屿数量计数变量 landNum
// 2. 对二维数组 grid 进行两层遍历
// 3. 遍历过程中，遇到为 1 的陆地则将 landNum 自增 1，然后进入传播函数，并传入当前的坐标 i 、j
// 4. 根据传入的坐标，判断是否超出 grid 边界，并判断是否为 0
// 5. 若为超出边界，或为 0 ，则停止传播
// 6. 若为边界内的 1 ，则将该位置变为 0 ，并对此节点的上下左右节点继续递归传播，以此实现深度优先遍历
// 7. 传播结束后，便可根据 landNum 获得岛屿数量
var numIslands = function (grid) {
  let count = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === "1") {
        count++;
        turnZero(i, j, grid);
      }
    }
  }
  return count;
};

function turnZero(i, j, grid) {
  if (grid[i] === undefined || grid[i][j] === undefined || grid[i][j] === "0")
    return;

  grid[i][j] = "0";
  turnZero(i + 1, j, grid);
  turnZero(i - 1, j, grid);
  turnZero(i, j + 1, grid);
  turnZero(i, j - 1, grid);
}

// 时间复杂度:o(n)
// 空间复杂度:o(n)

// 方法二 广度优先遍历
// 思路
// 遍历二维数组，当节点为陆地(1)时，启动广度优先遍历搜索，将节点坐标放入队列中，并将计数器加 1。
// 在搜索过程中，遇到陆地(1)节点便标记为海水(0)节点，迭代搜索队列中的每个结点，直到队列为空。
// 详解
// 1. 定义岛屿数量计数变量 landNum
// 2. 对二维数组 grid 进行两层遍历
// 3. 遍历过程中，遇到为 1 的陆地则将 landNum 自增 1，然后进入传播函数，并传入当前的坐标 i 、j
// 4. 根据传入的坐标，构造成 queue 队列数组
// 5. 循环判断 queue 的数组长度
// 6. 若数组中存在坐标，则将末尾坐标从 queue 中 pop 取出
// 7. 判断取出的坐标是否为边界内的 1 ，若是，则将此坐标设置为 0 ，并将此坐标的上下左右坐标存入 queue 数组中，以此完成广度优先遍历
// 8. 遍历结束后，便可根据 landNum 获得岛屿数量
var numIslands = function (grid) {
  let count = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === "1") {
        spread(i, j, grid);
        count++;
      }
    }
  }
  return count;
};

function spread(i, j, grid) {
  const queue = [[i, j]];
  while (!!queue.length) {
    const [i, j] = queue.pop();
    if (
      grid.length > i &&
      i >= 0 &&
      grid[0].length > j &&
      j >= 0 &&
      grid[i][j] === "1"
    ) {
      grid[i][j] = "0";
      queue.push([i - 1, j]);
      queue.push([i + 1, j]);
      queue.push([i, j + 1]);
      queue.push([i, j - 1]);
    }
  }
}
