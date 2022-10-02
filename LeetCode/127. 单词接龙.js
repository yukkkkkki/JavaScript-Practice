/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */
// 方法一：广度优先搜索 BFS
// 由一个结点带出下一层的邻接点，用BFS，把单词看作节点。
// 维护一个队列，让起点词入列，level 为 1，然后出列考察。
var ladderLength = function (beginWord, endWord, wordList) {
  const wordSet = new Set(wordList);
  const queue = [[beginWord, 1]];

  // 当前队列中 maintain 的是：同一 level 的所有单词。
  while (queue.length) {
    const size = queue.length;

    for (let i = 0; i < size; i++) {
      const [word, level] = queue.shift();
      // 出列的单词和终点词相同，说明遇到了终点词
      if (word == endWord) return level;

      // 遍历当前单词的所有字符
      for (let i = 0; i < word.length; i++) {
        // 将每个字符变成 26字母之一，逐个看是否在单词表
        for (let c = 97; c <= 122; c++) {
          // 形成新词
          const newWord =
            word.slice(0, i) + String.fromCharCode(c) + word.slice(i + 1);

          // 如果在，这个新词为下一层的转变词。
          if (wordSet.has(newWord)) {
            queue.push([newWord, level + 1]);
            // 从单词表中删去这个词，避免该词重复入列
            wordSet.delete(newWord);
          }
        }
      }
    }
  }

  // bfs结束，始终没有遇到终点
  return 0;
};
// 参考：
// 作者：xiao_ben_zhu
// 链接：https://leetcode-cn.com/problems/word-ladder/solution/shou-hua-tu-jie-127-dan-ci-jie-long-bfsde-dian-x-2/
