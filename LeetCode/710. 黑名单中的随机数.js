/**
 * @param {number} n
 * @param {number[]} blacklist
 */
// 方法一：黑名单映射
var Solution = function (n, blacklist) {
  this.b2w = new Map();
  const m = blacklist.length;
  this.bound = n - m;
  const black = new Set();
  for (const b of blacklist) {
    if (b >= this.bound) {
      black.add(b);
    }
  }

  let w = this.bound;
  for (const b of blacklist) {
    if (b < this.bound) {
      while (black.has(w)) {
        ++w;
      }
      this.b2w.set(b, w);
      ++w;
    }
  }
};

/**
 * @return {number}
 */

Solution.prototype.pick = function () {
  const x = Math.floor(Math.random() * this.bound);
  return this.b2w.get(x) || x;
};
/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(n, blacklist)
 * var param_1 = obj.pick()
 */
