// 给定一个非空字符串 s 和一个包含非空单词列表的字典 wordDict，在字符串中增加空格来构建一个句子，使得句子中所有的单词都在词典中。返回所有这些可能的句子。

// 说明：
// 分隔时可以重复使用字典中的单词。
// 你可以假设字典中没有重复的单词。

// 示例 1：
// 输入:
// s = "catsanddog"
// wordDict = ["cat", "cats", "and", "sand", "dog"]
// 输出:
// [
//   "cats and dog",
//   "cat sand dog"
// ]

// 示例 2：
// 输入:
// s = "pineapplepenapple"
// wordDict = ["apple", "pen", "applepen", "pine", "pineapple"]
// 输出:
// [
//   "pine apple pen apple",
//   "pineapple pen apple",
//   "pine applepen apple"
// ]
// 解释: 注意你可以重复使用字典中的单词。

// 示例 3：
// 输入:
// s = "catsandog"
// wordDict = ["cats", "dog", "sand", "and", "cat"]
// 输出:
// []

/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {string[]}
 */
// 方法一：记忆化递归
var wordBreak = function (s, wordDict) {
  const len = s.length;
  const dict = new Set(wordDict);
  const memo = new Array(len);

  const dfs = (start) => {
    if (memo[start]) {
      return memo[start];
    }
    if (start > s.length - 1) return [[]];
    const res = [];
    for (let i = start + 1; i <= len; i++) {
      const word = s.substring(start, i);
      if (dict.has(word)) {
        const restRes = dfs(i);
        for (const restWords of restRes) {
          res.push([word].concat(restWords));
        }
      }
    }
    memo[start] = res;
    return res;
  };
  return dfs(0).map((words) => {
    return words.join(' ');
  });
};

console.log(
  wordBreak('pineapplepenapple', [
    'apple',
    'pen',
    'applepen',
    'pine',
    'pineapple',
  ])
);

// 作者：xiao_ben_zhu
// 链接：https://leetcode-cn.com/problems/word-break-ii/solution/shou-hua-tu-jie-dan-ci-chai-fen-ii-cong-di-gui-dao/
