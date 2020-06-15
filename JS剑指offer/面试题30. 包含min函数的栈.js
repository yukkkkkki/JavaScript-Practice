// 函数在该栈中，调用 min、push 及 pop 的时间复杂度都是 O(1)。

// 示例:
// MinStack minStack = new MinStack();
// minStack.push(-2);
// minStack.push(0);
// minStack.push(-3);
// minStack.min();   --> 返回 -3.
// minStack.pop();
// minStack.top();      --> 返回 0.
// minStack.min();   --> 返回 -2.

var MinStack = function () {
  this.stack = [];
  this.minV = Number.MAX_VALUE;
};

/** 
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function (x) {
  // update 'min'
  const minV = this.minV;
  if (x < this.minV) {
    this.minV = x;
  }
  return this.stack.push(x - minV);
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
  const item = this.stack.pop();
  const minV = this.minV;

  if (item < 0) {
    this.minV = minV - item;
    return minV;
  }
  return item + minV;
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
  const item = this.stack[this.stack.length - 1];
  const minV = this.minV;

  if (item < 0) {
    return minV;
  }
  return item + minV;
};

/**
 * @return {number}
 */
MinStack.prototype.min = function () {
  return this.minV;
};

// 方法二
var MinStack = function () {
  this.stack = [];
  this.minStack = [];
};

/** 
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function (x) {
  this.stack.push(x);
  if (this.minStack.length == 0 || x <= this.minStack[this.minStack.length - 1]) {
    this.minStack.push(x);
  }
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
  const x = this.stack.pop();
  if (x !== void 0 && x === this.minStack[this.minStack.length - 1]) {
    this.minStack.pop();
  }
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
  return this.stack[this.stack.length - 1];
};

/**
 * @return {number}
 */
MinStack.prototype.min = function () {
  return this.minStack[this.minStack.length - 1];
};