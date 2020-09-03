// n 皇后问题研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。

// 上图为 8 皇后问题的一种解法。

// 给定一个整数 n，返回所有不同的 n 皇后问题的解决方案。

// 每一种解法包含一个明确的 n 皇后问题的棋子放置方案，该方案中 'Q' 和 '.' 分别代表了皇后和空位。

// 示例：
// 输入：4
// 输出：[
//  [".Q..",  // 解法 1
//   "...Q",
//   "Q...",
//   "..Q."],

//  ["..Q.",  // 解法 2
//   "Q...",
//   "...Q",
//   ".Q.."]
// ]
// 解释: 4 皇后问题存在两个不同的解法。

// 方法一：回溯
var solveNQueens = function (n) {
  const res = [];
  const cols = new Set(); // 垂直线的攻击位置
  const pies = new Set(); // 向左对角线的攻击位置
  const nas = new Set(); // 向右对角线的攻击位置

  const backTrack = (row, queens) => {
    if (row >= n) {
      res.push(queens.slice());
      return;
    }

    for (let col = 0; col < n; col++) {
      if (cols.has(col) || pies.has(col + row) || nas.has(col - row)) continue;
      cols.add(col);
      pies.add(col + row);
      nas.add(col - row);
      queens.push(col);
      backTrack(row + 1, queens);
      // 回到上一个状态
      queens.pop();
      cols.delete(col);
      pies.delete(col + row);
      nas.delete(col - row);
    }
  };

  const generateCheckBoard = function () {
    return res.map((queen) => {
      return queen.map((item) => {
        return Array(n)
          .fill()
          .map((value, index) => {
            return index === item ? 'Q' : '.';
          })
          .join('');
      });
    });
  };

  backTrack(0, []);
  return generateCheckBoard();
};

/**
 * @param {number} n
 * @return {string[][]}
 */

// 回溯方法二
var solveNQueens = function (n) {
  const checkBoard = new Array(n).fill().map((item) => new Array(n).fill('.'));

  const res = [];
  const isValid = (row, col) => {
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < n; j++) {
        if (
          checkBoard[i][j] === 'Q' &&
          (j == col || i + j === row + col || i - j === row - col)
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
      // console.log("boardCopy:",boardCopy)
      res.push(boardCopy);
      return;
    }

    for (let col = 0; col < n; col++) {
      if (isValid(row, col)) {
        // 剪枝
        checkBoard[row][col] = 'Q';
        backTrack(row + 1);
        checkBoard[row][col] = '.'; // 回到上一个状态
      }
    }
  };

  backTrack(0);
  return res;
};
