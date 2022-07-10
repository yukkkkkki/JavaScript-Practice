/**
 * Initialize your data structure here.
 */
// 方法一：暴力扫描
var MapSum = function () {
  this.map = new Map();
};

/**
 * @param {string} key
 * @param {number} val
 * @return {void}
 */
MapSum.prototype.insert = function (key, val) {
  this.map.set(key, val);
};

/**
 * @param {string} prefix
 * @return {number}
 */
MapSum.prototype.sum = function (prefix) {
  let res = 0;
  for (const s of this.map.keys()) {
    if (s.startsWith(prefix)) {
      res += this.map.get(s);
    }
  }
  return res;
};
// 时间复杂度：insert 操作时间复杂度为 O(1); sum -> O(nm) m 是给定前缀 prefix 的长度
// 空间复杂度：O(nm); 其中 n 是插入的 key 的数目，m 是字符串 key 的最大长度。
/**
 * Your MapSum object will be instantiated and called as such:
 * var obj = new MapSum()
 * obj.insert(key,val)
 * var param_2 = obj.sum(prefix)
 */

// 方法二：前缀哈希映射
// 用哈希表存储所有可能前缀的值
// 当得到一个新的 key - val 键值，我们将 key 的每个前缀 prefix[i] 都在哈希表中进行存储，我们需要更新每个前缀 prefix[i] 对应的值
var MapSum = function () {
  this.map = new Map();
  this.prefixMap = new Map();
};

/**
 * @param {string} key
 * @param {number} val
 * @return {void}
 */
MapSum.prototype.insert = function (key, val) {
  const delta = val - (this.map.get(key) || 0);
  this.map.set(key, val);
  for (let i = 1; i <= key.length; i++) {
    const currprefix = key.substring(0, i);
    this.prefixMap.set(
      currprefix,
      (this.prefixMap.get(currprefix) || 0) + delta
    );
  }
};

/**
 * @param {string} prefix
 * @return {number}
 */
MapSum.prototype.sum = function (prefix) {
  return this.prefixMap.get(prefix) || 0;
};
// 时间复杂度：insert 操作时间复杂度为 O(n^2); sum -> O(1)
// 空间复杂度：O(nm); 其中 n 是插入的 key 的数目，m 是字符串 key 的最大长度。
