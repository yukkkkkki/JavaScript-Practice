/**
 * @param {number[]} a
 * @return {number[]}
 */
// 方法一：左右乘积列表
var constructArr = function (a) {
  const n = a.length;
  const res = new Array(n);

  const L = new Array(n); // L[i] 代表 i 左侧所有数字的乘积
  L[0] = 1;
  for (let i = 1; i < a.length; i++) {
    L[i] = L[i - 1] * a[i - 1];
  }

  const R = new Array(n); // R[i] 代表 i 右侧所有数字的乘积
  R[n - 1] = 1;
  for (let i = n - 2; i >= 0; i--) {
    R[i] = a[i + 1] * R[i + 1];
  }

  for (let i = 0; i < n; i++) {
    res[i] = L[i] * R[i];
  }

  return res;
};
// 时间复杂度：O(N)
// 空间复杂度：O(N)

// 方法二：
var constructArr = function (a) {
  const n = a.length;
  if (n === 0) return [];

  const answer = new Array(n);
  answer[0] = 1;
  for (let i = 1; i < n; i++) {
    answer[i] = answer[i - 1] * a[i - 1];
  }

  // R 为右侧所有元素的乘积
  let R = 1;
  for (let i = n - 1; i >= 0; i--) {
    answer[i] = R * answer[i];
    R *= a[i];
  }

  return answer;
};
// 时间复杂度：O(N)
// 空间复杂度：O(1)
