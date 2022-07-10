/**
 * Initialize your data structure here.
 * @param {number} size
 */
// 方法一：模拟队列
var MovingAverage = function (size) {
  this.sum = 0;
  this.length = size;
  this.arr = [];
};

/**
 * @param {number} val
 * @return {number}
 */
MovingAverage.prototype.next = function (val) {
  if (this.arr.length === this.length) {
    this.sum -= this.arr.shift();
  }

  this.arr.push(val);
  this.sum += val;
  return this.sum / this.arr.length;
};

/**
 * Your MovingAverage object will be instantiated and called as such:
 * var obj = new MovingAverage(size)
 * var param_1 = obj.next(val)
 */
