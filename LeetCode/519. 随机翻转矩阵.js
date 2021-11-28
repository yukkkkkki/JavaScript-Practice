/**
 * @param {number} m
 * @param {number} n
 */
// 方法一：数组映射
var Solution = function (m, n) {
  this.m = m;
  this.n = n;
  this.total = m * n;
  this.map = new Map();
};

/**
 * @return {number[]}
 */
Solution.prototype.flip = function () {
  const x = Math.floor(Math.random() * this.total);
  this.total--;
  // 查找位置 x 对应的映射
  const idx = this.map.get(x) || x;
  // 将位置 x 对应的映射设置为位置 total 对应的映射
  this.map.set(x, this.map.get(this.total) || this.total);
  return [Math.floor(idx / this.n), idx % this.n];
};

/**
 * @return {void}
 */
Solution.prototype.reset = function () {
  this.total = this.m * this.n;
  this.map.clear();
};

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(m, n)
 * var param_1 = obj.flip()
 * obj.reset()
 */
