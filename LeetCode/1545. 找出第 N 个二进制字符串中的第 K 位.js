/**
 * @param {number} n
 * @param {number} k
 * @return {character}
 */
// 方法一：递归
// 当 n > 1，Sn 是在 Sn-1 的基础上形成的
// len_n = len_(n-1) x 2 + 1，而 len_1 = 1 -> len_n = 2^n - 1
// 故 Sn 可以分三个部分：
// 左边 2^(n-1) - 1 个字符是 S_{n-1}
// 中间 1 个字符是 '1' -> 是 Sn 的第 2^(n-1) 位字符
// 右边 2^(n-1) 个字符是 S_{n-1} 翻转与反转之后的结果
var findKthBit = function (n, k) {
  if (k === 1) return "0";

  const mid = 1 << (n - 1);

  if (k === mid) {
    return "1";
  } else if (k < mid) {
    // 第 k 位字符在 S_n 的前半部分，因此在 S_{n-1} 中寻找第 k 位字符
    return findKthBit(n - 1, k);
  } else {
    // 第 k 位字符在 S_n 的后半部分，因此在前半部分寻找第 2^n-k 位字符

    // 将其反转之后即为 Sn 的第 k 位字符
    k = mid * 2 - k;
    return invert(findKthBit(n - 1, k));
  }
};
const invert = (bit) => (bit === "0" ? "1" : "0");

console.log(findKthBit(3, 1));
