/**
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} newColor
 * @return {number[][]}
 */
// 方法一：广度优先搜索 dfs
var floodFill = function (image, sr, sc, newColor) {
  const m = image.length;
  const n = image[0].length;
  let oldColor = image[sr][sc];
  if (oldColor === newColor) return image;

  const fill = (i, j) => {
    if (i < 0 || i >= m || j < 0 || j >= n || image[i][j] !== oldColor) {
      return;
    }

    image[i][j] = newColor;
    fill(i - 1, j);
    fill(i + 1, j);
    fill(i, j - 1);
    fill(i, j + 1);
  };

  fill(sr, sc);
  return image;
};
// 时间复杂度：O(mn)
// 空间复杂度：O(mn)
