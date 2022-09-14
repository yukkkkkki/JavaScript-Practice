/**
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} newColor
 * @return {number[][]}
 */
// 方法一：深度优先搜索 dfs
var floodFill = function (image, sr, sc, newColor) {
  const m = image.length;
  const n = image[0].length;

  let oldColor = image[sr][sc];
  if (oldColor === newColor) return image;

  const dfs = (i, j) => {
    if (i < 0 || i >= m || j < 0 || j >= n || image[i][j] !== oldColor) {
      return;
    }

    image[i][j] = newColor;
    dfs(i - 1, j);
    dfs(i + 1, j);
    dfs(i, j - 1);
    dfs(i, j + 1);
  };

  dfs(sr, sc);
  return image;
};
// 时间复杂度：O(mn)
// 空间复杂度：O(mn)

// 方法二：广度优先搜索 bfs
var floodFill = function (image, sr, sc, color) {
  let currColor = image[sr][sc];
  if (currColor === color) return image;

  const n = image.length;
  const m = image[0].length;
  let dirs = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0]
  ];

  const queue = [[sr, sc]];
  image[sr][sc] = color;
  while (queue.length) {
    let [x, y] = queue.shift();

    for (let dir of dirs) {
      let dx = x + dir[0];
      let dy = y + dir[1];

      if (
        dx >= 0 &&
        dx < n &&
        dy >= 0 &&
        dy < m &&
        image[dx][dy] === currColor
      ) {
        queue.push([dx, dy]);
        image[dx][dy] = color;
      }
    }
  }

  return image;
};
// 时间复杂度：O(mn)
// 空间复杂度：O(mn)
