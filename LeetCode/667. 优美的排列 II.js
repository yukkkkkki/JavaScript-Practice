/**
 * @param {number} n
 * @param {number} k
 * @return {number[]}
 */
var constructArray = function (n, k) {
  const answer = new Array(n).fill(0);
  let idx = 0;
  for (let i = 1; i < n - k; ++i) {
    answer[idx] = i;
    ++idx;
  }
  for (let i = n - k, j = n; i <= j; ++i, --j) {
    answer[idx] = i;
    ++idx;
    if (i !== j) {
      answer[idx] = j;
      ++idx;
    }
  }
  return answer;
};
// 时间复杂度：O(n)
// 空间复杂度：O(1)
