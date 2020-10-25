// 三合一。描述如何只用一个数组来实现三个栈。

// 你应该实现push(stackNum, value)、pop(stackNum)、isEmpty(stackNum)、peek(stackNum)方法。stackNum表示栈下标，value表示压入的值。

// 构造函数会传入一个stackSize参数，代表每个栈的大小。

// 示例1:
//  输入：
// ["TripleInOne", "push", "push", "pop", "pop", "pop", "isEmpty"]
// [[1], [0, 1], [0, 2], [0], [0], [0], [0]]
//  输出：
// [null, null, null, 1, -1, -1, true]
// 说明：当栈为空时`pop, peek`返回-1，当栈满时`push`不压入元素。

// 示例2:
//  输入：
// ["TripleInOne", "push", "push", "push", "pop", "pop", "pop", "peek"]
// [[2], [0, 1], [0, 2], [0, 3], [0], [0], [0], [0]]
//  输出：
// [null, null, null, null, 2, 1, -1, -1]

// 方法一：二维数组
class TripleInOne {
  constructor(stackSize) {
    this.stack = [];
    this.size = stackSize;
  }

  push(stackNum, value) {
    if (!this.stack[stackNum]) {
      this.stack[stackNum] = [];
    }
    if (this.stack[stackNum].length < this.size) {
      this.stack[stackNum].push(value);
    }
  }

  pop(stackNum) {
    if (this.stack[stackNum] && this.stack[stackNum].length) {
      return this.stack[stackNum].pop();
    }
    return -1;
  }

  peek(stackNum) {
    if (this.stack[stackNum] && this.stack[stackNum].length) {
      return this.stack[stackNum][this.stack[stackNum].length - 1];
    }
    return -1;
  }

  isEmpty(stackNum) {
    return !this.stack[stackNum] || !this.stack[stackNum].length;
  }
}

// 方法二：一维数组
class TripleInOne {
  constructor(stackSize) {
    this.stack = [];
    this.size = stackSize;
    this.stackCounts = [0, 0, 0];
  }

  push(stackNum, value) {
    if (this.stackCounts[stackNum] < this.size) {
      this.stack[this.size * stackNum + this.stackCounts[stackNum]] = value;
      this.stackCounts[stackNum]++;
    }
  }

  pop(stackNum) {
    if (this.stackCounts[stackNum]) {
      const result = this.stack[
        this.size * stackNum + this.stackCounts[stackNum] - 1
      ];
      this.stack[this.size * stackNum + this.stackCounts[stackNum] - 1] = null;
      this.stackCounts[stackNum]--;
      return result;
    }
    return -1;
  }

  peek(stackNum) {
    if (this.stackCounts[stackNum]) {
      const result = this.stack[
        this.size * stackNum + this.stackCounts[stackNum] - 1
      ];
      return result;
    }
    return -1;
  }

  isEmpty(stackNum) {
    return !this.stackCounts[stackNum];
  }
}
