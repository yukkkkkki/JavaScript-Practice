/**
 * Initialize your data structure here.
 */
// 方法一：字典树
var Trie = function () {
  this.children = {};
};

/**
 * Inserts a word into the trie.
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function (word) {
  let node = this.children;
  for (const ch of word) {
    if (!node[ch]) {
      node[ch] = {};
    }
    node = node[ch];
  }
  node.isEnd = true;
};

Trie.prototype.searchPrefix = function (prefix) {
  let node = this.children;
  for (const ch of prefix) {
    // 子节点不存在。说明字典树中不包含该前缀，返回空指针。
    if (!node[ch]) return false;
    // 子节点存在。沿着指针移动到子节点，继续搜索下一个字符。
    node = node[ch];
  }
  return node;
};

/**
 * Returns if the word is in the trie.
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function (word) {
  const node = this.searchPrefix(word);
  // 若搜索到了前缀的末尾，且前缀末尾对应节点的 isEnd 为真，则说明字典树中存在该字符串
  return node !== undefined && node.isEnd !== undefined;
};

/**
 * Returns if there is any word in the trie that starts with the given prefix.
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function (prefix) {
  return this.searchPrefix(prefix);
};

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */
// 时间复杂度：初始化为 O(1)，其余操作为 O(|S|)
// 空间复杂度：O(∣T∣⋅Σ)
