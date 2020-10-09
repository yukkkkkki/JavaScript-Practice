// 你有一个用于表示一片土地的整数矩阵land，该矩阵中每个点的值代表对应地点的海拔高度。若值为0则表示水域。由垂直、水平或对角连接的水域为池塘。池塘的大小是指相连接的水域的个数。编写一个方法来计算矩阵中所有池塘的大小，返回值需要从小到大排序。

// 示例：
// 输入：
// [
//   [0,2,1,0],
//   [0,1,0,1],
//   [1,1,0,1],
//   [0,1,0,1]
// ]
// 输出： [1,2,4]

/**
 * @param {number[][]} land
 * @return {number[]}
 */
// 方法一：DFS
var pondSizes = function (land) {
  const m = land.length;
  const n = land[0].length;
  const res = [];
  let count = 0;
  const dirs = [
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1],
  ];

  const backTrack = (i, j) => {
    land[i][j] = -1;
    count++;
    for (let [dx, dy] of dirs) {
      let x = i + dx;
      let y = j + dy;
      if (x >= 0 && x < m && y >= 0 && y < n && land[x][y] === 0) {
        backTrack(x, y);
      }
    }
  };

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (land[i][j] === 0) {
        backTrack(i, j);
        res.push(count);
        count = 0;
      }
    }
  }

  return res.sort((a, b) => a - b);
};

console.log(
  pondSizes([
    [0, 2, 1, 0],
    [0, 1, 0, 1],
    [1, 1, 0, 1],
    [0, 1, 0, 1],
  ])
);
