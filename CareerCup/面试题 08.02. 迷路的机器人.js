// 设想有个机器人坐在一个网格的左上角，网格 r 行 c 列。机器人只能向下或向右移动，但不能走到一些被禁止的网格（有障碍物）。设计一种算法，寻找机器人从左上角移动到右下角的路径。

// 网格中的障碍物和空位置分别用 1 和 0 来表示。

// 返回一条可行的路径，路径由经过的网格的行号和列号组成。左上角为 0 行 0 列。如果没有可行的路径，返回空数组。

// 示例 1:
// 输入:
// [
//   [0,0,0],
//   [0,1,0],
//   [0,0,0]
// ]
// 输出: [[0,0],[0,1],[0,2],[1,2],[2,2]]
// 解释:
// 输入中标粗的位置即为输出表示的路径，即
// 0行0列（左上角） -> 0行1列 -> 0行2列 -> 1行2列 -> 2行2列（右下角）

/**
 * @param {number[][]} obstacleGrid
 * @return {number[][]}
 */
var pathWithObstacles = function (obstacleGrid) {
  const m = obstacleGrid.length;
  const n = obstacleGrid[0].length;
  if (!m) return [];
  let res = [];
  let direction = [
    [0, 1],
    [1, 0],
  ];

  const backTrack = (row, col, tmpPath) => {
    if (
      row < 0 ||
      col < 0 ||
      row >= m ||
      col >= n ||
      obstacleGrid[row][col] !== 0
    )
      return false;
    obstacleGrid[row][col] = 1;
    tmpPath.push([row, col]);
    if (row === m - 1 && col === n - 1) {
      res = tmpPath;
      return true;
    }
    for (let [x, y] of direction) {
      backTrack(row + x, col + y, [...tmpPath]);
    }
  };

  backTrack(0, 0, []);
  return res;
};
