// 给你一个大小为 rows x cols 的矩阵 mat，其中 mat[i][j] 是 0 或 1，请返回 矩阵 mat 中特殊位置的数目 。

// 特殊位置 定义：如果 mat[i][j] == 1 并且第 i 行和第 j 列中的所有其他元素均为 0（行和列的下标均 从 0 开始 ），则位置 (i, j) 被称为特殊位置。

// 示例 1：
// 输入：mat = [[1,0,0],
//             [0,0,1],
//             [1,0,0]]
// 输出：1
// 解释：(1,2) 是一个特殊位置，因为 mat[1][2] == 1 且所处的行和列上所有其他元素都是 0
function fn(mat) {
  const m = mat.length;
  const n = mat[0].length;

  let tmp1 = [];
  for (let i = 0; i < m; i++) {
    let curr = 0;
    for (let j = 0; j < n; j++) {
      curr += mat[i][j];
    }
    // console.log("666", curr);
    tmp1.push(curr);
  }

  let res = 0;
  // for (let i = 0; i < n; i++) {
  //   let curr = [];
  //   for (let j = 0; j < m; j++) {
  //     if (mat[j][i] === 1) {
  //       curr.push(j);
  //     }
  //   }
  //   console.log(curr);
  //   if (curr.length === 1 && tmp1[curr[0]] === 1) {
  //     res++;
  //   }
  // }

  return res;
}
let mat = [
  [1, 1, 0],
  [0, 1, 1],
  [1, 0, 0]
];

console.log(fn(mat));
