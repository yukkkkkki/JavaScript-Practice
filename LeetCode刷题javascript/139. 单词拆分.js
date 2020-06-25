// 给定一个非空字符串 s 和一个包含非空单词列表的字典 wordDict，判定 s 是否可以被空格拆分为一个或多个在字典中出现的单词。

// 说明：
//     拆分时可以重复使用字典中的单词。
//     你可以假设字典中没有重复的单词。

// 示例 1：
// 输入: s = "leetcode", wordDict = ["leet", "code"]
// 输出: true
// 解释: 返回 true 因为 "leetcode" 可以被拆分成 "leet code"。

// 示例 2：
// 输入: s = "applepenapple", wordDict = ["apple", "pen"]
// 输出: true
// 解释: 返回 true 因为 "applepenapple" 可以被拆分成 "apple pen apple"。
//      注意你可以重复使用字典中的单词。

// 示例 3：
// 输入: s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]
// 输出: false

// 方法一 DFS + 记忆化
var wordBreak = function (s, wordDict) {
  const wordSet = new Set(wordDict);
  const memo = new Array(s.length); // 存：子问题的状态（指针）和子问题的解
  const check = (s, wordSet, start, memo) => {
    if (start > s.length - 1) return true; // 指针越界，结束递归
    if (memo[start] !== undefined) return memo[start]; // memo中有，直接返回它
    for (let end = start + 1; end <= s.length; end++) {
      // 固定start 考察所有的end
      const word = s.slice(start, end); // 前缀单词
      if (wordSet.has(word) && check(s, wordSet, end, memo)) {
        //前缀单词是单词表里的
        memo[start] = true; // 并且递归剩余子串的结果也是true，则为true
        return true; // 当前子问题的结果true 存入memo
      }
    }
    memo[start] = false; // 当前子问题的结果是false
    return false; // end遍历了右侧字符都没有返回true，则返回false
  };
  return check(s, wordSet, 0, memo); // 递归的入口
};

// 方法二：BFS
var wordBreak = function (s, wordDict) {
  const wordSet = new Set(wordDict);
  const visited = new Array(s.length);
  const queue = [0]; // 先考察start位置0
  while (queue.length) {
    const start = queue.shift(); // 考察出列节点
    if (visited[start] == true) continue; // 跳过访问过的
    visited[start] = true; // 访问了 记录一下
    // 固定start 考察所有end
    for (let end = start + 1; end <= s.length; end++) {
      const word = s.slice(start, end); // 开头的单词
      // 单词表有这个单词
      if (wordSet.has(word)) {
        if (end > s.length - 1) return true; //end指针已经越界，即所有节点遍历完了
        queue.push(end); //单词存在于单词表，且end未到头，将end推入队列作为下一层节点
      }
    }
  }
  return false; // 所有节点遍历完，也没有返回true，则返回false
};

// 方法三 动态规划
var wordBreak = function (s, wordDict) {
  const wordSet = new Set(wordDict);
  const len = s.length;
  const dp = new Array(len + 1).fill(false);
  dp[0] = true;
  // i从1开始到len
  for (let i = 1; i <= len; i++) {
    // j从和i重合，向左，到开端
    for (let j = i; j >= 0; j--) {
      // 获取[j,i-1]子串word
      const word = s.slice(j, i);
      //word是单词表的单词，且左侧子串[0,j-1]的dp[j]为真
      if (wordSet.has(word) && dp[j] == true) {
        // 共同决定了当前长度为i的子串的dp项为真
        dp[i] = true;
        // i长度的子串已经满足要求，不需要j继续划分子串
        break;
      }
    }
  }
  return dp[s.length];
};

// 方法四 动态规划优化
var wordBreak = function (s, wordDict) {
  const wordSet = new Set(wordDict);
  const len = s.length;
  const dp = new Array(len + 1).fill(false);
  dp[0] = true;
  // i从1开始到len
  for (let i = 1; i <= len; i++) {
    // j从和i重合，向左，到开端
    for (let j = i; j >= 0; j--) {
      if (dp[i] == true) break;
      if (dp[j] == false) continue;
      const word = s.slice(j, i);
      if (wordSet.has(word) && dp[j] == true) {
        dp[i] = true;
        break;
      }
    }
  }
  return dp[s.length];
};
