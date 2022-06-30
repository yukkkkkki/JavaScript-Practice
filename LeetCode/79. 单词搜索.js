/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
// 方法一：DFS回溯
const exist = (board, word) => {
  const m = board.length;
  const n = board[0].length;
  const used = new Array(m); // 二维矩阵 used
  for (let i = 0; i < m; i++) {
    used[i] = new Array(n);
  }
  // 判断当前点是否是目标路径上的点
  const backTrack = (row, col, i) => {
    if (i > word.length - 1) return true;
    // 当前点要存在
    if (row < 0 || row >= m || col < 0 || col >= n) return false;
    if (used[row][col] || board[row][col] != word[i]) {
      // 当前的点已经走过，或当前点就不是word[i]
      return false;
    }

    used[row][col] = true; // used记录一下当前点被访问了
    const canFindRest =
      backTrack(row + 1, col, i + 1) ||
      backTrack(row - 1, col, i + 1) ||
      backTrack(row, col + 1, i + 1) ||
      backTrack(row, col - 1, i + 1);
    if (canFindRest) return true;

    used[row][col] = false; // 找不出，返回false，继续考察别的分支，并撤销当前点的访问状态。
    return false;
  };

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] == word[0] && backTrack(i, j, 0)) {
        return true;
      }
    }
  }

  return false;
};

// 作者：xiao_ben_zhu
// 链接：https://leetcode-cn.com/problems/word-search/solution/shou-hua-tu-jie-79-dan-ci-sou-suo-dfs-si-lu-de-cha/
