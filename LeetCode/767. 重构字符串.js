// 给定一个字符串S，检查是否能重新排布其中的字母，使得两相邻的字符不同。

// 若可行，输出任意可行的结果。若不可行，返回空字符串。

// 示例 1:
// 输入: S = "aab"
// 输出: "aba"

// 示例 2:
// 输入: S = "aaab"
// 输出: ""

/**
 * @param {string} S
 * @return {string}
 */

// 思路：
// 当 n 是偶数时，有 n/2 个偶数下标和 n/2 个奇数下标，因此每个字母的出现次数都不能超过 n/2 次，否则出现次数最多的字母一定会出现相邻
// 当 n 是奇数时，由于共有 (n+1)/2 个偶数下标，因此每个字母的出现次数都不能超过 (n+1)/2 次，否则出现次数最多的字母一定会出现相邻

// 由于当 n 是偶数时，在整数除法下满足 n/2 和 (n+1)/2 相等，因此可以合并 n 是偶数与 n 是奇数的情况：
// 如果可以重新排布成相邻的字母都不相同的字符串，每个字母最多出现 (n+1)/2 次。

// 因此首先遍历字符串并统计每个字母的出现次数，如果存在一个字母的出现次数大于 (n+1)/2，则无法重新排布字母使得相邻的字母都不相同，返回空字符串。
// 如果所有字母的出现次数都不超过 (n+1)/2，则考虑如何重新排布字母。

// 方法一：基于计数的贪心算法
const getIdx = (c) => c.charCodeAt() - 'a'.charCodeAt();
const getAlpha = (c) => String.fromCharCode(c);
var reorganizeString = function (S) {
  if (S.length < 2) return S;
  const counts = new Array(26).fill(0);
  let maxCount = 0;
  const len = S.length;
  for (let i = 0; i < len; i++) {
    const c = S.charAt(i);
    counts[getIdx(c)]++;
    maxCount = Math.max(maxCount, counts[getIdx(c)]);
  }
  if (maxCount > Math.floor((len + 1) / 2)) {
    return '';
  }
  const reorganizeArray = new Array(len);
  let evenIndex = 0,
    oddIndex = 1;
  const halfLen = Math.floor(len / 2);
  for (let i = 0; i < 26; i++) {
    const c = getAlpha('a'.charCodeAt() + i);
    while (counts[i] > 0 && counts[i] <= halfLen && oddIndex < len) {
      reorganizeArray[oddIndex] = c;
      counts[i]--;
      oddIndex += 2;
    }
    while (counts[i] > 0) {
      reorganizeArray[evenIndex] = c;
      counts[i]--;
      evenIndex += 2;
    }
  }
  return reorganizeArray.join('');
};
// 时间复杂度：O(n+∣Σ∣) 空间复杂度：O(∣Σ∣)

console.log(reorganizeString('aab'));
