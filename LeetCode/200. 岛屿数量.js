/**
 * @param {character[][]} grid
 * @return {number}
 */
// 方法一 深度优先遍历
// 遍历二维数组，当节点为陆地(1)时，对当前节点的上下左右四个方向启动深度优先遍历搜索，并将计数器加 1。
// 同时在搜索过程中，遇到海水(0)节点便停止，遇到陆地(1)节点便标记为海水(0)节点。
var numIslands = function (grid) {
  let count = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      // 遇到为 1 的陆地则将 landNum 自增 1
      // 然后进入传播函数，并传入当前的坐标 i 、j
      if (grid[i][j] === "1") {
        count++;
        turnZero(i, j, grid);
      }
    }
  }
  return count;
};

function turnZero(i, j, grid) {
  // 判断是否超出 grid 边界，并判断是否为 0
  if (grid[i] === undefined || grid[i][j] === undefined || grid[i][j] === "0") {
    return;
  }

  grid[i][j] = "0";
  // 对此节点的上下左右节点继续递归传播，以此实现深度优先遍历
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
