/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
  this.cache = new Map();
  this.capacity = capacity;
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  const { cache } = this;
  if (!cache.has(key)) return -1;

  const val = cache.get(key);
  cache.delete(key);
  cache.set(key, val);
  return val;
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  if (this.cache.has(key)) this.cache.delete(key);

  if (this.cache.size >= this.capacity) {
    this.cache.delete(this.cache.keys().next().value);
  }
  this.cache.set(key, value);
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

// 迭代器 next 示例：
// var it = makeIterator(['a', 'b']);
// it.next() // { value: "a", done: false }
// it.next() // { value: "b", done: false }
// it.next() // { value: undefined, done: true }
