// n 皇后问题研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。

// 上图为 8 皇后问题的一种解法。

// 给定一个整数 n，返回 n 皇后不同的解决方案的数量。

// 示例:
// 输入: 4
// 输出: 2
// 解释: 4 皇后问题存在如下两个不同的解法。
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

var totalNQueens = function (n) {
  // 生成棋盘
  const checkBoard = new Array(n).fill().map((i) => new Array(n).fill('.'));
  const res = [];
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

  const backTrack = (row) => {
    if (row >= n) {
      let boardCopy = checkBoard.slice();
      for (let i = 0; i < n; i++) {
        boardCopy[i] = boardCopy[i].join(''); // 将每一行拼成字符串
      }
      res.push(boardCopy);
    }

    for (let col = 0; col < n; col++) {
      if (isValid(row, col)) {
        checkBoard[row][col] = 'Q';
        backTrack(row + 1);
        checkBoard[row][col] = '.';
      }
    }
  };

  backTrack(0);
  return res.length;
};
