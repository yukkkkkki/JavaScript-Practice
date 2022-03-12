/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
// 方法一：直接构造
//  Z 字形变换的周期为 t=2r−2，因此对于矩阵第一行的非空字符，其对应的 idx 均为 t 的倍数，即 tidx ≡ 0(modt)
// 同理，对于矩阵最后一行的非空字符，应满足 tidx ≡ r−1(modt)
var convert = function (s, numRows) {
  const n = s.length;
  let r = numRows;
  if (r === 1 || r >= n) return s;

  const t = r * 2 - 2;
  const res = [];
  for (let i = 0; i < r; i++) {
    for (let j = 0; j < n - i; j += t) {
      res.push(s[j + i]);
      if (0 < i && (i < r - 1) & (j + t - i < n)) {
        res.push(s[j + t - i]);
      }
    }
  }
  return res.join('');
};
// 时间复杂度：O(n)
// 空间复杂度：O(1)
