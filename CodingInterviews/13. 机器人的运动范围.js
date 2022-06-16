/**
 * @param {number} m
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
// 方法一：回溯
// 开一个空数组flag用来记录每一个位置是否满足条件对应数组flag[index]元素,映射关系为index=i*n+j
// 位置为[i,j]的元素
var movingCount = function (m, n, k) {
  const Sum = (x) => (x % 10) + Math.floor(x / 10);

  function backTrack(i, j, m, n, k, flag) {
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

    backTrack(i - 1, j, m, n, k, flag);
    backTrack(i + 1, j, m, n, k, flag);
    backTrack(i, j - 1, m, n, k, flag);
    backTrack(i, j + 1, m, n, k, flag);
  }

  let flag = [];
  backTrack(0, 0, m, n, k, flag);
  return flag.filter((item) => item == true).length;
};
