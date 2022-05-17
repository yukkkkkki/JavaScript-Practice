var CQueue = function () {
  this.inStack = [];
  this.outStack = [];
};

/**
 * @param {number} value
 * @return {void}
 */
CQueue.prototype.appendTail = function (value) {
  this.inStack.push(value);
};

/**
 * @return {number}
 */
CQueue.prototype.deleteHead = function () {
  if (this.outStack.length === 0) {
    // 判断 outStack 是否已经为空
    while (this.inStack.length !== 0) {
      // 把 inStack 的值调换顺序放入 outStack
      this.outStack.push(this.inStack.pop());
    }
  }
  return this.outStack.pop() || -1;
};

/**
 * Your CQueue object will be instantiated and called as such:
 * var obj = new CQueue()
 * obj.appendTail(value)
 * var param_2 = obj.deleteHead()
 */
