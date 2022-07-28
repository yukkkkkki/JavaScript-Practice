/**
 * @param {number[][]} matrix
 * @return {number}
 */
// 方法一：记忆化搜索 DFS
/**
 * @param {number[][]} matrix
 * @return {number}
 */
var longestIncreasingPath = function (matrix) {
  const m = matrix.length;
  const n = matrix[0].length;

  const dp = new Array(m).fill(0).map(() => new Array(n).fill(0));
  const dir = [
    [0, 1],
    [0, -1],
    [-1, 0],
    [1, 0]
  ];

  // 第一步： 从一点往4个方向递归：碰到比他大的就加一，否则就加0，结束返回；
  const helper = (i, j, lastNum) => {
    if (i < 0 || j < 0 || i >= m || j >= n || matrix[i][j] <= lastNum) return 0;
    //第二步： 如果当前格子已经算出来过最大值 就直接使用,记忆化搜索
    if (dp[i][j]) return dp[i][j];

    let res = -Infinity;
    for (const [x, y] of dir) {
      // 寻找四个方向的最大值
      const [curx, cury] = [i + x, j + y];
      const temp = helper(curx, cury, matrix[i][j]) + 1;
      if (temp > res) {
        res = temp;
      }
    }

    //第三步： 否则就把往4个方向上走的最大值记录下来给dp
    dp[i][j] = res;
    return res;
  };

  let ans = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      ans = Math.max(ans, helper(i, j, -1));
    }
  }
  return ans;
};
// 作者：huangshanhe
// 链接：https://leetcode.cn/problems/fpTFWP/solution/jsji-yi-hua-sou-suo-dfs-by-huangshanhe-4gnh/
