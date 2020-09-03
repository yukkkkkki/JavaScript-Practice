// 设计一种算法，打印 N 皇后在 N × N 棋盘上的各种摆法，其中每个皇后都不同行、不同列，也不在对角线上。这里的“对角线”指的是所有的对角线，不只是平分整个棋盘的那两条对角线。

// 注意：本题相对原题做了扩展

// 示例:
//  输入：4
//  输出：[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
//  解释: 4 皇后问题存在如下两个不同的解法。
// [
//  [".Q..",  // 解法 1
//   "...Q",
//   "Q...",
//   "..Q."],

//  ["..Q.",  // 解法 2
//   "Q...",
//   "...Q",
//   ".Q.."]
// ]

/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function (n) {
  // 生成棋盘
  let checkBoard = new Array(n).fill().map((i) => new Array(n).fill('.'));
  // console.log(checkBoard);

  const res = [];

  // 用来剪枝的
  const isValid = (row, col) => {
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < n; j++) {
        if (
          checkBoard[i][j] === 'Q' &&
          (j == col || i + j == row + col || i - j == row - col)
        ) {
          return false;
        }
      }
    }
    return true;
  };

  // 回溯
  const backTrack = (row) => {
    if (row >= n) {
      // 回溯出口
      let boardCopy = checkBoard.slice(); // 拷贝一份
      for (let i = 0; i < n; i++) {
        boardCopy[i] = boardCopy[i].join('');
      }
      res.push(boardCopy);
      return;
    }

    for (let col = 0; col < n; col++) {
      if (isValid(row, col)) {
        // 回溯出口
        checkBoard[row][col] = 'Q';
        backTrack(row + 1);
        checkBoard[row][col] = '.'; // 回到上一个状态
      }
    }
  };

  backTrack(0);
  return res;
};
