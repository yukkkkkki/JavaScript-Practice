/**
 * @param {number[]} heights
 * @return {number}
 */
//  方法一：基于比较的排序
var heightChecker = function (heights) {
  const n = heights.length;
  let res = 0;

  const expected = new Array(n).fill(0);
  expected.splice(0, n, ...heights);
  expected.sort((a, b) => a - b);
  for (let i = 0; i < n; i++) {
    if (heights[i] !== expected[i]) {
      res++;
    }
  }
  return res;
};
// 时间复杂度：O(nlogn)
// 空间复杂度：O(n)

//  方法二：计数排序
var heightChecker = function (heights) {
  const max = parseInt(_.max(heights));
  const count = new Array(max + 1).fill(0);
  for (const h of heights) {
    count[h]++;
  }

  let idx = 0;
  let res = 0;
  for (let i = 1; i <= max; i++) {
    for (let j = 1; j <= count[i]; j++) {
      if (heights[idx] !== i) {
        res++;
      }
      idx++;
    }
  }

  return res;
};
// 时间复杂度：O(n + C)
// 空间复杂度：O(C)
