/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */
// 方法一：广度优先搜索
// 以 beginWord 为图的起点，以 endWord 为终点进行广度优先搜索，寻找 beginWord 到 endWord 的最短路径
// 创建一个由单词 word 到 id 对应的映射 wordId，并将 beginWord 与 wordList 中所有的单词都加入这个映射中。使用哈希表实现这个映射关系。
var ladderLength = function (beginWord, endWord, wordList) {
  let queue1 = new Array(); // 存放到起始节点距离为 d 的节点
  let queue2 = new Array(); // 存放距离 d + 1 的节点  交替使用两个队列 由近及远的寻找
  let notVisited = new Map();
  for (let word of wordList) {
    notVisited.set(word);
  }
  let res = 1;
  queue1.push(beginWord);
  while (queue1.length) {
    let word = queue1.shift();
    if (word == endWord) return res; // 找到了
    let neighbors = getNeighbors(word);
    for (let neighbor of neighbors) {
      if (notVisited.has(neighbor)) {
        queue2.push(neighbor);
        notVisited.delete(neighbor);
      }
    }
    if (queue1.length == 0) {
      // 将两个队列交替 同时距离 + 1
      res++;
      queue1 = queue2;
      queue2 = new Array();
    }
  }
  return 0;
};
const getNeighbors = (word) => {
  // 所有和 word 相差一个字母的集合
  let neighbors = new Array();
  for (let i = 0; i < word.length; i++) {
    let temp = Array.from(word); // 注意数组与字符串相互转换的方法
    let old = temp[i].charCodeAt(0);
    for (let j = 97; j <= 122; j++) {
      if (old !== j) {
        temp[i] = String.fromCharCode(j);
        neighbors.push(temp.join(''));
      }
    }
    temp = Array.from(word);
  }
  return neighbors;
};

// 作者：sourire-d5
// 链接：https://leetcode.cn/problems/om3reC/solution/offer_subject_108_1-by-sourire-d5-phif/
// 时间复杂度：O(N x C^2)
// 空间复杂度：O(N x C^2)
