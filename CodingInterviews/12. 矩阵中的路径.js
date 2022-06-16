/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
// 方法一：回溯
var exist = function (board, word) {
  const h = board.length;
  const w = board[0].length;
  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  const visited = new Array(h);
  for (let i = 0; i < h; i++) {
    visited[i] = new Array(w).fill(false);
  }

  // 判断以网格的 (i, j) 位置出发，能否搜索到单词 word[k..]
  const backTrack = (i, j, s, k) => {
    if (board[i][j] !== s.charAt(k)) {
      // 当前字符不匹配
      return false;
    } else if (k === s.length - 1) {
      // 当前已经访问到字符串的末尾，且对应字符依然匹配
      return true;
    }

    visited[i][j] = true;
    let res = false;
    for (const [dx, dy] of directions) {
      let newi = i + dx;
      let newj = j + dy;
      if (newi >= 0 && newi < h && newj >= 0 && newj < w) {
        if (!visited[newi][newj]) {
          const flag = backTrack(newi, newj, s, k + 1);
          if (flag) {
            res = true;
            break;
          }
        }
      }
    }
    visited[i][j] = false;
    return res;
  };

  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      const flag = backTrack(i, j, word, 0);
      if (flag) return true;
    }
  }
  return false;
};
// 时间复杂度：宽松上界 O(MN·3^L)
// 空间复杂度：O(MN)
