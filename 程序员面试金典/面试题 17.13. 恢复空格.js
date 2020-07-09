// 哦，不！你不小心把一个长篇文章中的空格、标点都删掉了，并且大写也弄成了小写。像句子"I reset the computer. It still didn’t boot!"已经变成了"iresetthecomputeritstilldidntboot"。在处理标点符号和大小写之前，你得先把它断成词语。当然了，你有一本厚厚的词典dictionary，不过，有些词没在词典里。假设文章用sentence表示，设计一个算法，把文章断开，要求未识别的字符最少，返回未识别的字符数。
// 注意：本题相对原题稍作改动，只需返回未识别的字符数

// 示例：
// 输入：
// dictionary = ["looked","just","like","her","brother"]
// sentence = "jesslookedjustliketimherbrother"
// 输出： 7
// 解释： 断句后为"jess looked just like tim her brother"，共7个未识别字符。

// 方法一：动态规划
const respace = (dictionary, sentence) => {
  const len = sentence.length;
  const dp = new Array(len + 1);
  const wordDict = new Set();
  for (const word of dictionary) {
    wordDict.add(word);
  }

  dp[0] = 0; // 前0个字符 没有字符 更没有未识别的字符
  for (let i = 1; i <= len; i++) {
    dp[i] = dp[i - 1] + 1; // 前i个字符的最少未识别的字符 保底的情况（可能还可以更少）
    // j 从 i-1开始 word的长度从0开始
    for (let j = i - 1; j >= 0; j--) {
      const word = sentence.substring(j, i);
      if (wordDict.has(word)) {
        dp[i] = Math.min(dp[i], dp[j]);
      } else {
        dp[i] = Math.min(dp[i], dp[j] + i - j);
      }
    }
  }
  return dp[len];
};

// 方法一：记忆化递归优化
const respace = (dictionary, sentence) => {
  const len = sentence.length;
  const wordDict = new Set(dictionary);
  const memo = new Array(len);
  const count = (sentence, wordDict, start, memo) => {
    if (start > len - 1) return 0; // 指针越界
    if (memo[start] !== undefined) return memo[start]; // memo中有 就直接用
    memo[start] = len - start; // 保底的最坏情况：start到末尾全是不能识别的字符
    // end指针从start+1开始，遍历所有字符
    for (let end = start + 1; end <= len; end++) {
      const word = sentence.substring(start, end); // 考察start到end的子串
      // 是字典的单词
      if (wordDict.has(word)) {
        memo[start] = Math.min(
          memo[start],
          count(sentence, wordDict, end, memo)
        );
      } else {
        memo[start] = Math.min(
          memo[start],
          count(sentence, wordDict, end, memo) + word.length
        );
      }
    }
    return memo[start];
  };
  return count(sentence, wordDict, 0, memo);
};

// 方法三
const respace = (dictionary, sentence) => {
  const len = sentence.length;
  const dp = new Array(len + 1);
  dp[0] = 0;
  for (let i = 1; i <= len; i++) {
    dp[i] = dp[i - 1] + 1;
    for (const word of dictionary) {
      if (sentence.substring(i - word.length, i) == word) {
        dp[i] = Math.min(dp[i], dp[i - word.length]);
      }
    }
  }
  return dp[len];
};
