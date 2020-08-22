// 地上有一个m行n列的方格，从坐标 [0,0] 到坐标 [m-1,n-1] 。一个机器人从坐标 [0, 0] 的格子开始移动，它每次可以向左、右、上、下移动一格（不能移动到方格外），也不能进入行坐标和列坐标的数位之和大于k的格子。例如，当k为18时，机器人能够进入方格 [35, 37] ，因为3+5+3+7=18。但它不能进入方格 [35, 38]，因为3+5+3+8=19。请问该机器人能够到达多少个格子？

// 示例 1：
// 输入：m = 2, n = 3, k = 1
// 输出：3

// 示例 2：
// 输入：m = 3, n = 1, k = 0
// 输出：1

// 开一个空数组flag用来记录每一个位置是否满足条件
// 位置为[i,j]的元素对应数组flag[index]元素,映射关系为index=i*n+j
var movingCount = function (m, n, k) {
  let Sum = (x) => (x % 10) + Math.floor(x / 10);
  let flag = [];
  judge(0, 0, m, n, k, flag);

  function judge(i, j, m, n, k, flag) {
    if (
      i < 0 ||
      j < 0 ||
      i > m - 1 ||
      j > n - 1 ||
      Sum(i) + Sum(j) > k ||
      flag[i * n + j] == true
    ) {
      return;
    }
    flag[i * n + j] = true;
    judge(i - 1, j, m, n, k, flag);
    judge(i + 1, j, m, n, k, flag);
    judge(i, j - 1, m, n, k, flag);
    judge(i, j + 1, m, n, k, flag);
  }
  return flag.filter((item) => item == true).length;
};
