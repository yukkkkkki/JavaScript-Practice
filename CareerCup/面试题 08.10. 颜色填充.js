// 编写函数，实现许多图片编辑软件都支持的「颜色填充」功能。

// 待填充的图像用二维数组 image 表示，元素为初始颜色值。初始坐标点的横坐标为 sr 纵坐标为 sc。需要填充的新颜色为 newColor 。

// 「周围区域」是指颜色相同且在上、下、左、右四个方向上存在相连情况的若干元素。

// 请用新颜色填充初始坐标点的周围区域，并返回填充后的图像。

// 示例：
// 输入：
// image = [[1,1,1],[1,1,0],[1,0,1]]
// sr = 1, sc = 1, newColor = 2
// 输出：[[2,2,2],[2,2,0],[2,0,1]]
// 解释:
// 初始坐标点位于图像的正中间，坐标 (sr,sc)=(1,1) 。
// 初始坐标点周围区域上所有符合条件的像素点的颜色都被更改成 2 。
// 注意，右下角的像素没有更改为 2 ，因为它不属于初始坐标点的周围区域。
// 方法一：深度优先遍历 DFS
// 思路：从初始坐标点分别往上下左右递归遍历，若元素 == oldvalue 则继续递归遍历
var floodFill = function (image, sr, sc, newColor) {
  const m = image.length;
  const n = image[0].length;
  const oldColor = image[sr][sc];
  const dfs = (i, j) => {
    if (i < 0 || i >= m || j < 0 || j >= n || image[i][j] == newColor) return;
    if (image[i][j] == oldColor) {
      image[i][j] = newColor;
      dfs(i + 1, j);
      dfs(i - 1, j);
      dfs(i, j + 1);
      dfs(i, j - 1);
    }
  };
  dfs(sr, sc);
  return image;
};
