/**
 * @param {number[]} target
 * @param {number} n
 * @return {string[]}
 */
// 方法一：模拟
// 在 target 中每两个连续的数字 prev 和 number 中插入 number - prev − 1 个 Push 和 Pop
// 再多加一个 Push 来插入当前数字
var buildArray = function (target, n) {
  const res = [];
  let prev = 0;

  for (const num of target) {
    for (let i = 0; i < num - prev - 1; i++) {
      res.push("Push");
      res.push("Pop");
    }
    res.push("Push");
    prev = num;
  }

  return res;
};
// 时间复杂度：O(n)
// 空间复杂度：O(1)
