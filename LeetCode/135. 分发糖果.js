//  ratings 表示每个孩子的评分
// 每个孩子至少分配到 1 个糖果。
// 相邻两个孩子评分更高的孩子会获得更多的糖果。
/**
 * @param {number[]} ratings
 * @return {number}
 */
// 方法一：两次遍历
// 遍历该数组两次，处理出每一个学生分别满足左规则或右规则时，最少需要被分得的糖果数量。
// 每个人最终分得的糖果数量即为这两个数量的最大值。
var candy = function (ratings) {
  const n = ratings.length;
  const left = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    if (i > 0 && ratings[i] > ratings[i - 1]) {
      left[i] = left[i - 1] + 1;
    } else {
      left[i] = 1;
    }
  }

  let right = 0;
  let res = 0;
  for (let i = n - 1; i >= 0; i--) {
    if (i < n && ratings[i] > ratings[i + 1]) {
      right++;
    } else {
      right = 1;
    }

    res += Math.max(left[i], right);
  }

  return res;
};
// 时间复杂度：O(n)
// 空间复杂度：O(n)

// 方法一：常数空间遍历
var candy = function (ratings) {
  const n = ratings.length;
  let res = 1;
  let inc = 1;
  let dec = 0;
  let pre = 1;

  for (let i = 1; i < n; i++) {
    if (ratings[i] >= ratings[i - 1]) {
      dec = 0;
      if (ratings[i] === ratings[i - 1]) pre = 1;
      else pre++;

      res += pre;
      inc = pre;
    } else {
      dec++;
      if (dec === inc) {
        dec++;
      }
      res += dec;
      pre = 1;
    }
  }

  return res;
};
// 时间复杂度：O(n)
// 空间复杂度：O(1)
