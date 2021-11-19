/**
 * @param {number} n
 * @return {number}
 */
// 方法一：枚举
var integerReplacement = function (n) {
  if (n === 1) return 0;
  if (n % 2 === 0) return 1 + integerReplacement(Math.floor(n / 2));
  return (
    2 +
    Math.min(
      integerReplacement(Math.floor(n / 2)),
      integerReplacement(Math.floor(n / 2) + 1)
    )
  );
};

// 方法二：记忆化搜索
const map = new Map();
var integerReplacement = function (n) {
  if (n === 1) return 0;
  if (!map.has(n)) {
    if (n % 2 === 0) {
      map.set(n, 1 + integerReplacement(Math.floor(n / 2)));
    } else {
      map.set(
        n,
        2 +
          Math.min(
            integerReplacement(Math.floor(n / 2)),
            integerReplacement(Math.floor(n / 2) + 1)
          )
      );
    }
  }
  return map.get(n);
};
// 时间复杂度：O(logn)
// 空间复杂度：O(logn)
