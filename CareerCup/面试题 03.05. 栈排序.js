// 栈排序。 编写程序，对栈进行排序使最小元素位于栈顶。最多只能使用一个其他的临时栈存放数据，但不得将元素复制到别的数据结构（如数组）中。该栈支持如下操作：push、pop、peek 和 isEmpty。当栈为空时，peek 返回 -1。

// 示例1:
//  输入：
// ["SortedStack", "push", "push", "peek", "pop", "peek"]
// [[], [1], [2], [], [], []]
//  输出：
// [null,null,null,1,null,2]

// 示例2:
//  输入：
// ["SortedStack", "pop", "pop", "push", "pop", "isEmpty"]
// [[], [], [], [1], [], []]
//  输出：
// [null,null,null,null,null,true]

var SortedStack = function () {
  this.stack1 = [];
  this.stack2 = [];
};

/**
 * @param {number} val
 * @return {void}
 */
SortedStack.prototype.push = function (val) {
  if (this.isEmpty()) this.stack1.push(val);
  else {
    while (!this.isEmpty() && this.peek() < val) {
      this.stack2.push(this.pop());
    }
    this.stack1.push(val);
    while (this.stack2.length) {
      this.stack1.push(this.stack2.pop());
    }
  }
};

/**
 * @return {void}
 */
SortedStack.prototype.pop = function () {
  return this.isEmpty() ? null : this.stack1.pop();
};

/**
 * @return {number}
 */
SortedStack.prototype.peek = function () {
  return this.isEmpty() ? -1 : this.stack1.slice(-1)[0];
};

/**
 * @return {boolean}
 */
SortedStack.prototype.isEmpty = function () {
  return this.stack1.length == 0;
};

/**
 * Your SortedStack object will be instantiated and called as such:
 * var obj = new SortedStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.isEmpty()
 */
