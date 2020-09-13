// 给定一个二维网格和一个单词，找出该单词是否存在于网格中。

// 单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母不允许被重复使用。

// 示例:
// board =
// [
//   ['A','B','C','E'],
//   ['S','F','C','S'],
//   ['A','D','E','E']
// ]
// 给定 word = "ABCCED", 返回 true
// 给定 word = "SEE", 返回 true
// 给定 word = "ABCB", 返回 false

// 请设计一个函数，用来判断在一个矩阵中是否存在一条包含某字符串所有字符的路径。路径可以从矩阵中的任意一格开始，每一步可以在矩阵中向左、右、上、下移动一格。如果一条路径经过了矩阵的某一格，那么该路径不能再次进入该格子。例如，在下面的3×4的矩阵中包含一条字符串“bfce”的路径（路径中的字母用加粗标出）。

// [["a","b","c","e"],
// ["s","f","c","s"],
// ["a","d","e","e"]]

// 但矩阵中不包含字符串“abfb”的路径，因为字符串的第一个字符b占据了矩阵中的第一行第二个格子之后，路径不能再次进入这个格子。

// 示例 1：
// 输入：board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
// 输出：true

// 示例 2：
// 输入：board = [["a","b"],["c","d"]], word = "abcd"
// 输出：false

// 方法一：DFS回溯
const exist = (board, word) => {
  const m = board.length;
  const n = board[0].length;
  const used = new Array(m); // 二维矩阵used
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
