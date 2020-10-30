// 给定一个包含 0 和 1 的二维网格地图，其中 1 表示陆地 0 表示水域。

// 网格中的格子水平和垂直方向相连（对角线方向不相连）。整个网格被水完全包围，但其中恰好有一个岛屿（或者说，一个或多个表示陆地的格子相连组成的岛屿）。

// 岛屿中没有“湖”（“湖” 指水域在岛屿内部且不和岛屿周围的水相连）。格子是边长为 1 的正方形。网格为长方形，且宽度和高度均不超过 100 。计算这个岛屿的周长。

// 示例 :
// 输入:
// [[0,1,0,0],
//  [1,1,1,0],
//  [0,1,0,0],
//  [1,1,0,0]]
// 输出: 16
// 解释: 它的周长是下面图片中的 16 个黄色的边：

/**
 * @param {number[][]} grid
 * @return {number}
 */

// 方法一：找规律
// 思路：
// 一块土地原则上会带来4个周长，但岛上的土地存在接壤，每一条接壤会减掉2个边长
// 总周长 = 4 * 土地个数 - 2 * 接壤边的条数
// 遍历矩阵,遍历到土地,就land++，若其右/下边也是土地，则border++，遍历结束后代入公式
var islandPerimeter = function (grid) {
  let land = 0; // 土地个数
  let border = 0; // 接壤边界的条数
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] == 1) {
        land++;
        if (i < grid.length - 1 && grid[i + 1][j] == 1) {
          border++;
        }
        if (j < grid[0].length - 1 && grid[i][j + 1] == 1) {
          border++;
        }
      }
    }
  }
  return 4 * land - 2 * border;
};
// 时间复杂度：O(nm)；空间复杂度：O(1)

// 方法二:DFS
// 思路：
// 对于每个土地节点，基于它递归上下左右四个点
// 从土地到土地，之间不会产生"周长受益"，但从土地迈入海洋，之间会产生1个周长
// 从土地迈出矩阵边界，也会产生 1 个周长
// dfs过程中，要避免重复遍历：遍历过的土地节点，将值改成 2，区分于 1 和 0，代表访问过了
var islandPerimeter = function (grid) {
  const dfs = (i, j) => {
    if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length) {
      return 1; // 越界，说明穿过了一个边界，周长 + 1
    }
    if (grid[i][j] == 0) {
      return 1; // 从土地来到了海水，说明穿过了一个边界，周长 + 1
    }
    if (grid[i][j] == 2) {
      return 0; // 之前访问过，直接返回0
    }
    grid[i][j] = 2;
    // 继续往四个方向“扩散”，目标是遇到边界和海水，答案随着递归出栈向上返回，得出大的答案
    return dfs(i - 1, j) + dfs(i + 1, j) + dfs(i, j - 1) + dfs(i, j + 1);
  };
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] == 1) {
        return dfs(i, j);
      }
    }
  }
};
// 时间复杂度：O(nm)；空间复杂度：O(nm)

console.log(
  islandPerimeter([
    [0, 1, 0, 0],
    [1, 1, 1, 0],
    [0, 1, 0, 0],
    [1, 1, 0, 0],
  ])
);
// 作者：xiao_ben_zhu
// 链接：https://leetcode-cn.com/problems/island-perimeter/solution/shou-hua-tu-jie-463-dao-yu-de-zhou-chang-by-xiao_b/
