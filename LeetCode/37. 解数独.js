// 编写一个程序，通过已填充的空格来解决数独问题。

// 一个数独的解法需遵循如下规则：

//     数字 1-9 在每一行只能出现一次。
//     数字 1-9 在每一列只能出现一次。
//     数字 1-9 在每一个以粗实线分隔的 3x3 宫内只能出现一次。

// 空白格用 '.' 表示。
// 一个数独。
// 答案被标成红色。

// Note:
// 给定的数独序列只包含数字 1-9 和字符 '.' 。
// 你可以假设给定的数独只有唯一解。
// 给定数独永远是 9x9 形式的。

/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
// 方法一：回溯
var solveSudoku = function (board) {
  const hasConflit = (row, col, value) => {
    // 判断是否有行列和框框的冲突
    for (let i = 0; i < 9; i++) {
      if (board[i][col] === value || board[row][i] === value) {
        // 行或列里有冲突
        return true;
      }
    }
    const subRowStart = Math.floor(row / 3) * 3; // 对于小框，行有三种起始索引 0、3、6
    const subColStart = Math.floor(col / 3) * 3; // 对于小框，列有三种起始索引 0、3、6
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[subRowStart + i][subColStart + j] == value) {
          return true;
        }
      }
    }
    return false;
  };
  const backTrack = (i, j) => {
    if (j === 9) {
      i++;
      j = 0;
      if (i === 9) return true;
    }
    if (board[i][j] !== '.') return backTrack(i, j + 1);
    // 枚举出当前格的所有可填的选择
    for (let k = 1; k <= 9; k++) {
      if (hasConflit(i, j, Sting(k))) continue; // 如果存在冲突，跳过这个选择
      board[i][j] = String(num);
      if (backTrack(i, j + 1)) return true;
      board[i][j] = '.';
    }
    return false;
  };

  backTrack(0, 0);
  return board;
};
