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
// 时间复杂度：insert 操作时间复杂度为 O(1).sum 操作时间复杂度为 O(NM)
// 空间复杂度：O(NM)
// N 是插入的 key 的数目，MM 是字符串 key 的最大长度
/**
 * Your MapSum object will be instantiated and called as such:
 * var obj = new MapSum()
 * obj.insert(key,val)
 * var param_2 = obj.sum(prefix)
 */
