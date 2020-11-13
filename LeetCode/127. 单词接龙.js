// 给定两个单词（beginWord 和 endWord）和一个字典，找到从 beginWord 到 endWord 的最短转换序列的长度。转换需遵循如下规则：

// 每次转换只能改变一个字母。
// 转换过程中的中间单词必须是字典中的单词。

// 说明:
// 如果不存在这样的转换序列，返回 0。
// 所有单词具有相同的长度。
// 所有单词只由小写字母组成。
// 字典中不存在重复的单词。
// 你可以假设 beginWord 和 endWord 是非空的，且二者不相同。

// 示例 1:
// 输入:
// beginWord = "hit",
// endWord = "cog",
// wordList = ["hot","dot","dog","lot","log","cog"]
// 输出: 5
// 解释: 一个最短转换序列是 "hit" -> "hot" -> "dot" -> "dog" -> "cog",
//      返回它的长度 5。

// 示例 2:
// 输入:
// beginWord = "hit"
// endWord = "cog"
// wordList = ["hot","dot","dog","lot","log"]
// 输出: 0
// 解释: endWord "cog" 不在字典中，所以无法进行转换。

/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */

// 方法一：广度优先搜索 BFS
// 思路：
// 由一个结点带出下一层的邻接点，用BFS，把单词看作节点。
// 维护一个队列，让起点词入列，level 为 1，然后出列考察。
// 将它的每个字符变成26字母之一，逐个看是否在单词表，如果在，这个新词为下一层的转变词。
// 将它入列，它的 level +1，并从单词表中删去这个词。
// 当前队列中 maintain 的是：同一 level 的所有单词。
// 出列入列…重复，当出列的单词和终点词相同，说明遇到了终点词，返回它的 level。
// 当队列为空时，BFS结束，始终没有遇到终点词，没有路径通往终点，返回 0。
// 参考：
// 作者：xiao_ben_zhu
// 链接：https://leetcode-cn.com/problems/word-ladder/solution/shou-hua-tu-jie-127-dan-ci-jie-long-bfsde-dian-x-2/
var ladderLength = function (beginWord, endWord, wordList) {
  const wordSet = new Set(wordList);
  const queue = [];
  queue.push([beginWord, 1]);

  while (queue.length) {
    const levelSize = queue.length;
    for (let i = 0; i < levelSize; i++) {
      const [word, level] = queue.shift();
      if (word == endWord) {
        return level;
      }
      // 遍历当前单词的所有字符
      for (let i = 0; i < word.length; i++) {
        // 对应26个字母
        for (let c = 97; c <= 122; c++) {
          // 形成新词
          const newWord =
            word.slice(0, i) + String.fromCharCode(c) + word.slice(i + 1);
          if (wordSet.has(newWord)) {
            queue.push([newWord, level + 1]);
            wordSet.delete(newWord); // 避免该词重复入列
          }
        }
      }
    }
  }
  return 0; // bfs结束，始终没有遇到终点
};
