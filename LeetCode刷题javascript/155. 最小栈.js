// 设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈。

//     push(x) —— 将元素 x 推入栈中。
//     pop() —— 删除栈顶的元素。
//     top() —— 获取栈顶元素。
//     getMin() —— 检索栈中的最小元素。

// 示例:
// 输入：
// ["MinStack","push","push","push","getMin","pop","top","getMin"]
// [[],[-2],[0],[-3],[],[],[],[]]

// 输出：
// [null,null,null,null,-3,null,0,-2]

// 解释：
// MinStack minStack = new MinStack();
// minStack.push(-2);
// minStack.push(0);
// minStack.push(-3);
// minStack.getMin();   --> 返回 -3.
// minStack.pop();
// minStack.top();      --> 返回 0.
// minStack.getMin();   --> 返回 -2.

// 方法一：辅助栈
// 辅助栈，与元素栈同步插入与删除，用于存储与每个元素对应的最小值。
// 当一个元素要入栈时，我们取当前辅助栈的栈顶存储的最小值，与当前元素比较得出最小值，将这个最小值插入辅助栈中；
// 当一个元素要出栈时，我们把辅助栈的栈顶元素也一并弹出；
// 在任意一个时刻，栈内元素的最小值就存储在辅助栈的栈顶元素中。
/**
 * initialize your data structure here.
 */
var MinStack = function () {
  this.x_stack = [];
  this.min_stack = [Infinity];
};

/**
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function (x) {
  this.x_stack.push(x);
  this.min_stack.push(Math.min(this.min_stack[this.min_stack.length - 1], x));
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
  this.x_stack.pop();
  this.min_stack.pop();
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
  return this.x_stack[this.x_stack.length - 1];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {
  return this.min_stack[this.min_stack.length - 1];
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */
