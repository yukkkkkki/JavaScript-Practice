/**
 * @param {number} radius
 * @param {number} x_center
 * @param {number} y_center
 */
// 方法一：拒绝采样
// 在一个更大的范围内生成随机数，并拒绝掉那些不在题目给定范围内的随机数
// 使用一个边长为 2R 的正方形覆盖住圆，并在正方形内生成均匀随机点
var Solution = function (radius, x_center, y_center) {
  this.r = radius;
  this.xc = x_center;
  this.yc = y_center;
};

/**
 * @return {number[]}
 */
Solution.prototype.randPoint = function () {
  while (true) {
    const x = Math.random() * (2 * this.r) - this.r;
    const y = Math.random() * (2 * this.r) - this.r;
    if (x * x + y * y <= this.r * this.r) {
      return [this.xc + x, this.yc + y];
    }
  }
};
// 时间复杂度：期望时间复杂度为 O(1)
// 空间复杂度：O(1)
/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(radius, x_center, y_center)
 * var param_1 = obj.randPoint()
 */
