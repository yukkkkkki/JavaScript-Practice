// 给定一个字符串 s，计算具有相同数量0和1的非空(连续)子字符串的数量，并且这些子字符串中的所有0和所有1都是组合在一起的。

// 重复出现的子串要计算它们出现的次数。

// 示例 1 :
// 输入: "00110011"
// 输出: 6
// 解释: 有6个子串具有相同数量的连续1和0：“0011”，“01”，“1100”，“10”，“0011” 和 “01”。

// 请注意，一些重复出现的子串要计算它们出现的次数。

// 另外，“00110011”不是有效的子串，因为所有的0（和1）没有组合在一起。

// 示例 2 :
// 输入: "10101"
// 输出: 4
// 解释: 有4个子串：“10”，“01”，“10”，“01”，它们具有相同数量的连续1和0。

// 方法一：按字符分组
// 思路与算法
// 将字符串 s 按照 0 和 1 的连续段分组，存在 counts数组中，
// 例如 s=00111011，可以得到这样的 counts 数组：counts={2,3,1,2}。
// 这里 counts 数组中两个相邻的数一定代表的是两种不同的字符。
// 假设 counts 数组中两个相邻的数字为 u 或者 v，它们对应着 u 个 0 和 v 个 1，或者 u 个 1 和 v 个 0。
// 它们能组成的满足条件的子串数目为 min⁡{u,v}，即一对相邻的数字对答案的贡献。
// 我们只要遍历所有相邻的数对，求它们的贡献总和，即可得到答案
// 时间复杂度：O(n)；空间复杂度： O(n)
var countBinarySubstrings = function (s) {
  let ptr = 0;
  let counts = [];
  const n = s.length;
  let count;
  while (ptr < n) {
    const c = s.charAt(ptr);
    count = 0;
    while (ptr < n && s.charAt(ptr) === c) {
      ++ptr;
      ++count;
    }
    counts.push(count);
  }

  const m = counts.length;
  let res = 0;
  for (let i = 1; i < m; i++) {
    res += Math.min(counts[i], counts[i - 1]);
  }
  return res;
};

// 方法二：优化
// 用一个 last 变量来维护当前位置的前一个位置，这样可以省去一个 counts 数组的空间
// 时间复杂度：O(n)；空间复杂度： O(1)
var countBinarySubstrings = function(s) {
  let ptr = 0;
  let last = 0;
  let res = 0;
  const n = s.length;
  let count;
  while(ptr < n) {
      const c = s.charAt(ptr);
      count = 0;
      while(ptr < n && s.charAt(ptr) === c){
          ++ptr;
          ++count;
      }
      res += Math.min(last, count);
      last = count;
  }

  return res;
};
